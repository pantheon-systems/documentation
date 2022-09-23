---
title: WP-CLI on the Pantheon Platform
subtitle: Introduction
description: Administer and maintain your WordPress site on Pantheon with your command-line.
cms: "WordPress"
categories: [develop]
tags: [wp-cli, cli]
layout: guide
showtoc: true
permalink: docs/guides/wp-cli
anchorid: wp-cli
---

[WP-CLI](https://make.wordpress.org/cli/handbook/) is a command-line interface to WordPress. It provides a [wide range of utilities](https://developer.wordpress.org/cli/commands/) for managing your WordPress site. You can use WP-CLI to complete almost any action you can perform in your [WordPress Dashboard](/cms-admin#wordpress-dashboard).

WP-CLI on the Pantheon Platform requires [Terminus](/terminus). Terminus is a command-line interface for managing your Pantheon sites, and is used to relay proxy commands from your local machine to your Pantheon environment.

You may also want to consider [installing WP-CLI locally](https://make.wordpress.org/cli/handbook/installing/) for use on your machine.

## Composer-based Sites

Terminus will use the version of WP-CLI that it finds in `vendor/wp-cli` when running WP-CLI commands on the platform if you have a [Composer-based site](/guides/composer).

## More Resources

- [WordPress on Pantheon Quick Start Guide](/guides/wordpress-pantheon)
- [Drush on Pantheon Guide](/guides/drush)
- [Secure Development on Pantheon](/guides/secure-development)