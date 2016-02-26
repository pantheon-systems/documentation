---
title: Enable HTTPS for Sites Using Customized Base Domains
description: Learn how to enable HTTPS for all sites using your Organization's customized base domain.
keywords: https development domain, base domain, change dev url, change development domain, change base domain, dev url, wildcard, cname, edge, dns, https
---
Enable HTTPS across all sites using your organization's customized base domain by adding a wildcard certificate to the primary site.

**Customized base domains** on Pantheon replace `pantheonsite.io` as the base domain for all sites associated with your organization. This feature is available to Pantheon Partners, Strategic Partners, Enterprise accounts, Resellers, and OEM Partners. For more information, see [Customizing Your Base Domain](/docs/articles/organizations/base-domains)
## Before You Begin
Be sure that you have:

- A customized base domain, otherwise  [request one](/docs/articles/organizations/base-domains/#request-the-base-domain) and [consider the effects](/docs/articles/organizations/base-domains/#effects-and-considerations) before proceeding
- A Wildcard SSL Certificate from an [SSL Provider](/docs/articles/sites/domains/adding-a-ssl-certificate-for-secure-https-communication#ssl-providers)

## Create HTTPS Endpoint
Configuring your customized base domain as an HTTPS endpoint enables all environment URLs (including Multidev) associated with your organization to be accessible via HTTPS. This requires adding a wildcard certificate to the base domain in use, which is either a subdomain of your primary site (`sites.mydomain.com`) or a dedicated domain name (`mypantheonprojects.com`).
<div class="alert alert-info">
<h4>Note</h4>
<strong>Pantheon Partners:</strong> Running your agency's primary site on Pantheon is <strong>free</strong>, as is the option to add an SSL. This means you can use your primary site as an HTTPS endpoint at no cost. This offer is available to Pantheon Partner organizations exclusively.
</div>
Organizations using a subdomain as their customized base domain (`*.mydomain.com`) may enable a wildcard certificate within the primary site's Live environment. This allows the same HTTPS endpoint to serve for both their primary site's Live environment (e.g. `mydomain.com` and `www.mydomain.com`), and for their custom subdomains: `site1.mydomain.com`, `site2.mydomain.com`, and so on.

Organizations using a dedicated domain name for their Pantheon custom subdomain (`*.mypantheonprojects.com`) will need to use two different certificates, one within the primary site's Live environment and one wildcard certificate within the site's Test environment. The Test environment will serve as the HTTPS endpoint for associated projects.
## Configure DNS
Direct the wildcard DNS to the IP address associated with the wildcard cert. This can be found within the **Domains/SSL** tab for the environment where your wildcard certificated was loaded.
## See Also
- [Domains and DNS](/docs/articles/sites/domains)
- [Enable SSL for Secure HTTPS Communication](/docs/articles/sites/domains/adding-a-ssl-certificate-for-secure-https-communication)
