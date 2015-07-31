---
title: Export an Existing WordPress Site
description: Detailed information on how to prepare and export your existing Drupal site for migration to Pantheon.
category:
  - wordpress
  - getting-started
keywords: import, importing site, new site, WordPress, export, export wordpress, wordpress archive, archive
---

There are three major components that make up a WordPress site:

1. **Codebase** - all executable code, plugins, themes, and so forth.

2. **Database** - contains the content of the site and some site configurations.

3. **Files** - anything under `wp-content/uploads`. This houses a combination of uploaded content from site users, along with generated stylesheets, aggregated scripts, image styles, etc.

In order to successfully migrate your WordPress site to Pantheon, all major components must be provided in an archive. You can create a site archive via [Plugins](#export-wordpress-via-plugins) or [manually](#manually-create-separate-site-archives) by following the instructions below.



## Export WordPress via Plugins
Popular plugins like [Duplicator](/docs/articles/wordpress/clone-a-wordpress-site-with-duplicator-plugin/) and [BackupBuddy](http://ithemes.com/codex/page/BackupBuddy) allow you to create single file archives quickly. For larger imports, pasting in a web-readable url (e.g. Dropbox secret link) will be much faster than manually uploading. Make sure a link goes directly to the file, not a landing page.

<div class="alert alert-warning" role="alert"> <strong>Note:</strong> Dropbox URL's need to be modified so they end in <code>dl=1</code> instead of the default <code>dl=0</code>. This forces a download of your archive and avoids the Dropbox landing page.</div>  
You can simply upload the archive file produced and Pantheon will do the rest.  If your site cannot be packaged as a single archive less than 500MB, you will need to create the archives [manually](#manually-create-separate-site-archives) and import the files separately.
<div class="alert alert-danger" role="alert">
<strong>Warning</strong>:  Archives cannot contain multiple <code>.sql</code> files, otherwise the import will fail.</div>
For detailed instructions on importing your site archive, see [Migrate Sites to Pantheon](/docs/articles/sites/migrate#move-in).

## Manually Create Separate Site Archives

Your codebase is required to import your site into Pantheon, as it will be used to create the initial code repository. This archive should include your entire WordPress codebase, including plugins, themes, configuration files etc.

The code archive must include the following files and directories:
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
Do not include the `wp-content/uploads` or any other static assets that shouldn't be tracked in Git version control. If your codebase contains static files they should be moved to the `wp-content/uploads` directory before export.

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
### Create WordPress Database Archive

This is optional, but recommended. The easiest method is to use the [mysqldump](http://dev.mysql.com/doc/refman/5.5/en/mysqldump.html) utility to export your archive, then compress the result with gzip.
```php
# Specify the destination folder.
TARGET=~/Desktop
# Create the database backup.
mysqldump -uUSERNAME -pPASSWORD DATABASENAME > $TARGET/db.sql
# Compress the backup.
gzip $TARGET/db.sql
```
### Export WordPress Files
Export a tar.gz or .zip file of your files directory, which was intentionally omitted from the codebase import. These files are not tracked in Git; instead, they will be stored in Valhalla, our network file system.
```php
TARGET=~/Desktop
SOURCE=~/Projects/mysite
cd $SOURCE/wp-content/uploads
tar -czf $TARGET/files.tar.gz .
```
## Prepare Your Archive for Import
You now have three individual files which combine to make one complete archive of your WordPress site. The import screen allows you to toggle between uploading your archive files or supplying a remote URL (e.g. Amazon S3, Dropbox, your existing server, etc.) from which the archives can be fetched.

You can upload each of your archive files separately, or by packaging the archives within a single file. The max file upload import size is 100MB total. URL imports are limited to 500MB per input.


<div class="alert alert-warning" role="alert">
<strong>Note</strong>: Dropbox URL's need to be modified so they end in <code>dl=1</code> instead of the default <code>dl=0</code>. This forces a download of your archive and avoids the Dropbox landing page.  </div>

Only one `.sql` file may be provided, if multiple are present the import will fail.

## Next Steps
- [Migrate Sites to Pantheon](/docs/articles/sites/migrate#move-in)
- [Importing a Large Site Outside of the Pantheon Dashboard](/docs/articles/sites/create/importing-a-large-site/)
