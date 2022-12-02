---
title: Terminus Guide
subtitle: Install Plugins
description: Learn how to install plugins with Terminus.
terminuspage: true
type: terminuspage
layout: terminuspage
categories: [develop]
tags: [reference, cli, local, terminus, workflow]
permalink: docs/terminus/plugins
anchorid: plugins
---

This section provides information on how to install plugins with Terminus, and how to add new commands through third-party plugins.

## Install Plugins

Terminus ships with a plugin manager. You can use a Terminus command like the example below to install a plugin:

```bash
terminus self:plugin:install pantheon-systems/terminus-plugin-example
```

You can also pass a path to the install command and it will install the plugin from that folder.


## Update Plugins

Terminus ships with a plugin manager. You can use a Terminus command like the example below to update a plugin:

```bash
terminus self:plugin:update pantheon-systems/terminus-plugin-example
```

## Uninstall Plugins

Terminus ships with a plugin manager. You can use a Terminus command like the example below to uninstall a plugin:

```bash
terminus self:plugin:uninstall pantheon-systems/terminus-plugin-example
```

## More Resources

- [WordPress Plugins and Themes with Known Issues](/plugins-known-issues)
- [Drupal Modules with Known Issues](/modules-known-issues)