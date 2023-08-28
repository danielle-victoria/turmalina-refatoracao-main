#!/bin/bash
#
# Script Name: build_api.sh
#
# Author: Daniel Santos
# E-mail: danielsantos346@gmail.com
# Date: 10/03/2023
# Last version: 10/03/2023
#
# Description: The following script builds a development environment for turmalina API module.
#
## chmod +x build_api.sh
## ./build_api.sh
## export TURMALINADEV="true"
## export PRODUCTION_PATH="libreoffice"


export PYTHON_VERSION="3.8"

activate () {
    . $HOME/.venvs/api-env/bin/activate
}

if [ ! -f "/usr/bin/python$PYTHON_VERSION" ]; then
  sudo add-apt-repository ppa:deadsnakes/ppa
  sudo apt install python$PYTHON_VERSION
  sudo apt install python$PYTHON_VERSION-venv
  sudo apt install python3-pip
fi

DIR="$HOME/.venvs"
APIDIR="$HOME/.venvs/api-env"

if [ ! -d "$DIR" ]; then
  mkdir $HOME/.venvs
#  rm -rf $HOME/.venvs
fi

if [ -d "$APIDIR" ]; then
  rm -rf $HOME/.venvs/api-env
fi

python$PYTHON_VERSION -m venv $HOME/.venvs/api-env

activate

pip$PYTHON_VERSION install -r requirements.txt

python$PYTHON_VERSION app.py