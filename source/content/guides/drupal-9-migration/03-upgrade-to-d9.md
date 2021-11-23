---
title: Migrate to Drupal 9
subtitle: Upgrade from Drupal 8
description: Upgrade Pantheon Drupal 8 Sites to Drupal 9 With Integrated Composer
categories: [get-started]
cms: drupal-9
tags: [code, launch, migrate, site, updates]
contributors: [dustinleblanc, greg-1-anderson, stovak]
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-migration/upgrade-to-d9
anchorid: drupal-9-migration/upgrade-to-d9
editpath: drupal-9-migration/03-upgrade-to-d9.md
reviewed: "2021-10-24"
---

This doc shows how to upgrade an existing Pantheon-hosted Drupal 8 Composer-managed site to a Drupal 9 site with Integrated Composer.

Drupal 9 sites on Pantheon have Composer built-in to manage site dependencies.

The goals of this upgrade are to:

- set the Drupal core dependency to Drupal 9, and

- update any dependencies.

## Will This Guide Work for Your Site?

This guide is for Pantheon-hosted Drupal 8 sites that meet the following:

- The site uses the [Pantheon Drupal 9](https://github.com/pantheon-systems/drupal-project) upstream.

- The site uses Composer to manage Drupal core and site dependencies.

- The site does not use another package and library manager like [Ludwig](https://www.drupal.org/project/ludwig).

To convert a standard Pantheon Drupal 8 site to a Composer-managed Drupal 8 site on the `drupal-recommended` upstream, follow the steps in the [Composer Conversion Guide](/guides/composer-convert).

## Ensure Dependencies are Drupal 9 Compatible

Before changing the Drupal core version to Drupal 9, make sure all the components of your site are Drupal 9 compatible. Review the steps in drupal.org's [Upgrading a Drupal 8 site to Drupal 9](https://www.drupal.org/docs/upgrading-drupal/how-to-prepare-your-drupal-7-or-8-site-for-drupal-9/upgrading-a-drupal-8-site) for details, and use [Upgrade Status](https://www.drupal.org/project/upgrade_status) to check the compatibility of all contributed modules and themes.

## Set Drupal Core Version

Set the Drupal core version to Drupal 9:

  ```
  $ composer require --no-update drupal/core-recommended:^9.2
  $ composer update drupal/core* -W
  $ git add composer.*
  $ git commit -m "upgrade to Drupal 9"
  ```

## Ongoing Core Updates

One-click core updates can be made through the Dashboard.

Navigate to **Code** in the Dev tab of the site's Dashboard. Click **Check Now**. If updates are available, click **Apply Updates**.

## Troubleshooting

<Partial file="composer-updating.md" />

## See Also

- [Composer Fundamentals and Workflows](/composer)
