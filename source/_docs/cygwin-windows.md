---
title: Install Cygwin on Windows
description: Learn how to install and configure Cygwin on Windows computers for Pantheon sites.
tags: [local]
categories: []
deprecated: true
deprecatednote: Terminus is no longer supported on Windows, and this document is unmaintained. See the <a href="/docs/platform-considerations/#terminus-support">Terminus Support</a> section of Platform Considerations for more information.
---
If you do not have access to a Mac or Linux environment, you can install [Cygwin](https://cygwin.com/) to perform tasks typically not possible in Windows, such as:

* Installing and using [Terminus, the Pantheon command line interface (CLI)](https://github.com/pantheon-systems/cli)

## Install Cygwin
1. Download the [Cygwin](https://cygwin.com/install.html) installer and run `setup.exe`.
2. Click **Next** through the defaults and select **mirror** for downloading packages.
3. Search for each package, open the appropriate category (Net or PHP), and click **Skip** next to each package to select it for installation. Required packages: `curl`, `openssh`, `openssl` (Net), `php`, `php-curl`, `php-json`, `php-phar` (PHP)
![Select openSSL package](/source/docs/assets/images/cygwin-select-packages.png)
4. Complete the set up. Repeat this process when updating Cygwin or adding more packages.
