---
title: Domains and DNS
description: Information on adding a domain to your Pantheon Drupal or WordPress site.
tags: [dns]
---

DNS is the main naming system for the internet. It takes any domain name, such as "pantheon.io" and ties it to an IP address like `203.0.113.75`.

Associating your Pantheon site with a domain name requires modifying the DNS configuration at the domain's DNS hosting provider.

## Determine the URL to Serve From

We recommend using the [HTTPS protocol](https://en.wikipedia.org/wiki/HTTPS) and the www subdomain prefix for all sites. See [this article](http://www.yes-www.org/why-use-www/) for information on why www is recommended with modern platform providers.

If you are using the HTTPS protocol with your own certificate, [enable HTTPS](/docs/enable-https/) before adding the domain to the Site Dashboard and before configuring DNS. If you are going to use [Cloudflare's free Universal SSL service](/docs/guides/cloudflare-enable-https/), set up DNS as described here first.

## Add Domains to the Site Environment

You must have a paid plan to add a domain to a site environment. For more information, see [Selecting a Plan](/docs/select-plan/).

1. From your Site Dashboard, select the environment to serve from the domain (typically Live), and click **Domains**.
2. On the Domain Setup tab, enter the domain name you want associated with that environment, and click **Add**.



<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p>Add all domains you want to resolve to Pantheon within the Site Dashboard for each respective environment. Automatic resolution of domains and wildcards are not supported.</p>
</div>

### Develop Using a Domain Without Changing DNS
Use the following optional workaround to allow your local workstation to access your Pantheon site by the desired domain without changing DNS. This requires a paid plan.

<div class="alert alert-danger" role="alert">
<h4 class="info">Warning</h4>
<p>This process is for short-term testing only. Use the Dashboard's recommendations when going live, or you will experience downtime when IP addresses change.</p>
</div>

1. From the command line, `dig` for Pantheon IPs associated with your Live environment URL:

 ```bash
 $ dig +short live-yoursite.pantheonsite.io

 styx-xx.pantheonsite.io.
 192.123.456.789
 104.123.456.78
 23.123.45.6
 ```
2. Add the desired domain to the Live environment of the Site Dashboard on Pantheon.

3. Add a line to your local [hosts file](https://en.wikipedia.org/wiki/Hosts_(file)) which includes one of the IP addresses returned in the above dig command followed by the domain:

 ```
 192.123.456.789 example.com
 ```
## Configure Your DNS
From the target environment's Domains tool, click **Show DNS Recommendations** next to each of the domains you've added:

![Show recommended DNS](/source/docs/assets/images/dashboard/show-dns-recommendations.png)

<div class="alert alert-danger" role="alert">
<h4 class="info">Warning</h4>
<p><strong>Pantheon does not register domains or manage DNS.</strong> You will need to make these changes yourself at the registrar and/or DNS host for the domain.</p>
</div>

## Serve traffic from your preferred domain (www or non-www)

While it’s good for visitors and DNS to resolve both www and non-www domain, it's best practice to choose one or the other and redirect from www to non-www (or vice versa, your call). This optimizes SEO by avoiding duplicate content and prevents session strangeness, where a user can be logged in to one domain but logged out of other domains at the same time.

### Serving sites from www
Using the provided destinations in the Site Dashboard, create the recommended DNS entries at the domain's DNS provider.

Then, add redirect logic to `settings.php` for Drupal or to `wp-config.php` for WordPress to serve requests using only your preferred domain. For examples see [redirecting to a common domain](/docs/redirects/#redirect-to-a-common-domain) and [require HTTPS and standardize domain](/docs/redirects/#require-https-and-standardize-domain).


### Serving Sites from Bare Domains

#### Method 1: Enable HTTPS
To serve your site from the bare domain (example.com), [enable HTTPS](/docs/enable-https/) then add the recommended DNS entries at the domain's DNS provider using the provided destinations from the Site Dashboard. Once configured, [redirect incoming requests](/docs/redirects#redirect-from-www-to-the-bare-domain) to the bare domain via `settings.php` or `wp-config.php`

#### Method 2: Use CNAME flattening
As an alternative to enabling HTTPS, you can use CNAME flattening to serve the site from the bare domain with HTTP or configure [Cloudflare's free Universal SSL service](/docs/guides/cloudflare-enable-https/):

1. Select a DNS provider that supports CNAME flattening, such as [Dyn](http://dyn.com/managed-dns/alias/), [Cloudflare (recommended)](https://support.cloudflare.com/hc/en-us/articles/200169056-CNAME-Flattening-RFC-compliant-support-for-CNAME-at-the-root), [ClouDNS](https://www.cloudns.net/features/), or [NameCheap](https://www.namecheap.com/domains/freedns.aspx).
2. Do not add the recommended DNS entries from the Dashboard. Instead, create 2 CNAME records:

 ```bash
 CNAME @ live-yoursite.pantheonsite.io
 CNAME www live-yoursite.pantheonsite.io
 ```
 The @ value will show the bare domain once created in Cloudflare:
 ![Cloudflare example records](/source/docs/assets/images/cloudflare-cnames.png)
3. [Redirect incoming requests](/docs/redirects/#redirect-to-a-common-domain) to the bare domain via `settings.php` or `wp-config.php`.

Another alternative is to use **[ALIAS/ANAME records](http://help.dnsmadeeasy.com/spry_menu/aname-records/)**. These records constantly monitor all resolving IPs of the destination (e.g. `live-yoursite.pantheonsite.io`), and creates corresponding A records.

Learn more about ANAME records:

*   [Dyn](http://dyn.com/managed-dns/alias/)
*   [DNSimple](http://support.dnsimple.com/articles/differences-between-a-cname-alias-url/)
*   [DNS Made Easy](http://help.dnsmadeeasy.com/managed-dns/records/aname-records/)
*   [EasyDNS](https://fusion.easydns.com/index.php?/Knowledgebase/Article/View/190/7/aname-records/)


## Frequently Asked Questions (FAQs)

### How long do DNS changes typically take?
DNS changes can take up to 48 hours to propagate across the entire Internet, but most updates happen much faster depending on the set TTL (Time to Live).

To check the status of your DNS changes from different parts of the world, use the free online tool: [https://www.whatsmydns.net/](https://www.whatsmydns.net/)


### Can a site on Pantheon be used with a third-party reverse proxy?

Yes, many Pantheon customers use third party reverse proxies, such as [Cloudflare](https://www.cloudflare.com/). If you'd like to do this, do not direct traffic to a `*.pantheonsite.io` domain. Instead, associate an intermediate domain with the Live environment and create the appropriate DNS entries, then point your reverse proxy to the intermediate domain.

### Can I test my domain name without making DNS changes?

Yes, see [above](/docs/domains/#develop-using-a-domain-without-changing-dns) for details.

### Why isn't my site loaded when I ping the provided Pantheon IP?
The provided IP address resolves to our load balancers. When a request comes in, it is automatically routed to the proper site.

### Why don't the DNS values for my previously configured domain match the recommended values currently shown on the Site Dashboard? Did something change?
Domains configured before March 2016 may be using our legacy DNS values. Update your DNS to the recommended values for better uptime and reliability.

### A contrib module that I use for my Drupal site does not support IPv6; how should I proceed?
[Use the issue queue](https://drupal.org/node/317) of the module in question to communicate with the module maintainers.

### Does Pantheon do any HTML domain substitution?
Yes, for WordPress sites (which are more likely to contain hard-coded links to other domains in their database), Pantheon will replace platform-assigned domains for that environment (e.g. `dev-mysite.pantheonsite.io` or `live-mysite.gotpantheon.com`) with custom domains in the HTML body when the HTML page is requested via the custom domain.  This prevents loading assets using different domain names representing the same site.

For example, when requesting `http://mysite.com` in a browser, we replace any asset (images, CSS, JS) URL domains from `live-mysite.pantheonsite.io` to `mysite.com`.

This will not:

* Affect Drupal
* Substitute HTTPS domains
* Substitute platform domains from another environment (i.e. `dev-mysite.pantheonsite.io` will not be substituted for `mysite.com` if that is a custom domain for the Live environment)

### My site is completely incompatible with IPv6 traffic; how can I force IPv4 traffic?
Do not create an AAAA (IPv6) record as recommended in the Site Dashboard when configuring the domain's DNS. Only create the CNAME record for the www subdomain and the A record for the bare domain.

## Troubleshooting

### Verify DNS configuration

Verify DNS has been properly configured to direct traffic to your Pantheon site:

**Use a free online tool**

Enter your domain name in the DNS record lookup tool provided by the following website: [https://mxtoolbox.com/DNSLookup.aspx](https://mxtoolbox.com/DNSLookup.aspx)

The results should match the values recommended within the Site Dashboard.

**Use a terminal command**

Use the `dig` utility to verify DNS configuration.

```bash
$ dig www.example.com cname +short && dig example.com a +short && dig example.com aaaa +short
```

```bash
live-example.pantheonsite.io.
192.237.224.60
2001:4801:7901::c5ce:526c:0:1a
```

![Show recommended DNS](/source/docs/assets/images/dashboard/show-dns-recommendations.png)



### Why does my domain have an extra "www."?
If you find that `www.example.com` resolves to `www.www.example.com`, or `subdomain.example.com` resolves to `www.subdomain.example.com` - the domain's www entry has been improperly configured as an A record.

Correct this problem by setting the www entry as a CNAME record pointing to the recommended destination (e.g. `live-yoursite.pantheonsite.io`), found within the Site Dashboard on the target environment.

### Why does my bare domain resolve to "www." in Safari and Firefox, but fails to resolve in Chrome?
By default, Firefox and Safari will prepend any bare domain that cannot be reached with `www.`. Chrome does not auto prepend domains that do not resolve properly. This behavior indicates that the DNS for the `www.` subdomain has been properly configured while the bare domain (`example.com`) has not. To resolve, ensure that the bare domain has been added to the target environment on Pantheon and verify configurations set within the domain's DNS provider.

### Why is my Drupal 8 site inaccessible after adding a custom domain?
The following response is served for requests originating from an "untrusted" host on Drupal 8 sites which have enabled the `trusted_host_patterns` setting:

**The provided host name is not valid for this server.**

Resolve by including custom domain(s) within existing `settings.php` configurations:
```
# Replace value with custom domain(s) added in the site Dashboard
$settings['trusted_host_patterns'][] = '^.+\.yoursite\.com$';
$settings['trusted_host_patterns'][] = '^yoursite\.com$';
```
For more details, see [Configuring Settings.php](/docs/settings-php#trusted-host-setting).

### Why does my site is returning 404 : Unknown Site error after adding a custom domain and configuring DNS?

The error indicates internal routing problem. Check if the URL is correct and matches to your Dashboard's custom domain settings. Ensure that both the bare domain and www subdomain have been added to the target environment.

## See Also

* [Redirect to a Common Domain](/docs/redirects/#redirect-to-a-common-domain)
* [Redirecting to HTTPS](/docs/redirects/#redirect-to-https)
* [Enable Secure HTTPS Communication](/docs/enable-https/)
* [Platform Domains](/docs/platform-domains)
