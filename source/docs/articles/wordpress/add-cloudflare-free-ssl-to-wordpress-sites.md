---
title: Add Cloudflare Free SSL to WordPress Sites
description: Learn to set up free SSL services with CloudFlare on WordPress sites.
category:
  - WordPress
  - Going Live
keywords: wordpress, cloudflare, free ssl, ssl
---
CloudFlare offers free shared SSL services, providing the opportunity to improve your site's security and SEO rankings. The following instructions will walk you through how to setup the SSL certificate and secure your entire site with the HTTPS protocol.

##Get Started

1. Create a free [CloudFlare account](https://www.cloudflare.com/sign-up) and select the **Free** plan.
1. Update your domain's DNS with CloudFlare's provided nameservers.
1. [Create a new WordPress site](/docs/articles/wordpress/starting-wordpress-site/).
1. Log in to the WordPress dashboard and go to Plugins > Install New.
1. [Install and activate](/docs/articles/sites/code/more-ways-of-managing-code-in-sftp-mode/#using-wp-admin-to-manage-plugins-and-themes) the following plugins:
 - [CloudFlare](https://wordpress.org/plugins/cloudflare/)
 - [SSL Insecure Content Fixer](https://wordpress.org/plugins/ssl-insecure-content-fixer/)

## Configure the CloudFlare Plugin

CloudFlare settings can be found in the Settings > CloudFlare tab in the WordPress dashboard.

1. Set your domain name to reflect how it appears in your CloudFlare account. Example: `domain.com`
1. In Account Settings, copy your CloudFlare API key.
1. Set **HTTPS Protocol Rewriting** to **On**.
1. Set **Development Mode** to **Off**.
![CloudFlare Settings](/source/docs/assets/images/cloudflare-settings.png)
## SSL Settings
In Cloudflare, go to the Crypto menu and set the **SSL Mode** to **Flexible**.
![CloudFlare Flex SSL](/source/docs/assets/images/cloudflare-flexible-ssl.png)

### Page Rule Settings and DNS
Go to the Page Rules section of your CloudFlare account.

1. Add the following to the end of the URL: `/*`
 - Example:`http://yourdomain.com/*`
1. Set **Always Use HTTPS** to **On**.
1. Click **Add rule**.
 ![CloudFlare Rules](/source/docs/assets/images/cloudflare-page-rules.png)
1. Locate your DNS Settings in your CloudFlare account.
1. Create an `A Record` and a `CNAME Record` that [point to your Pantheon site](/docs/articles/sites/domains/dns-records-for-directing-your-domain-to-your-pantheon-site/#pantheon-dns-records-for-http-sites).
1. From your site's Pantheon Dashboard, go to the add [Domains/SSL tab](/docs/articles/sites/domains/dns-records-for-directing-your-domain-to-your-pantheon-site/#pantheon-dns-records-for-http-sites) and your domain name.

### Pushing the Changes Live

The final step is to deploy your code and plugin settings to the Live environment. For details, see [Using the Pantheon Workflow](/docs/articles/sites/code/using-the-pantheon-workflow/). Plugin configuration is stored in the database, so you will need to configure the plugin again on the live environment. Using the [wp-cfm plugin](https://github.com/forumone/wp-cfm) can make this a simpler task. See [our article](/docs/articles/wordpress/wordpress-configuration-management-wp-cfm/) for more information.

It can take up to 24 hours before the SSL certificate takes effect on your Live site; please be patient. Once it's complete, you will see a green lock next to your domain name:

![Green lock](/source/docs/assets/images/cloudflare-green-bar.png)
