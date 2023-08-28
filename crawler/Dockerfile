FROM python:3.10.6
SHELL [ "/bin/bash", "-c" ]

ARG DB_PASS
ENV DB_PASS=$DB_PASS

WORKDIR /app

COPY . /app

# And of course we need Firefox if we actually want to *use* GeckoDriver
RUN apt update && apt -y upgrade && apt install -y firefox-esr && \
    wget https://github.com/mozilla/geckodriver/releases/download/v0.30.0/geckodriver-v0.30.0-linux64.tar.gz && \
    tar -zxf geckodriver-v0.30.0-linux64.tar.gz -C /usr/bin && \
    pip3 install -r requirements.txt && \
    apt install -y erlang && \
    apt install -y rabbitmq-server && \
    apt clean

EXPOSE 6800

CMD set -m; rabbitmq-server & celery -A crontabs worker -B -l info & scrapyd & scrapyd-deploy && fg scrapyd

#P.S.: Run with docker run --sysctl net.ipv4.tcp_keepalive_time=200 --sysctl net.ipv4.tcp_keepalive_intvl=200 --sysctl net.ipv4.tcp_keepalive_probes=5 crawler
