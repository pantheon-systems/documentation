---
title: WordPress on Pantheon Quick Start Guide
subtitle: Recommended WordPress Plugins
description: A list of WordPress plugins recommended for use on Pantheon.
contributors: [jspellman814]
contenttype: [guide]
innav: [false]
categories: [issues]
tags: [wordpress, webops, plugins]
cms: [wordpress]
audience: [development]
product: [--]
integration: [--]
reviewed: "2023-05-23"
showtoc: true
permalink: docs/guides/wordpress-pantheon/plugins-recommended
---

This section provides WordPress plugins that Pantheon recommends for various use cases. This is not a comprehensive list, and will continue to evolve over time.

## Pantheon Maintained Plugins

The plugins listed below are built and maintained by Pantheon and will improve site compatibility and performance on the Pantheon platform. Use of these plugins is included in the [Scope of Support](/guides/support/).

### Pantheon Advanced Page Cache

<ReviewDate date="2023-05-23" />

[Pantheon Advanced Page Cache](https://wordpress.org/plugins/pantheon-advanced-page-cache/) (PAPC) optimizes caching specifically for Pantheon's hosting environment, resulting in faster page load times and improved overall website performance.

Pantheon's WordPress upstream already ships with a limited version of PAPC in our mu plugins, but the plugin provides additional features, such as a seamless integration with Pantheon's Global CDN and edge caches.

We recommend this plugin for all Pantheon customers.

### WordPress Native PHP Sessions

<ReviewDate date="2023-05-23" />

[WordPress Native PHP Sessions](https://wordpress.org/plugins/wp-native-php-sessions/) implements PHP’s native session handlers, backed by the WordPress database. This allows plugins, themes, and custom code to safely use PHP `$_SESSION` in a distributed environment where PHP’s default tempfile storage won’t work.

This plugin is recommended for any site with a plugin or theme that uses PHP Sessions.

## Third-Party Plugins

The third-party plugins listed below are not maintained by Pantheon and support is not provided or guaranteed. However, these plugins have been shown to reliably improve site performance on the Pantheon platform. We recommend that you test and evaluate these plugins to confirm their benefits for your use case.

### Index WP MySQL For Speed

<ReviewDate date="2023-05-23" />

[Index WP MySQL For Speed](https://wordpress.org/plugins/index-wp-mysql-for-speed/) makes your MySQL database work more efficiently by adding high-performance keys to the tables you choose.

The database on a modestly sized site (with a few users and a few hundred posts) may be fast enough without these keys. The speed improvements are most noticeable on larger sites with many posts and products.


### Object Cache Pro

<ReviewDate date="2023-05-23" />

[Object Cache Pro](https://objectcache.pro/) remembers, or caches, any queries to the server after a Drupal or WordPress page is loaded for the first time. When another user loads the page, the results are provided from the Object Cache which is stored in memory without querying the database again. This results in much faster page load times, and less server impact on database resources.

This plugin is recommended for any site using Redis and object caching. For more information on using Object Cache Pro on Pantheon, [check out our guide](https://docs.pantheon.io/guides/object-cache-pro/).

### Safe Redirect Manager

<ReviewDate date="2023-05-23" />

[Safe Redirect Manager](https://wordpress.org/plugins/safe-redirect-manager/) allows users to easily and safely manage your site’s redirects.

This plugin is recommended for any site, and scales well on large Enterprise sites due to how the redirects are stored.