"""
Do not merge. For discussion only.
Alternative way is to use awk and redis-cli
"""
import logging
import os
import sys

import pandas as pd
from rejson import Client, Path

logger = logging.getLogger(__name__)
    

class Csv2Redis:

    def __init__(self):
        self.rj = Client(host=os.environ.get("REDIS_HOST", "localhost"), decode_responses=True)

    def setElectionShapeInRedis(self, filename: str) -> list:
        '''
        filename: str Input aggregated csv file. Csv seems to be read faster then Excel.
        Populate election shape into redis
        '''
        with self.rj.pipeline() as pipe:
            # TODO: assure filename exists
            # TODO: more error checking
            # TODO: resolve incremental update
            try:
                # TODO: the row pass 1440 generates an error
                # Get the csv file
                data = pd.read_csv(filename, skiprows=lambda x: x % 2 == 1, sep=',', quotechar='"', )
                # There are 4 types RCPT, EXPN, LOAN, S497.
                # TODO: Get a better understanding of how Loan, Exp & S497 work. We could have simply use Rec_Type for raise or expens but leave it as is for now until we have better understanding of Rec_Type.
                data['Raise_or_Expense'] = data.apply(lambda row: 'raise' if row['Rec_Type'] == 'RCPT' else (
                    'expense' if row['Rec_Type'] == 'EXPN' else 'loanors497'), axis=1)
                # Clean up the Amount that contains $ and ,
                data['Amount'] = data['Amount'].str.replace(',', '').replace('$', '').replace("'", '').astype(float)
                # Populate the Election Date and Ballot Item
                electionShape = {}
                for ed in data['Election Date'].unique():
                    electionShape[ed] = {'Title': '{} Election Cycle'.format(ed.split('/')[2]),
                                         'Date': ed,
                                         'OfficeElections': {},
                                         'Referendums': {}, }
                    for bi in data[data['Election Date'] == ed]['Ballot Item']:
                        if not "measure" in bi:
                            electionShape[ed]['OfficeElections'][bi] = {
                                'Title': '{} {} Representative'.format(*(reversed(bi.split('-'))))}
                        else:
                            electionShape[ed]['Referendums'][bi] = {'Title': '{}'.format()}

                # Populate each candidate's fund and expense by election date
                candidatesDict = \
                    data.groupby(by=['Election Date', 'Ballot Item', 'CandidateControlledName', 'Raise_or_Expense'])[
                        'Amount'].sum().to_dict()
                for (electionDate, ballot, candidate, recType), amount in candidatesDict.items():
                    if electionDate in electionShape:
                        if ballot in electionShape[electionDate]['OfficeElections']:
                            if candidate in electionShape[electionDate]['OfficeElections'][ballot]:
                                electionShape[electionDate]['OfficeElections'][ballot][candidate].update(
                                    {recType: round(amount, 2)})
                            else:
                                electionShape[electionDate]['OfficeElections'][ballot].update({candidate: {
                                    "name": candidate,
                                    recType: round(amount, 2)}})
                # Populate the grand total contribution
                totalContributions = data[data['Raise_or_Expense'] == 'raise']['Amount'].sum()
                electionShape.update({'TotalContributions': round(totalContributions, 2)})
                totalContributionsPerElectionCycle = \
                    data[data['Raise_or_Expense'] == 'raise'].groupby(['Election Date'])['Amount'].sum().to_dict()
                # Populate the total contribution of each year
                for yr, amount in totalContributionsPerElectionCycle.items():
                    if yr in electionShape:
                        electionShape[yr].update({"TotalContributions": round(amount, 2)})
                pipe.jsonset('elections', Path.rootPath(), electionShape)
                pipe.execute()
                logger.debug('The election shape in redis {}'.format(self.rj.jsonget('elections')))
            except Exception as e:
                logger.warning(e)


if __name__ == "__main__":
    # TODO: usage python aggregatedcsv2redis.py <filename> yet to be discussed
    filename = sys.argv[1] if len(sys.argv) > 1 else "../scraper/aggregated_data/data.csv"
    csv2Redis = Csv2Redis()
    csv2Redis.setElectionShapeInRedis(filename=filename)
