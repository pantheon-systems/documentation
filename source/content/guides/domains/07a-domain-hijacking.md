---
title: Domains on Pantheon
subtitle: Prevent Domain Hijacking
description: Learn how to prevent domain hijacking.
tags: [collaborate, dns, agencies]
contributors: [wordsmither]
layout: guide
showtoc: true
permalink: docs/guides/domains/domain-hijacking
anchorid: domains-hijacking
contenttype: [guide]
categories: [domains]
newcms: [--]
audience: [development, sysadmin]
product: [--]
integration: [--]
---

Domain Name Server (DNS) hijacking is a type of DNS attack in which bad actors search for available subdomains online, and then redirect them to malicious sites. 


## How to Avoid DNS Hijacking

### Clear "A" Records Before Removing Unused Subdomains

Before removing unused subdomains, be sure to remove/delete the corresponding A records.

### Don't Use Wildcard DNS Configuration

Using wildcard DNS settings not considered best practice on a cloud-hosted platform such as Pantheon.

### Secure the DNS Configuration

Take advantage of the security features offered by your DNS Manager to ensure that bad actors can't access your subdomains.

### Practice Good DNS Hygiene

For example, regularly audit your DNS records and periodically make sure that you're still in control of everything your subdomains point to.

## What To Do If You've Been Hijacked.

Email abuse@pantheon.io, or open a chat or ticket, to report a subdomain takeover attack.

