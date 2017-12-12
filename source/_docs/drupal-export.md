---
title: Export an Existing Drupal Site
description: Detailed information on how to prepare and export your existing Drupal site for migration to Pantheon.
tags: [export]
categories: [drupal]
---
In most situations, you shouldn't need to manually export your Drupal site in order to migrate to Pantheon. Follow the recommended process within [Migrate Sites to Pantheon](/docs/migrate/), which uses `drush ard`.		

The following scenarios are exceptions to the recommended process and require [manually migrating](https://pantheon.io/docs/migrate-manual/) the site:

* **Large Drupal Site Archive**: Site archive is greater than the guided migration import limit of 500MB.
* **Preserve Git History**: You'd like to preserve your site's existing Git commit history.
* **Debug Failed Migration**: It can be helpful to migrate your code, database, and files separately to help debug edge-cases that are not supported through guided migration.

Prepare your site for manual migration by following the export methods described below.

## Components of a Drupal Site
There are three major components of a Drupal site:

1. **Codebase** - all executable code, including core, custom and contrib modules, plugins and themes, etc.
2. **Database** - contains the content of the site and some site configurations.
3. **Files** - anything under sites/default/files. This houses a combination of uploaded content from site users, along with generated stylesheets, aggregated scripts, image styles, etc.

In order to successfully migrate your Drupal site to Pantheon outside of the recommended migration process, you must provide all major components.

## Prepare Your Site For Export

When preparing a site for export, there are a few best practices to follow:

* **Put the source site into Drupal maintenance mode** by going to Configuration > Development > Maintenance. This prevents the contents of your database from getting out of sync while you’re exporting.
* **Clear all Drupal caches**. This removes unnecessary and out-of-date files from both the database and your filesystem, which will save a lot of time and valuable space.
* Take a look at your codebase and **remove any non-Drupal code from your site** that you aren’t planning on running on Pantheon.
* If you’ve been using the database for things other than Drupal, you should **drop or skip any unnecessary or unrelated database tables** that your site doesn’t need.

## Create Code Archive
Your codebase is required to import your site into Pantheon, as it is used to create the initial code repository. This archive should include your entire Drupal codebase, including modules, themes, installation profiles, libraries, etc.  

The code archive should not include the "files" directory (e.g. sites/default/files) or any other static assets that you do not want tracked in version control.

The code archive should include the following directories:

    ├── includes
    ├── index.php
    ├── misc
    ├── modules
    ├── profiles
    ├── scripts
    ├── sites
        └── all
           ├── modules
           └── themes
        └── default
           └── settings.php
    └── themes

<div class="alert alert-info" role="alert">
  <h4 class="info">Note</h4>
  <p>The <code>files</code> directory has been omitted. Remember not to include it in your codebase.</p>
</div>

Create an archive that is stored outside of your Drupal site root that contains only the executable code associated with your site and skips the contents of sites/default/files.
```php
# Specify the destination folder.
TARGET=~/Desktop
# Specify the source folder.
SOURCE=~/Projects/mysite
# Change directory to the source folder.
cd $SOURCE
# Create an archive that excludes sites/default/files.
tar -czf $TARGET/drupal.tar.gz --exclude=sites/default/files* .
```
## Create Database Archive

This is optional, but recommended. The easiest method is to use the [mysqldump](https://dev.mysql.com/doc/refman/5.5/en/mysqldump.html) utility to export your archive, then compress the result with gzip.
```php
# Specify the destination folder.
TARGET=~/Desktop
# Create the database archive.
mysqldump -uUSERNAME -pPASSWORD DATABASENAME > $TARGET/db.sql
# Compress the archive.
gzip $TARGET/db.sql
```
### Table Prefixes

Pantheon injects the database configuration dynamically during bootstrap. In the PRESSFLOW\_SETTINGS variable, the appropriate database connection information is passed in based upon the environment (Dev/Test/Live).

You can technically use database prefixes, but Pantheon will not support database prefixes. As a best practice, allow Pantheon to populate your database configuration settings. If you need a local configuration included in your settings.php, see [settings.php](/docs/settings-php).

## Create Files Archive

This is optional, but recommended. Export a tar.gz or .zip file of your files directory, which was intentionally omitted from the codebase import. These files are not tracked in Git; instead, they are stored in Valhalla, our network file system.
```php
TARGET=~/Desktop
SOURCE=~/Projects/mysite
cd $SOURCE/sites/default/files
tar -czf $TARGET/files.tar.gz .
```

## Next Steps
- [Migrate Sites to Pantheon: Manual Method Outside of the Pantheon Dashboard](/docs/migrate-manual/)
