---
title: Migrate Sites to Pantheon
description: General instructions for preparing and migrating remotely-hosted Drupal or WordPress sites to Pantheon.
tags: [migrateguided]
categories: []
---

## Guided Migration

Ready to move your site to Pantheon? Start with the **[Migrate Existing Site](https://dashboard.pantheon.io/sites/migrate)** button and we'll help you move your Drupal or WordPress site to Pantheon. If you don’t already use Pantheon, you can [create a free account](https://pantheon.io/register) to start migrating a site immediately&mdash;you don’t pay until you’re ready to add your custom domain name as part of [going live](/docs/go-live).

![Migrate Existing Site](/source/docs/assets/images/dashboard/migrate-existing-site.png)

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

For more details, see [Migrate Sites to Pantheon: Manual Method](/docs/migrate-manual/).

## Tips for a Successful Migration

* **Upgrade to the latest version of core**. Your site will automatically be upgraded to the latest version of WordPress or Drupal core during migration. Upgrading before migrating can help prevent your site's code and database from getting out-of-sync.

* **Put the Drupal source site into maintenance mode** by going to Configuration > Development > Maintenance in Drupal.  This will prevent the contents of your database from getting out of sync while you’re exporting.

* **Clear all caches**. This removes unnecessary and out-of-date files from both the database and your filesystem, which will save time and valuable space.

* **Remove unneeded code, data, and files before migration**. Moving is always a good opportunity to do some housekeeping and a smaller footprint will migrate faster.

* If you’ve been using the database for things other than Drupal or WordPress you should **drop or skip any unnecessary or unrelated database tables** that your site doesn’t need.

* Audit your content and code for **hard coded links** pointing to your legacy site.

* **Review and archive your legacy site's logs.** The root causes for errors or slow transactions occurring on your legacy site will probably be migrated over, so it would be a good time to resolve them prior to the migration. Slow MySQL queries should be targeted for optimization, as a distributed infrastructure adds a small amount of latency on each transaction.

* **Review your configuration files** (my.conf, php.ini, .htaccess, etc). Any custom settings will need to be reviewed, as Pantheon provides platform-wide configuration. If, for example, the site allows very long timeouts, hides PHP errors, or changes how mySQL transactions are handled; these changes may not exist after migration, and may lead to unexpected results. Also, NGINX doesn't process the Apache-specific .htaccess file, so any redirects or custom logic within those files will need to be reconsidered.

## Troubleshooting

For information on troubleshooting failed migrations, please see [Migrate Sites to Pantheon: Troubleshooting](/docs/migrate-troubleshooting).

## Frequently Asked Questions (FAQs)

#### How do I migrate a local site to Pantheon?
You can import a WordPress or Drupal site archive via URL (within file size limits) using [Terminus](/docs/terminus):

```bash
terminus site:import <site> <url>
```

You'll need to [manually migrate](/docs/migrate-manual) site archives that exceed 500MB.

#### How do I migrate a Drupal 6 site to Pantheon?
Anyone wishing to migrate a Drupal 6 site to Pantheon can work with one of our Long Term Support (LTS) partners: [Tag1 Consulting](https://tag1consulting.com/) or [myDropWizard](http://www.mydropwizard.com/drupal-6-lts). Both of these partners are experienced in supporting sites on the Pantheon platform and specialize in maintaining security and site functionality for Drupal 6 sites. Should you need to keep your site running on D6, you will be in excellent hands working with them.

## See Also
* [Using the Pantheon Workflow](/docs/pantheon-workflow)
