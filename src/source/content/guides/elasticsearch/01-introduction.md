---
title: Pantheon Search
subtitle: Pantheon Search powered by Elasticsearch
navtitle: Introduction
description: Detailed information on using Elasticsearch offered through ElasticPress.io with your Pantheon WordPress site.
tags: [elasticsearch,search]
reviewed: "2026-11-24"
contenttype: [doc]
innav: [true]
categories: [search]
cms: [wordpress]
audience: [agency, development]
product: [search]
integration: [--]
permalink: docs/guides/pantheon-search/elasticsearch
editpath: search/01-introduction.md
contributors: [jazzsequence]
showtoc: true
---

Elasticsearch powered by ElasticPress.io on Pantheon gives WordPress teams a fully managed search service that goes beyond basic site search — offloading database queries, handling traffic spikes, and delivering features like fuzzy matching and autosuggest without the overhead of managing an external provider.

<Youtube src="SKu-NY5lQ50" title="Getting Started with Elasticsearch on Pantheon" />

## Overview

Pantheon offers Elasticsearch for WordPress sites, powered by [ElasticPress.io](https://www.elasticpress.io/), a hosted search service. The [ElasticPress](https://wordpress.org/plugins/elasticpress/) plugin links your site to the service. The service moves demanding `WP_Query` requests off your database, so visitors get faster results and better search features.

Three parts work together:

- **ElasticPress.io** hosts and manages Elasticsearch for you. You do not run it or access it directly.
- **The ElasticPress plugin** connects WordPress to the service.
- **Pantheon** activates the service and gives every environment its own endpoint.

Pantheon does not offer an Elasticsearch Enterprise tier. To use Enterprise-only Elasticsearch features, bring your own self-hosted Elasticsearch cluster, which requires extra configuration.

### Which Plans Can Use Elasticsearch Powered by ElasticPress.io?

Elasticsearch powered by ElasticPress.io is available for WordPress sites on **Performance** and **Elite** site plans. Every environment on your site (Dev, Test, Live, and Multidevs) receives its own Elasticsearch endpoint. Elasticsearch is not available on Sandbox sites.

### Elasticsearch and Solr

Pantheon also offers [Solr-based search](/solr). You can have both Solr and Elasticsearch activated on a site at the same time, which is useful during migration. However, running both simultaneously in production is not recommended. For new search implementations, Elasticsearch powered by ElasticPress.io is the recommended path.

<Alert type="warning" title="Solr support for WordPress ends January 11, 2027">

Pantheon will remove Solr support for WordPress on **January 11, 2027**. This includes the Solr Power plugin. Solr 9 will not be available for WordPress.

After that date, WordPress sites that use Solr lose search. Migrate to Elasticsearch powered by ElasticPress.io before then. See the [end-of-life announcement](/release-notes/2026/04/solr-3-end-of-life).

</Alert>

<Partial file="pantheon-search-table.md" />

## Support

For support with Elasticsearch on Pantheon, contact Pantheon Support through the Dashboard. Include details about your site, the environment you're working in, and the specific issue you're encountering.

For ElasticPress plugin-specific questions, refer to the [ElasticPress documentation](https://www.elasticpress.io/resources/articles/).
