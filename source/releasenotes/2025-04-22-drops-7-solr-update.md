---
title: Pantheon Apache Solr module (7.x-1.1) upgraded in the Drupal 7 upstream
published_date: "2025-04-22"
categories: [drupal, infrastructure, action-required]
---

A release has been published for the Drupal 7 [platform upstream](https://github.com/pantheon-systems/drops-7) which includes an update to the Pantheon Apache Solr module, to version 7.x-1.1. 

This update adjusts the cURL connection between the application and Pantheon's solr servers. This change is required as part of upcoming platform security improvments that will affect the applications' ability to access the Solr server. 

**Action Required**: Customers using Solr with Drupal 7 sites are encouraged to update their sites to the latest version of the upstream as soon as possible. Customers with custom upstreams will need to update their upstreams to [include the last changes in the platform upstream](#link-to-commit-when-published-to-master).

After $DATE TBD, Pantheon will begin upgrading all Drupal 7 sites. Sites running `pantheon_apachesolr` version 7.x-1.0 and below will no longer work with Pantheon's solr servers.