---
domains: true
layout: landing
use:
    - domains
title: Domains and DNS
description: Detailed information on adding a domain to your Pantheon Drupal or WordPress site.
category:
  - developing
  - managing
  - going-live
---
Routing traffic to sites on Pantheon requires modifying the DNS configuration at the domain's DNS hosting provider.

## Step 1: Determine the URL to Serve From

We recommend using the [HTTPS protocol](https://en.wikipedia.org/wiki/HTTPS) and the www subdomain prefix for all sites. See [this article](http://www.yes-www.org/why-use-www/) for information on why www is recommended with modern platform providers.

If you are using the HTTPS protocol with your own certificate, [enable HTTPS](/docs/articles/sites/domains/adding-a-ssl-certificate-for-secure-https-communication/) before adding the domain to the Site Dashboard and before configuring DNS. If you are going to use [CloudFlare's free Universal SSL service](/docs/guides/ssl-with-cloudflare/), set up DNS as described here first.
## Step 2: Add Domains to the Site Environment

You must have a paid plan to add a domain to a site environment. For more information, see [Selecting a Plan](/docs/articles/sites/settings/selecting-a-plan/).

1. From your Site Dashboard, select the environment to serve from the domain (typically Live), and click **Domains/HTTPS**.
2. On the Domain Setup tab, enter the domain name you want associated with that environment, and click **Add New Domain to the Live Environment**.

You can simultaneously add both the bare domain name and the www subdomain. This is highly recommended, as you will not be able to redirect traffic from one to the other without adding both.

<div class="alert alert-info" role="alert">
<h4>Note</h4>Add all domains you want to resolve to Pantheon within the desired environments. Automatic resolution of domains and wildcards are not supported.</div>

### Develop Using a Domain Without Changing DNS
Use the following workaround to allow your local workstation to access your Pantheon site by the desired domain without changing DNS. This requires a paid plan.

<div class="alert alert-danger" role="alert">
<h4>Warning</h4>This process is for short-term testing only. Use the Dashboard's recommendations when going live, or you will experience downtime when IP addresses change.</div>

1. From the command line, `dig` for Pantheon IPs associated with your Live environment URL:

 ```bash
 $ dig +short live-yoursite.pantheon.io

 styx-xx.pantheon.io.
 192.123.456.789
 104.123.456.78
 23.123.45.6
 ```
2. Add the desired domain to the Live environment of the Site Dashboard on Pantheon.
3. Add a line to your local <a href="https://en.wikipedia.org/wiki/Hosts_(file)">hosts file</a> which includes one of the IP addresses returned in the above dig command followed by the bare domain:

 ```
 192.123.456.789 example.com  
 ```
## Step 3: Configure Your DNS
From the Live environment's Domains/HTTPS tool, click **Show recommended DNS records** to the right of the domains you've added.

<div class="alert alert-danger" role="alert">
<h4>Important</h4><strong>Pantheon does not register domains or manage DNS.</strong> You will need to make these changes yourself at the registrar and/or DNS host for the domain.</div>

Using the provided destinations in the Site Dashboard, create the recommended DNS entries at the domain's DNS provider. Pantheon's www-redirection service will automatically redirect requests to the www subdomain.

### Serving Sites from Bare Domains with HTTP
To serve your site from the bare domain, you must:

1. Select a DNS provider that supports CNAME flattening, such as [CloudFlare (recommended)](https://support.cloudflare.com/hc/en-us/articles/200169056-CNAME-Flattening-RFC-compliant-support-for-CNAME-at-the-root), [ClouDNS](https://www.cloudns.net/features/), or [NameCheap](https://www.namecheap.com/domains/freedns.aspx).
2. Do not add the recommended DNS entries from the Dashboard. Instead, create 2 CNAME records:

 ```bash
 CNAME @ live-yoursite.pantheon.io
 CNAME www live-yoursite.pantheon.io
 ```
 The @ value will show the bare domain once created in CloudFlare:
 ![CloudFlare example records](/source/docs/assets/images/cloudflare-cnames.png)
3. [Redirect incoming requests](/docs/articles/sites/code/redirect-incoming-requests/#redirect-to-a-common-domain) to the bare domain via `settings.php` or `wp-config.php` to prevent problematic session handling and improve SEO.

One alternative to CNAME flattening is to use **[ALIAS/ANAME records](http://help.dnsmadeeasy.com/spry_menu/aname-records/)**. These records constantly monitor all resolving IPs of the destination (e.g. `live-yoursite.pantheon.io`), and creates corresponding A records.

Learn more about ANAME records:

*   [DNSimple](http://support.dnsimple.com/articles/differences-between-a-cname-alias-url/)
*   [DNS Made Easy](http://www.dnsmadeeasy.com/services/aname-records/)
*   [EasyDNS](http://docs.easydns.com/aname-records/)


## Frequently Asked Questions (FAQs)

### How long do DNS changes typically take?
DNS changes can take up to 48 hours to propagate across the entire Internet, but most updates happen much faster depending on the set TTL (Time to Live).

### How do I use Pantheon's WWW redirection service?
The www-redirection service listens for requests and issues 301 redirects with www prepended to the host header. To use this service, simply configure the domain's DNS with the recommended DNS records within the Site Dashboard.

![www-redirection service](/source/docs/assets/images/desk_images/376194.png)

### Why does my domain have an extra "www."?
If you find that `www.example.com` resolves to `www.www.example.com`, or `subdomain.example.com` resolves to `www.subdomain.example.com` - the domain's www entry has been improperly configured as an A record.
![Extra www example](/source/docs/assets/images/desk_images/376201.png)
Correct this problem by setting the www entry as a CNAME record pointing to the recommended destination (e.g. `live-yoursite.pantheon.io`), found within the Site Dashboard on the target environment.

### Why is my Drupal 8 site inaccessible after adding a custom domain?
The following response is served for requests originating from an "untrusted" host on Drupal 8 sites which have enabled the `trusted_host_patterns` setting:

**The provided host name is not valid for this server.**

Resolve by including custom domain(s) within existing `settings.php` configurations:
```
# Replace value with custom domain(s) added in the site Dashboard
$settings['trusted_host_patterns'][] = '^.+\.yoursite\.com$';
$settings['trusted_host_patterns'][] = '^yoursite\.com$';
```
For more details, see [Configuring Settings.php](/docs/articles/drupal/configuring-settings-php#trusted-host-setting).
### Can a site on Pantheon be used with a third-party reverse proxy?

Yes, many Pantheon customers use third party reverse proxies, such as [CloudFlare](https://www.cloudflare.com/). If you'd like to do this, do not direct traffic to a *.pantheon.io domain. Instead, associate an intermediate domain with the Live environment and create the appropriate DNS entries, then point your reverse proxy to the intermediate domain.

### Can I test my domain name without making DNS changes?

Yes, see [above](/docs/articles/sites/domains/#develop-using-a-domain-without-changing-dns) for details.

### Why isn't my site loaded when I ping the provided Pantheon IP?
The provided IP address resolves to our load balancers. When a request comes in, it is automatically routed to the proper site.

### A contrib module that I use for my Drupal site does not support IPv6; how should I proceed?
[Use the issue queue](https://drupal.org/node/317) of the module in question to communicate with the module maintainers.

### Does Pantheon do any HTML domain substitution?
Yes, for WordPress sites (which are more likely to contain hard-coded links to other domains in their database), Pantheon will replace platform-assigned domains for that environment (e.g. `dev-mysite.pantheon.io` or `live-mysite.gotpantheon.com`) with custom domains in the HTML body when the HTML page is requested via the custom domain.  This prevents loading assets using different domain names representing the same site.  

For example, when requesting `http://mysite.com` in a browser, we replace any asset (images, CSS, JS) URL domains from `live-mysite.pantheon.io` to `mysite.com`.

This will not:

* Affect Drupal
* Substitute HTTPS domains
* Substitute platform domains from another environment (i.e. `dev-mysite.pantheon.io` will not be substituted for `mysite.com` if that is a custom domain for the Live environment)

### My site is completely incompatible with IPv6 traffic; how can I force IPv4 traffic?
Do not create an AAAA (IPv6) record as recommended in the Site Dashboard when configuring the domain's DNS. Only create the CNAME record for the www subdomain and the A record for the bare domain.

##See Also

* [Redirect to a Common Domain](/docs/articles/sites/code/redirect-incoming-requests/#redirect-to-a-common-domain)
* [Redirecting to HTTPS](/docs/articles/sites/code/redirect-incoming-requests/#redirect-to-https)
* [Enable Secure HTTPS Communication](/docs/articles/sites/domains/adding-a-ssl-certificate-for-secure-https-communication/)
* [Default Base Domain](/docs/articles/sites/domains/default-base-domain)
