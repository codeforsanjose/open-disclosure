import pymysql
pymysql.install_as_MySQLdb()

from sqlalchemy import create_engine

import pprint
pp = pprint.PrettyPrinter(indent=4)

class Data_Query:

  def __init__(self):
    self.ELECTION_DATE = '2020-11-3'
    self.engine = create_engine('mysql+mysqldb://admin:QEruiTUa7GjHVrQUnP2P@database-1.c2fzqal0xakt.us-west-1.rds.amazonaws.com/test2')
    self.candidates_data = {"Candidates": []}
    self.election_data = {"Elections": []}

  def execute_query(self, query):
    output = []
    with self.engine.connect() as conn:
      rs = conn.execute(query)
      for row in rs:
        output.append(row)
    return output

  def lc_n_rm_spc(self, s):
    return s.strip().lower().replace(' ', '-')


  def retrieve_candidates(self):
    self.candidates = []

    q = self.execute_query('SELECT DISTINCT CandidateControlledName FROM test2;')
    for candidate in q:
      self.candidates.append(candidate[0])
    self.candidates.remove('Independent')
    # print(self.candidates)

  
  def extract_data_per_candidate(self):
    for candidate in self.candidates:
      # print(" -- PROCESSING {}".format(candidate))
      candidate_info = self.execute_query('SELECT DISTINCT Filer_Nam_L, Ballot_Item, date(Election_Date) FROM test2 WHERE CandidateControlledName = "{}" AND Election_Date = "{}";'.format(candidate.replace('"','\\"'),self.ELECTION_DATE))
      # print(candidate_info)
      committee = candidate_info[0][0]
      district = candidate_info[0][1]
      election_date = candidate_info[0][2]
      total_funding = self.execute_query('SELECT SUM(Amount) FROM test2 WHERE Filer_Nam_L = "{}" AND Rec_Type = "RCPT";'.format(committee))[0][0]
      self.candidates_data['Candidates'].append({
        "ID": "{};{};{}".format(self.lc_n_rm_spc(district), candidate, election_date),
        "Committees": [
          {
            "ID": "{};{}".format(self.lc_n_rm_spc(committee), election_date),
            "Name": "{}".format(committee),
            "Total Funding": round(total_funding, 2)
          }
        ]
      })
    pp.pprint(self.candidates_data)
    
  def extract_election(self):
    self.elections = []

    q = self.execute_query('SELECT DISTINCT date(Election_Date) FROM test2;')
    for candidate in q:
      self.elections.append(candidate[0])
    # print(self.elections[0])
  
  def extract_data_for_election(self):
    office_elections_data = {}
    total_contributions = self.execute_query('SELECT SUM(Amount) FROM test2 WHERE CandidateControlledName != "Independent" AND Rec_Type = "RCPT" AND Election_Date = "{}";'.format(self.ELECTION_DATE))[0][0]
    office_elections = self.execute_query('SELECT DISTINCT Ballot_Item FROM test2 WHERE CandidateControlledName != "Independent" AND Election_Date = "{}"'.format(self.ELECTION_DATE))
    
    for office in office_elections:
      candidates = self.execute_query('SELECT DISTINCT CandidateControlledName FROM test2 WHERE Ballot_Item = "{}" AND Election_Date = "{}"'.format(office[0], self.ELECTION_DATE))
      
      office_elections_data[office[0]] = []
      for c in candidates:
        if c[0] != "Independent":
          office_elections_data[office[0]].append(c[0])

      office_contributions = self.execute_query('SELECT SUM(Amount) FROM test2 WHERE Ballot_Item = "{}" AND Election_Date = "{}"'.format(office[0], self.ELECTION_DATE))[0]
      office_elections_data[office[0]].append(round(office_contributions[0],2))

    print(office_elections_data)
    self.election_data["Elections"].append({
      self.ELECTION_DATE: {"Total Contributions": round(total_contributions, 2),
      "Office Elections": []}
    })

    for office in office_elections_data:
      print(office)


    print(self.election_data)

data = Data_Query()
data.retrieve_candidates()
data.extract_data_per_candidate()
data.extract_election()
data.extract_data_for_election()