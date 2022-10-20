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

## Toggle Maintenance Mode

To enable Maintenance Mode while serving cached pages to visitors, use the command `wp pantheon cache set-maintenance-mode MODE` and replace `MODE` with one of the following options:

- `anonymous`: Serve cached pages to visitors and bots.
- `everyone`: Serve cached pages to all visitors except administrators.
- `disabled`: Disable Maintenance Mode and return to normal operation.

For example, to disable Maintenance Mode:

```bash{promptUser: user}
terminus wp -- $SITE.$ENV pantheon cache set-maintenance-mode everyone
```

## Control Cache With The Pantheon Advanced Page Cache Plugin

Install and activate the [Pantheon Advanced Page Cache](https://wordpress.org/plugins/pantheon-advanced-page-cache/) plugin to manage the page cache from WP-CLI:

```bash{promptUser: user}
terminus wp $SITE.$ENV -- plugin install pantheon-advanced-page-cache --activate
```

### Purge Cache

To purge some or all of the cache, the Pantheon Advanced Page Cache plugin provides several commands:

- Purge the entire page cache: `purge-all`

   ```bash{promptUser: user}
   terminus wp -- $SITE.$ENV pantheon cache purge-all
   ```

- Purge one or more surrogate keys from cache: `purge-key {KEY1,KEY2...}`

   ```bash{promptUser: user}
   terminus wp -- $SITE.$ENV pantheon cache purge-key {KEY1,KEY2...}
   ```

- Purge one or more paths from cache: `purge-path {PATH1,PATH2...}`

   ```bash{promptUser: user}
   terminus wp -- $SITE.$ENV pantheon cache purge-path {PATH1,PATH2...}
   ```

## Interact With Sessions Via The WP-CLI

Pantheon provides PHP Session control via the [WP Native PHP Sessions](https://wordpress.org/plugins/wp-native-php-sessions/) plugin.

Install and activate the plugin:

```bash{promptUser: user}
terminus wp $SITE.$ENV -- plugin install wp-native-php-sessions --activate
```

This plugin provides two Terminus commands: `pantheon session list` and `pantheon session delete`, to list and delete active sessions respectively:

```bash{promptUser: user}
terminus wp -- $SITE.$ENV pantheon session list
```

## More Resources

- [WP-CLI on the Pantheon Platform](/guides/wp-cli)
- [WordPress with Composer on Pantheon](/guides/wordpress-composer)
