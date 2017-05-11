---
title: Migrate Sites to Pantheon: Troubleshooting
description: Troubleshooting for migrating remotely-hosted Drupal or WordPress sites to Pantheon.
tags: [migratemanual]
categories: []
---

## Migrated Site Not Working as Expected
This section describes the causes of, and solution to the error messages that are displayed on the Site Dashboard if the migration fails to complete.

If your code, database, and files have completed migrating, but your site is not working as you'd expect, please review [Pantheon Platform Considerations](/docs/platform-considerations/). For example, if your site uses PHP short tags, you'll need to convert them to standard PHP tags.

Next, check [log files](https://pantheon.io/docs/logs/) to help identify and fix errors. Drupal or WordPress core is upgraded as part of migration, so you may have additional work to complete the upgrade.


### Could not import code, the import file does not appear to contain a valid code directory. ###

**Cause:** The migration tool could not find Drupal or WordPress core files. This prevents the migration from completing because the site modules, plugins, and/or themes cannot be imported. This error also occurs when multiple `settings.php` files are present.

**Solution:** Check that the archive includes a valid code root with all core files. If multiple `settings.php` files are present, delete them from the archive.
<!-- Nav tabs -->
<ul class="nav nav-tabs" role="tablist">
  <li role="presentation" class="active"><a href="#d8" aria-controls="d8" role="tab" data-toggle="tab">Drupal 8</a></li>
  <li role="presentation"><a href="#d7" aria-controls="d7" role="tab" data-toggle="tab">Drupal 7</a></li>
  <li role="presentation"><a href="#wp" aria-controls="wp" role="tab" data-toggle="tab">WordPress</a></li>
</ul>

<!-- Tab panes -->
<div class="tab-content">
  <div role="tabpanel" class="tab-pane active" id="d8">
  <p>Archives for Drupal 8 sites should include <code>index.php</code> at the code root level, along with the following directories:</p>
  <pre><code class="nohighlight">
  ├── core
  ├── index.php
  ├── modules
  ├── profiles
  ├── sites
      └── all
         ├── modules
         └── themes
      └── default
         └── settings.php
  └── themes
  </code></pre>
  </div>
  <div role="tabpanel" class="tab-pane" id="d7">
  <p>Archives for Drupal 7 sites should include <code>index.php</code> at the code root level, along with the following directories:</p>
  <pre><code class="nohighlight">
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
  </code></pre>
  </div>
  <div role="tabpanel" class="tab-pane" id="wp">
  <p>Archives for WordPress sites should include <code>index.php</code> at the code root level, along with the following directories:</p>
  <pre><code class="nohighlight">
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

  </code></pre>
  </div>
</div>


### Could not import database, unable to locate a database dump. ###

**Cause:** The migration tool could not locate a MySQL database dump within the archive.

**Solution:** Ensure that the archive contains a valid MySQL database dump.

### Multiple file directories found within the import archive. ###

**Cause:** The migration tool found more than one potential location for files within the archive. This error also occurs if Drupal's private files directory is not placed within the public directory (`sites/default/files/private`).

**Solution:** All files must be moved into the standard location for your site's CMS (`/sites/default/files` for Drupal, and `/wp-content/uploads` for WordPress). For more details, see [Non-Standard Files Locations](/docs/non-standard-file-paths).

### Multiple site directories found within the import archive. ###

**Cause:** The migration tool found a multisite installation, which is not supported on the platform.

**Solution:** Refer to [Extracting Sites from a Drupal Multisite](/docs/unwind-multisite/).

### Multiple database dumps found within the import archive. ###

**Cause:** The migration tool detected multiple MySQL database dumps within the archive.

**Solution:** Ensure that a single MySQL dump is included within the archive.

### Multiple code roots found within the import archive. ###

**Cause:**  The migration tool detected more than one potential location for the code root in the archive.

**Solution:** Ensure that a single code root is included within the archive.

## Frequently Asked Questions (FAQs)

### Why doesn't my site archive import correctly from Dropbox?
Change the end of Dropbox URLs from `dl=0` to `dl=1` so we can import your site archive properly. See the Dropbox documentation: [How do I force a file or folder to download or render on dropbox.com?](https://www.dropbox.com/en/help/201)

### How do I use the Pantheon Migrations plugin with a custom WordPress upstream?

If you'd like your existing WordPress site to get one-click updates from your [Custom Upstream](/docs/custom-upstream/), then the migration process will be slightly different. The general process will be the same as a vanilla WordPress site, but start with **Create New Site** instead of **Migrate existing site**. You'll need to manually generate a [machine token](/docs/machine-tokens/) to use with the [Pantheon Migrations plugin](https://wordpress.org/plugins/bv-pantheon-migration/).

### How should I migrate a site with a custom Drupal-based upstream?

If you'd like your existing Drupal site to get one-click updates from your [Custom Upstream](/docs/custom-upstream/), then the migration process will be slightly different. The general process will be the same as a vanilla Drupal site, but start with **Create New Site** instead of **Migrate existing site**. Then use `terminus site:import <site> <url>` to import your site archive, or follow the [Manual migration](/docs/migrate-manual) instructions if your site archive exceeds file size limits.

### What if I can't use drush on my existing Drupal site?

As an alternative to `drush` you can use the [Backup and Migrate](/docs/drupal-export#create-archive-using-backup-and-migrate) module. Also see [manually create an archive](/docs/drupal-export#manually-create-archive).

### Are database table prefixes supported?

See [WordPress known issue](/docs/wordpress-known-issues/#table-prefixes).

### Is the MySQL MyISAM engine supported?
No. If any of your database tables are using the MyISAM engine you'll need to convert them to InnoDB.

### Can I use multiple SQL files in the archive?

If multiple SQL files are present the import will fail. Only provide one `.sql` file per site archive.

### Can I use multiple settings.php files per site archive?
If multiple `settings.php` files are present the import will fail. Pantheon does not need the `settings.php` file to import the site. To prevent import problems, it's best to remove `settings.php`.

## See Also
 * [Migrate Sites to Pantheon](/docs/migrate)
 * [Log Files on Pantheon](/docs/logs/)
 * [Using the Pantheon Workflow](/docs/pantheon-workflow)
