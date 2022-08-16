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

<Releases />
