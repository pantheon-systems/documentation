---
title: DreamHost Domain Configuration
provider: DreamHost
description: Learn how to point your DreamHost domain to a Pantheon site.
tags: [domains]
permalink: docs/:basename
editpath: dns-providers/dreamhost.md/
contenttype: [doc]
innav: [true]
categories: [domains]
cms: [--]
audience: [--]
product: [--]
integration: [--]
---
## Before You Begin
Be sure that you have a:


- Registered domain name using DreamHost to host DNS
- [Paid Pantheon plan](/guides/launch/plans)
- [Domain connected](/guides/launch/domains) to the target Pantheon environment (typically Live)

## Configure DNS Records on DreamHost

### A Record
1. Navigate to **Panel** > **Domains** > **Manage Domains** and click **DNS**.
2. Leave the **Name** field blank, select A from the Type dropdown menu, and enter the A record value provided by Pantheon in the **Value** field.
3. Click **Add record now!**.

### AAAA Records
1. Navigate to **Panel** > **Domains** > **Manage Domains** and click **Add IP**.
2. Click the **Add IPv6 Now** button and enter the AAAA record value provided by Pantheon.
3. Repeat steps 1-2 for the second AAAA record value provided by Pantheon. There are two AAAA records for improved uptime and reliability.

### Subdomains
Create one A record and 2 AAAA records for the given subdomain (e.g., `www.example.com`):

1. Navigate to **Panel** > **Domains** > **Manage Domains** and click **DNS**.
2. Enter **www** in the **Name** field and, select A from the Type dropdown menu, and enter the A record value provided by Pantheon (e.g. `23.185.0.2`) in the **Value** field.
3. Click **Add record now!**.
5. Repeat steps 1-3 for the two AAAA records.

## DreamHost Docs

* [DNS Records](https://help.dreamhost.com/hc/en-us/articles/214694378-What-DreamHost-DNS-records-do-I-point-my-site-to-)
* [How do I add custom DNS records?](https://help.dreamhost.com/hc/en-us/articles/215414867-How-do-I-add-custom-DNS-records-)

## Next Steps

* [Launch Essentials: Domains & HTTPS](/guides/launch/domains)

* [Launch Essentials: Redirect to a Primary Domain](/guides/launch/redirects)
