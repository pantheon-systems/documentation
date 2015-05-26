---
title: Domains and SSL Tool
description: Learn about the Domains tool
category:
  - developing
  - managing
  - going-live
---
Pantheon provides distinct base domains for the consistent access of the Development, Testing, and Live production environments for each site on the platform from the moment they are launched.

All sites on Pantheon can be divided into three base domain URL patterns.

**Note:** In the example base domain patterns, `env` stands for either `dev`, `test`, or `live`; and `sitename` is the chosen name for the site:

* [Pantheon.io base domains](https://pantheon.io/docs/articles/sites/domains/using-pantheon-io-for-better-uptime/): `env-sitename.pantheon.io`
* Legacy GotPantheon.com base domains: `env.sitename.gotpantheon.com` or `env-sitename.gotpantheon.com`
* [Custom organizational base domains](https://pantheon.io/docs/articles/organizations/base-domains/): `env-sitename.custom.domain.tld`

Once sites are launched at a paid service level, custom domains can be added to each environment. Securing visitor traffic with HTTPS communication requires uploading a custom certificate and setting the DNS `A` record to a dedicated IP. For all sites in all configurations, the recommended DNS records will be provided on the Domains and SSL tab.

* [Adding a Domain to a Site Environment](/docs/articles/sites/domains/adding-a-domain-to-a-site-environment/)
* [Enable SSL for Secure HTTPS Communication](/docs/articles/sites/domains/adding-a-ssl-certificate-for-secure-https-communication/)
* [DNS Records for Directing Your Domain to Your Pantheon Site](/docs/articles/sites/domains/dns-records-for-directing-your-domain-to-your-pantheon-site/)


## Recommended DNS Records

Each site’s base domain URL pattern determines which DNS records must be set in order for visitor traffic directed at the domain to resolve as expected. For every type of base domain, the Domains and SSL tool on each environment of a Pantheon site will show the recommended DNS records. These are the only records that should be set for a domain; any other value will result in a routing error.

As Pantheon does not provide name servers, or have the ability to set up any domain records for sites, it is up to the site owner or technical contact to configure the domain, and verify that all records correspond to the recommendations shown in the Domains and SSL tool.

Root domains, often known as bare or naked domains, are most often in the format of `example.com`, and usually require DNS `A` records. Subdomains frequently match `www.example.com` and are set to DNS `CNAME` entries. The Domains and SSL tool will present the appropriate recommendation for a DNS record depending on whether the custom domain is a root or subdomain.

### DNS Records for Pantheon.io Base Domains

Sites launched with the `env-sitename.pantheon.io` base domain should have the following recommended DNS records configured:

_Root domains_

* DNS `A` record (www-redirector) - `192.237.224.60`
* DNS `AAAA` record (www-redirector) - `2001:4801:7901:0000:c5ce:526c:0000:001a`

_Subdomains_

* DNS `CNAME` record - `env-sitename.pantheon.io`

### DNS Records for Legacy GotPantheon.com Base Domains

Sites launched with the `env.sitename.gotpantheon.com` or `env-sitename.gotpantheon.com` base domain should have the following recommended DNS records configured:

_Root domains_

* DNS `A` record (Load-balanced IPv4) - `192.237.142.203`
* DNS `AAAA` record (Load-balanced IPv6) - `2001:4801:7901:0000:c5ce:526c:0000:000f`

_Subdomains_

* DNS `CNAME` record (highly available) - `edge.live.getpantheon.com`

### DNS Records for Custom Base Domains

Sites launched with a custom `env-sitename.custom.domain.tld` base domain should have the following recommended DNS records configured:

_Root domains_

* DNS `A` record (Load-balanced IPv4) - `192.237.142.203`
* DNS `AAAA` record (Load-balanced IPv6) - `2001:4801:7901:0000:c5ce:526c:0000:000f`

_Subdomains_

* DNS `CNAME` record (highly available) - `edge.live.getpantheon.com`

## Secure HTTPS Communication

All base domains on Pantheon enable HTTPS service by default, even on free sandbox sites, so everyone can [develop sites securely](/docs/articles/sites/domains/developing-with-ssl/) from the moment of spinup. The free default HTTPS service on base domains uses a wildcard certificate to cover all sites on the platform with secure communication. Serving visitor traffic for a custom domain over HTTPS using a custom certificate requires at least a Pro service level site, in addition to the independent purchase of the certificate. Use the Domains and SSL tool to upload the necessary private key, any intermediary certificate bundles, and the custom certificate itself. When initiating the HTTPS service for an environment, a unique load-balanced IP is provisioned, to which the domain DNS `A` record must be set, in order for visitor traffic to be served with the custom certificate.

### DNS Records for HTTPS Enabled Environments

Environments with HTTPS communications enabled should use the dedicated IP shown in the recommended DNS records. These examples only indicate the pattern of the typical records to set:

 _Root domains_

* DNS `A` record (HTTPS IPv4) - `xxx.xxx.xxx.xxx`
* DNS `AAAA` record (HTTPS IPv6) - `ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff`

_Subdomains_

* DNS `A` record (HTTPS IPv4) - `xxx.xxx.xxx.xxx`
* DNS `AAAA` record (HTTPS IPv6) - `ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff`

## Domain Redirection

Redirecting to standardize on either root domains or subdomains using PHP is supported at all paid site service levels with the Legacy and Custom base domains, as well as HTTPS Enabled Environments for sites with any base domain.

For sites launched with Pantheon.io base domains, redirecting root domains using our www-redirector to standardize on the www subdomain is supported. Redirecting correctly configured subdomains using PHP to other subdomains is also supported. However, redirecting to root domains is not supported in the default configuration. To standardize on a root domain with a Pantheon.io base domain site, use a DNS provider with `CNAME` flattening for root domains, rather than setting any records to our www-redirector. In this case you would set the flattened `CNAME` record for the root domain to `env-sitename.pantheon.io`. Alternatively, you may obtain a load-balanced `A` record by setting the site to at least a Pro service level, enabling HTTPS service with a custom certificate, and configuring the DNS for HTTPS enabled environments.

##See Also

* [Redirect to a Common Domain](/docs/articles/sites/code/redirect-incoming-requests/#redirect-to-a-common-domain)
* [Redirecting to HTTPS](/docs/articles/sites/code/redirect-incoming-requests/#redirecting-to-https)

