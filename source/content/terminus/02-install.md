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
categories: [cli, create]
newcms: [drupal, wordpress]
audience: [development]
product: [terminus]
integration: [--]
---

This section provides information on how to install and authenticate Terminus.

Terminus is available for macOS and Linux. Windows 10 users can install the [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10), and then install Terminus in the Linux shell.

Some Terminus commands use SSH authentication. You may want to [generate and add SSH keys](/ssh-keys/) to your account before you continue.

## Terminus Requirements

### Package Manager

- [apt](https://ubuntu.com/server/docs/package-management) for Ubuntu/WinWSL-Ubuntu
- [Homebrew](https://brew.sh/) for Mac

### Required Packages

- PHP Version 7.4 or later (must include the [php-xml extension](https://secure.php.net/manual/en/dom.setup.php)). You can check your PHP version by running `php -v` from a terminal application.
- [PHP-CLI](http://www.php-cli.com/)
- [PHP-CURL](https://secure.php.net/manual/en/curl.setup.php)
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

### Homebrew Installation

The Terminus application is published to [Homebrew](https://brew.sh/).

Run the command below to install Terminus:

```bash
brew install pantheon-systems/external/terminus
```

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