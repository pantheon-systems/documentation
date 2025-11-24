---
title: "Pantheon Search no longer available for Drupal 8.0-9.3 sites starting December 2, 2025"
published_date: "2025-07-21"
categories: [infrastructure, action-required, drupal, security]

*Editorial Note: The date has been moved from October 21 to December 2.*

---

As part of our ongoing platform maintenance and security improvements, sites on the platform running Drupal 8.0-9.3 will no longer be able to access [Pantheon Search services](/solr) (Apache Solr-based search) starting December 2, 2025. 

After this date, affected sites will not be able to fetch Solr search results or index new content. Views or blocks that rely on Solr-powered Search API indexes may fail to load, return no results, or throw errors.

Drupal 8 reached end-of-life (EOL) in November 2021 and Drupal 9 in November 2023. EOL software does not receive security or feature updates, and could expose sites to attack if any vulnerabilities or exploits are discovered. 

To find out which version of Drupal your site is running, go to your site in the Pantheon Dashboard > Status then look for the Drupal value in the Status block, or use the [Terminus CLI](/terminus) command `terminus drush <site>.<env> status`. 

## Action Required

Affected Drupal 8.0-9.3 sites will need to be upgraded to Drupal 9.4+, Solr 8, and [search_api_pantheon](https://www.drupal.org/project/search_api_pantheon) 8.2+. [Drupal core](/guides/drupal-hosted-createdashboard-set8) and [Solr](/guides/solr-drupal/solr-drupal) upgrade guides are available in our documentation.

Alternatively, Pantheon Search can be disabled and site owners may choose to implement Drupal’s built-in database search or another alternative such as a third-party search service provider.

