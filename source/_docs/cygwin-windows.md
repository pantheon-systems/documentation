---
title: Install Cygwin on Windows
description: Learn how to install and configure Cygwin on Windows computers for Pantheon sites.
tags: [local]
categories: []
---
If you do not have access to a Mac or Linux environment, you can install [Cygwin](http://cygwin.com) to perform tasks typically not possible in Windows, such as:

* Using `openssl` to generate files required to [enable secure HTTPS communication](/docs/enable-https/)
* Installing and using [Terminus, the Pantheon command line interface (CLI)](https://github.com/pantheon-systems/cli)  

## Install Cygwin
1. Download the [Cygwin](http://cygwin.com/install.html) installer and run `setup.exe`.
2. Click **Next** through the defaults and select **mirror** for downloading packages.
3. Search for each package, open the appropriate category (Net or PHP), and click **Skip** next to each package to select it for installation. Required packages: `curl`, `openssh`, `openssl` (Net), `php`, `php-curl`, `php-json`, `php-phar` (PHP)
![Select openSSL package](/source/docs/assets/images/cygwin-select-packages.png)
4. Complete the set up. Repeat this process when updating Cygwin or adding more packages.

## Use Cygwin
Once you've installed Cygwin, you can run it and type in `openssl` commands or install and use [Terminus](/docs/terminus/).
