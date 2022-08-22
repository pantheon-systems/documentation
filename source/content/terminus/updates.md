---
title: Terminus Manual
subtitle: Version Updates
description: Stay up to date on the latest Terminus version.
terminuspage: true
showtoc: true
type: terminuspage
layout: terminuspage
categories: [develop]
tags: [cli, local, plugins, terminus, updates, workflow]
permalink: docs/terminus/:basename
previousurl: terminus/configuration/
image: terminus-thumbLarge
---

<TerminusVersion text="Update to the Current Release" />

## Update Standalone Terminus

If you used the [standalone Terminus PHAR](/terminus/install#standalone-terminus-phar) installation, update to the newest version with:

```bash{promptUser: user}
terminus self:update
```

Note that the `self:update` command is only available for the standalone Terminus installation. Refer to the [command documentation](/terminus/commands/self-update) to see the available options.

## Update Terminus Installer PHAR

To update the Composer-managed version of Terminus that was installed with the [Terminus Installer PHAR](/terminus/install#terminus-installer-phar), navigate to the directory where Terminus was originally installed, then run the following command:

```bash{promptUser: user}
curl -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar && php installer.phar update
```

### Update Terminus Homebrew Installation

If you used the [Homebrew installation](/terminus/install#homebrew-installation) installation, update to the newest version with the following command:

```bash{promptUser: user}
brew upgrade pantheon-systems/external/terminus
```

<Alert title="Note" type="info">

Terminus uses [Semantic versioning](https://semver.org/). Be sure to fully test compatibility with existing configurations before upgrading to new major releases.

</Alert>

### PHP Version Compatibility Matrix

<Partial file="terminus-guide/php.md" />

## Troubleshooting

### Nothing to install or update

For Composer-managed Terminus installations, if the update command above returns an output that indicates no updates were found, delete the existing Terminus version (e.g. `$HOME/terminus`) and re-run the following install command:

```bash{promptUser: user}
rm -rf $HOME/terminus
mkdir $HOME/terminus
cd $HOME/terminus
curl -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar
php installer.phar install
```

### Self:update not defined

The `self:update` command is only available for standalone Terminus installed using the [standalone Terminus PHAR](/terminus/install#standalone-terminus-phar). If `self:update` returns a not defined error, use the [Terminus Installer PHAR](#update-terminus-installer-phar) update instructions above.

## EOL Timeline

<Partial file="terminus-guide/eol.md" />

## Changelog

<Releases />
