---
title: Migrate to Drupal 9 on Pantheon
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

This doc shows how to upgrade an existing Pantheon-hosted Drupal 8 site without Composer, to a Drupal 9 site with Integrated Composer, using a **Multidev** to stage changes, and then replace the `master` branch.

## Overview

The goals of this upgrade is to set the Drupal core dependency to Drupal 9. This allows Composer to manage dependencies in the new site.

Note that this upgrade migrates your existing site to a new site. The new site will not maintain your site's existing commit history.

## Will This Guide Work for Your Site?

<Alert title="Multidev Required" type="danger">

To maintain best practice and to avoid difficult, time-consuming repairs to the site, this doc is written for users with access to Pantheon's [Multidev](/multidev) feature.

Pantheon support is not available to users who avoid the Multidev steps.

</Alert>

<Partial file="drupal-9/upgrade-site-requirements.md" />

## Prepare the Local Environment

<Partial file="drupal-9/prepare-local-environment.md" />

### Apply All Available Upstream Updates

<Partial file="drupal-apply-upstream-updates.md" />

- The site uses the [Pantheon Drupal 9](https://github.com/pantheon-systems/drupal-recommended) upstream.

- The site uses Composer to manage Drupal core and site dependencies.

- The site does not use another package and library manager like [Ludwig](https://www.drupal.org/project/ludwig).

To convert a standard Pantheon Drupal 8 site to a Composer-managed Drupal 8 site on the `drupal-recommended` upstream, follow the steps in the [Composer Conversion Guide](/guides/composer-convert).

## Ensure Dependencies are Drupal 9 Compatible

Before changing the Drupal core version to Drupal 9, make sure all the components of your site are Drupal 9 compatible. Review the steps in drupal.org's [Upgrading a Drupal 8 site to Drupal 9](https://www.drupal.org/docs/upgrading-drupal/how-to-prepare-your-drupal-7-or-8-site-for-drupal-9/upgrading-a-drupal-8-site) for details, and use [Upgrade Status](https://www.drupal.org/project/upgrade_status) to check the compatibility of all contributed modules and themes.

## Set Drupal Core Version

Set the Drupal core version to Drupal 9:

  ```shell{promptUser: user}
  composer require --no-update drupal/core-recommended:^9.2
  composer update drupal/core* -W
  git add composer.*
  git commit -m "upgrade to Drupal 9"
  ```
 If you receive the error message "Your requirements could not be resolved to an installable set of packages", use the command `composer update` instead of `composer update drupal/core* -W`.

## Ongoing Core Updates

One-click core updates can be made through the Dashboard.

Navigate to **Code** in the Dev tab of the site's Dashboard. Click **Check Now**. If updates are available, click **Apply Updates**.

## Troubleshooting

<Partial file="composer-updating.md" />

## See Also

- [Composer Fundamentals and Workflows](/composer)
