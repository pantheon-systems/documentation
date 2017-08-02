---
title: Configure Custom HTTPS Certificate with Stacked CDNs
description: Learn how to configure a third-party CDN provider with Pantheon's Global CDN so you can terminate HTTPS using a custom certificate.
tags: [cacheedge]
---
The following information pertains only to sites that require an additional CDN service, for the primary use case of running a custom certificate to terminate HTTPS instead of [our free, automated HTTPS](/docs/https/). While Pantheon's certificate is shared amongst other domains, it is entirely secure; concerns regarding the legitimacy are entirely cosmetic.

Pantheon does not support using a custom certificate. Sites that require a custom certificate (e.g., extended validation required) must utilize a third-party service provider to do so.

## Supported Providers
[Open an issue](https://github.com/pantheon-systems/documentation/issues/new?title=Configure%20Custom%20HTTPS%20Certificate%20with%20Stacked%20CDNs%20Doc%20Update%20&body=Re%3A%20%5BConfigure%20Custom%20HTTPS%20Certificate%20with%20Stacked%20CDNs%5D(https%3A%2F%2Fpantheon.io/docs/stacked-cdn/)%0A%0APriority%20(Low%E2%80%9A%20Medium%E2%80%9A%20High)%3A%0A%0A%23%23%20Issue%20Description%3A%0A%0A%23%23%20Suggested%20Resolution%20&labels=fix%20content) to request inclusion for providers not found in this doc.
<table class="table  table-bordered table-responsive">
  <thead>
    <tr>
      <th></th>
      <th>Global CDN (for comparison)</th>
      <th>Cloudflare</th>
      <th>Fastly</th>
      <th>AWS CloudFront</th>
      <th>Akamai</th>
      <th>Verizon EdgeCast</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>IPv6</th>
      <td>Yes</td>
      <td>Yes</td>
      <td>Yes</td>
      <td>Yes</td>
      <td>Yes</td>
      <td>Yes</td>
    </tr>
    <tr>
      <th>HTTP/2</th>
      <td>Yes</td>
      <td>Yes</td>
      <td>Yes</td>
      <td>Yes</td>
      <td>Yes</td>
      <td>Yes</td>
    </tr>
    <tr>
      <th>Free HTTPS for Resources</th>
      <td>Yes, via site's own HTTPS</td>
      <td>Yes, via site's own HTTPS</td>
      <td>Yes, via subdomain</td>
      <td>Yes, via subdomain</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>Shared HTTPS Certificate</th>
      <td>Yes, free</td>
      <td>Yes, free</td>
      <td>Yes, with add-on</td>
      <td>Yes, but self-managed</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>Custom HTTPS Certificate</th>
      <td>No</td>
      <td>Yes, with Business plan</td>
      <td>Yes, with add-on</td>
      <td>Yes</td>
      <td>Yes</td>
      <td></td>
    </tr>
    <tr>
      <th>Unique IP (Pre-SNI)</th>
      <td>No</td>
      <td></td>
      <td></td>
      <td>Yes</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>Uptime Protection</th>
      <td>Yes, with stale-if-error headers</td>
      <td>Yes, with *Always On*</td>
      <td>Yes, with configuration</td>
      <td>No</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>Path-Based Routing</th>
      <td>No</td>
      <td>No</td>
      <td>Yes</td>
      <td>Yes, via behaviors and multiple origins</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>Mainland China POPs</th>
      <td>No</td>
      <td>Yes, with Enterprise plan and paperwork</td>
      <td>No</td>
      <td></td>
      <td>Yes, with paperwork</td>
      <td></td>
    </tr>
    <tr>
      <th>Image Optimization</th>
      <td>No, but possible in CMS</td>
      <td>Yes, via Polish</td>
      <td>Yes, with add-on</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>Mobile Device Detection</th>
      <td>No, but possible with responsive design</td>
      <td>Yes, with redirect to different hostname</td>
      <td>Yes, with boilerplate VCL</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>GeoIP Detection</th>
      <td>No</td>
      <td>Yes</td>
      <td>Yes</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>Resource Minification</th>
      <td>No, but possible in CMS</td>
      <td>Yes, via Auto Minify</td>
      <td>No, but possible in CMS</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>Log Access</th>
      <td>No</td>
      <td>Yes, with Enterprise plan</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>IP Blocking</th>
      <td>No</td>
      <td></td>
      <td>Yes</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>Bot Blocking</th>
      <td>No</td>
      <td></td>
      <td>Yes</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>Access Validation</th>
      <td>No</td>
      <td>No</td>
      <td>Yes</td>
      <td>Yes</td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

## Cloudflare
### Non-Enterprise Plan
Note: Cloudflare calls the troubles here “the GitHub Pages problem.”

1. Pantheon: Add the site’s domains to the Live environment.
2. Cloudflare: Configure CNAMEs from all site domains to live-SITENAME.pantheonsite.io.
3. Cloudflare: Set Crypto > SSL to “Full.”
4. Pantheon: Configure Drupal or WordPress to assume site visitors are using HTTPS.
5. Pantheon: Verify that the certificate has been provisioned. Optionally, test with a “hosts” file change.
6. Cloudflare: Configure rules to redirect site visitors to HTTPS.
7. Cloudflare: Optionally, configure rules to redirect to WWW or non-WWW.
8. Cloudflare: Optionally, set Crypto > SSL to “Full (Strict).” This is more secure, but it could cause an issue if Pantheon runs into issues renewing the Let’s Encrypt certificate through Cloudflare.

Draft public doc: https://github.com/pantheon-systems/documentation/pull/2631

### Enterprise Plan
Note: The non-enterprise method works as well, but this is more robust/secure because it allows “HTTPS (Strict)” without relying on Pantheon continuing to refresh the site’s Let’s Encrypt certificate (which could get wonky behind a CDN). This method does not require adding the public domain names to the Pantheon dashboard.

1. Pantheon: Configure Drupal or WordPress to always assume HTTPS and the real, primary domain of the website.
2. Cloudflare: Request edge-side code to verify HTTPS against live-SITENAME.pantheonsite.io.
3. Cloudflare: Configure CNAMEs from all site domains to live-SITENAME.pantheonsite.io.
4. Cloudflare: Set Crypto > SSL to “Full (Strict).”
5. Cloudflare: Configure rules to redirect site visitors to HTTPS.
6. Cloudflare: Configure rules to redirect to WWW or non-WWW, as desired.

## Fastly
Note: This method does not require adding the public domain names to the Pantheon dashboard.

1. Pantheon: Configure Drupal or WordPress to always assume HTTPS and the real, primary domain of the website
2. Fastly: Configure the origin.

    - Origin: live-SITENAME.pantheonsite.io:443
    - Enable TLS? Yes
    - Verify certificate? Yes
    - Certificate hostname: live-SITENAME.pantheonsite.io
    - SNI hostname: live-SITENAME.pantheonsite.io

3. Fastly: Redirect to HTTPS.
4. Fastly: Redirect to WWW or non-WWW, as desired.
5. TODO: Special case for Fastly + Fastly stacking for Surrogate-Control


## AWS CloudFront
Related bug: https://getpantheon.atlassian.net/browse/BUGS-1316

### Method One: Strip Host Header, Redirect via S3
1. Pantheon: Configure Drupal or WordPress to always assume HTTPS and the real, primary domain of the website.
2. S3 and CloudFront: Configure redirects for any non-canonical domains.
3. CloudFront: Create a Web distribution for site content (on the canonical domain).

    - Origin Settings

      - Origin Domain Name: live-SITENAME.pantheonsite.io
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

4. DNS Service: Configure public site domains to CNAME to the CloudFront domain.

### Method Two: Site Certificates on Global CDN
Note: This method isn’t tested yet. I need to configure an nginx instance for CloudFront to connect to so I can determine exactly how it’s attempting SNI. This will involve logging $ssl_server_name. I suspect that, if the Host header gets forwarded, CloudFront sends that as the SNI hostname. This means that, if the Host header gets forwarded, successful connection to the origin (Global CDN) requires that the SNI for the public hostname returns a certificate that either works for the public hostname or for the origin domain name.

1. Pantheon: Add any public site domains to the Live domains.
2. DNS Service: Add the necessary A/AAAA/CNAME records for origin.SITENAME.com, as explained in the Pantheon dashboard.
3. Pantheon: Configure Drupal or WordPress to always assume HTTPS and the real, primary domain of the website (www.SITENAME.com rather than origin.SITENAME.com).
4. CloudFront: Create a Web distribution for site content.

    - Origin Settings

      - Origin Domain Name: origin.SITENAME.com
      - Origin SSL Protocols: TLSv1.2
      - Origin Protocol Policy: HTTPS Only

    - Default Cache Behavior Settings

      - Viewer Protocol Policy: Redirect HTTP to HTTPS
      - Forward Headers: All (unless caching is needed in CloudFront)
      - Forward Cookies: All
      - Query String Forwarding and Caching: Forward all, cache based on all
      - Compress Objects Automatically: Yes

    - Distribution Settings

      - SSL Certificate: Custom SSL Certificate
      - Alternate Domain Names (CNAMEs): Public Site Domains, One Per Line

5. DNS Service: Configure public site domains to CNAME to the CloudFront domain.
6. Pantheon: Optionally, configure Drupal or WordPress to redirect to WWW or non-WWW, as desired.

## Akamai
Akamai seems to offer two options (that I know of) for HTTPS to origin: (1) validation against the same certificate as in the Host header and (2) validation against a pinned certificate. The first isn’t great for Global CDN (and works just like the non-Enterprise Cloudflare option) and the second will break if we rotate our wildcard certificate (but we could support it for Elite sites if we had a customer list to work with for certificate rotations).

## Verizon EdgeCast

## Sucuri
By default Sucuri blocks serving the challenges needed to verify domain ownership and issue Let's Encrypt certificates. Contact Sucuri support and request they enable the "Forward Certificate Validation" setting, which allows HTTPS provisioning to complete successfully. Note you'll want to keep this setting enabled, so the certificate will always renew automatically.

1. Configure Sucuri to redirect all traffic to HTTPS
2. Contact Sucuri to enable the "Forward Certificate Validation" so Pantheon can deploy and renew certificates on Global CDN.
3. Enable "Full SSL" (not Partial) in Sucuri (does this auto-pin certificate?)
