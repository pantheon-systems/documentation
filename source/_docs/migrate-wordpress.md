---
title: Migrate to Pantheon: WordPress
description: Learn how to migrate WordPress sites to Pantheon using the Pantheon Migration plugin from BlogVault.
category:
  - WordPress
  - getting-started
  - developing
keywords: wordpress, pantheon
---
We recommend migrating WordPress sites from another host using the [Pantheon Migration](https://wordpress.org/plugins/bv-pantheon-migration/) plugin, developed by [BlogVault](https://blogvault.net/).

## Migrate Your Site to Pantheon

1. [Create a Pantheon account](https://dashboard.pantheon.io/register) or log in to your account.
2. Create and install a new WordPress site on Pantheon:
 - Choose **Create a new site** from your Pantheon Dashboard.
 - Name your site.
 - Select **Start from Scratch**, and choose **WordPress**.
 - Click **Visit Development Site** and complete the installation process.
3. Save your SFTP connection information.
![SFTP Connection Information](/source/docs/assets/images/sftp-connection-info.png)
4. Right click on the **Visit Development Site** and select **Copy Link Address**.
5. Go to your web host (source site), and install and activate the [Pantheon Migration](https://wordpress.org/plugins/bv-pantheon-migration/) plugin.
6. Enter your email address, Pantheon SFTP credentials, and Dev site URL you saved earlier.
![BlogVault Plugin](/source/docs/assets/images/bv-details.png)
7. Start the migration! You will get an email when the migration begins and another when it completes.

If the migration is not successful, contact <migrations@pantheon.io> and include a link to the Site Dashboard and any details you can provide, such as where you are migrating the site from. We will help troubleshoot up to five migrations with issues arising from the Pantheon Migrate plugin.

<div class="alert alert-info" role="alert">
<h4>Note</h4>  
The <a href="https://wordpress.org/plugins/wp-native-php-sessions/">WordPress Native PHP Sessions</a> plugin is automatically installed during the migration process. For more details on this plugin, see <a href="/docs/wordpress-sessions/">WordPress and PHP Sessions</a>.
</div>

## See Also

- [Migrate to Pantheon: WordPress Site Networks](/docs/migrate-wordpress-site-networks)
- [Migrate to Pantheon: Manual Site Import](/docs/manual-import)
- [Platform Considerations](/docs/platform-considerations)
