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

## Prerequisites

The below functionality relies on the [Pantheon Must-Use Plugin](https://github.com/pantheon-systems/pantheon-mu-plugin). 
For installation instructions, view the Must-Use plugin README.  

## Control cache with WP-CLI

To enable maintenance mode while serving cached pages to visitors, use the command `pantheon cache set-maintenance-mode {MODE}`
The Mode options are: 
* `disabled` -- Disables maintenance mode and return to normal operation
* `anonymous` -- Serves cached pages to visitors and bots
* `everyone` -- Serves cached pages to all visitors _except_ administrators

## More Resources
- [WP-CLI on the Pantheon Platform](/guides/wp-cli)
- [WordPress with Composer on Pantheon](/guides/wordpress-composer)

