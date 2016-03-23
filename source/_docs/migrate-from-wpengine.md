---
title: Migrating Sites from WP Engine to Pantheon
description: Get all the details you need to know to successfully migrate your site away from WP Engine.
categories: [wordpress]
tags: [migrate]
keywords: wordpress, pantheon, wpengine
---
We recommend migrating WordPress sites from another host using the [Pantheon Migration](https://wordpress.org/plugins/bv-pantheon-migration/) plugin, developed by [BlogVault](https://blogvault.net/). However, sites can also be migrated manually.

## Migrate Using the Pantheon Migration Plugin (Recommended)

1. [Create a Pantheon account](https://dashboard.pantheon.io/register) or log in to your account.
2. Create and install a new WordPress site on Pantheon:
 - Choose **Create a new site** from your Pantheon Dashboard.
 - Name your site.
 - Select **Start from Scratch**, and choose **WordPress**.
 - Click **Visit Development Site** and complete the installation process.
3. Save your SFTP connection information.
![SFTP Connection Information](/source/docs/assets/images/sftp-connection.png)
4. Right click on the **Visit Development Site** and select **Copy Link Address**.
5. Go to your web host (source site), and install and activate the [Pantheon Migration](https://wordpress.org/plugins/bv-pantheon-migration/) plugin.
6. Enter your email address, Pantheon SFTP credentials, and Dev site URL you saved earlier.
![BlogVault Plugin](/source/docs/assets/images/bv-details.png)
7. Start the migration! You will get an email when the migration begins and another when it completes.

If the migration is not successful, contact <migrations@pantheon.io> and include a link to the Site Dashboard and any details you can provide, such as where you are migrating the site from. We will help troubleshoot up to five migrations with issues arising from the Pantheon Migrate plugin.


## Migrate Manually

1. Create and download a backup point from WP Engine.
2. Unzip your site's backup point on your local machine.
3. Remove the WP Engine remnants. There are a few files you'll need to remove:
  - Drop-in plugins (e.g. `wpengine-common`) located at: `\wp-content\mu-plugins`
  - .gitattributes and .gitignore. from the root folder
  - If object caching is enabled, the `object-cache.php` file located in `/wp-content`
4. Replace existing `wp-config.php` with [Pantheon's `wp-config.php`](https://github.com/pantheon-systems/wordpress/blob/master/wp-config.php) file. Preserve necessary logic from your existing file.
5. Move the `mysql.sql` database out of the `wp-content` directory and into the project's root directory.
6. Compress the archive: Larger sites may need to [create separate archives](/docs/wordpress-export#manually-create-separate-site-archives).
7. Import your site:
      - **Via the Importer tool**: The importer accepts either single-file site archives or separate archives of the code, database, and files (100MB for file uploads, 500MB for URL uploads). Import during the creation process of your new site on Pantheon. For details, see [Migrate to Pantheon: The Importer Tool](/docs/migrate/#plan-the-import).
      - **Manual import**: Manually import the site outside of our importer tool if your site exceeds file size limit for uploads or if you need to preserve the site's existing Git history. For details, see [Migrate to Pantheon: Manual Site Import](/docs/manual-import).
8. Test your site once the code, database, and files are all in place. Verify everything is working as expected. At the Site Dashboard, click **Visit Development Site** for verification.

## Considerations
For additional details, see [Platform Considerations](/docs/platform-considerations).
### Folder Permission Errors
If you receive any permission errors, verify your current PHP handler. You may need to switch it to SuPHP or DSO, depending on which one was running on the previous side.

### WP-Config.php File
WP Engine uses a modified `wp-config.php` file located in the root of your WP install. For the site to work on Pantheon, the existing file must be replaced with [Pantheon's `wp-config.php`](https://github.com/pantheon-systems/wordpress/blob/master/wp-config.php) file. Preserve necessary logic from your existing file.
