Here are some common tasks you should do and some common issues encountered when you are trying to install this Azure VM.

First of all, install Vagrant on your computer (with brew, apt-get or from the package installer)
Next, Add the Azure Plugin for Vagrant with the following instruction :
	vagrant plugin install vagrant-azure

Then, add a Vagrant box, depending on which box you want. 
Example: 
	vagrant box add azuredummybox https://github.com/msopentech/vagrant-azure/raw/master/dummy.box

Then you create a Vagrantfile in your project directory:
	vagrant init
and you fill it like you have to. Forexample, the fields should be filled as following:
http://hypernephelist.com/2014/06/18/php-dev-box-with-vagrant.html

And finally, you can launch your VM (this may take a few minutes and seem to loop in the 'Looking for 22' phase, don't restart the installation)
	vagrant up --provider=azure (if rsync causes an error, vagrant reload)
If you need a bash script on your VM, it will be executed when you vagrant up. If you choose to modify this script, you'll just have to vagrant provision from your remote host to apply changes in your VM.

IMPORTANT FOR MAC OS X USERS: You may encounter some issues installing the plugin. 
If you're using MacOS X (problem encountered on 10.7.5 Lion), you may have to re-install properly the following librairies : 
libxml2,libxslt, libiconv in order to install nokogiri. 
Nokogiri may also have problems running because of Xcode Command Line Tools, you have to authorized them on Xcode, and sometimes upgrade your Xcode version to 4.6.3 or higher. 
And you may also install a more stable version of Ruby, following this workaround: 
http://deanclatworthy.com/2012/12/how-to-fix-hanging-gem-install-on-a-fresh-osx-lion-install

IMPORTANT FOR UBUNTU USERS :
Ruby2.0 isn't available by default on Ubuntu 14.04 (see bug https://bugs.launchpad.net/ubuntu/+source/ruby2.0/+bug/1310292 )
You need the following workaround: http://blog.costan.us/2014/04/restoring-ruby-20-on-ubuntu-1404.html
Or to type this command line : curl -L https://get.rvm.io | bash -s stable --ruby
And don't skip the last instruction: "To start using RVM you need to run source /home/{username}/.rvm/scripts/rvm"

Your Vagrantfile should look like the one presented on this link :
http://hypernephelist.com/2014/06/18/php-dev-box-with-vagrant.html
Except you'll have to add a line for the sharing folders:
config.vm_synced_folder <local path> <path on vm (absolute only)>, create : true (will make a new directory if it doesn't exist)

If you have another version of Nokogiri in your Vagrant folder, symlink it to the Nokogiri folder in your .rvm folder to make it work. Indeed, Vagrant builder 'Bundler' looks for the libraries in the Vagrant folder.

The first 'vagrant up --provider=azure' command will create the endpoints implemented in the azure.tcp.endpoints field in your Vagrantfile. 
DO NOT TRY TO DELETE THAT ENDPOINT: indeed, when using vagrant reload, for some reason it does not create again this endpoint, and you'll have either to launch 'azure vm endpoint create {VM-Name} {public-port} {private-port} (and install azure command line tools with npm if they are not yet installed), or to destroy your vm and everything in it, and restart the installation from scratch (from vagrant plugin install actually)

To delete properly your VM, the following tasks are recommanded :
	- destroy VM with vagrant destroy
	- delete Vagrantfile (rm Vagrantfile)
	- delete your box (vagrant box remove {YourBoxName}

