---
title: Migrating Sites from WP Engine to Pantheon
description: Get all the details you need to know to successfully migrate your site away from WP Engine.
categories: [wordpress]
tags: [migrate]
keywords: wordpress, pantheon, wpengine
---
We recommend migrating WordPress sites from another host using the [Pantheon Migration](https://wordpress.org/plugins/bv-pantheon-migration/) plugin, developed by [BlogVault](https://blogvault.net/).

The following scenarios are exceptions to the recommended process and require [manually migrating](/docs/manual-import) the site:

- Your site requires a custom upstream.
- You would like to preserve the site's existing Git history.
- [WordPress Site Networks](/docs/migrate-wordpress-site-networks)

## Migrate Your Site to Pantheon

From your Pantheon Dashboard:

1. Choose **Migrate Existing Site**.
2. Enter your current website URL.
3. Select **WordPress**.
4. Click **Continue**.
5. Name your new Pantheon site.
6. Select an organization for the site (optional).
7. Click **Create Site**.
8. Select **Generate Machine Token** and re-authenticate if prompted:

 ![Authentication BlogVault migration](/source/docs/assets/images/migration-authentication-prompt.png)

  Attempts to login with Google will fail if your organization uses Single Sign-On, resulting in the following error:

 ![Migration Authentication Error](/source/docs/assets/images/migration-authentication-error.png)

 For details, see [Single Sign-On for Pantheon Organizations](/docs/sso-organizations/#troubleshooting).

9. Select **Install on /wp-admin** to install and activate the plugin on your existing site. Keep the Pantheon Dashboard tab open in your browser.

10. Copy the machine token from the Pantheon Dashboard, then navigate to **Pantheon Migration** within the WordPress Dashboard on your existing site. Paste the machine token and enter the site name.

11. Click **Migrate**. You will receive an email when the migration completes. Once the migration is complete select **Visit the Site Dashboard** from the Site Dashboard on Pantheon:

 ![Successful Migration BlogVault](/source/docs/assets/images/successful-site-migration-complete-blogvault.png)

If the migration is not successful, contact <migrations@pantheon.io> and include a link to the Site Dashboard and any details you can provide, such as where you are migrating the site from. We will help troubleshoot up to five migrations with issues arising from the Pantheon Migrate plugin.

<div class="alert alert-info" role="alert">
<h4>Note</h4>  
The <a href="https://wordpress.org/plugins/wp-native-php-sessions/">WordPress Native PHP Sessions</a> plugin is automatically installed during the migration process. For more details on this plugin, see <a href="/docs/wordpress-sessions/">WordPress and PHP Sessions</a>.
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
6. Manually import the site following the process covered in [Migrate to Pantheon: Manual Site Import](/docs/manual-import).
8. Test your site once the code, database, and files are all in place. Verify everything is working as expected. At the Site Dashboard, click **Visit Development Site** for verification.

## Considerations
For additional details, see [Platform Considerations](/docs/platform-considerations).
### Folder Permission Errors
If you receive any permission errors, verify your current PHP handler. You may need to switch it to SuPHP or DSO, depending on which one was running on the previous side.

### WP-Config.php File
WP Engine uses a modified `wp-config.php` file located in the root of your WP install. For the site to work on Pantheon, the existing file must be replaced with [Pantheon's `wp-config.php`](https://github.com/pantheon-systems/wordpress/blob/master/wp-config.php) file. Preserve necessary logic from your existing file.
