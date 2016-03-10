---
title: Major Version Drupal Upgrades
description: Detailed instructions on how to upgrade your site to the next major version of Drupal.
category:
  - drupal
  - managing
keywords: drupal, upgrade, upgrading, revision upgrade, update, updating
---
To upgrade Drupal to a new major version (e.g. version 6 to version 7) you must create a new site. Even the simplest of upgrades requires its own QA and deployment process.

Also, Pantheon needs to track the proper upstream Git history for your site to deliver core updates. By starting a new site for the upgrade, you ensure that future core updates will be available via the Dashboard.

<div class="alert alert-danger" role="alert">
<h4>Warning</h4>
Do not attempt the upgrades on the platform. This is not supported.</div>

## Upgrade from Drupal 6 to Drupal 7

1. Start a new site using Drupal 7 as the start state.
2. Add the 7.x version of your contrib modules.
3. Import your existing data.
4. Debug, QA, release.

### Content and Configuration

While you can try to get Drupal to handle all the data architecture changes between major revisions (importing the old database and running update.php), this is often not a complete solution. Depending on the specific module stack and configuration of your current site, it may be faster and more direct to plan and execute a content migration to the new site rather than trying to use the built-in update tools.

If you are not having much luck with update.php, consider setting up the new site and using tools like the migrate.module to import your existing content. While this might initially seem like more work, it can often lead to a cleaner result more quickly, especially if your new site includes major architectural changes, features, or a redesign.

## Upgrade to Drupal 8

1. Start a new site using Drupal 8 as the start state.
2. Add the 8.x version of your contrib modules.
3. Import your existing data.
4. Debug, QA, release.

### Content and Configuration

Drupal 8 migrations automatically create the needed content types and establish the mappings between the old and new fields by default.

If needed, you can customize your migration using the included hooks or use the configuration schema to use the included plugins with your custom data set. The hooks in Drupal 8 let you alter data in the prepareRow stage without creating a custom migration to handle the data.

## See Also
View the following [Drupal.org](https://drupal.org) resources for more information:

- [Commonly implemented Migration methods](https://www.drupal.org/node/1132582)
- [Executing a Drupal 6/7 to Drupal 8 upgrade](https://www.drupal.org/node/2257723)
- [Upgrading from Drupal 6 or 7 to Drupal 8](https://www.drupal.org/upgrade/migrate)
