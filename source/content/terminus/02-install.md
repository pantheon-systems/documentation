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
showtoc: true
---

This page provides information on how to install, authenticate, and update Terminus.

## Compatibility and Requirements
Terminus has been tested on the following platforms:

- MacOS
- Windows 10 (WSL 2 Ubuntu 20.0+)
- Ubuntu 20.0 (Including Ubuntu under Docker or VirtualBox)

<Accordion title="Incompatible Operating Systems" id="incompatible-os" icon="info-sign">
Terminus does not work with the following platforms:

- Windows 10 – Command Line
- Windows 10 – Git Bash (MingW)
- Ubuntu 18.0 and earlier versions
- Linux system with coreutils equal to or less than 8.28

</Accordion>

**Terminus requires the following:**
- PHP Version 8.2 or later
  - You can check your PHP version by running `php -v` from a terminal application.
  - You must have the [php-xml extension](https://secure.php.net/manual/en/dom.setup.php) for:
     - mbstring
     - XML
     - [cURL](https://secure.php.net/manual/en/curl.setup.php)
     - CLI
- [Composer](https://getcomposer.org/download/)
- [Git](https://help.github.com/articles/set-up-git/)
  - This may be needed for the plugin manager component.
- OpenSSH 7.8 or later
  - You can check your OpenSSH version by running `ssh -V` from a terminal application.
  - This package is required for executing nested Drush or WP-CLI commands.

<Alert title="PHP 8.4 and Terminus" type="danger">

Terminus 3.x is not compatible with PHP 8.4. If you are using PHP <= 8.1 you should use Terminus 3.x.

Terminus 4.x is compatible with PHP 8.2+.

</Alert>



## Installation and Update Methods
### macOS
[Homebrew](https://brew.sh/), a package manager for MacOS, is the recommended installation method for MacOS. However, the method [described below](#windows-and-linux) for Windows and Linux can also be used by MacOS users who are not using Homebrew.

Install Terminus by running the command below:

```bash{promptUser: user}
brew install pantheon-systems/external/terminus
```

<hr/>

Update to the newest version of the [Homebrew installation](#macos) by running the command below:

```bash{promptUser: user}
brew upgrade terminus
```

### Windows and Linux
Installing Terminus with a PHAR (a stand-alone executable PHP archive) is recommended for Linux and Windows users. This technique is also viable for MacOS users who prefer not to use Homebrew.

<Alert title="Note" type="info" >

[Terminus compatibility](#compatibility-and-requirements) for Windows requires installing the Windows Subsystem for Linux (WSL). [Install WSL](https://learn.microsoft.com/en-us/windows/wsl/) before proceeding to the steps below.

</Alert>

The commands below will:
- Create a `terminus` folder in your home directory (`~/`)
- Get the latest release tag of Terminus
- Download and save the release as `~/terminus/terminus`
- Make the file executable
- Add a symlink to your local `bin` directory for the Terminus executable

<TabList>

<Tab title="Terminus 4 (PHP 8.2+)" id="terminus4" active={true}>

```bash{promptUser: user}
mkdir -p ~/terminus && cd ~/terminus
curl -L https://github.com/pantheon-systems/terminus/releases/download/4.0.0/terminus.phar --output terminus
chmod +x terminus
./terminus self:update
sudo ln -s ~/terminus/terminus /usr/local/bin/terminus
```

</Tab>

<Tab title="Terminus 3 (PHP 7.4-8.3)" id="terminus3">

```bash{promptUser: user}
mkdir -p ~/terminus && cd ~/terminus
curl -L https://github.com/pantheon-systems/terminus/releases/download/3.6.2/terminus.phar --output terminus
chmod +x terminus
./terminus self:update
sudo ln -s ~/terminus/terminus /usr/local/bin/terminus
```

</Tab>

</TabList>

Update the [standalone Terminus PHAR](#windows-and-linux) installation to the newest version by running the command below:

```bash{promptUser: user}
terminus self:update
```

## Authentication
### Login via Machine Token (Required)
You must log in with a machine token after the installation completes. A machine token is used to securely authenticate your machine. Machine tokens provide the same access as your username and password, and do not expire. Refer to [Machine Tokens](/machine-tokens/) for more information.

1. [Go to your Personal Settings](/personal-settings), select [Machine Tokens](https://dashboard.pantheon.io/users/#account/tokens/), then [Generate a Machine Token](https://dashboard.pantheon.io/login?destination=%2Fuser#account/tokens/create/terminus/).

1. Use your machine token to authenticate into Terminus, replacing `<email@example.com>` and `<machine_token>`:

  ```bash{promptUser: user}
  terminus auth:login --email=<email@example.com> --machine-token=<machine_token>
  ```

Machine tokens are keyed to the email address associated with your Pantheon user account. Future sessions are authenticated with your email address after a token has been used to authenticate Terminus:

```bash{promptUser: user}
terminus auth:login --email <email@example.com>
```

### SSH Authentication (Optional, but recommended)

Commands that execute remote instructions to tools like Drush or WP-CLI require SSH authentication. Refer to [Generate and Add SSH Keys](/ssh-keys/) to prevent password requests when executing these commands.

