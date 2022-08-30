---
title: Platform Considerations
subtitle: Platform Security
description: Learn more about Pantheon platform security support.
categories: [platform]
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

IP-based security is not recommended on Pantheon - or any cloud platform because the actual IP address where code executes from can change as application containers are migrated throughout the infrastructure.

For more information, see [Dynamic Outgoing IP Addresses](/outgoing-ips).

If you require IP address-level access control, [Advanced Global CDN](/guides/professional-services/advanced-global-cdn#ip-allowlisting--blocklisting) can provide IP-based safelist/blocklist features, as well as IP-based routing. Please contact your Customer Success Manager (CSM) or [contact us](https://pantheon.io/contact-us?docs) for more information.

## UDP

Pantheon's platform security controls include blocking most [UDP traffic](https://en.wikipedia.org/wiki/User_Datagram_Protocol) originating from website containers, in order to prevent platform abuse.

## More Resources

- [Bots and Indexing on Pantheon](/bots-and-indexing)

- [Drupal Security Patches](/drupal-security-patches)