---
title: Pantheon Plugins for WordPress
description: WordPress plugins developed and maintained for the Pantheon WebOps Platform.
cms: "WordPress"
categories: [integrate]
tags: [plugins, cache, saml, redis, solr]
reviewed: "2020-04-21"

---
Pantheon maintains multiple plugins to facilitate its workflow within WordPress. For real time discussion of these modules, find Pantheon developers in our [Community Forums](https://discuss.pantheon.io/) and [Slack Workspace](https://slackin.pantheon.io/).

<Alert title="Note" type="info">

Drupal users, see [Pantheon Modules](/modules) for details on Drupal modules developed and maintained for the Pantheon workflow.

</Alert>

## [Pantheon Must-Use Plugin](https://github.com/pantheon-systems/WordPress/tree/master/wp-content/mu-plugins/pantheon)

This must-use plugin is vital to the operation of your site on the platform and must not be removed from your codebase. Consider it a part of WordPress core, and do not hack it. The permanent activation of this plugin will not interfere with your local environment.

The functionality of this plugin is broken into two parts: Updates and Page Cache.

### [Pantheon Updates](https://github.com/pantheon-systems/WordPress/tree/master/wp-content/mu-plugins/pantheon/pantheon-updates.php)

The plugin disables automatic updates of all plugins, themes, and WordPress core on Pantheon's Test and Live environments. We do this because it is unsafe to apply updates to production environments directly without first verifying updates on a development environment.

The Test and Live environment codebases also cannot be written to, preventing automatic updates from downloading files from WordPress.org. Any plugin or theme updates must be performed in a development environment then committed and deployed to the Test and Live environments. WordPress core updates must be applied to a development environment via our Git-based [upstream core updates feature](/core-updates).

Check out the WordPress Dashboard section of [Working in the WordPress Dashboard and Drupal Admin Interface](/cms-admin#wordpress-dashboard) for more information on managing plugins and themes across multiple environments.

### [Pantheon Page Cache](https://github.com/pantheon-systems/WordPress/blob/default/wp-content/mu-plugins/pantheon/pantheon-page-cache.php)

Facilitates communication between Pantheon's Edge Cache layer and WordPress, allowing you to clear the entire site cache and set the default cache age.

From the WordPress dashboard, click **Settings** > **Pantheon Page Cache**.

The **Clear Cache** option will clear the cache for the entire site, but it does not clear Varnish or Redis.

We recommend setting **Default Time to Live (TTL)** to 600 seconds.

## [Pantheon Advanced Page Cache](https://wordpress.org/plugins/pantheon-advanced-page-cache)

Automatically clear related pages from Pantheon's Edge when you update content. Without this plugin, pages expire from cache after 10 minutes (600 seconds) by default. This plugin allows fresh content to be immediately served to anonymous visitors.

## [Pantheon HUD](https://wordpress.org/plugins/pantheon-hud)

Provides situational awareness within the WordPress Dashboard when working on the Pantheon platform. It's helpful to have a reminder of which environment you're in, as well as quick access to links to get back to Pantheon's Dashboard, or to interface with your WordPress installation via the command line:

![Pantheon HUD](../images/pantheon-hud.png)

For installation details, see [Configuring Environment Indicators](/environment-indicator).

## [WordPress Native PHP Sessions](https://wordpress.org/plugins/wp-native-php-sessions)

Resolve errors with code (themes, modules or plugins) that relies on PHP's default session manager. For more details, see [WordPress and PHP Sessions](/wordpress-sessions/#troubleshooting-session-errors).

### Troubleshooting WP Native PHP Sessions

If you see an error similar to the following in the error logs:

```none
Fatal error: session_start(): Failed to initialize storage module: user (path: ) in …/code/wp-content/plugins/plugin-that-uses-sessions/example.php on line 2
```

The cause is likely a plugin in the [mu-plugins](/mu-plugin) directory that is instantiating a session prior to this plugin loading. To fix, deactivate the WP Native PHP Sessions plugin and instead load it via an mu-plugin that loads first.

For example, create an mu-plugin called `00.php` and add a line in it to include the `wp-native-php-sessions/pantheon-sessions.php` file.

## [WP SAML Auth](https://wordpress.org/plugins/wp-saml-auth/)

Provides support for SAML Authentication. The plugin comes bundled with the OneLogin SAML library and [SimpleSAMLphp](https://simplesamlphp.org/). For an example use case, see [Using WP SAML Auth with Google Apps](/guides/wordpress-google-sso)

## [WP Redis](https://wordpress.org/plugins/wp-redis)

Provides an alternative caching backend, taking work off the database, which is vital for scaling to a larger number of logged-in users. For more information, see [Object Cache (formerly Redis) for Drupal or WordPress](/object-cache).

## [WP Solr](https://wordpress.org/plugins/solr-power/)

Enable the Apache Solr search engine for your WordPress website. For more information, see [Enabling Solr for WordPress](/wordpress-solr).
