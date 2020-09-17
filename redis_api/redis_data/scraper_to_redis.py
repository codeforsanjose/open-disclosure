#!/usr/bin/env python
# coding: utf-8

# In[1]:


import json

import pandas as pd
import redis

# In[2]:


agg = pd.read_excel("2020 Election Data.xlsx")
agg.dropna(axis=0, how="all", inplace=True)
agg.dropna(axis=1, how="all", inplace=True)
agg.drop(
    columns=[
        "Rec_Type",
        "Filer_ID",
        "Rpt_Date",
        "From_Date",
        "Thru_Date",
        "Rpt_Elect_Date",
        "Form_Type",
        "Tran_ID",
        "Entity_Cd",
        "Ctrib_Prefix",
        "Ctrib_Suffix",
        "Entity_City",
        "Entity_ST",
        "Entity_ZIP4",
        "Entity_Emp",
        "Entity_Occ",
        "Tran_Type",
        "Tran_Date",
        "Date_Thru",
        "Amt_Beg",
        "Amt_This P",
        "Amt_Paid",
        "Amt_Forg",
        "Amt_Int",
        "Amt_Close",
        "Cum_YTD",
        "Loan_Rate",
        "Expn_Code",
        "Description",
        "Agent_Nam L",
        "Cmte_ID",
        "Intr_Nam L",
        "Intr_City",
        "Intr_ST",
        "Intr_ZIP4",
        "Memo_Code",
        "Memo_Ref No",
        "Bak Ref_TID",
        "G_From_E_F",
    ],
    inplace=True,
)
agg.shape


# In[3]:


agg_group = (
    agg.groupby(
        by=[
            "Election Date",
            "CandidateControlledName",
            "Ballot Item",
            "Filer_Nam L",
        ]
    )["Amount"]
    .sum()
    .reset_index()
    .round(2)
)
agg_group


# In[5]:


candidates = dict()

for index, row in agg_group.iterrows():
    election_date = row["Election Date"].replace("/", "-")
    cand_key = f"{row['Ballot Item'].replace(' ','-')};{row['CandidateControlledName'].replace(' ', '-')};{election_date}".lower()
    cand_name = row["CandidateControlledName"]
    comm_key = f"{row['Filer_Nam L'].replace(' ','-')};{election_date}"
    comm_name = f"{row['Filer_Nam L']}"
    comm_key = comm_key.lower()

    if cand_key not in candidates:
        candidates[cand_key] = {"ID": cand_key, "Name": cand_name, "Committees": []}
    candidates[cand_key]["Committees"].append(
        {"ID": comm_key, "Name": comm_name, "TotalFunding": row["Amount"]}
    )

print(json.dumps(list(candidates.values())))


# In[7]:


r = redis.StrictRedis(host="localhost", port=6379)
r.execute_command("JSON.SET", "Candidates", ".", json.dumps(list(candidates.values())))
r.execute_command("SAVE")


# In[ ]:
