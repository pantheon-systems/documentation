---
title: Errors and Server Responses
subtitle: Slow Queries and High Query Volumes
description: Learn how to resolve slow queries and high query volumes.
tags: [services]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/errors-and-server-responses/slow-and-high-queries
anchorid: slow-and-high-queries
contenttype: guide
categories: []
newcms: [drupal, wordpress]
audience: [development]
product: []
integration: []
---

This section provides information on how to resolve slow queries and high query volumes.

## Slow Queries / High Query Volume

Pages that leverage a large number of views can often slow down because of the reduced speed of the queries. High query volume (1,000+ queries on one page) can also cause slow performance.

Slow queries should be refactored individually if possible. However, caching can often help mitigate slow queries or high query volumes quickly. There will still be slow page loads when the cache is populated, but subsequent page-loads should be speedier.

## Administrative Pages in Drupal

It is possible for some normal administrative operations to outlast the request timeout in Drupal. This can make Drupal sites with large numbers of modules and/or a lot of data and activity extremely slow to:

- Submit the modules page
- Run cron
- Run `update.php`
- Flush caches

You can potentially address request timeouts for administrative operations by optimizing your application or by using a [workaround](#admin-workarounds). 

## Admin Workarounds

[Terminus](/terminus) is a reliable workaround for many administrative bottlenecks,including:

- Slow queries
- High query volumes
- Timeouts
- Slow external calls

There are no time limits on Terminus because it runs via the PHP command-line. You can use Terminus to:

- Enable or disable modules or plugins
- Run `update.php`
- Clear caches

## Handle More Traffic

Refer to [Debugging Performance Bottlenecks](/debug-slow-performance) for details on how to streamline your site to handle additional traffic.

## More Resources

- [Drupal Performance and Caching Settings](/drupal-cache)

- [WordPress Pantheon Cache Plugin Configuration](/wordpress-cache-plugin)

- [Optimize Your wp-options Table and Autoloaded Data](/optimize-wp-options-table-autoloaded-data)