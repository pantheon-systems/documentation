---
title: Major Version Drupal Upgrades
parent_guide:
    - howto
/major-version-drupal-upgrades/
Metadata
filename: source/_guides/developing-sites/major-version-drupal-upgrades.md
---

### Upgrades are new sites

The best-practice for doing a major Drupal revision upgrade (e.g. version 6 to version 7) is to start a new site. Even the simplest of upgrades require their own QA and deployment process, and trying to do an upgrade on an existing site is not a recipe for success.

Also, Pantheon needs to track the proper upstream git history for your site to deliver core updates. By starting a new site for the upgrade, you ensure that future core updates will be available via the dashboard.

### Set up the code first, then migrate the data
**Warning: Do not attempt the upgrades on the platform. This is not supported.**

The best way to think about upgrading to the next major revision of Drupal on Pantheon is like when you get a new laptop or smartphone: first you set up both devices side-by-side, then you migrate the data from the old to then new.

For instance, if you are upgrading from Drupal 6 to Drupal 7, you would follow these broad steps:

1. Start a new site using D7 as the start-state.
2. Add the 7.x version of your contrib modules.
3. Import your existing data.
4. Debug, QA, release.

As always, the details are where the work is, but this is the best order in wich to approach these tasks.

### Handling your content and configuration

While you can try to get Drupal to handle all the data architecture changes between major revisions — importing the old database and running update.php — this is often not a complete solution. Depending on the specific module stack and configuration of your current site, it may be faster and more direct to plan and execute a content-migration to the new site rather than trying to use the built in update tools.

If you are not having much luck with update.php, you should consider setting up the new site and then using tools like the migrate.module to import your existing content. While this might initially seem like more work, it can often lead to a cleaner result more quickly, especially if your new site includes major architectural changes, features, or a redesign.
