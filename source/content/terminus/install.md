---
title: Terminus Manual
subtitle: Install
description: Learn how to install Terminus to your local computer.
terminusinstall: true
terminuspage: true
showtoc: true
type: terminuspage
layout: terminuspage
permalink: docs/terminus/:basename/
nexturl: terminus/examples/
previousurl: terminus/
image: terminus-thumbLarge
searchboost: 100
---

Terminus is available for Mac OS X and Linux.

Windows 10 users can install the [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10), then install Terminus in the Linux shell.

Because some Terminus commands use SSH authentication, consider [generating and adding SSH keys](/ssh-keys) to your account before you continue.

## Requirements

- PHP Version 5.5.38 or later (must include the [php-xml extension](https://secure.php.net/manual/en/dom.setup.php)). You can check your PHP version by running `php -v` from a terminal application.
- [PHP-CLI](http://www.php-cli.com/)
- [PHP-CURL](https://secure.php.net/manual/en/curl.setup.php)
- [Composer](https://getcomposer.org/download/)

## Install Terminus

There are several ways to install Terminus, depending on your use case:

- For a self-contained Terminus executable, [install terminus.phar](#standalone-terminus).
- For a composer-managed version of Terminus that is _not_ part of your other composer-managed project(s) and doesn't utilize global composer installations, use the [Terminus installer PHAR](#terminus-installer-phar).
- If you want to contribute to the Terminus project, [download and install](https://github.com/pantheon-systems/terminus#installing-with-git) from the git repository.
- To add Terminus as a dependency of your composer-based project, [install with Composer](#install-terminus-as-a-project-dependency).

### Standalone Terminus

1. Download the latest `terminus.phar` from the [Releases](https://github.com/pantheon-systems/terminus/releases) page. In the example below, we're directing the file to `$HOME/bin/` and renaming the file to `terminus`:

  ```bash{promptUser: user}
  wget https://github.com/pantheon-systems/terminus/releases/download/2.3.0/terminus.phar -O ~/.bin/terminus
  ```

  Remember to get the latest version of Terminus from the [Releases](https://github.com/pantheon-systems/terminus/releases) page, don't copy the command above vermatim.

  Your installation directory must be in or added to your `$PATH` environment variable in order to call `terminus` from any working directory.

1. Make the Terminus file exectable. The example below assumes the same installation path as above:

  ```bash{promptUser: user}
  chmod +X ~/.bin/terminus
  ```

<Alert type="info" title="Note">

There is an unofficial third party installer script which will download `terminus.phar` and attempt to update the appropriate rc files, available [here](https://github.com/alexfornuto/terminus-installer). Note that this script is *not* supported directly by Pantheon.

</Alert>

### Terminus Installer PHAR

Install the most recent release of Terminus with the following command within a directory where you have permission to write files. If in doubt, you can create a `terminus` directory in your `$HOME` and install there:

```bash{promptUser: user}
curl -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar && php installer.phar install
```

See [Troubleshooting](#troubleshooting) if your installation fails, or the [Installation](https://github.com/pantheon-systems/terminus#installation) section of the Terminus README file on GitHub for advanced installation methods.

### Install Terminus as a Project Dependency

To add Terminus to a composer-managed project:

```bash{promptUser: user}
composer install pantheon-systems/terminus
```

## Authenticate

### Machine Token

Once Terminus is installed, login with a machine token, which is used to securely authenticate your machine. Machine tokens provide the same access as your username and password, and do not expire. For more information, see [Machine Tokens](/machine-tokens).

First, [create a Machine Token](https://dashboard.pantheon.io/login?destination=%2Fuser#account/tokens/create/terminus/) from **User Dashboard** > **Account** > **Machine Tokens**.

Once the token has been created, use it to authenticate Terminus by running the following command:

```bash{promptUser: user}
terminus auth:login --machine-token=‹machine-token›
```

```bash{promptUser: user}
terminus auth:login --email=dev@example.com
```

### SSH Authentication

Commands that execute remote instructions to tools like Drush or WP-CLI require SSH authentication. See [Generate and Add SSH Keys](/ssh-keys) to prevent password requests when executing these commands.

## Troubleshooting

### Permission Denied

If the installer throws an IOException at the end:

```bash
[Symfony\Component\Filesystem\Exception\IOException]
Failed to create symbolic link from "/path/to/current/dir/vendor/bin/terminus" to "/usr/local/bin/terminus".
```

You may need to remove an old installation from terminus from `/usr/local/bin/terminus`.

If you run into permission problems such as:

```bash
file installer.phar: Permission denied
  0 3150k    0  1928    0     0   1474      0  0:36:28  0:00:01  0:36:27  7330
curl: (23) Failed writing body (0 != 1928)
```

You should relocate your installation to a directory where you have permission to write files. If in doubt, you can create a `terminus` diretory in your `$HOME` and go there:

```bash{promptUser: user}
cd $HOME/terminus
curl -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar && php installer.phar install
```

### PHP Fatal error: Uncaught exception 'ReflectionException'

The `php-xml` extension is typically included and enabled by default when installing PHP. However, the following error indicates that the `php-xml` extension is missing:

```php
PHP Fatal error: Uncaught exception 'ReflectionException' with message 'Class DOMDocument does not exist' in /root/vendor/consolidation/output-formatters/src/Transformations/DomToArraySimplifier.php:24
```

To resolve this error, install the [`php-xml` extension](https://secure.php.net/manual/en/dom.setup.php).

### curl: (60) SSL certificate problem

The following error occurs when curl is unable to verify the local issuer certificate:

```bash
curl: (60) SSL certificate problem: unable to get local issuer certificate
```

To resolve, save a copy of the [latest CA certificate](https://curl.haxx.se/docs/caextract.html) to a new file named `cacert.pem` then add `curl.cainfo = "[path_to_file]\cacert.pem"` to your `php.ini` file. If you're running XAMPP, you can add the `cacert.pem` file within the `xampp\php\extras\ssl` directory.

### Enable the terminus command

If you encounter the following error after installation completes:

```bash
Terminus was installed, but the installer was not able to write to your bin dir. To enable the
`terminus` command, add this alias to your .bash_profile (Mac) or .bashrc (Linux) file:
```

Use `alias` to have the `terminus` command call the application:

```bash{promptUser: user}
alias terminus=~/vendor/bin/terminus
```

### Windows 10 Installation issues

#### Prerequisites are not installed

The default Linux environment installed by the WSL may not have all of the requirements for Terminus installed. Using your distribution's package manager, install:

- PHP (including `php-cli`, `php-curl`, and `php-xml`)
- Curl (to download the installer)

On a subsystem with Ubuntu 18.04, since Curl is already installed, the commands to run all updates and install the PHP package look like this:

```bash{promptUser:user}
sudo apt update && sudo apt upgrade -y
sudo apt install php7.2-cli
```
