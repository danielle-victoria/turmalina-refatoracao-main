FROM python:3.8-slim-buster

ARG DB_PASS
ENV DB_PASS=$DB_PASS

ENV DEBIAN_FRONTEND noninteractive
ENV DEBCONF_NONINTERACTIVE_SEEN true
ENV PRODUCTION_PATH libreoffice


WORKDIR /app

COPY requirements.txt .

RUN apt-get update && apt-get -y upgrade && apt-get install -y software-properties-common && \
    add-apt-repository ppa:libreoffice/libreoffice-7-0 && \
    apt-get install -y libpq-dev gcc && apt install debconf-utils && \
    echo "tzdata tzdata/Areas select America" > /tmp/preseed.txt && \
    echo "tzdata tzdata/Zones/America select Recife" >> /tmp/preseed.txt && \
    debconf-set-selections /tmp/preseed.txt && \
    apt-get -y -q install gdb libreoffice libreoffice-writer ure libreoffice-java-common libreoffice-core libreoffice-common && \
    apt-get -y -q remove libreoffice-gnome && \
    adduser --home=/opt/libreoffice --disabled-password --gecos "" --shell=/bin/bash libreoffice && \
    pip install -r requirements.txt && \
    apt-get clean

COPY . .

EXPOSE 5000    

CMD ["python3", "app.py"]
