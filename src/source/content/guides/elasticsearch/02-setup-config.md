---
title: Pantheon Search
subtitle: Setup and Configure ElasticPress
description: Instructions for setting up and configuring the ElasticPress plugin on your Pantheon WordPress site.
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
permalink: docs/guides/pantheon-search/elasticsearch/setup-config
editpath: search/02-setup-config.md
reviewed: "2026-02-10"
---

<Partial file="elasticsarch-pre-ga.md" />

Getting Elasticsearch running on your Pantheon WordPress site involves activating the service on the platform and then installing and configuring the ElasticPress plugin within WordPress.

### Prerequisites

Before you begin, confirm the following:

- Your site is on a **Performance** or **Elite** plan.
- You are running a **WordPress** site. Elasticsearch is not available for Drupal sites at this time.
- You have administrator access to both the Pantheon Dashboard and your WordPress admin.

### Step 1: Activate Elasticsearch on Pantheon

<!-- This information is not true yet but will be in the future>
You can activate Elasticsearch through the Pantheon Dashboard or via Terminus.

**Via the Dashboard:**

1. Navigate to your site's Dashboard.
2. Go to the **Add Ons** page.
3. Locate **Elasticsearch** and click **Activate**.

Elasticsearch will be provisioned for all environments on your site. Each environment receives its own dedicated endpoint.

**Via Terminus:**

```bash
terminus site:addon:enable <site>.<env> elasticsearch
```
<-->

### Step 2: Install the ElasticPress Plugin

Install the [ElasticPress](https://wordpress.org/plugins/elasticpress/) plugin from the WordPress.org plugin repository. You can install it from your WordPress admin dashboard or via WP-CLI:

```bash
terminus wp <site>.<env> -- plugin install elasticpress --activate
```

### Step 3: Configure ElasticPress Constants (Beta Only)

> **Note:** During the Beta phase, you need to manually define three ElasticPress constants in your `wp-config.php` based on Pantheon-provided environment variables. At GA, the Pantheon MU Plugin will handle this configuration automatically.

Add the following to your site's `wp-config.php` file. Be sure to check if the constants are already defined before setting them, in case the MU Plugin has already set them:

```php
// ElasticPress Configuration (Beta)
if ( ! defined( 'EP_HOST' ) ) {
    define( 'EP_HOST', $_ENV['PANTHEON_ELASTICSEARCH_HOST'] ?? '' );
}
```

Refer to the [ElasticPress documentation on using EP constants](https://www.elasticpress.io/resources/articles/using-ep-constants-in-wp-config-php/) for additional configuration options.

### Step 4: Activate ElasticPress in WordPress

1. In your WordPress admin, navigate to **ElasticPress > Settings**.
2. Verify that the host connection is established. If you configured constants correctly, the host field should be pre-populated.
3. Run your first **index sync** from the ElasticPress dashboard. This sends your WordPress content to Elasticsearch so it can be searched.

### Step 5: Enable ElasticPress Features

ElasticPress offers several features you can enable based on your needs:

- **Search**: Enhanced search with fuzzy matching, so visitors find results even with typos.
- **Autosuggest**: Suggest search queries as visitors type in the search box, including handling misspellings.
- **Facets**: Add filtering by categories, tags, custom taxonomies, and other attributes.
- **Related Posts**: Display relevant content suggestions based on post context.
- **WooCommerce**: Improved product search and filtering for WooCommerce stores.
- **Synonyms**: Define custom synonym sets so site managers can control search relevance.
- **Weighting**: Adjust result relevance based on post type or field priority.

Navigate to **ElasticPress > Features** in your WordPress admin to enable and configure each feature.