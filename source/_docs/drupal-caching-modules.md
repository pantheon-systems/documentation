---
title: Caching in Drupal Modules
description: Configure your Drupal site's performance and caching settings to make significant improvements.
tags: [cacheapp]
categories: [drupal]
---
While configuring [Drupal's performance and caching settings](/docs/drupal-cache) and using [redis as a Drupal caching backend](/docs/redis) will make a significant performance difference, not every module uses Drupal's caching out of the box.

## Views

Views has a very granular caching system, down to the individual View display. There's no single control that will just turn on views caching, and the caching is off by default. There are three different kinds of user-configurable caching within Views:

<dl>
	<dt>Query Results Caching</dt>
	<dd>Raw Query Results, which should be cached for at least 1 minute. As the subject matter expert, you're in the best position to know how often your content should change.</dd>
	<dt>Rendered Output Caching</dt>
	<dd>Generated markup, which should be cached for as long as possible (if the query changes, the output will be refreshed).</dd>
	<dt>Block Caching</dt>
	<dd>If you're generating a block, this will expose the block to Drupal's built-in block caching.</dd>
</dl>

### Configure Views Caching

1. Go to /admin/structure/views/
2. Edit the View in question.
3. Select the display and click **Advanced**.
4. Click the option next to Caching.
5. Choose **Time-Based Caching** and click **Apply**.  
  Rendered output: (something other than Never Cache)  
  Query results: (something other than Never Cache)

### Configure Views Block Caching

1. Go to /admin/structure/views/
2. Edit the View in question.
3. Select the block display and click **Advanced**.
4. Click the option next to Block Caching.
5. Block Caching Type: Choose an option for Drupal's built-in block caching method.

## Views Caching Plugins

You can also force caching for all your views using a module like [Views cache bully](https://drupal.org/project/views_cache_bully).

Views cache can also be aware of when the content itself changes with [Views content cache](https://drupal.org/project/views_content_cache).
