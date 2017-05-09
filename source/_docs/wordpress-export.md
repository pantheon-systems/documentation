---
title: Export an Existing WordPress Site
description: Detailed information on how to prepare and export your existing WordPress site for migration to Pantheon.
tags: [export]
categories: [wordpress]
---

The process of [manually migrating](/docs/migrate-manual/) a WordPress site to Pantheon requires a copy of your site code, files, and database. Depending on the limitations of your previous host, you may find it helpful to create archives files to copy locally before importing to Pantheon. This page covers how to create those archives.

## Archive Types

There are three major components of a WordPress site:

1. **Codebase** - all executable code, plugins, themes, and so forth.

2. **Database** - contains the content of the site and some site configurations.

3. **Files** - anything under `wp-content/uploads`. This houses a combination of uploaded content from site users, along with generated stylesheets, aggregated scripts, image styles, etc.

In order to successfully migrate your WordPress site to Pantheon outside of the recommended migration process, you must provide all major components.

## Codebase

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
### Create Code Archive
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
## Database

This is optional, but recommended. The easiest method is to use the [mysqldump](https://dev.mysql.com/doc/refman/5.5/en/mysqldump.html) utility to export your archive, then compress the result with gzip.

```php
# Specify the destination folder.
TARGET=~/Desktop
# Create the database backup.
mysqldump -uUSERNAME -pPASSWORD DATABASENAME > $TARGET/db.sql
# Compress the backup.
gzip $TARGET/db.sql
```
## Files
Export a tar.gz or .zip file of your files directory, which was intentionally omitted from the codebase import. These files are not tracked in Git; instead, they are stored in Valhalla, our network file system.

```php
TARGET=~/Desktop
SOURCE=~/Projects/mysite
cd $SOURCE/wp-content/uploads
tar -czf $TARGET/files.tar.gz .
```
## Next Steps

Depending on your previous hosting platform, you can use tools like `rsync` or SFTP to copy these archive files locally. Follow any of the guides below to manually migrate your site.

## See Also
* <a href="https://pantheon.io/resources/quickstart-guide-migrating-wordpress-site" target="blank">The Quickstart Guide to Migrating a WordPress Site <span class="glyphicons glyphicons-new-window-alt"></span></a>
- [Migrate Sites to Pantheon](/docs/migrate)
- [Migrate Sites to Pantheon: Manual Method Outside of the Pantheon Dashboard](/docs/migrate-manual/)
- [Migrate to Pantheon: WordPress Site Networks](/docs/wordpress-site-networks/)
