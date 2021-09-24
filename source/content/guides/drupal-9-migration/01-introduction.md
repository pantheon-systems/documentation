---
title: Migrate to Drupal 9 on Pantheon
subtitle: Introduction
description: Steps to upgrade or migrate to Drupal 9 on Pantheon.
categories: [get-started]
cms: drupal-9
tags: [code, launch, migrate, site, updates]
reviewed: "2021-03-31"
layout: guide
permalink: docs/guides/drupal-9-migration
anchorid: drupal-9-migration
editpath: drupal-9-migration/01-introduction.md
---

This guide provides steps to upgrade or migrate an existing Drupal 8 or 9 site to [Drupal 9 with Integrated Composer](/drupal-9) on the Pantheon Platform.

To create a new Drupal 9 site, follow our [Drupal 9](/drupal-9) doc and learn more about [Integrated Composer](/integrated-composer).

## Before You Begin

Pantheon recommends using [Composer](/composer) to manage Drupal 8 and 9 site dependencies. This guide assumes you will use a Composer-based workflow with your Drupal 9 site.

Your upgrade path to Drupal 9 on Pantheon depends on:

- the site's start state and
- the target Drupal 9 workflow.

## Choose Your Adventure: Start State

To choose the best migration path, begin with the start state that best matches your current site.

### Drupal 8 Sites on Other Hosting

Starting with a Drupal 8 site that is not hosted on the Pantheon Platform, [instructions for manually migrate]

### Pantheon Drupal 8 Sites

For Pantheon-hosted Drupal 8 sites, determine which upstream your Drupal 8 site is using.

<Partial file="drupal-9/verify-upstream.md" />

#### drops-8 Upstream

If you're starting with a Drupal 8 site that currently uses the `drops-8` upstream, and

- the site uses Composer to manage dependencies, xyz
- the site **does not** use Composer, begin with [Converting a Standard Drupal 8 Site to a Composer Managed Site](/guides/composer-convert).

#### drupal-project (Drupal 9 Integrated Composer) Upstream

Starting with a Drupal 8 site that uses the Drupal 9 Integrated Composer `drupal-project` upstream,

...instructions...

#### Drupal 8 Empty Upstream

Starting with a Drupal 8 site that currently uses the `drupal8` Framework empty upstream,

...instructions...

#### Custom Upstream

Starting with a Drupal 8 site that currently uses a custom upstream,

...instructions...

### Drupal 9 Sites on Other Hosting

Starting with a Drupal 9 site not hosted on the Pantheon Platform, [instructions for manually migrating]
