---
title: Domains and DNS
description: Detailed information on adding a domain to your Pantheon Drupal or WordPress site.
category:
  - developing
  - managing
  - going-live
---
<div class="alert alert-info" role="alert">
<h4>DNS Configuration Varies Per Site</h4>
Your site's domain type, preferred domain (e.g. www or non-www), and whether you use HTTP or HTTPS determine your <a href="https://en.wikipedia.org/wiki/Domain_Name_System">DNS</a> configuration. Understand the differences to ensure a smooth launch.
</div>

## Steps to add domains and configure DNS

1. Enable SSL/HTTPS (highly recommended)
2. Add domain(s) to your Pantheon Site Dashboard
3. Get DNS recommendations
4. Test with /etc/hosts (recommended)
5. Add DNS records to route traffic to your Pantheon site
6. Verify DNS configuration

## Domain types

**Root domains** (aka bare, apex or naked domains) like **example.com** or **pantheon.io**

**Subdomains** add a prefix before the domain like **www.example.com** or **blog.example.com**

**Preferred domain** (aka canonical domain): Visitors may access your site using both the www and non-www versions of the URL (for instance, http://www.example.com and http://example.com). The <strong>preferred domain</strong> is the version that you want your visitors to end up on and determines what your DNS records will be.

## 1. Enable SSL/HTTPS (highly recommended)


<div class="alert alert-info" role="alert">
<h4>Why choose SSL/HTTPS?</h4>
<ul>
  <li><strong>Security</strong>: Encrypts sensitive data (like passwords used to login to your site)</li>
  <li><strong>SEO</strong>: Ranking signal for Search Engine Optimization. See [Google's Announcement](http://google.com)</li>
  <li><strong>Add DNS A Records</strong> to route traffic through your site's dedicated SSL load balancer with a static IP address</li>
  <li><strong>Standardize on www, non-www or other subdomain as your preferred domain</strong> by adding a 301 redirect in <code>settings.php</code> or <code>wp-config.php</code></li>
</ul>
</div>

Available for Pro plans and above. Possible to use service like Cloudflare to add HTTPS to Personal sites.

## 2.  Add domain(s) to your Pantheon Site Dashboard

From the Site Dashboard:

1. Visit **Site Dashboard** >> **Live** >> **Domains**.
2. Type your domain into the field and click **Add domain to the Live Environment**.

From the Terminal, with [Terminus, the Pantheon Command Line Interface (CLI)](https://github.com/pantheon-systems/cli):

```
$ terminus site hostnames add --site=example --env=live --hostname=example.com
Success: Added example.com to example-live
$ terminus site hostnames add --site=example --env=live --hostname=www.example.com
Success: Added www.example.com to example-live
```

## 3. Get DNS Records

<div class="alert alert-info" role="alert">
<h4>We recommend standardizing on www</h4>
Pantheon routes around network failures for better uptime. This is possible because your site's domain name is not tied to a static shared resource. All DNS providers will allow you to add an A record to our WWW redirection service so you can standardize on www as your preferred domain.

If you choose to standardize on a root domain instead of www you'll need to either enable SSL or use a DNS service that provides ALIAS or ANAME records or CNAME flattening. Not all DNS providers offer these types of records and services.
</div>

* Sites with HTTPS use A Records
 - Use **DNS A records** after enabling SSL. Refer to Pantheon Site Dashboard for your site's dedicated SSL load balancer.
* Sites without HTTPS have two main options
  1. **Standardize on www as your preferred domain (simpler)**. Follow the recommendations in the Site Dashboard, a **DNS CNAME record** to standardize on subdomains like www.example.com or blog.example.com and an A record for the bare domain to the redirection service which will **redirect all traffic from example.com to www.example.com**.
  2.  **Standardize on the root (non-www) domain as your preferred domain  (more steps)**. Sites with SSL enabled can standardize on the root domain. Otherwise, you can manage your DNS with a service like Cloudflare that offers "CNAME flattening," which allows you to point an A record at a domain name like live-example.pantheon.io, which you cannot traditionally do.  Other services that allow this type of setup: Route 53, DNSimple, DNS Made Easy, EasyDNS, CloudFlare, ClouDNS, and NameCheap.


## 4. Test with /etc/hosts

Temporarily modify the /etc/hosts file on your local workstation. For example, to test https://example.com add the IP address shown in your Site Dashboard to your /etc/hosts file

```
example.com  1.2.3.4
www.example.com 1.2.3.4
```
To test http://blog.example.com the line in /etc/hosts would look like:

```
blog.example.com live-example-blog.pantheon.io
```

Don't forget to remove this entry in your /etc/hosts file before actually updating your DNS records.

## 5. Add DNS records to route traffic to your Pantheon site

<div class="alert alert-info" role="alert">
<h4>Pantheon is not a Domain Registrar nor DNS Provider</h4>
Pantheon is not a domain registrar and does not provide DNS services. Once you determine the DNS records from your Pantheon Site Dashboard, add them through your domain registrar or DNS provider.
</div>

Refer to instructions for your domain registrar or DNS provider to add the appropriate DNS records.

## 6. Verify DNS Configuration

Use `dig` in your terminal to look up the DNS records for a domain. You can also dig with web based utilities.

```
dig +short <domain>
```

For example for https://pantheon.io dig output for www.pantheon.io and pantheon.io both show the same IP address of the site's dedicated SSL load balancer:

**Example of HTTPS configuration**
```
$ dig +short pantheon.io
50.57.202.75
$ dig +short www.pantheon.io
pantheon.io.
50.57.202.75
```


## Troubleshooting

### Help! I'm getting a redirect loop or an extra www when I visit my site

Review the **Get DNS Records** section above and update your DNS so your root domain is the only domain pointing at Pantheon's redirection service (dub dub dubber). If you require assistance open up a support ticket with a screenshot of your DNS configuration and output from `dig +short <your domain>`.

### How long will it take for DNS changes to take effect?

It can take 48 hours for your DNS changes to take effect. You can see the DNS records from DNS Servers around the world with tools like https://pulse.turbobytes.com/

We recommend lowering your TTL to something like 120 seconds a few days before you intend to switch DNS and make your site live on Pantheon.


### Can I add domains to environments other than Live?

Yes! Adding domains to your Test and Dev environments is a great way to test redirect logic in your settings.php or wp-config.php and other site functionality. Custom domains cannot be added to Multidev environments.

## See Also
* [Domain Basics (from Google)](http://google.com)
* [Improving Uptime with pantheon.io CNAME records](https://pantheon.io/blog/improving-uptime-pantheonio]
* [Going Live](/docs/articles/going-live)
