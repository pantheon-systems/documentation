---
title: Cloudflare Domain Configuration
provider: Cloudflare
dnsprovider: true
description: Learn how to point your domain to a Pantheon site using Cloudflare
tags: [providers]
permalink: docs/:basename/
editpath: dns-providers/cloudflare.md/
---
You can use Cloudflare for DNS only or stack it as a CDN on top of Pantheon's Global CDN. We recommend using Cloudflare for DNS only. If you have a paid Cloudflare plan to use features like their WAF or have custom Cloudflare configurations (e.g. many page rules) you'd like to keep, however, then ensure you follow the guide below to enforce HTTPS to prevent any issues.

## Before You Begin
Be sure that you have a:

- Domain name using Cloudflare to host DNS
- [Paid Pantheon plan](/docs/guides/launch/plans/)
- [Domain connected](/docs/guides/launch/domains/) to the target Pantheon environment (typically Live)

## Locate Pantheon's DNS Values
Identify DNS values to point your domain to Pantheon:

1. Navigate to the Site Dashboard and select the target environment (typically <span class="glyphicons glyphicons-cardio"></span> Live) then click **<span class="glyphicons glyphicons-home"></span> Domains & HTTPS**.
2. Click the **DNS Recommendations** button next to the `www` domain and copy the CNAME value (e.g. `live-example.pantheonsite.io`).
3. Login to your <a href="https://www.cloudflare.com/a/login" target="blank">Cloudflare account <span class="glyphicons glyphicons-new-window-alt"></span></a> in a new tab before you continue.

## Configure DNS Records on Cloudflare
Cloudflare offers "CNAME Flattening" that allows use of a CNAME for all domains, including bare domains.  We recommend using CNAMES for all DNS records, as it frees you up from being tied to a single IP address.

### Option 1: Use Cloudflare for DNS Only (Recommended)
This configuration routes traffic to Pantheon's Global CDN exclusively. Unless you're paying for advanced Cloudflare features or if you have custom configurations (e.g. many page rules) you'd like to keep, turn off Cloudflare's CDN so that only DNS hosting services are used:

![Example DNS only](/source/docs/assets/images/cloudflare-dns-only.png)

1. Select **DNS** from the Cloudflare menu bar.
2. Select **CNAME** from the dropdown menu.
3. Enter `www` in the **Name** field and paste the CNAME record value provided by Pantheon (e.g. `live-example.pantheonsite.io`) in the **Domain name** field.
4. Create a **CNAME** record for the bare domain (e.g. `example.com`) using the value from the previous step (e.g. `live-example.pantheonsite.io`).
5. Select desired Time to Live (TTL).

  {% include("ttl.twig") %}

6. Disable Cloudflare's CDN by clicking the cloud icon (should be gray, not orange).
7. Click **Add Record**.



### Option 2: Use Cloudflare's CDN stacked on top of Pantheon's Global CDN
You can configure Cloudflare's CDN as an additional layer on Pantheon's Global CDN service:

1. Select **Crypto** from the Cloudflare menu bar and set SSL mode to **Full** (or potentially Full, Strict), but not Flexible.
  ![Enable SSL](/source/docs/assets/images/cloudflare-ssl.png)
2. Scroll down and enable **Always use HTTPS**
  ![Cloudflare Always HTTPS](/source/docs/assets/images/cloudflare-always-https.png)
3. Scroll down and enable **Automatic HTTPS Rewrites**
4. Remove existing redirects configured via PHP in `settings.php` or `wp-config.php`.
5. Proceed with DNS configuration as describe in Option 1, but make sure the cloud is toggled orange, not gray.

## Next Steps

* [Launch Essentials: Domains & HTTPS](/docs/guides/launch/domains/)
* [Launch Essentials: Redirect to a Primary Domain](/docs/guides/launch/redirects/)
