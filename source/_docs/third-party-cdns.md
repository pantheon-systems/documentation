---
title: Using a Third Party CDN
description: Understand required configurations to stack a third-party CDN service on top of Pantheon's Global CDN.
tags: [cacheedge]
---
Most projects do not need a third-party CDN service, as Pantheon offers a [Global CDN](/docs/global-cdn/) for all sites out of the box with the following benefits:

* It includes [free and automatic HTTPS service](/docs/https)
* It is heavily optimized for website performance
* It is configured, maintained, and supported by Pantheon
* It is available at no additional cost

However, if there is some custom feature the project requires from another service provider (e.g., WAF, custom certificates, page rules, etc.) you can stack the service on top of Pantheon's Global CDN using the following configurations.

<table class="table  table-bordered table-responsive">
  <thead>
    <tr>
      <th>Service Provider</th>
      <th>Known to work with Pantheon</th>
      <th>Configuration Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Cloudflare</th>
      <td>✓</td>
      <td><a href="#cloudflare">See more</a></td>
    </tr>
    <tr>
      <th>Fastly</th>
      <td>✓</td>
      <td><a href="#fastly">See more</a></td>
    </tr>
    <tr>
      <th>AWS CloudFront</th>
      <td>✓</td>
      <td><a href="#aws-cloudfront">See more</a></td>
    </tr>
    <tr>
      <th>Verizon EdgeCast</th>
      <td>✓</td>
      <td></td>
    </tr>
  </tbody>
</table>

In general, you must assume HTTPS in the application (within WordPress or Drupal) in addition to requiring HTTPS within configurations for your third party CDN service provider. Otherwise, the site will encounter routing issues and possible failures.


## Cloudflare
1. Assume HTTPS within WordPress or Drupal. For details, see [Switching Sites from HTTP to HTTPS](/docs/http-to-https/).
2. Select **Crypto** from the Cloudflare menu bar and set SSL mode to **Full** (or potentially Full, Strict), but not Flexible.
  ![Enable SSL](/source/docs/assets/images/cloudflare-ssl.png)
3. Scroll down and enable **Always use HTTPS**
  ![Cloudflare Always HTTPS](/source/docs/assets/images/cloudflare-always-https.png)
4. Scroll down and enable **Automatic HTTPS Rewrites**
5. Remove existing redirects configured via PHP in `settings.php` or `wp-config.php`.
6. Proceed with DNS configuration as describe in Option 1, but make sure the cloud is toggled orange, not gray.

## Fastly
<div class="alert alert-info">
  <h4 class="info">Note</h4>
  <p>This method does not require adding the domain to Pantheon's Site Dashboard.</p>
</div>

1. Assume HTTPS within WordPress or Drupal. For details, see [Switching Sites from HTTP to HTTPS](/docs/http-to-https/).
2. Use the following to configure the Origin on Fastly:

    - Origin (replace `SITENAME`): `live-SITENAME.pantheonsite.io:443`
    - Enable TLS?: Yes
    - Verify certificate?: Yes
    - Certificate hostname (replace `SITENAME`): `live-SITENAME.pantheonsite.io`
    - SNI hostname (replace `SITENAME`): `live-SITENAME.pantheonsite.io`

3. Redirect to HTTPS within Fastly.
4. Redirect to desired primary domain (either `www.example.com` or `example.com`).


## AWS CloudFront
1. Assume HTTPS within WordPress or Drupal. For details, see [Switching Sites from HTTP to HTTPS](/docs/http-to-https/).
2. Configure redirects for any non-canonical domains within S3 and CloudFront as needed.
3. Within CloudFront, create a Web distribution for site content (on the canonical domain):

    - Origin Settings

      - Origin Domain Name (replace `SITENAME`): `live-SITENAME.pantheonsite.io`
      - Origin SSL Protocols: TLSv1.2
      - Origin Protocol Policy: HTTPS Only

    - Default Cache Behavior Settings

      - Viewer Protocol Policy: Redirect HTTP to HTTPS
      - Forward Headers: None or Selective (but never including “Host”)
      - Forward Cookies: All
      - Query String Forwarding and Caching: Forward all, cache based on all
      - Compress Objects Automatically: Yes

    - Distribution Settings

      - SSL Certificate: Custom SSL Certificate
      - Alternate Domain Names (CNAMEs): Public Site Domains, One Per Line

4. Within your DNS service provider, configure public site domains using CNAME records that point to the CloudFront domain.
