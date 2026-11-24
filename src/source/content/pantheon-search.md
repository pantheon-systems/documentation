---
title: Pantheon Search
subtitle: Search Services on Pantheon
description: Overview of search services available on Pantheon, including Elasticsearch and Solr.
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
permalink: docs/pantheon-search
reviewed: "2026-11-24"
---

## Overview

Pantheon offers integrated search services to improve site performance and deliver better search experiences for your visitors. Rather than relying on your database to handle every query, Pantheon's search services offload that work to dedicated search infrastructure — reducing database load and speeding up response times across your site.

<Alert type="warning" title="WordPress sites: move from Solr to Elasticsearch">

Pantheon will remove Solr support for WordPress on **January 11, 2027**. Solr 9 will not be available for WordPress. Migrate to [Elasticsearch powered by ElasticPress.io](/guides/pantheon-search/elasticsearch) before that date. Drupal sites should move to Solr 9. See the [Solr removal dates](/pantheon-search/solr).

</Alert>

Two search technologies are available on Pantheon:

<Partial file="pantheon-search-table.md" />


## More Resources

- [Pantheon Search powered by Elasticsearch and ElasticPress](/docs/guides/pantheon-search/elasticsearch)
- [Pantheon Search powered by Solr for Drupal and WordPress](/docs/pantheon-search/solr)