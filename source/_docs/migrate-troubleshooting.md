---
title: Migrate Sites to Pantheon: Troubleshooting
description: Troubleshooting for migrating remotely-hosted Drupal or WordPress sites to Pantheon.
categories: [developing]
tags: [migrate, getting-started]
keywords: migrate, migrating site, migrate from remote host, migrate existing site, migrate from other host, migrate from another host, how to migrate an existing site, alternate host, another host, migration, migrations, migrates, move site to pantheon, move from remote host, move from current host, move hosts, changing hosting providers, how to move hosting to pantheon, import site
---

## Migrated Site Not Working as Expected

If you code, database, and files have completed migrating, but your site is not working as you'd expect, please review [Pantheon Platform Considerations](/docs/platform-considerations/). For example, if your site uses [PHP short tags], you'll need to convert them to standard PHP tags.

Next, check [log files](https://pantheon.io/docs/logs/) to help identify and fix errors. Drupal or WordPress core is upgraded as part of migration, so you may have additional work to complete the upgrade. You can also try to

## One Application per Site
Each site supports a single Drupal or WordPress application. Placing a WordPress application inside a Drupal site, for example, is unsupported. Drupal multisite is also not supported. If your existing Drupal site is a multisite installation, please see [Extracting Sites from a Drupal Multisite](https://pantheon.io/docs/unwind-multisite/).

## Why doesn't site archive URL work from DropBox?
Change the end of Dropbox URLs from `dl=0` to `dl=1` so we can import your site archive properly. Related DropBox documentation: [How do I force a file or folder to download or render on dropbox.com?](https://www.dropbox.com/en/help/201)

## How do I use the Pantheon Migrations plugin with a custom WordPress upstream?

If you'd like your existing WordPress site to get one-click updates from your [custom upstream](/docs/running-custom-upstream/), then the migration process will be slightly different. The general process will be the same as a vanilla WordPress site, but start with **Create New Site** instead of **Migrate existing site**. You'll need to manually generate a [machine token](/docs/machine-tokens/) to use with the [Pantheon Migrations plugin](https://wordpress.org/plugins/bv-pantheon-migration/).

## What if I can't use `drush` on my existing Drupal site?

As an alternative to `drush` you can use the [Backup and Migrate](/docs/drupal-export#create-archive-using-backup-and-migrate) module. Also see [manually create an archive](/docs/drupal-export#manually-create-archive).

## What if I want my existing site to get updates from my custom upstream?

**Create New Site** on your custom upstream then use `drush ard` and `terminus site import` or continue with manual migration.

## Are database table prefixes supported?

You can technically use database prefixes, but we do not not support them, and recommend you convert to

## Is the MySQL MyISAM engine supported?
We support Innodb.

## Single sql file per site archive

Only provide one .sql file; if multiple are present the import will fail.

## See Also
 * [Migrate Sites to Pantheon](/docs/migrate)
 * [Log Files on Pantheon](/docs/logs/)
 * [Using the Pantheon Workflow][/docs/pantheon-workflow]
