---
title: Cloudflare Domain Configuration
provider: Cloudflare
dnsprovider: true
description: Learn how to point your domain to a Pantheon site using Cloudflare
tags: [providers]
permalink: docs/:basename/
editpath: dns-providers/cloudflare.md/
---
You can stack Cloudflare as a CDN on top of Pantheon's Global CDN, or use Cloudflare for DNS only. We recommend Cloudflare as a CDN only if you're paying for advanced features like a WAF, or if you have custom Cloudflare configurations (e.g. many page rules) you'd like to keep.

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
Cloudflare offers the ability to use a CNAME for the "root" domain for your site through something they call CNAME Flattening. We recommend you take advantage of this feature as it frees you up from being tied to a single IP address. Apply one of the following configurations according to your site's CDN requirements at Cloudflare.

### Disable Cloudflare's CDN and Configure DNS
Unless you're paying for advanced features or if you have custom configurations (e.g. many page rules) you'd like to keep, turn off Cloudflare's CDN so that only DNS hosting services are used:

1. Select **DNS** from the menu bar.
2. Select **CNAME** from the dropdown menu.
3. Enter `www` in the **Name** field and paste the CNAME record value provided by Pantheon (e.g. `live-example.pantheonsite.io`) in the **Domain name** field.
4. Create a **CNAME** record for the bare domain (e.g. `example.com`) using the value from the previous step (e.g. `live-example.pantheonsite.io`).
5. Select desired Time to Live (TTL).

  {% include("ttl.twig") %}

6. Disable Cloudflare's CDN by clicking the cloud icon (should be gray, not orange).
7. Click **Add Record**.

  ![Example DNS only](/source/docs/assets/images/cloudflare-dns-only.png)

This configuration routes traffic to Pantheon's Global CDN exclusively.

### Stack Cloudflare's CDN with Pantheon and Configure DNS
If you need access to paid features, you can configure Cloudflare's CDN as an additional layer to Pantheon's Global CDN service:

1. Click **DNS** in the menu bar.
2. Select **CNAME** from the dropdown menu.
3. Enter `www` in the **Name** field and paste the CNAME record value provided by Pantheon (e.g. `live-example.pantheonsite.io`) in the **Domain name** field.
4. Create a **CNAME** record for the bare domain (e.g. `example.com`) using the value from the previous step (e.g. `live-example.pantheonsite.io`).
5. Select desired Time to Live (TTL).

  {% include("ttl2.twig") %}

6. Click **Add Record**.
7. Select **Crypto** from the menu bar and set the SSL mode to **Full**:
  ![Enable SSL](/source/docs/assets/images/cloudflare-ssl.png)
8. Scroll down and enable Automatic HTTPS Rewrites in the **Crypto** settings:
  ![Cloudflare Always HTTPS](/source/docs/assets/images/cloudflare-always-https.png)

    <div class="alert alert-danger">
    <h4 class="info">Warning</h4>
    <p markdown="1">To avoid mixed content warnings in the browser, you must redirect requests to HTTPS within Cloudflare as described here in addition to [redirecting via PHP within WordPress or Drupal as described in the next steps](/docs/guides/launch/redirects/).</p>
    </div>

## Cloudflare Docs

* <a href="https://support.cloudflare.com/hc/en-us/articles/227227647-How-do-I-use-Automatic-HTTPS-Rewrites-" target="blank">How do I use Automatic HTTPS Rewrites?<span class="glyphicons glyphicons-new-window-alt"></span></a>


## Next Steps

* [Launch Essentials: Domains & HTTPS](/docs/guides/launch/domains/)
* [Launch Essentials: Redirect to a Primary Domain](/docs/guides/launch/redirects/)
