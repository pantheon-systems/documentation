---
title: WP-CLI On The Pantheon Platform
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

[WP-CLI](https://make.wordpress.org/cli/handbook/) is a command-line interface to WordPress. It provides a [wide range of utilities](https://developer.wordpress.org/cli/commands/) for managing your WordPress site. Virtually any action you can perform through the WordPress admin, you can also do with WP-CLI.

To use WP-CLI on the Pantheon Platform, you'll first need to install [Terminus](/terminus) on your local machine. Terminus is a command-line interface for managing your Pantheon sites, and is used to proxy commands from your local machine to your Pantheon environment.

Once you've installed Terminus locally, and verified it's working correctly, you're ready to use WP-CLI. However, if you haven't already, you may want to consider [installing WP-CLI locally](https://make.wordpress.org/cli/handbook/installing/) for use in your local environment.

If you have a [Composer-based site](/guides/composer), Terminus will use the version of WP-CLI that it finds in `vendor/wp-cli` when running WP-CLI commands on the platform.