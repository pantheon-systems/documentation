---
title: Using Pantheon.io For Better Uptime
description: Understand the new pantheon.io system and how it improves uptime.
category:
  - developing

---

## About pantheon.io

**Note**: Pantheon is no longer offering shared static IP addresses for customer sites. Existing sites are not affected and can continue to use the legacy configuration. This information applies only to sites created after Oct 22nd, 2014.

The new pantheon.io system provides higher-uptime alternatives to our legacy method of providing shared IP addresses; after all, Shared IPs mean shared problems.

Using a "www" subdomain allows you to avoid having your site's domain name tied to a static shared resource. This means that when Pantheon takes evasive action to route around network failure, there is less room for downtime.

The following is an example of the optimal configuration:

![](/source/docs/assets/images/desk_images/376194.png)

Using “www” is considered an Internet-wide best practice and for best results we recommend you use the "www" prefix for your domain. This isn't really a Pantheon recommendation per-se; it's an internet-wide phenomena. Take a look at [http://www.yes-www.org/why-use-www/](http://www.yes-www.org/why-use-www/) for some good background on why bare domains are hard to use with modern platform providers.

## DNS settings for non-www or a subdomain

**Note**: Legacy users with getpantheon.com are not affected by these changes. These sites should use these [DNS Records](http://helpdesk.getpantheon.com/customer/portal/articles/1319336). Only sites created after October 22, 2014 with pantheon.io domains are affected.

Some DNS providers have developed options to allow customers to use bare domains without requiring a static IP address. There are general options for the alternative implementations if you wish to use a non-www domain.

### Alias Records (ALIAS/ANAME)

[ALIAS or ANAME](http://help.dnsmadeeasy.com/spry_menu/aname-records/) records can be used as the root record for a domain as the resulting records created are A records which bypasses the limitation of allowing the alias at the root domain.

*   [Route 53](http://aws.amazon.com/route53/faqs/#Supported_DNS_record_types)
*   [DNSimple](http://support.dnsimple.com/articles/differences-between-a-cname-alias-url/)
*   [DNS Made Easy](http://www.dnsmadeeasy.com/services/aname-records/)
*   [EasyDNS](http://docs.easydns.com/aname-records/)

### Flattened CNAME/Redirect

*   [CloudFlare](https://support.cloudflare.com/hc/en-us/articles/200169056-CNAME-Flattening-RFC-compliant-support-for-CNAME-at-the-root)
*   [ClouDNS](https://www.cloudns.net/features/)
*   [NameCheap](https://www.namecheap.com/domains/freedns.aspx)

### SSL

If you require SSL, you will still get a dedicated IP address for your site. This IP can also be used to support any DNS configuration needed. The only sites who are "forced" to make a change are Personal-level sites, or Pro/Business sites which are not using SSL or who don't want to get a dedicated static IP.

Please understand that we cannot specifically support third-party DNS configuration, nor do we endorse or guarantee their service. These links are provided as a convenience for our users. With the range of options available, we are certain there is something workable for any budget.

### Troubleshooting non-www DNS

#### My domain sub.example.com resolves to&nbsp;www.sub.example.com

If you would like to access a site using a subdomain, then you will need to use one of the methods described above. Pantheon will no longer be providing an I.P. address to point your DNS which is important to keep in mind.

![](/source/docs/assets/images/desk_images/376209.png)

To fix this problem, the DNS will need to be updated with one of the recommended methods above. There is no way to access the subdomain while it is pointed to the Dub Dub Dubber redirection address.

## DNS settings for a www domain

#### WWW sounds like the way to go. But how can I force traffic to use www?

The simplest and most reliable option is to use a service to redirect requests from your bare domain to the www subdomain. Most DNS services offer this as a feature. These services ensure that the universe of bookmarks and SEO records for your site are built up as www urls and not the bare domain.

​![](/source/docs/assets/images/desk_images/376216.png)​

To get started, all you need to do is setup the DNS configuration for the www and non-www domain using the settings on the "Domains" tab of the environment where you wish to add a domain

_NOTE: This is not a general-purpose redirection service. If your DNS provider does not offer such a service, Pantheon operates a ["dub-dub-dubber" service](http://helpdesk.getpantheon.com/customer/portal/articles/1319336#pantheon_www_redirection). It is a simple but robust tool to take an incoming request for a bare domain, and bounce it to the www subdomain. All other redirects must be done via PHP logic. You can read more here._

### Troubleshooting www DNS

#### My domain www.example.com resolves to&nbsp;www.www.example.com

If you find that you are getting a domain like www.www.example.com this means that you have set your DNS for the www domain to the Dub Dub Dubber I.P. address (192.237.224.60).

![](/source/docs/assets/images/desk_images/376201.png)

In order to correct this you should use the CNAME that is available on the dashboard for the environment where you are adding the domain, e.g. live-example.pantheon.io.

## Best Practices

*   Do **not** point to [legacy I.P. address](http://helpdesk.getpantheon.com/customer/portal/articles/1319336) if you are on a pantheon.io site
*   Use www as the primary domain where possible
*   Do **not** point subdomains to the Dub Dub Dubber, this will not work
*   Use the recommended DNS config on dashboard for pantheon.io sites
*   Do **not** point non-www domains to the Dub Dub Dubber unless to immediately redirect to www
*   Set AAAA record where possible for non-www domains

## Measure Twice, Cut Once

Going live and changing DNS settings can be stressful, but so long as you have a clear plan of action you should be able to pull it off without a hitch. Planning how you're handling the question of the domain name is a good decision to get out of the way well before the actual launch day.

We recommend making a checklist of everything you need to do to set up/cut over DNS and take a site live. It's a good idea to have all your tools and decisions finalized at least 48 hours in advance, and make sure your whole team (even if that's just you and a client) are on the same page.

Happy launching!
