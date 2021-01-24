FROM python:3.8
COPY . .

RUN pip install -r data_processing/requirements.txt

CMD ["python", "data_processing/aggregatedcsv2redis.py"]