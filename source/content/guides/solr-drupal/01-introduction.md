---
title: Pantheon Solr Search for Drupal
subtitle: Introduction
description: Using Pantheon Solr Search with Drupal
cms: "Drupal 9"
categories: [integrate]
tags: [solr, search, modules]
contributors: [carolynshannon]
reviewed: "2021-08-05"
layout: guide
showtoc: true
permalink: docs/guides/solr-drupal
anchorid: solr-drupal
editpath: solr-drupal/01-introduction.md
---

## Overview

Pantheon Search for Drupal extends Drupal's Search API Solr functionality, providing enterprise Apache Solr search from Pantheon's cloud infrastructure.

## The Search API Pantheon Module

The Search API Pantheon module (for Drupal 8 and 9) simplifies the usage of [Search API](https://www.drupal.org/project/search_api) and [Search API Solr](https://www.drupal.org/project/search_api_solr) on Pantheon. Pantheon Search derives from Apache Solr and can perform full-text content searching in a single language. With Pantheon Search, you can optimize searches and return results based on dates, taxonomy terms, specific content types, as well as control access to content based on permissions, and add highlighted excerpts to results. 

Each Pantheon environment (Dev, Test, Live, and Multidevs) has its own Solr server. Search API Solr provides the ability to connect to any Solr server by providing numerous configuration options. Indexing and searching in one environment does not impact any other environment.

This module automatically sets the Solr connection options by extending the plugin from Search API Solr. The module also changes the connection information between Pantheon environments, eliminating the need to do extra work setting up Solr servers for each environment.

This module is available for Drupal 8 and 9 sites on Pantheon. To learn more about Pantheon Search support for Drupal 7 sites, refer to the [Pantheon Search for Drupal 7](/guides/solr-drupal/solr-drupal-7) guide.

## Using Pantheon Search on Sites With Multizone Failover

Pantheon Search requires additional considerations when used on sites with Multizone Failover. Refer to our [Multizone Failover](/multizone-failover) documentation for configuration details.
