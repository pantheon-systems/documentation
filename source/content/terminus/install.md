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

Some Windows users have installed Terminus using [Git BASH on Git for Windows](https://git-for-windows.github.io/), or the [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10), but this is unsupported.

Because some Terminus commands use SSH authentication, consider [generating and adding SSH keys](/ssh-keys/) to your account before you continue.

## Requirements

- PHP Version 5.5.38 or later (must include the [php-xml extension](https://secure.php.net/manual/en/dom.setup.php)). You can check your PHP version by running `php -v` from a terminal application.
- [PHP-CLI](http://www.php-cli.com/)
- [PHP-CURL](https://secure.php.net/manual/en/curl.setup.php)
- [Composer](https://getcomposer.org/download/)

## Install

Install the most recent release of Terminus with the following command within a directory where you have permission to write files. If in doubt, you can create a <code>terminus</code> directory in your <code>\$HOME</code> and install there:

```bash
  curl -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar && php installer.phar install
```

See [Troubleshooting](#troubleshooting) if your installation fails, or the [Installation](https://github.com/pantheon-systems/terminus#installation) section of the Terminus README file on GitHub for advanced installation methods.

## Authenticate

### Machine Token

Once Terminus is installed, login with a machine token, which is used to securely authenticate your machine. Machine tokens provide the same access as your username and password, and do not expire. For more information, see [Machine Tokens](/machine-tokens).

First, [create a Machine Token](https://dashboard.pantheon.io/login?destination=%2Fuser#account/tokens/create/terminus/) from **User Dashboard** > **Account** > **Machine Tokens**.

Once the token has been created, use it to authenticate Terminus by running the following command:

```bash
  terminus auth:login --machine-token=‹machine-token›
```

```bash
  terminus auth:login --email=dev@example.com
```

### SSH Authentication

Commands that execute remote instructions to tools like Drush or WP-CLI require SSH authentication. See [Generate and Add SSH Keys](/ssh-keys/) to prevent password requests when executing these commands.

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

```bash
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

### Windows 10 Installation issues

**Problem:** PHP is not installed.

**Solution:** Install PHP. Consider using a package such as [XAMMP](https://www.apachefriends.org/index.html), which provides a simple installation process.

**Problem:** Composer is not installed.

**Solution:** Install composer using the [.exe installer](https://getcomposer.org/doc/00-intro.md#installation-windows)

**Problem:** `curl: command not found`

Installation fails because curl cannot be found:

```bash
User1@DESKTOP-UBJ92JO  /usr/bin
$ curl -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar && php installer.phar install
bash: curl: command not found
```

**Solution:** [Install curl](https://stackoverflow.com/questions/9507353/how-do-i-install-set-up-and-use-curl-on-windows)

**Problem:** The Terminus install was successful, but the path was not set.

Terminus was installed, but the installer was not able to write to your bin dir.

**Solution:** To enable the `terminus` command, add this alias to your [`.bash_profile` file](https://askubuntu.com/questions/969632/where-is-bash-profile-located-in-windows-subsystem-for-linux):

```bash
alias terminus=terminus=/c/Users/User1/vendor/bin/terminus
```

Or you can enable it by adding the directory the executable file is in to your path:

```bash
PATH="C:\Users\User1\vendor\bin:$PATH"
```
