---
title: Methods of Providing HTTPS Across Many Sites
description: Explore different solutions for enabling HTTPS on all of your sites.
categories: [developing]
tags: [domains, organizations]
---

This article explores different solutions for enabling HTTPS on all of your sites.

The diagram below shows:  

1. Connecting directly to sites on *.pantheonsite.io under HTTPS (when using platform domains directly). These connections then go on to the HTTP caching layer and get routed into the app container matrix, if necessary.
2. Connecting directly to the HTTP caching edge. This happens if you use a platform domain under HTTP or point your DNS to Pantheon.
3. Terminating a specific certificate with a specific static IP. This is what Pro sites on the platform do currently, and we can configure Enterprise/EDU+ users to terminate a SAN or Wildcard certificate so that the single static IP can terminate HTTPS for a large number of sites, regardless of service level.
4. Using a CDN in front of Pantheon. This is a great technique that a lot of customers use. Modern CDNs also allow you to terminate HTTPS with the CDN, and then back-end to Pantheon securely using the *.pantheonsite.io domain.

![HTTPS diagram](/source/docs/assets/images/https_diagram.png)

## CloudFlare's Universal SSL (Free)
Use CloudFlare's free [Universal SSL](https://blog.cloudflare.com/introducing-universal-ssl/) option with Pantheon's shared load balancer to enable HTTPS across all site URLs that are associated with your organization for free.

1. Migrate your domain's DNS to CloudFlare and [enable HTTPS for free](/docs/guides/cloudflare-enable-https/).
2. Create a wildcard entry within CloudFlare:
 ![CloudFlare Wildcard Record](/source/docs/assets/images/cloudflare-wildcard-record.png)

## Provision a Private Load Balancer on Pantheon with Wildcard or SAN Certificate
[Enable HTTPS ](/docs/enable-https) within your primary site's Live environment on Pantheon to provision a private HTTPS load balancer with a dedicated IP address. This requires a Wildcard or SAN certificate from a recognized provider to enable HTTPS across all site URLs associated with your organization.

## Terminating HTTPS with a Content Delivery Network (CDN)
If you do not want to utilize Pantheon's network routing, a CDN can back-end to our secure edge, and offer different options:

- [CloudFlare](https://www.cloudflare.com/) gives you HTTPS for free (including certificates), though you must use their certs, which may include references to other domains.
- [KeyCDN](https://www.keycdn.com/) is a more privacy oriented CDN that has a relatively economical model for you to bring your own certificates (including Wildcard or SAN certs).
- CloudFlare and [Fastly](https://fastly.com/) will allow you to bring your own certificates, but it's a premium feature.

## Build Your Own
You can build and configure your own network routing at your own risk. If you have an existing investment in layer-7 capable routing equipment (e.g. BigIP or F5 hardware load balancers), you can manage your own HTTPS termination, and back-end to Pantheon's secure edge. Likewise, you are free to terminate HTTPS with your own cloud instance and back-end to Pantheon.

Example:

<script src="https://gist.github.com/caktux/00a2161b5d849335e644.js"></script>
