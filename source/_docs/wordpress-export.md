---
title: Export an Existing WordPress Site
description: Detailed information on how to prepare and export your existing WordPress site for migration to Pantheon.
tags: [export]
categories: [wordpress]
---
In most situations, you shouldn't need to manually export your WordPress site in order to migrate to Pantheon. Follow the recommended process within [Migrate Sites to Pantheon](/docs/migrate/), which uses the Pantheon Migration plugin.		

The following scenarios are exceptions to the recommended process and require [manually migrating](https://pantheon.io/docs/migrate-manual/) the site:		

* **Large Drupal Site Archive**: Site archive is greater than the guided migration import limit of 500MB.
* **Preserve Git History**: You'd like to preserve your site's existing Git commit history.
* **[WordPress Site Networks](/docs/migrate-wordpress-site-networks/)**
* **Plugin install unavailable on existing WordPress site**: For example, if your existing site is hosted on WordPress.com, you'll be unable to install the Pantheon Migrations plugin.
* **Debug Failed Migration**: It can be helpful to migrate your code, database, and files separately to help debug edge-cases that are not supported through guided migration.

Prepare your site for manual migration by following the export methods described below.

## Components of a WordPress Site

There are three major components of a WordPress site:

1. **Codebase** - all executable code, plugins, themes, and so forth.

2. **Database** - contains the content of the site and some site configurations.

3. **Files** - anything under `wp-content/uploads`. This houses a combination of uploaded content from site users, along with generated stylesheets, aggregated scripts, image styles, etc.

In order to successfully migrate your WordPress site to Pantheon outside of the recommended migration process, you must provide all major components.

## Create Code Archive

Your codebase is required to import your site into Pantheon, as it is used to create the initial code repository. This includes your entire WordPress codebase, including plugins, themes, configuration files, etc.

The codebase is comprised of the following files and directories:
```nohighlight
├── index.php
├── wp-activate.php
├── wp-config.php
├── wp-comments-post.php
├── wp-blog-header.php
├── wp-admin
├── wp-cron.php
├── wp-load.php
├── wp-links-opml.php
├── wp-includes
├── xmlrpc.php
├── wp-trackback.php
├── wp-signup.php
├── wp-settings.php
├── wp-mail.php
├── wp-login.php
├── wp-content
    ├── index.php
    ├── mu-plugins
    ├── themes
    ├── plugins
```

Do not include the `wp-content/uploads` or any other static assets that you do not want tracked in Git version control. If your codebase contains static files, move them to the `wp-content/uploads` directory before export.

```
# Specify the destination folder.
TARGET=~/Desktop
# Specify the source folder.
SOURCE=~/Projects/mysite
# Change directory to the source folder.
cd $SOURCE
# Create an archive that excludes `wp-content/uploads`.
tar -czf $TARGET/wordpress.tar.gz --exclude=wp-content/uploads* .
```
## Create Database Archive

This is optional, but recommended. The easiest method is to use the [mysqldump](https://dev.mysql.com/doc/refman/5.5/en/mysqldump.html) utility to export your archive, then compress the result with gzip.

```php
# Specify the destination folder.
TARGET=~/Desktop
# Create the database backup.
mysqldump -uUSERNAME -pPASSWORD DATABASENAME > $TARGET/db.sql
# Compress the backup.
gzip $TARGET/db.sql
```
## Create Files Archive
Export a tar.gz or .zip file of your files directory, which was intentionally omitted from the codebase import. These files are not tracked in Git; instead, they are stored in Valhalla, our network file system.

```php
TARGET=~/Desktop
SOURCE=~/Projects/mysite
cd $SOURCE/wp-content/uploads
tar -czf $TARGET/files.tar.gz .
```

## Next Steps
- [Migrate Sites to Pantheon: Manual Method Outside of the Pantheon Dashboard](/docs/migrate-manual/)


## See Also
* <a href="https://pantheon.io/resources/quickstart-guide-migrating-wordpress-site" target="blank">The Quickstart Guide to Migrating a WordPress Site <span class="glyphicons glyphicons-new-window-alt"></span></a>
