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
8. Select **Generate Machine Token** and login when prompted:

 ![Authentication BlogVault migration](/source/docs/assets/images/migration-authentication-prompt.png)

  Attempts to login with Google will fail if your organization uses Single Sign-On, resulting in the following error:

 ![Migration Authentication Error](/source/docs/assets/images/migration-authentication-error.png)

 For details, see [Single Sign-On for Pantheon Organizations](/docs/sso-organizations/#troubleshootin).

9. Select **Install on /wp-admin** to install and activate the plugin on your existing site. Keep the Pantheon Dashboard tab open in your browser.

10. Copy the machine token from the Pantheon Dashboard, then navigate to **Pantheon Migration** within the WordPress Dashboard on your existing site. Paste the machine token and enter the site name.

11. Click **Migrate**. You will receive an email to the email address associated with your Pantheon account when the migration completes. Once the migration is complete select **Visit the Site Dashboard** from the Site Dashboard on Pantheon:

 ![Successful Migration BlogVault](/source/docs/assets/images/successful-site-migration-complete-blogvault.png)

If the migration is not successful, contact <migrations@pantheon.io> and include a link to the Site Dashboard and any details you can provide, such as where you are migrating the site from. We will help troubleshoot up to five migrations with issues arising from the Pantheon Migrate plugin.

<div class="alert alert-info" role="alert">
<h4>Note</h4>  
The <a href="https://wordpress.org/plugins/wp-native-php-sessions/">WordPress Native PHP Sessions</a> plugin is automatically installed during the migration process. For more details on this plugin, see <a href="/docs/wordpress-sessions/">WordPress and PHP Sessions</a>.
</div>

## See Also

- [Migrate to Pantheon: WordPress Site Networks](/docs/migrate-wordpress-site-networks)
- [Migrate to Pantheon: Manual Site Import](/docs/manual-import)
- [Platform Considerations](/docs/platform-considerations)
