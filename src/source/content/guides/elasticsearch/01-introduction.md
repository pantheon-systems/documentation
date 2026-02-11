---
title: Pantheon Search
subtitle: Pantheon Search powered by Elasticsearch
navtitle: Introduction
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
permalink: docs/guides/pantheon-search/elasticsearch
editpath: search/01-introduction.md
contributors: [jazzsequence]
---

Elasticsearch on Pantheon gives WordPress teams a fully managed search service that goes beyond basic site search — offloading database queries, handling traffic spikes, and delivering features like fuzzy matching and autosuggest without the overhead of managing an external provider.

<Partial file="elasticsarch-pre-ga.md" />

## Overview

Pantheon provides integrated Elasticsearch support for WordPress sites through the [ElasticPress](https://wordpress.org/plugins/elasticpress/) plugin. Elasticsearch is a powerful search and query engine that offloads demanding `WP_Query` requests from your database, delivering faster search results, superior search features, and improved overall site performance for your visitors.

By bringing Elasticsearch directly onto the Pantheon platform, you get a fully managed search service without the operational burden of maintaining an external search provider. 

### Which Plans Can Use Elasticsearch?

Elasticsearch is available for WordPress sites on **Performance** and **Elite** site plans. Every environment on your site (Dev, Test, Live, and Multidevs) receives its own Elasticsearch endpoint. Elasticsearch is not available on Sandbox sites.

### Elasticsearch and Solr

Pantheon also offers [Solr-based search](/solr). You can have both Solr and Elasticsearch activated on a site at the same time, which is useful during migration. However, running both simultaneously in production is not recommended. For new search implementations, Elasticsearch with ElasticPress is the recommended path.
