Data Pipeline:
==============

OVERVIEW:
---------

This data pipeline will process Excel files, do data de-duplication and reduction, then save them into a master csv file and also load them into MySQL database.


USAGE/INSTRUCTIONS:
-------------------


1. Data Cleansing

   1.1. Copy master csv file to the directory where jupyter notebook is located and rename it to 460_460A.csv

   1.2. Run following script to produce reduced csv file (use Python 3.6.9)

        python3 data_processing2.py


2. Data Queries

     2.1. Blah

     2.2. Blah Blah

NOTE:  Python packages required: numpy, pandas, matplotlib, seaborn, pymysql, sqlalchemy.
