---
title: Caching in Drupal Modules
description: Configure Drupal's performance and caching settings to make significant improvements.
category:
  - optimizing
  - Drupal

---

## Overview
While configuring [Drupal's performance and caching settings](/documentation/running-drupal/drupal-s-performance-and-caching-settings/) and using [redis as a Drupal caching backend](/documentation/howto/redis-as-a-caching-backend/) will make a significant performance difference, not every module uses Drupal's caching out of the box.

## Views

Views has a very granular caching system, down to the individual View display. There's no single control that will just turn on views caching, and the caching is off by default. There are three different kinds of user-configurable caching within Views:

<dl>
	<dt>Query results caching</dt>
	<dd>Raw query results, which should be cached for at least 1 minute. As the subject matter expert, you're in the best position to know how often your content should change.</dd>
	<dt>Rendered output caching</dt>
	<dd>Generated markup, which should be cached for as long as possible (if the query changes, the output will be refreshed)</dd>
	<dt>Block caching</dt>
	<dd>If you're generating a block, this will expose the block to Drupal's built-in block caching.</dd>
</dl>

To configure Views caching:

- Go to /admin/structure/views/
- Edit the View in question
- Select the Display
- Click Advanced
- Next to Caching, click to edit
- Choose Time-based Caching and click Apply
- Rendered output: (something other than Never cache)
- Query results: (something other than Never cache)

To configure Views block caching, which will only work if Drupal is caching blocks:

- Go to /admin/structure/views/
- Edit the View in question
- Select the Display
- Click Advanced
- Next to Block caching, click to edit
- Block caching type - choose the status for Drupal's built-in block caching method

## Views Caching Plugins

You can also force caching for all your views using a module like [Views cache bully](https://drupal.org/project/views_cache_bully).

Views cache can also be aware of when the content itself changes with [Views content cache](https://drupal.org/project/views_content_cache).
