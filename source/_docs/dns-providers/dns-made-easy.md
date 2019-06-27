---
title: DNS Made Easy Domain Configuration
provider: DNS Made Easy
dnsprovider: true
description: Learn how to point your DNS Made Easy domain to a Pantheon site.
tags: [providers]
permalink: docs/:basename/
editpath: dns-providers/dns-made-easy.md/
---
## Before You Begin
Be sure that you have a:

- Registered domain name using DNS Made Easy to host DNS
- [Paid Pantheon plan](/docs/guides/launch/plans/)
- [Domain connected](/docs/guides/launch/domains/) to the target Pantheon environment (typically Live)

## Locate Pantheon's DNS Values
Identify DNS values to point your domain to Pantheon:

1. Navigate to the Site Dashboard and select the target environment (typically <span class="glyphicons glyphicons-cardio"></span> Live) then click **<span class="glyphicons glyphicons-global"></span> Domains / HTTPS**.
2. Click the **Details** button next to your domain.

Keep this page open and login to your [DNS Made Easy account](https://cp.dnsmadeeasy.com/){.external} in a new tab before you continue.

## Configure DNS Records on DNS Made Easy
### A Record
1. Click **DNS** in the menu bar and select the domain you wish to configure.
2. Within the **A** table, click <span class="glyphicon glyphicon-plus"></span> to add a new record.
3. Leave the **Name** field blank and enter the A record value provided by Pantheon in the **IP** field.
4. Select desired Time to Live (TTL).

  {% include("ttl.twig") %}

5. Click **Submit**:

  ![dns made easy a record](/source/docs/assets/images/dns-made-easy-a-record.png)

### AAAA Records
1. Within the **AAAA** table, click <span class="glyphicon glyphicon-plus"></span> to add a new record.
2. Leave the **Name** field blank and enter the first AAAA record value provided by Pantheon in the **IPv6** field.
3. Select desired Time to Live (TTL).

  {% include("ttl2.twig") %}

4. Click **Submit**. Repeat steps 1-4 for the second AAAA record value provided by Pantheon. There are two AAAA records for improved uptime and reliability:

  ![dns made easy aaaa records](/source/docs/assets/images/dns-made-easy-aaaa-records.png)

### CNAME Record
A CNAME record is required to configure a subdomain (e.g., `www.example.com`).

1. Within the **CNAME** table, click <span class="glyphicon glyphicon-plus"></span> to add a new record.
2. Enter **www** in the **Name** field and enter the CNAME record value provided by Pantheon in the **Domain name** field *followed by a trailing dot* (e.g. `live-example.pantheonsite.io.`)
3. Select desired Time to Live (TTL).
4. Click **Submit**:

  ![dns made easy cname records](/source/docs/assets/images/dns-made-easy-cname-record.png)

## Next Steps

* [Launch Essentials: Domains & HTTPS](/docs/guides/launch/domains/)
* [Launch Essentials: Redirect to a Primary Domain](/docs/guides/launch/redirects/)
