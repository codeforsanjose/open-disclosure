from collections import defaultdict, Counter
import csv
import time

DIR='output/'
image_urls = {'Kalen': 'http://thelefthook.com/wp-content/uploads/2018/05/kgallagher.png', 
'Pam': 'https://www.sanjoseca.gov/Home/ShowPublishedImage/7985/636839240822300000',
'Shay': 'https://i1.wp.com/www.sanjoseinside.com/wp-content/uploads/2017/06/San-Jose-Equality-March-Shay-Franco-Clausen.jpg?fit=848%2C566&ssl=1',
'Sabuhi': 'https://pbs.twimg.com/profile_images/974138580107841536/LeWUIzaU_400x400.jpg',
'Rosie': 'https://cdn.abcotvs.com/dip/images/3429321_050418-kgo-sj-council-zepeda-img.jpg?w=800&r=16%3A9',
'Nelson': 'https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-9/29101977_608520506206617_5559076093626941440_n.jpg?_nc_cat=110&_nc_ohc=4JU_iGWOwFMAQkjpAG-LbLo9D_fcWfg1Nz06JZgkeMAs-O6Q_4tRyDi_w&_nc_ht=scontent-sjc3-1.xx&oh=d0684f56b09d9f469168745db222228c&oe=5E68270C'
}

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


with open('district9_2018.csv', 'r') as fd: # a normal csv format output
    reader = csv.DictReader(fd)
    candidates = {}
    for row in reader:
        if row['Form_Type'] != 'A' or not row['Tran_Date']: # Only consider contributions and rows with a transaction date
            continue
        name = row['Filer_Nam L']
        counter = None
        if candidates.get(name):
            counter = candidates.get(name)
        else:
            candidates[name] = defaultdict(lambda: (0.0, 0.0)) # amount contributed for day, cumulative amount contributed by this day
            counter = candidates.get(name)
        date = convert_time(row['Tran_Date'])
        amount = float(row['Amount']) if row['Amount'] else 0
        counter[date] = (counter[date][0] + amount, counter[date][1] + amount)

    all_transaction_dates = set()
    for candidate in candidates.keys():
        counter = candidates.get(candidate)
        all_transaction_dates = all_transaction_dates | set(counter.keys()) 
    # Sort by date for proper time series presentation
    sorted_keys = sorted(all_transaction_dates)
    accum = Counter()
    # Write contribution amounts per day (calculate total accumulated as well) into file
    with open(DIR+'mult_contrib.csv', 'w', newline='') as fw:
        fieldnames = ['date']
        for key in candidates.keys():
            name = ' '.join(key.split(' ')[:2])
            fieldnames.append(name+'_amount')
            fieldnames.append(name+'_cumulative_amount')

        writer = csv.DictWriter(fw, fieldnames=fieldnames)
        writer.writeheader()
        for date in sorted_keys:
            info = {'date': convert_readable_time(date)}
            for name in candidates.keys():
                counter = candidates.get(name)
                tup = counter.get(date) 
                name = ' '.join(name.split(' ')[:2])
                if tup is None:
                    info[name+'_amount'] = 0 
                    info[name+'_cumulative_amount'] = accum[name] 
                else:
                    info[name+'_amount'] = tup[0] 
                    accum[name] += tup[0]
                    info[name+'_cumulative_amount'] = accum[name]
            writer.writerow(info)

    columns = ['Name', 'Pic']
    columns.extend(list(sorted_keys))
    # Write a csv format for Flourish studio contributions by day
    with open(DIR+'mult_contrib_day.csv', 'w', newline='') as fx, open(DIR+'mult_cumulative_contrib_day.csv', 'w', newline='') as fy: # a csv format for producing line chart on Flourish
        writer = csv.writer(fx, delimiter=',')
        writer_y = csv.writer(fy, delimiter=',')
        writer.writerow([convert_readable_time(x) for x in columns])
        writer_y.writerow([convert_readable_time(x) for x in columns])
        accum = Counter() 
        for candidate in candidates.keys():
            amount_row = []
            cumulative_amount_row = []
            name = ' '.join(candidate.split(' ')[:2])

            amount_row.append(name)
            cumulative_amount_row.append(name)
            url = '' # set default icon
            for u in image_urls.keys():
                if u in name:
                    url = image_urls.get(u)
            
            amount_row.append(url)
            cumulative_amount_row.append(url)

            for date in sorted_keys:
                counter = candidates.get(candidate)
                tup = counter.get(date) 
                if tup is None:
                    amount_row.append(0)
                    cumulative_amount_row.append(accum[candidate])
                else:
                    amount_row.append(tup[0])
                    accum[candidate] += tup[0]
                    cumulative_amount_row.append(accum[candidate])

            writer.writerow(amount_row) 
            writer_y.writerow(cumulative_amount_row)

