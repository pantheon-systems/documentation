---
title: Drupal
description: Drupal is an open source content management platform powering millions of websites and applications.
category: drupal
keywords: drupal, sites, pantheon, upstream
---
[Drupal](https://www.drupal.org) is an open source content management platform powering millions of websites and applications. It’s built, used, and supported by an active and diverse community of people around the world.

Drupal sites on Pantheon run an optimized version of [Drupal](https://github.com/pantheon-systems/drops-7), based on [Pressflow](https://github.com/pressflow/7), with an additional [Pantheon API module](/docs/articles/sites/code/what-is-the-pantheon_api-module/). When new Drupal 7 sites are created, the platform clones the drops-7 repository as a part of its process and sets it as a remote to track, so that you can [apply core updates](/docs/articles/sites/code/applying-upstream-updates/) with a single click. When existing Drupal sites are imported, our system replaces core with drops-7.

##Get Started
[Import an existing Drupal site](/docs/articles/drupal/importing-an-existing-drupal-site-to-pantheon/) or [launch a new one](/docs/articles/getting-started/) using the Pantheon Dashboard tools.

##Clone a Drupal Site
There may be times when you need to copy an existing Drupal site to an entirely new, separate environment. This is a fairly simple, manual process. For more information, see [Clone a Drupal Site Using Drush](/docs/articles/sites/create/clone-a-drupal-site-using-drush/).

##Major Version Upgrades
The best practice for doing a major Drupal revision upgrade (e.g. version 6 to version 7) is to start a new site. Even the simplest of upgrades require their own QA and deployment process, and trying to do an upgrade on an existing site is not a recipe for success.

Also, Pantheon needs to track the proper upstream Git history for your site to deliver core updates. By starting a new site for the upgrade, you ensure that future core updates will be available via the Dashboard. [Learn more](/docs/articles/drupal/major-version-drupal-upgrades/).

## Updating Modules
Drupal has a very good, built-in system for updating contributed modules through the administrative interface. Learn how to [update modules through Drupal on Pantheon](/docs/articles/drupal/updating-modules-through-drupal/).

##Apache Solr
[Apache Solr](/docs/articles/sites/apache-solr/) is an open source system for indexing and searching website content. Pantheon provides Apache Solr as a service. We manage a cluster of fast Solr index servers that communicate with your site via these popular Drupal modules:

​[Apache Solr](https://drupal.org/project/apachesolr) - 7.x-1.4 and 6.x-1.8  
[Search API Solr](https://drupal.org/project/search_api_solr) - 7.x-1.2

For most sites, the apachesolr module is the easiest to configure and maintain, and includes functionality like facets and other great features.

##Launch Check

Pantheon provides static site analysis as a service for Drupal 7 sites to make best practice recommendations on site configurations. Go live with confidence using [Launch Check for Drupal](/docs/articles/drupal/launch-check-drupal-performance-and-configuration-analysis/).

##See Also
- [Caching in Drupal Modules](/docs/articles/drupal/caching-in-drupal-modules/)
- [Configuring Settings.php](/docs/articles/drupal/configuring-settings-php/)
- [Cron for Drupal](/docs/articles/drupal/cron/)  
- [Drupal's Performance and Caching Settings](/docs/articles/drupal/drupal-s-performance-and-caching-settings/)
- [Setting up CloudFront CDN with Drupal](/docs/articles/drupal/cdn-setting-up-cloudfront/)
