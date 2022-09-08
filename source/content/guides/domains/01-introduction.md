---
title: Platform and Custom Domains
subtitle: Introduction
description: Work with platform domains or connect custom domains in the Site Dashboard, then redirect requests via PHP to standardize traffic on HTTPS and a primary domain.
categories: [go-live]
tags: [dashboard, dns, https, redirects]
searchboost: 150
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/domains
anchorid: domains
---

A domain name is the web address or URL used to visit your site. The Domain Name System (DNS) resolves human-readable names like `www.example.com` into machine-readable IP addresses like `127.0.0.1`. All Pantheon sites are accessible via platform domains, and you can easily connect your own custom domain to paid sites.

<Enablement title="Get WebOps Training" link="https://pantheon.io/learn-pantheon?docs" campaign="docs-webops">

Optimize your dev team and streamline internal workflows. Pantheon delivers on-demand training to help development teams master our platform and improve their internal WebOps.

</Enablement>

## Platform Domains

Pantheon issues platform domains for all environments. Each environment (Dev, Test, Live, each Multidev) is accessible via the platform domain, matching the following patterns:

- dev-site-name.pantheonsite.io
- test-site-name.pantheonsite.io
- live-site-name.pantheonsite.io
- multidev-env-site-name.pantheonsite.io

All platform domains are available over HTTPS. Redirecting to HTTPS during development and testing is a good best practice to ensure you are ready to go live with HTTPS. See [Redirect to HTTPS](/guides/redirect/#redirect-to-https) for more information.

### robots.txt

Pantheon serves a default `robots.txt` that disallows crawlers on platform domains (`/*.pantheonsite.io`, `/*.pantheon.io`, `/*.gotpantheon.com`, and `/*.sites.my-agency.com`). Crawlers are allowed on the Live environment for requests served with a custom domain (e.g., `www.example.com`). If you attempt to access your Live environment with a platform domain, even if you have a domain associated with the environment, the default `robots.txt` will be served.

Pantheon does not allow crawlers on Dev, Test, or Multidev environments. Adding a custom domain to an environment other than Live will not permit crawlers to that environment.

## More Resources

- [Configure Redirects](/guides/redirect)
- [Launch Essentials](/guides/launch)
- [Relaunch Existing Pantheon Site](/relaunch)