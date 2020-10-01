FROM python:3.8
RUN mkdir -p /app/redis_api/

#RUN apk-get add --no-cache gcc musl-dev linux-headers
COPY . /app/redis_api
WORKDIR /app/redis_api
RUN pip install -r requirements.txt
ENV PYTHONUNBUFFERED 1
# ENV FLASK_RUN_HOST 0.0.0.0
EXPOSE 5000
CMD [ "flask", "run" ]
