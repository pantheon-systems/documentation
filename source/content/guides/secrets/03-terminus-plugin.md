---
title: Pantheon Secrets Guide
subtitle: Terminus Secrets Manager Plugin
description: Terminus plugin for Pantheon Secrets
contributors: [stovak]
contenttype: [guide]
innav: [true]
categories: [secrets]
cms: [drupal, wordpress]
audience: [development]
product: [secrets]
integration: [--]
tags: [reference, cli, local, terminus, workflow]
permalink: docs/guides/secrets/terminus-plugin
reviewed: "2024-05-01"
---

**IMPORTANT: when Pantheon Secrets goes into "General Availability," it will be part of terminus core. Until then, this plugin information covers [Terminus Secrets Manager Plugin]( https://github.com/pantheon-systems/terminus-secrets-manager-plugin).**

# Terminus Secrets Manager Plugin

## Plugin Management

### To Install:

```
terminus self:plugin:install terminus-secrets-manager-plugin
```

### To Uninstall:

```
terminus self:plugin:uninstall terminus-secrets-manager-plugin
```

### To Update:

```
terminus self:plugin:update terminus-secrets-manager-plugin
```

## Secrets Commands

#### See the [README.md](https://github.com/pantheon-systems/terminus-secrets-manager-plugin#site-secrets-commands) in the plugin's repository