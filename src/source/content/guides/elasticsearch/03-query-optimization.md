---
title: Pantheon Search
subtitle: Elasticsearch Query Optimization
description: Instructions for optimizing queries with the ElasticPress plugin on your Pantheon WordPress site.
contenttype: [guide]
innav: [true]
categories: [search]
cms: [wordpress, drupal]
audience: [development]
product: [search]
integration: [--]
tags: [solr, elasticsearch, search]
contributors: [jazzsequence, carolynshannon]
showtoc: true
permalink: docs/guides/pantheon-search/elasticsearch/query-optimization
editpath: search/03-query-optimization.md
reviewed: "2026-02-10"
---

<Partial file="elasticsarch-pre-ga.md" />

One of the most powerful aspects of Elasticsearch on Pantheon is its ability to offload `WP_Query` requests from your database. The ElasticPress plugin integrates with WordPress at the query level, routing eligible queries to Elasticsearch instead of MySQL.

### How ElasticPress Integrates with WP_Query

When ElasticPress is active and configured, it automatically intercepts qualifying `WP_Query` calls and redirects them to Elasticsearch. This happens transparently — your existing theme and plugin code that uses `WP_Query` continues to work as expected, but the queries are now served by Elasticsearch instead of your database.

### The `ep_integrate` Parameter

For custom queries where you want to explicitly control Elasticsearch integration, ElasticPress provides the `ep_integrate` parameter. You can add this to any `WP_Query` or `get_posts()` call:

```php
// Force a query to use Elasticsearch
$query = new WP_Query( array(
    'post_type' => 'post',
    'posts_per_page' => 10,
    'ep_integrate' => true,
) );
```

You can also use `ep_integrate` to explicitly exclude a query from Elasticsearch:

```php
// Prevent this query from using Elasticsearch
$query = new WP_Query( array(
    'post_type' => 'post',
    'posts_per_page' => 10,
    'ep_integrate' => false,
) );
```

### When to Use `ep_integrate`

Use `ep_integrate => true` for queries that are:

- Performance-critical and would benefit from faster response times
- Search-related or involve complex filtering
- Serving high-traffic pages where database load is a concern

Use `ep_integrate => false` for queries that:

- Need to return results that have not yet been indexed
- Require real-time data accuracy immediately after content changes (before a sync)
- Are simple queries where the database performs adequately

### Keeping Your Index Current

After making significant content changes, run an index sync to ensure Elasticsearch has the latest data. You can trigger a sync from the ElasticPress dashboard in WordPress admin or via WP-CLI:

```bash
terminus wp <site>.<env> -- elasticpress sync
```

For large sites, consider running the sync with the `--per-page` flag to manage memory usage:

```bash
terminus wp <site>.<env> -- elasticpress sync --per-page=200
```