#! /bin/bash

echo prototypo | sudo -S apt-get update
sudo pm2 stop server
sudo pm2 delete server
sudo pm2 kill
sudo npm uninstall pm2 && sudo rm /usr/local/bin/pm2
sudo rm /usr/bin/node && sudo rm /usr/bin/nodejs
sudo apt-get -y uninstall nodejs || sudo apt-get -y remove nodejs
sudo npm uninstall formidable && sudo rm -rf node_modules
sudo apt-get -y uninstall fontforge || sudo apt-get -y remove fontforge
sudo apt-get -y uninstall npm || sudo apt-get -y remove npm
