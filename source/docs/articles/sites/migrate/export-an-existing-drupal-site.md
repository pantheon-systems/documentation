---
title: Export an Existing Drupal Site
description: Detailed information on how to prepare and export your existing Drupal site for migration to Pantheon.
category:
  - drupal
keywords: import, importing site, pantheon, new site, drupal, export, export drupal, drupal archive, archive
---

There are three major components of a Drupal site:

1. **Codebase** - all executable code, including core, custom and contrib modules, plugins and themes, etc.
2. **Database** - contains the content of the site and some site configurations.
3. **Files** - anything under sites/default/files. This houses a combination of uploaded content from site users, along with generated stylesheets, aggregated scripts, image styles, etc.

In order to successfully migrate your Drupal site to Pantheon, you must provide all major components in an archive. You can create a site archive via [Drush](#create-archive-using-drush) or [manually](#manually-create-archive) by following the instructions below.

## Prepare Your Site For Export

When preparing a site for export, there are a few best practices to follow:

* **Put the source site into Drupal maintenance mode** by going to Configuration > Development > Maintenance. This prevents the contents of your database from getting out of sync while you’re exporting.
* **Clear all Drupal caches**. This removes unnecessary and out-of-date files from both the database and your filesystem, which will save a lot of time and valuable space.
* Take a look at your codebase and **remove any non-Drupal code from your site** that you aren’t planning on running on Pantheon.
* If you’ve been using the database for things other than Drupal, you should **drop or skip any unnecessary or unrelated database tables** that your site doesn’t need.

To log back into your imported site that is in maintenance mode, just go to /user/login and login as UID 1 (the first administrative user).

<div class="alert alert-danger" role="alert"><strong>Warning: </strong>Importing automatically upgrades to the latest version of core. It's a best practice to keep core up-to-date to benefit from security and bug fixes, but if you use a site or distribution that relies on an outdated version of core, you may experience incompatibilities. If you experience issues, see the troubleshooting documentation for your <a href="https://codex.wordpress.org/Updating_WordPress#Troubleshooting">WordPress</a> or <a href="https://www.drupal.org/troubleshooting"> Drupal</a> upstream.</div>

## Create Archive Using Backup and Migrate
Create single-file archives for sites hosted elsewhere or locally with the [Backup and Migrate](https://www.drupal.org/project/backup_migrate) module. When creating the archive, choose to backup your **entire site (code, files, & DB)**. Download the archive and/or send it to NodeSquirrel for a publicly accessible URL.

## Create Archive Using Drush

One of the easiest ways to move an existing Drupal site to Pantheon is to create a [Drush archive file](http://drush.ws/#archive-dump).

### Before You Begin

There are a few things you'll need in order to make this work:

1. A Pantheon account with at least one free Dev site slot open. [Pantheon is free](https://dashboard.pantheon.io/register), and if you need an extra Dev site to try this out, just ask and we'll be happy to help.
2. A working local [Drush](/docs/articles/local/drupal-drush-command-line-utility/) installation that is up to date with 5.x or 6.x stable
3. Drush access to your existing Drupal site

### Generate a Drush Archive

Start by generating a Drush archive of your existing site. If you have Drush access to the site direct via the shell, use the archive-dump command:
```bash
drush archive-dump --destination=drush-archive.tar.gz
```
Executing it from the site root creates a file called drush-archive.tar.gz that's available via the public internet. If you have the file locally, you can put it on Dropbox, S3, or any number of other places. The important thing is that you have a Drush archive that can be downloaded via a URL.

<div class="alert alert-info" role="alert"><strong>Note: </strong>
If you cannot package your site as a single archive less than 500MB, you will need to create the archives <strong><a href="#manually-create-archive">manually</a></strong> and import the files separately.
</div>
For detailed instructions on importing your site archive, see [Migrate Sites to Pantheon](/docs/articles/sites/migrate#move-in).


## Manually Create Archive

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
<strong>Note</strong>:  The <code>files</code> directory has been omitted. Remember not to include it in your codebase.</div>

### Create a Code Archive

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
### Export the Database

This is optional, but recommended. The easiest method is to use the [mysqldump](http://dev.mysql.com/doc/refman/5.5/en/mysqldump.html) utility to export your archive, then compress the result with gzip.
```php
# Specify the destination folder.
TARGET=~/Desktop
# Create the database backup.
mysqldump -uUSERNAME -pPASSWORD DATABASENAME > $TARGET/db.sql
# Compress the backup.
gzip $TARGET/db.sql
```
#### Table Prefixes

Pantheon injects the database configuration dynamically during bootstrap. In the PRESSFLOW\_SETTINGS variable, the appropriate database connection information is passed in based upon the environment (Dev/Test/Live).

You can technically use database prefixes, but Pantheon will not support database prefixes. As a best practice, allow Pantheon to populate your database configuration settings. If you need a local configuration included in your settings.php, see [settings.php](/docs/articles/drupal/configuring-settings-php).

### Export Files

This is optional, but recommended. Export a tar.gz or .zip file of your files directory, which was intentionally omitted from the codebase import. These files are not tracked in Git; instead, they are stored in Valhalla, our network file system.
```php
TARGET=~/Desktop
SOURCE=~/Projects/mysite
cd $SOURCE/sites/default/files
tar -czf $TARGET/files.tar.gz .
```
### Prepare Your Archive for Import
You now have three individual files that make one complete archive of your Drupal site. The import screen allows you to toggle between uploading your archive files or supplying a remote URL (e.g. Amazon S3, Dropbox, your existing server, etc.) to fetch the archives.

You can upload each of your archive files separately, or package the archives within a single file. The max file upload import size is 100MB total. URL imports are limited to 500MB per input.
s
<div class="alert alert-warning" role="alert">
<strong>Note</strong>: Modify Dropbox URLs to end in <code>dl=1</code> instead of the default <code>dl=0</code>. This forces a download of your archive and avoids the Dropbox landing page.  </div>

Only provide one `.sql` file; if multiple are present the import will fail.

## Next Steps
- [Migrate Sites to Pantheon](/docs/articles/sites/migrate#move-in)
- [Migrate to Pantheon: Manual Site Import](/docs/articles/sites/migrate/manual-site-import/)
