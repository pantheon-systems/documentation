---
title: Migrate Sites to Pantheon
description: General instructions for preparing and migrating remotely-hosted Drupal or WordPress sites to Pantheon.
categories: [developing]
tags: [migrate, getting-started]
keywords: migrate, migrating site, migrate from remote host, migrate existing site, migrate from other host, migrate from another host, how to migrate an existing site, alternate host, another host, migration, migrations, migrates, move site to pantheon, move from remote host, move from current host, move hosts, changing hosting providers, how to move hosting to pantheon
---

Your site migration has four phases. You’ll package your site, import it, test it out, and then go live by adding your domain and changing DNS.

<div class="alert alert-info" role="alert">
<h4>Note</h4>
Each site supports a single Drupal or WordPress application. Placing a WordPress application to behave as the blog for a Drupal site, for example, is unsupported.
</div>
## Migrating WordPress Sites
Follow the recommended process within [Migrate to Pantheon: WordPress](/docs/migrate-wordpress), which uses the Pantheon Migration plugin.

The following scenarios are exceptions to the recommended process and require [manually migrating](https://pantheon.io/docs/manual-import/) the site:

- Your site requires a custom upstream.
- You would like to preserve the site's existing Git history.
- [WordPress Site Networks](/docs/wordpress-site-networks)

## Migrating Drupal Sites
### Prepare Your Site For Export

Follow these best practices before exporting your site:

* **Put the source site into maintenance mode** by going to Configuration > Development > Maintenance in Drupal.  This will prevent the contents of your database from getting out of sync while you’re exporting.
* **Upgrade to the latest version of core**. If your site runs an old version of core, our import process forces you to upgrade. Doing it before importing can avoid problems stemming from an out-of-sync database and codebase, and can expose incompatibilities that should be fixed.
* **Clear all caches**. This removes unnecessary and out-of-date files from both the database and your filesystem, which will save time and valuable space.
* Take a look at your codebase and **remove any non-core code from your site** that you aren’t planning on running on Pantheon.
* If you’ve been using the database for things other than Drupal, you should **drop or skip any unnecessary or unrelated database tables** that your site doesn’t need.

### Create Archive
You can create archives with [Drush](/docs/drupal-export#create-archive-using-drush) or the [Backup and Migrate](/docs/drupal-export#create-archive-using-backup-and-migrate) module. Alternatively, you can [manually create an archive](/docs/drupal-export#manually-create-archive) that includes each of the following:

- **Codebase** - All executable code, including core, custom and contrib modules or plugins, themes, and libraries. For the suggested directory listing of your site’s codebase, see [Export an Existing Drupal Site](/docs/drupal-export#manually-create-archive).

- **Database** - A single `.sql` dump, contains the content and active state of the site's configurations.

- **Files** - Anything in `sites/default/files`. This houses a combination of uploaded content from site users, along with generated stylesheets, aggregated scripts, image styles, etc.


### Import the Site Archive  
Click the [**Migrate Existing Site**](https://dashboard.pantheon.io/sites/migrate) button on either the User or Organization Dashboard. Enter a name and click **Create Site**. Import your site archive using the direct file upload (up to 100MB) or URL upload (up to 500MB). Acceptable file types include `.tar`, `.zip`, and `.gzip`.

Alternatively, you can create the site and import the archive from the  command line using [Terminus](/docs/terminus/) for archives less than 500MB, downloadable from a publicly accessible URL:

```
terminus sites import [--site=<name>] [--label=<label>] [--org=<org>] [--url=<url>]
```


<div class="alert alert-info">
<h4>Note</h4>
Modify Dropbox URLs so they end in <code>dl=1</code> instead of the default <code>dl=0</code>. This forces a download of your archive and avoids the Dropbox landing page.  </div>


The following scenarios are exceptions to this process and require [manually migrating](https://pantheon.io/docs/manual-import/) the site:

- Your site exceeds file size limit for uploads.
- Your site requires an upstream to an organizational or public distribution.
- You would like to preserve the site's existing Git history.



## Test Your Site
When the site's code, database, and files are all in place, verify everything is working as expected. At the Site Dashboard, click **Visit Development Site** for initial verification.

We recommend:

 - Using the Status tool in the Site Dashboard
 - Enabling [New Relic Pro](/docs/new-relic)
 - [Automated user acceptance testing](/docs/guides/wordpress-automated-testing) with Behat, Selenium, or Casper.js
 - Load testing using tools like [Blazemeter](/docs/guides/load-testing-with-blazemeter/)
 - Manual [user acceptance testing](https://en.wikipedia.org/wiki/Acceptance_testing#User_acceptance_testing)


## Go Live
Follow the [Going Live](/docs/going-live) checklist for a successful launch.
