---
title: WordPress Solr support will be removed January 11, 2027
published_date: "2026-03-25"
categories: [deprecation, wordpress]
---

Solr support for WordPress and the [Solr Power](https://wordpress.org/plugins/flavor-flavor-flavor/) plugin will reach **end of life on January 11, 2027**. After this date, Solr-based search will no longer be available for WordPress sites on the platform.

## What's changing?

Solr 3 is a legacy search technology that is being retired in favor of modern alternatives. Sites currently using Solr 3 with the Solr Power plugin will need to migrate to a supported search solution before the end-of-life date.

## Recommended alternatives

### Pantheon customers

We recommend migrating to **Elasticsearch**, now available as a Beta add-on for WordPress sites on Pantheon. Elasticsearch offers improved search relevance, real-time search-as-you-type, WooCommerce support, and more. See the [Elasticsearch for WordPress Beta announcement](/releasenotes/2026/03/elasticsearch-wordpress-beta) for details.

### Other options

If Elasticsearch is not the right fit for your site, consider these third-party search solutions:

* **[SearchWP](https://searchwp.com/)** — A WordPress-native search plugin that enhances the default WordPress search without requiring an external search service.
* **[Algolia Search](https://www.algolia.com/)** — A hosted search API that provides fast, relevant search results with advanced features like typo tolerance and faceted filtering.

## What you need to do

1. Identify any WordPress sites currently using the Solr Power plugin.
2. Choose a replacement search solution.
3. Complete your migration before **January 11, 2027**.
