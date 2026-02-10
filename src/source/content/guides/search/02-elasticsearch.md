---
title: Pantheon Search
subtitle: Pantheon Search powered by Elasticsearch
description: Detailed information on using Elasticsearch with your Pantheon WordPress site with ElasticPress.
tags: [elasticsearch,search]
reviewed: "2026-02-10"
contenttype: [doc]
innav: [true]
categories: [search]
cms: [wordpress]
audience: [agency, development]
product: [search]
integration: [--]
permalink: docs/guides/search/elasticsearch
editpath: search/02-elasticsearch.md
contributors: [jazzsequence]
---

Elasticsearch on Pantheon gives WordPress teams a fully managed search service that goes beyond basic site search — offloading database queries, handling traffic spikes, and delivering features like fuzzy matching and autosuggest without the overhead of managing an external provider.

## Overview

Pantheon provides integrated Elasticsearch support for WordPress sites through the [ElasticPress](https://wordpress.org/plugins/elasticpress/) plugin. Elasticsearch is a powerful search and query engine that offloads demanding `WP_Query` requests from your database, delivering faster search results, superior search features, and improved overall site performance for your visitors.

By bringing Elasticsearch directly onto the Pantheon platform, you get a fully managed search service without the operational burden of maintaining an external search provider. 

### Which Plans Can Use Elasticsearch?

Elasticsearch is available for WordPress sites on **Performance** and **Elite** site plans. Every environment on your site (Dev, Test, Live, and Multidevs) receives its own Elasticsearch endpoint. Elasticsearch is not available on Sandbox sites.

### Elasticsearch and Solr

Pantheon also offers [Solr-based search](/solr). You can have both Solr and Elasticsearch activated on a site at the same time, which is useful during migration. However, running both simultaneously in production is not recommended. For new search implementations, Elasticsearch with ElasticPress is the recommended path.

---


## Query Optimization

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

---

## Troubleshooting

### Frequently Asked Questions

**Do I have to pay extra for Elasticsearch?**

Access to Elasticsearch is included for sites on Performance plans and above. Activating Elasticsearch is a self-serve operation, similar to how Solr or Redis are enabled on Pantheon.

**What plugin do I use?**

Use the open-source [ElasticPress](https://wordpress.org/plugins/elasticpress/) plugin from WordPress.org. Pantheon does not require a custom plugin — ElasticPress is the standard WordPress integration for Elasticsearch.

**Can I use Solr and Elasticsearch at the same time?**

Yes. Solr can be enabled at the same time as Elasticsearch to support migration. However, it is not recommended to actively use both in production simultaneously.

**Do I get a dedicated Elasticsearch instance?**

Pantheon uses shared Elasticsearch clusters. For high-value enterprise sites requiring total isolation, dedicated clusters may be provisioned upon request and approval.

**Do I get all the features of ElasticPress?**

Yes. All features available in the ElasticPress plugin are supported on Pantheon's Elasticsearch integration.

**Can I use ElasticPress AI features?**

Yes, you can use ElasticPress AI features with your own API keys. Pantheon does not provide API keys or built-in AI integration at this time.

**Does each environment get its own Elasticsearch endpoint?**

Yes. Every environment on your site — Dev, Test, Live, and Multidevs — receives its own Elasticsearch endpoint. This ensures that indexing and searching in one environment does not affect another.

### Common Issues

**ElasticPress cannot connect to the host**

- Verify that Elasticsearch has been activated in the Pantheon Dashboard or via Terminus.
- If you are in the Beta phase, confirm that the EP constants are properly defined in `wp-config.php`.
- Check that the environment variables are available by running `terminus env:info <site>.<env>`.

**Search results are outdated or missing content**

- Run a full index sync from the ElasticPress dashboard or via WP-CLI (`wp elasticpress sync`).
- If you recently published or updated content, allow a moment for the sync to complete before testing.

**Site performance has not improved after enabling Elasticsearch**

- Ensure ElasticPress features are actually enabled under **ElasticPress > Features** in WordPress admin.
- Check that `ep_integrate` is not set to `false` on your critical queries.
- Use the ElasticPress Status Report (under **ElasticPress > Status Report**) to verify that queries are being routed to Elasticsearch.

**Plugin activation errors**

- Ensure you are running a supported version of WordPress and PHP.
- Deactivate other search plugins that may conflict with ElasticPress.
- If using WP Solr Power, disable it before activating ElasticPress to avoid conflicts.

### Getting Help

For support with Elasticsearch on Pantheon, contact Pantheon Support through the Dashboard. Include details about your site, the environment you're working in, and the specific issue you're encountering.

For ElasticPress plugin-specific questions, refer to the [ElasticPress documentation](https://www.elasticpress.io/resources/).

---

## Timeline and Roadmap

| Date | Milestone |
|------|-----------|
| March 2026 | Elasticsearch Beta release |
| March 2026 | Announcement: WP Solr Power plugin removal date, Solr 3 deprecation timeline |
| June 2026 | Elasticsearch GA release |
| January 2027 | Removal: WP Solr Power plugin and WP + Solr 3 support |
