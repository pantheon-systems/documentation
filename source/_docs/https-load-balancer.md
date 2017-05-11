---
title: Methods of Providing HTTPS Across Many Sites
description: Explore different solutions for enabling HTTPS on all of your sites.
categories: [developing]
tags: [domains, organizations]
---

This article explores different solutions for enabling HTTPS on all of your sites.

The diagram below shows:  

1. Connecting directly to sites on `*.pantheonsite.io` under HTTPS (when using platform domains directly). These connections then go on to the HTTP caching layer and get routed into the application container matrix, if necessary.
2. Connecting directly to the HTTP caching edge. This happens if you use a platform domain under HTTP or point your DNS to Pantheon.
3. Terminating a specific certificate with a specific static IP.
4. Using a CDN in front of Pantheon. This is a great technique that a lot of customers use. Modern CDNs also allow you to terminate HTTPS with the CDN, and then back-end to Pantheon securely using the `*.pantheonsite.io` domain.

![HTTPS diagram](/source/docs/assets/images/HTTPS_diagram.png)

## Provision a Private Load Balancer on Pantheon with Wildcard or SAN Certificate
Pantheon can provision a private HTTPS load balancer with a static IP address for Enterprise/EDU+ customers who would like to use a Wildcard or SAN Certificate to enable HTTPS across a large number of sites, regardless of their individual service level.

<div class="alert alert-danger">
<h4>Warning</h4>
This method introduces a single point of failure. We recommend enabling HTTPS within each individual site's Live environment. You may load the same Wildcard Certificate into separate Live environments.
</div>

## Terminating HTTPS with a Content Delivery Network (CDN)
If you do not want to utilize Pantheon's network routing, a CDN can back-end to our secure edge as an alternative:

- [CloudFlare](https://www.cloudflare.com/) gives you HTTPS for free (including certificates), though you must use their certs, which may include references to other domains. For details, see [Adding HTTPS For Free With CloudFlare](/docs/guides/cloudflare-enable-https/).
- [KeyCDN](https://www.keycdn.com/) is a more privacy oriented CDN that has a relatively economical model for you to bring your own certificates (including Wildcard or SAN certs).
- CloudFlare and [Fastly](https://fastly.com/) will allow you to bring your own certificates, but it's a premium feature.

## Build Your Own
You can build and configure your own network routing at your own risk. If you have an existing investment in layer-7 capable routing equipment (e.g. BigIP or F5 hardware load balancers), you can manage your own HTTPS termination, and back-end to Pantheon's secure edge. Likewise, you are free to terminate HTTPS with your own cloud instance and back-end to Pantheon.

Example:

<script src="https://gist.github.com/caktux/00a2161b5d849335e644.js"></script>
