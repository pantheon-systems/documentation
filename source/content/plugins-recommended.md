---
title: Recommended WordPress Plugins
description: A list of WordPress plugins that are recommended for use on Pantheon.
tags: [plugins]
contributors: [jspellman814]
contenttype: [doc]
innav: [true]
categories: [issues]
cms: [wordpress]
audience: [development]
product: [--]
integration: [--]
reviewed: "2023-05-23"
---

This page lists WordPress plugins that Pantheon recommends using for various use cases. This is not a comprehensive list, and will continue to evolve over time.

## Pantheon Advanced Page Cache

<ReviewDate date="2023-05-23" />

[Pantheon Advanced Page Cache](https://wordpress.org/plugins/pantheon-advanced-page-cache/) (PAPC) optimizes caching specifically for Pantheon's hosting environment, resulting in faster page load times and improved overall website performance.

Pantheon's WordPress upstream already ships with a limited version of PAPC in our mu plugins, but the plugin fleshes out additional features, such as a seamless integration with Pantheon's Global CDN and edge caches.

We recommend this plugin for all Pantheon customers.

<ReviewDate date="2023-05-23" />

[Index WP MySQL For Speed](https://wordpress.org/plugins/index-wp-mysql-for-speed/) makes your MySQL database work more efficiently by adding high-performance keys to the tables you choose.

On a modestly sized site (with a few users and a few hundred posts) your database may be fast enough without these keys. The speed improvements are most noticeable on larger sites with many posts and products.

## WordPress Native PHP Sessions

<ReviewDate date="2023-05-23" />

[WordPress Native PHP Sessions](https://wordpress.org/plugins/wp-native-php-sessions/) implements PHP’s native session handlers, backed by the WordPress database. This allows plugins, themes, and custom code to safely use PHP `$_SESSION`s in a distributed environment where PHP’s default tempfile storage just won’t work.

This plugin is recommended for use on any site where a plugin or theme uses PHP Sessions.

## Object Cache Pro

<ReviewDate date="2023-05-23" />

[Object Cache Pro](https://objectcache.pro/) remembers, or caches, any queries to the server after a Drupal or WordPress page is loaded for the first time. When another user loads the page, the results are provided from the Object Cache which is stored in memory without querying the database again. This results in much faster page load times, and less server impact on database resources.

This plugin is recommended for use on any site using Redis and object caching.

## Safe Redirect Manager

<ReviewDate date="2023-05-23" />

[Safe Redirect Manager](https://wordpress.org/plugins/safe-redirect-manager/) allows users to easily and safely manage your site’s redirects.

This plugin is recommended for use on any site, but this plugin scales well on large Enterprise sites due to how the redirects are stored.

