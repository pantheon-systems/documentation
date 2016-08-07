---
title: Migrate Sites to Pantheon
description: General instructions for preparing and migrating remotely-hosted Drupal or WordPress sites to Pantheon.
categories: [developing]
tags: [migrate, getting-started]
keywords: migrate, migrating site, migrate from remote host, migrate existing site, migrate from other host, migrate from another host, how to migrate an existing site, alternate host, another host, migration, migrations, migrates, move site to pantheon, move from remote host, move from current host, move hosts, changing hosting providers, how to move hosting to pantheon, import site
---

## Guided Migration

We'll guide you to move your site to Pantheon, which varies depending on if your existing CMS is WordPress or Drupal.

### WordPress
After selecting **[Migrate Existing Site](https://dashboard.pantheon.io/sites/migrate/)**, you'll create a new Pantheon site and install the Pantheon Migrations plugin on your existing site. Visit the plugin settings and paste in your new Pantheon site name, as well as a [machine token](/docs/machine-tokens/) we've generated for you. The machine token gives the plugin access to move data to your new Pantheon site.



<iframe width="420" height="315" src="https://www.youtube.com/embed/3_DjdIueKM4" frameborder="0" allowfullscreen></iframe>

Video preview of WordPress guided migration

For more details see [Migrate to Pantheon: WordPress](/docs/migrate-wordpress)

### Drupal

After selecting **[Migrate Existing Site](https://dashboard.pantheon.io/sites/migrate/)**, you'll create a new Pantheon site and we'll walk you through steps to prepare a site archive using `drush ard`, which will generate an archive in the format we need. You can then use either Terminus, the Pantheon Command Line Interface, or the Dashboard, to import the site archive.

## Manual Migration

After selecting **[Migrate Existing Site](https://dashboard.pantheon.io/sites/migrate/)** you can exit the [guided migration](migrate#guided-migration) and choose to **Manually migrate** your site.

Manually migrate your site to Pantheon when any of the following apply:

* **Large Drupal Site Archive**: Site archive is greater than the guided migration import limit of 500MB.
* **Preserve Git History**: You'd like to preserve your site's existing Git commit history.
* **[WordPress Site Networks](/docs/wordpress-site-networks/)**
* **Plugin install unavailable on existing WordPress site** For example, if your existing site is hosted on WordPress.com, you will be unable to install the Pantheon Migrations plugin.
* **Debug Failed Migration**: It can be helpful to migrate your code, database, and files separately to help debug edge-cases that are not supported through guided migration.


## Tips for a Successful Migration

* **Upgrade to the latest version of core**. As part of import, your site will automatically be upgraded to the latest version of WordPress or Drupal core. Upgrading before migration can help prevent an out-of-sync database and codebase.

* **Put the source site into maintenance mode** by going to Configuration > Development > Maintenance in Drupal.  This will prevent the contents of your database from getting out of sync while you’re exporting.

* **Clear all caches**. This removes unnecessary and out-of-date files from both the database and your filesystem, which will save time and valuable space.

* **Remove unneeded coce, data, and files before migration**

* If you’ve been using the database for things other than Drupal, you should **drop or skip any unnecessary or unrelated database tables** that your site doesn’t need.



https://pantheon.io/docs/manual-import/


## Verify Migration is Successful
When the site's code, database, and files are all in place, verify everything is working as expected. Start by clicking **Visit Development Site** from the Pantheon Site Dashboard.

 - Review the **Status** tool in the Site Dashboard
  - Check [log files](https://pantheon.io/docs/logs/) to help identify errors
 - Enable [New Relic Pro](/docs/new-relic) to help identify and fix performance issues


## Next Steps

Once your code, database, and files are in your Dev environment, check out our [Going Live](/docs/going-live) checklist for a successful launch.


Acceptable file types include `.tar`, `.zip`, and `.gzip`.

## Troubleshooting

### Migrated Site Not Working as expected

If your migrated site is not working as you'd expect, please review [Pantheon Platform Considerations](/docs/platform-considerations/). For example, if your site uses short tags, you'll need to convert them to standard tags: (/docs/platform-considerations/#php-short-tags).

Next, check [log files](https://pantheon.io/docs/logs/) to help identify and fix errors.

### One Application per Site
Each site supports a single Drupal or WordPress application. Placing a WordPress application to behave as the blog for a Drupal site, for example, is unsupported. If your existing Drupal site is a multisite installation, please see [Extracting Sites from a Drupal Multisite](https://pantheon.io/docs/unwind-multisite/).

### Why doesn't site archive on DropBox?
Change the end of Dropbox URLs from `dl=0` to `dl=1` so we can import your site archive properly. Related DropBox documentation: [How do I force a file or folder to download or render on dropbox.com?](https://www.dropbox.com/en/help/201)

### How do I use the Pantheon Migrations plugin with a custom WordPress upstream?

If you'd like your existing WordPress site to get one-click updates from your [custom upstream](/docs/running-custom-upstream/), then the migration process will be slightly different. The general process will be the same as a vanilla WordPress site, but start with **Create New Site** instead of **Migrate existing site**. You'll need to manually generate a [machine token](/docs/machine-tokens/) to use with the [Pantheon Migrations plugin](https://wordpress.org/plugins/bv-pantheon-migration/).

### What if I can't use `drush` on my existing Drupal site?

As an alternative to `drush` you can use the [Backup and Migrate](/docs/drupal-export#create-archive-using-backup-and-migrate) module. Also see [manually create an archive](/docs/drupal-export#manually-create-archive).

### What if I want my existing site to get updates from my custom upstream?

**Create New Site** on your custom upstream then use `drush ard` and `terminus site import` or continue with manual migration.




## See Also
* [Clone Existing Pantheon Site](/docs/clone-site)
