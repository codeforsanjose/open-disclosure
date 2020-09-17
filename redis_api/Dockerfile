FROM python:3.8
RUN mkdir -p /app/data_pipeline/
ARG UID
ARG USER
ARG GID
ARG GROUP
#RUN apk-get add --no-cache gcc musl-dev linux-headers
ADD . /app/data_pipeline
RUN addgroup --gid $GID $GROUP
RUN adduser --uid $UID --ingroup $GROUP --gecos GECOS --disabled-password $USER
WORKDIR /app/data_pipeline
ADD . /app/data_pipeline
RUN chown -R ${USER}:${GROUP} /app
USER $USER
#RUN ls -l
#RUN pwd
RUN pip install -r data_api/requirements.txt
WORKDIR /app/data_pipeline/data_api
ENV PYTHONUNBUFFERED 1
#ENV FLASK_APP app.py
#ENV FLASK_RUN_HOST 0.0.0.0
EXPOSE 5000
