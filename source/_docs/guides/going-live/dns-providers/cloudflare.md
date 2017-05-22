---
title: Cloudflare Domain Configuration
provider: Cloudflare
description: Learn how to point your Cloudflare domain to a Pantheon site.
tags: [providers]
permalink: docs/:basename/
editpath: going-live/domains/cloudflare.md/
---
## Before You Begin
Be sure that you have a:

- Registered domain name using Cloudflare to host DNS
- [Paid Pantheon plan](/docs/guides/going-live/plans/)
- [Domain connected](/docs/guides/going-live/domains/) to the target Pantheon environment (typically Live)

## Locate Pantheon's DNS Values
Identify DNS values to point your domain to Pantheon:

1. Navigate to the Site Dashboard and select the target environment (typically <span class="glyphicons glyphicons-cardio"></span> Live) then click **<span class="glyphicons glyphicons-home"></span> Domains & HTTPS**.
2. Click the **DNS Recommendations** button next to your domain.

Keep this page open and login to your <a href="https://www.cloudflare.com/a/login/" target="blank">Cloudflare account <span class="glyphicons glyphicons-new-window-alt"></span></a> in a new tab before you continue.

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

### CNAME Record
The CNAME record is only required if you wish to include `www` within your site's primary domain name.

1. Select **CNAME** from the dropdown menu.
2. Enter **www** in the **Name** field and enter the CNAME record value provided by Pantheon (e.g. `live-example.pantheonsite.io`) in the **Domain name** field.
3. Set the TTL to **30 minutes**.
4. Disable Cloudflare's CDN by clicking the cloud icon (should be gray, not orange).
5. Click **Add Record**.

## Cloudflare Docs

* <a href="https://support.cloudflare.com/hc/en-us/articles/200169046-How-do-I-add-a-CNAME-record-" target="blank">How do I add a CNAME record? <span class="glyphicons glyphicons-new-window-alt"></span></a>
* <a href="https://support.cloudflare.com/hc/en-us/articles/200169096-How-do-I-add-A-records-" target="blank">How do I add A records? <span class="glyphicons glyphicons-new-window-alt"></span></a>

## Next Steps

[Going Live Guide: Enable HTTPS](/docs/guides/going-live/https/)
