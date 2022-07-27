---
title: Pantheon Global CDN
subtitle: Configure DNS and Provision HTTPS
description: "Learn the specifics of Pantheon's Free and Automated HTTPS, powered by Let's Encrypt"
categories: [go-live]
tags: [cdn, dns, https, security]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/global-cdn/https
anchorid: https
---

Pantheon's [Global CDN](/guides/global-cdn) provides [free, automated HTTPS](https://pantheon.io/features/managed-https) for every site launched on the platform. Your [HTTPS](/guides/global-cdn/https) certificates are fully managed using [Let's Encrypt](https://letsencrypt.org).

<Partial file="configure-dns.md" />

<Alert type="info" title="Note">

When adding the domain to your environment, you may be presented with the option to **Verify your domain to provision HTTPS**. If you're using a manually managed [custom certificate](/custom-certificates#option-2-manually-managed-custom-certificates), skip this step by clicking **Skip to updating DNS**.

</Alert>

For more detailed instructions pertaining to your specific DNS host, click below:

<Accordion title="DNS Host-Specific Instructions" id="host-specific2" icon="info-sign">

<DNSProviderDocs />

If you are having difficulties issuing a [Let's Encrypt](https://letsencrypt.org) certificate you can run diagnostics at [Let's Debug](https://letsdebug.net/). This tool can identify an array of issues specifically for [Let's Encrypt](https://letsencrypt.org) certificates including problems with DNS, nameservers, networking issues, common website misconfigurations, and CA policy issues.

</Accordion>

<Partial file="enable-https.md" />

## Let's Encrypt Certificates

[Let's Encrypt](https://letsencrypt.org) is a free, automated, and open certificate authority that aims to make HTTPS the standard for all websites, a goal we share. Pantheon automatically provisions a Let's Encrypt certificate for your site, and always renews it automatically, for no additional cost. Let's Encrypt issued certs are valid for 90 days and we renew them 30 days before expiration.

<Partial file="https-requirements.md" />

## Technical Specifications

<Partial file="tables/https-specs.md" />


## Glossary

### HTTPS

HTTPS encrypts and decrypts requests. For more information, see [this Google resource](https://support.google.com/webmasters/answer/6073543?hl=en).

### TLS (Transport Layer Security)
TLS (Transport Layer Security) is a protocol for secure HTTP connections. It replaces its less secure predecessor, the **SSL (Secure Socket Layer)** protocol, which we no longer support. Pantheon uses the term HTTPS to refer to secure HTTP connections.

### Server Name Indication (SNI)

Server name indication (SNI) is the technology replacing the expensive, legacy load balancers and allows multiple secure (HTTPS) websites to be served off the same IP address, without requiring all those sites to use the same certificate.

## Troubleshooting HTTPS

### HTTPS Doesn't Provision with Incorrect AAAA Configurations

Pantheon cannot not begin provisioning HTTPS if the Site Dashboard detects incorrect values set on AAAA records. After you update the records using the recommended values, HTTPS will start to provision automatically. The values for AAAA records look similar, but they are distinct.

### Certificate Mismatch Browser Warning

If your DNS changes propagate before certificates are fully deployed across the CDN, it's possible to see a certificate mismatch. To avoid this situation, wait a full 60 minutes from starting the upgrade to updating DNS. If you see a certificate mismatch, you can simply wait it out (up to 60 minutes), though you may also be able to see the new service in action more quickly using a different browser or incognito window.

### HTTPS Doesn't Provision with Sucuri's Default Settings

By default Sucuri blocks serving the challenges needed to verify domain ownership and issue Let's Encrypt certificates. Contact Sucuri support and request they enable the "Forward Certificate Validation" setting, which allows HTTPS provisioning to complete successfully. Note you'll want to keep this setting enabled, so the certificate will always renew automatically.

### Moz Pro 804 HTTPS SSL error

Moz Pro is unable to crawl sites using Server Name Indication (SNI). For information on beta access to SNI support, see [Moz Pro, our web crawler, and sites that use SNI (804 HTTPS SSL) error](https://moz.com/community/q/moz-pro-our-web-crawler-and-sites-that-use-sni).

### 403 Permission Denied (Drupal)

The text challenge to pre-provision HTTPS on Pantheon requires adding a `.well-known` directory to the root of your site. However, Drupal core has a line in the `.htaccess` file that disallows Apache from serving dot files and folders, which returns a 403 permission denied response. If you see this error while trying to  pre-provision HTTPS on Drupal sites, use the [Let's Encrypt Challenge](https://www.drupal.org/project/letsencrypt_challenge) contrib module as a workaround.


### Addressing Let's Encrypt Rate Limits

Pantheon requests new certificates frequently in order to add domains to existing certificates. This can potentially expose  organizations managing many domains to Let's Encrypt rate limits. While sites hosted on Pantheon are not subject to these lower limits, sites hosted off the platform may experience request failures.

If you encounter rate limits, we recommend the following approaches:

- [Ask Let's Encrypt to increase your rate limit](https://docs.google.com/forms/d/e/1FAIpQLSetFLqcyPrnnrom2Kw802ZjukDVex67dOM2g4O8jEbfWFs3dA/viewform).
- Consider using another certificate service for sites that are not on Pantheon. For example, educational institutions may want to consider using the [Incommon Certificate Service](https://www.incommon.org/certificates/) as a workaround.

## More Resources

- [Custom Certificates](/custom-certificates#option-2-manually-managed-custom-certificates)

- [Bypassing Cache with HTTP Headers](/cache-control)

