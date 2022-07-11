---
title: Advanced Global CDN
subtitle: Introduction
description: Edge configuration tools that enable advanced site management, enhanced security, and a customizable WAF.
categories: [develop]
tags: [professional-services, logs, cdn, security]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/agcdn
anchorid: agcdn
---

[<dfn id="agcdn">Advanced Global CDN</dfn>](https://pantheon.io/product/advanced-global-cdn?docs) is a Managed Service that takes Pantheon's <abbr title="Content delivery network">CDN</abbr> offering a step forward, for customers that require unique optimizations for digital delivery at scale.

Each AGCDN service configuration is offered as an annual contract subscription. Customers can include multiple sites to the configuration, or conditionally apply specific rules.

It includes a wide range of benefits that let teams individually manage their own sites, drive growth through site iteration, calibrate control over branding, and extend enterprise-grade security.

> **Note**: At the moment, AGCDN only works with custom domains. `.pantheonsite.io` domains are not covered.

## AGCDN Features

### AGCDN 


| OSI Layer 3 & 4 DDoS Protection & Mitigation <span style="color:green">✔</span>                                                                                             | SOC 2 Type 2 Compliance <span style="color:green">✔</span>                                                                                      | IP Allowlisting & Blocklisting  <span style="color:green">✔</span>                                                                                                 |
|-----------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|

**Token Authentication / JWT (JSON Web Token)** <span style="color:green">✔</span>   | **Custom Error & Maintenance Page Rules** <span style="color:green">✔</span>  | **Geolocation-based Actions** <span style="color:green">✔</span> |
**Device Detection and Edge Control** <span style="color:green">✔</span> | **Complete CDN Edge Logs** <span style="color:green">✔</span>                | **Modify and Filter Headers at the Edge** <span style="color:green">✔</span>    |
**Edge Redirects** <span style="color:green">✔</span>                                | **Domain Masking and Reverse Proxy** <span style="color:green">✔</span>      | **Enterprise Blue/Green Deployment Support** <span style="color:green">✔</span>  |
**Rate Limiting (Early Access)**  <span style="color:green">✔</span>                  |                                                                                              


### AGCDN with WAF/IO Features

| ------------- | ------------- |-------------------------|
**Layer 7/Enterprise WAF rules**<span style="color:green">✔</span>      | **Efficient Image Optimization (IO) at the Edge** <span style="color:green">✔</span> |**Rate Limiting for Form & Log-in Pages** <span style="color:green">✔</span> |

| **Advanced Bot Detection  <Popover content="Not all plugins are supported." /> & Mitigation** <span style="color:green">✔</span> |  | |


### OSI Layer 3 & 4 DDoS Protection & Mitigation

Advanced Global CDN provides <abbr title="Distributed Denial of Service">DDoS</abbr> protection and mitigation at the network (Layer 3) and transport (Layer 4) layers of the [OSI model](https://en.wikipedia.org/wiki/OSI_model).

### SOC 2 Type 2 Compliance

SOC 2<Popover title="SOC" content="System and Organization Controls (SOC) is a suite of audit reports defined by the American Institute of Certified Public Accountants (AICPA)." /> Type 2 compliance provides third-party assurance to our customers about the conformance of Pantheon’s information security system with industry standards. Our SOC 2 compliance covers the Security and Availability [Trust Services Criteria](https://www.aicpa.org/interestareas/frc/assuranceadvisoryservices/trustdataintegritytaskforce.html).

### IP Allowlisting & Blocklisting

 Restrict access to properties using Access Control Lists (ACLs) that use IP addresses to either allow or deny access.

- Blocklist - prevent users with specific IPs or in IP ranges from accessing your site.

- Allowlist - only allow users with specific IPs or in IP ranges to access your site, blocking everyone else.

### Token Authentication / JWT (JSON Web Token)

Use the AGCDN Edge to generate JSON Web Tokens<Popover title="JSON Web Tokens" content="A JSON Web Tokens is an Internet standard for creating compact, encrypted JSON-based access tokens that assert some number of claims, such as 'logged in as admin'." /> to help build your custom API.

### Custom Error & Maintenance Page Rules

Response code messages enable you to create custom error pages (e.g., 404 and 503 errors) for a tailored end-user experience.

### Geolocation-based Actions

Sending location info to your application is much faster than fetching it from a third-party API. AGCDN enables actions based on the physical location of your user (eg. blocking or redirecting based on country), and can send location information to your application for performant, custom control.

### Device Detection and Edge Control

[Device detection](https://docs.fastly.com/en/guides/delivering-different-content-to-different-devices) can drive differentiated delivery strategies at the edge of the network, to address issues that impact mobile user experience.

### Complete CDN Edge Logs

See every request to your website, whether or not the content was cached. Server logs can only record requests that couldn't be fulfilled from a CDN's cache. Full CDN edge logs replace these with logs from the edge, to provide a complete picture of your traffic.

### Modify and Filter Headers at the Edge

Change or filter request and response headers before your application starts up to create, add, delete, or update parts of your request and apply custom rules.

### Edge Redirects

Reduce requests to your CMS by moving page redirects to the edge. We can do path, domain, and pattern-based (RegEx) redirects, or redirects based on geolocation information. We can also combine redirect behavior using Headers (Cookies, Responses, etc).

### Domain Masking and Reverse Proxy

- Domain masking: run multiple Pantheon or non-Pantheon applications behind a single domain, using different URL paths.
- Reverse proxy: serve content from another service (eg. S3) seamlessly from your application.

### Enterprise Blue/Green Deployment Support

Support for blue/green deployment<Popover title="Blue/Green Deployment" content="With a blue/green deployment strategy, the new version of your application is released alongside the current version. After you conduct appropriate tests, traffic is switched to the new version." /> CI/CD processes that enable continuous testing and deployment workflows and always ready disaster recovery.

## AGCDN with WAF/IO Features

- Layer 7/Enterprise WAF rules

 Application-layer (OSI Layer 7) protection simplifies event monitoring and mitigation without requiring changes that introduce latency.

- OWASP & WAF rules for Drupal/WordPress

  Support for <abbr title="Open Web Application Security Project">OWASP</abbr> WordPress and Drupal rules helps you monitor and address the most commonly seen application risks for these popular CMSes. Examples include SQL injection and <abbr title="Cross-Site Scripting">XSS</abbr> vulnerabilities.

- Custom/Comprehensive WAF services

  Our Web Application Firewall (**WAF**) inspects each packet in detail to block malicious traffic and is fine-tuned for WordPress and Drupal.

- Advanced bot detection & mitigation (available as an add-on)

  The following third-party plugins are available:
  
  - [Shape Log Analysis](https://devcentral.f5.com/s/articles/How-to-Setup-Shape-Log-Analysis-in-Fastly?page=1)
  - [DataDome](https://docs.datadome.co/docs/module-fastly)
  - [PerimeterX](https://www.fastly.com/products/cloud-security/bot-detection)

  The customer is responsible for purchasing, maintaining payment for, and supporting these plugins.

[See a comparison of the features](https://pantheon.io/product/advanced-global-cdn#pricing-matrix-wrapper) offered by our CDN services.

## Rate Limiting (Early Access)

Rate Limiting, a feature of Advanced Global CDN, lets you place limits on request volume at the network perimeter. Organizations of all sizes can adopt this edge configuration to block malicious traffic. Rate Limiting can be configured to guard critical assets including login, form, and promotional pages by adding another layer of security to your site.

The benefits of Rate Limiting include:

- **Volumetric Attack Mitigation** - Reduce the effectiveness of malicious traffic, including brute-force login and denial-of-service attacks.

- **Policy-based Control** - Rate Limiting supports adjustable configurations for your policy, including requests per second, and detection window.

- **Custom Responses** - Select from actions that allow you to block requests or log them, and configure custom responses for your policy.

<Alert title="Note"  type="info" >

This feature is currently in Early Access; for more information, reach out to your account manager.

</Alert>

## Get AGCDN

[Contact the Professional Services team](https://pantheon.io/contact?docs) to determine the best configuration for you.


## More Resources

- [Pantheon Global CDN](/global-cdn) - Learn about the Global CDN that comes with all Pantheon sites.

- [Professional Services](/guides/professional-services) - Learn all the great services our expert team can provide.

- [Fastly on Pantheon](/guides/fastly-pantheon)