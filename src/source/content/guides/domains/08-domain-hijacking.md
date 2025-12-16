---
title: Domains on Pantheon
subtitle: Prevent Domain Hijacking
description: Learn how to prevent domain hijacking.
tags: [collaborate, dns, agencies]
contributors: [wordsmither]
showtoc: true
permalink: docs/guides/domains/domain-hijacking
contenttype: [guide]
innav: [false]
categories: [domains]
cms: [--]
audience: [development, sysadmin]
product: [--]
integration: [--]
---

This section provides information on how to prevent domain hijacking.

Domain Name Server (DNS) hijacking is a type of DNS attack in which bad actors search for subdomains that are unused but pointed to an existing service. Attackers will then sign up for those services and use those subdomains to host malicious sites.

## How to Avoid DNS Hijacking

Pantheon requires you to validate ownership of your custom domains at the time of adding  domains to Pantheon sites. For the specific steps on adding custom domains, see [Add a Custom Domain](/guides/domains/custom-domains#add-a-custom-domain). Validating ownership (which is now enforced) would ensure that your custom domains will not be taken over by bad actors. 

### Clear DNS Records Before Removing Unused Subdomains

When removing unused sites, delete the corresponding A or CNAME records with your DNS provider.

### Don't Use Wildcard DNS Configuration

Using wildcard DNS settings is not considered best practice on a cloud-hosted platform such as Pantheon.

### Secure the DNS Configuration

Take advantage of the security features offered by your DNS Manager to ensure that bad actors can't access your subdomains.

### Practice Good DNS Hygiene

For example, regularly audit your DNS records and periodically make sure that you're still in control of everything your subdomains point to.

## What To Do If You've Been Hijacked

Open a chat or [ticket](/guides/support/support-ticket/) to report a subdomain takeover attack. If you do not have access to Pantheon support, you may email abuse@pantheon.io

## More Resources

- [Enforce HTTPS + HSTS](/pantheon-yml#enforce-https--hsts)
- [Secure Development on Pantheon](/guides/secure-development)
- [Pantheon Security](/guides/security)
