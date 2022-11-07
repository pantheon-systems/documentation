---
title: Terminus Guide
subtitle: Current Terminus Release and Changelog
description: Stay up to date on the latest Terminus version.
layout: guide
showtoc: true
categories: [develop]
tags: [reference, cli, local, terminus, workflow]
permalink: docs/guides/terminus/updates
anchorid: updates
---

<TerminusVersion text="Update to the Current Release" />

## Update Standalone Terminus

You can update the [standalone Terminus PHAR](/guides/terminus/install#standalone-terminus-phar) installation to the newest version with the command below:

```bash{promptUser: user}
terminus self:update
```

Note that the `self:update` command is only available for the standalone Terminus installation. Refer to the [command documentation](/guides/terminus/commands/self-update) for available options.

## Update Terminus Installer PHAR

You can update the Composer-managed version of Terminus that was installed with the [Terminus Installer PHAR](/guides/terminus/install#terminus-installer-phar).

1. Navigate to the directory where Terminus was originally installed.

1. Run the following command:

    ```bash{promptUser: user}
    curl -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar && php installer.phar update
    ```

### Update Terminus Homebrew Installation

You can update to the newest version of the [Homebrew installation](/guides/terminus/install#homebrew-installation) by running the command below:

```bash{promptUser: user}
brew upgrade pantheon-systems/external/terminus
```

<Alert title="Note" type="info">

Terminus uses [Semantic versioning](https://semver.org/). Be sure to fully test compatibility with existing configurations before upgrading to new major releases.

</Alert>

## Troubleshooting

### Nothing to install or update

For Composer-managed Terminus installations, if the update command above returns an output that indicates no updates were found:

1. Delete the existing Terminus version (e.g. `$HOME/terminus`).

1. Re-run the install command:

    ```bash{promptUser: user}
    rm -rf $HOME/terminus
    mkdir $HOME/terminus
    cd $HOME/terminus
    curl -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar
    php installer.phar install
    ```

### Self:update not defined

The `self:update` command is only available for standalone Terminus installed using the [standalone Terminus PHAR](/guides/terminus/install#standalone-terminus-phar). If `self:update` returns a not defined error, use the [Terminus Installer PHAR](#update-terminus-installer-phar) update instructions above.

## Changelog

<Releases />

## More Resources

- [Terminus Command Reference](/guides/terminus/commands)
- [Terminus 3.0](/guides/terminus/updates)