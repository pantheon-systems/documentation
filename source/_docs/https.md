---
title: HTTPS on Pantheon's Global CDN
description: Learn the specifics of Pantheon's Free and Automated HTTPS, powered by Let's Encrypt
tags: [dns, security]
---
Pantheon's new [Global CDN](/docs/global-cdn) provides [free, automated HTTPS](https://pantheon.io/features/managed-https) for every site launched on the platform. For instructions and go live best practices, see [Launch Essentials](/docs/guides/launch/).

<div class="enablement">
  <h4 class="info" markdown="1">[Agency DevOps Training](https://pantheon.io/agencies/learn-pantheon?docs){.external}</h4>
  <p>Get the most out of Global CDN with help from the experts at Pantheon. We deliver custom workshops to help development teams master the platform and improve internal DevOps.</p>
</div>

## Feature Comparison
<table class="table  table-bordered table-responsive">
  <thead>
    <tr>
      <th></th>
      <th>Legacy</th>
      <th>Managed</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Price</th>
      <td>$30/mo per environment</td>
      <td>Free for Live Environments</td>
    </tr>
    <tr>
      <th>Certificate type</th>
      <td>Bring your own</td>
      <td>Shared, issued by Let's Encrypt</td>
    </tr>
    <tr>
      <th>Renewal</th>
      <td>Up to you</td>
      <td>Pantheon does it</td>
    </tr>
    <tr>
      <th>Inbound IP</th>
      <td>Static (unique/dedicated)</td>
      <td>Static (shared)</td>
    </tr>
    <tr>
      <th>Client Support</th>
      <td>94.58% of browsers<br />Some very old browsers not supported
      <sup><a href="https://caniuse.com/#search=TLS%201.1">1</a></sup></td>
      <td>94.33% of browsers<br />Some very old browsers not supported
      <sup><a href="https://caniuse.com/#search=TLS%201.2">1 <a href="https://caniuse.com/#search=SNI">2</a></sup></td>
    </tr>
    <tr>
      <th><a href="https://www.ssllabs.com/ssltest/">SSL Labs</a> Rating</th>
      <td>A</td>
      <td>A+ <a href="/docs/hsts/">with HSTS</a></td>
    </tr>
    <tr>
      <th>Protocol</th>
      <td>TLS 1.1 & 1.2</td>
      <td>TLS 1.2 with SNI</td>
    </tr>
    <tr>
      <th>Ciphers</th>
      <td>Allows weak 3DES cipher</td>
      <td>Strong ciphers only</td>
    </tr>
    <tr>
      <th>Delivery</th>
      <td>US Datacenter</td>
      <td markdown="1">[Global CDN](/docs/global-cdn)</td>
    </tr>
    <tr>
      <th>Encryption Endpoint</th>
      <td>Load Balancer</td>
      <td>Application Container</td>
    </tr>
  </tbody>
</table>

## Let's Encrypt Certificates
[Let's Encrypt](https://letsencrypt.org) is a free, automated, and open certificate authority that aims to make HTTPS the standard for all websites, a goal we share. Pantheon automatically adds your site's domains to a shared Let's Encrypt certificate, and always renew it automatically, with no additional cost.

## Frequently Asked Questions
### How do I upgrade my existing Pantheon site?
Make the switch on an existing Pantheon site by updating DNS for your domains. If you don't see action required, open a support chat to get the upgrade enabled.

### What level of encryption is provided?
High grade TLS 1.2 encryption with up-to-date ciphers. For a deep analysis of the HTTPS configuration on upgraded sites see [this A+ SSL Labs report for https://pantheon.io](https://www.ssllabs.com/ssltest/analyze.html?d=pantheon.io).

### How can I obtain an A+ SSL Labs rating?
Upgrade your site to the Global CDN and then send the [HSTS header](/docs/hsts/) .

### Can I bring my own certificate?
No, but you shouldn't need to buy a dedicated certificate or worry about renewals. For example, wildcard certificates aren't necessary to secure communications for multiple domains, because we will automatically deploy certificates for all domains on your site. The certificates provided by Pantheon on the Global CDN provide end-to-end encryption. Even though certificates are shared, they are still secure. Concerns with shared certificates are cosmetic.

Some customers have purchased expensive certificates, often through an upsell from the certificate authority. Unfortunately, an expensive certificate does not mean increased security. If in doubt, we encourage you to test your site with SSL Labs, compare it to this [A+ report](https://www.ssllabs.com/ssltest/analyze.html?d=pantheon.io), and share it with your client.

If bringing your own certificate is a hard requirement, then we recommend terminating HTTPS through a 3rd-party CDN service provider like Cloudflare, CloudFront, StackPath, Fastly, etc.

### Is HTTPS encryption end-to-end?
Yes! HTTPS is terminated at the CDN edge and traffic is encrypted all the way to the individual application container. This is an improvement over our legacy system that terminated all encryption at the load balancer, and a huge upgrade over setups which use a "mixed mode" strategy of terminating HTTPS at the CDN and then back-ending to the origin over unencrypted clear text communication.

### Will HTTPS be available for my site throughout the upgrade process?
Yes! As long as your are following the Dashboard DNS recommendations before starting the upgrade, you will see no interruption in HTTPS service. The process to provision certificates can take up to an hour, after which you can update DNS records without HTTPS interruption.

Existing sites that are live over HTTPS which are not already hosted on Pantheon can [pre-provision HTTPS](/docs/guides/launch/configure-dns/) to avoid interruption. If you are unable to prove ownership as described, we recommend a maintenance window.

<div class="alert alert-info" markdown="1">
<h4 class="info">Note</h4>
You cannot pre-provision HTTPS if:

 - You cannot host the provided verification file on the current site.
 - Your current server doesn't support files without extension names (like IIS with .NET)

If you do not already have HTTPS, there's _no need_ to pre-provision.

</div>

### How many custom domains are supported?
{% include("content/tables/custom-domains-limit.html") %}

### Which browsers and operating systems are supported?
All modern browsers and operating systems are supported. For details, see the **Handshake Simulation** portion of this [report](https://www.ssllabs.com/ssltest/analyze.html?d=pantheon.io).

### What about Cloudflare?
Refer to [Cloudflare Domain Configuration](/docs/cloudflare/).

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

### Drupal text challenge file gets 403 - permission denied on Apache
Drupal core has a line in the `.htaccess` file that disallows apache to serve files and folders starting with `.` (**dot files**).  The text challenge provided in the Pantheon dashboard to pre-provision the certificate requires that you add a `.well-known` folder into the root of your site.  We recommend using the [Let's Encrypt Challenge](https://www.drupal.org/project/letsencrypt_challenge){.external} contrib module to work around this issue.

## Glossary
### HTTPS
HTTPS encrypts and decrypts requests. For more information, see [this Google resource](https://support.google.com/webmasters/answer/6073543?hl=en).

### TLS (Transport Layer Security)
TLS (Transport Layer Security) is a protocol for secure HTTP connections. It replaces its less secure predecessor, the **SSL (Secure Socket Layer)** protocol, which we no longer support. Pantheon uses the term HTTPS to refer to secure HTTP connections.

### Server Name Indication (SNI)
Server name indication (SNI) is the technology replacing the expensive, legacy load balancers and allows multiple secure (HTTPS) websites to be served off the same IP address, without requiring all those sites to use the same certificate.
