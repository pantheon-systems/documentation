---
title: Platform Considerations
subtitle: Platform Security
description: Learn more about security support on the Pantheon platform.
contenttype: [guide]
categories: [overview]
newcms: [--]
audience: [development]
product: [--]
integration: [--]
tags: [files, libraries, security, webops]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/platform-considerations/platform-security
anchorid: platform-security
---

This section provides information on supported security for the Pantheon platform. Refer to the [Secure Development on Pantheon](/guides/secure-development) guide for comprehensive security information.

<Partial file="auth.md" />

## IP-Address Based Security Schemes

IP-based security is not recommended on Pantheon (or any cloud platform) because the actual IP address where code executes from can change as application containers are migrated throughout the infrastructure.

Refer to [Dynamic Outgoing IP Addresses](/outgoing-ips) for more information.

[Advanced Global CDN](/guides/professional-services/advanced-global-cdn#ip-allowlisting--blocklisting) can provide IP-based allowlist and blocklist features, as well as IP-based routing if you require IP address-level access control. Please contact your Customer Success Manager (CSM) or [contact us](https://pantheon.io/contact-us?docs) for more information.

## UDP

Pantheon's platform security controls include blocking most [UDP traffic](https://en.wikipedia.org/wiki/User_Datagram_Protocol) originating from website containers to prevent platform abuse.

## More Resources

- [Bots and Indexing on Pantheon](/bots-and-indexing)

- [Drupal Security Patches](/drupal-security-patches)