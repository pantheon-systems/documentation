---
title: Add Cloudflare Free SSL to WordPress Sites
description: Learn to set up free SSL services with CloudFlare on WordPress sites.
category:
  - WordPress
  - Going Live
---

CloudFlare offers free shared SSL services, providing the opportunity to improve your site's security and SEO rankings. The following instructions will walk you through how to setup the SSL certificate and secure your entire site with the HTTPS:// protocol.

1. [Create a free CloudFlare account](https://www.cloudflare.com/sign-up)
1. Select the **Free** plan.
1. Update your domain's DNS with CloudFlare's provided nameservers.
1. [Create a new WordPress site](/docs/articles/wordpress/starting-wordpress-site/).
1. Login to the WordPress dashboard and go to Plugins > Install New
1. [Install and activate](/docs/articles/sites/code/more-ways-of-managing-code-in-sftp-mode/#using-wp-admin-to-manage-plugins-and-themes) the following plugins:
 - [CloudFlare](https://wordpress.org/plugins/cloudflare/)
 - [SSL Insecure Content Fixer](https://wordpress.org/plugins/ssl-insecure-content-fixer/)

## Configure the CloudFlare Plugin

CloudFlare settings can be found within the Settings > CloudFlare tab in the WordPress dashboard.

1. Set your domain name to reflect how it appears in your CloudFlare account. Example: `domain.com`
1. Copy your CloudFlare API key within Account Settings
1. Set HTTPS Protocol Rewriting to **On**

![CloudFlare Settings](/docs/assets/images/cloudflare-settings.png)

## SSL Settings

Within your Cloudflare account, set the SSL Mode to **Flexible** within the Crypto menu.
![CloudFlare Flex SSL](/docs/assets/images/cloudflare-flexible-ssl.png)

### Page Rule Settings and DNS
Navigate to the Page Rules section of your CloudFlare account.

1. Provide your site's URL with a trailing `/*`
 - Example:`http://yourdomain.com/*`
1. Set Always use https to **On**
1. Click **Add Rule**
 ![CloudFlare Rules](/docs/assets/images/cloudflare-page-rules.png)
1. Locate your DNS Settings within your CloudFlare account.
1. Create an `A Record` and a `CNAME Record` which [point to your Pantheon site](/docs/articles/sites/domains/dns-records-for-directing-your-domain-to-your-pantheon-site/#pantheon-dns-records-for-http-sites).
1. From within your site's Pantheon Dashboard, add your domain name within the [Domains/SSL tab](/docs/articles/sites/domains/dns-records-for-directing-your-domain-to-your-pantheon-site/#pantheon-dns-records-for-http-sites).

### Pushing the changes live

The final step is to deploy your code to the Live environment, for more details see [Using the Pantheon Workflow](/docs/articles/sites/code/using-the-pantheon-workflow/).

The SSL certificate can take up to 24 hours to take affect to your Live site, please be patient. Once it's complete you should see a green lock next to your domain name:

![Green lock](/docs/assets/images/cloudflare-green-bar.png)
