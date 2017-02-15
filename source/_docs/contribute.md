---
title: Contributing to Pantheon Docs
---
Become one of our [contributors](/docs/contributors)! Help us create relevant and useful content for developers like yourself. See something you'd like to add or change? We love pull requests!

Get involved by:

- Reporting a doc issue
- Improving existing content
- Suggesting new docs
- Commenting on work in progress

## Edit Directly on GitHub

- See an issue with a doc? Click **Contribute** within the doc and select **Report Doc Issue**.
- Want to improve a doc? Click **Contribute** within the doc and select **Edit this page**.
- Have an idea for a new doc? [Suggest new content](https://github.com/pantheon-systems/documentation/issues/new?title=New%20Doc%20Proposal%20&body=Priority%20(Low‚%20Medium‚%20High)%3A%0A%0A%23%23%20Title%0A%0A%0A%23%23%20Description%0A%0A%0A%23%23%20Outline%0A%0A%0A%23%23%20Expected%20Audience%0A%0A%0A%23%23%20Path%0A(e.g.%20%60source%2Fdocs%2Farticles%2Fsites%2Fcode%60%20or%20%60source%2Fdocs%2Farticles%2Fwordpress%60)&labels=new%20doc) by opening an issue.
- Want to provide more insight to an [existing PR](https://github.com/pantheon-systems/documentation/pulls)? Add your comments.

## Edit and Build Locally

Fork and clone the [documentation](https://github.com/pantheon-systems/documentation) repository on GitHub.

1. Install the following:
 * [virtualBox](https://www.virtualbox.org/wiki/Downloads)
 * [vagrant](https://www.vagrantup.com/downloads.html)
 * [vagrant-hostmanager](https://github.com/smdahlen/vagrant-hostmanager)
 * [vagrant-auto_network](https://github.com/oscar-stack/vagrant-auto_network)
2. Run `vagrant up` from inside the project root directory (`documentation`).
3. You will be prompted for the administration password on your host machine. Obey.
4. Visit <http://docs.local:8000/docs> in your browser of choice.
5. Run `vagrant provision` to update the local site. Alternatively, you can watch for CSS and file modifications so that changes are reflected automatically:

 ```
 vagrant ssh -- -t 'cd /vagrant; fuser -k -n tcp 8000;grunt watch & ./bin/sculpin generate --server --watch'
 ```

## Code of Conduct

Pantheon is dedicated to a positive and harassment-free community experience for everyone. [See our full code of conduct](/docs/code-of-conduct) for details, including how to report abuse.
