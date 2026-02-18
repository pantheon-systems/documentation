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

<Alert type="info" title="Note">

During the Alpha phase, self-service activation of the Elasticsearch add-on is not yet available. If you are interested in testing Elasticsearch on your site during the Alpha phase, please get in touch via the [Elasticsearch Alpha access form](https://forms.gle/q5qWS17L9VsH2fkg6). Once you receive a confirmation from the Pantheon team, you can install and activate the ElasticPress plugin on your site to connect to the Elasticsearch service.

</Alert>

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

### Step 3: Configure ElasticPress Constants (Pre-GA Only)

<Alert type="info" title="Note">

During the Alpha and Beta phases, you need to manually define three ElasticPress constants in your `wp-config.php` based on Pantheon-provided environment variables. At GA, the Pantheon MU Plugin will handle this configuration automatically.

</Alert>

Add the following to your site's `wp-config.php` file (or `config/application.php` for [WordPress (Composer Managed)](https://github.com/pantheon-systems/wordpress-composer-managed)). Be sure to check if the constants are already defined before setting them, in case the MU Plugin has already set them:

<TabList>

<Tab title="WordPress (standard)" id="wordpress" active={true}>

```php:title=wp-config.php
// ElasticPress Configuration (Beta)
defined( 'EP_INDEX_PREFIX' ) || define( 'EP_INDEX_PREFIX', $_ENV['PANTHEON_ELASTICSEARCH_INDEX_PREFIX'] ?? '' );
defined( 'EP_HOST' ) || define( 'EP_HOST', $_ENV['PANTHEON_ELASTICSEARCH_HOST'] ?? '' );
defined( 'EP_CREDENTIALS' ) || define( 'EP_CREDENTIALS', $_ENV['PANTHEON_ELASTICSEARCH_CREDENTIALS'] ?? '' );
```
    
</Tab>

<Tab title="WordPress (Composer Managed)" id="wordpress-composer">

```php:title=config/application.php
// ElasticPress Configuration (Beta)
defined( 'EP_INDEX_PREFIX' ) || Config::define( 'EP_INDEX_PREFIX', $_ENV['PANTHEON_ELASTICSEARCH_INDEX_PREFIX'] ?? '' );
defined( 'EP_HOST' ) || Config::define( 'EP_HOST', $_ENV['PANTHEON_ELASTICSEARCH_HOST'] ?? '' );
defined( 'EP_CREDENTIALS' ) || Config::define( 'EP_CREDENTIALS', $_ENV['PANTHEON_ELASTICSEARCH_CREDENTIALS'] ?? '' );
```

</Tab>

</TabList>

Refer to the [ElasticPress documentation on using EP constants](https://www.elasticpress.io/resources/articles/using-ep-constants-in-wp-config-php/) for additional configuration options.

### Step 4: Activate ElasticPress in WordPress

1. In your WordPress admin, navigate to **ElasticPress > Settings**.
2. Verify that the host connection is established. If the constants are configured correctly, the ElasticPress.io Host URL, Subscription ID and Subscription Token fields should be pre-populated.
3. Run your first **index sync** from the ElasticPress dashboard. This sends your WordPress content to Elasticsearch so it can be searched.

### Step 5: Enable ElasticPress Features

ElasticPress offers several features you can enable based on your needs:

- **Search**: Enhanced search with fuzzy matching, so visitors find results even with typos.
- **Instant Results**: A search experience that bypasses WordPress and routes queries through a dedicated API, delivering results significantly faster than standard WordPress search.
- **Autosuggest**: Displays real-time search suggestions in a dropdown as visitors type in the search field.
- **Filters**: Adds controls to the Instant Results page to filter content by one or more taxonomies such as categories, tags, and custom taxonomies. Provides blocks for filtering by taxonomy, post type, date, and metadata.
- **Related Posts**: Delivers relevant content recommendations based on post context, with no impact on site performance.
- **WooCommerce**: Improved product search and filtering for WooCommerce stores.
- **Documents**: Indexes text inside popular file types (PDFs, Word documents, and more) and includes them in search results.

Additionally, the [ElasticPress](https://www.elasticpress.io/) service provides admin-level capabilities including **Synonyms** (connecting different terms to the same content), **Weighted Results** (prioritizing specific fields like titles or categories), and **Custom Results** (shaping rankings for specific queries) — these are managed through the ElasticPress settings rather than the Features screen.

Navigate to **ElasticPress > Features** in your WordPress admin to enable and configure each feature.