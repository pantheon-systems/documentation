---
title: Local Development on Pantheon
subtitle: Install Cygwin on Windows
description: Learn how to install and configure Cygwin on Windows computers for Pantheon sites.
tags: [local, ssh]
reviewed: "2020-02-05"
newtype: guide
categories: []
newcms: []
audience: [development]
product: []
integration: []
layout: guide
permalink: docs/guides/local-development/cygwin-windows
anchorid: cygwin-windows
---

This section provides information on local development configuration with Cygwin for Windows environments.

<Alert title="Warning" type="danger" >

The content in this section is unmaintained. We recommend that you use [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10) to create a Linux environment on Windows. Follow the instructions in the [Terminus Guide](/terminus/install/) after you install the Subsystem.

</Alert>

You can install [Cygwin](https://cygwin.com/) if you do not have access to a Mac or Linux environment. This allows you to perform tasks typically not possible in Windows, such as:

- [Terminus](https://github.com/pantheon-systems/cli) installation and use on Pantheon

## Install Cygwin

1. Download the [Cygwin](https://cygwin.com/install.html) installer and run `setup.exe`.

1. Click **Next** through the defaults and select **mirror** for downloading packages.

1. Search for each package, open the appropriate category (Net or PHP), and click **Skip** next to each package to select it for installation. Required packages are: 

    - `curl`
    - `openssh`
    - `openssl` (Net)
    - `php`
    - `php-curl`
    - `php-json`
    - `php-phar` (PHP)

    ![Select openSSL package](../../../images/cygwin-select-packages.png)

1. Complete the set up. Repeat this process when you update Cygwin or add more packages.

You can now use [Terminus](/terminus) commands, scripts, and plugins to maintain your site.

## More Resources

- [Install Terminus](/terminus/install)
- [Git on Pantheon](/guides/git)
- [PHP on Pantheon](/guides/php)