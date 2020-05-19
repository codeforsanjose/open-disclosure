#!/usr/bin/env python
# coding: utf-8

# # Data Processing
# ## Data manipulation - Data Cleansing and ETL
# ### From Excel files to one master csv format file and MySQL ingestion
# 
#     Author:  Jacky Hung - March 2020
#     - Incorporated Helen's de-dup script.
#     - Enhanced with more data cleansing and ETL
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
#                   index_col=0,
                   dtype={'Agent_Nam F': str,
                          'Sup_Opp_Cd': str,
                          'G_From_E_F': str,
                          'XRef_Sch Nm': str},
                   parse_dates=[3,4,5,6])

ods.shape


# In[2]:


ods.columns


# In[3]:


ods.drop_duplicates()


# In[4]:


ods_summary = ods.isnull().sum()
ods_summary


# ## Data dimension reduction - Dropping empty columns

# In[5]:


new_ods = ods.dropna(axis='columns', how='all')  # 0 or 'index', 1 or 'columns'
new_ods


# In[6]:


new_ods.shape


# In[7]:


new_ods.columns


# In[8]:


new_ods.info()


# ## Extract only Form Type 'A' and 'E'

# In[9]:


# Pull out schedules A and E only
ods_ae = new_ods.loc[new_ods['Form_Type'].isin(['A', 'E']), ]


# In[10]:


ods_ae.shape


# ## Get rid of duplicated entries based on each candidate's From_Date vs. Rpt_Date

# In[11]:


# Find more duplicate entries
def mark_duplicates(df):
    # Check if there are no NaNs in dates
    if len(df.loc[df['From_Date'].isnull(), ]) != 0:
        return 'Some "From_Dates" are missing.  Remove these to de-duplicate.'
    
    # Add a remove indicator column
    df['to_remove'] = np.nan
    
    # Create new df
    df_new = pd.DataFrame(columns=df.columns)
    
    # Record all candidates
    candidates = np.asarray(df['Filer_Nam L'].value_counts().index)
    
    # Do candidate by candidate
    for candidate in candidates:
        print("Processing candidate", candidate)
        cand_df = df.loc[df['Filer_Nam L'] == candidate, ]
        
        # Find unique From_Dates
        from_dates = pd.to_datetime(cand_df['From_Date'].unique())
        
        # Create most_recent_date dictionary
        most_recent_date = {}
        
        # Fill dictionary with rpt_date to use for each from_date
        for from_date in from_dates:
            rpt_dates = pd.to_datetime(cand_df.loc[cand_df['From_Date'] == from_date, 'Rpt_Date'].unique())
            max_date = rpt_dates.max()
            most_recent_date[from_date] = max_date
        
        # Mark each row
        for row in cand_df.index:
            # Mark row as keep (0) or remove (1)
            if most_recent_date[cand_df.loc[row, 'From_Date']] == cand_df.loc[row, 'Rpt_Date']:
                cand_df.loc[row, 'to_remove'] = 0
            else:
                cand_df.loc[row, 'to_remove'] = 1
                    
        # Add candidate df to new df
        df_new = pd.concat([df_new, cand_df], axis=0)
            
    return df_new

start_time = time.process_time()
ods_marked = mark_duplicates(ods_ae)  # Go deeper into data to find more duplicates
print('Time in seconds:', (time.process_time() - start_time))


# In[12]:


ods_marked['to_remove'].sum()


# In[13]:


def remove_duplicates(df):
    df_new = df.loc[df['to_remove'] == 0, ]
    del df_new['to_remove']
    return df_new

ods_final = remove_duplicates(ods_marked)
# remove extra column 'to_remove', however, remove_duplicates def already did
#ods_final.drop(columns='to_remove', axis=1, inplace=True)
#ods_final.columns
ods_final.shape


# In[14]:


ods_final.info()


# ### Save the new dataset back to disk
# Pandas can save the new processed dataset in csv, json or sql format.
# We will save it to csv in this case.

# In[15]:


ods_final.to_csv("460_460A_reduced.csv")


# ### Save the new dataset in JSON format
# Not working at the moment!

# In[16]:


#new_ods.to_json(r'./460_460A_reduced.json')


# ### Save to MySQL database
# 1. Setup MySQL connector
# 2. Connect MySQL database
# 3. Save dataset to MySQL
#     Note: it will purge existing table and replace with the new data.

# In[17]:


import pymysql
from sqlalchemy import create_engine

pymysql.install_as_MySQLdb()
conn = create_engine("mysql+mysqldb://sjod1:abc123@10.16.10.220/sjod")
ods_final.to_sql(con=conn, name='sjod', if_exists='replace', index=True)


# ## Data dimension reduction - Dropping entries (rows) which contains at least one empty field (column)
# We do not want to do that because it is almost guaranteed that at least one of the columns has empty value.

# In[18]:


#new_ods = ods.dropna()
#new_ods.shape


# In[19]:


ods_final.describe()


# In[20]:


ods_final['Entity_Nam L'].value_counts()


# #### Correlation method .corr() to generate the relationship between each continuous variable
# Unfortunately, this correlation method does not work with this dataset.

# In[21]:


#new_ods.corr()


# ### Visualization
# Simple view on the dataset ...

# In[22]:


ds = ods_final[["Filer_Nam L", "Amount"]].groupby(["Filer_Nam L"])["Amount"].apply(lambda x : x.astype(int).sum())
ds.head(25)


# In[23]:


ds = ods_final[["Filer_ID","Filer_Nam L", "Amount"]].groupby(["Filer_Nam L"], as_index=False).agg({"Amount":"sum"})
#ds = ods_final[["Filer_ID","Filer_Nam L", "Amount"]].groupby(["Filer_Nam L"]).agg({"Amount":"sum"})

#ds.columns
#ds.shape
ds.head(25)


# In[24]:


get_ipython().run_line_magic('matplotlib', 'inline')
import matplotlib.pyplot as plt
import seaborn as sns

fig, ax = plt.subplots()
election = ds["Filer_Nam L"]
amount = ds["Amount"]
ax.barh(election, amount)
ax.set_title("2020 San Jose City Council Election Contribution")
ax.set_xlabel("Contribution Received")
ax.set_ylabel("City Council")

