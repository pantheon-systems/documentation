---
title: WordPress Plugins that Work Well with Pantheon
description: A list of WordPress plugins that are supported and encouraged for use on Pantheon.
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

## Index WP MySQL For Speed

<ReviewDate date="2023-05-23" />

[Index WP MySQL For Speed](https://wordpress.org/plugins/index-wp-mysql-for-speed/) works to make your MySQL database work more efficiently by adding high-performance keys to the tables you choose.

On a modestly sized site (with a few users and a few hundred posts) your database may be fast enough without these keys. The speed improvements are most noticeable on larger sites with many posts and products.

## WordPress Native PHP Sessions

<ReviewDate date="2023-05-23" />

[WordPress Native PHP Sessions](https://wordpress.org/plugins/wp-native-php-sessions/) implements PHP’s native session handlers, backed by the WordPress database. This allows plugins, themes, and custom code to safely use PHP `$_SESSION`s in a distributed environment where PHP’s default tempfile storage just won’t work.

This plugin is recommended for use on any site where a plugin or theme uses PHP Sessions.

## Object Cache Pro

<ReviewDate date="2023-05-23" />

[Object Cache Pro](https://objectcache.pro/) remembers, or caches, any queries to the server after a Drupal or WordPress page is loaded for the first time. When another user loads the page, the results are provided from the Object Cache which is stored in memory without querying the database again. This results in much faster page load times, and less server impact on database resources.

This plugin is recommended for use on any site using Redis and object caching.

## Bulk Indexer for Yoast

<ReviewDate date="2023-05-23" />

Yoast background indexing can fail to complete for sites with large numbers of posts so Pantheon created [Bulk Indexer for Yoast](https://github.com/pantheon-systems/yoast-bulk-indexer). This plugin speeds up the indexables generation process significantly. It leverages [Action Scheduler](https://actionscheduler.org/) and Yoast's core functionality to process hundreds or thousands of posts at a time.

This plugin is recommended for use on any site using Yoast SEO with hundreds of thousands or millions of posts.

## Safe Redirect Manager

<ReviewDate date="2023-05-23" />

[Safe Redirect Manager](https://wordpress.org/plugins/safe-redirect-manager/) allows users to easily and safely manage your site’s redirects.

This plugin is recommended for use on any site, but this plugin scales well on large Enterprise sites due to how the redirects are stored.

