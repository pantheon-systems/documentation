---
title: Migrating Sites from Other Hosts
description: General instructions for preparing and importing sites to Pantheon.
category:
- getting-started
---
## Overview

Migrating a website from another environment is a complex task. Whether it is running locally, on a shared host, or on a cluster of virtual machines at an infrastructure-as-a-service provider, The goal is the same. Move to Pantheon and enjoy the freedom to build awesome sites..

Your site migration has four phases. You’ll package your site, import it, test it out, and then change DNS and go live.

Note: We're revising our migration documentation. Our existing import documents include:

 - [Importing and Existing Site to Pantheon](/docs/articles/users/importing-an-existing-site)
 - [Importing a Large Site](/docs/articles/users/importing-a-large-site)
 - [Importing Drush Archives with Terminus](/docs/articles/users/importing-drush-site-archives-with-terminus)
 - [Importing WordPress Sites](/docs/articles/wordpress/importing-a-wordpress-site/)
 - [Clone a Drupal Site using Drush](/docs/articles/users/clone-a-drupal-site-using-drush)
 - [Clone a WordPress Site with Duplicator Plugin](/docs/articles/wordpress/clone-a-wordpress-site-with-duplicator-plugin)

## Pack Up

In this phase, you will create an archive of your site. Archives can be stored in single files or as three separate files. You’ll need to package up your:

- **Codebase** - all executable code, including Core, custom and contrib modules, plugins and themes, etc.

- **Database** - contains the content of the site and some site configurations.

- **Files** - anything in `sites/default/files` in Drupal or `wp-content/uploads` in WordPress. This houses a combination of uploaded content from site users, along with generated stylesheets, aggregated scripts, image styles, etc.

### Evaluate Your Site

1. Review your codebase. Are you running another application in addition to WordPress or Drupal?
2. Measure your database size
3. Locate your non-version-controlled static assets.
4. Review your logs.

### Prepare Your Site For Export

When preparing a site for export, there are a few best practices to follow:

* **Put the source site into maintenance mode** by going to Configuration > Development > Maintenance. This will prevent the contents of your database from getting out of sync while you’re exporting.
* **Clear all caches**. This will remove unnecessary and out-of-date files from both the database and your filesystem, which will save a lot of time and valuable space.
* Take a look at your codebase and **remove any non-core code from your site** that you aren’t planning on running on Pantheon.
* If you’ve been using the database for things other than Drupal or WordPress, you should **drop or skip any unnecessary or unrelated database tables** that your site doesn’t need.

### Create Single-file Archives
If your site can be packaged with a total archived size less than 500MB, then you can import that single file to create your site.
Drupal archives created with [drush archive dump](http://drushcommands.com/drush-6x/archive/archive-dump) are known to work when imported during site creation.
<!--@TODO: Test archives created with [Backup and Migrate](https://www.drupal.org/project/backup_migrate).-->

WordPress archives created with [Duplicator](https://wordpress.org/plugins/duplicator/) are known to work when imported during site creation.
<!--@TODO: Test archives created with BackupBuddy-->
<!--@TODO: Identify other backup creation solutions for WordPress.-->

### Create Separate Archives of Code, Database, and Files

If your site cannot be packaged as a single archive less than 500MB, or you need to use an upstream other than "Vanilla" Drupal or WordPress, you'll need to create separate archives of each part of your site.

#### Export Your Executable Code

The codebase of your application consists of  its **Core** plus any custom or community-contributed extensions (modules, plugins, and themes), libraries, and other static files you need in version control, such as static landing pages.

Do not include the "files" directory (Drupal’s sites/default/files or WordPress’s wp-content/uploads) or any other static assets that should not be tracked in version control. You will archive and upload these files separately.

Retrieve your code as you see fit. Log into your estranged host’s system and download via an SFTP client, through CPanel, or with the SSH from the command line.


#### Create a Code Archive

Create an archive that is stored outside of your Drupal site root that contains only the executable code associated with your site and skips the contents of sites/default/files. You may need to modify the lines below to match the directories on your system.
```
1. Specify the destination folder.
TARGET=~/Desktop
2. Specify the source folder.
SOURCE=~/Projects/mysite
3. Change directory to the source folder.
cd $SOURCE
4. Create an archive that excludes sites/default/files.
tar -czf $TARGET/drupal.tar.gz --exclude=sites/default/files* .
```
#### Export the Database

This is optional, but recommended. The easiest method is to use the [mysqldump](http://dev.mysql.com/doc/refman/5.5/en/mysqldump.html) utility to export your archive, then compress the result with gzip.

```  
1. Specify the destination folder.
TARGET=~/Desktop
2. Create the database backup.
mysqldump -uUSERNAME -pPASSWORD DATABASENAME > $TARGET/db.sql
3. Compress the backup.
gzip $TARGET/db.sql
```

<!--@TODO: test/document phpmyadmin dumps, ssh source-->

#### Table Prefixes

Pantheon injects the database configuration dynamically during bootstrap. In Drupal's, `PRESSFLOW\_SETTINGS` variable, the appropriate database connection information is passed in based upon the environment (Dev/Test/Live).

For this reason, we do not support the use of database table prefixes. As a best practice, allow Pantheon to populate your DB configuration settings. If you need a local configuration included in your `settings.php`, see [settings.php](/source/docs/articles/drupal/configuring-settings-php).

#### Export Files

This is optional, but recommended. Export a tar.gz or .zip file of your files directory, which was intentionally omitted from the codebase import. These files are not tracked in Git; instead, they will be stored in Valhalla, our network file system.

```
TARGET=~/Desktop
SOURCE=~/Projects/mysite
cd $SOURCE/sites/default/files
tar -czf $TARGET/files.tar.gz .
```


## Move In

Importing your site to the platform ranges from a simple, single file upload during creation to a more-complicated process for sites with large codebases, databases, and file systems. Either way, you can do it all from the command line.

### Import Archives

In the dashboard, if your site archive is smaller than 100MB, you can upload it during site creation. If it is less than 500MB, you can post it at a publicly-accessible URL and provide that at the same step in the process.

Using Terminus, you can import archives with:
```
terminus sites create [--product=<productid>] \
[--name=<name>] \
[--label=<label>] \
[--org=<org>] \
[--import=<url>]
```

In the dashboard, you create a new site and select **Import a site** when asked to choose a Start State.

![Choose your start state](/source/docs/assets/images/choose-your-start-state.png)

Next, you'll need to determine if your imports will be via one archive, or multiple. By default, you have the option to give a single archive for your entire import.

![Single Archive Import](/source/docs/assets/images/single-archive-import.png)

Selecting the link to provide separate code, files, and database archives will give you the option to import each individually via an upload or URL field.

### Distributions

If your site uses a distribution powered by an alternate upstream, such as Commerce Kickstart, you'll want to create a new site instead of using the import an existing site tool. This will allow you to get the upstream's updates on your site as they become available.

First, choose your distribution and visit your site's dashboard once it's been created. You'll need to clone your new site using Git. Once cloned, synchronize the code locally and merge in favor of the Pantheon master branch for any conflicts. Then, push the code back up to your Pantheon site repository. For instructions on how to clone using Git, see [Starting with Git](/docs/articles/local/starting-with-git/).

Finally, use the import tools within your Pantheon site's dashboard to import your database and site files into the Dev environment (Workflow>>Import).

![Import tool for database and files](/source/docs/assets/images/import-tool-db-and-files.png)

## Test Your Site

We advocate using a behavioral testing framework to automate user acceptance testing. Please test your site on the platform. We recommend:
 - Using the Launch Check tool in the site dashboard
 - Enabling our free New Relic Add on
 - Automated user acceptance testing with Behat, Selenium, or Casper.js
 - Load testing using tools like [Blazemeter](/docs/articles/sites/load-testing-with-blazemeter)
 - Logging in and clicking around your site.


## Go Live
Read our [Going Live Documentation](/docs/articles/going-live)
