---
title: Install Cygwin on Windows
description: Learn how to install and configure Cygwin on Windows computers for Pantheon sites.
categories: [develop]
tags: [local, ssh]
reviewed: "2020-02-05"
---

<Alert title="Warning" type="danger" >

This guide is unmaintained. For Windows 10 users, we recommend using the [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10) to create a Linux environment on Windows. Once you've installed the Subsystem, follow the instructions in the [Terminus Manual](/terminus/install/).

</Alert>

If you do not have access to a Mac or Linux environment, you can install [Cygwin](https://cygwin.com/) to perform tasks typically not possible in Windows, such as:

* Installing and using [Terminus, the Pantheon command line interface (CLI)](https://github.com/pantheon-systems/cli)

## Install Cygwin

1. Download the [Cygwin](https://cygwin.com/install.html) installer and run `setup.exe`.

1. Click **Next** through the defaults and select **mirror** for downloading packages.

1. Search for each package, open the appropriate category (Net or PHP), and click **Skip** next to each package to select it for installation. Required packages: `curl`, `openssh`, `openssl` (Net), `php`, `php-curl`, `php-json`, `php-phar` (PHP)

  ![Select openSSL package](../images/cygwin-select-packages.png)

1. Complete the set up. Repeat this process when updating Cygwin or adding more packages.
