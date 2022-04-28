---
title: Caching in Drupal Views
description: Configure your Drupal site's performance and caching settings to make significant improvements.
cms: "Drupal"
categories: [develop]
tags: [site, database]
---
While configuring [Drupal's performance and caching settings](/drupal-cache) and using [Redis as a Drupal caching backend](/object-cache) will make a significant performance difference, not every module uses Drupal's caching out of the box.

## Views

Views has a very granular caching system, down to the individual View display. There's no single control that will just turn on views caching, and the caching is off by default. There are three different kinds of user-configurable caching within Views:

<dl>

<dt>Query Results Caching</dt>

<dd>

Raw Query Results, which should be cached for at least 1 minute. As the subject matter expert, you're in the best position to know how often your content should change.

</dd>

<dt>Rendered Output Caching</dt>

<dd>

Generated markup, which should be cached for as long as possible (if the query changes, the output will be refreshed).

</dd>

<dt>Block Caching</dt>

<dd>

If you're generating a block, this will expose the block to Drupal's built-in block caching.

</dd>

</dl>

### Configure Views Caching

1. Go to `/admin/structure/views/`
1. Edit the View in question.
1. Select the display and click **Advanced**.
1. Click the option next to Caching.
1. Choose **Time-Based Caching** and click **Apply**.

   Rendered output: (something other than Never Cache)

   Query results: (something other than Never Cache)

### Configure Views Block Caching

1. Go to `/admin/structure/views/`
1. Edit the View in question.
1. Select the block display and click **Advanced**.
1. Click the option next to Block Caching.
1. Block Caching Type: Choose an option for Drupal's built-in block caching method.

## Views Caching Modules

### Drupal 7
You can force caching for all your views using a module like [Views cache bully](https://drupal.org/project/views_cache_bully).

### Drupal 9
You can replace the hard-coded cache tag with a form that allows developers to set different cache tags based on configuration of the view using a module like [Views Custom Cache Tags](https://www.drupal.org/docs/drupal-apis/cache-api/cache-tags).

<Alert title="Note"  type="info" >

Drupal 8 reached end-of-life status in November 2021, and is no longer supported by Drupal. Read the [official announcement on Drupal.org](https://www.drupal.org/psa-2021-06-29).

</Alert>
