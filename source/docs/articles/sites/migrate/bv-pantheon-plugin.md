---
title: Migrating Sites with BlogVault
description: Get all the details you need to know to successfully migrate your site.
category:
  - WordPress
  - getting-started
  - developing
keywords: wordpress, pantheon
---
The easiest way to migrate your site to Pantheon from any other web host is to use the [Pantheon Migration Plugin](https://wordpress.org/plugins/bv-pantheon-migration/) created by BlogVault.  

## Migrate Using the Pantheon Migration Plugin

1. [Create a Pantheon account](https://dashboard.pantheon.io/register) or log in to your account.
2. Create and install a new WordPress site on Pantheon:
 - Choose **Create a new site** from your Pantheon Dashboard.
 - Name your site.
 - Select **Start from Scratch**, and choose **WordPress**.
 - Click **Visit Development Site** and complete the installation process.
3. Save your SFTP connection information.
![SFTP Connection Information](/source/docs/assets/images/sftp-connection.png)
4. Right click on the **Dev tab** and select **Copy Link Address**.
5. Go to your web host (source site), and install and activate the [Pantheon Migration Plugin](https://wordpress.org/plugins/bv-pantheon-migration/). BlogVault automatically installs the [WordPress Native PHP Sessions plugin](https://wordpress.org/plugins/wp-native-php-sessions/) during the migration. Read more about [PHP sessions](https://pantheon.io/docs/articles/wordpress/wordpress-and-php-sessions/) on Pantheon.
6. Enter your email address, Pantheon SFTP credentials, and Dev site URL you saved earlier.
![BlogVault Plugin](/source/docs/assets/images/bv-details.png)
7. Start the migration! You will get an email when the migration begins and another when it completes.

If the migration is not successful, contact migrations@pantheon.io and include a link to the Site Dashboard and any details you can provide, such as where you are migrating the site from. We will help troubleshoot up to five migrations with issues arising from the Pantheon Migrate plugin.
