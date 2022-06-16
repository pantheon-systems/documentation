### How do I clone an existing Pantheon site?

<Partial file="migrate/faq-clone-wp.md" />

<Partial file="migrate/faq-clone-drupal.md" />

<Alert title="Note" type="info">

File and database backups that exceed 500MBs are not supported by this method. Sites that exceed this limit must be cloned manually. For details, see [Manually Migrate Sites to Pantheon](/migrate-manual).

</Alert>

### How do I migrate a local site to Pantheon?

When asked for your current site URL, enter `https://example.com` and continue the migration procedure in the Site Dashboard.

<TabList>

<Tab title="WordPress" id="tab-1-id" active={true}>

<Partial file="migrate/faq-local-wp.md" />

</Tab>

<Tab title="Drupal" id="tab-2-id">

<Partial file="migrate/faq-local-drupal.md" />

</Tab>

</TabList>

### Why doesn't my site archive import correctly from Dropbox?

Change the end of Dropbox URLs from `dl=0` to `dl=1` so we can import your site archive properly. See the Dropbox documentation: [How do I force a file or folder to download or render on dropbox.com?](https://www.dropbox.com/en/help/201)

### Is the MySQL MyISAM engine supported?

No. If any of your database tables are using the MyISAM engine you'll need to [convert them to InnoDB](/myisam-to-innodb).

### Can I use multiple SQL files in the archive?

If multiple SQL files are present the import will fail. Only provide one `.sql` file per site archive.

### Can I use multiple settings.php files per site archive?

If multiple `settings.php` files are present the import will fail. Pantheon does not need the `settings.php` file to import the site. To prevent import problems, it's best to remove `settings.php`.
