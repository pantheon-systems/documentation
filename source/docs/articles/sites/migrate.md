---
migrate: true
layout: landing
use:
    - migrate
title: Migrate Sites to Pantheon
description: General instructions for preparing and migrating remotely-hosted Drupal or WordPress sites to Pantheon.
category:
- getting-started
keywords: migrate, migrating site, migrate from remote host, migrate existing site, migrate from other host, migrate from another host, how to migrate an existing site, alternate host, another host, migration, migrations, migrates, move site to pantheon, move from remote host, move from current host, move hosts, changing hosting providers, how to move hosting to pantheon
---
Migrating a website from another environment is a complex task. Whether it is running locally on a shared host, or on a cluster of virtual machines at an infrastructure-as-a-service provider, the goal is the same: move to Pantheon and enjoy the freedom to build awesome sites.

Your site migration has four phases. You’ll package your site, import it, test it out, and then change DNS and go live. With a good plan and understanding of the platform, the process will run smoothly.


## Pack Up

In this phase, you will create an archive of your site. Archives can be stored in a single file or as three separate files.

You’ll need to package up your:

- **Codebase** - all executable code, including Core, custom and contrib modules or plugins, themes, and libraries. For the suggested directory listing of your site’s codebase, see our [Drupal](/docs/articles/sites/migrate/export-an-existing-drupal-site#manually-create-archive) or [WordPress](/docs/articles/sites/migrate/export-an-existing-wordpress-site#manually-create-separate-site-archives) export documentation.

- **Database** - a single .sql dump, contains the content and active state of the site's configurations.

- **Files** - anything in `sites/default/files` for Drupal or `wp-content/uploads` for WordPress. This houses a combination of uploaded content from site users, along with generated stylesheets, aggregated scripts, image styles, etc.



### Evaluate Your Site

1. Review your codebase.
 - Are you running another application in addition to WordPress or Drupal? See [Platform Considerations](/docs/articles/sites/platform-considerations/#one-application-per-site).
2. Measure your database size.
3. Locate your non-version-controlled static assets.
4. Review your logs.

### Prepare Your Site For Export

Follow these best-practices before exporting your site.

* **Put the source site into maintenance mode** by going to **Configuration** > **Development** > **Maintenance** in Drupal, or with extra code (we recommend the [Maintenance Mode plugin](https://wordpress.org/plugins/wp-maintenance-mode/)) in WordPress.  This will prevent the contents of your database from getting out of sync while you’re exporting.
* **Upgrade to the latest version of Drupal or WordPress core.** If your site runs an old version of core, our import process forces you to upgrade. Doing it before importing can avoid problems stemming from an out-of-sync database and codebase, and can expose incompatibilities that should be fixed.
<div class="alert alert-danger" role="alert"><h4>Warning</h4>
Due to <a href="https://codex.wordpress.org/Upgrading_WordPress_-_Extended_Instructions#Upgrading_Across_Multiple_Versions">WordPress's incremental upgrade practice</a>, we highly recommend upgrading WordPress to the latest version in place or in a local environment before attempting to import the site to Pantheon. Importing an old site will upgrade WordPress code directly to the latest version.</div>
* **Clear all caches**. This will remove unnecessary and out-of-date files from both the database and your filesystem, which will save a lot of time and valuable space.
* Take a look at your codebase and **remove any non-core code from your site** that you aren’t planning on running on Pantheon.
* If you’ve been using the database for things other than Drupal or WordPress, you should **drop or skip any unnecessary or unrelated database tables** that your site doesn’t need.

### Plan the Import
You can import during the site creation process using the importer tool or manually after the site has been created. Importing after creation requires code to be upload via git, along with separate imports of your database and files. Existing Drupal 8 sites must be imported manually.

**The Importer Tool**

Using our importer during the site creation process has the following effects on the codebase:

 - New git history.
 - Replacement and upgrade to the latest core version from our [Drops-7](https://github.com/pantheon-systems/drops-7), [Drops-6](https://github.com/pantheon-systems/drops-6), or [WordPress](https://github.com/pantheon-systems/wordpress) repository.
 - Assignment of the appropriate "vanilla" repository above as the code upstream, used for updating Drupal and WordPress core on the site.

<div class="alert alert-danger" role="alert"><h4>Reminder</h4>Importing automatically upgrades to the latest version of core. It's a best practice to keep core up-to-date to benefit from security and bug fixes, but if you use a site or distribution that relies on an outdated version of core, you may experience incompatibilities. If you experience issues, see the troubleshooting documentation for your <a href="https://codex.wordpress.org/Updating_WordPress#Troubleshooting">WordPress</a> or <a href="https://www.drupal.org/troubleshooting"> Drupal</a> upstream.</div>

The importer accepts either single-file site archives or separate archives of the code, database, and files. It accepts file uploads up to 100MB, and can download publicly-accessible archives up to 500MB. Acceptable file types include tar, zip, or gzip.

File size limits are per archive. Providing three files instead of one effectively increases the entire site import size limit to 1.5GB (500MB code, 500MB database, 500MB files).

**Manual Site Import**

Manually import the site outside of our Importer Tool if any of the following apply:

- Your site exceeds file size limit for uploads.
- Your site requires an upstream to an organizational or public distribution.
- You would like to preserve the site's existing git history.
- Your site is running Drupal 8.

Import code, database, and files after creating the site using a combination of command-line tools (git, mysql-cli, and rsync) or with Git and the Site Dashboard's workflow tool. See [Migrate to Pantheon: Manual Site Import](/docs/articles/sites/migrate/manual-site-import) for detailed instructions.

### Create Single-file Archives
Migrations using the importer: sites that can be packaged with a total archived size less than 500MB are able to use single-file archives during the import process. You can create these archives with [Drush](/docs/articles/sites/migrate/export-an-existing-drupal-site#create-archive-using-drush) or [Backup and Migrate](/docs/articles/sites/migrate/export-an-existing-drupal-site#create-archive-using-backup-and-migrate) for Drupal sites, and [Plugins](/docs/articles/sites/migrate/export-an-existing-wordpress-site#export-wordpress-via-plugins) for WordPress.

### Create Separate Archives of Code, Database, and Files

If your site cannot be packaged as a single archive less than 500MB, or you need to use an upstream other than "Vanilla" Drupal or WordPress, you'll need to create separate archives of each part of your site. For step-by-step instructions, see [Exporting an Existing WordPress Site](/docs/articles/sites/migrate/export-an-existing-wordpress-site#manually-create-separate-site-archives) or [Exporting an Existing Drupal Site](/docs/articles/sites/migrate/export-an-existing-drupal-site#manually-create-archive).

## Move In

Having planned and prepared, your move should be an execution, rather than trial and error.

### Import the Site Archive from the Command Line
Single-file site archives less than 500MB, downloadable from a publicly accessible URL, can import from the command line with [Terminus](/docs/articles/local/cli/), the Pantheon command-line interface.

```nohighlight
terminus sites import [--site=<name>] [--label=<label>] [--org=<org>] [--url=<url>]
```

### Create and Name the Site

Click on the [**Create Site**](https://dashboard.pantheon.io/sites/create) button at either the user or organization dashboard. Enter a name and click **Create Site**.

### Choose a Start State
To use our site importer, select **Import Archives**.
To import after creation, select the intended upstream and Install it, and skip ahead to [import after creation](#import-after-creation)
### Import Archives

If your site is in a single-file archive, upload the file or provide the publicly-accessible URL for the importer to download, and click **Import Site** <div class="alert alert-info" role="alert">
<h4>Note</h4>
Dropbox URL's need to be modified so they end in <code>dl=1</code> instead of the default <code>dl=0</code>. This forces a download of your archive and avoids the Dropbox landing page.  </div>
 ![Single Archive Import](/source/docs/assets/images/single-archive-import.png)

If you prepared separate code, database, and files archives:

 - Click "Provide separate code, database, and files archives"
 - Import each archive via the corresponding file upload or URL field.
 - Click **Import Site** and wait for your site to complete.

When it completes, proceed to [test your site](#test-your-site).

### Import After Creation

At the new site's dashboard, clone the code repository with Git. Once cloned, synchronize the code locally and merge in favor of the Pantheon master branch for any conflicts. Then, push the code back up to your Pantheon site repository. For instructions on how to clone using Git, see [Starting with Git](/docs/articles/local/starting-with-git/).

If the database and/or files meet the file size limits described above, you can import them into the Dev environment using the **Workflow** > **Import tool**.
 ![Import tool for database and files](/source/docs/assets/images/import-tool-db-and-files.png)

If the database or is larger than 500MB, use the **Connection Info** panel to connect and import via a mysql client or using mysql-cli.

If the files archive is larger than 500MB, use an SFTP client or rsync to upload the uncompressed files.

Please see [Migrate to Pantheon: Manual Site Import](/docs/articles/sites/migrate/manual-site-import) for further details.
## Test Your Site
When the site's code, database, and files are all in place, verify everything is working as expected. At the Site Dashboard, click **Visit Development Site** for initial verification.

Further, we recommend:

 - Using the Status tool in the Site Dashboard
 - Enabling [New Relic](/docs/articles/sites/newrelic)
 - [Automated user acceptance testing](/docs/guides/automated-testing-wordpress-behat) with Behat, Selenium, or Casper.js
 - Load testing using tools like [Blazemeter](/docs/guides/load-testing-with-blazemeter/)
 - Manual [user acceptance testing](https://en.wikipedia.org/wiki/Acceptance_testing#User_acceptance_testing)

### WordPress Troubleshooting
If you see an error that references sessions similar to:
```
Warning: session_start(): user session functions not defined
```
It means you have some code (plugin or theme) that's using PHP Sessions, which require a plugin to  work on Pantheon. Read more on [WordPress and PHP Sessions](https://pantheon.io/docs/articles/wordpress/wordpress-and-php-sessions).


## Go Live
Read our [Going Live Article](/docs/articles/going-live) and follow the checklist provided.
