---
title: Switching DNS From One Pantheon Site to Another
description: Learn how to change DNS details between Pantheon sites.
category:
  - developing
keywords: DNS
---
On Pantheon, each environment needs to have its own domain. However, it is possible to switch DNS information between two Pantheon sites. For example, if you have one site that is live, and another that you want to take live to replace the current site (e.g. a redesigned site). This article will help you switch DNS records for your sites.

## Before You Begin
If you're using SSL, load in your SSL certificate on the new site before determining the DNS records. Using an SSL certificate will potentially change the recommended DNS records, so be sure to have this in place before proceeding.

Also, check your `settings.ph`p or `wp-config.php` files to ensure the Pantheon default domains (eg: live-mysite.pantheon.io) have not been hardcoded into any redirects. If so, comment out the logic blocks and update after you've made the DNS cutover to the new site.

## Determine the New DNS Records
The same domain can't be added to two Pantheon environments at once, so if your Live environment for site 1 has example.com, you'll need to add another domain, such as examplenew.com to the Live environment for site 2 to determine your DNS records. Make sure to click **Show recommended DNS records** for both the bare domain (examplenew.com) and www.examplenew.com.

The name you select to determine your DNS records is not important; the purpose is to enter both a bare and www domain to confirm the A Record, AAAA Record, and CNAME to be registered with your domain registrar.

## 1. Lower the Time to Live (TTL)
Log in to your domain registrar and lower the TTL. This setting dictates the timeframe for the DNS propagation to take place. If possible, set the TTL to "automatic" or "0 seconds" for propagation.

## 2. Remove the Domain(s) from Site 1
In order to minimize a disruption in site access, open the Dashboard for both the old site (site 1) and the new site (site 2) so you can quickly delete and add. From the Domains tab of your Live environment, delete the custom domain(s).

## 3. Add the Domain(s) to Site 2
Switch over to the Domains tab of the Live environment on the new site and add the custom domains. Click **Show recommended DNS Records** so you can quickly copy and update with your DNS provider.

## 4. Update the DNS Records
Update your DNS provider with the recommended records from step 3; with a low TTL this will propagate quickly. Keep refreshing the URL to verify the change has taken effect. 
