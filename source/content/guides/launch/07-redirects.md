---
title: Launch Essentials
subtitle: Set a Primary Domain for SEO
description: Redirect users to the correct domains and paths for your site.
tags: [dns, https, launch, webops]
layout: guide
showtoc: true
permalink: docs/guides/launch/redirects
anchorid: launch-redirects
contenttype: guide
categories: [domains, launch]
newcms: [wordpress, drupal]
audience: [agency, development]
product: [dashboard, terminus]
integration: [--]
---

This section provides information on how to redirect all traffic to a primary domain, which is a best practice for SEO. This means if you choose `www.example.com` as your primary domain, then if a visitor navigates to a bare domain, for example, `example.com` (or any other domain you have connected to your site), they will end up on `https://www.example.com`.

Choose one of the following options to configure the primary domain.

<Partial file="primary-domain.md" />

### Update URL References (WordPress)

WordPress site admins must ensure that all URLs in the site's database are updated. See [Fix WordPress Content References to the Wrong Domain After Cloning](/wordpress-broken-links#fix-wordpress-content-references-to-the-wrong-domain-after-cloning) for more information.

### Configure a Long-Duration HSTS Header

You should configure a long-duration HTTP Strict Transport Security (HSTS) header, or set up an availability monitoring service to watch over your site after redirecting requests to a single, primary domain.

HSTS instructs browsers to only connect via HTTPS and helps protect websites against protocol downgrade attacks and cookie hijacking. Refer to [Enforce HTTPS + HSTS](/pantheon-yml#enforce-https--hsts) for more information.

## More Resources

- [Platform and Custom Domains](/guides/domains)

- [Pantheon YAML Configuration Files](/pantheon-yml)

- [Secure Development on Pantheon](/guides/secure-development)
