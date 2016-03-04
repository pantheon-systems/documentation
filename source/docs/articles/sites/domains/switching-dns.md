---
title: Switching DNS From One Pantheon Site to Another
description: Learn how to change DNS details between Pantheon sites.
categories:
  - sites
tags:
  - domains
---
There are some scenarios (e.g. a redesigned site) where you may want to switch a domain's DNS between Pantheon sites. While each environment can configure its own custom domain, the same domain cannot be added to more than one environment. However, it's possible to point a domain to another site with minimal impact to visitors.

## Before You Begin
If you are using the HTTPS protocol with your own certificate, [enable HTTPS](/docs/articles/sites/domains/adding-a-ssl-certificate-for-secure-https-communication/) on the new site before proceeding.

Also, check `settings.php` or `wp-config.php` and comment out any hardcoded redirect logic for Pantheon's Platform domains (e.g.  `live-mysite.pantheon.io`). Once DNS has been configured, you can update the redirects to use the default Platform domain (e.g. `live-mysite.pantheonsite.io`) if needed.

## Determine the New DNS Records
Since the same domain cannot be added to more than one environment, you'll need to use a temporary domain name to determine the DNS records. If the launched site has `example.com` configured, temporarily add something like `example-new.com` to the new site's Live environment and click **Show recommended DNS records** for both the bare domain and wwww.

The temporary domain you add within the new site does not need to be a registered domain. It's purpose is to determine the new DNS values required when switching the domain.
## 1. Lower the Time to Live (TTL)
Log in to the DNS host for your domain and lower the TTL of the bare domain and www records. This setting dictates the lifespan of a DNS record. If possible, set the TTL to "automatic" or "0 seconds" for more efficient propagation.

## 2. Remove the Domain(s) from the Launched Site
In order to minimize a disruption in site access, open the Dashboard for both the currently launched site and the new site so you can quickly delete and add. From the Domains tab of your Live environment, delete the custom domain(s).

## 3. Add the Domain(s) to the New Site
Switch over to the Domains tab of the Live environment on the new site and add the custom domains. Click **Show recommended DNS Records** so you can quickly copy and update with your DNS provider.

## 4. Update the DNS Records
Update your DNS provider with the recommended records from step 3; with a low TTL this will propagate quickly. Keep refreshing the URL to verify the change has taken effect.
