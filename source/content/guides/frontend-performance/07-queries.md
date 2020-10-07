---
title: Frontend Performance 
subtitle: Queries and Databases
description: Optimizing queries and database optimization.
anchorid: queries
categories: [performance]
tags: [measure, traffic]
type: guide
permalink: docs/guides/frontend-performance/queries
editpath: frontend-performance/07-queries.md
image: CDN-speedTest-docs-guide
reviewed: "2020-10-10"
---

Optimizing queries, query caching (and when not to), and database optimization.

## Optimize Queries

Tools and techniques to optimize queries.

## Query Caching

When and how to cache queries (and when not to).

### Bust Cache with Query Parameter
Include static files with [cache-busting query strings](https://stackoverflow.com/a/9692722). This prevents the long `Cache-Control` lifetime for static files from breaking pages when the CSS and Javascript change.

Drupal automatically does this for CSS and Javascript, for details see [Drupal.org docs](https://www.drupal.org/docs/8/creating-custom-modules/adding-stylesheets-css-and-javascript-js-to-a-drupal-8-module). WordPress provides the `wp_enqueue_style` parameter for a version when enqueuing CSS and Javascript, for details see Themetry's article, [Cache-Busting Enqueued Scripts and Styles in WordPress](https://themetry.com/cache-busting-wordpress/).

### Upload Entirely New Files
For files included in pages without cache-busting query strings (like images), it's better to upload a new file (and delete the old one) instead of replacing the existing file.

The new filename will cause clients to get the new file, even if they have a cached version of the older one (which is likely given the one-year cache lifetimes for static files on Pantheon).

## Optimize Databases

How to optimize databases for performance increases.

