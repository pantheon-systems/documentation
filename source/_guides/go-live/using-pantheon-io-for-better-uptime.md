---
title: Using Pantheon.io For Better Uptime
parent_guide:
    - going-live
/using-pantheon-io-for-better-uptime/
Metadata
filename: source/_docs/using-pantheon-io-for-better-uptime.md
---

As of October 22nd, 2014, Pantheon is no longer offering shared static IP addresses for customer sites. The new pantheon.io system provides higher-uptime alternatives.

Existing sites are not affected, and cannot use pantheon.io yet. This information applies only to sites _created_ after Oct 22nd.

If you require SSL, you will still get a dedicated IP address for your site. This IP can also be used to support any DNS configuration needed. The only sites who are "forced" to make a change are Personal-level sites, or Pro/Business sites which are not using SSL or who don't want to get a dedicated static IP.

All customers going live without a site-specific dedicated IP should make use of our new pantheon.io routing system and DNS configuration. This is far superior to our legacy method of providing shared IP addresses for customers to use in DNS.

For best results we recommend you use the "www" prefix for your domain. This isn't really a Pantheon recommendation per-se; it's an internet-wide phenomena. Take a look at [http://www.yes-www.org/why-use-www/](http://www.yes-www.org/why-use-www/) for some good background on why bare domains are hard to use with modern platform providers.

Shared IPs mean shared problems, and are not compatible with the level of service Pantheon wants for its users. Using the "www" subdomain allows you to avoid having your site's domain name tied to a static shared resource. It will improve your uptime when Pantheon needs to take evasive action to route around network failure.

Of course, people still need to reach your site if they type in the bare domain name. Here's how.

#### Redirecting to "www"

The simplest and most reliable option is to use a service through your DNS provider to redirect requests for your bare domain to the www subdomain. Most DNS services — even bargain operators like GoDaddy — offer this as a feature. This is preferable because it will ensure that the universe of bookmarks and SEO links for your site are all built up as www urls, not the bare domain.

If your DNS provider does not offer such a service, Pantheon operates a ["dub-dub-dubber" service](/documentation/getting-started/dns-records-for-directing-your-domain-to-your-pantheon-site/#pantheon_www_redirection) as a fallback. Note this is not a general-purpose redirection service. It is a simple but robust tool to take an incoming request for a bare domain, and bounce it to the www subdomain.

#### Advanced DNS Services

Some advanced DNS providers have developed options to allow customers to use bare domains without requiring a static IP address. There are two general implementations.

**Alias Records (ALIAS/ANAME)**

ALIAS or ANAME records can be used as the root record for a domain as the resulting records created are A records which bypasses the limitation of allowing the alias at the root domain.

- [Route 53](http://aws.amazon.com/route53/faqs/#Supported_DNS_record_types)
- [DNSimple](https://dnsimple.com/plans)
- [DNS Made Easy](http://www.dnsmadeeasy.com/services/aname-records/)
- [EasyDNS](http://docs.easydns.com/aname-records/)

**Flattened CNAME/Redirect**

It is also possible to use DNS level redirect in order to direct traffic to the bare domain of your site. Some of the providers that offer either a flattened CNAME or a redirection service:

- [CloudFlare](https://support.cloudflare.com/hc/en-us/articles/200169056-CNAME-Flattening-RFC-compliant-support-for-CNAME-at-the-root)
- [ClouDNS](https://www.cloudns.net/features/)
- [NameCheap](https://www.namecheap.com/domains/freedns.aspx)

Please understand that we cannot specifically support third-party DNS configuration, nor do we endorse or guarantee their service. These links are provided as a convenience for our users. With the range of options available, we are certain there is something workable for any budget.

#### Measure Twice, Cut Once

Going live and changing DNS settings can be stressful, but so long as you have a clear plan of action you should be able to pull it off without a hitch. Planning how you're handling the question of the domain name is a good decision to get out of the way well before the actual launch day.

We recommend making a checklist of everything you need to do to set up/cut over DNS and take a site live. It's a good idea to have all your tools and decisions finalized at least 48 hours in advance, and make sure your whole team (even if that's just you and a client) are on the same page.

Happy launching!


