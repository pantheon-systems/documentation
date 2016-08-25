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
1. Install requirements:
 * [virtualBox](https://www.virtualbox.org/wiki/Downloads) >= 4.3.x
 * [vagrant](https://www.vagrantup.com/downloads.html)
 * [vagrant-hostmanager](https://github.com/smdahlen/vagrant-hostmanager)
 * [vagrant-auto_network](https://github.com/oscar-stack/vagrant-auto_network)
2. From inside the project root, run `vagrant up`
3. You will be prompted for the administration password on your host machine. Obey.
4. Visit <http://docs.local:8000/docs> in your browser of choice.
5. Automatically regenerate Sculpin and re-compile CSS upon file modifications:

 ```
 vagrant ssh -- -t 'cd /vagrant; fuser -k -n tcp 8000;grunt watch & ./bin/sculpin generate --server --watch'
 ```
