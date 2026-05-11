---
title: "Solr 9 support for Drupal 7 now available in Beta"
published_date: "2026-05-12"
categories: [new-feature, drupal]
---

Pantheon Search with [Apache Solr 9.10.0](https://solr.apache.org/docs/9_10_0/) support for Drupal 7 is available as a beta release for testing on [Multidev](/guides/multidev) environments. Do not deploy Solr 9 changes to Dev, Test, or Live. At GA, the updated module will be available as a one-click upstream update.

This extends the Solr 9 beta support [previously announced for Drupal 10 and 11](/release-notes/2026/04/search-api-pantheon-solr-9-beta).

For setup instructions, required module versions, upgrading from Solr 3, and custom config details, see [Using Solr on Drupal 7](/guides/pantheon-search/solr-drupal/solr-drupal-7#solr-9-for-drupal-7-beta).

## What about Solr 3?

Solr 3 remains supported for Drupal 7 sites during the Beta period. [Solr 3 will be removed on **February 9, 2027**](/release-notes/2026/05/solr-9-ga-solr-3-8-removal-dates). Sites using Solr 3 should plan to upgrade to Solr 9.

[Solr 3 is no longer supported for **Drupal 9.4+**](https://docs.pantheon.io/release-notes/2025/08/solr-3-drupal-94-eol) as of December 9, 2025. Those sites must use Solr 8 or above.
