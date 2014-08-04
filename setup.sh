#! /bin/bash
apt-get update
apt-get -y install npm
npm install pm2@latest -g
npm install formidable
npm install adm-zip
npm install q
apt-get -y install fontforge
apt-get -y install nodejs
ln -s /usr/bin/nodejs /usr/bin/node
pm2 start server.js
