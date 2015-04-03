---
title: Adding Cloudflare Free SSL to WordPress Sites
description: How to set up free SSL service with WordPress
category:
  - WordPress
  - Going Live
---

CloudFlare offers shared SSL on their Free Plan. The advantage of adding this to your site will allow not only improved security but also better search engine ranking for SEO purposes. The following instructions will walk you through how to setup the SSL certificate that will secure your entire site with the HTTPS:// protocol.

If you do not have a domain name please purchase one, once you have one please follow the steps:

 1. Register a free account at CloudFlare - [Click here to Sign up](https://www.cloudflare.com/sign-up/)
 2. Complete the registration and choose the **Free** plan.
 3. Point your domain name at CloudFlare's nameservers that are provided.
 4. Login to your Pantheon account and create a new WordPress site
 5. Once the site has completed, go to the Development URL and finish setting up the WordPress site
 6. Login to the WordPress dashboard and go to Plugins > Install New
 7. Download and install the following plugins
	 8. [CloudFlare](https://wordpress.org/plugins/cloudflare/) - download and install it or you can install from the WordPress repository
	 9. [SSL Insecure Content Fixer](https://wordpress.org/plugins/ssl-insecure-content-fixer/) - download and install it or you can install from the WordPress repository

## **Settings for CloudFlare**

This will be under Settings > CloudFlare in the WordPress dashboard.

 - Set your domain name to reflect how it appears in your CloudFlare account. Example: `domain.com`
 - Copy your CloudFlare API key which can be found under your account settings
 - Set `HTTPS Protocol Rewriting` to **On**

![CloudFlare Settings](/docs/assets/images/cloudflare-settings.jpg)

### **SSL Settings**

WordPress settings are complete, go back to CloudFlare account.

- Set your SSL mode to Flexible, this is located under the Crypto menu

![CloudFlare Flex SSL](/docs/assets/images/cloudflare-flexible-ssl.png)

### **Page Rule Settings**

- Go to Page Rules, add a page rule and use the filter, always use HTTPS
	- For the URL, put in the following: `http://yourdomain.com/*`
	- Save the page rule

![CloudFlare Rules](/docs/assets/images/cloudflare-page-rules.png)

- Go to your DNS settings in your CloudFlare account and add an `A Record` and `CNAME` and point them to the DNS records provided by Pantheon in your site dashboard. [Here are the instructions on how to get your records for Pantheon](/docs/articles/sites/domains/dns-records-for-directing-your-domain-to-your-pantheon-site/#pantheon-dns-records-for-http-sites).
- Add your domain names to the domain names in your Pantheon account under `Domains/SSL`

### Pushing the changes live

Once you are finished with the steps, deploy your code to the Test environment, then to the Live environment. [Instructions on how to use the Pantheon WorkFlow tool can be found here](/docs/articles/sites/code/using-the-pantheon-workflow/).

The SSL certificate will take up to 24 hours to take affect to your Live site, please be patient. Once it's complete you should see a green lock next to your domain name to verify that it's working.

[Green lock](/docs/assets/images/cloudflare-green-bar.png)
