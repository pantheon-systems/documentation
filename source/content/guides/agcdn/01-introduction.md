---
title: Advanced Global CDN
subtitle: Introduction
description: AGCDN enables Edge configuration tools for advanced site management, enhanced security, and a customizable WAF.
categories: [develop]
tags: [professional-services, logs, cdn, security]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/agcdn
anchorid: agcdn
---

[<dfn id="agcdn">Advanced Global CDN</dfn>](https://pantheon.io/product/advanced-global-cdn?docs) is a Managed Service that takes Pantheon's <abbr title="Content delivery network">CDN</abbr> offering a step forward. AGCDN is designed for customers that require unique optimizations for digital delivery at scale.

Each AGCDN service configuration is offered as an annual contract subscription. Customers can add multiple sites to their AGCDN configuration, or conditionally apply specific rules.

AGCDN provides provides teams with with a way to:

- Block Malicious traffic 

- Create Geofencing / IP restrictions

- Rate limits with a website firewall (only with AGCDN with WAF / IO)

- Define valid user agent strings

- Extend enterprise-grade security

- Query string sorting and filtering

> **Note**: At the moment, AGCDN only works with custom domains. `.pantheonsite.io` domains are not covered.

## What Does AGCDN Include?

### AGCDN

AGCDN provides many features:

| Feature        | AGCDN |
| ------------- | -------------------------------------- |
| [OSI Layer 3 and 4 DDoS Protection & Mitigation](/guides/agcdn/agcdn-features#osi-layer-3-and-4-ddos-protection-&-mitigation) | <span style="color:green">✔</span> |
| [SOC 2 Type 2 Compliance](/guides/agcdn/agcdn-features#soc-2-type-2-compliance)        | <span style="color:green">✔</span> |
| [IP Allowlisting and Blocklisting](/guides/agcdn/agcdn-features#ip-allowlisting-and-blocklisting)   | <span style="color:green">✔</span> |
| [Token Authentication with JSON Web Token](/guides/agcdn/agcdn-features#token-authentication-with-json-web-token) | <span style="color:green">✔</span> |
| [Custom Error and Maintenance Page Rules](/guides/agcdn/agcdn-features#custom-error-and-maintenance-page-rules)| <span style="color:green">✔</span> |
| [Geolocation-based Actions](/guides/agcdn/agcdn-features#geolocation-based-actions) | <span style="color:green">✔</span>|
| [Device Detection and Edge Control](/guides/agcdn/agcdn-features#device-detection-and-edge-control) | <span style="color:green">✔</span> |
| [Complete CDN Edge Logs](/guides/agcdn/agcdn-features#complete-cdn-edge-logs) | <span style="color:green">✔</span>|
| [Modify and Filter Headers at the Edge](/guides/agcdn/agcdn-features#custom-rules-and-redirects) |<span style="color:green">✔</span> |
| [Edge Redirects](/guides/agcdn/agcdn-features#edge-redirects) | <span style="color:green">✔</span> |
| [Domain Masking and Reverse Proxy](/guides/agcdn/agcdn-features#domain-masking-and-reverse-proxy)| <span style="color:green">✔</span> |
| [Enterprise Blue and Green Deployment Support](/guides/agcdn/agcdn-features#enterprise-blue-and-green-deployment-support)| <span style="color:green">✔</span> |
|[Rate Limiting(early access)](/guides/agcdn/agcdn-features#rate-limiting)| <span style="color:green">✔</span>  | 
|[Custom Rules and Redirects](/guides/agcdn/agcdn-features#custom-rules-and-redirects) |  <span style="color:green">✔</span> | 
|[Tor Traffic Blocking](/guides/agcdn/tor-traffic-blocking)| <span style="color:green">✔</span> |


### AGCDN with WAF/IO Features

AGCDN with WAF/IO includes everything in the table above with the following additions:

| Feature         | AGCDN with WAF and IO |
| ------------- | ------------------------- |
| [Layer 7 and Enterprise WAF rules](/guides/agcdn/agcdn-features#layer-7-and-enterprise-waf-rules)| <span style="color:green">✔</span> |
| [Efficient Image Optimization at the Edge](/guides/agcdn/agcdn-features#efficient-image-optimization-at-the-edge)  |  <span style="color:green">✔</span> |
| [Rate Limiting for Form and Log-in Pages](/guides/agcdn/agcdn-features#rate-limiting)   | <span style="color:green">✔</span> |
| [Advanced Bot Detection and Mitigation](/guides/agcdn/agcdn-features#advanced-bot-detection-and-mitigation-available-as-an-add-on) <Popover content="Not all plugins are supported." />        | <span style="color:green">✔</span> | 


## Is AGCDN Right For Me?

AGCDN is a great option for many users. You can review the [Judicial Council of California AGCDN case study](https://pantheon.io/blog/fight-cyberattacks-advanced-global-cdn) for a real-life example of an AGCDN implementation. 

## Get AGCDN

[Contact the Professional Services team](https://pantheon.io/contact?docs) to determine the best configuration for you.

## More Resources

- [Pantheon Global CDN](/guides/global-cdn) - Learn about the Global CDN that comes with all Pantheon sites.

- [Professional Services](/guides/professional-services) - Learn all the great services our expert team can provide.

- [How to Fight Cyberattacks Using Pantheon’s Advanced Global CDN](https://pantheon.io/blog/fight-cyberattacks-advanced-global-cdn)

- [Fastly on Pantheon](/guides/fastly-pantheon)