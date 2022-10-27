---
title: Terminus Guide
subtitle: Update Terminus
description: Stay up to date on the latest Terminus version.
terminuspage: true
categories: [develop]
tags: [cli, local, plugins, terminus, updates, workflow]
type: terminuspage
layout: terminuspage
showtoc: true
permalink: docs/terminus/updates
anchorid: updates
---

<TerminusVersion text="Update to the Current Release" />

## Update Standalone Terminus

You can update the [standalone Terminus PHAR](/terminus/install#standalone-terminus-phar) installation to the newest version with command below:

```bash{promptUser: user}
terminus self:update
```

Note that the `self:update` command is only available for the standalone Terminus installation. Refer to the [command documentation](/terminus/commands/terminus/commands/self-update) for available options.

## Update Terminus Installer PHAR

You can update the Composer-managed version of Terminus that was installed with the [Terminus Installer PHAR](/terminus/install#terminus-installer-phar).

1. Navigate to the directory where Terminus was originally installed.

1. Run the following command:

```bash{promptUser: user}
curl -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar && php installer.phar update
```

### Update Terminus Homebrew Installation

You can update to the newest version of the [Homebrew installation](/terminus/install#homebrew-installation) installation by running the command below:

```bash{promptUser: user}
brew upgrade pantheon-systems/external/terminus
```

<Alert title="Note" type="info">

Terminus uses [Semantic versioning](https://semver.org/). Be sure to fully test compatibility with existing configurations before upgrading to new major releases.

</Alert>


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

## Changelog

<Releases />

## More Resources

- [Terminus Command Reference](/terminus/commands)
- [Terminus 3.0](/terminus/updates)