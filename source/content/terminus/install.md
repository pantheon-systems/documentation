---
title: Terminus Manual
subtitle: Install
description: Learn how to install Terminus to your local computer.
layout: terminuspage
categories: [develop]
tags: [cli, local, terminus, workflow]
showtoc: true
permalink: docs/terminus/:basename
previousurl: terminus/
nexturl: terminus/examples/
image: terminus-thumbLarge
reviewed: "2022-03-25"
---

Terminus is available for macOS and Linux.

Windows 10 users can install the [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10), then install Terminus in the Linux shell.

Because some Terminus commands use SSH authentication, consider [generating and adding SSH keys](/ssh-keys/) to your account before you continue.

## Requirements

- PHP Version 7.4 or later (must include the [php-xml extension](https://secure.php.net/manual/en/dom.setup.php)). You can check your PHP version by running `php -v` from a terminal application.
- [PHP-CLI](http://www.php-cli.com/)
- [PHP-CURL](https://secure.php.net/manual/en/curl.setup.php)
- [Composer](https://getcomposer.org/download/)

## Install Terminus

There are several ways to install Terminus, depending on your use case:

- For a self-contained Terminus executable, [install terminus.phar](#standalone-terminus-phar).
- If you are using a Mac, you can [install using homebrew](#homebrew-installation).
- If you want to contribute to the Terminus project, [download and install](https://github.com/pantheon-systems/terminus#installing-with-git) from the git repository.

### Standalone Terminus PHAR

The following commands will:

- create a `terminus` folder in your home directory (`~/`),
- get the latest release tag of Terminus,
- download and save the release as `~/terminus/terminus`,
- make the file executable,
- add a symlink to your local `bin` directory for the Terminus executable.

    ```bash{promptUser: user}
  mkdir -p ~/terminus && cd ~/terminus
  curl -L https://github.com/pantheon-systems/terminus/releases/download/3.1.0/terminus.phar --output terminus
  chmod +x terminus
  ./terminus self:update
  sudo ln -s ~/terminus/terminus /usr/local/bin/terminus
  ```

### Homebrew Installation

The Terminus application is published to [Homebrew](https://brew.sh/); to install, run:

```bash
brew install pantheon-systems/external/terminus
```

## Authenticate

### Machine Token

You must log in with a machine token after the installation completes. A machine token is used to securely authenticate your machine. Machine tokens provide the same access as your username and password, and do not expire. For more information, see [Machine Tokens](/machine-tokens/).

1. Navigate to the **User Dashboard**, select **Account**, and then select  **Machine Tokens** to [create your machine token](https://dashboard.pantheon.io/login?destination=%2Fuser#account/tokens/create/terminus/).

1. Use your machine token to authenticate into Terminus, replacing <email@example.com> and <machine_token>:

  ```bash{promptUser: user}
  terminus auth:login --email=<email@example.com> --machine-token=<machine_token>
  ```

    - Machine tokens are keyed to the email address associated with your Pantheon user account. After a token has been used to authenticate Terminus, future sessions are authenticated with your email address:

  ```bash{promptUser: user}
  terminus auth:login --email <email@example.com>
  ```

### SSH Authentication

Commands that execute remote instructions to tools like Drush or WP-CLI require SSH authentication. See [Generate and Add SSH Keys](/ssh-keys/) to prevent password requests when executing these commands.

