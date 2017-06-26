---
title: Free and Automated HTTPS
description: Learn the specifics of Pantheon's Free and Automated HTTPS, powered by Let's Encrypt
tags: [dns, security]
---
Pantheon's new [Global CDN](/docs/global-cdn) (content delivery network) provides Free and Automated HTTPS for every site launched on the platform using [Let's Encrypt](https://letsencrypt.org). For instructions, see [Launch Essentials](/docs/guides/launch/).

## Free and Automated HTTPS vs Legacy
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
      <th>Plans</th>
      <td>Pro and Above</td>
      <td>Pro and Above</td>
    </tr>
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
      <td>Static (unique)</td>
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
      <td>Weak 3DES cipher</td>
      <td>No 3DES cipher</td>
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
Let's Encrypt is a free, automated, and open certificate authority that aims to make HTTPS the standard for all websites, a long-term goal we share. Using their service, Pantheon can automatically add your site's domains to a shared certificate. This allows us to obtain, deploy, and manage certificates for HTTPS service for customers without an additional $30 surcharge.

## Frequently Asked Questions
### How can I take advantage of Free & Automated HTTPS on existing sites?
Existing sites already Live on Pantheon can access Free & Automated HTTPS by configuring DNS as recommended in the Dashboard.

### Why does the Domains and HTTPS page indicate action required even after I updated DNS records?
The action required message may be due to one of the following:

  - **DNS changes need some time to take effect:** Check the current state of DNS propagation from different parts of the world using this [free web tool](https://www.whatsmydns.net/).
  -  **AAAA records not detected:** There are two AAAA records for improved uptime and reliability. Ensure you've added both AAAA records for the bare domain (e.g., example.com) to route IPv6 traffic to your site.
  - **Old DNS records detected:** If in addition to the correct DNS records, you also have old records, make sure to delete the old records.

### Can I bring my own certificate?
No, but you shouldn't need to buy a dedicated certificate or worry about renewals. For example, wildcard certificates aren't necessary to secure communications for multiple domains launched on Pantheon because we will automatically deploy certificates for all domains on your site.

If bringing your own certificate is a hard requirement (e.g., extended validation), then we recommend terminating HTTPS through a 3rd-party CDN service provider.

### Is HTTPS encryption end-to-end?
Yes! HTTPS is terminated at the CDN edge, but traffic is encrypted all the way to the individual application container. This is an incremental improvement over our legacy system which terminated all encryption at the loadbalancer (inside the datacenter), and a huge upgrade over setups which use a "mixed mode" strategy of terminating HTTPS at the CDN and then back-ending to the origin over unencrypted clear text communication.

### Does upgrading involve HTTPS interruptions or downtime?
No, existing sites that require HTTPS can prove ownership of the domain to pre-provision certificates on Pantheon. The process to provision  certificates can take up to an hour, after which you can update DNS records without fear of HTTPS interruption.


### Which browsers and operating systems are supported?
All modern browsers and operating systems are supported. For details, see the **Handshake Simulation** portion of this [report](https://www.ssllabs.com/ssltest/analyze.html?d=pantheon.io).

### What about CloudFlare or other CDNs?
Many customers currently take advantage of CloudFlare's awesome Universal SSL offering to get free HTTPS service for their website. If you are _just_ using CloudFlare for the HTTPS service, you can switch to the Global CDN and get an upgrade in performance and SSLLabs score.

However, customers using CloudFlare's WAF tools or other features may want to keep CloudFlare in their stack. There are no known issues with layering CloudFlare and the Global CDN together, but we strongly recommend you enforce HTTPS in Cloudflare and within WordPress or Drupal to avoid mixed content.

### What level of encryption is provided?
High grade TLS 1.2 encryption with up-to-date ciphers. For a deep analysis of the HTTPS configuration on upgraded sites see [this A+ SSL Labs report for https://pantheon.io](https://www.ssllabs.com/ssltest/analyze.html?d=pantheon.io).

### How can I obtain an A+ SSL Labs rating?
Follow the steps to upgrade and send the [HSTS header](/docs/hsts/) as described.

## Glossary

### HTTPS
HTTPS encrypts and decrypts user page requests as well as the pages that are returned by the Web server. For additional details, see [this Google resource](https://support.google.com/webmasters/answer/6073543?hl=en).

### TLS (Transport Layer Security)
TLS (Transport Layer Security) is a protocol for secure HTTP connections. This protocol replaces its less secure predecessor, the **SSL (Secure Socket Layer)** protocol, which we no longer support. Pantheon uses the term HTTPS to refer to secure HTTP connections.

### Server Name Indication (SNI)
Server name indication (SNI) is the technology replacing the expensive, legacy load balancers and allows multiple secure (HTTPS) websites to be served off the same IP address, without requiring all those sites to use the same certificate.

## Known Issues

### Certificate Mismatch Browser Warning
It is possible you may see a certificate mismatch in your browser if your DNS changes propogate before the new certificates are fully deployed across the CDN. If this is the case, you can simply wait it out (up to 60 minutes), though you may also be able to see the new service in action more quickly using a different browser or incognito window.

### 503 Header Overflow
This server response occurs when a request exceeds the 10K size limit for cookies. For details, see [Errors and Server Responses](/docs/errors-and-server-responses#503-header-overflow).

### Infinite Redirect Loops
Sites using Cloudflare's free universal SSL will experience redirect errors if the SSL mode is set to **Flexible**. This mode can also result in mixed content and privacy warnings from the browser. To resolve, log into Cloudflare and click **Crypto**, then set the SSL to **Full**.

Redirect errors can also be a result of using the ` $_SERVER['HTTP_X_FORWARDED_PROTO']` variable within redirect logic. For details, see [Redirect Incoming Requests](/docs/redirects/#troubleshooting).

### Moz Pro 804 HTTPS SSL error
Currently, Moz Pro is unable to crawl sites using Server Name Indication (SNI). For information on beta access to SNI support, see [Moz Pro, our web crawler, and sites that use SNI (804 HTTPS SSL) error](https://moz.com/community/q/moz-pro-our-web-crawler-and-sites-that-use-sni).
