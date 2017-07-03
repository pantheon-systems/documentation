---
title: Cloudflare Domain Configuration
provider: Cloudflare
dnsprovider: true
description: Learn how to point your domain to a Pantheon site using Cloudflare
tags: [providers]
permalink: docs/:basename/
editpath: dns-providers/cloudflare.md/
---
## Before You Begin
Be sure that you have a:

- Domain name using Cloudflare to host DNS
- [Paid Pantheon plan](/docs/guides/launch/plans/)
- [Domain connected](/docs/guides/launch/domains/) to the target Pantheon environment (typically Live)

## When to use Cloudflare as a CDN?

You can layer Cloudflare as a CDN on top of Pantheon's Global CDN, or use Cloudflare for DNS only. Use Cloudflare as a CDN if you are paying for advanced features like a WAF, or if you have custom Cloudflare configurations (e.g. many page rules) you'd like to keep.

### Cloudflare: DNS only
Use Cloudflare for DNS only by clicking the orange cloud to turn it grey in Cloudflare's **DNS** settings.

![Example DNS only](/source/docs/assets/images/cloudflare-dns-only.png)

### Using Cloudflare CDN with Pantheon's Global CDN

For best results ensure the following Cloudflare configuration:

* SSL mode is set to **Full** in Cloudflare's **Crypto** settings.
  ![Enable SSL](/source/docs/assets/images/cloudflare-ssl.png)
* Redirect all traffic to HTTPS in Cloudflare **and** within WordPress or Drupal to avoid mixed content warnings and infinite redirect errors.
  - Add a *Page Rule* in Cloudflare to always use HTTPS:
    ![Cloudflare Page Rules](/source/docs/assets/images/cloudflare-always-https.png)
  - Redirect all traffic to HTTPS within WordPress or Drupal. See [Redirect to a Primary Domain](/docs/guides/launch/redirects/).

## Configure DNS Records on Cloudflare

Cloudflare offers the ability to use a CNAME for the "root" domain for your site through something they call CNAME Flattening. We recommend you take advantage of this feature as it frees you up from being tied to a single IP address. Ignore any Pantheon Dashboard recommendation for A/AAAA record and add a CNAME instead.

### CNAME Record

![Example Add CNAME record](/source/docs/assets/images/cloudflare-dns-add-cname.png)

1. Select **CNAME** from the dropdown menu.
2. Enter the domain to point to Pantheon in the **Name** field and the CNAME record value provided by Pantheon (e.g. `live-example.pantheonsite.io`) in the **Domain name** field.
3. Select desired Time to Live (TTL).
4. Disable Cloudflare's CDN by clicking the cloud icon (should be gray, not orange).
5. Click **Add Record**.



## Cloudflare Docs

* <a href="https://support.cloudflare.com/hc/en-us/articles/200170536-How-do-I-redirect-all-visitors-to-HTTPS-SSL-" target="blank">How do I redirect all visitors to HTTPS/SSL?<span class="glyphicons glyphicons-new-window-alt"></span></a>


## Next Steps

* [Launch Essentials: Domains & HTTPS](/docs/guides/launch/domains/)
* [Launch Essentials: Redirect to a Primary Domain](/docs/guides/launch/redirects/)
