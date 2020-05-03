#!/bin/bash -e

# Aggregate all csv files into one master csv file
MASTERFILE="MASTER.CSV"
for f in `ls transaction*.csv`
do
    # record header of csv file
    if ! test -f "$MASTERFILE"; then
	echo "Recording header line ..."
	head -1 $f > $MASTERFILE
    fi
    # stripping header line and save the rest of csv file content into one file
    echo "Aggregating $f ..."
    sed '1d' $f >> $MASTERFILE 
done
mv  $MASTERFILE master.csv
echo "Done!"
