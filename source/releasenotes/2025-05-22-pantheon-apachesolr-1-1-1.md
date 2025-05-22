---
title: Local bug fix update for Pantheon Apache Solr (7.x-1.1.1) in the Drupal 7 upstream
published_date: "2025-05-22"
categories: [drupal]
---

A followup update to [last week's release](/release-notes/2025/05/drops-7-solr-update) for the Drupal 7 `pantheon_apachesolr` module is now available for the Drupal 7 upstream.

This update resolves a regression with local development in version 1.1 of `pantheon_apachesolr`.

As a reminder, customers using Solr with Drupal 7 sites should update their sites to the latest version of the upstream as soon as possible. Customers with custom upstreams will need to update their upstreams to [include the last changes in the platform upstream](https://github.com/pantheon-systems/drops-7/compare/7.103.3...7.103.5).

Starting June 17, 2025, Pantheon will require the updated Pantheon Apache Solr module (provided in the Pantheon Drupal 7 upstream) for Drupal 7 sites to access Solr services. Sites running on older versions of the Drupal 7 upstream (with `pantheon_apachesolr` version 7.x-1.0 or below) will no longer be able to access Pantheon's Solr services.