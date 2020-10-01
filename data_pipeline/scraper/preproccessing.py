import xlrd
import csv
import glob

from os import path, pardir, listdir, devnull, name
from sys import getsizeof
import json
import pandas as pd
import xlrd
from time import sleep

# Custom python module
from dirmanager import DirManager

FILE_DIVIDER = '\\' if name == 'nt' else '/'

class PreProcessing():
    def __init__(self, scraper_download_dir):
        download_file_dir_wildcard = '{}/*.xls'.format(scraper_download_dir)
        self.filenames = glob.glob(download_file_dir_wildcard)
        self.download_dir = scraper_download_dir    

    def aggregateData(self):
        # Create new directory for storing aggregated data
        # download_folder = path.abspath(path.join(self.download_dir, pardir))
        aggregateFolder = DirManager(['aggregated_data'])
        aggregateFolder.createFolder()
        new_folder = aggregateFolder.getDirectory()
        new_csv_file = '{}/data.csv'.format(new_folder)

        insertColumsFolder = self.insertCandidateFolder.getDirectory()
        filenames = sorted([insertColumsFolder + "/" + f for f in listdir(insertColumsFolder)], key=path.getmtime)

        with open(new_csv_file, 'w') as new_aggregate_csv:
            new_worksheet = csv.writer(new_aggregate_csv, quoting=csv.QUOTE_ALL)

            # Loop through all workbooks (EXCEL)
            header = False
            for filename in filenames:
                # Open worksheet
                wb = xlrd.open_workbook(filename)
                sheet = wb.sheet_by_index(0)

                # Only pull excel header from the first file to reduce duplicates
                if header:
                    for rownum in range(1, sheet.nrows):
                        new_worksheet.writerow(sheet.row_values(rownum))
                else:
                    for rownum in range(sheet.nrows):
                        new_worksheet.writerow(sheet.row_values(rownum))
                    header = True

    def insertColumns(self, numDownloads, CandidateName, ElectionDate, BallotItem, BallotType, Supp_Opp):
        print('Processing {} for {}'.format(numDownloads, CandidateName))

        if numDownloads == 0:
            return

        self.insertCandidateFolder = DirManager(['insertedData'])
        self.insertCandidateFolder.createFolder()
        new_folder = self.insertCandidateFolder.getDirectory()
        filenames = self.insertColumnsHelper()


        candidateHeader = "CandidateControlledName"
        electionDateHeader = "Election_Date"
        ballotItemHeader = "Ballot_Item"
        ballotTypeHeader = "Ballot_Type"
        suppOppHeader = "Support_or_Oppose"

        print(filenames)
        for fullfilepathname in filenames[-numDownloads:]:
            filename = path.basename(fullfilepathname)
            print(filename)

            wb = xlrd.open_workbook(fullfilepathname, logfile=open(devnull, 'w'))
            errordTypes = ['Cmte_ID', 'Intr_Nam L', 'Intr_City', 'Intr_ST', 'Off_S_H_Cd', 'XRef_Match']
            data = pd.read_excel(wb, dtype={datatype: str for datatype in errordTypes})

            if CandidateName == "   ":
                data.insert(0, candidateHeader, "Independent")
            else:
                data.insert(0, candidateHeader, CandidateName)
            
            data.insert(0, ballotItemHeader, BallotItem)
            data.insert(0, suppOppHeader, Supp_Opp)
            data.insert(0, ballotTypeHeader, BallotType)
            data.insert(0, electionDateHeader, ElectionDate)
            

            data.to_excel('{}/{}'.format(new_folder, filename), index=False)
    
    def insertColumnsHelper(self):
        partial_download = True
        filenames = sorted([self.download_dir + FILE_DIVIDER + f for f in listdir(self.download_dir)], key=path.getmtime)

        while partial_download:
            filename = path.basename(filenames[-1])
            print(filename)
            if "transactionExportGrid" in filename and "crdownload" not in filename:
                partial_download = False
            else:
                sleep(3)
                filenames = sorted([self.download_dir + FILE_DIVIDER + f for f in listdir(self.download_dir)], key=path.getmtime)

        return filenames
