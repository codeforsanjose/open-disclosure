FROM python:3.8
COPY . .

RUN python3 -m pip install --upgrade pip setuptools wheel

RUN python3 -m pip install -r data_processing/requirements.txt

CMD ["python", "data_processing/aggregatedcsv2redis.py"]