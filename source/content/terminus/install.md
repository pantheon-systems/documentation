---
title: Terminus Manual
subtitle: Install
description: Learn how to install Terminus to your local computer.
layout: terminuspage
categories: [develop]
tags: [cli, local, terminus, workflow]
permalink: docs/terminus/:basename
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
- If you are in Mac, you could [install using homebrew](#homebrew-installation).
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
curl -L https://github.com/pantheon-systems/terminus/releases/download/3.0.6/terminus.phar --output terminus
chmod +x terminus
./terminus self:update
sudo ln -s ~/terminus/terminus /usr/local/bin/terminus
  ```

### Homebrew Installation

The Terminus application is published to Homebrew; to install, run:

```bash
brew install pantheon-systems/external/terminus
```

## Authenticate

### Machine Token

Once Terminus is installed, login with a machine token, which is used to securely authenticate your machine. Machine tokens provide the same access as your username and password, and do not expire. For more information, see [Machine Tokens](/machine-tokens/).

First, [create a Machine Token](https://dashboard.pantheon.io/login?destination=%2Fuser#account/tokens/create/terminus/) from **User Dashboard** > **Account** > **Machine Tokens**.

Once the token has been created, use it to authenticate Terminus by running the following command:

```bash{promptUser: user}
terminus auth:login --machine-token=‹machine-token›
```

```bash{promptUser: user}
terminus auth:login --email=dev@example.com
```

### SSH Authentication

Commands that execute remote instructions to tools like Drush or WP-CLI require SSH authentication. See [Generate and Add SSH Keys](/ssh-keys/) to prevent password requests when executing these commands.

## Troubleshooting

### Terminus PHAR Installer: Parse error near ')'

If you use ZSH and get a `parse error near ')'`, ZSH is inserting escape characters (`\`) into the command on paste. You can [disable magic functions](https://github.com/ohmyzsh/ohmyzsh/blob/master/templates/zshrc.zsh-template#L35-L36) to eliminate this behavior. For instance, if you get the following error when executing the Terminus cURL command: `zsh: parse error near ')'`, remove the `\` after the `$` and run the command again.

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

You should relocate your installation to a directory where you have permission to write files. If in doubt, you can create a `terminus` directory in your `$HOME` and go there:

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

### PHP Deprecated Error

You might see the error below if you are upgrading Terminus 3 from an older version of Terminus, such as Terminus 2.6. 

```php
PHP Deprecated:  Return type of Symfony\Component\Finder\Finder::getIterator() should either be compatible with IteratorAggregate::getIterator(): Traversable, or the #[\ReturnTypeWillChange] attribute should be used to temporarily suppress the notice in /Users/username/terminus/vendor/symfony/finder/Finder.php on line 566
```

Delete the existing Terminus folder, then complete the [Terminus install](/terminus/install#install-terminus) steps to resolve this error. 

### curl: (60) SSL certificate problem

The following error occurs when curl is unable to verify the local issuer certificate:

```bash
curl: (60) SSL certificate problem: unable to get local issuer certificate
```

To resolve, save a copy of the [latest CA certificate](https://curl.haxx.se/docs/caextract.html) to a new file named `cacert.pem` then add `curl.cainfo = "[path_to_file]\cacert.pem"` to your `php.ini` file. If you're running XAMPP, you can add the `cacert.pem` file within the `xampp\php\extras\ssl` directory.

### Enable the terminus Command

If you encounter the following error after installation completes:

```bash
Terminus was installed, but the installer was not able to write to your bin dir. To enable the
`terminus` command, add this alias to your .bash_profile (Mac) or .bashrc (Linux) file:
```

Use this command to create a `terminus` alias that calls the application:

```bash{promptUser: user}
echo "alias terminus=~/vendor/bin/terminus" >> ~/.bashrc
```

### Windows 10 Installation Issues

#### Prerequisites are not installed

The default Linux environment installed by the WSL may not have all of the requirements for Terminus installed. Using your distribution's package manager, install:

- PHP (including `php-cli`, `php-curl`, and `php-xml`)
- Curl (to download the installer)

On a subsystem with Ubuntu 18.04, since Curl is already installed, the commands to run all updates and install the PHP package look like this:

```bash{promptUser:user}
sudo apt update && sudo apt upgrade -y
sudo apt install php7.2-cli
```
