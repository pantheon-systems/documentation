---
title: Migrating Sites from WP Engine to Pantheon
description: Get all the details you need to know to successfully migrate your site away from WP Engine.
category:
  - WordPress
  - getting-started
  - developing
keywords: wordpress, pantheon, wpengine
---
The easiest way to migrate your site is to use the [Pantheon Migration Plugin](https://wordpress.org/plugins/bv-pantheon-migration/) created by BlogVault, but you can also migrate manually.

## Migrate Using the Pantheon Migration Plugin (Recommended)
1. Create and install a new WordPress site on Pantheon:
 - Choose **Create a new site** from your Pantheon Dashboard.
 - Name your site.
 - Select **Start from scratch**, and choose **WordPress**.
 - Click **Visit Development Site** and complete the installation process.
2. From your site's live environment on WP Engine, install and activate the [Pantheon Migration Plugin](https://wordpress.org/plugins/bv-pantheon-migration/) using the WordPress Dashboard.
3. Still on your site's Live environment on WP Engine, select **Pantheon Migration** from the WordPress Dashboard menu and enter the required information:
 - **Email**: This email address will receive status updates on the migration.
 - **Destination URL**: The Development URL of your newly created WordPress site on Pantheon (e.g. http://dev-sitename.pantheon.io).
 - **SFTP Server Address**: Host address found in your Pantheon Dashboard under SFTP Connection Info.  
 - **SFTP Username**: Username found in your Pantheon Dashboard under SFTP Connection Info.
 - **SFTP Password**: Password used to login to your Pantheon account.
4. Click **Migrate**. You will be redirected to BlogVault's secure migration service. You can close this tab or shut down your computer while the migration runs. You will receive an email when the migration has completed.  
5. Once completed, verify expected content on the Development URL of your Pantheon site.
6. Commit your migrated code on the Dev environment of the Site Dashboard on Pantheon.
7. Deploy to Test and Live when you're ready to [launch on Pantheon](/docs/articles/going-live).

<div class="alert alert-info">
<h4>Note</h4>
You may need to preserve logic in <code>wp-config.php</code> after the migration process has completed. For site's to work on the platform, <a href="https://github.com/pantheon-systems/wordpress/blob/master/wp-config.php">Pantheon's <code>wp-config.php</code></a> must be used.
</div>

## Migrate Manually

1. Create and download a backup point from WP Engine.
2. Unzip your site's backup point on your local machine.
3. Remove the WP Engine remnants. There are a few files you'll need to remove:
  - Drop-in plugins (e.g. `wpengine-common`) located at: `\wp-content\mu-plugins`
  - .gitattributes and .gitignore. from the root folder
  - If object caching is enabled, the `object-cache.php` file located in `/wp-content`
4. Replace existing `wp-config.php` with [Pantheon's `wp-config.php`](https://github.com/pantheon-systems/wordpress/blob/master/wp-config.php) file. Preserve necessary logic from your existing file.
5. Move the `mysql.sql` database out of the `wp-content` directory and into the project's root directory.
6. Compress the archive: Larger sites may need to [create separate archives](/docs/articles/sites/migrate/export-an-existing-wordpress-site#manually-create-separate-site-archives).
7. Import your site:
      - **Via the Importer tool**: The importer accepts either single-file site archives or separate archives of the code, database, and files (100MB for file uploads, 500MB for URL uploads). Import during the creation process of your new site on Pantheon. For details, see [Migrate to Pantheon: The Importer Tool](/docs/articles/sites/migrate/#plan-the-import). 
      - **Manual import**: Manually import the site outside of our importer tool if your site exceeds file size limit for uploads or if you need to preserve the site's existing Git history. For details, see [Migrate to Pantheon: Manual Site Import](/docs/articles/sites/migrate/manual-site-import).
8. Test your site once the code, database, and files are all in place. Verify everything is working as expected. At the Site Dashboard, click **Visit Development Site** for verification.

## Considerations

### Folder Permission Errors
If you receive any permission errors, verify your current PHP handler. You may need to switch it to SuPHP or DSO, depending on which one was running on the previous side.

### WP-Config.php File
WP Engine uses a modified `wp-config.php` file located in the root of your WP install. For the site to work on Pantheon, the existing file must be replaced with [Pantheon's `wp-config.php`](https://github.com/pantheon-systems/wordpress/blob/master/wp-config.php) file. Preserve necessary logic from your existing file.
