
#-----------------------------------------------------
# NEEDS MORE WORK AND DATA CLARIFIATION
#-----------------------------------------------------

import xlrd
import csv
import glob
from os import path, pardir
import json
import pandas as pd

# Custom python module
from dirmanager import DirManager

class PreProcessing():
    def __init__(self, scraper_download_dir, BALLOT_TYPE):
        download_file_dir_wildcard = '{}/*.xls'.format(scraper_download_dir)
        self.filenames = glob.glob(download_file_dir_wildcard)
        self.download_dir = scraper_download_dir
        # Create new directory for storing aggregated data
        download_folder = path.abspath(path.join(scraper_download_dir, pardir))
        aggregateFolder = DirManager([download_folder, 'aggregated_data'])
        aggregateFolder.createFolder()
        new_folder = aggregateFolder.getDirectory()

        BALLOT_TYPE = BALLOT_TYPE.replace(' ', '_')
        self.new_csv_file = '{}{}.csv'.format(new_folder, BALLOT_TYPE)

    def aggregateData(self):
        with open(self.new_csv_file, 'w') as new_aggregate_csv:
            new_worksheet = csv.writer(new_aggregate_csv, quoting=csv.QUOTE_ALL)

            # Loop through all workbooks (EXCEL)
            header = False
            for filename in self.filenames:
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

    def insertCandidates(self):

        candidate_data = {}
        # insertCandidateFolder = DirManager([self.download_dir, 'insert'])
        # aggregateFolder.createFolder()
        # new_folder = aggregateFolder.getDirectory()
        if os.
        with open('candidate_info.json', 'r') as data:
            candidate_data = json.load(data)

        # print(candidate_data['The Silicon Valley Organization PAC'])

        candidateHeader = ['Cand_Nam F', 'Cand_Nam L']

        # print(self.filenames)

        for filename in self.filenames:
            print(filename)
            errordTypes = ['Cmte_ID', 'Intr_Nam L', 'Intr_City', 'Intr_ST', 'Off_S_H_Cd', 'XRef_Match']
            data = pd.read_excel(filename, dtype={datatype: str for datatype in errordTypes})

            extracted_candidate = []
            # file_filer_name = data.columns.get_loc('Filer_Nam L')
            file_filer_name = data.iloc[0, data.columns.get_loc('Filer_Nam L')]

            for candidate in candidate_data:
                if candidate in file_filer_name:
                    extracted_candidate = candidate_data[candidate]
                    if len(extracted_candidate) == 0: 
                        print(extracted_candidate)
                    break
                


            count_row = data.shape[0]

            # for i in range(0, count_row):
            #     data.iloc[i, data.columns.get_loc(candidateHeader[0])] = testData[0]
            #     data.iloc[i, data.columns.get_loc(candidateHeader[1])] = testData[0]

            #   data.to_excel('./test{}.xls'.format(i), index=False)


        # print("Under Construction")


    def createJSONFiles():
        

process = PreProcessing('/Users/darrenpham/CodeforSanJose/open-disclosure/open-disclosure/data_pipeline/scraper/data/Office_Sought', 'Office Sought')
process.insertCandidates()
