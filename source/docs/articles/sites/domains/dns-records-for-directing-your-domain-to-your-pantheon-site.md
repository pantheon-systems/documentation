---
title: DNS Records for Directing Your Domain to Your Pantheon Site
description: Learn how to adjust DNS settings for your domain in order to redirect traffic to your Pantheon site.
category:
  - developing


---

## Overview

The last step of launching your site on Pantheon is to update your DNS records to direct traffic to your domain to your Pantheon site. To learn more about launching your site, see [going live](/docs/articles/going-live/).

### Pantheon Does Not Manage Your Domain Name or DNS For Your Site

You will need to make these changes yourself with your registrar and/or DNS host, we cannot do it for you. Why? Our focus is on making a great platform; we're not a domain name registrar or a DNS hosting service.

### Pantheon's Recommended DNS Configuration For pantheon.io Sites

You should configure the DNS for both your non-www (bare domain) and www domain, like example.com and www.example.com. If you don't, users who add (or omit) the www will not see your site and assume your site is down. There are also negative SEO implications if you have both configured without a redirect to a single canonical domain, like duplicate content.

1. DNS CNAME Record for www subdomain
2. DNS A Record for non-www domain
3. [Redirect non-www to www in settings.php or wp-config.php](/docs/articles/sites/code/redirect-incoming-requests/#redirect_common)

See [Using Pantheon.io for Better Uptime](/docs/articles/sites/domains/using-pantheon-io-for-better-uptime) for more information.


## Pantheon's Legacy DNS Configuration for gotpantheon.com Sites

These DNS records are for Pantheon-hosted sites _already using a gotpantheon.com development URL_. **Do not utilize our legacy DNS records for any new sites which use the pantheon.io development URL** . Please refer to the "Domains" panel on your site's dashboard for the specific DNS records that will successfully route traffic to your site.

<dl class="records">
	<dt>DNS CNAME record - highly available</dt>
	<dd>edge.live.getpantheon.com</dd>
	<dt>DNS A record - Load-balanced IPv4 (legacy)</dt>
	<dd>192.237.142.203</dd>
	<dt>DNS A record - Load-balanced IPv4 (legacy)</dt>
	<dd>50.56.49.247</dd>
	<dt>DNS AAAA record - Load-balanced IPv6 (legacy)</dt>
	<dd>2001:4801:7901:0000:c5ce:526c:0000:000f</dd>
	<dt>Nameservers:</dt>
	<dd>We do not have nameservers at Pantheon because we do not manage any DNS services. Use the nameservers given to you by your DNS provider.</dd>
</dl>
## Pantheon DNS records for HTTP sites

Your site dashboard recommends the specific DNS settings you should use. These can be found under the _Domains /  SSL_ tab, per environment. In most cases, you'll only need to configure DNS for the _Live_ environment:  


 ![Domain Setup Panel](https://www.getpantheon.com/sites/default/files/docs/desk_images/341988)

## DNS Records for HTTPS Sites (SSL/TLS)

If you are using HTTPS for security and using an identity certificate, you **must** use your custom load-balanced IP address as an A record. See [adding a SSL certificate for secure HTTPS communication](/docs/articles/sites/domains/adding-a-ssl-certificate-for-secure-https-communication/) for details.

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

#### How long do DNS changes typically take?

It depends on several factors, including the TTL of your DNS records. As a rule of thumb, DNS changes can take up to 48 hours to propagate across the entire Internet, so be patient - it'll happen. With that said, most updates happen in a couple hours.

#### Can I use a CNAME for my bare/naked/root domain?

It depends; the bare domain should only have an A record that maps to an IP. Some DNS providers ( [DNS Made Easy](http://www.dnsmadeeasy.com/services/aname-records/), [CloudFlare](https://support.cloudflare.com/hc/en-us/docs/articles/200169056-CNAME-Flattening-RFC-compliant-support-for-CNAME-at-the-root) and others) let you use a CNAME with a bare domain (maybe referred to as ANAME, or CNAME Flattening), but it's non-standard. Check with your DNS provider’s documentation to see if this is an option. Alternatively, see the related FAQ item [Pantheon's WWW Redirection Service](/docs/articles/sites/domains/dns-records-for-directing-your-domain-to-your-pantheon-site/#Pantheon'sRecommendedDNSConfigurationForpantheon.ioSites/)


See [Using Pantheon.io for Better Uptime](/docs/articles/sites/domains/using-pantheon-io-for-better-uptime) for more information.

#### How do I use Pantheon's WWW redirection service?

If you need to direct traffic from a non-www domain (e.g. example.com), you can use our www-redirection service by setting an A record to 192.237.224.60. This is a simple web-server that will redirect to the www domain for your site. This option will only work correctly if the www domain for your site is configured correctly on Pantheon!

#### Can a site on Pantheon be used with a third-party reverse proxy?

Yes; many Pantheon customers use third-party reverse proxies, such as [CloudFlare](https://www.cloudflare.com/). If you'd like to do this, do **not** direct traffic to a \*.gotpantheon.com domain. Instead, associate an intermediate domain with the live environment and create the appropriate DNS entries, then point your reverse proxy to the intermediate domain.

#### Can I test my domain name without making DNS changes?

Yes; see [developing with a domain without changing DNS](/docs/articles/sites/domains/adding-a-domain-to-a-site-environment/#dev_wo_dns).

#### Why isn't my site loaded when I ping the provided Pantheon IP?

Your site won't load from the provided IP's because the Pantheon IP's used in the configurations above are the addresses of our load-balancers. When a request comes in, our load-balancers route the request to the proper site. 

<style type="text/css">.records dd {
  font-family: monospace;
}
</style>
