---
title: Terminus Guide
subtitle: Install and Update Terminus
description:  Learn how to install and update Terminus to your local computer.
terminuspage: true
type: terminuspage
layout: terminuspage
tags: [reference, cli, local, terminus, workflow]
permalink: docs/terminus/install
contenttype: [guide]
innav: [false]
categories: [cli]
cms: [drupal, wordpress]
audience: [development]
product: [terminus]
integration: [--]
---

This page provides information on how to install, authenticate, and update Terminus.

## Installing Terminus

Terminus is available for MacOS and Linux. Windows 10+ users can install the [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10), and then install Terminus in the Linux shell.

Some Terminus commands use SSH authentication. You may want to [generate and add SSH keys](/ssh-keys/) to your account before you continue.

### Compatible Operating Systems

Terminus has been tested on the following platforms:

- MacOS
- Windows 10 – WSL 2 Ubuntu 20.0
- Ubuntu 20.0 – this would include Ubuntu under Docker or VirtualBox

### Homebrew Package Manager (Recommended for MacOS Users)

The Terminus application is published to [Homebrew](https://brew.sh/), a package manager for MacOS.

Run the command below to install Terminus:

```bash{promptUser: user}
brew install pantheon-systems/external/terminus
```

### Direct Installation of Standalone PHAR (Recommended for Ubuntu and WSL Users)

Installing Terminus with a PHAR (a stand-alone executable PHP archive) is recommended for Ubuntu and Windows Subsystem for Linux (WSL) users.
This technique is also viable for MacOS users who are not using Homebrew.

The commands below will:

- Create a `terminus` folder in your home directory (`~/`)
- Get the latest release tag of Terminus
- Download and save the release as `~/terminus/terminus`
- Make the file executable
- Add a symlink to your local `bin` directory for the Terminus executable

    ```bash{promptUser: user}
  mkdir -p ~/terminus && cd ~/terminus
  curl -L https://github.com/pantheon-systems/terminus/releases/download/3.6.1/terminus.phar --output terminus
  chmod +x terminus
  ./terminus self:update
  sudo ln -s ~/terminus/terminus /usr/local/bin/terminus
  ```

### Install from Git

If you are a developer contributoring to Terminus, you can install it from its [Git repository](https://github.com/pantheon-systems/terminus).

### Requirements

- PHP Version 7.4 or later
  - You can check your PHP version by running `php -v` from a terminal application.
  - You must have the [php-xml extension](https://secure.php.net/manual/en/dom.setup.php) for:
     - mbstring
     - XML
     - [cURL](https://secure.php.net/manual/en/curl.setup.php)
     - [CLI](http://www.php-cli.com)
- [Composer](https://getcomposer.org/download/)
- [Git](https://help.github.com/articles/set-up-git/)
  - This may be needed for the plugin manager component.
- OpenSSH 7.8 or later
  - You can check your OpenSSH version by running `ssh -V` from a terminal application.
  - This package is required for executing nested Drush or WP-CLI commands.

### Incompatible Operating Systems

Terminus does not work with the following platforms:

- Windows 10 – Command Line
- Windows 10 – Git Bash (MingW)
- Ubuntu 18.0 and earlier versions
- Linux system with coreutils equal to or less than 8.28

## Authenticating with Terminus

You must log in with a machine token after the installation completes. A machine token is used to securely authenticate your machine. Machine tokens provide the same access as your username and password, and do not expire. Refer to [Machine Tokens](/machine-tokens/) for more information.

2. [Go to your Personal Settings](/personal-settings), select [Machine Tokens](https://dashboard.pantheon.io/users/#account/tokens/), then [Generate a Machine Token](https://dashboard.pantheon.io/login?destination=%2Fuser#account/tokens/create/terminus/).

1. Use your machine token to authenticate into Terminus, replacing `<email@example.com>` and `<machine_token>`:

  ```bash{promptUser: user}
  terminus auth:login --email=<email@example.com> --machine-token=<machine_token>
  ```

    - Machine tokens are keyed to the email address associated with your Pantheon user account. Future sessions are authenticated with your email address after a token has been used to authenticate Terminus:

  ```bash{promptUser: user}
  terminus auth:login --email <email@example.com>
  ```

### SSH Authentication

Commands that execute remote instructions to tools like Drush or WP-CLI require SSH authentication. Refer to [Generate and Add SSH Keys](/ssh-keys/) to prevent password requests when executing these commands.


## Updating Terminus

<Alert title="Note" type="info">

Terminus uses [Semantic versioning](https://semver.org/). Be sure to fully test compatibility with existing configurations before upgrading to new major releases.

</Alert>

### Homebrew Package Manager (Recommended for MacOS Users)

You can update to the newest version of the [Homebrew installation](/terminus/install#homebrew-installation) by running the command below:

```bash{promptUser: user}
brew upgrade pantheon-systems/external/terminus
```

### Update Standalone Terminus PHAR

You can update the [standalone Terminus PHAR](/terminus/install#standalone-terminus-phar) installation to the newest version with the command below.

```bash{promptUser: user}
terminus self:update
```


## Installing and Updating Terminus Plugins

Terminus can be extended with plugins. Refer to the [Terminus Plugin Directory](https://pantheon.io/docs/terminus/plugins/) for a list of available plugins.

## More Resources

- [Developing on Pantheon Directly with SFTP Mode](/guides/sftp)
- [PHP on Pantheon](/guides/php)
