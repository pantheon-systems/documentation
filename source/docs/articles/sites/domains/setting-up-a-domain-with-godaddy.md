---
title: Setting up a Domain with GoDaddy
description: Learn how to point a new GoDaddy domain name to your Pantheon Drupal or WordPress site.
category:
  - going-live
keywords: godaddy dns, dns records, point your domain, point godaddy domain to pantheon, pointing your godaddy domain to your pantheon site, godaddy dns host, godaddy dns configuration, add domain to a site, godaddy, point godaddy domain to pantheon, redirect godaddy domain to pantheon, godaddy domain dns
---

Visit GoDaddy.com to search for the domain name you want and add it to your cart. If you have more than one domain, you will be required to configure the A records or CNAME for each one.

If you need to add email to your new domain, you can add it at this time. Pantheon does not provide email hosting services.

After you've purchased your domain name, follow the instructions below.  

## Add Your Domain to Pantheon

1. Log in to your site's Dashboard and select the **Live** environment tab.
2. Click the **Domains/HTTPS** tab.
3. Enter the custom domain name for your site, and click **Add domain to the Live environment**. Both the domain and the www subdomain are added.
4. Click **Show recommended DNS records** to get the required DNS values needed in the next section.


## Configure Domain Settings

1. Sign in to your account at GoDaddy.com.
2. Click **Manage** next to Domains.
3. Click the gear icon, and choose **Manage DNS**.
3. Edit the existing **A record** for the bare domain (non-www) with the IP address provided in the Pantheon Dashboard.
4. Create a **CNAME** record for the www subdomain using the destination provided by Pantheon. For more information, see [Domains and DNS](/docs/articles/sites/domains). 

<div class="alert alert-warning" role="alert">
<h4>Note</h4>
If you have HTTPS enabled on your site, you have been given a unique IP address. Point the A record to this IP address.</div>  
