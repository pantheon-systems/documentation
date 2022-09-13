---
title: Domains on Pantheon
subtitle: Primary Domains
description: Learn more about choosing your primary domain.
categories: [go-live]
tags: [dashboard, dns, https, redirects]
searchboost: 150
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/domains/primary-domain
anchorid: primary-domain
---

This section provides information on how to choose and configure your primary domain.

## Choose Primary Domain

Pantheon uses the term **primary domain** to refer to a single domain used to serve all traffic from a site. For example, configuring `www.example.com` as the primary domain means that requests to `example.com` (or any other custom domain connected to the environment) all get redirected to `www.example.com`. This assumes that you have added **both** `example.com` and `www.example.com` to the Site Dashboard.

Redirecting all traffic to a primary domain is a best practice for SEO since it avoids duplicate content. It also prevents session strangeness, where a user can be logged in to one domain but logged out of other domains at the same time, and it can make it easier to measure and monitor website traffic.

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