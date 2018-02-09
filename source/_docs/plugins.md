---
title: Pantheon Plugins
description: Details on specific WordPress plugins developed and maintained for the Pantheon Website Management Platform workflow.
tags: [siteintegrations, infrastructure, cacheedge]
categories: []
---
Pantheon maintains multiple plugins to facilitate its workflow within WordPress. For real time discussion of these modules, find Pantheon developers in our [Power Users Slack channel](/docs/power-users/).

<div class="alert alert-info">
<h4 class="info">Note</h4>
<p markdown="1">Drupal users, see [Pantheon Modules](/docs/modules/) for details on Drupal modules developed and maintained for the Pantheon workflow.</p></div>

## [Pantheon Must-Use Plugin](https://github.com/pantheon-systems/WordPress/tree/master/wp-content/mu-plugins/pantheon){.external}
This must-use plugin is vital to the operation of your site on the platform and must not be removed from your codebase. Consider it a part of WordPress core, and do not hack it. The permanent activation of this plugin will not interfere with your local environment.

The functionality of this plugin is broken into two parts: Updates and Page Cache.

### [Pantheon Updates](https://github.com/pantheon-systems/WordPress/tree/master/wp-content/mu-plugins/pantheon/pantheon-updates.php){.external}
The plugin disables automatic updates of all plugins, themes, and WordPress core on Pantheon's Test and Live environments. We do this because it is unsafe to apply updates to production environments directly without first verifying updates on a development environment.

The Test and Live environment codebases also cannot be written to, preventing automatic updates from downloading files from WordPress.org. Any plugin or theme updates must be performed in a development environment then committed and deployed to the Test and Live environments. WordPress core updates must be applied to a development environment via our Git-based [upstream core updates feature](/docs/upstream-updates/).

###[Pantheon Page Cache](https://github.com/pantheon-systems/WordPress/blob/master/wp-content/mu-plugins/pantheon/pantheon-page-cache.php){.external}
Facilitates communication between Pantheon's Edge Cache layer and WordPress, allowing you to clear the entire site cache and set the default cache age.

From the WordPress dashboard, click **Settings** > **Pantheon Page Cache**.

The **Clear Cache** option will clear the cache for the entire site, but it does not clear Varnish or Redis.

We recommend setting **Default Time to Live (TTL)** to 600 seconds.


## [Pantheon Advanced Page Cache](https://wordpress.org/plugins/pantheon-advanced-page-cache){.external}
Automatically clear related pages from Pantheon's Edge when you update content. Without this plugin, pages expire from cache after 10 minutes (600 seconds) by default. This plugin allows fresh content to be immediately served to anonymous visitors.

## [Pantheon HUD](https://wordpress.org/plugins/pantheon-hud){.external}
Provides situational awareness within the WordPress Dashboard when working on the Pantheon platform. It's helpful to have a reminder of which environment you're in, as well as quick access to links to get back to Pantheon's Dashboard, or to interface with your WordPress installation via the command line:

![Pantheon HUD](/source/docs/assets/images/pantheon-hud.png)

For installation details, see [Configuring Environment Indicators](/docs/environment-indicator).

## [WordPress Native PHP Sessions](https://wordpress.org/plugins/wp-native-php-sessions){.external}
Resolve errors with code (themes, modules or plugins) that relies on PHP's default session manager. For more details, see [WordPress and PHP Sessions](/docs/wordpress-sessions/#troubleshooting-session-errors).

## [WP SAML Auth](https://wordpress.org/plugins/wp-saml-auth/){.external}
Provides support for SAML Authentication. The plugin comes bundled with the OneLogin SAML library and [SimpleSAMLphp](https://simplesamlphp.org/){.external}. For an example use case, see [Using WP SAML Auth with Google Apps](/docs/wordpress-google-sso/)

## [WP Redis](https://wordpress.org/plugins/wp-redis){.external}
Provides an alternative caching backend, taking work off the database, which is vital for scaling to a larger number of logged-in users. For more information, see [Installing Redis on Drupal or WordPress](/docs/redis/).
