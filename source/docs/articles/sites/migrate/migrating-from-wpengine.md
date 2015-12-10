---
title: Migrating WordPress Sites from WP Engine to Pantheon
description: Get all the details you need to know to successfully migrate your site away from WP Engine.
category:
  - WordPress
  - getting-started
  - developing
keywords: wordpress, pantheon, wpengine
---

Manually migrating a site from WP Engine to Pantheon can be tricky, as you cannot use WP Engine’s backup feature to transfer your site. This is because the backup file excludes many of your site's files and directories. See the full list of [exclusions](https://wpengine.com/support/restore/).

The easiest way to migrate your site is to use the [Pantheon Migration Plugin](https://wordpress.org/plugins/bv-pantheon-migration/) created by BlogVault.

## Migrate Using the Pantheon Migration Plugin

1. You can install the plugin by uploading `bv-pantheon-migration` through the WordPress Plugins menu or to the `/wp-content/plugins/` directory.
2. After you've activated the plugin, click **Pantheon Migration** in the left navigation menu and enter the required information:
**Email**: This email address will receive status updates on your migration  
**Destination URL**: Your Pantheon address you are migrating to. For example: http://dev-sitename.pantheon.io  
**SFTP Server Address**: Enter the host address found in your Pantheon Dashboard under Connection Information.  
**SFTP Username**: Enter the SFTP username found in your Pantheon Dashboard under Connection Information.  
**SFTP Password**: This is the password you use to log in to your Pantheon Dashboard.  
3. Click **Migrate**. The plugin will automatically verify your SFTP credentials and notify you if any issues are found.
4. After the migration is complete, click the button to see the results of your migration and visit your Pantheon site.

## Manually Migrate from WP Engine

1. Create and download an archive of your site. Archives can be stored in a single file or as three separate files.
2. Unzip your site's codebase, files, and database.
3. Using FTP, download the `wp-content/uploads` directory from WP Engine.
4. Remove the WP Engine remnants. There are a few files you'll need to remove:
  - WP Engine menus in your WordPress Dashboard and the unnecessary files
  - mu-plugins folder, located at: `\wp-content\mu-plugins`
  - .gitattributes and .gitignore. from the root folder
  - object-cache.php file located in the `/wp-content` folder
  - mysql.sql located in the `/wp-content` folder
5. Compress the archive(s).
6. Import your site:
      - **Via the Importer tool**: The importer accepts either single-file site archives or separate archives of the code, database, and files. It accepts file uploads up to 100MB and can download publicly-accessible archives up to 500MB. Acceptable file types include tar, zip, or gzip. File size limits are per archive. Providing three files instead of one effectively increases the entire site import size limit to 1.5GB (500MB code, 500MB database, 500MB files).
      - **Manual import**: Manually import the site outside of our importer tool if your site:
        - exceeds file size limit for uploads
        - needs to preserve the site's existing Git history
        - is running Drupal 8
        Import code, database, and files after creating the site using a combination of command-line tools (git, mysql-cli, and rsync) or with Git and the Site Dashboard's workflow tool. See [Migrate to Pantheon: Manual Site Import](/docs/articles/sites/migrate/manual-site-import) for detailed instructions.
7. Test your site. When the site's code, database, and files are all in place, verify everything is working as expected. At the Site Dashboard, click **Visit Development Site** for verification.

## Considerations

### Folder Permission Errors
If you receive any permission errors, verify your current PHP handler. You may need to switch it to SuPHP or DSO, depending on which one was running on the previous side.

### WP-Config.php File
WP Engine uses a modified `wp-config.php` file located in the root of your WP install, so you may need to generate a new one. You can do this with the [wp-config.php Generator](https://generatewp.com/wp-config/).
