---
title: Customizing Your Base Domain
description: Replace "pantheonsite.io" within Pantheon environments by adding a custom development domain.
category:
  - managing
keywords: development domain, base domain, change dev url, change development domain, change base domain, dev url, wildcard, cname, edge, dns
---
Pantheon Partners, Strategic Partners, Enterprise accounts, Resellers, and OEM Partners have the ability to replace `pantheonsite.io` as the base domain for each environment on every site they run or are developing on the platform.

The base development domain can either be a subdomain of your primary site (`sites.mydomain.com`) or a dedicated domain name (`mypantheonprojects.com`).

If a subdomain of your primary site is configured, a newly created site named "supersite" will then have a Dev environment URL of `dev-supersite.sites.mydomain.com`. If a dedicated domain name is used, the site would instead have a Dev environment URL of `dev-supersite.mypantheonprojects.com`.
<div class="alert alert-info">
<h4>Note</h4>
<strong>Pantheon Partners:</strong> Running your agency's primary site on Pantheon is <strong>free</strong>, as is the option to add an SSL. This means you can use your primary site as an HTTPS endpoint at no cost. This offer is available to Pantheon Partner organizations exclusively. For more information, see <a href="/docs/articles/organizations/https-for-sites-using-customized-base-domains">Enable HTTPS for Sites Using Customized Base Domains</a>.
</div>

## Request the Base Domain

From your Organization Dashboard, go to Support and open a ticket with "Request for custom base domain" as the subject. The body of the ticket must state the base domain required on the site, like `sites.example.com`.

## Create a Wildcard CNAME Record

At your DNS provider, create a wildcard CNAME record pointing to our edge. If you go with `sites.example.com`, the record would need to be created as follows:

`*.sites.example.com` **CNAME** `edge.live.getpantheon.com`

## Effects and Considerations

 - Sites associated with your organization will receive the custom base URL for all environments (including Multidev) created while the organization remains a supporting organization. If the supporting organization is removed from the team, new environments will receive URLs following the default `.pantheonsite.io` pattern. This includes new Multidev environments and Test and Live environments created **after** the organization was removed.

 - After adding a custom domain to your organization, some workflow operations such as restoring an environment from a backup or changing the PHP version, can cause site domain URLs in other environments to unexpectedly change from the Pantheon domain to the custom domain.

 - **Environment URLs are permanent.** If an organization is removed as the supporting organization, any environment created during its association will keep the original URL after removal. Paid sites can add custom domains to any environment, as a workaround for those wishing to use different URL's after launch and disassociation of the site with the organization.


## Security Considerations

If you run sites on subdomains of your primary site (e.g. `sites.awesomeagency.com`), you should be aware of some security considerations:

* The sites on the subdomains may be able to read cookies set on your primary site.
* If a site on the subdomain is reported as a malicious phishing/spam/malware site, it could prevent access to your main marketing site if Google/Norton/etc. block the site.


## Robots.txt with Custom Base Domains

For SEO and to prevent duplicate content, the robots.txt file attached to the custom base domain will contain the following by default:

```
# http://live-sitename.agencyname.com/robots.txt
User-agent: *
Disallow: /
```
To present an alternate robots.txt file from within the source code, a custom domain needs to be <a href="/docs/articles/sites/domains#step-2-add-domains-to-the-site-environment" data-proofer-ignore>added to the site's Dashboard</a> and the appropriate DNS record created.

## See Also
- [Enable HTTPS for Sites Using Customized Base Domains](/docs/articles/organizations/https-for-sites-using-customized-base-domains)
