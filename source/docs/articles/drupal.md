---
drupal: true
use:
  - eight
  - drupal
title: Drupal on Pantheon
description: Drupal is an open source content management platform powering millions of websites and applications.
category: drupal
keywords: drupal, sites, pantheon, upstream
layout: landing
---

[Drupal](https://www.drupal.org) is an open source content management platform powering millions of websites and applications. It’s built, used, and supported by an active and diverse community of people around the world.

## Drupal 8
Pantheon runs an unmodified core version of Drupal 8. When you create a new Drupal 8 site, it clones the [drops-8](https://github.com/pantheon-systems/drops-8) repository and sets it as the site's upstream, so you can [apply core updates](/docs/articles/sites/code/applying-upstream-updates/) with a single click.

## Drupal 7
Pantheon runs an optimized version of Drupal, based on [Pressflow](https://github.com/pressflow/7), with an additional [Pantheon API module](/docs/articles/sites/code/what-is-the-pantheon_api-module/). When you create a new Drupal 7 site, it clones the [drops-7](https://github.com/pantheon-systems/drops-7) repository and sets it as the site's upstream, so you can [apply core updates](/docs/articles/sites/code/applying-upstream-updates/) with a single click. The import process for migrating an existing Drupal site replaces core with drops-7.

## Get Started
[Migrate an existing Drupal site](/docs/articles/sites/migrate) or [launch a new one](/docs/articles/getting-started/) using the Pantheon Dashboard.

## Clone a Drupal Site From a Backup
See [Cloning an Existing Site from a Dashboard Backup](/docs/articles/sites/backups/cloning-an-existing-site-from-a-dashboard-backup/).

## Major Version Upgrades
The best practice for doing a major Drupal revision upgrade (e.g. version 6 to version 7) is to start a new site. Even the simplest of upgrades require their own QA and deployment process, and trying to do an upgrade on an existing site is not a recipe for success.

Also, Pantheon needs to track the proper upstream for your site to deliver core updates. By starting a new site for the upgrade, you ensure that future core updates are available via the Dashboard. For more details, see [Major Version Drupal Upgrades](/docs/articles/drupal/major-version-drupal-upgrades/).

## Updating Modules
See [Updating Modules Through Drupal](/docs/articles/drupal/updating-modules-through-drupal/).

## Apache Solr
[Apache Solr](/docs/articles/sites/apache-solr/) is an open source system for indexing and searching website content. We manage a cluster of fast Solr index servers that communicate with your site via these popular Drupal modules:

​[Apache Solr](https://drupal.org/project/apachesolr) - 7.x-1.x and 6.x-3.x  
[Search API Solr](https://drupal.org/project/search_api_solr) - 7.x-1.x

For most sites, the apachesolr module is the easiest to configure and maintain, and includes functionality like facets and other great features.

## Launch Check

Pantheon provides static site analysis as a service for Drupal 7 sites to make best practice recommendations on site configurations. Go live with confidence using [Launch Check for Drupal](/docs/articles/drupal/launch-check-drupal-performance-and-configuration-analysis/).
