---
title: "Terminus 4.0.0-alpha1 release now available"
published_date: "2025-03-07"
categories: [tools-apis]
---

A Terminus [4.0.0-alpha1](https://github.com/pantheon-systems/terminus/releases/tag/4.0.0-alpha1) _pre-release_ is now available.
The next generation of Terminus adds support for PHP 8.4 and removes support for PHP versions 8.2 and below.

For more information about this release, visit the [GitHub release page](https://github.com/pantheon-systems/terminus/releases/tag/4.0.0-alpha1).

## PHP support for older PHP versions in Terminus 3.x

Terminus 3.x is **not compatible with PHP 8.4**. The recommended PHP version to use locally with Terminus 3.x is 8.3, which can be installed via Homebrew (on MacOS) by specifying the version when installing the `php` package, e.g. `brew install php@8.3`. For more information see [the `php` Homebrew formula](https://formulae.brew.sh/formula/php@8.3).

## How to upgrade to Terminus 4.x while in alpha
During the pre-release development phase of Terminus 4, the only way to install Terminus is [directly from the `phar`](https://docs.pantheon.io/terminus/install#windows-and-linux). If you manage your installation via Homebrew on macOS, you will not be able to update to Terminus 4 until it is generally available and the Brew formula is updated.

```shell{promptUser: user}
mkdir -p ~/terminus && cd ~/terminus
curl -L https://github.com/pantheon-systems/terminus/releases/download/4.0.0-alpha1/terminus.phar --output terminus
chmod +x terminus
./terminus self:update
sudo ln -s ~/terminus/terminus /usr/local/bin/terminus
```

If you have previously installed Terminus using Brew, you will need to run `brew unlink terminus` to remove the symbollic links that Homebrew uses for Terminus.
