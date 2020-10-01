import datetime
import pymysql
pymysql.install_as_MySQLdb()

from sqlalchemy import create_engine
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import sessionmaker
# from sqlalchemy import func
# from sqlalchemy import distinct

import redis
import json

import pprint
pp = pprint.PrettyPrinter(indent=4)

class Data_Query:

  def __init__(self):
    self.r = redis.StrictRedis(host="redis.corp", port=6379)
    self.SANJOSE_ZIPCODES1 = [94089, 95002, 95008, 95013, 95014, 95032, 95035, 95037, 95050, 95054, 95070, 95110, 95111, 95112, 95113, 95116, 95117, 95118, 95119, 95120, 95121, 95122, 95123, 95124, 95125, 95126, 95127, 95128, 95129, 95130, 95131, 95132, 95133, 95134, 95135, 95136, 95138, 95139, 95140, 95148]
    self.SANJOSE_ZIPCODES2 = [95101, 95103, 95106, 95108, 95109, 95110, 95111, 95112, 95113, 95115, 95116, 95117, 95118, 95119, 95120, 95121, 95122, 95123, 95124, 95125, 95126, 95127, 95128, 95129, 95130, 95131, 95132, 95133, 95134, 95135, 95136, 95138, 95139, 95141, 95148, 95150, 95151, 95152, 95153, 95154, 95155, 95156, 95157, 95158, 95159, 95160, 95161, 95164, 95170, 95172, 95173, 95190, 95191, 95192, 95193, 95194, 95196]
    self.ELECTION_DATE = ''
    self.engine = create_engine('mysql+mysqldb://app_user:Dn4wPfGnT78d4FtT@database-1.c2fzqal0xakt.us-west-1.rds.amazonaws.com/test2')
    # Base = declarative_base(self.engine)

    # class Test2(Base):
    #   """
    #   eg. fields: id, title
    #   """
    #   __tablename__ = 'test2'
    #   __table_args__ = {'autoload': True}

    # metadata = Base.metadata
    # self.session = sessionmaker(bind=self.engine)()

    # try:
    #   # res = self.session.query(func.count(Test2.Election_Date))
    #   # print(res)
    #   res = self.session.query(distinct(Test2.Election_Date))
    #   print(res)
    #   for r in res:
    #     print(r)
    # except:
    #   self.session.rollback()
    #   raise
    # finally:
    #   self.session.close()

    self.candidates_data = {"Candidates": []}
    self.election_data = {"Elections": {}}

  def execute_query(self, query):
    output = []
    with self.engine.connect() as conn:
      rs = conn.execute(query)
      for row in rs:
        output.append(row)

    return output

  def lc_n_rm_spc(self, s):
    return s.strip().lower().replace(' ', '-')

  
  def extract_latest_election(self):
    self.ELECTION_DATE = self.execute_query('SELECT DISTINCT max(date(Election_Date)) FROM test2;')[0][0]
    # self.ELECTION_DATE = "2020-3-3"
    self.ELECTION_DATE_US = datetime.datetime.strptime(self.ELECTION_DATE, '%Y-%m-%d').strftime('%m/%d/%y')
    # print(self.ELECTION_DATE)


  def retrieve_candidates(self):
    self.candidates = []

    q = self.execute_query('SELECT DISTINCT CandidateControlledName FROM test2 WHERE Election_Date = "{}";'.format(self.ELECTION_DATE))
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
      committee_total_funding = self.execute_query('SELECT SUM(Amount) FROM test2 WHERE Filer_Nam_L = "{}" AND (Rec_Type = "S497" OR Rec_Type = "RCPT") AND Election_Date = "{}";'.format(committee, self.ELECTION_DATE))[0][0]
      candidate_total_funding = round(self.execute_query('SELECT SUM(Amount) FROM test2 WHERE CandidateControlledName = "{}" AND (Rec_Type = "S497" OR Rec_Type = "RCPT") AND Election_Date = "{}";'.format(candidate.replace('"','\\"'), self.ELECTION_DATE))[0][0],2)
      candidate_total_expenditure = round(self.execute_query('SELECT SUM(Amount) FROM test2 WHERE CandidateControlledName = "{}" AND (Rec_Type = "S496" OR Rec_Type = "EXPN") AND Election_Date = "{}";'.format(candidate.replace('"','\\"'), self.ELECTION_DATE))[0][0],2)
      candidate_total_loans = round(self.execute_query('SELECT SUM(Amount) FROM test2 WHERE CandidateControlledName = "{}" AND (Rec_Type = "LOAN") AND Election_Date = "{}";'.format(candidate.replace('"','\\"'), self.ELECTION_DATE))[0][0],2)

      # GeoBreakdown
      candidate_sanjose_funding = self.execute_query('SELECT SUM(Amount) FROM test2 WHERE CandidateControlledName = "{}" AND (Rec_Type = "S497" OR Rec_Type = "RCPT") AND Election_Date = "{}" AND Entity_City = "San Jose";'.format(candidate.replace('"','\\"'),self.ELECTION_DATE))[0][0]
      candidate_california_funding = self.execute_query('SELECT SUM(Amount) FROM test2 WHERE CandidateControlledName = "{}" AND (Rec_Type = "S497" OR Rec_Type = "RCPT") AND Election_Date = "{}" AND Entity_ST = "CA";'.format(candidate.replace('"','\\"'),self.ELECTION_DATE))[0][0]

      # FundingTypeBreakdown
      funding_codes = ["IND", "COM", "OTH", "PTY", "SCC"]
      code_funding_breakdown = {}
      for fc in funding_codes:
        try:
          code_fund = round(self.execute_query('SELECT SUM(Amount) FROM test2 WHERE CandidateControlledName = "{}" AND (Rec_Type = "S497" OR Rec_Type = "RCPT") AND Election_Date = "{}" AND Entity_Cd = "{}";'.format(candidate.replace('"','\\"'), self.ELECTION_DATE, fc))[0][0],2)
        except TypeError:
          code_fund = 0
        code_funding_breakdown[fc] = round(code_fund/candidate_total_funding,2)

      # ExpenditureTypeBreakdown
      expn_codes = ["SAL", "CMP", "CNS", "CVC", "FIL", "FND", "LIT", "MBR", "MTG", "OFC", "POL", "POS", "PRO", "PRT", "RAD", "RFD", "TEL", "TRS", "WEB"]
      expn_funding_breakdown = {}
      for ec in expn_codes:
        try:
          ex_fund = round(self.execute_query('SELECT SUM(Amount) FROM test2 WHERE CandidateControlledName = "{}" AND (Rec_Type = "S496" OR Rec_Type = "EXPN") AND Election_Date = "{}" AND Expn_Code = "{}";'.format(candidate.replace('"','\\"'), self.ELECTION_DATE, ec))[0][0],2)
        except TypeError:
          ex_fund = 0
        expn_funding_breakdown[ec] = round(ex_fund/candidate_total_expenditure,2)
      
      # Contributor Breakdown
      contributors_data = []
      contributors = self.execute_query('SELECT Entity_Nam_F, Entity_Nam_L, Entity_Cd, Entity_Occ, Entity_ZIP4, Amount, Tran_Date  FROM test2 WHERE CandidateControlledName = "{}" AND (Rec_Type = "S497" OR Rec_Type = "RCPT") AND Election_Date = "{}";'.format(candidate.replace('"','\\"'),self.ELECTION_DATE))
      for c in contributors:
        name = ''
        if c[0] is not None and c[1] is not None:
          name = "{} {}".format(c[0],c[1]) 
        elif c[0] is None and c[1] is not None:
          name = c[1]
        else:
          name = "Anonymous Donor"
        
        contributors_data.append({
          "Name": name,
          "Contributor_Type": c[2],
          "Occupation": c[3],
          "Zip_Code": c[4][:5],
          "Amount": c[5],
          "Date": datetime.date.strftime(datetime.datetime(1899, 12, 30) + datetime.timedelta(days=c[6]), "%m/%d/%Y")
        })
      
      
      self.candidates_data['Candidates'].append({
        "ID": "{};{};{}".format(self.lc_n_rm_spc(district), self.lc_n_rm_spc(candidate), election_date),
        "Name": candidate,
        "GeoBreakdown": {
          "InSanJosePercent": round(round(candidate_sanjose_funding,2)/candidate_total_funding,2),
          "OutSanJosePercent": round(1-round(candidate_sanjose_funding,2)/candidate_total_funding,2),
          "InCAPercent": round(round(candidate_california_funding,2)/candidate_total_funding,2),
          "OutCAPercent": round(1-round(candidate_california_funding,2)/candidate_total_funding,2)
        },
        "FundingTypeBreakdown": code_funding_breakdown,
        "ExpendituresTypeBreakdown": expn_funding_breakdown,
        "TotalFunding": candidate_total_funding,
        "TotalExpenditures": candidate_total_expenditure,
        "TotalLoans": candidate_total_loans,
        "Committees": [
          {
            "ID": "{};{}".format(self.lc_n_rm_spc(committee), election_date),
            "Name": "{}".format(committee),
            "TotalFunding": round(committee_total_funding, 2)
          }
        ],
        "Contributors": contributors_data 
      })
    # pp.pprint(self.candidates_data)

  
  def extract_data_for_election(self):
    self.total_contributions = self.execute_query('SELECT SUM(Amount) FROM test2 WHERE CandidateControlledName != "Independent" AND (Rec_Type = "S497" OR Rec_Type = "RCPT") AND Election_Date = "{}";'.format(self.ELECTION_DATE))[0][0]
    
    ### Retrieve Office Data
    # Retrieve All Elections for Office in N election cycle
    office_elections = self.execute_query('SELECT DISTINCT Ballot_Item FROM test2 WHERE CandidateControlledName != "Independent" AND Election_Date = "{}"'.format(self.ELECTION_DATE))

    # Loop through elections
    office_elections_data = []
    for office in office_elections:
      # Retrieve Candidates for the Election/Office
      candidates = self.execute_query('SELECT DISTINCT CandidateControlledName FROM test2 WHERE Ballot_Item = "{}" AND Election_Date = "{}"'.format(office[0], self.ELECTION_DATE))

      # Retrieve total contributions per Office Election
      office_contributions = self.execute_query('SELECT SUM(Amount) FROM test2 WHERE Ballot_Item = "{}" AND Election_Date = "{}" AND (Rec_Type = "S497" OR Rec_Type = "RCPT")'.format(office[0], self.ELECTION_DATE))[0]

      office_elections_data.append({
        "Title": office[0].replace('-', ' '),
        "CandidateIDs": ["{};{}".format(self.lc_n_rm_spc(c[0]),self.ELECTION_DATE_US) for c in candidates if c[0] != "Independent"],
        "TotalContributions": round(office_contributions[0],2)
      })


    ### Retrieve Referendum/Ballot Measure Data
    referendum_data = []
    referendums = self.execute_query('SELECT DISTINCT Ballot_Item FROM test2 WHERE Ballot_Type = "Ballot Measure" AND Election_Date = "{}";'.format(self.ELECTION_DATE))
    for r in referendums:
      referendum_letter = ""
      headers = ["Bal_Num", "G_From_E_F"]
      for h in headers:
        try:
          measure_letter = self.execute_query('SELECT DISTINCT {} from test2 where Ballot_Item = "{}";'.format(h, r[0]))
          measure_contributions = self.execute_query('SELECT SUM(Amount) FROM test2 WHERE Ballot_Item = "{}" AND (Rec_Type = "S497" OR Rec_Type = "RCPT");'.format(r[0]))
          for letter in measure_letter:
            for i in range(2):
              for j in range(2):
                try:
                  if letter[i][j] is not None:
                    referendum_letter = letter[i][j]
                except:
                  pass
        except:
          pass
      referendum_data.append({
        "Title": "Ballot Measure {}".format(referendum_letter),
        "Description": "TBD",
        "TotalContributions": round(measure_contributions[0][0], 2)
      })

    ### Export data into Class variable
    self.election_data["Elections"] = {
      self.ELECTION_DATE_US: {
      "TotalContributions": round(self.total_contributions, 2),
      "Date": self.ELECTION_DATE,
      "Office Elections": office_elections_data,
      "Referendums": referendum_data
      }
    }

  
  def metadata(self):
    self.election_data["metadata"] = {"DateProcesses": datetime.date.strftime(datetime.date.today(), "%Y/%m/%d")}
    # print(len(self.SANJOSE_ZIPCODES1))
    # print(len(self.SANJOSE_ZIPCODES2))
    pp.pprint(self.candidates_data)
    pp.pprint(self.election_data)
  
  def insertRedis(self):
    self.r.execute_command("JSON.SET", "candidates", ".", json.dumps(list(self.candidates_data.values())))
    self.r.execute_command("JSON.SET", "elections", ".", json.dumps(list(self.election_data.values())))
    self.r.execute_command("JSON.SET", "TotalContributions", ".", json.dumps(list({"TotalFunding":round(self.total_contributions, 2)}.values())))
    self.r.execute_command("SAVE")
    # with self.rj.pipeline() as pipe:
    #   pipe.jsonset('elections', "/data", self.election_data)
    #   pipe.jsonset('candidates', "/data", self.candidates_data)
    #   pipe.execute()
    # print(self.rj.jsonget('elections'))
    # print(self.rj.jsonget('candidates'))

data = Data_Query()
data.extract_latest_election()
data.retrieve_candidates()
data.extract_data_per_candidate()
data.extract_data_for_election()
data.metadata()
data.insertRedis()