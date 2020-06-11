import pandas as pd 
import platform
import os
from glob import glob
import math


if "Windows" in platform.platform():
    folder_delimiter = '\\'
else:
    folder_delimiter = '/'
path = os.getcwd()
sub_directory = folder_delimiter.join(['data_validation']).replace(' ','_')
folder = os.path.join(path, sub_directory) + folder_delimiter

download_file_dir_wildcard = '{}*.xls'.format(folder)
filenames = glob(download_file_dir_wildcard)




# filepath = 'data/aggregated_data'
# filename = 'data/aggregated_data/Ballot_Measure.csv'
parseData = ['Cand_Nam F', 'Cand_Nam L']
testData = ['TEST LAST', 'TEST LAST']

# errordTypes = ['Cand_Nam F', 'Off_S_H_Cd', 'XRef_Sch Nm', 'XRef_Match']

for filename in filenames:
  errordTypes = ['Cmte_ID', 'Intr_Nam L', 'Intr_City', 'Intr_ST', 'Off_S_H_Cd', 'XRef_Match']
  data = pd.read_excel(filename,
                      dtype={datatype: str for datatype in errordTypes})

  # print(data)

  df1 = data[['Cand_Nam F', 'Cand_Nam L']]
  # df1 = data[["Filer_ID"]]


  # for value in df1.values:
  #   # print(type(value[1]))
  #   # print(value[1])
  #   try:
  #     x = float(value[0])
  #     if not math.isnan(x):
  #       print('{}\n'.format(filename))
  #       print(value)
  #   except ValueError:
  #     print('{}'.format(filename))
  #     print(value)
  #     print('\n')

  count_row = df1.shape[0]
  print(filename)
  print(count_row)
  for i in range(0, count_row):
    data.iloc[i, data.columns.get_loc(parseData[0])] = testData[0]
    # data.ix[i, parseData[0]] = testData[0]


  for value in df1.values:
    # print(type(value[1]))
    # print(value[1])
    try:
      x = float(value[0])
      if not math.isnan(x):
        print('{}\n'.format(filename))
        print(value)
    except ValueError:
      print('{}'.format(filename))
      print(value)
      print('\n')

  data.to_excel('./test{}.xls'.format(i), index=False)
    # while value[0]:
    #   print(value[0])
    # if not value[0] == 'nan':
    #   print(type(value[0]))

  # print(df1[df1.isnull()])

  # df1FilterNaN = data.dropna(thresh=2)

  # print(df1FilterNaN[df1.notnull()])

  # df2 = data.DataFrame.notna()

# import csv

# # datatypeerrors = [67,75,84,85]
# datatypeerrors = [44,54,60,61]

# with open(filename, 'r') as infile:
#     reader = csv.DictReader(infile)
#     fieldnames = reader.fieldnames
#     for i in datatypeerrors:
#       print(fieldnames[i])
