---
title: "Solr 9 support for Drupal 7 now available in Beta"
published_date: "2026-05-05"
categories: [new-feature, drupal]
---

Pantheon Search now supports [Apache Solr 9.10.0](https://solr.apache.org/docs/9_10_0/) as a Beta for Drupal 7 sites. This extends the Solr 9 Beta support [previously announced for Drupal 10 and 11](/release-notes/2026/04/search-api-pantheon-solr-9-beta).

Solr 9 on Drupal 7 requires updates to three components:

1. **Pantheon Apache Solr module** with Solr 9 support. Merge the drops-7 Solr 9 branch into your site:

   ```bash
   git remote add drops-7 git@github.com:pantheon-systems/drops-7.git
   git fetch drops-7
   git merge drops-7/SITE-5456-solr9
   ```
2. **Search module** with Solr 9 schema configs from [Tag1 D7ES](https://d7es.tag1.com/):
   - [Apache Solr Search](https://gitlab.com/tag1consulting/public/apachesolr/-/releases) version **7.x-1.15**, or
   - [Search API Solr](https://gitlab.com/tag1consulting/public/search_api_solr/-/releases) version **7.x-1.19**
3. **`pantheon.yml`** with `search: version: 9`

During the Beta period, test Solr 9 on a [Multidev](/guides/multidev) environment only. Do not deploy Solr 9 changes to Dev, Test, or Live until the Beta is finalized.

For setup instructions, upgrading from Solr 3, and custom config details, see [Using Solr on Drupal 7](/guides/pantheon-search/solr-drupal/solr-drupal-7#solr-9-for-drupal-7-beta).

## What about Solr 3?

Solr 3 remains supported for Drupal 7 sites. Existing Solr 3 sites are not affected by this Beta.

[Solr 3 is no longer supported for **Drupal 9.4+**](https://docs.pantheon.io/release-notes/2025/08/solr-3-drupal-94-eol) as of December 9, 2025. Those sites must use Solr 8 or above.
