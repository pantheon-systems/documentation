### How do I clone an existing Pantheon site?

You can make a copy of a WordPress site on Pantheon by following the [standard migration procedure](#migrate-existing-sites) described above. The procedure does not deviate for WordPress sites already hosted on Pantheon and is preferred since it's built into the Site Dashboard.

Drupal 7, Drupal 9, and WordPress sites can use Terminus to clone one Pantheon site to another from the command line. This method requires you to [install and authenticate Terminus](/terminus/install), then install the [Terminus Site Clone](https://github.com/pantheon-systems/terminus-site-clone-plugin) plugin.

Replace `<source>` and `<destination>` with target [site UUIDs](/sites/#site-uuid) or site names, and specify target development environment in place of `<env>` (dev or multidev):

```bash
terminus site:clone <source>.<env> <destination>.<env>
```

<Alert title="Note" type="info">

File and database backups that exceed 500MBs are not supported by this method. Sites that exceed this limit must be cloned manually. For details, see [Manually Migrate Sites to Pantheon](/migrate-manual).

</Alert>

### Does the WordPress migration cause downtime?

No, there is no downtime expected as part of the migration process. For details, see related [BlogVault resource (question #13)](https://blogvault.net/migration-using-blogvault-faq/). Performance implications to a live site are similar to running a backup for the site.

### How do I migrate a local site to Pantheon?

When asked for your current site URL, enter `https://example.com` and continue the migration procedure in the Site Dashboard.

<TabList>

<Tab title="WordPress" id="tab-1-id" active={true}>

  The Pantheon Migration plugin for WordPress does not support local sites. WordPress users should [manually migrate](/migrate-manual).

</Tab>

<Tab title="Drupal" id="tab-2-id">

Drupal users with access to Drush 8 or earlier can run the provided Drush command to generate an archive then upload it to a third party service (like [Dropbox](https://www.dropbox.com/) or [Google Drive](https://drive.google.com)) to continue the standard migration procedure. If Drush 8 is not available, or the archive file size exceeds 500MB you must [manually migrate](/migrate-manual).

</Tab>

</TabList>

### How long does the WordPress migration process take?

Most migrations are completed within two hours. The migration time depends solely on the size of your site, so be aware that it may take more or less time than estimated. We will send you an email once your migration is complete. If there are any issues with the migration, we will notify you by email.

### Why doesn't my site archive import correctly from Dropbox?

Change the end of Dropbox URLs from `dl=0` to `dl=1` so we can import your site archive properly. See the Dropbox documentation: [How do I force a file or folder to download or render on dropbox.com?](https://www.dropbox.com/en/help/201)

### How do I use the Pantheon Migrations plugin with a custom WordPress upstream?

If you'd like your existing WordPress site to get one-click updates from your [Custom Upstream](/custom-upstream), then the migration process will be slightly different.

1. The general process will be the same as a vanilla WordPress site, but start with **Create New Site** instead of **Migrate existing site**.

1. Name your new site, and be sure to add it to the organization with access to the Custom Upstream you want to use.

1. On the next page, choose your Custom Upstream, and complete the installation.

You can now proceed with the normal migration steps [outlined above](#migrate-existing-sites), starting at Step 8.

### How should I migrate a site with a custom Drupal-based upstream?

If you'd like your existing Drupal site to get one-click updates from your [Custom Upstream](/custom-upstream), then the migration process will be slightly different. The general process will be the same as a vanilla Drupal site, but start with **Create New Site** instead of **Migrate existing site**. Then use `terminus site:import <site> <url>` to import your site archive, or follow the [Manual migration](/migrate-manual) instructions if your site archive exceeds file size limits.

### What if I can't use drush on my existing Drupal site?

As an alternative to `drush` you can manually export and migrate. For details, see [Manually Migrate Sites to Pantheon](/migrate-manual).

### Are database table prefixes supported?

See [WordPress known issues](/wordpress-known-issues/#table-prefixes).

### Is the MySQL MyISAM engine supported?

No. If any of your database tables are using the MyISAM engine you'll need to [convert them to InnoDB](/myisam-to-innodb).

### Can I use multiple SQL files in the archive?

If multiple SQL files are present the import will fail. Only provide one `.sql` file per site archive.

### Can I use multiple settings.php files per site archive?

If multiple `settings.php` files are present the import will fail. Pantheon does not need the `settings.php` file to import the site. To prevent import problems, it's best to remove `settings.php`.

### How can I migrate from WP Engine?

Follow the [standard procedure for migrating WordPress sites to Pantheon](#migrate-existing-sites) as described above. Note that WP Engine blocks the Let's Encrypt challenge file, so you should schedule a [maintenance window](/guides/launch/domains/#maintenance-window) for HTTPS. If your migration fails, you can try the following workaround:

1. Create and download a backup point from WP Engine.

1. Unzip your site's backup point on your local machine.

1. Remove the WP Engine remnants. There are a few files you'll need to remove:
   - Drop-in plugins (e.g. `wpengine-common`) located at: `\wp-content\mu-plugins`
   - `.gitattributes` and `.gitignore` from the root folder
   - If object caching is enabled, remove the `object-cache.php` file located in `/wp-content`.

1. Replace existing `wp-config.php` with [Pantheon's `wp-config.php`](https://github.com/pantheon-systems/WordPress/blob/default/wp-config.php) file. Preserve necessary logic from your existing file.

1. Move the `mysql.sql` database out of the `wp-content` directory and into the project's root directory.

1. Follow the procedure to [manually migrate](/migrate-manual) your site.

