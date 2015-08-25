---
title: Domains and DNS
description: Detailed information on adding a domain to your Pantheon Drupal or WordPress site.
category:
  - developing
  - managing
  - going-live
---
Your Site's DNS settings are critical for routing all intended traffic to your Pantheon site.

## Step 1: Determine the URL to Serve From

We recommend using the [`HTTPS` protocol](https://en.wikipedia.org/wiki/HTTPS) and the `www` subdomain prefix for all sites. Some sites, including this one, use a bare domain, omitting the `www` subdomain prefix. [http://www.yes-www.org/why-use-www/](http://www.yes-www.org/why-use-www/) provides background on why bare domains are hard to use with modern platform providers. If your site will use `HTTPS`, either [enable SSL](/docs/articles/sites/domains/adding-a-ssl-certificate-for-secure-https-communication/) or use [Cloudflare's Universal SSL](/docs/guides/ssl-with-cloudflare/).

## Step 2: Add Domains to the Site Environment
If you chose to use the HTTPS protocol, you should [Enable SSL](/docs/articles/sites/domains/adding-a-ssl-certificate-for-secure-https-communication/) before adding the domain to the site environment. The recommended DNS settings are different for HTTPS sites.

You must have a paying plan to add a domain to a site environment. For more information, see [Selecting a Plan](/docs/articles/sites/settings/selecting-a-plan/).

1. From your Site Dashboard, select the environment to serve from the domain (typically Live), and click **Domains/SSL**.
2. On the Domain Setup tab, enter the domain name you want associated with that environment, and click **Add New Domain to the Live Environment**.

You can simultaneously add both the bare domain name and the fully qualified (www) domain name (FQDN). This is highly recommended, as you will not be able to redirect traffic from one to the other without adding both. Uncheck the box for subdomains, as adding the www prefix to a subdomain is redundant.  

<div class="alert alert-warning" role="alert">
<strong>Note</strong>:You must add every domain (hostname) to the site environment that you want Pantheon to be able to serve. Automatic resolution of domains and wildcards are not supported.</div>

### Develop Using a Domain Without Changing DNS

Sometimes it's useful to develop on a site using a specific domain, but the overhead of temporarily changing DNS is too much. Use the following workaround to allow your local workstation to access your Pantheon site by your desired domain without changing DNS. (Requires a paid plan)

1. From the Pantheon Dashboard, add the domain to the target site environment.
2. Add a line to your local <a href="https://en.wikipedia.org/wiki/Hosts_(file)">Hosts file</a> with  the recommended IP address and the domain.

Example:

```
192.237.142.203 example.com
```

<div class="alert alert-warning" role="alert">
<strong>Note</strong>: Remember to remove this change when you're done.</div>

## Step 3: Configure Your DNS
At the Live environment's Domains/SSL tool, click  **Show recommended DNS records** to the right of the domains you've added.

**Pantheon Does Not Manage Your Domain Name or DNS**. You will need to make these changes yourself with your registrar and/or DNS host; we cannot do it for you. Why? Our focus is on making a great platform; we're not a domain name registrar or a DNS hosting service.

You should always configure the DNS for both your bare/root domain (example.com ) and FQDN (www.example.com), and redirect one to the other.  If you don't, users who add or omit the www will not see your site and assume your site is down.
Search engines will see the same page served from both domains as duplicate content if you have both configured without a redirect to a single canonical domain. For more information, see [Redirect Incoming Requests](/docs/articles/sites/code/redirect-incoming-requests/#redirect-to-a-common-domain).

### Serving Sites from Bare Domains with HTTP
Our dashboard assumes you will be redirecting traffic from the bare domain to the FQDN, and  recommends adding an A or AAAA record pointed to our www-redirection service for the bare domain. If you choose to serve your site from the bare domain, you can:

1. Use [CloudFlare CNAME Flattening](https://support.cloudflare.com/hc/en-us/articles/200169056-CNAME-Flattening-RFC-compliant-support-for-CNAME-at-the-root). You should be able to add their nameservers for your domain name to your registrar.
2. Ignore our recommendation to add an A record to 192.237.224.60. Instead, add CNAME records for **both** the bare domain (@) and the FQDN (www), both pointed to live-example.pantheon.io.
3. Add a redirect in settings.php or wp-config.php to [remove www](/docs/articles/sites/code/redirect-incoming-requests/#redirect-to-a-common-domain).

Other DNS Hosts providing CNAME flattening include:

*   [ClouDNS](https://www.cloudns.net/features/)
*   [NameCheap](https://www.namecheap.com/domains/freedns.aspx)

Users may also have success with **[ALIAS or ANAME](http://help.dnsmadeeasy.com/spry_menu/aname-records/) records** used as the root record for a domain as the resulting records created are A records which bypasses the limitation of allowing the alias at the root domain.

Learn more about ANAME records:

*   [DNSimple](http://support.dnsimple.com/articles/differences-between-a-cname-alias-url/)
*   [DNS Made Easy](http://www.dnsmadeeasy.com/services/aname-records/)
*   [EasyDNS](http://docs.easydns.com/aname-records/)



## Frequently Asked Questions

### How long do DNS changes typically take?

It depends on several factors, including the TTL of your DNS records. As a rule of thumb, DNS changes can take up to 48 hours to propagate across the entire Internet, but most updates happen in a couple hours.

### How do I use Pantheon's WWW redirection service?

If you need to direct traffic from a non-www domain (e.g. example.com), you can use our www-redirection service by setting an A record to 192.237.224.60. This is a simple web-server that will redirect to the www domain for your site. You must also configure the FQDN with a CNAME record to live-example.pantheon.io.
![](/source/docs/assets/images/desk_images/376194.png)

### My domain has an extra "www."

If you find that `www.example.com` resolves to `www.www.example.com`, or `subdomain.example.com` resolves to `www.subdomain.example.com` this means that you have set your DNS for the domain to the Dub Dub Dubber I.P. address (an A-record to 192.237.224.60).
![](/source/docs/assets/images/desk_images/376201.png)
To correct this, use the CNAME that is available on the Dashboard for the environment where you are adding the domain, e.g. live-example.pantheon.io.

### Can a site on Pantheon be used with a third-party reverse proxy?

Yes, many Pantheon customers use third-party reverse proxies, such as [CloudFlare](https://www.cloudflare.com/). If you'd like to do this, do **not** direct traffic to a \*.pantheon.io domain. Instead, associate an intermediate domain with the live environment and create the appropriate DNS entries, then point your reverse proxy to the intermediate domain.

### Can I test my domain name without making DNS changes?

Yes, see above [developing with a domain without changing DNS](/docs/articles/sites/domains/#develop_using_a_domain_without_changing_dns) for details.

### Why isn't my site loaded when I ping the provided Pantheon IP?

Your site won't load from the provided IP's because the Pantheon IP's used in the configurations above are the addresses of our load-balancers. When a request comes in, our load-balancers route the request to the proper site. 

<style type="text/css">.records dd {
  font-family: monospace;
}
</style>

### How can I protect my site from DDoS attacks?
Pantheon recommends using an external proxy service, such as [Sucuri](https://sucuri.net/) to mitigate all network-level attacks.

For more information, see [Defend WordPress and Drupal Sites Against DDoS Attacks with Sucuri](/docs/articles/sites/domains/defend-wordpress-and-drupal-with-sucuri).

##See Also

* [Redirect to a Common Domain](/docs/articles/sites/code/redirect-incoming-requests/#redirect-to-a-common-domain)
* [Redirecting to HTTPS](/docs/articles/sites/code/redirect-incoming-requests/#redirecting-to-https)
* [Enable SSL for Secure HTTPS Communication](/docs/articles/sites/domains/adding-a-ssl-certificate-for-secure-https-communication/)
