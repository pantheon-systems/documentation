---
title: Elasticsearch for WordPress now available in Beta
published_date: "2026-04-07"
categories: [new-feature, wordpress]
---

Elasticsearch is now available as a Beta add-on for WordPress sites on Pantheon. This integration is powered by [ElasticPress](https://elasticpress.io), the leading Elasticsearch solution for WordPress.

## What's included?

ElasticPress offloads search queries from your database to Elasticsearch, improving `WP_Query` performance and reducing load on your application server. Capabilities include:

* **Full-text search** — Fuzzy matching, synonyms, and weighted fields for more relevant search results.
* **Instant Search** — Real-time search-as-you-type results without full page reloads.
* **`WP_Query` integration** — Elasticsearch can handle `WP_Query` requests, reducing database load and improving page load times.
* **Faceted filtering** — Narrow results by category, tag, custom taxonomy, and other attributes.
* **WooCommerce support** — Product search and filtering for WooCommerce storefronts.
* **Related content** — Surface related posts and pages automatically.
* **Custom content indexing** — Index posts, pages, custom post types, and custom fields.

## Who has access?

Elasticsearch is available to WordPress sites on **Performance Small** plans and above, including Elite.

## How to enable it

Elasticsearch can be enabled in two ways:

* **From the dashboard** — Navigate to **Site Settings → Add-Ons** and activate Elasticsearch. Connection credentials are configured automatically.

* **From Terminus** — Use the `search` command:

  ```bash
  terminus search:enable <site>
  ```

<Alert type="info" title="Note">

In order to activate Elasticsearch in Terminus, ensure you have the [latest version of Terminus](/terminus/install#installation-and-update-methods) installed.

</Alert>

Once enabled, install and activate the [ElasticPress](https://wordpress.org/plugins/elasticpress/) plugin in your WordPress admin and run your initial content sync. No manual credential configuration is required — `EP_HOST`, `EP_INDEX_PREFIX`, and `EP_CREDENTIALS` are set automatically across all environments.

## Documentation

For setup instructions and additional guidance, see [Elasticsearch on Pantheon](/guides/pantheon-search/elasticsearch).
