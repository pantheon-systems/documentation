---
title: Migrate Sites to Pantheon
description: General instructions for preparing and migrating remotely-hosted Drupal or WordPress sites to Pantheon.
categories: [developing]
tags: [migrate, getting-started]
keywords: migrate, migrating site, migrate from remote host, migrate existing site, migrate from other host, migrate from another host, how to migrate an existing site, alternate host, another host, migration, migrations, migrates, move site to pantheon, move from remote host, move from current host, move hosts, changing hosting providers, how to move hosting to pantheon, import site
---

## Guided Migration

Ready to move your site to Pantheon? Start with the **[Migrate Existing Site](https://dashboard.pantheon.io/sites/migrate)** button and we'll help you move your Drupal or WordPress site to Pantheon. If you don’t already use Pantheon, you can [create a free account](https://pantheon.io/register) to start migrating a site immediately&mdash;you don’t pay until you’re ready to add your custom domain name as part of [going live](/docs/going-live).


### WordPress
After selecting **[Migrate Existing Site](https://dashboard.pantheon.io/sites/migrate/)**, you'll create a new Pantheon site and install the Pantheon Migrations plugin on your existing site. Visit the plugin settings and paste in your new Pantheon site name, as well as the machine token we generate for you, which gives the plugin access to move data to your new Pantheon site.

See exactly how it works in the following video:
<iframe width="420" height="315" src="https://www.youtube.com/embed/3_DjdIueKM4" frameborder="0" allowfullscreen></iframe>

For more information see: [Migrate to Pantheon: WordPress](/docs/migrate-wordpress)

### Drupal

After selecting **[Migrate Existing Site](https://dashboard.pantheon.io/sites/migrate/)**, you'll create a new Pantheon site and we'll walk you through steps to run `drush ard` to prepare a site archive in the standard format we use to import your site. You can use either Terminus, the Pantheon Command Line Interface, or the Dashboard, to import the site archive.

We'll guide you to put the archive on your existing website, but you can put the site archive on Dropbox, S3, or any number of other places. The important thing is that you have a site archive that can be downloaded via a publicly accessible URL.

## Manual Migration

First select **[Migrate Existing Site](https://dashboard.pantheon.io/sites/migrate/)**. After creating a new Pantheon site you can exit [guided migration](/docs/migrate/#guided-migration) and choose to **Manually migrate** your site.

Manually migrate your site to Pantheon when any of the following apply:

* **Large Drupal Site Archive**: Site archive is greater than the guided migration import limit of 500MB.
* **Preserve Git History**: You'd like to preserve your site's existing Git commit history.
* **[WordPress Site Networks](/docs/wordpress-site-networks/)**
* **Plugin install unavailable on existing WordPress site** For example, if your existing site is hosted on WordPress.com, you'll be unable to install the Pantheon Migrations plugin.
* **Debug Failed Migration**: It can be helpful to migrate your code, database, and files separately to help debug edge-cases that are not supported through guided migration.

For more details see: [Manually migrating your site to Pantheon](/docs/migrate-manual/)

## Tips for a Successful Migration

* **Upgrade to the latest version of core**. Your site will automatically be upgraded to the latest version of WordPress or Drupal core during migration. Upgrading before migrating can help prevent your site's code and database from getting out-of-sync.

* **Put the Drupal source site into maintenance mode** by going to Configuration > Development > Maintenance in Drupal.  This will prevent the contents of your database from getting out of sync while you’re exporting.

* **Clear all caches**. This removes unnecessary and out-of-date files from both the database and your filesystem, which will save time and valuable space.

* **Remove unneeded coce, data, and files before migration**. Moving is always a good opportunity to do some housekeeping and a smaller footprint will migrate faster.

* If you’ve been using the database for things other than Drupal or WordPress you should **drop or skip any unnecessary or unrelated database tables** that your site doesn’t need.

## Troubleshooting

For information on troubleshooting failed migrations, please see [Migrate Sites to Pantheon: Troubleshooting](/docs/migrate-troubleshooting)

## See Also
* [Getting Started](/docs/getting-started)
* [Going Live](/docs/going-live)
* [Clone an Existing Pantheon Site](/docs/clone-site)
