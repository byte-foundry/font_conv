#! /bin/bash

echo prototypo | sudo -S apt-get update
sudo apt-get -y install vagrant
vagrant init precise64 http://files.vagrantup.com/precise64.box
vagrant up
vagrant ssh
