---
title: WordPress on Pantheon Quick Start Guide
subtitle: Pantheon WordPress Plugins
description: Plugins for WordPress on Pantheon.
contenttype: [guide]
innav: [false]
categories: [cms]
cms: [wordpress]
audience: [development]
product: [--]
integration: [--]
tags: [wordpress, webops]
contributors: [whitneymeredith]
reviewed: "2022-05-04"
showtoc: true
permalink: docs/guides/wordpress-pantheon/plugins
---

Pantheon maintains multiple plugins to facilitate its workflow within WordPress. For more discussion of these plugins, find Pantheon developers in our [community spaces](https://pantheon.io/developer-community).

<Alert title="Note" type="info">

Drupal users, see [Pantheon Modules](/modules) for details on Drupal modules developed and maintained for the Pantheon workflow.

</Alert>

## WordPress Pantheon Cache

Pantheon maintains an optimized version of WordPress that includes [WordPress Pantheon Cache](/guides/wordpress-configurations/wordpress-cache-plugin) plugin to control cache expiration.

## Pantheon Must-Use Plugin

[Pantheon Must-Use Plugin](https://github.com/pantheon-systems/WordPress/tree/default/wp-content/mu-plugins/pantheon-mu-plugin) is vital to the operation of your site on the platform and must not be removed from your codebase. Consider it a part of WordPress core, and do not hack it. The permanent activation of this plugin will not interfere with your local environment.

The functionality of this plugin is broken into two parts: Updates and Page Cache.

### Pantheon Updates

The [Pantheon Updates](https://github.com/pantheon-systems/WordPress/blob/default/wp-content/mu-plugins/pantheon-mu-plugin/inc/pantheon-updates.php) plugin disables automatic updates of all plugins, themes, and WordPress core on Pantheon's Test and Live environments. We do this because it is unsafe to apply updates to production environments directly without first verifying updates on a development environment.

The Test and Live environment codebases also cannot be written to, preventing automatic updates from downloading files from WordPress.org. Any plugin or theme updates must be performed in a development environment then committed and deployed to the Test and Live environments. WordPress core updates must be applied to a development environment via our Git-based [upstream core updates feature](/core-updates).

### Pantheon Page Cache

The [Pantheon Page Cache](https://github.com/pantheon-systems/pantheon-mu-plugin/blob/main/inc/pantheon-page-cache.php) plugin facilitates communication between Pantheon's Edge Cache layer and WordPress, allowing you to clear the entire site cache and set the default cache age.

1. Navigate to your WordPress dashboard > click **Settings** > **Pantheon Page Cache**.

1. Click **Clear Cache** to clear the cache for the entire site (this does not clear Varnish or Redis).

1. Set **Default Max Age** to a new value (optional). The default is 604800 seconds (1 week).

## Pantheon Advanced Page Cache

[Pantheon Advanced Page Cache](https://wordpress.org/plugins/pantheon-advanced-page-cache) automatically clears related pages from Pantheon's Edge when you update content. Without this plugin, pages expire from cache after 1 week by default. This plugin allows fresh content to be immediately served to anonymous visitors.

## Pantheon HUD

[Pantheon HUD](https://wordpress.org/plugins/pantheon-hud) provides situational awareness within the WordPress Dashboard when working on the Pantheon platform. It's helpful to have a reminder of which environment you're in, as well as quick access to links to get back to Pantheon's Dashboard, or to interface with your WordPress installation via the command line:

![Pantheon HUD](../../../images/pantheon-hud.png)

For installation details, see [Configuring Environment Indicators](/guides/environment-configuration/environment-indicator).

## [WordPress Native PHP Sessions](https://wordpress.org/plugins/wp-native-php-sessions)

[WordPress Native PHP Sessions](https://wordpress.org/plugins/wp-native-php-sessions)resolves errors with code (themes, modules or plugins) that rely on PHP's default session manager. For more details, see [WordPress and PHP Sessions](/guides/php/wordpress-sessions/#troubleshooting-session-errors).

### Troubleshooting WP Native PHP Sessions

If you see an error similar to the following in the error logs:

```none
Fatal error: session_start(): Failed to initialize storage module: user (path: ) in …/code/wp-content/plugins/plugin-that-uses-sessions/example.php on line 2
```

The cause is likely a plugin in the [mu-plugins](/guides/wordpress-configurations/mu-plugin) directory that is instantiating a session prior to this plugin loading. To fix, deactivate the WP Native PHP Sessions plugin and instead load it via an mu-plugin that loads first.

For example, create an mu-plugin called `00.php` and add a line in it to include the `wp-native-php-sessions/pantheon-sessions.php` file.

## WP SAML Auth

[WP SAML Auth](https://wordpress.org/plugins/wp-saml-auth/)
provides support for SAML Authentication. The plugin comes bundled with the OneLogin SAML library and [SimpleSAMLphp](https://simplesamlphp.org/). For an example use case, see [Using WP SAML Auth with Google Apps](/guides/wordpress-google-sso)

## Object Cache Pro
[Object Cache Pro](https://objectcache.pro/) is a highly optimized premium WordPress plugin that integrates with Redis for business class performance. For more details, see also:

- [Object Cache Overview](/object-cache#wordpress-object-cache-pro)
- [Enable Object Cache Pro for WordPress](/object-cache/wordpress)

## WP Solr

[WP Solr](https://wordpress.org/plugins/solr-power/) enables the Pantheon Search (Solr) search engine for your WordPress website. For more information, see [Enabling Pantheon Search for WordPress](/guides/wordpress-developer/wordpress-solr).
