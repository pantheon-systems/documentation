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

This doc shows how to upgrade an existing Pantheon-hosted Drupal 8 **Composer-managed** site to a Drupal 9 site with Integrated Composer.

## Differences in the Drupal 9 Upstream

Drupal 9 sites on Pantheon use the [drupal-project](https://github.com/pantheon-systems/drupal-project) upstream. 

Unlike earlier Pantheon upstreams, the main branch of the `drupal-project` repository does not contain files that you are unlikely to adjust while building sites (including Drupal Core). Instead, these are managed by Composer as dependencies.

## Upgrade Overview 

The goals of this upgrade are to:

- remove any dependencies that will be managed as Composer dependencies by the `drupal-project` upstream from the existing site's Git repository, and

- have Composer manage those dependencies in the new site instead

### Drupal 8 Sites Using the drops-8 Upstream

In addition, for Drupal 8 sites using the Pantheon `drops-8` upstream, switch the upstream from [drops-8](https://github.com/pantheon-systems/drops-8) to [drupal-project](https://github.com/pantheon-systems/drupal-project). 


[additional page content here]


## Ongoing Core Updates

One-click core updates can be made through the Dashboard.

Navigate to **Code** in the Dev tab of the site's Dashboard. Click **Check Now**. If updates are available, click **Apply Updates**.

## Troubleshooting

<Partial file="composer-updating.md" />

## See Also

- [Composer Fundamentals and Workflows](/composer)
