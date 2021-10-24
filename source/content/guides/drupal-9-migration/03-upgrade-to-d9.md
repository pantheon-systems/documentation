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

<Alert title="Multidev Required" type="danger">

To maintain best practice and to avoid difficult, time-consuming repairs to the site, this doc is written for users with access to Pantheon's [Multidev](/multidev) feature.

Pantheon support is not available to users who avoid the Multidev steps.

</Alert>

## Will This Guide Work for Your Site?

This guide is for Pantheon-hosted Drupal 8 sites that meet the following:

- The site uses the [Pantheon drupal9](https://github.com/pantheon-systems/drupal-project) upstream.

- The site uses Composer to manage Drupal core and site dependencies.

- The site does not use another package and library manager like [Ludwig](https://www.drupal.org/project/ludwig).

To convert a standard Pantheon Drupal 8 site to a Composer-managed Drupal 8 site on the `drupal9` upstream, follow the steps in the [Composer Conversion Guide](/guides/composer-convert).


## Set Drupal Core Version

Set the Drupal core version to Drupal 9:

  ```
  $ composer require drupal/core-recommended:^9.2
  $ git add composer.*
  $ git commit -m "upgrade to Drupal 9"
  ```

**WHATEVER OTHER STEPS NEED TO HAPPEN.**


## Ongoing Core Updates

One-click core updates can be made through the Dashboard.

Navigate to **Code** in the Dev tab of the site's Dashboard. Click **Check Now**. If updates are available, click **Apply Updates**.

## Troubleshooting

<Partial file="composer-updating.md" />

## See Also

- [Composer Fundamentals and Workflows](/composer)
