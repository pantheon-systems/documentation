---
title: "Terminus 4.0.0-alpha1 release now available"
published_date: "2025-03-07"
categories: [tools-apis]
---

A Terminus [4.0.0-alpha1](https://github.com/pantheon-systems/terminus/releases/tag/4.0.0-alpha1) _pre-release_ is now available.
The next generation of Terminus adds support for PHP 8.4 and removes support for PHP versions 8.1 and below.

For more information about this release, visit the [GitHub release page](https://github.com/pantheon-systems/terminus/releases/tag/4.0.0-alpha1).

## Support for older PHP versions in Terminus 3.x

Terminus 3.x is **not compatible with PHP 8.4**. The recommended PHP version to use locally with Terminus 3.x is 8.3. 

On macOS with Homebrew PHP 8.3 can be installed by specifying the version when installing the `php` package, e.g. `brew install php@8.3`. If you already have PHP installed at the default version (8.4), you may need to use [`brew unlink php`](https://docs.brew.sh/Manpage#unlink---dry-run-installed_formula-) and [`brew link php@8.3`](https://docs.brew.sh/Manpage#link-ln-options-installed_formula-) to use the corrected version.

For more information see [the `php` Homebrew formula](https://formulae.brew.sh/formula/php@8.3).

## How to upgrade to Terminus 4.x while in alpha
During the pre-release development phase of Terminus 4, the only way to install Terminus is [directly from the `phar`](https://docs.pantheon.io/terminus/install#windows-and-linux). 

If you previously used Homebrew (macOS-only) to manage your installation, you will not be able to update to Terminus 4 until it is generally available and the Brew formula is updated. In that case, use the commands below to install Terminus to 4.0.0-alpha1:

```shell{promptUser: user}
mkdir -p ~/terminus && cd ~/terminus
curl -L https://github.com/pantheon-systems/terminus/releases/download/4.0.0-alpha1/terminus.phar --output terminus
chmod +x terminus
./terminus self:update
sudo ln -s ~/terminus/terminus /usr/local/bin/terminus
brew unlink terminus
```

If you have already installed Terminus via the `phar` file, you can use `terminus self:update --preview` to update to the latest version. The `--preview` flag is required to update to the latest pre-release version of Terminus.

If you have questions or concerns around Terminus 4, please use the [Terminus issue queue](https://github.com/pantheon-systems/terminus).
