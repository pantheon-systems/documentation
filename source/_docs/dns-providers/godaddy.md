---
title: GoDaddy Domain Configuration
provider: GoDaddy
dnsprovider: true
description: Learn how to point your GoDaddy domain to a Pantheon site.
tags: [providers]
permalink: docs/:basename/
editpath: dns-providers/godaddy.md/
---
## Before You Begin
Be sure that you have a:

- Registered domain name using GoDaddy to host DNS
- [Paid Pantheon plan](/docs/guides/going-live/plans/)
- [Domain connected](/docs/guides/going-live/domains/) to the target Pantheon environment (typically Live)

## Locate Pantheon's DNS Values
Identify DNS values to point your domain to Pantheon:

1. Navigate to the Site Dashboard and select the target environment (typically <span class="glyphicons glyphicons-cardio"></span> Live) then click **<span class="glyphicons glyphicons-home"></span> Domains & HTTPS**.
2. Click the **DNS Recommendations** button next to your domain.

Keep this page open and login to your <a href="https://godaddy.com/" target="blank">GoDaddy account <span class="glyphicons glyphicons-new-window-alt"></span></a> in a new tab before you continue.

## Configure DNS Records on GoDaddy
### A Record
1. Click your GoDaddy profile in the top right menu bar and select **Manage My Domains**.
2. Click the down arrow to the right of the domain you want to point to Pantheon, then click **Manage DNS**.
3. Click the **Add** button and select **A** from the type dropdown menu.
4. Enter **@** in the **Host** field and enter the A record value provided by Pantheon in the **Points to** field.
5. Set the TTL to **1/2 Hour**.
6. Click **Save**.

### AAAA Records
1. Click the **Add** button and select **AAAA** from the type dropdown menu.
2. Enter **@** in the **Host** field and enter the first AAAA record value provided by Pantheon in the **Points to** field.
3. Set the TTL to **1/2 Hour**.
4. Click **Save**.
5. Repeat steps 1-4 for the second AAAA record value provided by Pantheon. There are two AAAA records for improved uptime and reliability.

### CNAME Record
The CNAME record is only required if you wish to include `www` within your site's primary domain name.

1. Click the **Add** button and select **CNAME** from the Type dropdown menu.
2. Enter **www** in the **Host** field and enter the CNAME record value provided by Pantheon (e.g. `live-example.pantheonsite.io`) in the **Points to** field.
3. Set the TTL to **1/2 Hour**.
4. Click **Save**.

### TXT Record
The TXT record is only required if you need to prove ownership of your domain in order to pre-provision certificates to avoid HTTPS service interruption.

1. Click the **Add** button and select **TXT** from the type dropdown menu.
2. Leave the **Host** field blank and enter the record value provided by Pantheon in the **Points to** field.
3. Set the TTL to **1/2 Hour**.
4. Click **Save**.

## Troubleshooting

### The specified record already exists
If you receive an error message that says `The specified record already exists`, click **Cancel** and select **<span class="glyphicons glyphicons-pencil"></span>** next to the existing record. Replace the value in the **Points to** field with the record value provided by Pantheon, then click **Save**.

## GoDaddy Docs

<a href="https://www.godaddy.com/help/manage-dns-680" target="blank">Manage DNS <span class="glyphicons glyphicons-new-window-alt"></span></a>

## Next Steps

* [Going Live: Domains & HTTPS](/docs/guides/going-live/domains-https/)
* [Going Live: Redirect to a Primary Domain](/docs/guides/going-live/redirects/)
