FROM python:3.8
ARG UID
ARG USER
ARG GID
ARG GROUP
RUN apt update && \
    apt upgrade -y && \
    wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    apt install -y ./google-chrome-stable_current_amd64.deb && \
    apt-get -y install sudo
RUN mkdir -p /app/data_pipeline
RUN addgroup --gid $GID $GROUP
RUN adduser --uid $UID --ingroup $GROUP --gecos GECOS --disabled-password $USER
#RUN usermod -aG sudo $USER #TODO: Remove prompt and add sudo
ADD redis-cron /etc/cron.daily
RUN touch /var/log/cron.log
ADD . /app/data_pipeline
RUN chown -R ${USER}:${GROUP} /app
USER $USER
WORKDIR /app/data_pipeline
ENV PYTHONUNBUFFERED 1
ADD scraper/requirements.txt /tmp
RUN pip install --upgrade pip
RUN pip install -r /tmp/requirements.txt
RUN wget https://chromedriver.storage.googleapis.com/84.0.4147.30/chromedriver_linux64.zip
RUN unzip -o chromedriver_linux64.zip
ENV PATH .:$PATH
