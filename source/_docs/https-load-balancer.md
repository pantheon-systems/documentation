---
title: Supported Methods for Configuring an HTTPS Load Balancer
description: Explore different solutions for enabling HTTPS on all environment URLs (including Multidev) associated with your organization.
categories: [developing]
tags: [domains, organizations]
---

## Shared Load Balancer and CloudFlare's Universal SSL (Free)  
Use CloudFlare's free [Universal SSL](https://blog.cloudflare.com/introducing-universal-ssl/) option with Pantheon's shared load balancer to enable HTTPS across all site URLs that are associated with your organization for free.

### Configuration
1. [Request a Vanity domain](/docs/vanity-domains/#request-the-vanity-domain) for your organization and [consider the effects](/docs/vanity-domains/#effects-and-considerations) before proceeding.
2. Migrate your domain's DNS to CloudFlare and [enable HTTPS for free](/docs/guides/cloudflare-enable-https/).
3. Create a wildcard entry within CloudFlare:
 ![CloudFlare Wildcard Record](/source/docs/assets/images/cloudflare-wildcard-record.png)

## Private Load Balancer on Pantheon with Wildcard or SAN Certificate
[Enable HTTPS ](/docs/enable-https) within your primary site's Live environment on Pantheon to provision a private HTTPS load balancer with a dedicated IP address. This requires a Wildcard or SAN certificate from a recognized provider to enable HTTPS across all site URLs associated with your organization.

### Configuration
Refer to [Enable HTTPS for Sites Using a Custom Vanity Domain](/docs/enable-https-vanity-domain) for details.
## Third-Party Providers
You can use third party providers such as [KeyCDN](https://www.keycdn.com/) or [Fastly](https://fastly.com/) if you do not want to utilize Pantheon's network routing.
## Build Your Own
You can build and configure your own network routing at your own risk.
