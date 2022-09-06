---
title: Errors and Server Responses
subtitle: Overloaded Workers
description: Learn how to resolve slow queries and high query volumes.
tags: [services]
categories: [platform]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/error-server-responses/slow-and-high-queries
anchorid: slow-and-high-queries
---

This section provides information on how to resolve slow queries and high query volumes.

## Administrative Pages in Drupal
It is unfortunately possible for some normal administrative operations to outlast the request timeout in Drupal. Submitting the modules page, manually running cron, running update.php, or flushing caches can be extremely slow operations on Drupal powered sites with large numbers of modules and/or a lot of data and activity.

If you are seeing request timeouts for administrative operations, you may be able to address this by optimizing your application or by using a work-around (see below).

## Slow Queries / High Query Volume
Pages that leverage a large number of views can often bog down because of the slow speed of the queries. It can also happen that a sufficiently high query volume (1,000+ queries on one page) can push things over the edge.

Individually slow queries should be refactored if possible. However, often caching can help mitigate slow queries or high query volumes quickly. There will still be slow page loads when the cache needs to be populated, but subsequent page-loads should be speedier.

## Admin Work-Arounds

In the best of all possible worlds, there are no slow queries, all external calls are fast, and the application is a finely-tuned highly-optimized cheetah of the web. In reality, sometimes we just need to get around a pesky timeout in order to get the job done.

[Terminus](/terminus) is a great workaround for many administrative bottlenecks. There are no time limits because it runs via the PHP command-line. Enabling/disabling modules or plugins, running update.php for Drupal, clearing caches, are all actions supported by Terminus for both WordPress and Drupal.

## Handle More Traffic

Refer to [Debugging Performance Bottlenecks](/debug-slow-performance) for details on how to streamline your site to handle additional traffic.