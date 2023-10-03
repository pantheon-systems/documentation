---
title: Domains on Pantheon
subtitle: Primary Domains
description: Learn more about choosing your primary domain.
tags: [dashboard, dns, https, redirects]
searchboost: 150
contributors: [whitneymeredith]
showtoc: true
permalink: docs/guides/domains/primary-domain
contenttype: [guide]
innav: [false]
categories: [domains]
cms: [--]
audience: [development, sysadmin]
product: [dashboard]
integration: [--]
---

This section provides information on how to choose and configure your primary domain.

## Choose Primary Domain


<Partial file="dns-primary.md" />


Choose a primary domain from the dropdown at the bottom of **Domains / HTTPS**:

![Set the primary domain in the Site Dashboard](../../../images/dashboard/choose-primary-domain.png)

<Alert title="Note" type="info">

Redirects cannot be managed via `.htaccess`, which is ignored on our platform. For details, refer to [Configure Redirects](/guides/redirect/#php-vs-htaccess).

</Alert>

<Partial file="primary-domain.md" />

<Partial file="remove-primary-domain.md" />

### Redirect to HTTPS

It's a best practice for SEO and security to standardize all traffic on HTTPS and choose a primary domain. Configure redirects to the primary domain with HTTPS in [pantheon.yml](/pantheon-yml#enforce-https--hsts)

### Redirect with PHP

If your site configuration prevents you from setting the primary domain from the platform level, you can use PHP redirects:

<Accordion title="PHP Redirection" >

<Partial file="_redirects.md" />

</Accordion>

## More Resources

- [Configure Redirects](/guides/redirect)

- [Redirect to HTTPS](/guides/redirect/https/)
