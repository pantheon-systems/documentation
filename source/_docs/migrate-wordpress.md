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

The following scenarios are exceptions to the recommended process and require [manually migrating](/docs/migrate-manual) the site:

- Your site requires a custom upstream
- You want to preserve the site's existing Git history
- [WordPress Site Networks](/docs/migrate-wordpress-site-networks)
- You can't install a plugin on your existing site (e.g. WordPress.com)

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

9. Select **Install on /wp-admin** to install and activate the plugin on your existing site. Keep the Pantheon Dashboard tab open in your browser.

10. Copy the machine token from the Pantheon Dashboard, then navigate to **Pantheon Migration** within the WordPress Dashboard on your existing site. Paste the machine token and enter the site name.

11. Click **Migrate**. You will receive an email when the migration completes. After the migration is complete, select **Visit the Site Dashboard** from the Site Dashboard on Pantheon:

 ![Successful Migration BlogVault](/source/docs/assets/images/successful-site-migration-complete-blogvault.png)

If the migration is not successful, contact <migrations@pantheon.io> and include a link to the Site Dashboard and any details you can provide, such as where you are migrating the site from. We will help troubleshoot up to five migrations with issues arising from the Pantheon Migrate plugin.

<div class="alert alert-info" role="alert">
<h4>Note</h4>  
The <a href="https://wordpress.org/plugins/wp-native-php-sessions/">WordPress Native PHP Sessions</a> plugin is automatically installed during the migration process. For more details on this plugin, see <a href="/docs/wordpress-sessions/">WordPress and PHP Sessions</a>.
</div>

## Troubleshooting
### Cannot Login Using a Google Account
Attempts to login with Google will fail if your organization uses Single Sign-On, resulting in the following error:

![Migration Authentication Error](/source/docs/assets/images/migration-authentication-error.png)

Click your browser's back button to re-authenticate by entering your email address and sign in with your SAML Identity Provider. For details, see [Single Sign-On for Pantheon Organizations](/docs/sso-organizations/).

### Destination Site Not Found Error
If you are logged in with one identity and re-authenticate a different account, the site created will be associated with one account and the machine token with another, resulting in the following error:

![Destination site not found](/source/docs/assets/images/bv-destination-not-found-error.png)

Click your browser's back button from the Pantheon Dashboard and re-authenticate the user account for your current session.

## See Also

- [Migrate to Pantheon: WordPress Site Networks](/docs/migrate-wordpress-site-networks)
- [Migrate Sites to Pantheon: Manual Method](/docs/migrate-manual)
- [Platform Considerations](/docs/platform-considerations)
