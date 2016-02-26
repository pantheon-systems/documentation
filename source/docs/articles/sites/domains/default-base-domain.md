---
title: Default Base Domain
description: Understand the default base domain assigned to environments on Pantheon sites.
categories:
  - sites
tags:
  - domains
---
Every site on Pantheon is given three environments (Dev, test, and Live), each with their own unique URLs which are bound to isolated resources. Environment URLs are configured as subdomains during site creation by prefixing the environment to the site name.

All sites use `pantheonsite.io` as a base domain, with environment and site specific subdomains:

  - dev-site-name.pantheonsite.io
  - test-site-name.pantheonsite.io
  - live-site-name.pantheonsite.io

## Legacy Base Domains
All sites have platform-assigned `pantheonsite.io` development domains,  regardless of when the site was created on Pantheon.

DNS configurations which use the `gotpantheon.com` legacy base domain will continue to work, as requests are permanently redirected to `pantheonsite.io`. However, we recommend switching the CNAME value from `gotpantheon.com` to `pantheonsite.io` within the domain's DNS provider to take advantage of uptime and reliability improvements.

Sites using the `pantheon.io` base domain already enjoy these platform improvements and may use `pantheonsite.io` if they wish to standardize on the new domain.

## Custom Base Domain
Pantheon Partners, Strategic Partners, Enterprise accounts, Resellers, and OEM Partners have the ability to replace `pantheonsite.io` as the base domain for each environment on every site they run or are developing on the platform.

For details, see [Customizing Your Base Domain](/docs/articles/organizations/base-domains/).
