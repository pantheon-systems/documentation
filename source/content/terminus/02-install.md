---
title: Terminus Guide
subtitle: Install Terminus
description:  Learn how to install Terminus to your local computer.
terminuspage: true
type: terminuspage
layout: terminuspage
tags: [reference, cli, local, terminus, workflow]
permalink: docs/terminus/install
anchorid: install
contenttype: [guide]
innav: [true]
categories: [cli]
cms: [drupal, wordpress]
audience: [development]
product: [terminus]
integration: [--]
---

This section provides information on how to install and authenticate Terminus.

Refer to [Current Terminus Release, Changelog, and Updates](/terminus/updates) if you are looking for instructions on **how to update Terminus** for your specific operating system.

Terminus is available for MacOS and Linux. Windows 10 users can install the [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10), and then install Terminus in the Linux shell.

Some Terminus commands use SSH authentication. You may want to [generate and add SSH keys](/ssh-keys/) to your account before you continue.

## Compatible Operating Systems

Terminus has been tested on the following platforms:

- MacOS
- Windows 10 – WSL 2 Ubuntu 20.0
- Ubuntu 20.0 – this would include Ubuntu under Docker or VirtualBox

### Incompatible Operating Systems

Terminus does not work with the following platforms:

- Windows 10 – Command Line
- Windows 10 – Git Bash (MingW)
- Ubuntu 18.0 and earlier versions
- Linux system with coreutils equal to or less than 8.28

## Terminus Requirements

### Package Manager

**Ubuntu/WinWSL-Ubuntu**

- [apt](https://ubuntu.com/server/docs/package-management)

**MacOS**

- [Homebrew](https://brew.sh/)

### Required Packages

- PHP Version 7.4 or later
   - You can check your PHP version by running `php -v` from a terminal application. You must have the [php-xml extension](https://secure.php.net/manual/en/dom.setup.php) for:
    - mbstring
    - XML
    - [cURL](https://secure.php.net/manual/en/curl.setup.php)
    - [CLI](http://www.php-cli.com)
- [Composer](https://getcomposer.org/download/)
- [Git](https://help.github.com/articles/set-up-git/). This may be needed for the plugin manager component.

### Recommended Packages

- [Drush](http://docs.drush.org/en/master/install/). This is useful if you need to run Drush commands that are incompatible with Terminus.
- [WP-CLI](http://wp-cli.org/). This is useful if you need to run WP-CLI commands that are incompatible with Terminus.

## Install Terminus

There are several ways to install Terminus, depending on your use case:

- Self-contained Terminus executable:[install terminus.phar](#standalone-terminus-phar)
- Mac:[install using Homebrew](#homebrew-installation)
- Contribute to the Terminus project: [download and install](https://github.com/pantheon-systems/terminus#installing-with-git) from the Git repository

### Standalone Terminus PHAR

The commands below will:

- Create a `terminus` folder in your home directory (`~/`)
- Get the latest release tag of Terminus
- Download and save the release as `~/terminus/terminus`
- Make the file executable
- Add a symlink to your local `bin` directory for the Terminus executable

    ```bash{promptUser: user}
  mkdir -p ~/terminus && cd ~/terminus
  curl -L https://github.com/pantheon-systems/terminus/releases/download/3.1.2/terminus.phar --output terminus
  chmod +x terminus
  ./terminus self:update
  sudo ln -s ~/terminus/terminus /usr/local/bin/terminus
  ```

### MacOS Homebrew Installation

The Terminus application is published to [Homebrew](https://brew.sh/).

Run the command below to install Terminus:

```bash
brew install pantheon-systems/external/terminus
```

### Ubuntu/WinWSL-Ubuntu

Follow the steps in the [Standalone Terminus PHAR](/terminus/install#standalone-terminus-phar) section.


Plugins

The new version of Terminus comes with a plugin manager, installation now can be done using the terminus command
terminus self:plugin:install pantheon-systems/terminus-build-tools-plugin

That would work if the plugin is added to packagist, don’t worry you can add an old plugin by means of adding the path.
terminus self:plugin:install <plugin_name> <path>

To update the latest version of the plugin from packagist:
terminus self:plugin:update <plugin_name>

To remove the plugin:
terminus self:plugin:uninstall <plugin_name>

## Authenticate

### Machine Token

You must log in with a machine token after the installation completes. A machine token is used to securely authenticate your machine. Machine tokens provide the same access as your username and password, and do not expire. Refer to [Machine Tokens](/machine-tokens/) for more information.

1. Navigate to the **User Dashboard**, select **Account**, and then select **Machine Tokens** to [create your machine token](https://dashboard.pantheon.io/login?destination=%2Fuser#account/tokens/create/terminus/).

1. Use your machine token to authenticate into Terminus, replacing <email@example.com> and <machine_token>:

  ```bash{promptUser: user}
  terminus auth:login --email=<email@example.com> --machine-token=<machine_token>
  ```

    - Machine tokens are keyed to the email address associated with your Pantheon user account. Future sessions are authenticated with your email address after a token has been used to authenticate Terminus:

  ```bash{promptUser: user}
  terminus auth:login --email <email@example.com>
  ```

### SSH Authentication

Commands that execute remote instructions to tools like Drush or WP-CLI require SSH authentication. Refer to [Generate and Add SSH Keys](/ssh-keys/) to prevent password requests when executing these commands.

## More Resources

- [Developing on Pantheon Directly with SFTP Mode](/guides/sftp)
- [PHP on Pantheon](/guides/php)