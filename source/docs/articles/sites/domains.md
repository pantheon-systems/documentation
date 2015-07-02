---
title: Domains and SSL
description: Detailed information on adding a domain to your Pantheon Drupal or WordPress site.
category:
  - developing
  - managing
  - going-live
---

Pantheon provides distinct base domains for the consistent access of the Development, Testing, and Live production environments for each site on the platform from the moment they are launched.

All sites on Pantheon can be divided into three base domain URL patterns.

**Note:** In the example base domain patterns, `env` stands for either `dev`, `test`, or `live`; and `sitename` is the chosen name for the site:

* [Pantheon.io base domains](https://pantheon.io/docs/articles/sites/domains/using-pantheon-io-for-better-uptime/) for sites created after October 22, 2014 and without a custom base domain: `env-sitename.pantheon.io`
* Legacy GotPantheon.com base domains: `env.sitename.gotpantheon.com` or `env-sitename.gotpantheon.com`
* [Custom organizational base domains](https://pantheon.io/docs/articles/organizations/base-domains/): `env-sitename.custom.domain.tld`

Once site plans are changed to a paid service level, custom domains can be added to each environment. Securing visitor traffic with HTTPS communication requires uploading a custom certificate and setting the DNS `A` record to a dedicated IP. For all sites in all configurations, the recommended DNS records will be provided on the Domains and SSL tab.

## Step 1: Decide Which Type of Domain You Want

**Examples of HTTPS Sites** 

Pantheon recommends using HTTPS to increase the security of your site.

https://www.example.com 

[https://example.com/subdirectory](/source/docs/articles/sites/domains/fastly-domain-masking/)

https://example.com 

https://subdomain.example.com

**Examples of HTTP Sites**

http://www.example.com

http://example.com

http://example.com/subdomain

http://subdomain.example.com


## Step 2: Add a Domain to a Site Environment

1. From your Site Dashboard, select the environment (typically Live), and click **Domains**.
2. On the Domain Setup tab, enter the domain you want associated with that environment, and click **Add New Domain to the ... Environment**.  

Both the domain and the www subdomain will be added. Once this is complete and your domain's DNS points to Pantheon, Pantheon will know where to route that request.

#### Limitations

* You must add every domain (hostname) to the site environment that you want Pantheon to be able to serve. Automatic resolution of domains and wildcards are not supported.

* You must have a paying plan in order to add a domain to a site environment. For more information, see [Selecting a Plan](/docs/articles/sites/settings/selecting-a-plan/).

* A specific domain or subdomain can only be associated with one environment at any time. You can associate any combination of domains or subdomains, but you can't associate a specific domain or subdomain simultaneously on two separate site environments. You could associate domain.com with one site and archive.domain.com with another. Therefore, the following is possible:

  Pantheon site #1 - domain.com, www.domain.com

  Pantheon site #2 - archive.domain.com

### Develop Using a Domain Without Changing DNS

Sometimes it's useful to develop on a site using a specific domain, but the overhead of temporarily changing DNS is too much. There is a workaround that will allow your local workstation to access your Pantheon site by domain without changing DNS.

1. From the Pantheon Dashboard, add the domain to the target site environment.
2. Edit your local <a href="https://en.wikipedia.org/wiki/Hosts_(file)">Hosts file</a> to include a Pantheon IP address (a record from going live for HTTP, custom load-balanced IP from your Dashboard for HTTPS) and the domain.

Example:

    192.237.142.203 puppies.cuddlyfanclub.com

<div class="alert alert-warning" role="alert">
<strong>Note</strong>: Remember to remove this change when you're done.</div>

## Step 3: Configure Your DNS
The last step of launching your site on Pantheon is to update your DNS records to direct traffic to your domain to your Pantheon site. To learn more about launching your site, see [going live](/docs/articles/going-live/).

**Pantheon Does Not Manage Your Domain Name or DNS**. You will need to make these changes yourself with your registrar and/or DNS host; we cannot do it for you. Why? Our focus is on making a great platform; we're not a domain name registrar or a DNS hosting service.

### DNS Configuration for Pantheon.io Sites

You should configure the DNS for both your non-www (bare domain) and www domain, like example.com and www.example.com. If you don't, users who add (or omit) the www will not see your site and assume your site is down. There are also negative SEO implications if you have both configured without a redirect to a single canonical domain, like duplicate content. See [Using Pantheon.io for Better Uptime](/docs/articles/sites/domains/using-pantheon-io-for-better-uptime) for more information.

_Root domains_

* DNS `A` record (www-redirector) - `192.237.224.60`
* DNS `AAAA` record (www-redirector) - `2001:4801:7901:0000:c5ce:526c:0000:001a`
* [Redirect non-www to www in settings.php or wp-config.php](/docs/articles/sites/code/redirect-incoming-requests/#redirect-to-a-common-domain)

_Subdomains_

* DNS `CNAME` record - `env-sitename.pantheon.io`

### Legacy DNS Configuration for Pantheon.io Sites

These DNS records are for Pantheon-hosted sites already using a pantheon.io development URL. **Do not utilize our legacy DNS records for any new sites that use the pantheon.io development URL**. Please refer to the Domains panel on your site's Dashboard for the specific DNS records that will successfully route traffic to your site.

Sites launched with the `env.sitename.pantheon.io` or `env-sitename.pantheon.io` base domain should have the following recommended DNS records configured:

_Root domains_

* DNS `A` record (Load-balanced IPv4) - `192.237.142.203`
* DNS `AAAA` record (Load-balanced IPv6) - `2001:4801:7901:0000:c5ce:526c:0000:000f`

_Subdomains_

* DNS `CNAME` record (highly available) - `edge.live.pantheon.io`

We do not have nameservers at Pantheon because we do not manage any DNS services. Use the nameservers given to you by your DNS provider.

### DNS Records for Custom Base Domains

Sites launched with a custom `env-sitename.custom.domain.tld` base domain should have the following recommended DNS records configured:

_Root domains_

* DNS `A` record (Load-balanced IPv4) - `192.237.142.203`
* DNS `AAAA` record (Load-balanced IPv6) - `2001:4801:7901:0000:c5ce:526c:0000:000f`

_Subdomains_

* DNS `CNAME` record (highly available) - `edge.live.getpantheon.com`

### DNS Records for HTTPS Sites (SSL/TLS)

If you are using HTTPS for security and using an identity certificate, you **must** use your custom load-balanced IP address as an A record. See [adding a SSL certificate for secure HTTPS communication](/docs/articles/sites/domains/adding-a-ssl-certificate-for-secure-https-communication/) for details.

These examples only indicate the pattern of the typical records to set:

 _Root domains_

* DNS `A` record (HTTPS IPv4) - `xxx.xxx.xxx.xxx`
* DNS `AAAA` record (HTTPS IPv6) - `ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff`

_Subdomains_

* DNS `A` record (HTTPS IPv4) - `xxx.xxx.xxx.xxx`
* DNS `AAAA` record (HTTPS IPv6) - `ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff`

### DNS Records for HTTP Sites  

Your Site Dashboard recommends the specific DNS settings you should use. These can be found under the Domains/SSL tab, per environment. Within the Domain Setup page, click the **Show recommended DNS records** link to the right of the domains you've added. In most cases, you'll only need to configure DNS for the Live environment.

## DNS Vocabulary Terms
<dl>
	<dt><a href="http://en.wikipedia.org/wiki/Domain_Name_System">DNS</a></dt>
	<dd>The Domain Name System (DNS) translates human readable domain names to numerical IP addresses</dd>
	<dt><a href="http://en.wikipedia.org/wiki/DNS_hosting_service">DNS hosting service</a></dt>
	<dd>Runs DNS servers; often included with domain name registration</dd>
	<dt><a href="http://en.wikipedia.org/wiki/Domain_name_registrar">Domain name registrar</a></dt>
	<dd>Manages reservation of Internet domain names</dd>
	<dt><a href="http://en.wikipedia.org/wiki/CNAME_record">CNAME record</a></dt>
	<dd>Canonical Name record points to a domain name, which then maps to IP addresses; used for high availability</dd>
	<dt><a href="http://en.wikipedia.org/wiki/A_record#A">A record</a></dt>
	<dd>Maps a domain name to an IPv4 address</dd>
	<dt><a href="http://en.wikipedia.org/wiki/A_record#AAAA">AAAA record</a></dt>
	<dd>Maps a domain name to an IPv6 address</dd>
	<dt><a href="http://en.wikipedia.org/wiki/IPv4">IPv4</a></dt>
	<dd>Core Internet protocol for routing traffic</dd>
	<dt><a href="http://en.wikipedia.org/wiki/IPv4">IPv6</a></dt>
	<dd>Core routing Internet protocol intended to replace IPv4, supports more addresses</dd>
	<dt><a href="http://en.wikipedia.org/wiki/Time_to_live#DNS_records">TTL</a></dt>
	<dd>Length of time for requests to a DNS server to be cached; measured in seconds</dd>
</dl>

## Frequently Asked Questions

### How long do DNS changes typically take?

It depends on several factors, including the TTL of your DNS records. As a rule of thumb, DNS changes can take up to 48 hours to propagate across the entire Internet, but most updates happen in a couple hours.

### Can I use a CNAME for my bare/naked/root domain?

It depends; the bare domain should only have an A record that maps to an IP. Some DNS providers ( [DNS Made Easy](http://www.dnsmadeeasy.com/services/aname-records/), [CloudFlare](https://support.cloudflare.com/hc/en-us/docs/articles/200169056-CNAME-Flattening-RFC-compliant-support-for-CNAME-at-the-root) and others) let you use a CNAME with a bare domain (maybe referred to as ANAME, or CNAME Flattening), but it's non-standard. Check with your DNS provider’s documentation to see if this is an option.

### How do I use Pantheon's WWW redirection service?

If you need to direct traffic from a non-www domain (e.g. example.com), you can use our www-redirection service by setting an A record to 192.237.224.60. This is a simple web-server that will redirect to the www domain for your site. This option will only work correctly if the www domain for your site is configured correctly on Pantheon.

### Can a site on Pantheon be used with a third-party reverse proxy?

Yes, many Pantheon customers use third-party reverse proxies, such as [CloudFlare](https://www.cloudflare.com/). If you'd like to do this, do **not** direct traffic to a \*.pantheon.io domain. Instead, associate an intermediate domain with the live environment and create the appropriate DNS entries, then point your reverse proxy to the intermediate domain.

### Can I test my domain name without making DNS changes?

Yes, see [developing with a domain without changing DNS](/docs/articles/sites/domains/#develop_using_a_domain_without_changing_dns) for details.

### Why isn't my site loaded when I ping the provided Pantheon IP?

Your site won't load from the provided IP's because the Pantheon IP's used in the configurations above are the addresses of our load-balancers. When a request comes in, our load-balancers route the request to the proper site. 

<style type="text/css">.records dd {
  font-family: monospace;
}
</style>

##See Also

* [Redirect to a Common Domain](/docs/articles/sites/code/redirect-incoming-requests/#redirect-to-a-common-domain)
* [Redirecting to HTTPS](/docs/articles/sites/code/redirect-incoming-requests/#redirecting-to-https)
* [Enable SSL for Secure HTTPS Communication](/docs/articles/sites/domains/adding-a-ssl-certificate-for-secure-https-communication/)
