---
title: Platform and Custom Domains
subtitle: Platform Domains
description: Learn more about Pantheon platform domains.
categories: [go-live]
tags: [dashboard, dns, https, redirects]
searchboost: 150
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/domains/platform-domains
anchorid: platform-domains
---

This section provides information Pantheon platform domains.

## Platform Domains

Pantheon issues platform domains for all environments. Each environment (Dev, Test, Live, and each Multidev) is accessible via the platform domain, and matches the following patterns:

- `dev-site-name.pantheonsite.io`
- `test-site-name.pantheonsite.io`
- `live-site-name.pantheonsite.io`
- `multidev-env-site-name.pantheonsite.io`

All platform domains are available over HTTPS. Redirecting to HTTPS during development and testing is a recommended best practice to ensure you are ready to go live with HTTPS. Refer to [Redirect to HTTPS](/guides/redirect/#redirect-to-https) for more information.

### robots.txt

Pantheon serves a default `robots.txt` that disallows crawlers on platform domains, such as:

- `/*.pantheonsite.io`
- `/*.pantheon.io`
- `/*.gotpantheon.com`
- `/*.sites.my-agency.com`

Crawlers are allowed on the Live environment for requests served with a custom domain (for example, `www.example.com`). The default `robots.txt` will be served if you attempt to access your Live environment with a platform domain, even if you have a domain associated with the environment.

Pantheon does not allow crawlers on Dev, Test, or Multidev environments. Adding a custom domain to an environment other than Live will not permit crawlers to that environment.

## More Resources

- [Bots and Indexing on Pantheon](/bots-and-indexing)

- [Platform Considerations](/guides/platform-considerations)