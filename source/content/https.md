---
title: "HTTPS on Pantheon's Global CDN"
description: "Learn the specifics of Pantheon's Free and Automated HTTPS, powered by Let's Encrypt"
categories: [go-live]
tags: [cdn, dns, https, security]
layout: doc
permalink: docs/:basename
searchboost: 200
---

Pantheon's new [Global CDN](/global-cdn) provides [free, automated HTTPS](https://pantheon.io/features/managed-https) for every site launched on the platform.

<Enablement title="Agency WebOps Training" link="https://pantheon.io/learn-pantheon?docs">

Get the most out of Global CDN with help from the experts at Pantheon. We deliver on-demand training to help development teams master the platform and improve internal WebOps.

</Enablement>

<Partial file="configure-dns.md" />

<Alert type="info" title="Note">

When adding the domain to your environment, you may be presented with the option to **Verify your domain to provision HTTPS**. If you're using a manually managed [custom certificate](/custom-certificates#option-2-manually-managed-custom-certificates), skip this step by clicking **Skip to updating DNS**.

</Alert>

For more detailed instructions pertaining to your specific DNS host, click below:

<Accordion title="DNS Host-Specific Instructions" id="host-specific2" icon="info-sign">

<DNSProviderDocs />

</Accordion>

<Partial file="enable-https.md" />

## Let's Encrypt Certificates

[Let's Encrypt](https://letsencrypt.org) is a free, automated, and open certificate authority that aims to make HTTPS the standard for all websites, a goal we share. Pantheon automatically provisions a Let's Encrypt certificate for your site, and always renews it automatically, for no additional cost. Let's Encrypt issued certs are valid for 90 days and we renew them 30 days before expiration.

<Partial file="https-requirements.md" />

<Partial file="tables/https-specs.md" />

## Frequently Asked Questions

### How do I switch my site over to HTTPS from HTTP?

To avoid mixed-content browser warnings and excessive redirects, follow the process described in [Switching Sites from HTTP to HTTPS](/http-to-https).

### How do I upgrade my existing Pantheon site?

Make the switch on an existing Pantheon site by updating DNS for your domains. If your site doesn't have the new combined "Domains/HTTPS" tab, open a support chat to get the upgrade enabled

### What level of encryption is provided?

High grade TLS 1.2 encryption with up-to-date ciphers. For a deep analysis of the HTTPS configuration on upgraded sites see [this A+ SSL Labs report for https://pantheon.io](https://www.ssllabs.com/ssltest/analyze.html?d=pantheon.io).

### How can I obtain an A+ SSL Labs rating?

Upgrade your site to the Global CDN and then send the [HSTS header](/pantheon-yml/#enforce-https--hsts).

### Can I bring my own certificate?

Yes. See our page on [custom certificates](/custom-certificates) for more information.

But you shouldn't need to buy a custom certificate or worry about renewals in most cases. For example, wildcard certificates aren't necessary to secure communications for multiple domains, because we will automatically deploy certificates for all domains on your site. The certificates provided by Pantheon on the Global CDN provide end-to-end encryption.

Some customers have purchased expensive certificates, often through an upsell from the certificate authority. Unfortunately, an expensive certificate does not mean increased security. If in doubt, we encourage you to test your site with SSL Labs, compare it to this [A+ report](https://www.ssllabs.com/ssltest/analyze.html?d=pantheon.io), and share it with your client.

If bringing your own certificate is a hard requirement, then we recommend terminating HTTPS through a 3rd-party CDN service provider like Cloudflare, CloudFront, StackPath, etc. Configuration differs depending on provider, so please [contact support](/support) to discuss your case.

### Is HTTPS encryption end-to-end?

Yes! HTTPS is terminated at the CDN edge and traffic is encrypted all the way to the individual application container. This is an improvement over our legacy system that terminated all encryption at the load balancer, and a huge upgrade over setups which use a "mixed mode" strategy of terminating HTTPS at the CDN and then back-ending to the origin over unencrypted clear text communication.

### Will HTTPS be available for my site throughout the upgrade process?

Yes! As long as you are following the Dashboard DNS recommendations before starting the upgrade, you will see no interruption in HTTPS service. The process to provision certificates can take up to an hour, after which you can update DNS records without HTTPS interruption.

Existing sites that are not already hosted on Pantheon can [pre-provision HTTPS](/guides/launch/domains/#avoid-https-interruption) to avoid interruption. If you are unable to prove ownership as described, we recommend a maintenance window.

<Alert title="Note" type="info">

You can pre-provision HTTPS via DNS records, or the Let's Encrypt ACME challenge file. You cannot use the challenge file if:

 - You cannot host the provided verification file on the current site.
 - Your current server doesn't support files without extension names (like IIS with .NET)

Verifying with the provided DNS record is the preferred method for customers who can make new DNS records for their domain(s).

If you do not already have HTTPS, you don't need to pre-provision, but doing so will allow you to launch your Pantheon site with HTTPS already enabled, and is recommended.

</Alert>

### How many custom domains are supported?

<Partial file="tables/custom-domains-limit.md" />

### Which browsers and operating systems are supported?

All modern browsers and operating systems are supported. For details, see the **Handshake Simulation** portion of this [report](https://www.ssllabs.com/ssltest/analyze.html?d=pantheon.io).

### What about Cloudflare?

Refer to [Cloudflare Domain Configuration](/cloudflare).

### For how long are Let's Encrypt certificates valid and what happens when they expire?

Let's Encrypt certificates are valid for 90 days and are automatically updated on the platform before they expire.

## Known Issues

### HTTPS doesn't provision with incorrect AAAA configurations

Pantheon cannot not begin provisioning HTTPS if the Site Dashboard detects incorrect values set on AAAA records. Once you update the records using the recommended values, HTTPS will start to provision automatically. The values for AAAA records look similar, but they are distinct.

### Certificate Mismatch Browser Warning

If your DNS changes propagate before certificates are fully deployed across the CDN, it's possible to see a certificate mismatch. To avoid this situation, wait a full 60 minutes from starting the upgrade to updating DNS. If you see a certificate mismatch, you can simply wait it out (up to 60 minutes), though you may also be able to see the new service in action more quickly using a different browser or incognito window.

### HTTPS doesn't provision with Sucuri's default settings

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

## Glossary

### HTTPS

HTTPS encrypts and decrypts requests. For more information, see [this Google resource](https://support.google.com/webmasters/answer/6073543?hl=en).

### TLS (Transport Layer Security)
TLS (Transport Layer Security) is a protocol for secure HTTP connections. It replaces its less secure predecessor, the **SSL (Secure Socket Layer)** protocol, which we no longer support. Pantheon uses the term HTTPS to refer to secure HTTP connections.

### Server Name Indication (SNI)

Server name indication (SNI) is the technology replacing the expensive, legacy load balancers and allows multiple secure (HTTPS) websites to be served off the same IP address, without requiring all those sites to use the same certificate.
