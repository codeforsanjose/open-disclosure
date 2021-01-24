FROM python:3.8
RUN mkdir -p /usr/src/app

ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=.
ENV FLASK_APP=api
ENV FLASK_RUN_HOST=0.0.0.0

COPY . /usr/src/app
WORKDIR /usr/src/app

RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["python", "-m", "flask", "run"]
