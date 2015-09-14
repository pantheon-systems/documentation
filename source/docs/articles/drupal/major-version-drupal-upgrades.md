---
title: Major Version Drupal Upgrades
description: Detailed instructions on how to upgrade your site to the next major version of Drupal.
category:
  - drupal
  - managing
keywords: drupal, upgrade, upgrading, revision upgrade, update, updating
---
The best practice for doing a major Drupal revision upgrade (i.e. version 6 to version 7) is to start a new site. Even the simplest of upgrades require their own QA and deployment process, and trying to do an upgrade on an existing site is not a recipe for success.

Also, Pantheon needs to track the proper upstream Git history for your site to deliver core updates. By starting a new site for the upgrade, you ensure that future core updates will be available via the Dashboard.

The best way to think about upgrading to the next major revision of Drupal on Pantheon is the same as when you get a new laptop or smartphone: first you set up both devices side-by-side, then you migrate the data from the old to the new.

<div class="alert alert-danger" role="alert">
<h4>Warning</h4>
Do not attempt the upgrades on the platform. This is not supported.</div>

## Upgrade from Drupal 6 to Drupal 7

### Set up the Code and Migrate the Data

1. Start a new site using Drupal 7 as the start state.
2. Add the 7.x version of your contrib modules.
3. Import your existing data.
4. Debug, QA, release.

### Content and Configuration

While you can try to get Drupal to handle all the data architecture changes between major revisions (importing the old database and running update.php), this is often not a complete solution. Depending on the specific module stack and configuration of your current site, it may be faster and more direct to plan and execute a content migration to the new site rather than trying to use the built-in update tools.

If you are not having much luck with update.php, consider setting up the new site and using tools like the migrate.module to import your existing content. While this might initially seem like more work, it can often lead to a cleaner result more quickly, especially if your new site includes major architectural changes, features, or a redesign.

## Upgrade to Drupal 8

In Drupal 8, the migrate module is now in core and no longer supports upgrading through update.php.

1. Start a new site using Drupal 8 as the start state.
2. Add the 8.x version of your contrib modules.
3. Import your existing data.
4. Debug, QA, release.

### Content and Configuration

Drupal 8 migrations automatically create the needed content types and establish the mappings between the old and new fields by default.

If needed, you can customize your migration using the included hooks or use the configuration schema to use the included plugins with your custom data set. The hooks in Drupal 8 let you alter data in the prepareRow stage without creating a custom migration to handle the data.
