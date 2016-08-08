---
title: Migrate Sites to Pantheon: Troubleshooting
description: Troubleshooting for migrating remotely-hosted Drupal or WordPress sites to Pantheon.
categories: [developing]
tags: [migrate, getting-started]
keywords: migrate, migrating site, migrate from remote host, migrate existing site, migrate from other host, migrate from another host, how to migrate an existing site, alternate host, another host, migration, migrations, migrates, move site to pantheon, move from remote host, move from current host, move hosts, changing hosting providers, how to move hosting to pantheon, import site
---

## Migrated Site Not Working as Expected

If you code, database, and files have completed migrating, but your site is not working as you'd expect, please review [Pantheon Platform Considerations](/docs/platform-considerations/). For example, if your site uses PHP short tags, you'll need to convert them to standard PHP tags.

Next, check [log files](https://pantheon.io/docs/logs/) to help identify and fix errors. Drupal or WordPress core is upgraded as part of migration, so you may have additional work to complete the upgrade.

## One Application per Site
Each site supports a single Drupal or WordPress application. Placing a WordPress application inside a Drupal site, for example, is unsupported. Drupal multisite is also not supported. If your existing Drupal site is a multisite installation, please see [Extracting Sites from a Drupal Multisite](https://pantheon.io/docs/unwind-multisite/).

## Why doesn't my site archive import correctly from Dropbox?
Change the end of Dropbox URLs from `dl=0` to `dl=1` so we can import your site archive properly. Related Dropbox documentation: [How do I force a file or folder to download or render on dropbox.com?](https://www.dropbox.com/en/help/201)

## How do I use the Pantheon Migrations plugin with a custom WordPress upstream?

If you'd like your existing WordPress site to get one-click updates from your [custom upstream](/docs/running-custom-upstream/), then the migration process will be slightly different. The general process will be the same as a vanilla WordPress site, but start with **Create New Site** instead of **Migrate existing site**. You'll need to manually generate a [machine token](/docs/machine-tokens/) to use with the [Pantheon Migrations plugin](https://wordpress.org/plugins/bv-pantheon-migration/).

## How should I migrate a site with a custom Drupal-based upstream?

If you'd like your existing Drupal site to get one-click updates from your [custom upstream](/docs/running-custom-upstream/), then the migration process will be slightly different. The general process will be the same as a vanilla Drupal site, but start with **Create New Site** instead of **Migrate existing site**. Then use `terminus site import` to import your site archive, or follow the [Manual migration] instructions if your site archive exceeds file size limits.

## What if I can't use `drush` on my existing Drupal site?

As an alternative to `drush` you can use the [Backup and Migrate](/docs/drupal-export#create-archive-using-backup-and-migrate) module. Also see [manually create an archive](/docs/drupal-export#manually-create-archive).

## Are database table prefixes supported?

See [WordPress known issue](/docs/wordpress-known-issues/#table-prefixes)

## Is the MySQL MyISAM engine supported?
No. If any of your database tables are using the MyISAM engine please conver them to InnoDB.

## Single sql file per site archive

If multiple sql files are present the import will fail. Only provide one `.sql` file per site archive. 

## See Also
 * [Migrate Sites to Pantheon](/docs/migrate)
 * [Log Files on Pantheon](/docs/logs/)
 * [Using the Pantheon Workflow][/docs/pantheon-workflow]
