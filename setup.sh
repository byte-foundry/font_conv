#! /bin/bash

apt-get update
apt-get -y install npm
npm install pm2@latest -g
apt-get -y install fontforge
npm install formidable
apt-get -y install nodejs
ln -s /usr/bin/nodejs /usr/bin/node
pm2 start fontconv/server.js
