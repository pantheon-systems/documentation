[![Circle CI](https://circleci.com/gh/pantheon-systems/documentation.svg?style=svg)](https://circleci.com/gh/pantheon-systems/documentation)
Pantheon Documentation
======================
https://pantheon.io/docs/

### Contributing

Read [CONTRIBUTING.md](<CONTRIBUTING.md>) for more details on contributing
documentation improvements.

### Style Guide

Read [style-guide.md](<style-guide.md>) for our guidelines on how to write
documentation.

### Get the Code
Fork and clone this repository. Issue pull requests one document at a time.

## Local Setup (Optional)
1. Install the following:
    * [virtualBox](https://www.virtualbox.org/wiki/Downloads)
    * [vagrant](https://www.vagrantup.com/downloads.html)
    * [vagrant-hostmanager](https://github.com/smdahlen/vagrant-hostmanager)
    * [vagrant-auto_network](https://github.com/oscar-stack/vagrant-auto_network)
2. Run `vagrant up` from inside the project root directory (`documentation`).
3. You will be prompted for the administration password on your host machine. Obey.
4. Visit <http://docs.local:8000/docs> in your browser of choice.
5. Run `vagrant provision` to update the local site. Alternatively, you can watch for CSS and file modifications so that changes are reflected automatically:

     ```bash
     vagrant ssh -- -t 'cd /vagrant; fuser -k -n tcp 8000;grunt watch & ./bin/sculpin generate --server --watch'
     ```
### Troubleshooting 
For newer versions of Vagrant you may need to specify Virtualbox with `vagrant up --provider=virtualbox`
