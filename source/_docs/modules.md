---
title: Pantheon Modules
description: Details on specific Drupal modules developed and maintained plugins for the Pantheon Website Management Platform workflow.
tags: [siteintegrations, infrastructure, cacheedge]
categories: [modules, drupal]
---

Pantheon supplies a few modules with all sites to provide better integration with the platform. 
These are listed as it was sponsored, built by one of our members, or started the initial development of the module. 
We also list down the namespace, versions and links on where to get them in Drupal.org.


## Pantheon API

(D6, D7) [pantheon_api](https://github.com/pantheon-systems/drops-6/tree/master/modules/pantheon/pantheon_api)

Learn how to incorporate pantheon_api.module, Pantheon's internal API modules, on your Drupal sites.

This module is extremely lightweight and efficient. It provides general methods your site needs to access aspects of the internal Pantheon API. This is necessary for clearing caches from our reverse-proxy/edge cache, as well as provisioning new Solr cores and other features.
It should always be enabled for all sites on Pantheon and should not cause adverse effects if you export the site locally or to another environment.

The code for the API module is available within our upstream repositories, in the `modules/pantheon` directory:

- [Drupal 6](https://github.com/pantheon-systems/drops-6/tree/master/modules/pantheon)
- [Drupal 7](https://github.com/pantheon-systems/drops-7/tree/master/modules/pantheon)

Currently, there is no API module available for Drupal 8.


## Login 

(D6, D7) [pantheon_login](https://github.com/pantheon-systems/drops-7/tree/master/modules/pantheon/pantheon_login)

Login integration for your site and the Pantheon control panel


## Advanced Page Cache

(D7, D8) [pantheon_advanced_page_cache](https://www.drupal.org/project/pantheon_advanced_page_cache)

Pantheon Advanced Page Cache module is a bridge between Drupal cache metadata and the Pantheon Global CDN.

Just by turning on this module your Drupal site will start emitting the HTTP headers necessary to make the Pantheon Global CDN aware of data underlying the response. Then, when the underlying data changes (nodes and taxonomy terms are updated, user permissions changed) this module will clear only the relevant pages from the edge cache.


## Apache Solr Pantheon

(D7) [pantheon_apachesolr](https://github.com/pantheon-systems/drops-7/tree/master/modules/pantheon/pantheon_apachesolr)

Apache Solr is a system for indexing and searching site content. First, you will need to add the Index Server to your site. From your Dashboard, go to Settings > Add Ons > Apache Solr Index Server: Add.

This will provision Apache Solr containers for every environment for your site. You are now ready to begin integrating with Drupal.

For instructions on how to run Solr on Drupal 7, see [Enabling Solr on Drupal 8.](https://pantheon.io/docs/solr-drupal-7/)


## Search API Pantheon

(D8) [search_api_pantheon](https://www.drupal.org/project/search_api_pantheon)

This module is meant to simplify the usage of Search API and Search API Solr on Pantheon. Search API Solr provides the ability to connect to any Solr server by providing numerous configuration options.

For instructions on how to run Solr on Drupal 8, see [Enabling Solr on Drupal 8.](https://pantheon.io/docs/solr-drupal-8/)


## Drupal 8 Cache Backport 

(D7) [d8cache](https://www.drupal.org/project/d8cache)

Drupal 8 Cache Backport is a module that brings Drupal 8 cache tags and cache max-age back to Drupal 7 (If there is interest, cache contexts will follow).


## LCache

(D8) [lcache](https://www.drupal.org/project/lcache)

LCache is a module that applies the tiered caching model of multi-core processors (with local L1 and central L2 caches) to web applications. This allows scaling cache read access independently of network throughput. The current production implementation uses APCu as L1 and the database as L2.


## Generate Errors 

(D7) [generate_errors](https://www.drupal.org/project/generate_errors)


## Site Audit

(D7, D8) [site_audit](https://www.drupal.org/project/site_audit)

Site Audit is a Drupal static site analysis platform that generates reports with actionable best practice recommendations.


## Panopoly

(D7, D8) [panopoly](https://www.drupal.org/project/panopoly)

Panopoly is powerful base distribution of Drupal powered by lots of Chaos Tools and Panels magic. 

The distribution is designed to be both a general foundation for site building and a base framework upon which to build other Drupal distributions.


## 

Please feel free to contact us if you have any concerns with this module.


## See Also:

[Unsupported Modules](https://pantheon.io/docs/unsupported-modules-plugins/#drupal-modules)
