---
title: Early Access: Free and Automated HTTPS
earlyaccess: true
description: Upgrade to Free and Automated HTTPS, powered by Let's Encrypt
earlynote: The documentation on this page discusses features and options that are not available across the entire platform.
---
Pantheon is rolling out a new feature to manage HTTPS for customers using [Let's Encrypt](https://letsencrypt.org). This is deployed as part of our new [Global CDN](/docs/global-cdn) (content delivery network) which can significantly improve website performance. This doc describes the early access program for eligible customers to opt-in to this new set of features.

## Eligibility
Sites currently paying a $30 HTTPS surcharge via credit card on a Professional or Business plan — and with 10 or fewer custom domains — are eligible today. If you are not in this group but are eager to try it out for a specific project, you can [request early access](http://learn.pantheon.io/201701-HTTPS-Reg.html) and we will consider this on a case-by-case basis.

## Managed HTTPS vs Legacy
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

### Is HTTPS encryption end-to-end?
Yes! HTTPS is terminated at the CDN edge, but traffic is encrypted all the way to the individual application container. This is an incremental improvement over our legacy system which terminated all encryption at the loadbalancer (inside the datacenter), and a huge upgrade over setups which use a "mixed mode" strategy of terminating HTTPS at the CDN and then back-ending to the origin over unencrypted clear text communication.

### Does upgrading involve HTTPS interruptions or downtime?
No, after you update your DNS records, traffic will gracefully switch over and involves no downtime or HTTPS interruption.

**Caveat:** If after upgrading you add a new domain that is not already routed to Pantheon, then it will take up to an hour for HTTPS to provision for that new domain. Pre-provisioning HTTPS for new domains is planned after early access.

### Which browsers and operating systems are supported?
All modern browsers and operating systems are supported. For details, see the **Handshake Simulation** portion of this [report](https://www.ssllabs.com/ssltest/analyze.html?d=pantheon.io).

### What about CloudFlare?
Many customers currently take advantage of CloudFlare's awesome Universal SSL offering to get free HTTPS service for their website. If you are _just_ using CloudFlare for the HTTPS service, you can switch to the Global CDN and get an upgrade in performance and SSLLabs score.

However, customers using CloudFlare's WAF tools or other features may want to keep CloudFlare in their stack. We still recommend upgrading your Pantheon site to the Global CDN as this will improve cache hitrates and performance. There are no known issues with layering CloudFlare and the Global CDN together. Ignore the DNS recommendations and action required notices from the Site Dashboard, and use the [configuration described in our related guide](/docs/guides/cloudflare-enable-https/) instead.

To use Cloudflare as a DNS hosting provider and Pantheon's Global CDN and Managed HTTPS service, configure DNS as recommended in the Site Dashboard and disable Cloudflare's CDN by toggling the cloud icon to grey.

### When will I stop being billed $30/month?
Pantheon will remove legacy load balancers and stop billing 30-60 days after upgrading.

### Can I downgrade back to the legacy HTTPS?
Yes, if you wish to downgrade, please:

1. Fill out this [survey](https://www.getfeedback.com/r/vQ6B9pVA) to help us understand why you'd like to downgrade.
2. [Contact support](/docs/getting-support) with the confirmation number displayed after submitting the survey.

<div class="alert alert-info">
<h4 class="info">Note</h4>
<p markdown="1">Request a downgrade within 30 days of completing this upgrade to recover the same IP address and certificate used by your site's legacy HTTPS implementation.

Requests received after 30 days will require loading a certificate and private key to a new load balancer with a new IP address.
</p>
</div>

### What level of encryption is provided?
High grade TLS 1.2 encryption with up-to-date ciphers. For a deep analysis of the HTTPS configuration on upgraded sites see [this A+ SSL Labs report for https://pantheon.io](https://www.ssllabs.com/ssltest/analyze.html?d=pantheon.io).

### How can I obtain an A+ SSL Labs rating?
Follow the steps to upgrade and send the [HSTS header](/docs/hsts/) as described.

### Are wildcard certificates supported?
No, but you don’t need a wildcard certificate to secure communications for multiple domains because we will automatically deploy certificates for all domains on your site.

### Is Extended Validation supported?
No, please take a moment to fill out the [HTTPS survey](https://www.getfeedback.com/r/LETtb3QV) if you require Extended Validation.

### What About Personal Plans?
We share Let's Encrypt's goal of making HTTPS the standard for all sites on the internet, which means making it the standard for all sites on Pantheon. However, at this time we are focused on our existing HTTPS customers (Pro plans and above), and there's a considerable amount of work in making sure the new solution meets their needs, and that we are able to deprecate the legacy edge. There is not yet a timeline for providing HTTPS service to Personal plans.

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
