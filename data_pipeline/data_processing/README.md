Data Pipeline:
==============

OVERVIEW:
---------

This data pipeline will process Excel files, do data de-duplication and reduction, then save them into a master csv file and also load them into MySQL database.


USAGE/INSTRUCTIONS:
-------------------

0. One run script wraps the following mentioned steps into one

	./go.run

1. Data preparation steps

   1.1. In Excel files dir, replace blank space in filename with underscore

        ./convert_fnspace.sh

   1.2. Convert all Excel files into csv files

        ./convert_xls2csv.sh

   1.3. Merge all csv files into one master csv file

        ./allcsv2one.sh

NOTE:  following wrapper script, go.run, will first delete all .csv files,
       then run all the steps above. 

       ./go.run


2. Data Cleansing

   2.1. Copy master csv file to the directory where jupyter notebook is located and rename it to 460_460A.csv

   2.2. Run following script to produce reduced csv file (use Python 3.6.9)

        python3 data_processing2.py


3. Automatically loading reduced csv file or in pandas script save to MySQL database.

NOTE:  Python packages required: numpy, pandas, matplotlib, seaborn, pymysql, sqlalchemy.
