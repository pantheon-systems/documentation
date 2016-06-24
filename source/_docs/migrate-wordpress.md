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
 - Choose **Create new site** from your Pantheon Dashboard.
 - Name your site.
 - Choose **WordPress** as your site type.
 - Wait for WordPress to be deployed, and click **Visit Development Site** to complete the installation process.
3. [Create a Pantheon machine token](https://dashboard.pantheon.io/users/#account/tokens/create/). Make sure the token has a descriptive name, including the name of your site on Pantheon. Save this machine token somewhere safe!
 ![Create a machine token](/source/docs/assets/images/pantheon-create-machine-token.png)
 <div class="alert alert-info" role="alert">
 <h4>Note</h4>  
 Earlier versions of the <a href="https://wordpress.org/plugins/bv-pantheon-migration/">Pantheon Migration</a> plugin request SFTP details instead of a Pantheon machine token. If prompted for SFTP credentials, please upgrade the plugin to the latest release.
 </div>
4. Right click on the **Visit Development Site** and select **Copy Link Address**.
5. Go to your web host (source site), and install and activate the [Pantheon Migration](https://wordpress.org/plugins/bv-pantheon-migration/) plugin.
6. Enter your Pantheon Dev site URL and Pantheon machine token you saved earlier.
![BlogVault Plugin](/source/docs/assets/images/blogvault-setup-machine-token.png)
7. Start the migration! You will receive an email, to the email address associated with your Pantheon account, when the migration begins and another email when the migration completes.

If the migration is not successful, contact <migrations@pantheon.io> and include a link to the Site Dashboard and any details you can provide, such as where you are migrating the site from. We will help troubleshoot up to five migrations with issues arising from the Pantheon Migrate plugin.

<div class="alert alert-info" role="alert">
<h4>Note</h4>  
The <a href="https://wordpress.org/plugins/wp-native-php-sessions/">WordPress Native PHP Sessions</a> plugin is automatically installed during the migration process. For more details on this plugin, see <a href="/docs/wordpress-sessions/">WordPress and PHP Sessions</a>.
</div>

## See Also

- [Migrate to Pantheon: WordPress Site Networks](/docs/migrate-wordpress-site-networks)
- [Migrate to Pantheon: Manual Site Import](/docs/manual-import)
- [Platform Considerations](/docs/platform-considerations)
