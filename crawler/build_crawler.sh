#!/bin/bash
#
# Script Name: build_crawler.sh
#
# Author: Daniel Santos
# E-mail: danielsantos346@gmail.com
# Date: 03/03/2023
# Last version: 10/03/2023
#
# Description: The following script builds a development environment for turmalina crawler module.
#
## chmod +x build_crawler.sh
## ./build_crawler.sh

export PYTHON_VERSION="3.10"

activate () {
    . $HOME/.venvs/crawler-env/bin/activate
}

export TURMALINADEV="true"
export SCRAPY="$HOME/.venvs/crawler-env/bin/scrapy"
export PYTHON="$HOME/.venvs/crawler-env/bin/python"


if [ ! -f "/usr/bin/python$PYTHON_VERSION" ]; then
  sudo add-apt-repository ppa:deadsnakes/ppa
  sudo apt install python$PYTHON_VERSION
  sudo apt install python$PYTHON_VERSION-venv
fi

DIR="$HOME/.venvs"
APIDIR="$HOME/.venvs/crawler-env"

if [ ! -d "$DIR" ]; then
  mkdir $HOME/.venvs
#  rm -rf $HOME/.venvs
fi

if [ -d "$APIDIR" ]; then
  rm -rf $HOME/.venvs/crawler-env
fi

python$PYTHON_VERSION -m venv $HOME/.venvs/crawler-env

# And of course we need Firefox if we actually want to *use* GeckoDriver
if [ ! -f "/usr/bin/geckodriver" ]; then
    wget https://github.com/mozilla/geckodriver/releases/download/v0.30.0/geckodriver-v0.30.0-linux64.tar.gz && \
    sudo tar -zxf geckodriver-v0.30.0-linux64.tar.gz -C /usr/bin
fi

activate

pip install -r requirements.txt

python$PYTHON_VERSION startdb.py

if [ ! -d "/var/www" ]; then
  sudo mkdir /var/www
  sudo mkdir /var/www/.cache
  sudo mkdir /var/www/.mozilla
  sudo chown www-data:www-data /var/www/.cache
  sudo chown www-data:www-data /var/www/.mozilla
fi

scrapyd & scrapyd-deploy