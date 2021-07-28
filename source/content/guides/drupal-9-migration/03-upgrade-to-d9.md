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
reviewed: "2021-04-22"
---

This doc shows how to upgrade an existing Pantheon-hosted Drupal 8 site without Composer to a Drupal 9 site with Integrated Composer.

Drupal 9 sites on Pantheon have Composer built-in to manage site dependencies.

The goals of this upgrade are to:

- remove dependencies that Composer will manage from the existing site's Git repository, and

- have Composer manage those dependencies in the new site instead.

Note that since you are effectively migrating your site using these upgrade steps, the new site will not maintain your site's existing commit history.

<Alert title="Multidev Required" type="danger">

To maintain best practice and to avoid difficult, time-consuming repairs to the site, this doc is written for users with access to Pantheon's [Multidev](/multidev) feature.

Pantheon support is not available to users who avoid the Multidev steps.

</Alert>

## Will This Guide Work for Your Site?

<Alert type="info" title="Do not upgrade unless the site is eligible.">

In your site Dashboard, look for the blue banner across the top that says that your site is compatible with a [database upgrade](/pantheon-yml#specify-a-version-of-mariadb):

> Good news, your site's database version is now configurable! Learn how.

[Contact Support](/support) if you're ready to use Drupal 9, but you don't see the banner on the Dashboard.

</Alert>

<Partial file="drupal-9/upgrade-site-requirements.md" />

## Prepare the Local Environment

<Partial file="drupal-9/prepare-local-environment.md" />

<Partial file="drupal-8-convert-to-composer.md" />

## Change Upstreams

Set the site to use the Drupal 9 Upstream:

```bash{promptUser:user}
terminus site:upstream:set $site drupal9
```

Enter `yes` when prompted:

```bash
Are you sure you want change the upstream for anita-drupal to Drupal 9? (yes/no) [no]:
```

Note that the [User in Charge](/change-management#site-level-roles-and-permissions), Site Owner, or Organization Administrator can change the Upstream.

## Ongoing Core Updates

One-click core updates can be made through the Dashboard.

Navigate to **Code** in the Dev tab of the site's Dashboard. Click **Check Now**. If updates are available, click **Apply Updates**.

## Troubleshooting

<Partial file="composer-updating.md" />

## See Also

- [Composer Fundamentals and Workflows](/composer)
