---
title: Enable HTTPS for Sites Using a Custom Vanity Domain
description: Enable HTTPS for all Drupal and WordPress sites using your organization's custom vanity domain.
tags: [tools, security]
categories: [manage]
---
Enable HTTPS across all sites using your organization's Vanity domain by adding a wildcard certificate to the primary site.

**Vanity domains** on Pantheon replace the default Platform domain (`pantheonsite.io`) with a custom domain for all sites associated with your organization. This feature is available to Pantheon Partners, Strategic Partners, Enterprise accounts, Resellers, and OEM Partners. For more information, see [Vanity Domains](/docs/vanity-domains).
## Before You Begin
Be sure that you have:

- A Vanity domain, otherwise  [request one](/docs/vanity-domains/#request-the-vanity-domain) and [consider the effects](/docs/vanity-domains/#effects-and-considerations) before proceeding
- A Wildcard SSL Certificate from an [SSL Provider](/docs/enable-https#ssl-providers)

## Create HTTPS Endpoint
Configuring your custom Vanity domain as an HTTPS endpoint enables all environment URLs (including Multidev) associated with your organization to be accessible via HTTPS. This requires adding a wildcard certificate to the Vanity domain in use, which is either a subdomain of your primary site (`sites.mydomain.com`) or a dedicated domain name (`mypantheonprojects.com`).
<div class="alert alert-info">
<h4 class="info">Note</h4>
<p><strong>Pantheon Partners:</strong> Running your agency's primary site on Pantheon is <strong>free</strong>, as is the option to add an SSL. This means you can use your primary site as an HTTPS endpoint at no cost. This offer is available to Pantheon Partner organizations exclusively.
</p></div>
Organizations using a subdomain as their custom Vanity domain (`*.mydomain.com`) may enable a wildcard certificate within the primary site's Live environment. This allows the same HTTPS endpoint to serve for both their primary site's Live environment (e.g. `mydomain.com` and `www.mydomain.com`), and for their custom subdomains: `site1.mydomain.com`, `site2.mydomain.com`, and so on.

Organizations using a dedicated domain name for their Pantheon custom subdomain (`*.mypantheonprojects.com`) will need to use two different certificates, one within the primary site's Live environment and one wildcard certificate within the site's Test environment. The Test environment will serve as the HTTPS endpoint for associated projects.
## Configure DNS
Direct the wildcard DNS to the IP address associated with the wildcard cert. This can be found within the **Domains/SSL** tab for the environment where your wildcard certificated was loaded.
## See Also
- [Domains and DNS](/docs/domains)
- [Enable SSL for Secure HTTPS Communication](/docs/enable-https)
