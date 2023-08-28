#!/bin/bash
#
# Script Name: firefox_wa_jammy.sh
#
# Author: Daniel Santos
# Date: 10/03/2023
# Last version: 10/03/2023
#
# Description: The following script do some workaround in order to fix snap firefox on Ubuntu 22.04.
#

sudo snap remove firefox

sudo add-apt-repository ppa:mozillateam/ppa

echo '
Package: *
Pin: release o=LP-PPA-mozillateam
Pin-Priority: 1001
' | sudo tee /etc/apt/preferences.d/mozilla-firefox

echo 'Unattended-Upgrade::Allowed-Origins:: "LP-PPA-mozillateam:${distro_codename}";' | sudo tee /etc/apt/apt.conf.d/51unattended-upgrades-firefox

sudo apt install firefox

if [ ! -d "/var/www" ]; then
  sudo mkdir /var/www
  sudo mkdir /var/www/.cache
  sudo mkdir /var/www/.mozilla
  sudo chown www-data:www-data /var/www/.cache
  sudo chown www-data:www-data /var/www/.mozilla
fi