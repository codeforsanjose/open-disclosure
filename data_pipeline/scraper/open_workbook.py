from openpyxl import load_workbook
from openpyxl.utils.exceptions import InvalidFileException
from xlrd import open_workbook as xlrd_open_workbook
from xlrd.biffh import XLRDError

def open_workbook(full_filepath_name: str):
  try:
    return load_workbook(full_filepath_name)
  except InvalidFileException:
    try:
      wb = xlrd_open_workbook(full_filepath_name)
      return wb
    except XLRDError as e:
      if (str(e) == 'File size is 0 bytes'):
        print(f'File {full_filepath_name} is empty, this happens when Selenium fails to download the file. We don\'t know why this happens.')
        return None
      else:
        print(f'File {full_filepath_name} caused an error: {e}')
        exit(1)