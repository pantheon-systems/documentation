---
title: WP-CLI on the Pantheon Platform
subtitle: Pantheon Commands for WP-CLI
description: Special commands to interact with Pantheon via WP-CLI
contributors: [ryanwagner]
cms: "WordPress"
categories: [develop]
tags: [wp-cli, cli]
layout: guide
showtoc: true
permalink: docs/guides/wp-cli/wp-cli-pantheon-commands
anchorid: wp-cli-pantheon-commands
reviewed: "2022-10-06"
---

This section provides information on how to run Pantheon-specific commands on WP-CLI.

## Control Cache With WP-CLI

### Maintenance Mode

To enable Maintenance Mode while serving cached pages to visitors, use the command `wp pantheon cache set-maintenance-mode MODE` and replace `MODE` with one of the following options:

- `disabled`: Disable Maintenance Mode and return to normal operation.
- `anonymous`: Serve cached pages to visitors and bots.
- `everyone`: Serve cached pages to all visitors except administrators.

For example, to disable Maintenance Mode:

```bash{promptUser: user}
terminus wp pantheon cache set-maintenance-mode everyone
```

### Cache Purge

To purge some or all of the cache, the [Pantheon Advanced Page Cache](https://wordpress.org/plugins/pantheon-advanced-page-cache/) module provides several commands:

- Purge the entire page cache: `terminus wp pantheon cache purge-all`
- Purge one or more surrogate keys from cache: `terminus wp pantheon cache purge-key {KEY1,KEY2...}`
- Purge one or more paths from cache: `terminus wp pantheon cache purge-path {PATH1,PATH2...}`

## Interact With Sessions Via The WP-CLI

Pantheon provides for PHP Session control via the [WP Native PHP Sessions](https://wordpress.org/plugins/wp-native-php-sessions/) plugin.

This plugin provides two Terminus commands: `pantheon session list` and `pantheon session delete`, to list and delete active sessions respectively.

## More Resources

- [WP-CLI on the Pantheon Platform](/guides/wp-cli)
- [WordPress with Composer on Pantheon](/guides/wordpress-composer)
