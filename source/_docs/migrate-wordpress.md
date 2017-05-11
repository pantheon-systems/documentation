---
title: Migrate to Pantheon: WordPress
description: Learn how to migrate WordPress sites to Pantheon using the Pantheon Migration plugin from BlogVault.
tags: [migrateguided]
categories: [wordpress]
---
We recommend migrating WordPress sites from another host using the [Pantheon Migration](https://wordpress.org/plugins/bv-pantheon-migration/) plugin, developed by [BlogVault](https://blogvault.net/).

The following scenarios are exceptions to the recommended process and require [manually migrating](/docs/migrate-manual) the site:

- You want to preserve the site's existing Git history
- [WordPress Site Networks](/docs/migrate-wordpress-site-networks)
- You can't install a plugin on your existing site (e.g. WordPress.com)
- [Your site doesn't have a public URL (e.g. a local installation) and it's archive exceeds 500MB.](#frequently-asked-questions)

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

 ![Authentication BlogVault migration](/source/docs/assets/images/dashboard/migration-authentication-prompt.png)

9. Select **Install on /wp-admin** to install and activate the plugin on your existing site. Keep the Pantheon Dashboard tab open in your browser.

10. Copy the machine token from the Pantheon Dashboard, then navigate to **Pantheon Migration** within the WordPress Dashboard on your existing site. Paste the machine token and enter the site name.

11. Click **Migrate**. You will receive an email when the migration completes. After the migration is complete, select **Visit the Site Dashboard** from the Site Dashboard on Pantheon:

 ![Successful Migration BlogVault](/source/docs/assets/images/dashboard/successful-site-migration-complete-blogvault.png)

If the migration is not successful, contact <migrations@pantheon.io> and include a link to the Site Dashboard and any details you can provide, such as where you are migrating the site from. We will help troubleshoot up to five migrations with issues arising from the Pantheon Migrate plugin.

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>  
<p>The <a href="https://wordpress.org/plugins/wp-native-php-sessions/">WordPress Native PHP Sessions</a> plugin is automatically installed during the migration process. For more details on this plugin, see <a href="/docs/wordpress-sessions/">WordPress and PHP Sessions</a>.</p>
</div>

### Migrate Site that Requires a Custom Upstream
If you'd like your existing WordPress site to get one-click updates from your [Custom Upstream](/docs/custom-upstream/), then the migration process will be slightly different. The general process will be the same as outlined above, but start with **Create New Site** instead of **Migrate existing site** then select your custom upstream as the site type. You'll need to manually generate a [machine token](/docs/machine-tokens/) to use with the [Pantheon Migrations plugin](https://wordpress.org/plugins/bv-pantheon-migration/).


## Troubleshooting
### Cannot Login Using a Google Account
Attempts to login with Google will fail if your organization uses Single Sign-On, resulting in the following error:

![Migration Authentication Error](/source/docs/assets/images/dashboard/migration-authentication-error.png)

Click your browser's back button to re-authenticate by entering your email address and sign in with your SAML Identity Provider. For details, see [Single Sign-On for Pantheon Organizations](/docs/sso-organizations/).

### Destination Site Not Found Error
If you are logged in with one identity and re-authenticate a different account, the site created will be associated with one account and the machine token with another, resulting in the following error:

![Destination site not found](/source/docs/assets/images/bv-destination-not-found-error.png)

Click your browser's back button from the Pantheon Dashboard and re-authenticate the user account for your current session.

### Import Failed
This error can occur on sites using a content delivery network (CDN) service that is not configured to allow the POST HTTP method. Resolve this issue by [temporarily setting POST as an allowed HTTP method within the CDN's configuration](http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#DownloadDistValuesAllowedHTTPMethods) and restart the migration process. Once the site has been successfully migrated, the POST HTTP method can be disabled.
## Frequently Asked Questions

#### How do I migrate a local site to Pantheon?
You can import a WordPress site archive via URL (within file size limits) using [Terminus](/docs/terminus):

```bash
terminus site:import <site> <url>
```

You'll need to [manually migrate](/docs/migrate-manual) site archives that exceed 500MB.

#### How long does the migration process take?

Most migrations are completed within two hours. The migration time depends solely on the size of your site, so be aware that it may take more or less time than estimated. We will send you an email once your migration is complete. If there are any issues with the migration, we will notify you by email.

## See Also

- [Migrate to Pantheon: WordPress Site Networks](/docs/migrate-wordpress-site-networks)
- [Migrate Sites to Pantheon: Manual Method](/docs/migrate-manual)
- [Platform Considerations](/docs/platform-considerations)
