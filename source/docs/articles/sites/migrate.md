---
title: Migrate Sites to Pantheon
description: General instructions for preparing and migrating remotely-hosted Drupal or WordPress sites to Pantheon.
category:
- getting-started
keywords: migrate, migrating site, migrate from remote host, migrate existing site, migrate from other host, migrate from another host, how to migrate an existing site, alternate host, another host, migration, migrations, migrates, move site to pantheon, move from remote host, move from current host, move hosts, changing hosting providers, how to move hosting to pantheon
---
Migrating a website from another environment is a complex task. Whether it is running locally, on a shared host, or on a cluster of virtual machines at an infrastructure-as-a-service provider, The goal is the same: move to Pantheon and enjoy the freedom to build awesome sites.

Your site migration has four phases. You’ll package your site, import it, test it out, and then change DNS and go live.


## Pack Up

In this phase, you will create an archive of your site. Archives can be stored in single files or as three separate files. You’ll need to package up your:

- **Codebase** - all executable code, including Core, custom and contrib modules, plugins and themes, etc.

- **Database** - contains the content of the site and some site configurations.

- **Files** - anything in `sites/default/files` in Drupal or `wp-content/uploads` in WordPress. This houses a combination of uploaded content from site users, along with generated stylesheets, aggregated scripts, image styles, etc.

### Evaluate Your Site

1. Review your codebase. Are you running another application in addition to WordPress or Drupal?
2. Measure your database size.
3. Locate your non-version-controlled static assets.
4. Review your logs.

### Prepare Your Site For Export

When preparing a site for export, there are a few best practices to follow:

* **Put the source site into maintenance mode** by going to Configuration > Development > Maintenance. This will prevent the contents of your database from getting out of sync while you’re exporting.
* **Clear all caches**. This will remove unnecessary and out-of-date files from both the database and your filesystem, which will save a lot of time and valuable space.
* Take a look at your codebase and **remove any non-core code from your site** that you aren’t planning on running on Pantheon.
* If you’ve been using the database for things other than Drupal or WordPress, you should **drop or skip any unnecessary or unrelated database tables** that your site doesn’t need.


### Create Single-file Archives
Site's that can be packaged with a total archived size less than 500MB are able to use single-file archives during the import process. These archives can be created with [drush](/docs/articles/drupal/prepare-drupal-for-export#create-archive-using-drush) for Drupal sites and  [Plugins](/docs/articles/wordpress/export-an-existing-wordpress-site#export-wordpress-via-plugins) for WordPress.
<!--@TODO: Test archives created with [Backup and Migrate](https://www.drupal.org/project/backup_migrate).-->
<!--@TODO: Test archives created with BackupBuddy-->
<!--@TODO: Identify other backup creation solutions for WordPress.-->



### Create Separate Archives of Code, Database, and Files

If your site cannot be packaged as a single archive less than 500MB, or you need to use an upstream other than "Vanilla" Drupal or WordPress, you'll need to create separate archives of each part of your site. For step-by-step instructions, see [Exporting an Existing WordPress Site](/docs/articles/wordpress/export-an-existing-wordpress-site#manually-create-separate-site-archives) or [Exporting an Existing Drupal Site](/docs/articles/drupal/prepare-drupal-for-export#manually-create-archive).

## Move In

Importing your site to the platform ranges from a simple, single file upload during creation to a more-complicated process for sites with large codebases, databases, and file systems.

<div class="alert alert-danger" role="alert"><strong>Warning: </strong>Importing automatically upgrades to the latest version of core. It's a best practice to keep core up-to-date to benefit from security and bug fixes, but if you use a site or distribution that relies on an outdated version of core, you may experience incompatibilities. If you experience issues, see the troubleshooting documentation for your <a href="https://codex.wordpress.org/Updating_WordPress#Troubleshooting">WordPress</a> or <a href="https://www.drupal.org/troubleshooting"> Drupal</a> upstream.</div>

### Import Archives in the Pantheon Dashboard

If your site archive is smaller than 100MB, you can upload the file directly during site creation. If it is less than 500MB, you can post it at a publicly-accessible URL and provide that at the same step in the process.

<div class="alert alert-warning" role="alert">
<strong>Note</strong>: Dropbox URL's need to be modified so they end in <code>dl=1</code> instead of the default <code>dl=0</code>. This forces a download of your archive and avoids the Dropbox landing page.  </div>

#### Add and Name a Site

After you have created an account, you can log in and will be directed to your Dashboard. Click **Add a site**. You will first be prompted to name the site. The only valid characters are letters, numbers, and dashes. Enter a name and click **Create Site**.
![](/source/docs/assets/images/desk_images/247523.png)
You will then have a short wait while Pantheon creates and allocates the resources for your site's environments. This takes only a few minutes under normal circumstances.
![](/source/docs/assets/images/desk_images/247524.png)
#### Choose a Start State
You now have several options. Rather than start with one of our preconfigured start states, we will import our code, database, and files.

Select **Import manually**.<br />
![](/source/docs/assets/images/desk_images/247521.png)  

Next, you'll need to determine if your imports will be via one archive, or multiple. By default, you have the option to give a single archive for your entire import.
 ![Single Archive Import](/source/docs/assets/images/single-archive-import.png)

Selecting the link to provide separate code, files, and database archives will give you the option to import each individually via an upload or URL field.


### Import Archive Package via Terminus
If your single-file site archives are hosted at a public URL, you can use [Terminus](https://github.com/pantheon-systems/cli), the Pantheon command-line tool, to create a site and import everything in one command.
<div class="alert alert-warning" role="alert">
<strong>Note</strong>: Dropbox URL's need to be modified so they end in <code>dl=1</code> instead of the default <code>dl=0</code>. This forces a download of your archive and avoids the Dropbox landing page.  </div>

```nohighlight
terminus sites create [--name=<name>] [--label=<label>] [--org=<org>] [--import=<url>]
```

### Distributions

If your site uses a distribution powered by an alternate upstream, such as Commerce Kickstart, you'll want to create a new site instead of using the import an existing site tool. This will allow you to get the upstream's updates on your site as they become available.

First, choose your distribution and visit your site's Dashboard once it's been created. You'll need to clone your new site using Git. Once cloned, synchronize the code locally and merge in favor of the Pantheon master branch for any conflicts. Then, push the code back up to your Pantheon site repository. For instructions on how to clone using Git, see [Starting with Git](/docs/articles/local/starting-with-git/).

Finally, use the import tools within your Pantheon site's Dashboard to import your database and site files into the Dev environment (Workflow > Import).
 ![Import tool for database and files](/source/docs/assets/images/import-tool-db-and-files.png)

## Test Your Site

We advocate using a behavioral testing framework to automate user acceptance testing. Please test your site on the platform. We recommend:

 - Using the Launch Check tool in the site Dashboard
 - Enabling [New Relic](/docs/articles/sites/newrelic)
 - [Automated user acceptance testing](/docs/guides/automated-testing-wordpress-behat) with Behat, Selenium, or Casper.js
 - Load testing using tools like [Blazemeter](/docs/guides/load-testing-with-blazemeter/)
 - Logging in and clicking around your site


## Go Live
Read our [Going Live Documentation](/docs/articles/going-live).
