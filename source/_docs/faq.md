---
title: Frequently Asked Questions
description: Frequently asked questions about Drupal or WordPress sites on Pantheon.
tags: [services]
categories: []
---
## Getting Started

### Can I put production sites on Pantheon?

Yes. Thousands of live production sites run on Pantheon.

### What versions of Drupal does Pantheon support?

Pantheon supports Drupal 6, 7, and 8 sites. As of February 2016, the Drupal community [no longer supports Drupal 6](https://www.drupal.org/drupal-6-eol). Drupal 6 sites will continue to run on Pantheon, but there will no longer be any updates to fix bugs or security issues.

### What versions of WordPress does Pantheon support?

Pantheon supports the most recent release of WordPress via [upstream](https://github.com/pantheon-systems/WordPress), which includes platform integration plugins and a pre-configured wp-config.php.

### How much does Pantheon cost?
You can develop new sites for free on Pantheon. Billing starts when you're ready to go live and direct traffic to a site. See available plans on our [pricing page](https://pantheon.io/pricing).


### Where are the Pantheon servers located?
Our data center is in the United States, but Pantheon's [Global CDN](/docs/global-cdn/) serves content from 40+ POPs (points of presence) distributed around the world. We also have plans to add data centers in Europe, which would speed up authenticated traffic for end-users there, but we don't have an ETA for that expansion.

### Can I run other applications on Pantheon?

Only WordPress and Drupal applications are officially supported, but the PHP runtime is complete. Some users have experimented with running applications with custom PHP code.

### Does Pantheon have FTP or shell access?

Pantheon supports toggling between local development mode using `git push` to transfer all code changes, and an on-server development mode, which provides access to the codebase via SFTP.

Direct SSH access is not supported, but you are able to directly interface with mysql, use CLI tools ([Terminus](/docs/terminus/), [drush](/docs/drush), [WP-CLI](/docs/faq#does-pantheon-support-wp-cli%3F), and SFTP files).


### How does Pantheon work with DNS?

Pantheon can handle any domain name you point at it, however DNS configuration is still your responsibility. For more information, see [Launch Essentials](/docs/guides/launch/domains/).

### What are the differences between the environments?

- Dev has lower TTL on Varnish caching and shows errors to site users.
- Test has the same caching configuration as Live and does not show errors to users, but only one application server.
- Live has optimal caching and does not show errors to users, and (depending on the plan) can have multiple application servers for high availability and high performance.

To learn more, see [Using the Pantheon Workflow](/docs/pantheon-workflow/).


## Developing Sites

### Does Pantheon offer professional services?
No, however over 2000 design and development agencies partner with Pantheon to build and host their clients’ sites on our website management platform. [Get a personalized quote](https://pantheon.io/agencies/agency-match){.external} from Pantheon’s network of top agencies.

### Can Pantheon run sites on highly available server clusters?

Yes. Pantheon sites run on a highly available clustered infrastructure.

### Can I use my own Git repository (e.g GitHub)?

Not at the moment, but we're looking for a way to support it that allows us to maintain tight integration with our workflow visualization and tools.

### Does Pantheon support Drupal Multisite?

No. Pantheon's architecture is designed to provide high performance and a rich feature set for individual Drupal sites. Individual sites can end up in states of configuration that make module or Drupal core updates impossible to do across all the sites. The codebase also becomes a single point of failure.

Our solution is to deliver granular resources and powerful code management tools so that users who want to run a large portfolio of sites can do so easily, without running the risks inherent in multisite.

### Does Pantheon support WordPress Multisite?
Yes, Pantheon supports the following use cases of [WordPress Site Networks](/docs/guides/multisite) created by WordPress' Multisite feature:

- Blogs for faculty at a university
- Franchise sites under a parent organization site
- Sections within a media publication

### Does Pantheon support Drush?

Yes. Pantheon comes with Drush pre-integrated with `@alias` files. For more details, see [Drupal Drush Command-Line Utility](/docs/drush).

### Does Pantheon support WP-CLI?

Yes. You can invoke WP-CLI commands on Pantheon sites using [Terminus](/docs/terminus/), the Pantheon CLI.

### Does Pantheon support local development?

Yes. [Local development](/docs) is a great best practice, and Pantheon supports a wide array of local development tools (e.g. MAMP, WAMP, Homebrew, etc).

### How does cron work with Drupal on Pantheon?

The platform will use Drush to run cron on an hourly basis automatically. More fine-tuned cron control is in development. If you need to run cron more frequently, you are free to do so using your own timing system and Drush aliases.

### How does cron work with WordPress on Pantheon?

WordPress runs its own internal cron-like system as visitors load your site. You can also use external services to schedule and create tasks. For more information, see [Cron for WordPress](/docs/wordpress-cron).

### Do you support ffmpeg transcoding?

No. We do not have plans to add this feature. However, it is possible to run a site on the platform and integrate with a third-party transcoding service.

### Do you support Xdebug?

No. Xdebug is not available on the platform.

### How do I increase the maximum execution time limit for a PHP script?

The upper time limit for PHP processing on the platform is 120 seconds. This is outlined in the [Timeouts](/docs/timeouts/) documentation and it cannot be increased.  If a script is processing a large amount of data, for example, we recommend that the process be done in smaller batches that can execute sequentially to ensure success.

### Can I Host a Multilingual Site?

Pantheon is home to many polylingual and non-English sites, and hosting a multi-language site on Pantheon requires no additional platform configuration.

For detailed information on how to configure a multilingual Drupal site, see the [Multilingual Guide on Drupal.org](https://drupal.org/documentation/multilingual).

Pantheon doesn’t enforce any particular site layout or architecture for multilingual sites, but the blog entry [Working with multi-regional websites](https://webmasters.googleblog.com/2010/03/working-with-multi-regional-websites.html) from The Google Webmaster Central Blog has some fantastic recommendations.

It’s possible to specify a site language given a particular domain or path. In order of preference:

1. ccTLDs (country-code top level domain names)
2. Subdomains with gTLDs eg: de.site.com, fr.site.com, etc.
3. Subdirectories with gTLDs eg: site.com/de/, site.com/fr/, etc.

Each of these configurations is possible with Drupal’s built-in language switching.

You can associate multiple domains with a single site environment. See [Launch Essentials](/docs/guides/launch/domains/) for details.

### Can I use PHP Sessions with WordPress?

If you need to use PHP's native session handling, please install the [WordPress Native PHP Sessions](https://wordpress.org/plugins/wp-native-php-sessions/) plugin, which we maintain just for this purpose. This provides a horizontally scalable storage mechanism for sessions.

If you are seeing errors like this:

```php
Warning: session_start(): user session functions not defined
```

You'll need the plugin. [More information on sessions](/docs/wordpress-sessions/).

### Can I install a new Panopoly distribution?
Yes. See [Public Distributions](/docs/start-state/#public-distributions) for details.


## DNS

### What is DNS propagation?

Every DNS record has a **Time To Live** (**TTL**) value, which specifies how long any DNS server should hold that record, before dropping it and asking for a new version from its upstream DNS provider. TTLs are usually set in seconds with a few common ones being `86400` (24 hours),  `43200` (12 hours), `3600` (1 hour), and `500` (5 minutes).

**DNS Propagation** is the time it takes for changes made to DNS records to be reflected across DNS servers globally. A lower TTL value means faster propagation, but it's important to note that it is not a 1:1 ratio. Between your <a href=#where-are-my-dns-records-hosted data-proofer-ignore>authoritative name server</a> and the DNS servers of any particular ISP could be any number of intermediate DNS servers. Each server in that chain will wait for the records it holds to expire before requesting new ones. Because of this, it can take *several times longer* than your record's TTL value to see changes reflected for everyone.

When planning a site migration, or making other changes that affect DNS values, it's a common practive to lower the TTL values as low as allowed (usually `500`) several days in advance. That way when the values are changed, new records are propagated faster. Once a migration is complete, TTL values are usually raised back to `3600` (24 hours) to impove stability in case of a DNS service outage.

### Where are my DNS records hosted?

DNS Records are hosted by an **authoritative name server**. This may or may not also be the **registrar** who you purchased the domain name from. You can use the commandline tool **dig** to look up the **NS** record for a domain to find the name server:

```bash
$ dig +short ns pantheon.io
ns-1096.awsdns-09.org.
ns-148.awsdns-18.com.
ns-1857.awsdns-40.co.uk.
ns-924.awsdns-51.net.
```

The example above shows that the records for `pantheon.io` are hosted by AWS.

To find the registrar where your domain is registed, use the commandline tool **whois**:

```bash
$ whois pantheon.io | grep Registrar:
Registrar: Gandi SAS
```

The example above uses `| grep Registrar:` to filter the results to what we're looking for specifically. Remove it to see the full output of the `whois` command. Our example shows that the domain `pantheon.io` is registered with Gandi

<div class="alert alert-info" role="alert">
  <h4 class="info">Note</h4>
  <p markdown="1"> Your registrar may appear to have DNS records for your domain and still nto be the authoritative name server. use `dig` as described above to confirm the name server in use.</p>
</div>

### Can I buy my domain or manage DNS with Pantheon?

No, Pantheon is neither a domain registrar nor a DNS manager.

### Why does the `www` subdomain redirect to the bare domain?

Some DNS providers provide a default `CNAME` record for `www` pointing to `@` (the bare domain). Remove these records and replace them with the records suggested by the Pantheon Site Dashboard.

### What are `AAAA` records, and do I need them?

**AAAA** or "quad-A" records are used to assign [IPv6](https://en.wikipedia.org/wiki/IPv6){.external} addresses to domain names. While most of the internet still uses IPv4, the address pool has been exhausted and IPv6 became the standard as of July 14th, 2017.

Pantheon provides IPv6 addresses for you to assign `AAAA` records to. If your DNS service does not support `AAAA` you can simply omit this records for now, but consider asking your provider to add functionality, as the need for IPv6 will only increase in the future.


### What about my `MX` records for email?

Pantheon does not provide email services. Make sure your DNS records include an `MX` reacord that points to a subdomain (like `mail`), which in turn has an `A` or `CNAME` record pointing it to your email provider.

### What is the difference between an `A` and `CNAME` record?

An `A` record points a domain name to an IPv4 address. A `CNAME` record point a domain name to *another* domain, but **does not** redirect to it.

Pantheon will provide both `A` and `CNAME` values, depending on the domains provided:

![DNS Values provided by the Pantheon Site Dashboard](/source/docs/assets/images/dashboard/dns-values.png)

If your DNS provider doesn't allow `CNAME` records, you can use `nslookup` to determine the IP address for the domain value, and then supply that as an `A` record:

```bash
$ nslookup live-anita-drupal.pantheonsite.io
Server:         192.168.1.1
Address:        192.168.1.1#53

Non-authoritative answer:
live-anita-drupal.pantheonsite.io       canonical name = fe1.edge.pantheon.io.
Name:   fe1.edge.pantheon.io
Address: 23.185.0.1
Name:   fe1.edge.pantheon.io
Address: 2620:12a:8001::1
Name:   fe1.edge.pantheon.io
Address: 2620:12a:8000::1
```

In the example above, we can create an `A` record for `www` set to `23.185.0.1` To substitute the `CNAME` record.

## Caching and Performance

### Can I use other CDNs with Pantheon?
Yes. We recommend that you ensure that you are enforcing HTTPS only at the outer CDN and assuming HTTPS in the application.Check your CDN for how to redirect all traffic to HTTPS.

### What version of Apache Solr does Pantheon run?

We're currently testing out integration strategies for Solr with our next-generation infrastructure. When we deploy it, it will almost certainly be the latest stable Solr available at that time.


## Support

### What support is available for Pantheon?

See [Getting Support](/docs/support/) and explore our [support features](https://pantheon.io/support).


## Security

### PCI Compliance on Pantheon

Since you can alter your code on Pantheon, you must certify your own applications. PCI compliance for applications deployed on any platform cannot be guaranteed by the platform alone. We recommend architectures designed to work with PCI SAQ-A to minimize both risk and compliance efforts.
