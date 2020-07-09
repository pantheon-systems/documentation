---
title: Neustar UltraDNS Domain Configuration
provider: Neustar UltraDNS
dnsprovider: true
description: Learn how to point your Neustar UltraDNS domain to a Pantheon site.
category: [go-live]
tags: [dns]
draft: true
permalink: docs/:basename
editpath: dns-providers/neustar.md/
---
## Before You Begin
Be sure that you have a:

- Registered domain name using Cloudflare to host DNS
- [Paid Pantheon plan](/guides/launch/plans)
- [Domain connected](/guides/launch/domains) to the target Pantheon environment (typically Live)

## Configure DNS Records on Cloudflare

### A Record
1. Click **DNS** in the menu bar.
2. Select **A** from the dropdown menu.
4. Enter **@** in the **Name** field and enter the A record value provided by Pantheon in the **IPv4 Address** field.
5. Set the TTL to **30 minutes**.
6. Disable Cloudflare's CDN by clicking the cloud icon (should be gray, not orange).
6. Click **Add Record**.

### AAAA Records
1. Select **AAAA** from the dropdown menu.
2. Enter **@** in the **Name** field and enter the A record value provided by Pantheon in the **IPv6 Address** field.
3. Set the TTL to **30 minutes**.
4. Disable Cloudflare's CDN by clicking the cloud icon (should be gray, not orange).
5. Click **Add Record**.
6. Repeat steps 1-5 for the second AAAA record value provided by Pantheon. There are two AAAA records for improved uptime and reliability.

### A Record for subdomain
The A record is required if you wish to include `www` within your site's primary domain name.

1. Select **A** from the dropdown menu.
2. Enter **www** in the **Name** field and enter the A record value provided by Pantheon (e.g. `23.185.0.2`) in the **IPv4 Address** field.
3. Set the TTL to **30 minutes**.
4. Disable Cloudflare's CDN by clicking the cloud icon (should be gray, not orange).
5. Click **Add Record**.

### TXT Record
The TXT record is only required if you need to prove ownership of your domain in order to pre-provision certificates to avoid HTTPS service interruption.

1. Select **TXT** from the dropdown menu.
2. Leave the **Name** field blank and enter the record value provided by Pantheon in the **TXT Content** field.
3. Set the TTL to **30 minutes**.
4. Click **Add Record**.

## Cloudflare Docs

* [How do I add A records?](https://support.cloudflare.com/hc/en-us/articles/200169096-How-do-I-add-A-records-)

## Next Steps

* [Launch Essentials: Domains & HTTPS](/guides/launch/domains)
* [Launch Essentials: Redirect to a Primary Domain](/guides/launch/redirects)
