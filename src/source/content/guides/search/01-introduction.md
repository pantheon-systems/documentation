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
permalink: docs/guides/search
editpath: search/01-introduction.md
reviewed: "2026-02-10"
---

## Overview

Pantheon offers integrated search services to improve site performance and deliver better search experiences for your visitors. Rather than relying on your database to handle every query, Pantheon's search services offload that work to dedicated search infrastructure — reducing database load and speeding up response times across your site.

Two search technologies are available on Pantheon:

| Feature | Elasticsearch (via ElasticPress) | Apache Solr |
|---------|----------------------------------|-------------|
| **CMS Support** | WordPress | WordPress, Drupal |
| **Plan Availability** | Performance, Elite (not Sandbox) | Sandbox (dev only), Performance, Elite |
| **Plugin** | [ElasticPress](https://wordpress.org/plugins/elasticpress/) | [Solr Power](https://wordpress.org/plugins/solr-power/) (WP), [Search API Solr](https://www.drupal.org/project/search_api_solr) (Drupal) |
| **Fuzzy Search** | Yes | Limited |
| **Autosuggest** | Yes | No |
| **Faceted Search** | Yes | Yes |
| **WooCommerce Support** | Yes | No |
| **WP_Query Offloading** | Yes | No |
| **Status** | Beta (GA targeted Q2 2026) | Generally Available |


## More Resources

- [Pantheon Search powered by Elasticsearch and ElasticPress](/docs/guides/search/elasticsearch)
- [Pantheon Search powered by Solr for Drupal and WordPress](/docs/solr)
