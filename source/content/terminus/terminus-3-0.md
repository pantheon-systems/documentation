---
title: Terminus 3.0
subtitle: Terminus 3.0
description: Learn what's new with the latest Terminus major version upgrade.
contributors: [greg-1-anderson]
categories: [platform]
tags: [cli, drush, local, wp-cli, terminus]
permalink: docs/terminus/:basename
searchboost: 100
reviewed: "2021-12-10"
---

<Alert title="Note" type="info" >

If you're not already familiar with Terminus, we suggest you read the [Terminus Manual](/terminus) instead. This doc is specifically geared at existing Terminus users who need to update existing implementations.

</Alert>

Following [Semantic Versioning](https://semver.org/) standards, there are updates in 3.0 that are incompatible with previous implementations. Before upgrading to Terminus 3.0, you should be aware of what changes could require updates to your scripting and implementation.

<Alert title="Warning" type="danger">

**Do not** upgrade production environments to Terminus 3.x without first testing in development and/or continuous integration environments.

</Alert>

## Updated Commands

These commands or their output have changed in a significant way that may affect your existing scripting of Terminus.

## Deprecated Commands

No commands were deprecated in the Terminus 3.0 release.

## New Commands

The following commands are new to Terminus as of version 3.0:

- `self:plugin:install`: Install Terminus plugins.
- `self:plugin:list`: List installed Terminus plugins.
- `self:plugin:search` Find Terminus plugins on Packagist.
- `self:plugin:uninstall` Uninstall Terminus plugins.
- `self:plugin:update` Update already-installed Terminus plugins.

## Additional Changes

- Support for EOL versions of PHP have been removed from Terminus 3. PHP 7.4 or later is required.

## More Resources

- [The Terminus Manual](/terminus)
- [Terminus on GitHub](https://github.com/pantheon-systems/terminus)
