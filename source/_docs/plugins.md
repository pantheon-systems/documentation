---
title: Pantheon Plugins
description: Details on specific Plugins developed and maintained for the Pantheon Website Management Platform workflow.
categories: [wordpress]
tags: [code]
keywords: plugins, wordpress, pantheon
---
Pantheon maintains multiple plugins to facilitate its workflow within WordPress. Please feel free to contact us if you have any concerns with these plugins.

## MU-Plugins
Pantheon's WordPress upstream adds [two must-use plugins](https://github.com/pantheon-systems/WordPress/tree/master/wp-content/mu-plugins/pantheon) to WordPress core. These plugins are vital to the operation of your site on the platform and must not be removed from your codebase. Consider them a part of WordPress core, and do not hack them. The permanent activation of these plugins will not interfere with your local environment.

### Pantheon-Updates

The [Pantheon Updates](https://github.com/pantheon-systems/WordPress/tree/master/wp-content/mu-plugins/pantheon/pantheon-updates.php) plugin prevents automatic updates of all plugins, themes, and WordPress core. We do this because it is unsafe to update directly on the live environment without testing updates in a private environment first. The Test and Live environment codebases also cannot be written to, preventing automatic updates from downloading files from wordpress.org. Any plugin or theme updates must be performed in a Development environmentent before being committed to code and deployed to the Test and Live environments. WordPress core updates must be applied to a Development environment via our Git-based [upstream core updates feature](/docs/upstream-updates/).

###Pantheon-Cache

The [Pantheon Cache](https://github.com/pantheon-systems/WordPress/tree/master/wp-content/mu-plugins/pantheon/pantheon-cache.php) plugin facilitates communication between Pantheon's Edge Cache layer and WordPress. It allows you to set the default cache age, clear individual pages on demand, and it will automatically clear relevant urls when the site is updated.

Access the plugin by going to the WordPress dashboard and clicking **Settings** > **Pantheon Cache**.

We recommend setting the **Default Cache Time** to 600 seconds.

The **Clear Caches** option will clear the cache for the entire site, but it does not clear Varnish or Redis. To clear individual page cache, log in to `/wp-admin` and visit any page of your site to clear the page cache.

## Pantheon Sessions Plugin
The [WordPress Native PHP Sessions](https://wordpress.org/plugins/wp-native-php-sessions/) plugin resolves errors with code (themes, modules or plugins) that relies on PHP's default session manager. For more details, see [WordPress and PHP Sessions](/docs/wordpress-sessions/#troubleshooting-session-errors).

## Pantheon HUD
[Pantheon HUD](https://wordpress.org/plugins/pantheon-hud) gives you situational awareness within the WordPress Dashboard when working on the Pantheon platform. It's helpful to have a reminder of which environment you're in, as well as quick access to links to get back to Pantheon's Dashboard, or to interface with your WordPress installation via the command line:

![Pantheon HUD](/source/docs/assets/images/pantheon-hud.png)

For installation details, see [Configuring Environment Indicators](/docs/environment-indicator).

## See Also

You can download and install the [WP Redis](https://wordpress.org/plugins/wp-redis/) plugin to back your WP Object cache with Redis. This provides an alternative caching backend, taking work off the database, which is vital for scaling to a larger number of logged-in users. For more information, see [Installing Redis on WordPress](/docs/wordpress-redis).
