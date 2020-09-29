import pymysql
pymysql.install_as_MySQLdb()

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column, String, Integer, Float, Date
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine, select, MetaData, Table

from sqlalchemy.orm import query
from sqlalchemy.sql import select

import pprint
pp = pprint.PrettyPrinter(indent=4)

class Data_Query:


  def __init__(self):
    self.engine = create_engine('mysql+mysqldb://admin:QEruiTUa7GjHVrQUnP2P@database-1.c2fzqal0xakt.us-west-1.rds.amazonaws.com/test2')
    self.candidates_data = {"Candidates": []}

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
    print(self.candidates)

  
  def extract_data_per_candidate(self):
    for candidate in self.candidates:
      print(" -- PROCESSING {}".format(candidate))
      candidate_info = self.execute_query('SELECT DISTINCT Filer_Nam_L, Ballot_Item, date(Election_Date) FROM test2 WHERE CandidateControlledName = "{}";'.format(candidate.replace('"','\\"')))
      print(candidate_info)
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
    
  def extract_committee_total_funding(self):
    print(self.candidates_data)
    for candidate in self.candidates_data['Candidates']:
      for committee in candidate['Committees']:
        name = committee['Name']

        total_funded = self.execute_query('SELECT SUM(Amount) FROM test2 WHERE Filer_Nam_L = "{}" AND Rec_Type = "RCPT";'.format(name))
        print(total_funded)
        print(self.candidates_data['Candidates'])
    # pp.pprint(self.candidates_data)

data = Data_Query()
data.retrieve_candidates()
data.extract_data_per_candidate()
# data.extract_committee_total_funding()








# create a configured "Session" class
# session = sessionmaker(bind=engine)()
# session = Session()

  # Base = declarative_base()
# metadata = MetaData(bind=None)
# table = Table('test2', metadata, autoload = True, autoload_with = engine)
# stmt = select([table]).unique_params({"CandidateControlledName"})

# connection = engine.connect()
# results = connection.execute(stmt).fetchall()

# for result in results:
#     print(result)

# class Candidates(Base):

#   __tablename__ = "test2"

#   id = Column(Integer, primary_key=True)


# result = session.query(Candidates).all()

# print(result)
# s = select('Ballot Item')

# result = conn.execute(s)

# for row in result:
#   print(row)

# class ThingOne(object):
#     def go(self, session):
#         session.query('Ballot Item')

# def run_my_program():
#     session = Session()
#     try:
#       session.table

#     except:
#         session.rollback()
#         raise
#     finally:
#         session.close()

# run_my_program()

# work with sess
# myobject = MyObject('foo', 'bar')
# session.add(myobject)
# session.commit()
