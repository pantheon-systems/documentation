---
title: Advanced Global CDN
subtitle: AGCDN Features
description: Learn more about AGCDN features.
tags: [professional-services, logs, cdn, security]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/agcdn/agcdn-features
anchorid: agcdn-features
contenttype: [guide]
categories: [optimize]
newcms: [--]
audience: [development]
product: [--]
integration: [--]
---

This section provides detailed information on AGCDN features.

## OSI Layer 3 and 4 DDoS Protection & Mitigation

Advanced Global CDN provides DDoS protection and mitigation at the network (Layer 3) and transport (Layer 4) layers of the [OSI model](https://en.wikipedia.org/wiki/OSI_model).

## SOC 2 Type 2 Compliance

SOC 2<Popover title="SOC" content="System and Organization Controls (SOC) is a suite of audit reports defined by the American Institute of Certified Public Accountants (AICPA)." /> Type 2 compliance provides third-party assurance to our customers about the conformance of Pantheon’s information security system with industry standards. Our SOC 2 compliance covers the Security and Availability [Trust Services Criteria](https://www.aicpa.org/interestareas/frc/assuranceadvisoryservices/trustdataintegritytaskforce.html).

## IP Allowlisting and Blocklisting

Restrict access to properties using Access Control Lists (ACLs) that use IP addresses to either allow or deny access.

- Blocklist - prevent users with specific IPs or in IP ranges from accessing your site.

- Allowlist - only allow users with specific IPs or in IP ranges to access your site, blocking everyone else.

## Tor Traffic Blocking

Tor encrypts and routes user traffic through at least three Tor nodes to mask a user's starting IP address. AGCDN can block malicious Tor traffic.

## Custom Rules and Redirects

AGCDN allows you to use custom site rules, including:

- Bespoke cookie-handling

- URL rate-limiting

- Header modifications and filters

- URL and query string sorting and filtering 

## Token Authentication with JSON Web Token

Use AGCDN Edge to generate JSON Web Tokens (JWT)<Popover title="JSON Web Tokens" content="A JSON Web Tokens is an Internet standard for creating compact, encrypted JSON-based access tokens that assert some number of claims, such as 'logged in as admin'." /> to help build your custom API.

## Custom Error and Maintenance Page Rules

Response code messages enable you to create custom error pages (for example, 404 and 503 errors) for a tailored end-user experience.

## Geolocation-based Actions

Sending location information to your application is much faster than fetching it from a third-party API. AGCDN enables actions based on the physical location of your user (for example, blocking or redirecting based on country), and can send location information to your application for performant, custom control.

## Device Detection and Edge Control

[Device detection](https://docs.fastly.com/en/guides/delivering-different-content-to-different-devices) can drive differentiated delivery strategies at the edge of the network to address issues that impact mobile user experience.

## Complete CDN Edge Logs

Edge Logs show every request to your website and records cached and uncached content. Server logs can only record requests that couldn't be fulfilled from a CDN's cache. Full CDN Edge Logs replace these with logs to provide a complete picture of your traffic.

You must have your own server to offload complete CDN Edge logs. Review [recommended third-party services](https://docs.fastly.com/en/guides/integrations#_logging-endpoints) that support Fastly logging to find the best solution for your setup. 

## Edge Redirects

Reduce requests to your CMS by moving page redirects to the edge. AGCDN can combine redirect behavior using Headers (Cookies, Responses, etc.). AGCDN provides redirects for:

- Path

- Domain

- Pattern-based (RegEx) 

- Redirects based on geolocation information

## Domain Masking and Reverse Proxy

Domain masking runs multiple Pantheon or non-Pantheon applications behind a single domain, using different URL paths. Reverse proxy serves content from another service (for example, Amazon S3) seamlessly from your application.

## Enterprise Blue and Green Deployment Support

Support for blue/green deployment<Popover title="Blue/Green Deployment" content="With a blue/green deployment strategy, the new version of your application is released alongside the current version. After you conduct appropriate tests, traffic is switched to the new version." /> CI/CD processes that enable continuous testing and deployment workflows and disaster recovery.

## More Resources

- [Professional Services](/guides/professional-services) - Learn all the great services our expert team can provide.

- [Fastly on Pantheon](/guides/fastly-pantheon)

- [How to Fight Cyberattacks Using Pantheon’s Advanced Global CDN](https://pantheon.io/blog/fight-cyberattacks-advanced-global-cdn)



