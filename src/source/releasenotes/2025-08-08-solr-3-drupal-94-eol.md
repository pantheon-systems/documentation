---
title: "Solr 3 support for Drupal 9.4+ sites ending December 9, 2025"
published_date: "2025-08-08"
categories: [infrastructure, action-required, drupal, security]
---

_**Editorial note: The date has been moved from November 12 to December 9.**_

Sites running Drupal 9.4+ will no longer be able to access Solr 3 via [Pantheon Search services](/solr) starting December 9, 2025. 

After this date, affected sites will not be able to fetch Solr search results or index new content using Solr 3. Views or blocks that rely on Solr-powered Search API indexes may fail to load, return no results, or throw errors.

To find out which version of Solr your site is running, go to your site in the Pantheon Dashboard > Status. Look for the Solr value in the Software Versions block. 

This follows our recent announcement of [Pantheon Search no longer being available for Drupal 8-9.3](/release-notes/2025/07/drupal-8-93-solr-eol).

## Action Required

Affected Drupal sites will need to upgrade to Solr 8 and [search\_api\_pantheon](https://www.drupal.org/project/search_api_pantheon) 8.2+. A [Solr upgrade guide](/guides/solr-drupal/solr-drupal) is available in our documentation.

Alternatively, Pantheon Search can be disabled, and site owners may choose to implement Drupal’s built-in database search or a third-party search service provider.
