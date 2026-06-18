---
contenttype: [partial]
categories: [migrate]
cms: [--]
product: [--]
integration: [--]
tags: [--]
reviewed: ""
---

## General FAQ

### Does the migration cause downtime?

No, there is no downtime expected as part of the migration process. Performance implications to a live site are similar to running a backup for the site.

### Why doesn't my site archive import correctly from Dropbox?

Change the end of Dropbox URLs from `dl=0` to `dl=1` so we can import your site archive properly. See the Dropbox documentation: [How do I force a file or folder to download or render on dropbox.com?](https://help.dropbox.com/share/force-download)

### Is the MySQL MyISAM engine supported?

No. If any of your database tables are using the MyISAM engine, you'll need to [convert them to InnoDB](/guides/mariadb-mysql/myisam-to-innodb).

### Can I use multiple SQL files in the archive?

No. The import will fail if multiple SQL files are present. Only provide one `.sql` file per site archive.

### Can I use multiple settings.php files per site archive?

No. The import will fail if multiple `settings.php` files are present. Pantheon does not need the `settings.php` file to import the site. To prevent import problems, it's best to remove `settings.php`.

### How do I migrate a local site to Pantheon?

Guided Migration does not support local sites. WordPress users should [manually migrate](/migrate-manual).
