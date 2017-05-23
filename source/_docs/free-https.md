---
title: Early Access: Managed HTTPS
earlyaccess: true
description: Learn about Managed HTTPS, powered by Pantheon's new Global CDN using Let's Encrypt.
earlynote: The documentation on this page discusses features and options that are not available across the entire platform.
---
Pantheon is rolling out a new integrated Global CDN service offering, with improved performance and security for customer sites. The Global CDN features Managed HTTPS using Let's Encrypt to automatically support HTTPS for free. This page describes Managed HTTPS (powered by the new Global CDN) in comparison to our Legacy HTTPS service.

For information on the Global CDN service, early access eligibility, and steps to upgrade see [Early Access: Pantheon Global CDN](/docs/global-cdn/).

## Let's Encrypt Certificates
Let's Encrypt is a free, automated, and open certificate authority that aims to make HTTPS the standard for all websites, a long-term goal we share. Using their service, Pantheon can automatically add your site's domains to a shared certificate. This allows us to obtain, deploy, and manage certificates for HTTPS service for customers without an additional $30 surcharge.

## Next Generation vs Legacy HTTPS
<table class="table  table-bordered table-responsive">
  <thead>
    <tr>
      <th></th>
      <th>Legacy</th>
      <th>Next Generation</th>
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
      <td>Manual</td>
      <td>Automatic</td>
    </tr>
    <tr>
      <th>Inbound IP</th>
      <td>Unique</td>
      <td>Shared</td>
    </tr>
    <tr>
      <th>Client Support</th>
      <td>94.58% of browsers<br />Some very old browsers not supported
      <sup><a href="http://caniuse.com/#search=TLS%201.1">1</a></sup></td>
      <td>94.33% of browsers<br />Some very old browsers not supported
      <sup><a href="http://caniuse.com/#search=TLS%201.2">1 <a href="http://caniuse.com/#search=SNI">2</a></sup></td>
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
      <td>ORD Datacenter</td>
      <td>Global CDN</td>
    </tr>
    <tr>
      <th><a href="/docs/timeouts/#timeouts-that-are-not-configurable">Request Timeouts</a></th>
      <td>120 seconds</td>
      <td>60 seconds</td>
    </tr>
  </tbody>
</table>

## Frequently Asked Questions

### Does upgrading involve HTTPS interruptions or downtime?
No, after you update your DNS records, traffic will gracefully switch over and involves no downtime or HTTPS interruption.

**Caveat:** If after upgrading you add a new domain that is not already routed to Pantheon, then it will take up to an hour for HTTPS to be ready for that new domain. Pre-provisioning HTTPS for new domains is planned after early access, with the full release.

### Which browsers and operating systems are supported?
All modern browsers and operating systems are supported. For details, see the **Handshake Simulation** portion of this [report](https://www.ssllabs.com/ssltest/analyze.html?d=pantheon.io).

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

### Is the CDN configurable? Do I get access to hit rates or other statistics?
No, we pre-configured the CDN so you don’t have to hassle with configuration. We’ve optimized configuration for Drupal and WordPress sites. Hit rates or other statistics are not currently available.

### Why does the Domains and HTTPS tool indicate action required even though I've updated DNS records?
The action required message may be due to one of the following:

  - **DNS changes can take some time to take effect:** Check the current state of DNS propagation from different parts of the world using this [free web tool](https://www.whatsmydns.net/).
  -  **AAAA records not detected:**: Ensure you've added both AAAA records for the bare domain (e.g. `example.com`) to route IPv6 traffic to your site. There are two AAAA records for improved uptime and reliability.
  - **Old DNS records detected:** If in addition to the correct DNS records, you also have old records, make sure to delete the old records.

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
This error may be a result of using the ` $_SERVER['HTTP_X_FORWARDED_PROTO']` variable within redirect logic. For details, see [Redirect Incoming Requests](/docs/redirects/#troubleshooting).

### Moz Pro 804 HTTPS SSL error
Currently, Moz Pro is unable to crawl sites using Server Name Indication (SNI). For information on beta access to SNI support, see [Moz Pro, our web crawler, and sites that use SNI (804 HTTPS SSL) error](https://moz.com/community/q/moz-pro-our-web-crawler-and-sites-that-use-sni).
