---
title: Advanced Global CDN
subtitle: Introduction
description: AGCDN enables Edge configuration tools for advanced site management,  enhanced security, and much more.
tags: [professional-services, logs, cdn, security]
contributors: [whitneymeredith]
showtoc: true
permalink: docs/guides/agcdn
contenttype: [guide]
innav: [true]
categories: [optimize]
cms: [--]
audience: [development]
product: [--]
integration: [--]
---

Advanced Global CDN is a Managed Service that takes Pantheon's content delivery network (CDN) offering a step forward. AGCDN is designed for customers that require unique optimizations for digital delivery at scale.

Each AGCDN service configuration is offered as an annual contract subscription. Customers can add multiple sites to their AGCDN configuration, or conditionally apply specific rules.

<Alert title="Note" type="info" >

AGCDN only works with custom domains. Platform domains (e.g., `live-site-name.pantheonsite.io`) are not covered.

</Alert>

## AGCDN Packages 

### IO Starter
_Rich Content from Globally Distributed Points of Presence_

Improve Lighthouse scores and core web vitals with improved page load times. Pantheon’s IO Starter package brings modern image optimization and auto WebP support to render pages quickly at the edge, taking load off your application and adding resilience to your site.

### Security Starter
_Improve Security & Maintain Compliance_

As attack surfaces expand, businesses require additional security beyond the CMS to protect their web sites. Pantheon’s Security Starter brings industry standard rules including OWASP and Drupal/WordPress protections. Secure your sites with a web application firewall (WAF) - tuned for each CMS, geolocation and IP blocking.

### Security Starter with Rate Limiting
Security Starter is also available with a rate-limiting upgrade. Rate-limiting provides a layer of defense against DDoS attacks and high-traffic events for websites by throttling requests to be under specific thresholds, at the [Fastly Edge Layer](https://www.fastly.com/).

### Advanced Global CDN
_Unique Optimizations for Digital Delivery at Scale_

Advanced Global CDN extends our Global CDN offering—both powered by Fastly. Pantheon users can easily manage edge customizations for groups of websites, unlock personalization and targeted messaging at scale. With Advanced Global CDN, users can regain control over messaging and intellectual property with location-based blocking, redirection, and IP blocklisting.

### Advanced Global CDN with WAF/IO
_Complete Solution_

Unlock the power of the edge to enable secure control over your full stack. Advanced Global CDN with WAF/IO brings a full suite of edge security capabilities that ensures site integrity with a CMS-tuned web application firewall (WAF), rate limiting to guard critical assets, and engage visitors in rich content with image optimization (IO). The WAF inspects each un-cached request in detail and rapidly applies rules to keep your online presence stable.

## AGCDN Package Comparison 

| Feature        | IO Starter | Security Starter | Security Starter with Rate Limiting | Advanced Global CDN | Advanced Global CDN with WAF/IO |
| --- | ---| --- | ---| ---| --- |
| Image Optimization (IO)|<span style="color:green">✔</span>|❌|❌|❌|<span style="color:green">✔</span>|
| IP Restrictions|❌|<span style="color:green">✔</span>|<span style="color:green">✔</span>|<span style="color:green">✔</span>|<span style="color:green">✔</span>|
|Enterprise WAF rules for WordPress and Drupal|❌|<span style="color:green">✔</span>|<span style="color:green">✔</span>|❌|<span style="color:green">✔</span>|
|Rate Limiting|❌|❌|<span style="color:green">✔</span>|❌|<span style="color:green">✔</span>|
|Custom Error & Maintenance Page Rules|❌|❌|❌|<span style="color:green">✔</span>|<span style="color:green">✔</span>|
|Geolocation / Geofencing Control|❌|<span style="color:green">✔</span>|<span style="color:green">✔</span>|<span style="color:green">✔</span>|<span style="color:green">✔</span>|
|Device Detection|❌|❌|❌|<span style="color:green">✔</span>|<span style="color:green">✔</span>|
|Domain Masking|❌|❌|❌|<span style="color:green">✔</span>|<span style="color:green">✔</span>|
|Redirects|❌|❌|❌|<span style="color:green">✔</span>|<span style="color:green">✔</span>|
|CDN Log Streaming|❌|❌|❌|<span style="color:green">✔</span>|<span style="color:green">✔</span>|
|Header Modification|❌|❌|❌|<span style="color:green">✔</span>|<span style="color:green">✔</span>|

To learn more about each of these features, see [Features & Use Cases](/guides/agcdn/features).
## Is AGCDN Right For Me?

AGCDN is a great option for many users. AGCDN is for you if you're looking for advanced site management, enhanced security, and custom WAF. You can review the [AGCDN case study](https://pantheon.io/blog/fight-cyberattacks-advanced-global-cdn) for a real-life example of an AGCDN implementation.

## Get AGCDN

[Contact the Professional Services team](https://pantheon.io/contact?docs) to determine the best configuration for you.

## More Resources

- [Pantheon Global CDN](/guides/global-cdn) - Learn about the Global CDN that comes with all Pantheon sites.

- [Professional Services](/guides/professional-services) - Learn all the great services our expert team can provide.

- [How to Fight Cyberattacks Using Pantheon’s Advanced Global CDN](https://pantheon.io/blog/fight-cyberattacks-advanced-global-cdn)

- [Fastly on Pantheon](/guides/fastly-pantheon)
