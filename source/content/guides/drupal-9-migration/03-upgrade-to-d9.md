---
title: Migrate to Drupal 9
subtitle: Upgrade from Drupal 8 Composer
description: Upgrade Pantheon Drupal 8 Composer Site to Drupal 9 With Integrated Composer
categories: [get-started]
cms: drupal-9
tags: [code, launch, migrate, site, updates]
contributors: [dustinleblanc, greg-1-anderson, stovak]
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-migration/upgrade-to-d9
anchorid: drupal-9-migration/upgrade-to-d9
editpath: drupal-9-migration/03-upgrade-to-d9.md
reviewed: "2021-04-22"
---

This doc provides an overview of upgrading an existing Pantheon-hosted Drupal 8 **Composer-managed** site to a Drupal 9 site with Integrated Composer.

The process of upgrading a Pantheon Drupal 8 Composer-managed site to a Drupal 9 Integrated Composer site follows the steps in the [Manually Migrate](/guides/drupal-9-migration/migrate-manual-d9#prepare-the-local-environment) guide page. This doc provides additonal reference details, including:
- an overview of the upgrade process
- notes on differences between the Drupal 9 and Drupal 8 (`drops-8`) upstreams, and
- information about ongoing site maintenance.

## Drupal 9 Upstream Note

<Partial file="drupal-9/drupal-9-upstream-note.md" />

## Upgrade Overview 

The goals of this upgrade are to:

- remove any dependencies that will be managed as Composer dependencies by the `drupal-project` upstream from the existing site's Git repository, and

- have Composer manage those dependencies in the new site instead

### Drupal 8 Sites Using the drops-8 Upstream

In addition, for Drupal 8 sites using the Pantheon `drops-8` upstream, switch the upstream from [drops-8](https://github.com/pantheon-systems/drops-8) to [drupal-project](https://github.com/pantheon-systems/drupal-project). 


To complete the site migration, follow the steps in the [Manually Migrate](/guides/drupal-9-migration/migrate-manual-d9#prepare-the-local-environment) guide page.

## Ongoing Core Updates

One-click core updates can be made through the Dashboard.

Navigate to **Code** in the Dev tab of the site's Dashboard. Click **Check Now**. If updates are available, click **Apply Updates**.

## Troubleshooting

<Partial file="composer-updating.md" />

## See Also

- [Composer Fundamentals and Workflows](/composer)
