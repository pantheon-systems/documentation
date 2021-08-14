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

## The [Search API Pantheon](https://www.drupal.org/project/search_api_pantheon) Module

The Search API Pantheon module (for Drupal 8 and 9) simplifies the usage of [Search API](https://www.drupal.org/project/search_api) and [Search API Solr](https://www.drupal.org/project/search_api_solr) on Pantheon. Search API Solr provides the ability to connect to any Solr server by providing numerous configuration options. 

This module automatically sets the Solr connection options by extending the plugin from Search API Solr. The module also changes the connection information between Pantheon environments, eliminating the need to do extra work setting up Solr servers for each environment.

For Pantheon Search support for Drupal 7 sites, see the [Pantheon Search for Drupal 7](/guides/solr-drupal/solr-drupal-7) guide.

## Using Pantheon Search on Sites With Multizone Failover

Pantheon Search requires additional considerations when used on sites with Multizone Failover. See our [Multizone Failover](/multizone-failover) documentation for configuration details.