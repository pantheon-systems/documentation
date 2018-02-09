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

<div class="alert alert-info" role="alert">
  <h4 class="info">Note</h4>
  <p markdown="1">The following recommendations differ from those shown in the Site Dashboard. This is because Cloudflare supports **CNAME Flattening**, which prevents association with a single IP address. Ignore the DNS values provided in the Site Dashboard for A/AAAA records.</p>
</div>

1. Navigate to the Site Dashboard and select the target environment (typically <span class="glyphicons glyphicons-cardio"></span> Live) then click **<span class="glyphicons glyphicons-global"></span> Domains / HTTPS**.
2. Click the **DNS Recommendations** button next to the `www` domain and copy the CNAME value (e.g. `live-example.pantheonsite.io`).
3. Login to your <a href="https://www.cloudflare.com/a/login" target="blank">Cloudflare account <span class="glyphicons glyphicons-new-window-alt"></span></a> in a new tab before you continue.

## Configure DNS Records on Cloudflare

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
8. Cloudflare Page Rules will not work when Cloudflare is used for DNS only. Instead, redirects are handled by adding redirect logic to the WordPress `wp-config.php` file or the Drupal `settings.php` file. See [Domains and Redirects](/docs/domains/) for more information.

### Option 2: Use Cloudflare's CDN stacked on top of Pantheon's Global CDN
You can configure Cloudflare's CDN as an additional layer on Pantheon's Global CDN service:

1. Select **Crypto** from the Cloudflare menu bar and set SSL mode to **Full** (or potentially Full, Strict), but not Flexible.
  ![Enable SSL](/source/docs/assets/images/cloudflare-ssl.png)
2. Scroll down and enable **Always use HTTPS**
  ![Cloudflare Always HTTPS](/source/docs/assets/images/cloudflare-always-https.png)
3. Scroll down and enable **Automatic HTTPS Rewrites**
4. Remove existing redirects configured via PHP in `settings.php` or `wp-config.php`.
5. Proceed with DNS configuration as describe in Option 1, but make sure the cloud is toggled orange, not gray:

   ![Example DNS only](/source/docs/assets/images/cloudflare-cnames.png)


## CAA Records (Optional)

A **CAA Record** specifies which certificate authority (**CA**) can issue HTTPS certificates for a domain.

1. Select **DNS** from the Cloudflare menu bar.
2. Select **CAA** from the dropdown menu.
3. Enter the bare domain (`example.com`) in the **Name** field then click to configure the record value:

  ![caa click to configure](/source/docs/assets/images/cf-caa.png)

4. Select **Allow wildcards and specific hostnames** for the record's tag and enter  `letsencrypt.org` in the value:

  ![caa configure](/source/docs/assets/images/cf-caa-configure.png)

5. Select desired Time to Live (TTL).

  {% include("ttl2.twig") %}

6. Click **Add Record**. Your record should look similar to the following once it has been created:

  ![caa record](/source/docs/assets/images/cf-caa-final.png)

7. Repeat this process for the `www` subdomain.

## Restrict Content Based on Geographic Location

If you're using Cloudflare's IP Geolocation feature, you will need to read the `CF-IPCountry` header and set `Vary: CF-IPCountry` on all responses.

## Next Steps

* [Launch Essentials: Domains & HTTPS](/docs/guides/launch/domains/)
* [Launch Essentials: Redirect to a Primary Domain](/docs/guides/launch/redirects/)
