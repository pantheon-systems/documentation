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

<Alert title="Warning" type="danger">

The recent 2.x releases of Terminus signify a major version upgrade, which may not be backwards-compatible with scripts written for Terminus `1.x`. For more information, see [Terminus 2.0](/terminus-2-0).

</Alert>

<TerminusVersion text="Update to the Current Release" />

## Update Standalone Terminus

If you used the [standalone Terminus PHAR](/terminus/install#standalone-terminus-phar) installation, update to the newest version with:

```bash{promptUser: user}
terminus self:update
```

Note that the `self:update` command is only available for the standalone Terminus installation.

## Update Terminus Installer PHAR

To update the Composer-managed version of Terminus that was installed with the [Terminus Installer PHAR](/terminus/install#terminus-installer-phar), navigate to the directory where Terminus was originally installed, then run:

```bash{promptUser: user}
curl -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar && php installer.phar update
```

<Alert title="Note" type={"info"}>

Terminus uses [Semantic versioning](https://semver.org/). Be sure to fully
test compatibility with existing configurations before upgrading to new major
releases.

</Alert>

## Troubleshooting

### Nothing to install or update

For Composer-managed Terminus installations, if the update command above returns output indicating that no updates were found, delete the existing Terminus version (e.g. <code>\$HOME/terminus</code>) and re-run the install command:

```bash{promptUser: user}
rm -rf $HOME/terminus mkdir $HOME/terminus cd $HOME/terminus curl -O
https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar
php installer.phar install
```

### Self:update not defined

The `self:update` command is only available for standalone Terminus installed using the [standalone Terminus PHAR](/terminus/install#standalone-terminus-phar). If `self:update` returns a not defined error, use the [Terminus Installer PHAR](#update-terminus-installer-phar) update instructions above.

## EOL Timeline

Each major and minor version of Terminus is fully supported for one year from the release of the subsequent version. During the supported period, serious bugs and security issues that have been reported are fixed in patch releases. See [Semantic Versioning](https://semver.org/) for more information on versioning.

After this period, the version will reach End Of Life (**EOL**), and will no longer be supported. We strongly encourage you to update Terminus well ahead of the EOL schedule, so that regressions in new versions can be reported and patched in time.

| Version           | EOL Date  |
| ----------------- | --------- |
| 2.4.1             | TBD       |
| 2.4.0             | 9/08/2021 |
| 2.3.0             | 6/20/2021 |
| 2.2.0             | 1/11/2021 |
| 2.1.0             | 9/26/2020 |
| 2.0.0             | 9/03/2020 |
| 1.9.0             | 2/20/2020 |
| 1.8.1             | 9/11/2019 |
| 1.8.0  or earlier | 8/26/2019 |

## Changelog

<Releases />
