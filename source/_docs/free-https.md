---
title: Early Access: Free and Automated HTTPS
earlyaccess: true
description: Upgrade to Free and Automated HTTPS, powered by Let's Encrypt
---
Pantheon is rolling out a new feature to manage HTTPS for customers using [Let's Encrypt](https://letsencrypt.org). This includes the addition of a global CDN (content delivery network) which can significantly improve website performance. This doc describes the early access program for eligible customers to opt-in to this new set of features.

## Let's Encrypt Certificates
Let's Encrypt is a free, automated, and open certificate authority that aims to make HTTPS the standard for all websites, a long-term goal we share. Using their service, Pantheon can automatically add your site's domains to a shared certificate. This allows us to obtain, deploy, and manage certificates for HTTPS service for customers without an additional $30 surcharge.

## Global CDN
The new service terminates HTTPS and serves all traffic through our new globally distributed content delivery network (CDN). This means that many if not most requests for resources on Pantheon can be served from a location much closer to the end-user, which can speed up the time to render a web-page significantly. The impact will vary depending on the site and where the user is, but we expect almost all users to see at least some benefit.

## Eligibility
As of April 20th 2017, sites currently paying a $30 HTTPS surcharge via credit card on a Professional or Business plan — and with 10 or fewer custom domains — are eligible today. If you are not in this group but are eager to try it out for a specific project, you can [request early access](http://learn.pantheon.io/201701-HTTPS-Reg.html) and we will consider this on a case-by-case basis.

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

For more information see the FAQ section below in this document.

## Enabling Next Generation HTTPS Service

### Find Eligible Sites in the Dashboard
Look for site thumbnails that show **HTTPS Upgrade Available** in your User Dashboard or use the **HTTPS Upgrade** search facet in the [Organization Dashboard](/docs/organization-dashboard/#filter-sites) to filter eligible sites.

### Upgrade Your Site

1. Click the **Start HTTPS Upgrade** button from the Site Dashboard.
2. It can take up to an hour for the new certificate to deploy across the entire CDN. If you want to avoid any possible hiccoughs you can wait an additional 60 minutes before updating DNS.

  ![Domains and HTTPS action required](/source/docs/assets/images/dashboard/domains-action-required.png)

  If you want to proceed without waiting, we strongly recommend testing locally before making the final DNS change.

    <div class="panel panel-default">
      <div class="panel-heading">
      <a data-proofer-ignore data-toggle="collapse" data-target="#test-locally"><h3 class="panel-title" style="cursor:pointer;">Test Certificate Locally (Optional) <span class="caret"></span></h3></a>
      </div>
      <div id="test-locally" class="collapse" style="padding:10px;">
      <p>If you would like to test locally before configuring your domain's DNS to use Pantheon's Free and Automated HTTPS:</p>
        <ol>
          <li>Copy the A record value provided for the site's bare domain.</li>
          <li>Add a line to your <a href="https://en.wikipedia.org/wiki/Hosts_(file)">local hosts</a> file which includes the IP address followed by the domain, for example:
          <pre><code>192.123.456.789 example.com</code></pre></li>
          <li>Test your site locally by entering your domain in the browser. Once you have finished testing, remove the edits made to your hosts file.</li>
        </ol>
      </div>
    </div>

3. Click **Show DNS Recommendations** next to each custom domain to identify DNS values needed to point the domain to your site. Domains that are not yet configured will indicate action is required. You will need to configure your DNS provider to use the provided IP addresses.

    <div class="alert alert-info">
    <h4 class="info">Pro Tip</h4>
Look up your DNS provider with this free web tool: <a href="https://mxtoolbox.com/DNSLookup.aspx">https://mxtoolbox.com/DNSLookup.aspx</a>
</div>

  DNS records are cached across the internet and can take up to 72 hours to propagate, depending on the time to live (TTL) configured for the domain's DNS records. Most records update more quickly, and you can track the progress of DNS propogation.

      <div class="alert alert-info">
      <h4 class="info">Pro Tip</h4>
Check the current state of DNS propagation from different parts of the world using this free web tool <a href="https://www.whatsmydns.net/">https://www.whatsmydns.net/</a>
</div>

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
