#! /bin/bash

echo prototypo | sudo -S apt-get update
sudo apt-get -y install npm
sudo apt-get -y install fontforge
sudo npm install formidable
sudo apt-get -y install nodejs
sudo ln -s /usr/bin/nodejs /usr/bin/node
