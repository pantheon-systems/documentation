---
title: Object Cache (formerly Redis)
subtitle: Introduction
description: Understand how to use Object Cache as a drop-in caching mechanism for your Pantheon site.
categories: [performance]
tags: [cache, plugins, modules, database]
contributors: [cityofoaksdesign, carolynshannon, jms-pantheon, whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/object-cache
anchorid: object-cache
---

Pantheon's Object Cache (formerly Redis) is an open-source, networked, in-memory, key-value data store based on Redis that can be used as a drop-in caching backend for your Drupal or WordPress website.

## Benefits of Object Cache

Most website frameworks like Drupal and WordPress use databases to cache internal application objects along with queries for normal page requests, which causes increased load-times.

Object Cache remembers, or caches, any queries to the server after a Drupal or WordPress page is loaded for the first time. When another user loads the page, the results are provided from the Object Cache which is stored in memory without querying the database again. This results in much faster page load times, and less server impact on database resources.

### Scalable Performance

Object Cache provides an alternative caching backend that resides in memory rather than a database that stores data on a disk or a solid-state drive (SSD). By eliminating the need to access disks, Object Cache avoids seek time delays and can access data in microseconds. This improves performance for dynamic pages and logged-in users. It also provides a number of other features for developers looking to use it to manage queues, or perform custom caching of their own.

## Object Cache Requirements

All plans except for the Basic plan can use Object Cache. Sandbox site plans can enable and use Object Cache for development purposes, but if the site plan is upgraded to Basic, the feature will be disabled.

| Plans         | Object Cache Support <Popover content="Available across all environments, including Multidevs."/> |
| ------------- | -------------------------------------- |
| Sandbox       | <span style="color:green">✔</span> |
| Basic         | ❌                                 |
| Performance   | <span style="color:green">✔</span> |
| Elite         | <span style="color:green">✔</span> |

## More Resources

- [Site Plans FAQs](/site-plans-faq)
- [Drupal Performance and Caching Settings](/drupal-cache)
- [WordPress Pantheon Cache Plugin Configuration](/wordpress-cache-plugin)
- [Debug Caching Issues](/debug-cache)