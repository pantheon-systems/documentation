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

The recent 2.x releases of Terminus signify a major version upgrade, which may not be backwards-compatible with scripts written for Terminus `1.x`. For more information, refer to the [Terminus 2.0](/terminus-2-0) documentation.

</Alert>

<TerminusVersion text="Update to the Current Release" />

## Update Standalone Terminus

If you used the [standalone Terminus PHAR](/terminus/install#standalone-terminus-phar) installation, update to the newest version with:

```bash{promptUser: user}
terminus self:update
```

Note that the `self:update` command is only available for the standalone Terminus installation. Refer to the [command documentation](/terminus/commands/self-update) to see the available options.

## Update Terminus Installer PHAR

To update the Composer-managed version of Terminus that was installed with the [Terminus Installer PHAR](/terminus/install#terminus-installer-phar), navigate to the directory where Terminus was originally installed, then run the follwoing command:

```bash{promptUser: user}
curl -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar && php installer.phar update
```

### Update Terminus Homebrew Installation

If you used the [Homebrew installation](/terminus/install#homebrew-installation) installation, update to the newest version with the following command:

```bash
brew upgrade pantheon-systems/external/terminus
```

<Alert title="Note" type={"info"}>

Terminus uses [Semantic versioning](https://semver.org/). Be sure to fully
test compatibility with existing configurations before upgrading to new major
releases.

</Alert>

## Troubleshooting

### Nothing to install or update

For Composer-managed Terminus installations, if the update command above returns an output that indicates no updates were found, delete the existing Terminus version (e.g. <code>\$HOME/terminus</code>) and re-run the following install command:

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

Each major and minor version of Terminus is fully supported for one year from the release of the subsequent version. During the supported period, serious bugs and security issues that have been reported are fixed in patch releases. Refer to the documentation on [Semantic Versioning](https://semver.org/) for more information on versioning.

After this period, the version will reach End Of Life (**EOL**), and will no longer be supported. We recommend you update Terminus far in advance of the EOL schedule, so that regressions in new versions can be reported and patched in time.

<TabList>

<Tab title="Terminus 3.x " id="terminus-version-3" active={true}>

| Version           | Release Date       | EOL Date          |
| ----------------- | ------------------ | ----------------- |
| 3.0.7             | March 29, 2022     |                   |
| 3.0.6             | February 18, 2022  | March 29, 2023    |
| 3.0.5             | February 08, 2022  | February 18, 2023 |
| 3.0.4             | January  18, 2022  | February 08, 2023 |
| 3.0.3             | December 17, 2021  | January  18, 2023 |
| 3.0.2             | December 17, 2021  | December 17, 2022 |
| 3.0.1             | December 08, 2021  | December 17, 2022 |
| 3.0.0             | December 08, 2021  | December 08, 2022 |
</Tab>

<Tab title="Terminus 2.x" id="terminus-version-2">

| Version           | Release Date      | EOL Date          |
| ----------------- | ----------------- | ----------------- |
| 2.6.6             | February 07, 2022 |                   |
| 2.6.5             | December 17, 2021 | February 07, 2023 |
| 2.6.4             | December 06, 2021 | December 17, 2022 |
| 2.6.3             | December 03, 2021 | December 08, 2022 |
| 2.6.2             | October  18, 2021 | December 03, 2022 |
| 2.6.1             | August 04, 2021   | October 18, 2022  |
| 2.6.0             | June 04, 2021     | August 04, 2022   |
| 2.5.0             | January 20, 2021  | June 04, 2022     |
| 2.4.1             | September 08, 2020| January 20, 2022  |
| 2.4.0             | June 20, 2020     | September 08, 2021|
| 2.3.0             | January 11, 2020  | June 20, 2021     |
| 2.2.0  or earlier | September 26, 2019| January 11, 2021  |
</Tab>

</TabList>



<Releases />
