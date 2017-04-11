---
title: Early Access: Free and Automated HTTPS
earlyaccess: true
description: Upgrade to Free and Automated HTTPS, powered by Let's Encrypt
---
Upgrade your site's HTTPS and never manage certificates again. Pantheon automatically adds all of your site's domains to a shared certificate and  serves it through our new globally distributed content delivery network (CDN). Upgrade to take advantage of performance and security benefits and to save the time and cost of manually purchasing and maintaining certs.

## Eligibility
Invite only (per site). As of April 2017, sites on a Professional plan with HTTPS already enabled and all custom domains routing to Pantheon may [request an invite](http://learn.pantheon.io/201701-HTTPS-Reg.html).

## Upgrade Your Site

1. Click the **Start HTTPS Upgrade** button from the Site Dashboard.
2. Wait for HTTPS provisioning to complete (may take up to an hour).
3. Once HTTPS is ready, you will see action required on the **Domains & HTTPS** tab for each environment, with instructions to configure DNS for each custom domain.  
4. Click **Show DNS Recommendations** next to each custom domain to identify DNS values needed to point the domain to your site. Domains that are not yet configured will indicate action is required.

    <div class="panel panel-default">
      <div class="panel-heading">
      <a data-proofer-ignore data-toggle="collapse" data-target="#test-locally"><h3 class="panel-title" style="cursor:pointer;">Test Certificate Locally (Optional) <span class="caret"></h3></a>
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

5. Configure DNS using the provided destinations at the domain's DNS provider.

    <div class="alert alert-info">
    <h3 class="info">Pro Tip</h3>
Look up your DNS provider with this free web tool: <a href="https://mxtoolbox.com/DNSLookup.aspx">https://mxtoolbox.com/DNSLookup.aspx</a>
</div>

6. Wait for your DNS changes to fully propagate. DNS records are cached across the internet and can take up to 72 hours to propagate, depending on the time to live (TTL) configured for the domain's DNS records.

      <div class="alert alert-info">
      <h3 class="info">Pro Tip</h3>
Check the current state of DNS propagation from different parts of the world using this free web tool <a href="https://www.whatsmydns.net/">https://www.whatsmydns.net/</a>
</div>

7. Confirm the upgrade is complete from the **Domains & HTTPS** tab. Once DNS has been configured and propagated, you will see confirmation on this tab.

## Require HTTPS (Highly Recommended)

### HTTP Strict Transport Security Header

We recommend sending a HTTP Strict Transport Security (HSTS) header using the following module or plugin. This is the last step to get an A+ SSL rating from [SSL Labs](https://www.ssllabs.com/ssltest/) and helps to protect your website against protocol downgrade attacks and cookie hijacking. For additional details on this header, see [HTTP Strict Transport Security Cheat Sheet](https://www.owasp.org/index.php/HTTP_Strict_Transport_Security_Cheat_Sheet).

<ul class="nav nav-tabs" role="tablist">
  <li role="presentation" class="active"><a href="#wp" aria-controls="wp" role="tab" data-toggle="tab">WordPress</a></li>
  <li role="presentation"><a href="#drops7" aria-controls="drops7" role="tab" data-toggle="tab">Drupal 7</a></li>
  <li role="presentation"><a href="#drops8" aria-controls="drops8" role="tab" data-toggle="tab">Drupal 8</a></li>
</ul>

<!-- Tab panes -->
<div class="tab-content">
  <div role="tabpanel" class="tab-pane active" id="wp">
    <p>Install and activate the <a href="https://wordpress.org/plugins/lh-hsts/">LH HSTS</a> plugin.</p>
  </div>
  <div role="tabpanel" class="tab-pane" id="drops7">
    <ol>
      <li>Install the <a href="https://drupal.org/project/hsts">HTTP Strict Transport Security</a> module.</li>
      <li>Visit the module configuration page (<code>/admin/config/security/hsts</code>).</li>
      <li>Check the <strong>Enable HTTP Strict Transport Security</strong> checkbox, set <strong>Max Age</strong> to <code>15552000</code> and click <strong>Save Configuration</strong>.</li>
    </ol>
  </div>
  <div role="tabpanel" class="tab-pane" id="drops8">
    <ol>
      <li>Install the <a href="https://drupal.org/project/hsts">HTTP Strict Transport Security</a> module.</li>
      <li>Visit the module configuration page (<code>/admin/config/system/hsts</code>).</li>
      <li>Check the <strong>Enable HTTP Strict Transport Security</strong> checkbox, set <strong>Max Age</strong> to at least <strong>1 year</strong> and click <strong>Save Configuration</strong>.</li>
    </ol>
  </div>
</div>

### 301 Redirects

You're likely already issuing 301 redirects via the WordPress `wp-config.php` file or the Drupal `settings.php` file to require HTTPS and standardize on a common domain. Standardizing on a common domain (for example, `https://www.example.com` or `https://example.com`) is a best practice for SEO to prevent duplicate content, as well as session strangeness, where a user can be logged in on one domain but logged out of other domains at the same time. See [recommended code samples for redirects](/docs/redirects/#require-https-and-standardize-domain) and adapt for your specific use case.

## Compare to Legacy HTTPS
<table class="table  table-bordered table-responsive">
  <thead>
    <tr>
      <th></th>
      <th>Legacy</th>
      <th>Free & Automated</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Price</th>
      <td>$30/mo per environment</td>
      <td>Free for all environments</td>
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
      <td>A+ <a href="#http-strict-transport-security-header">with HSTS</a></td>
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
      <th><a href="/docs/timeouts/#timeouts-that-are-not-configurable">Timeouts</a></th>
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

### When do I stopped being billed $30/month?
Pantheon will remove legacy load balancers and stop billing 30-60 days after upgrading.

### Can I downgrade back to the legacy HTTPS?
Yes, if you wish to downgrade, please contact Pantheon support.

* If you request the downgrade within 30 days of completing the upgrade, then your existing legacy load balancer will be available, with the same IP address and certificate.
* If you request the downgrade after 30 days of completing the upgrade, you will be able to load a certificate and private key to a new load balancer with a new IP address.

### What level of encryption is provided?
High grade TLS 1.2 encryption with up-to-date ciphers. For a deep analysis of the HTTPS configuration on upgraded sites see [this A+ SSL Labs report for https://pantheon.io](https://www.ssllabs.com/ssltest/analyze.html?d=pantheon.io).

### How can I obtain an A+ SSL Labs rating?
Follow the steps to upgrade and send the [HSTS header](#http-strict-transport-security-header) as described above.

### Are wildcard certificates supported?
No, but you don’t need a wildcard certificate to secure communications for multiple domains because we will automatically deploy certificates for all domains on your site.

### Is Extended Validation supported?
No, please take a moment to fill out the [HTTPS survey](https://www.getfeedback.com/r/LETtb3QV) if you require Extended Validation.

### Is the CDN configurable? Do I get access to hit rates or other statistics?
No, we pre-configured the CDN so you don’t have to hassle with configuration. We’ve optimized configuration for Drupal and WordPress sites. Hit rates or other statistics are not available.


## Glossary

### HTTPS
HTTPS encrypts and decrypts user page requests as well as the pages that are returned by the Web server. For additional details, see [this Google resource](https://support.google.com/webmasters/answer/6073543?hl=en).

### TLS (Transport Layer Security)
TLS (Transport Layer Security) is a protocol for secure HTTP connections. This protocol replaces its less secure predecessor, the **SSL (Secure Socket Layer)** protocol, which we no longer support. Pantheon uses the term HTTPS to refer to secure HTTP connections.

### Server Name Indication (SNI)
Server name indication (SNI) is the technology replacing the expensive, legacy load balancers and allows multiple secure (HTTPS) websites to be served off the same IP address, without requiring all those sites to use the same certificate.

## Troubleshooting

### 503 Header Overflow
This server response occurs when a request exceeds the 10K size limit for cookies. For details, see [Errors and Server Responses](/docs/errors-and-server-responses#503-header-overflow).

### Infinite Redirect Loops
This error may be a result of using the ` $_SERVER['HTTP_X_FORWARDED_PROTO']` variable within redirect logic. For details, see [Redirect Incoming Requests](/docs/redirects/#troubleshooting).

### Moz Pro 804 HTTPS SSL error
Currently, Moz Pro is unable to crawl sites using Server Name Indication (SNI). For information on beta access to SNI support, see [Moz Pro, our web crawler, and sites that use SNI (804 HTTPS SSL) error](https://moz.com/community/q/moz-pro-our-web-crawler-and-sites-that-use-sni).
