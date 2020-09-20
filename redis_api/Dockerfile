FROM python:3.8
RUN mkdir -p /app/redis_api/
ARG UID
ARG USER
ARG GID
ARG GROUP
#RUN apk-get add --no-cache gcc musl-dev linux-headers
ADD . /app/redis_api
RUN addgroup --gid $GID $GROUP
RUN adduser --uid $UID --ingroup $GROUP --gecos GECOS --disabled-password $USER
RUN chown -R ${USER}:${GROUP} /app
USER $USER
WORKDIR /app/redis_api
RUN pip install rejson
RUN pip install -r requirements.txt
ENV PYTHONUNBUFFERED 1
#ENV FLASK_APP app.py
#ENV FLASK_RUN_HOST 0.0.0.0
EXPOSE 5000
