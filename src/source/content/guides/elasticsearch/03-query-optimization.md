---
title: Pantheon Search
subtitle: Elasticsearch Query Optimization
navtitle: Query Optimization
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

### How ElasticPress Integrates with `WP_Query`

When ElasticPress is active and configured, it automatically routes WordPress search queries (any `WP_Query` with an `s` parameter) through Elasticsearch instead of MySQL. For non-search queries — archives, custom loops, filtered post lists — you can opt in to Elasticsearch by setting the `ep_integrate` parameter to `true`

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

For more general use integration with query blocks or archive pages, you can use the `ep_integrate` parameter with the `pre_get_posts` action:

```php
/**
 * Integrate ElasticPress with specific queries using pre_get_posts.
 *
 * This approach allows you to selectively route existing WordPress queries
 * through Elasticsearch without modifying theme or plugin code that creates
 * those queries.
 */
add_action( 'pre_get_posts', 'my_ep_integrate_queries' );

function my_ep_integrate_queries( $query ) {
    // Don't integrate on feed queries.
    if ( $query->is_feed() ) {
        return;
    }

    // Blog page (posts index)
    if ( $query->is_home() && $query->is_main_query() ) {
        $query->set( 'ep_integrate', true );
    }

    // Post type archives
    if ( $query->is_post_type_archive() && $query->is_main_query() ) {
        $query->set( 'ep_integrate', true );
    }

    // Category and tag archives
    if ( ( $query->is_category() || $query->is_tag() ) && $query->is_main_query() ) {
        $query->set( 'ep_integrate', true );
    }
}
```

### When to Use `ep_integrate`

Use `ep_integrate => true` for queries that are:

- Performance-critical and would benefit from faster response times
- Search-related or involve complex filtering
- Serving high-traffic pages where database load is a concern

In many cases, `ep_integrate` may be _slower_ for simple queries that the database can handle efficiently, especially if the content is not yet indexed in Elasticsearch. For these cases, you can use `ep_integrate => false` or not add the `ep_integrate` parameter to ensure the query runs against the database instead.

### Keeping Your Index Current

After making significant content changes, run an index sync to ensure Elasticsearch has the latest data. You can trigger a sync from the ElasticPress dashboard in WordPress admin or via WP-CLI:

```bash
terminus wp <site>.<env> -- elasticpress sync
```

For large sites, consider running the sync with the `--per-page` flag to manage memory usage:

```bash
terminus wp <site>.<env> -- elasticpress sync --per-page=200
```