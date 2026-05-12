---
title: "Solr 3 and Solr 8 removal schedule announced"
published_date: "2026-05-12"
categories: [infrastructure, security, action-required]
description: "Today Pantheon announces a removal schedule for Solr 3 on February 9, 2027 and Solr 8 on July 11, 2027. Solr 9 will reach General Availability on June 30, 2026 ahead of these removals."
---

Today Pantheon announces a removal schedule for Solr 3 on **February 9, 2027** and Solr 8 on **July 11, 2027**. Solr 9 will reach General Availability on **June 30, 2026** ahead of these removals. 

After a Solr version is removed from the platform, sites using that version will no longer be able to index content or return search results. Views, blocks, or other components that rely on Solr-powered search indexes may return no results or throw errors.

## Solr 9 - General Availability: June 30, 2026

Solr 9 has been [available as a Beta](/release-notes/2026/04/search-api-pantheon-solr-9-beta) for Drupal 10 and 11 sites through `search_api_pantheon` version 8.5.0-beta1. Solr 9 Beta for Drupal 7 is now available as of **May 12, 2026**. 

General Availability for Solr 9 is targeted for **June 30, 2026**.

## Solr 3 - Removal: February 9, 2027

Solr 3 will be removed from the Pantheon platform on **February 9, 2027**. Solr 3 is a legacy search version that no longer receives security updates.

Previous milestones:

* [Solr 3 support for Drupal 9.4+ ended December 9, 2025](/release-notes/2025/08/solr-3-drupal-94-eol)
* [WordPress Solr support ends January 11, 2027](/release-notes/2026/04/solr-3-end-of-life)

Drupal 7 sites still using Solr 3 must migrate to Solr 9 before this date. See the [Solr for Drupal 7 guide](/guides/pantheon-search/solr-drupal/solr-drupal-7) for upgrade steps. WordPress sites should migrate to [Elasticsearch or another supported search solution](/release-notes/2026/04/solr-3-end-of-life) before January 11, 2027.

## Solr 8 - Removal: July 11, 2027

Solr 8 (8.11.4) will be removed from the platform on **July 11, 2027**. Solr 9 supersedes Solr 8 with improved security defaults and other enhancements. Drupal 10 and 11 sites currently running Solr 8 should migrate to Solr 9 before this date. Upgrade instructions are available in the [Solr 9 Beta announcement](/release-notes/2026/04/search-api-pantheon-solr-9-beta).

## Action required
* Drupal: 
  * **Solr 3 sites**: Migrate to Solr 9 before **February 9, 2027**.
  * **Solr 8 sites**: Migrate to Solr 9 before **July 11, 2027**.

   For guidance on upgrading, see [Drupal Solr](/guides/pantheon-search/solr-drupal).
* WordPress:
  * Migrate to [Elasticsearch](/guides/pantheon-search/elasticsearch) before **February 9, 2027**.
    
