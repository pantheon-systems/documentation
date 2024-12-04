---
title: Platform and Custom Domains
subtitle: Platform Domains
description: Learn more about Pantheon platform domains.
tags: [dashboard, dns, https, redirects]
searchboost: 150
contributors: [whitneymeredith]
showtoc: true
permalink: docs/guides/domains/platform-domains
contenttype: [guide]
innav: [false]
categories: [domains]
cms: [--]
audience: [development, sysadmin]
product: [dashboard]
integration: [--]
---

This section provides information Pantheon platform domains.

## Platform Domains

<Partial file="dns-platform-domains.md" />

All platform domains are available over HTTPS. Redirecting to HTTPS during development and testing is a recommended best practice to ensure you are ready to go live with HTTPS. Refer to [Redirect to HTTPS](/guides/redirect/#redirect-to-https) for more information.

<Alert title="Note" type="info">

Platform domains are provisioned automatically and are non-configurable. Attempting to add variants of a platform domain (e.g. `foo.site-name.pantheonsite.io`) as a [custom domain](https://docs.pantheon.io/guides/domains/custom-domains) will result in an error. 

</Alert>

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
