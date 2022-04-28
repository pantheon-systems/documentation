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
reviewed: "2022-03-07"
---

This page shows how to upgrade an existing Pantheon-hosted Drupal 8 site without Composer, to a Drupal 9 site with Integrated Composer, using a **Multidev** to stage changes, and then replace the `master` branch.

## Overview

The goal of this upgrade is to set the Drupal core dependency to Drupal 9. This upgrade allows Composer to manage dependencies in the new site.

Note that this upgrade migrates your existing site to a new site. The new site will not maintain your site's existing commit history.

## Will This Guide Work for Your Site?

<Alert title="Multidev Required" type="danger">

To maintain best practices and to avoid difficult, time-consuming repairs to the site, this doc is written for users with access to Pantheon's [Multidev](/multidev) feature.

Pantheon support is not available to users who avoid the Multidev steps.

</Alert>

<Partial file="drupal-9/upgrade-site-requirements.md" />

## Convert to Composer

We provide detailed steps on how to convert a standard Pantheon Drupal 8 site to a Composer-managed Drupal 8 site on the `drupal-recommended` upstream.

<Alert title="Note" type="info" >

Follow the steps in the [Composer Conversion Guide](/guides/composer-convert) to ensure that your site is ready for migration to Drupal 9.

</Alert>

## Prepare the Local Environment

<Partial file="drupal-9/prepare-local-environment.md" />

### Apply All Available Upstream Updates

<Partial file="drupal-apply-upstream-updates.md" />

<Partial file="drupal-8-to-drupal-9-upgrade.md" />

## Troubleshooting

<Partial file="composer-updating.md" />

## See Also

- [Composer Fundamentals and Workflows](/guides/composer)
