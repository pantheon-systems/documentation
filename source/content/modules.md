---
title: Pantheon Modules
description: Details on specific Drupal modules developed and maintained for the Pantheon Website Management Platform workflow.
contributors: [eabquina]
cms: "Drupal"
categories: [platform]
tags: [cache, libraries, modules, site]
reviewdate: "2022-04-01"
---
Pantheon maintains several modules to extend and integrate Drupal on our platform. Check out our [Pantheon Community](/pantheon-community) Slack channel to discuss these modules in real-time with Pantheon developers.

<Alert title="Note" type="info">

WordPress users should review [Pantheon Plugins](/guides/wordpress-pantheon/plugins) for details on WordPress plugins developed and maintained for the Pantheon workflow.

</Alert>

## [Advanced Page Cache](https://www.drupal.org/project/pantheon_advanced_page_cache)

The Advanced Page Cache module attaches [Drupal's cache metadata](https://www.drupal.org/docs/8/api/cache-api/cache-api) to a response so that Pantheon's [Global CDN](/guides/global-cdn) edge service can granularly clear new content as it is saved. The Global CDN can detect when underlying data changes, such as nodes and taxonomy terms, then clear pages containing that entity. For details, see [this blog post](https://pantheon.io/blog/pantheon-advanced-page-cache-drupal-cache-metadata-global-cdn).

## Edge Personalization

The [Edge Integrations Drupal module](/guides/edge-integrations/drupal-sdk/) is a Software Development Kit (SDK) that allows users to personalize Drupal. This module uses configuration at the "edge" or the CDN to enable personalization options for Geolocation or Interests. This is done by using HTTP vary headers that tell the CDN to return cached variations of content based on values identified by the user browsing the site.

## [Generate Errors (Drupal 7)](https://www.drupal.org/project/generate_errors)

Interface which allows you to generate various errors to test system behaviors like custom errors and server responses.

## [Login](https://github.com/pantheon-systems/drops-7/tree/master/modules/pantheon/pantheon_login)

Provides login integration between Drupal and the Pantheon Site Dashboard.

## [Search API Pantheon (Drupal)](https://www.drupal.org/project/search_api_pantheon)

This module is meant to simplify the usage of [Search API](https://www.drupal.org/project/search_api) and [Search API Solr](https://www.drupal.org/project/search_api_solr) on Pantheon. Search API Solr provides the ability to connect to any Solr server by providing numerous configuration options. This module automatically sets the Solr connection options by extending the plugin from Search API Solr. The module also changes the connection information between Pantheon environments, eliminating the need to do extra work setting up Solr servers for each environment.

### [Apache Solr](https://github.com/pantheon-systems/drops-7/tree/master/modules/pantheon/pantheon_apachesolr)

This module facilitates and debugs communication between Drupal and Pantheon's Apache Solr service, indexing and searching site content. For more details, visit [Pantheon Search](/solr).

## [Site Audit](https://www.drupal.org/project/site_audit)
Static site analysis is a service for Drupal sites that makes best practice recommendations on site configurations. These reports are found in the Site Dashboard under the Status tab and are accessible by site team members. For more details, visit [Launch Check - Drupal Performance and Configuration Analysis](/drupal-launch-check).

## [Pantheon Module (Drupal 7)](https://github.com/pantheon-systems/drops-7/tree/master/modules/pantheon)

This module provides general methods your site needs to access aspects of the internal Pantheon API. This is necessary for clearing caches from our reverse-proxy/edge cache, as well as provisioning new Solr cores and other features. It should always be enabled for all sites on Pantheon and should not cause adverse effects if you export the site locally or to another environment.

The code for the API module is available within our upstream repositories, in the `modules/pantheon` directory. The functionality of this module is provided in three parts: Apache Solr, Pantheon Platform API, and Login.

## [Pantheon Platform API (Drupal 7)](https://github.com/pantheon-systems/drops-7/blob/master/modules/pantheon/pantheon_api/pantheon_api.info) (Drupal 7)

This module provides general methods your site needs to access aspects of the internal Pantheon API. This is necessary for clearing caches and other common workflows on the platform in Drupal 7.

The API module is not needed for Drupal 9.

<Alert title="Note" type="info">

It is not necessary to use the API module directly. Use [Terminus](/terminus) to interact with your Pantheon site programmatically.

</Alert>
