import os

import xlrd
import csv
import glob

import pdb
pdb.set_trace()

cwd = os.getcwd()

filenames = glob.glob(cwd + '\\data\\*.xls')

with open('your_csv_file.csv', 'w') as your_csv_file:
    wr = csv.writer(your_csv_file, quoting=csv.QUOTE_ALL)

    count = 0
    for filename in filenames:
        count = count + 1
        print(count)
        wb = xlrd.open_workbook(filename)
        sheet = wb.sheet_by_index(0)
        for rownum in range(sheet.nrows):
            wr.writerow(sheet.row_values(rownum))

