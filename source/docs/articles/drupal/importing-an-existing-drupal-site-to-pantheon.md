---
title: Importing an Existing Drupal Site to Pantheon
description: Detailed information on how to prepare and import your site to Pantheon.
category:
- drupal
- getting-started
keywords: drupal, import, importing, export, code, database, files, pantheon
---
The easiest way to import an existing Drupal site into Pantheon is to create a new site, and select **Import manually** when asked to choose a Start State.<br />
![](/source/docs/assets/images/desk_images/213957.png)  
Next, you'll need to upload your site code (required), user files (optional), and database (optional). For each component, you can choose between directly uploading (100 MB max) or providing a remote URL (500 MB max) to import an archive.  <br />
 ![](/source/docs/assets/images/desk_images/213971.png)​​

## Components of a Drupal Site

There are three major components that make up a Drupal site:

1. **Codebase** - all executable code, including Drupal, custom and contrib modules and themes, etc.
2. **Database** - contains the content of the site and some site configurations.
3. **Files** - anything under sites/default/files. This houses a combination of uploaded content from site users, along with generated stylesheets, aggregated scripts, image styles, etc.

## Prepare Your Site For Export

When preparing a site for export, there are a few best practices to follow:

* **Put the source site into Drupal maintenance mode** by going to Configuration > Development > Maintenance. This will prevent the contents of your database from getting out of sync while you’re exporting.
* **Clear all Drupal caches**. This will remove unnecessary and out-of-date files from both the database and your filesystem, which will save a lot of time and valuable space.
* Take a look at your codebase and **remove any non-Drupal code from your site** that you aren’t planning on running on Pantheon.
* If you’ve been using the database for things other than Drupal, you should **drop or skip any unnecessary or unrelated database tables** that your site doesn’t need.

To log back into your imported site that is in maintenance mode, just go to /user/login and login as UID 1 (the first administrative user).

## Export Your Executable Code

Your codebase is required to import your site into Pantheon, as it will be used to create the initial code repository. This archive should include your entire Drupal codebase, including modules, themes, installation profiles, libraries, etc.  

The code archive should not include the "files" directory (e.g. sites/default/files) or any other static assets that should not be tracked in version control.

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
<div class="alert alert-warning" role="alert">
<strong>Note</strong>: The <code>files</code> directory has been omitted. Remember not to include it in your codebase.</div>

## Create a Code Archive

Create an archive that is stored outside of your Drupal site root that contains only the executable code associated with your site and skips the contents of sites/default/files.
```php
# Specify the destination folder.
TARGET=~/Desktop
# Specify the source folder.
SOURCE=~/Projects/mysite
# Change directory to the source folder.
cd $SOURCE
# Create an archive that excludes sites/default/files.
tar -czf $TARGET/drupal.tar.gz --exclude=sites/default/files*.
```
## Export the Database

This is optional, but recommended. The easiest method is to use the [mysqldump](http://dev.mysql.com/doc/refman/5.5/en/mysqldump.html) utility to export your archive, then compress the result with gzip.
```php
# Specify the destination folder.
TARGET=~/Desktop
# Create the database backup.
mysqldump -uUSERNAME -pPASSWORD DATABASENAME > $TARGET/db.sql
# Compress the backup.
gzip $TARGET/db.sql
```
## Table Prefixes

Pantheon injects the database configuration dynamically during bootstrap. In the PRESSFLOW\_SETTINGS variable, the appropriate database connection information is passed in based upon the environment (Dev/Test/Live).

You can technically use DB prefixes, but Pantheon will not support database prefixes. As a best practice, allow Pantheon to populate your DB configuration settings. If you need a local configuration included in your settings.php, see [settings.php](/docs/articles/drupal/configuring-settings-php#LocalDatabaseConfigurationforDevelopment).


## Export Files

This is optional, but recommended. Export a tar.gz or .zip file of your files directory, which was intentionally omitted from the codebase import. These files are not tracked in Git; instead, they will be stored in Valhalla, our network file system.
```php
TARGET=~/Desktop
SOURCE=~/Projects/mysite
cd $SOURCE/sites/default/files
tar -czf $TARGET/files.tar.gz .
```
## Upload Archives to Pantheon

The import screen allows you to toggle between uploading a single-file archive created with [`drush ard`](http://drushcommands.com/drush-6x/archive/archive-dump) and providing three separate files for your code, database, and files. Each method will also alow you to toggle between uploading your archive files or supplying a remote _public_ URL (e.g. Amazon S3, Dropbox, your existing server, etc.) from which the archives can be fetched.  

The max file upload import size is 100MB per input. URL imports are limited to 500MB per input.

If you have a large database or a lot of files, you'll need to use the URL option. If you need to load more than 500MB of content, you'll need to use the data migration tools (e.g. [direct MySQL access](/docs/articles/local/accessing-mysql-databases), [rsync or SFTP for files](/docs/articles/local/rsync-and-sftp)) after your codebase is imported.

## Import With Terminus

If your single-file Drush archives are hosted at a public URL, you can use [terminus](https://github.com/pantheon-systems/cli), the Pantheon command-line tool, to create a site and import everything in one command.

In order to import a drush archive, use:
```bash
terminus sites create [--name=<name>] [--label=<label>] [--org=<org>] [--import=<url>]
```
