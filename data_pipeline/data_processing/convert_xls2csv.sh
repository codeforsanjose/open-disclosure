#!/bin/bash -e

# If in2csv does not exists, install as following
#   pip install csvkit
#     or
#   apt install python3-csvkit -y

# Convert xls to csv format
for f in `ls transaction*.xls`
do
    echo "Converting $f to csv format ..."
    fcsv="$(echo $f | sed 's/.xls/.csv/g')"
    in2csv $f > $fcsv
done
echo "Done!"
