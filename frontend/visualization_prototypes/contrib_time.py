from collections import Counter
import csv
import time

DIR='output/'

def convert_time(longTime):
    """
    Ignore time of day to help with grouping contributions by day.
    2018-01-03 00:00:00 --> 2018-01-03
    """
    try:
        t = time.strptime(longTime, "%Y-%m-%d %H:%M:%S")
    except ValueError:
        return longTime
    ret = time.strftime( "%Y-%m-%d", t)
    return ret


def convert_readable_time(longTime):
    """
    Convert date and output into human readable format.
    2018-01-03 --> Jan 03, 2018
    """
    try:
        t = time.strptime(longTime, "%Y-%m-%d")
    except ValueError:
        return longTime
    ret = time.strftime("%b %d, %Y", t)
    return ret


with open('liccardo_2018.csv', 'r') as fd: # a normal csv format output
    c = Counter()
    columns = ['Name', 'Pic']
    contributions = ['Liccardo', 'https://jointventure.org/images/stories/sam-liccardo.jpg']
    cumulative_contributions = ['Liccardo', 'https://jointventure.org/images/stories/sam-liccardo.jpg']
    total = 0
    reader = csv.DictReader(fd)
    for row in reader:
        if row['Form_Type'] != 'A' or not row['Tran_Date']: # Only consider contributions and rows with a transaction date
            continue
        date = convert_time(row['Tran_Date'])
        amount = float(row['Amount']) if row['Amount'] else 0
        c[date] += amount
    # Sort by date for proper time series presentation
    sorted_keys = sorted(c.keys())

    # Write contribution amounts per day (calculate total accumulated as well) into file
    with open(DIR+'contrib.csv', 'w', newline='') as fw:
        fieldnames = ['date', 'amount', 'accumulated_sum']
        writer = csv.DictWriter(fw, fieldnames=fieldnames)
        writer.writeheader()
        for key in sorted_keys:
            columns.append(convert_readable_time(key))
            contributions.append(c[key])
            total += c[key]
            cumulative_contributions.append(total)
            writer.writerow({'date': convert_readable_time(key), 'amount': c[key], 'accumulated_sum': total})

    # Write a csv format for Flourish studio contributions by day
    with open(DIR+'contrib_day.csv', 'w', newline='') as fx: # a csv format for producing line chart on Flourish
        writer = csv.writer(fx, delimiter=',')
        writer.writerow(columns)
        writer.writerow(contributions)

    # Write a csv format for Flourish studio cumulative contributions by day 
    with open(DIR+'cumulative_contrib_day.csv', 'w', newline='') as fx:
        writer = csv.writer(fx, delimiter=',')
        writer.writerow(columns)
        writer.writerow(cumulative_contributions)
        
