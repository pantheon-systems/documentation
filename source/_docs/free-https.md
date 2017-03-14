---
title: Early Access: Free HTTPS
earlyaccess: true
description: Upgrade to Free HTTPS
---
## Sites eligible for upgrade:
* Sites on a Professional plan with HTTPS enabled and DNS for all domains routed to $30/month load balancer
  - [Request invite](http://learn.pantheon.io/201701-HTTPS-Reg.html)


## Upgrade your site
1. Click the **Start HTTPS Upgrade** button from the site dashboard
3. **Wait 25 minutes to an hour** for us to deploy the new certificate
4. See when your action is required from the **Domains & HTTPS** tab
5. Click **Show DNS Recommendations** next to each of the domains indicating action required to find the values required to update DNS.
6. **Update your DNS** using your DNS provider. Pantheon is not a DNS provider.

    <div class="alert alert-info">
Look up your DNS provider with this free web tool: <a href="https://mxtoolbox.com/DNSLookup.aspx">https://mxtoolbox.com/DNSLookup.aspx</a>
</div>

7. **Wait for your DNS changes to fully propagate.** DNS records are cached across the internet and can take up to 72 hours to propagate, depending on the time to live (TTL) that was configured for your records.

      <div class="alert alert-info">
Check the current state of DNS propagation from different parts of the world using this free web tool <a href="https://www.whatsmydns.net/">https://www.whatsmydns.net/</a>
</div>

7. Confirm the upgrade is complete from the **Domains & HTTPS** tab, which will update once all domains are using the new DNS values

## Require HTTPS (optional)

### 301 redirects

You're likely already issuing 301 redirects via the WordPress `wp-config.php` file or the Drupal `settings.php` file to require HTTPS and standardize on a primary domain. Standardizing on a primary domain (for example, `https://www.example.com` or `https://example.com`) is a best practice for SEO to prevent duplicate content, as well as session strangeness, where a user can be signed on one domain but logged out of other domains at the same time. See our [latest recommended code samples for redirects](/docs/redirects) to adapt for your specific use case.

### HSTS (HTTP Strict Transport Security) Header

We also recommend sending a HSTS header with a max age of `15552000`, which you can accomplish with the [Drupal HSTS module](https://drupal.org/project/hsts) or the <plugin for WordPress>. This is the last step to get an A+ SSL rating from [SSL Labs](https://www.ssllabs.com/ssltest/) and helps to protect your website against protocol downgrade attacks and cookie hijacking.

## Frequently Asked Questions

### Does upgrading involve HTTPS interruption or downtime?
DNS will gracefully switch over and involves no downtime or HTTPS interruption.

**Caveat:** If after upgrading you add a new domain that is not already routed to Pantheon, then it will take 25 minutes to an hour for HTTPS to be ready for that new domain. Pre-provisioning HTTPS for new domains is planned after early access, with the full release.

### What level of encryption is provided?
High grade TLS 1.2 encryption with up-to-date ciphers. For a deep analysis of the HTTPS configuration on upgraded sites see [this A+ SSL Labs report for https://pantheon.io](https://www.ssllabs.com/ssltest/analyze.html?d=pantheon.io).

### How can I obtain an A+ SSL Labs rating?
Upgrade to free HTTPS and see the HSTS header section above.

### What browsers and operating systems are supported?
All modern browsers and operating systems are supported. For details, see the **Handshake Simulation** portion of this [report](https://www.ssllabs.com/ssltest/analyze.html?d=pantheon.io).

### Is Extended Validation supported?
No, please contact Pantheon support if you require Extended Validation.

### Are wildcard certificates supported?
No, but you don’t need a wildcard certificate to secure communications for multiple domains because we will automatically deploy certificates for all domains on your site.

### Is the CDN configurable? Do I get access to hit rates or other statistics?
Zero-config We manage the CDN so you don’t have to hassle with configuration. We’ve optimized configuration for Drupal and WordPress sites. Hit rates or other statistics are not available.

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
Within 10 days of upgrading all domains connected to the site we will delete your legacy load balancer and stop charging you for it.

## Troubleshooting

### 503 due to 60 second time out [link]
### 503 due to header overflow [link]
### BUGS-1034 if applicable [needs testing to see if old recommended snippet works with RAX LB]
