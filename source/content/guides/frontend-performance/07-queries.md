---
title: Frontend Performance
subtitle: Queries and Databases
description: Optimizing queries and databases.
anchorid: queries
categories: [performance]
tags: [measure, traffic]
type: guide
layout: guide
showtoc: true
permalink: docs/guides/frontend-performance/queries
editpath: frontend-performance/07-queries.md
image: CDN-speedTest-docs-guide
reviewed: "2020-10-10"
---

This page provides information on optimizing queries, query caching (when you should, and shouldn't use it), and database optimization techniques.

## Optimize Queries

This section provides information on available tools and techniques to optimize queries.

## Query Caching

Query caching can improve optimization. Read the sections below to learn more about when you should, and when you shouldn't use query caching.

### Bust Cache with Query Parameter

Include static files with [cache-busting query strings](https://stackoverflow.com/a/9692722). This prevents the long `Cache-Control` lifetime for static files from breaking pages when the CSS and Javascript change.

Drupal automatically does this for CSS and Javascript, for details see [Drupal.org docs](https://www.drupal.org/docs/8/creating-custom-modules/adding-stylesheets-css-and-javascript-js-to-a-drupal-8-module). WordPress provides the `wp_enqueue_style` parameter for a version when enqueuing CSS and Javascript, for details see Themetry's article, [Cache-Busting Enqueued Scripts and Styles in WordPress](https://themetry.com/cache-busting-wordpress/).

### Upload Entirely New Files

For files included in pages without cache-busting query strings (like images), it's better to upload a new file (and delete the old one) instead of replacing the existing file.

The new filename will cause clients to get the new file, even if they have a cached version of the older one (which is likely given the one-year cache lifetimes for static files on Pantheon).

## Optimize Databases

Optimizing your database can increase site performance. Learn more about [Drupal](https://www.drupal.org/docs/7/managing-site-performance-and-scalability/optimizing-drupal-to-load-faster-server-mysql) and [WordPress](https://wordpress.org/support/article/optimization/) guidelines for improving database optimization.
