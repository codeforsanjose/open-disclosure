#!/usr/bin/env python
# coding: utf-8

# # Data Processing
# ## Data manipulation - Data Cleansing and ETL
# ### From Excel files to one master csv format file and MySQL ingestion
# 
#     Authors:
#       Jacky Hung - March 2020
#       Darren Pham - Sept 2020

#    
# Pre-requisite for running this notebook.
#     python3
#     python packages:  numpy, pandas, seaborn, matplotlib, pymysql, sqlalchemy
#

# In[1]:

import pandas as pd
import numpy as np
import time
import seaborn as sns

ods = pd.read_csv('460_460A.csv',
                     dtype={
                     # 'Filer_ID': float,
                     'Agent_Nam F': str,
                     'Sup_Opp_Cd': str,
                     'G_From_E_F': str,
                     'XRef_Sch Nm': str,
                     'Amount': float
                     },
                     parse_dates=[0,7,8,9,10])

ods.shape

# In[2]:

# Trying to fix Filer_ID as string
# for row in ods.iterrows():
#    if type(row[1][5]) == str:
#        row[1][5] = 0.0
#    print(row[1][5])

# ods['Filer_ID'] = ods['Filer_ID'].astype(float)

# In[2]:

# Filter out rows based on if they're new
# twentytwenty_nov = '11/1/2020'

# mask = ods['Election_Date'] >= twentytwenty_nov

# ods = ods.loc[mask]

# In[3]:

# Remove any Columns where ALL rows had no value (Na)
ods = ods.dropna(axis='columns', how='all')  # 0 or 'index', 1 or 'columns'

# Remove any rows where ALL values had (Na)
new_ods = ods.dropna(axis='index', how='all')


# In[4]:


# Update Headers to replace all spaces with _
new_ods.columns = [c.strip().replace(' ', '_') for c in ods.columns]


# In[5]:


# Pull out schedules A and E only
# A and E are Contributions or Expenditures
# Not sure if needed yet
# ods_ae = new_ods.loc[new_ods['Form_Type'].isin(['A', 'E']), ]


# In[6]:

### Save the new dataset back to disk
# Pandas can save the new processed dataset in csv, json or sql format.
# # We will save it to csv in this case.
new_ods.to_csv("460_460A_reduced.csv")



# # In[7]:

# # ### Save to MySQL database
# # 1. Setup MySQL connector
# # 2. Connect MySQL database
# # 3. Save dataset to MySQL
# #     Note: it will purge existing table and replace with the new data.
import pymysql
from sqlalchemy import create_engine

pymysql.install_as_MySQLdb()
conn = create_engine("mysql+mysqldb://admin:QEruiTUa7GjHVrQUnP2P@database-1.c2fzqal0xakt.us-west-1.rds.amazonaws.com/test2")
new_ods.to_sql(con=conn, name='test2', if_exists='replace', index=True)

with conn.connect() as con:
       con.execute('ALTER TABLE `test2` ADD PRIMARY KEY (`Index`);')

