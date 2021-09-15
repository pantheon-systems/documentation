---
title: Apache Solr for Drupal
subtitle: Using Solr 8 on Drupal 9
description: Detailed information on using Pantheon Search with Solr 8 on Drupal 9
cms: "Drupal 9"
categories: [integrate]
tags: [solr, search, modules]
contributors: [carolynshannon]
reviewed: "2021-08-10"
layout: guide
showtoc: true
permalink: docs/guides/solr-drupal/solr-drupal-9
anchorid: solr-drupal
editpath: solr-drupal/02-solr-drupal-9.md
---

Pantheon Search with Solr 8 gives Drupal 9 web teams a high-performance search index integrated with [Integrated Composer's](/integrated-composer) easy one-click updates. 

<Partial file="pantheon-search-status.md" />

## Drupal 9 Site Setup

Pantheon Search for Drupal 9 starts with an existing Pantheon Drupal 9 site. See our [Drupal 9](/drupal-9) doc or [Drupal 9 upgrade and migration](/guides/drupal-9-migration) guide to get your Drupal 9 site set up.

## Solr 8 Features

Pantheon Search with Solr 8 includes multiple built-in features to make scalable, high-performance search more customizable, including the following features:

- media/rich content type indexing such as PDFs, Word documents 
  - Solr has the ability to store information about document relationships in the index. The stored information can be used for queries and can also return child pages in nested form if the relationship is properly stored in the index.
- multiple language support
  - Use Solr’s stemming and language identification libraries that allows for the searching of multiple languages using separate fields, the same field (separate Solr cores), or the same field and Solr core.
- Drupal Views integration for building search results pages and custom search forms

For more information on Solr 8 features, refer to the [Search API Solr](https://www.drupal.org/project/search_api_solr) documentation.


## Custom Processors

Search API module processors provide a variety of configuration options for your Pantheon Search results, like boosting results based on dates, taxonomy terms, or specific content types, controlling access to content based on permissions, and adding highlighted excerpts to results. 

See the [Search API module processors documentation](https://www.drupal.org/docs/8/modules/search-api/getting-started/processors) for details.
