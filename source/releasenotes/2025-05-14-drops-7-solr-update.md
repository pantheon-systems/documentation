---
title: Required update for Pantheon Apache Solr (7.x-1.1) in the Drupal 7 upstream
published_date: "2025-05-14"
categories: [drupal, infrastructure, action-required]
---

A critical release has been published for the Drupal 7 [platform upstream](https://github.com/pantheon-systems/drops-7) which updates the Pantheon Apache Solr module to version 7.x-1.1. 

This update adjusts the connection between the Drupal 7 and Pantheon's Solr service. This change is required as part of platform security improvements that will affect a site's ability to access the Solr service. 

**Action Required**: Customers using Solr with Drupal 7 sites should update their sites to the latest version of the upstream as soon as possible. Customers with custom upstreams will need to update their upstreams to [include the last changes in the platform upstream](#link-to-commit-when-published-to-master).

Starting June 17, 2025, Pantheon will begin requiring the updated Pantheon Apache Solr module for Drupal 7 sites to access Solr services. Sites running `pantheon_apachesolr` version 7.x-1.0 and below will no longer be able to access Pantheon's Solr services.