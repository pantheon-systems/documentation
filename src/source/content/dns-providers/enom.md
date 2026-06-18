---
title: Enom Domain Configuration
provider: Enom
description: Learn how to point your Enom domain to a Pantheon site.
tags: [domains]
permalink: docs/:basename
editpath: dns-providers/enom.md/
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

- Registered domain name using Enom to host DNS
- [Paid Pantheon plan](/guides/launch/plans)
- [Domain connected](/guides/launch/domains) to the target Pantheon environment (typically Live)

## Configure DNS Records on Enom

### A Record
1. Navigate to **Domains** > **My Domains**.
2. Click on the domain you want to point to Pantheon.
3. Select **Host Records**.
4. Click **New Row**.
5. Enter **@** in the **Host Name** field, select **A** for the **Record Type** then enter the A record value provided by Pantheon in the **Address** field.

### AAAA Records
1. Click **New Row**.
2. Enter **@** in the **Host Name** field, select **AAAA** for the **Record Type** then enter the first AAAA record value provided by Pantheon in the **Address** field.
3. Repeat steps 1-2 for the second AAAA record value provided by Pantheon. There are two AAAA records for improved uptime and reliability.

### Subdomains
Create one A record and 2 AAAA records for the given subdomain (e.g., `www.example.com`):

1. Click **New Row**.
2. Enter **www** in the **Host Name** field, select **A** for the **Record Type** then enter the A record value provided by Pantheon (e.g. `23.185.0.2`) in the **Address** field.
3. Click **Save**.
5. Repeat steps 1-3 for the two AAAA records.


## Enom Docs

[Change Host Records - Forward, Redirect or Point Your Domain/Sub-Domain](https://help.enom.com/hc/en-us/articles/115000474012-Managing-DNS-host-records)

## Next Steps

* [Launch Essentials: Domains & HTTPS](/guides/launch/domains)

* [Launch Essentials: Redirect to a Primary Domain](/guides/launch/redirects)
