---
title: WP-CLI on the Pantheon Platform
subtitle: Pantheon Commands for WP-CLI
description: Special commands to interact with Pantheon via WP-CLI
cms: "WordPress"
categories: [develop]
tags: [wp-cli, cli]
layout: guide
showtoc: true
permalink: docs/guides/wp-cli/wp-cli-pantheon-commands
anchorid: wp-cli-pantheon-commands
---

This section provides information on how to run Pantheon specific commands on WP-CLI.

## Control cache with WP-CLI

### Maintenance Mode
To enable maintenance mode while serving cached pages to visitors, use the command `wp pantheon cache set-maintenance-mode {MODE}`
The Mode options are: 
* `disabled` -- Disables maintenance mode and return to normal operation
* `anonymous` -- Serves cached pages to visitors and bots
* `everyone` -- Serves cached pages to all visitors _except_ administrators

### Cache Purge
To purge some or all of the cache, the [Pantheon Advanced Page Cache](https://wordpress.org/plugins/pantheon-advanced-page-cache/) module provides several commands.
* `wp pantheon cache purge-all` -- Purges the entire page cache
* `wp pantheon cache purge-key {KEY1,KEY2...}` -- Purges one or more surrogate keys from cache.
* `wp pantheon cache purge-path {PATH1,PATH2...}` -- Purges one or more paths from cache

## Interact with sessions via the WP-CLI

Pantheon provides for PHP Session control via the [WP Native PHP Sessions](https://wordpress.org/plugins/wp-native-php-sessions/) plugin.

This plugin provides two terminus commands: `pantheon session list` and `pantheon session delete`, to list and delete active sessions respectively.

## More Resources
- [WP-CLI on the Pantheon Platform](/guides/wp-cli)
- [WordPress with Composer on Pantheon](/guides/wordpress-composer)

