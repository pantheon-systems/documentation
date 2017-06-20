---
title: Gandi Domain Configuration
provider: Gandi
dnsprovider: true
description: Learn how to point your Gandi domain to a Pantheon site.
tags: [providers]
permalink: docs/:basename/
editpath: dns-providers/gandi.md/
---
## Before You Begin
Be sure that you have a:

- Registered domain name using Gandi to host DNS
- [Paid Pantheon plan](/docs/guides/going-live/plans/)
- [Domain connected](/docs/guides/going-live/domains/) to the target Pantheon environment (typically Live)

## Locate Pantheon's DNS Values
Identify DNS values to point your domain to Pantheon:

1. Navigate to the Site Dashboard and select the target environment (typically <span class="glyphicons glyphicons-cardio"></span> Live) then click **<span class="glyphicons glyphicons-home"></span> Domains & HTTPS**.
2. Click the **DNS Recommendations** button next to your domain.

Keep this page open and login to your <a href="https://www.gandi.net/login" target="blank">Gandi account <span class="glyphicons glyphicons-new-window-alt"></span></a> in a new tab before you continue.

## Configure DNS Records on Gandi
### A Record
1. Navigate to the domain's management page and click **Edit the zone**.
2. Click the **Add** button and select **A** from the type dropdown menu.
3. Set the TTL to **1/2 Hour**.
4. Enter **@** in the **Name** field and enter the A record value provided by Pantheon in the **Value** field.
6. Click **Submit**.

### AAAA Records
1. Click the **Add** button and select **AAAA** from the type dropdown menu.
2. Set the TTL to **1/2 Hour**.
3. Enter **@** in the **Name** field and enter the first AAAA record value provided by Pantheon in the **Value** field.
4. Click **Submit**.
5. Repeat steps 1-5 for the second AAAA record value provided by Pantheon. There are two AAAA records for improved uptime and reliability.

### CNAME Record
The CNAME record is only required if you wish to include `www` within your site's primary domain name.

1. Click the **Add** button and select **CNAME** from the type dropdown menu.
2. Set the TTL to **1/2 Hour**.
3. Enter **www** in the **Name** field and enter the CNAME record value provided by Pantheon (e.g. `live-example.pantheonsite.io`) in the **Value** field.
4. Click **Submit**.
5. Click the **Activate this version** button.

### TXT Record
The TXT record is only required if you need to prove ownership of your domain in order to pre-provision certificates to avoid HTTPS service interruption.

1. Click the **Add** button and select **TXT** from the type dropdown menu.
2. Set the TTL to **1/2 Hour**.
3. Leave the **Name** field blank and enter the record value provided by Pantheon in the **Value** field.
4. Click **Submit**.

## Gandi Docs

<a href="https://wiki.gandi.net/en/dns/zone" target="blank">Manage your domain name's zone file <span class="glyphicons glyphicons-new-window-alt"></span></a>

## Next Steps

* [Going Live: Domains & HTTPS](/docs/guides/going-live/domains-https/)
* [Going Live: Redirect to a Primary Domain](/docs/guides/going-live/redirects/)
