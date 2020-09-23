'''
Do not merge. For discussion only.
Alternative way is to use awk and redis-cli
'''
import logging
import mimetypes
import os
import sys
from datetime import datetime

import pandas as pd
from rejson import Client, Path

logger = logging.getLogger(__name__)


class Csv2Redis:

    def __init__(self, filename: str):
        self.rj = Client(host=os.environ.get(
            'REDIS_HOST', 'localhost'), decode_responses=True)
        # Read the clean csv file from Google sheet. This file won't work on just aggregated csv from scrapper.
        # Skip every other line. If the clean csv changes to every line, we need to update this as well.
        if not os.path.exists(filename):
            logger.warning(
                '{} does not exist. Please double check the file path.'.format(filename))
        if not os.path.isfile(filename):
            logger.warning(
                'Only process csv file. Please double check {} is a file.'.format(filename))
        filetype, _ = mimetypes.guess_type(filename)
        if 'csv' in filetype:
            self.data = pd.read_csv(
                filename, skiprows=lambda x: x % 2 == 1, sep=',', quotechar='"', )
        elif 'spreadsheet' in filetype:
            logger.info('Reading plain text csv is faster and is encouraged.')
            self.data = pd.read_excel(
                filename, skiprows=lambda x: x % 2 == 1, )
        else:
            logger.warning('Only read csv and spreadsheet file for now.')
            return
        if self.data.shape[0] < 100:
            logger.info('{} only have {} row.'.format(
                filename, self.data.shape[0]))
        # Add candidate ID column. candidate ID is <Ballot Item>;<CandidateControlledName>;<Election Date>
        self.data['ID'] = self.data['Ballot Item'].map(str) + ';' + self.data['CandidateControlledName'].map(
            str) + ';' + self.data['Election Date'].map(str)
        # Round Amount to decimal 2
        self.data['Amount'] = self.data['Amount'].str.replace(',', '').replace('$', '').replace("'", '').astype(
            float).round(decimals=2)
        self.metadata = str(datetime.fromtimestamp(os.path.getmtime(filename)))

    def setElectionShapeInRedis(self) -> list:
        '''
        Populate election shape into redis
        '''
        data = self.data
        electionShape = {'Elections': {}}
        dataAmount = data[['Ballot Item', 'CandidateControlledName',
                           'Election Date', 'Amount', 'Rec_Type', 'ID']]
        try:
            # There are 4 types RCPT, EXPN, LOAN, S497.
            elections = {}
            for ed in dataAmount['Election Date'].unique():
                dataPerElectionDate = dataAmount[dataAmount['Election Date'] == ed]
                totalContributions = dataPerElectionDate[dataPerElectionDate['Rec_Type'] == 'RCPT'][
                    'Amount'].sum().round(decimals=2)
                officeElections = []
                referendums = [
	{
		"Name": "Ballot Measure X",
		"Election":
		{
			"ElectionCycle": "2020 Election Cycle"	
		},
        "Committee": [{ # Any committees linked to that candidate and election.
			"Name": "For Measure X",
			"TotalFunding": 300
		}, 
        {
			"Name": "Against Measure X",
			"TotalFunding": 300
		}]
	},
    {
		"Name": "Ballot Measure Y",
		"Election":
		{
			"ElectionCycle": "2020 Election Cycle"	
		},
        "Committee": [{ 
			"Name": "For Measure Y",
			"TotalFunding": 456
		}, {
			"Name": "Against Measure Y",
			"TotalFunding": 799
		}]
	},
    {
		"Name": "Ballot Measure Z",
		"Election":
		{
			"ElectionCycle": "2020 Election Cycle"	
		},
        "Committee": [{ 
			"Name": "For Measure Z",
			"TotalFunding": 78678
		}, {
			"Name": "Against Measure Z",
			"TotalFunding": 22454
		}]
	}]
                for bi in dataPerElectionDate['Ballot Item'].unique():
                    dataPerElectionDateAndBallotItem = dataPerElectionDate[
                        dataPerElectionDate['Ballot Item'] == bi]
                    totalContributionsPerBallotItem = \
                        dataPerElectionDateAndBallotItem[dataPerElectionDateAndBallotItem['Rec_Type'] == 'RCPT'][
                            'Amount'].sum().round(decimals=2)
                    if not 'measure' in bi:
                        officeElections.append(
                            {'Title': bi, 'CandidateIDs': dataPerElectionDateAndBallotItem['ID'].unique().tolist(),
                             'TotalContributions': totalContributionsPerBallotItem})
                    else:
                        referendums.append(
                            {'Title': bi, 'Description': bi, 'TotalContributions': totalContributionsPerBallotItem})
                elections = {'Title': '{} Election Cycle'.format(ed.split('/')[2]),
                             'Date': ed,
                             'TotalContributions': totalContributions,
                             'OfficeElections': officeElections,
                             'Referendums': referendums}
                electionShape['Elections'][ed] = elections
                electionShape['Metadata'] = self.metadata
        except Exception as e:
            logger.debug(e)
            return False
        with self.rj.pipeline() as pipe:
            pipe.jsonset('elections', Path.rootPath(), electionShape)
            pipe.execute()
        logger.debug('The election shape in redis {}'.format(
            self.rj.jsonget('elections')))
        return True

    def setCandidateShapeInRedis(self, electionDate='11/3/2020') -> bool:
        '''
        Populate candidate shape into redis
        Redis data spec
        Candidates: [{
            ID: "councilmember-district-6;dev-davis;11-3-2020",
            Name: "Dev Davis",
            TotalRCPT: 300,
            TotalLOAN: 100,
            TotalEXPN: 100,
            FundingByType: {
                IND: 300,
                COM: 100
            },
            FundingByGeo: {
                CA: 300,
                SJ: 100
            }
            ExpenditureByType: {
        # TODO: We could have populated candidates for all election date but right now the spec only asks for the current year.
        '''
        # TODO: TotalFunding - understand how TotalFunding is calculated and perhaps add TotalFunding
        data = self.data
        candidateShape = {'Candidates': []}
        try:
            dataAmount = data[
                ['Ballot Item', 'CandidateControlledName', 'Election Date', 'Amount', 'Rec_Type', 'Entity_Cd',
                 'Entity_Nam L', 'Entity_Nam F', 'Entity_City', 'Entity_ST', 'Expn_Code', 'ID']]
            candidateIDs = pd.unique(dataAmount['ID'])

            for cid in candidateIDs:
                candidate = {'ID': cid}
                name = cid.split(';')[1]
                candidate['Name'] = name
                dataPerCandidate = dataAmount[
                    (dataAmount['CandidateControlledName'] == name) & (dataAmount['Election Date'] == electionDate)]

                # Get transaction by type
                totalByRecType = dataPerCandidate.groupby(
                    ['Rec_Type'])[['Amount']].sum().round(decimals=2).to_dict()
                if 'RCPT' in totalByRecType['Amount']:
                    candidate['TotalRCPT'] = totalByRecType['Amount']['RCPT']
                if 'EXPN' in totalByRecType['Amount']:
                    candidate['TotalEXPN'] = totalByRecType['Amount']['EXPN']
                if 'LOAN' in totalByRecType['Amount']:
                    candidate['TotalLOAN'] = totalByRecType['Amount']['LOAN']
                if 'S497' in totalByRecType['Amount']:
                    candidate['TotalS497'] = totalByRecType['Amount']['S497']

                # Get funding by committee type
                recpDataPerCandidate = dataPerCandidate[dataPerCandidate['Rec_Type'] == 'RCPT']
                totalByComType = recpDataPerCandidate.groupby(['Entity_Cd'])[['Amount']].sum().round(
                    decimals=2).to_dict()
                candidate['FundingByType'] = totalByComType['Amount']

                # Get funding by geo
                totalByGeo = recpDataPerCandidate.groupby(
                    ['Entity_ST'])[['Amount']].sum().round(decimals=2).to_dict()
                candidate['FundingByGeo'] = totalByGeo['Amount']

                # Get expenditure by type
                expnDataPerCandidate = dataPerCandidate[dataPerCandidate['Rec_Type'] == 'EXPN']
                totalByExpnType = expnDataPerCandidate.groupby(['Expn_Code'])[['Amount']].sum().round(
                    decimals=2).to_dict()
                candidate['ExpenditureByType'] = totalByExpnType['Amount']

                # Get Committees
                committees = recpDataPerCandidate[recpDataPerCandidate['Entity_Cd'] == 'COM'][
                    'Entity_Nam L'].unique().tolist()
                candidate['Committees'] = committees

                candidateShape['Candidates'].append(candidate)
                candidateShape['Metadata'] = self.metadata
                logger.debug(candidateShape)
        except Exception as e:
            logger.debug(e)
            return False
        with self.rj.pipeline() as pipe:
            pipe.jsonset('candidates', Path.rootPath(), candidateShape)
            pipe.execute()
        logger.debug('The candidate shape in redis {}'.format(
            self.rj.jsonget('candidates')))
        return True


if __name__ == "__main__":
    # TODO: usage python aggregatedcsv2redis.py <filename> yet to be discussed
    filename = sys.argv[1] if len(
        sys.argv) > 1 else "../scraper/aggregated_data/2020 Election Data.csv"
    csv2Redis = Csv2Redis(filename=filename)
    csv2Redis.setElectionShapeInRedis()
    csv2Redis.setCandidateShapeInRedis()
