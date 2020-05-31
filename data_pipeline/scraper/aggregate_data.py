import os
import platform

import xlrd
import csv
import glob

import pdb
pdb.set_trace()

cwd = os.getcwd()
AGGREAGATE_DATA_SET = 'Ballot_Measure'

if "Windows" in platform.platform():
    file_delimiters = '\\'
else:
    file_delimiters = '/'

filenames = glob.glob(cwd + '_data_{}_*.xls'.replace('_', file_delimiters).format(AGGREAGATE_DATA_SET))

with open('aggregated_data_{}.csv'.format(AGGREAGATE_DATA_SET), 'w') as your_csv_file:
    wr = csv.writer(your_csv_file, quoting=csv.QUOTE_ALL)

    count = 0
    for filename in filenames:
        count = count + 1
        print(count)
        wb = xlrd.open_workbook(filename)
        sheet = wb.sheet_by_index(0)
        for rownum in range(sheet.nrows):
            wr.writerow(sheet.row_values(rownum))