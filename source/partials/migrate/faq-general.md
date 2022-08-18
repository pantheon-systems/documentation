## General FAQ

### Why doesn't my site archive import correctly from Dropbox?

Change the end of Dropbox URLs from `dl=0` to `dl=1` so we can import your site archive properly. See the Dropbox documentation: [How do I force a file or folder to download or render on dropbox.com?](https://www.dropbox.com/en/help/201)

### Is the MySQL MyISAM engine supported?

No. If any of your database tables are using the MyISAM engine, you'll need to [convert them to InnoDB](/myisam-to-innodb).

### Can I use multiple SQL files in the archive?

No. The import will fail if multiple SQL files are present. Only provide one `.sql` file per site archive.

### Can I use multiple settings.php files per site archive?

No. The import will fail if multiple `settings.php` files are present. Pantheon does not need the `settings.php` file to import the site. To prevent import problems, it's best to remove `settings.php`.
