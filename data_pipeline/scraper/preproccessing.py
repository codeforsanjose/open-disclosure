import xlrd
import csv
import glob

# Custom python module
from dircreator import DirCreator

class PreProcessing():
    def __init__(self, scraper_input):
        download_file_dir_wildcard = '{}{}*.xls'.format(scraper_input.new_dir.folder, scraper_input.new_dir.folder_delimiter)
        self.filenames = glob.glob(download_file_dir_wildcard)

        self.BALLOT_TYPE = scraper_input.BALLOT_TYPE.replace(' ', '_')
        aggregateFolder = DirCreator(['aggregated_data'])
        aggregateFolder.createFolder()

        self.new_csv_file = '{}{}_aggregated.csv'.format(aggregateFolder.getDirectory(), self.BALLOT_TYPE)

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