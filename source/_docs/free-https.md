---
title: Early Access: Free HTTPS
earlyaccess: true
description: Upgrade to Free HTTPS
---
## Eligible Sites
* Sites on a Professional plan with HTTPS enabled and DNS for all domains routed to $30/month load balancer
  - [Request invite](http://learn.pantheon.io/201701-HTTPS-Reg.html)


## Upgrade Your Site
1. Click the **Start HTTPS Upgrade** button from the Site Dashboard.
2. Wait 25 minutes to an hour for provisioning of the certificate.
3. Navigate to the **Domains & HTTPS** tab on the Live environment to check the status of your certificates. Once certificates have been provisioned, you will see action required on this tab with instructions to configure DNS for each custom domain.  
4. Click **Show DNS Recommendations** next to each custom domain to identify DNS values needed to point the domain to your site. Domains that are not yet configured will indicate action is required.
5. Configure DNS using the provided destinations at the domain's DNS provider.

    <div class="alert alert-info">
    <h3 class="info">Note</h3>
Look up your DNS provider with this free web tool: <a href="https://mxtoolbox.com/DNSLookup.aspx">https://mxtoolbox.com/DNSLookup.aspx</a>
</div>

6. Wait for your DNS changes to fully propagate. DNS records are cached across the internet and can take up to 72 hours to propagate, depending on the time to live (TTL) configured for the domain's DNS records.

      <div class="alert alert-info">
      <h3 class="info">Note</h3>
Check the current state of DNS propagation from different parts of the world using this free web tool <a href="https://www.whatsmydns.net/">https://www.whatsmydns.net/</a>
</div>

7. Confirm the upgrade is complete from the **Domains & HTTPS** tab. Once DNS has been configured and propagated, you will see confirmation on this tab.

## Require HTTPS - Optional

### 301 Redirects

You're likely already issuing 301 redirects via the WordPress `wp-config.php` file or the Drupal `settings.php` file to require HTTPS and standardize on a common domain. Standardizing on a common domain (for example, `https://www.example.com` or `https://example.com`) is a best practice for SEO to prevent duplicate content, as well as session strangeness, where a user can be signed on one domain but logged out of other domains at the same time. See our [latest recommended code samples for redirects](/docs/redirects#redirect-to-a-common-domain) to adapt for your specific use case.

### HTTP Strict Transport Security Header

We also recommend sending a HTTP Strict Transport Security (HSTS) header with a max age of `15552000` (180 days), which you can accomplish with the [HTTP Strict Transport Security](https://drupal.org/project/hsts) module for Drupal or the [LH HSTS](https://wordpress.org/plugins/lh-hsts/) plugin for WordPress. This is the last step to get an A+ SSL rating from [SSL Labs](https://www.ssllabs.com/ssltest/) and helps to protect your website against protocol downgrade attacks and cookie hijacking.

## Frequently Asked Questions

### Does upgrading involve HTTPS interruption or downtime?
DNS will gracefully switch over and involves no downtime or HTTPS interruption.

**Caveat:** If after upgrading you add a new domain that is not already routed to Pantheon, then it will take 25 minutes to an hour for HTTPS to be ready for that new domain. Pre-provisioning HTTPS for new domains is planned after early access, with the full release.

### What level of encryption is provided?
High grade TLS 1.2 encryption with up-to-date ciphers. For a deep analysis of the HTTPS configuration on upgraded sites see [this A+ SSL Labs report for https://pantheon.io](https://www.ssllabs.com/ssltest/analyze.html?d=pantheon.io).

### How can I obtain an A+ SSL Labs rating?
Follow steps to upgrade to free HTTPS and send the [HSTS header](#http-strict-transport-security-header) as mentioned above.

### What browsers and operating systems are supported?
All modern browsers and operating systems are supported. For details, see the **Handshake Simulation** portion of this [report](https://www.ssllabs.com/ssltest/analyze.html?d=pantheon.io).

### Is Extended Validation supported?
No, please [contact Pantheon support](/docs/getting-support) if you require Extended Validation.

### Are wildcard certificates supported?
No, but you don’t need a wildcard certificate to secure communications for multiple domains because we will automatically deploy certificates for all domains on your site.

### Is the CDN configurable? Do I get access to hit rates or other statistics?
No, we manage the CDN so you don’t have to hassle with configuration. We’ve optimized configuration for Drupal and WordPress sites. Hit rates or other statistics are not available.

### Is edge caching changing?

### What is a shared certificate?
Shared certificates use a Subject Alternative Name (SAN) certificate to host multiple hostnames or domains on one certificate. We ake care of certificate administration and renewal automatically for every domain on your site.

### What is TLS?
TLS (Transport Layer Security) is a protocol for secure HTTP connections. This protocol replaces its less secure predecessor, the **SSL (Secure Socket Layer)** protocol, which we no longer support. Pantheon uses the term HTTPS to refer to secure HTTP connections.

### Does the TLS connection use Server Name Indication (SNI)?
Yes, SNI is the technology replacing the expensive, legacy load balancers and allows multiple secure (HTTPS) websites to be served off the same IP address, without requiring all those sites to use the same certificate.

### Can I downgrade back to the legacy HTTPS load balancer?
If you want to downgrade, please contact Pantheon support.

### When do I stopped being billed $30/month?
Pantheon will remove legacy load balancers and stop billing within 10 days of upgrading.

### Why does Moz Pro return an 804 HTTPS SSL error?
Currently, Moz Pro is unable to crawl sites using Server Name Indication (SNI). While full support for SNI is not yet available, you may be eligible for beta access to SNI support. For details, see [Moz Pro, our web crawler, and sites that use SNI (804 HTTPS SSL) error](https://moz.com/community/q/moz-pro-our-web-crawler-and-sites-that-use-sni).


## Troubleshooting

### 503 Timeouts
There are three potential 503 timeout errors you may encounter:

- 503 connection timeout
- 503 first byte timeout
- 503 between bytes timeout

These errors occur when a request exceeds the 60s timeout limit for the above scenarios. There is currently no way to exceed or override the 60s timeout limit.

### 503 Header Overflow
This error occurs when a request exceeds the 10K size limit for Cookies (as sent in the request `"Cookie: .."` header). If more than that is sent, all cookies will be dropped and the request will continue to be processed as if no cookies had been sent at all. The header `"X-Cookies-Dropped: 1"` will be added to the request and response indicating that these have been truncated. You can either ignore this scenario in your PHP code or handle it (perhaps by displaying a custom error page).

Previously, this error returned [502 - Upstream Header Too Big](/docs/errors-and-server-responses/#502-upstream-header-too-big).


### Infinite Redirect Loops
Errors referencing too many redirects may be a result of using the ` $_SERVER['HTTP_X_FORWARDED_PROTO']` variable within redirect logic located in your site's `wp-config.php` or `settings.php` file. To resolve this problem, replace the offending redirect logic with a block such as:

```
if (isset($_SERVER['PANTHEON_ENVIRONMENT']) &&
  ($_SERVER['PANTHEON_ENVIRONMENT'] === 'live') &&
  (php_sapi_name() != "cli")) {
  if ($_SERVER['HTTP_HOST'] != 'www.yoursite.com' ||
      !isset($_SERVER['HTTP_X_SSL']) ||
      $_SERVER['HTTP_X_SSL'] != 'ON' ) {
    header('HTTP/1.0 301 Moved Permanently');
    header('Location: https://www.yoursite.com'. $_SERVER['REQUEST_URI']);
    exit();
  }
}
```
