---
title: Advanced Global CDN
subtitle: AGCDN with WAF / IO Features
description: Learn more about AGCDN with WAF / IO features.
categories: [develop]
tags: [professional-services, logs, cdn, security]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/agcdn/agcdn-wafio
anchorid: agcdn-wafio
---

This section provides detailed information all AGCDN with WAF and IO features.

## Layer 7 and Enterprise WAF Rules

Application-layer (OSI Layer 7) protection simplifies event monitoring and mitigation without requiring changes that introduce latency.

Our Web Application Firewall (**WAF**) inspects each packet in detail to block malicious traffic and is fine-tuned for WordPress and Drupal.

Support for <abbr title="Open Web Application Security Project">OWASP</abbr> WordPress and Drupal rules help you monitor and address the most common application risks. Examples include SQL injection and <abbr title="Cross-Site Scripting">XSS</abbr> vulnerabilities.

## Efficient Image Optimization at the Edge

Image Optimization (IO) renders images using high-density points of presence (POPs) that cache content for longer times and serve millions of image variations. Serving from the edge in this way offloads work from your servers and improves your site's performance. IO supports several formats, including animated GIFs.

## Advanced Bot Detection and Mitigation 

The following third-party plugins are available:
  
- [Shape Log Analysis](https://devcentral.f5.com/s/articles/How-to-Setup-Shape-Log-Analysis-in-Fastly?page=1)

- [DataDome](https://docs.datadome.co/docs/module-fastly)

- [PerimeterX](https://www.fastly.com/products/cloud-security/bot-detection)

The customer is responsible for purchasing, maintaining payment for, and supporting these plugins.

[See a comparison of the features](https://pantheon.io/product/advanced-global-cdn#pricing-matrix-wrapper) offered by our CDN services.

### Rate Limiting 

Rate Limiting is in early access. This is feature of Advanced Global CDN that lets you place limits on request volume at the network perimeter. Organizations of all sizes can adopt this edge configuration to block malicious traffic. Rate Limiting can be configured to guard critical assets including login, form, and promotional pages by adding another layer of security to your site.

The benefits of Rate Limiting include:

- **Volumetric Attack Mitigation** - Reduce the effectiveness of malicious traffic, including brute-force login and denial-of-service attacks.

- **Policy-based Control** - Adjust configurations for your policy, including requests per second, and detection window.

- **Custom Responses** - Select from actions that allow you to block requests or log them, and configure custom responses for your policy.

<Alert title="Note"  type="info" >

This feature is currently in Early Access. Reach out to your account manager for more information.

</Alert>

## More Resources

- [Fastly on Pantheon](/guides/fastly-pantheon)

- [Pantheon Global CDN](/global-cdn) - Learn about the Global CDN that comes with all Pantheon sites.
