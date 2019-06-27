---
title: Amazon Route 53 Domain Configuration
provider: Amazon Route 53
dnsprovider: true
description: Learn how to point your Amazon Route 53 domain to a Pantheon site.
tags: [providers]
permalink: docs/:basename/
editpath: dns-providers/route53.md/
---
## Before You Begin
Be sure that you have a:

- Registered domain name using Amazon Route 53 to host DNS
- [Paid Pantheon plan](/docs/guides/launch/plans/)
- [Domain connected](/docs/guides/launch/domains/) to the target Pantheon environment (typically Live)

## Locate Pantheon's DNS Values
Identify DNS values to point your domain to Pantheon:

1. Navigate to the Site Dashboard and select the target environment (typically <span class="glyphicons glyphicons-cardio"></span> Live) then click **<span class="glyphicons glyphicons-global"></span> Domains / HTTPS**.
2. Click the **Details** button next to your domain.

Keep this page open and login to your [Amazon Route 53 account](https://console.aws.amazon.com/route53/){.external} in a new tab before you continue.

## Configure DNS Records on Route 53
### A Record
1. Click **Hosted Zones** and select the domain you wish to configure.
2. Click **Create Record Set** to add a new record, then select **A - IPv4 address** for the record type.
3. Leave the **Name** field blank and enter the A record value provided by Pantheon in the **Value** field.
4. Select desired Time to Live (TTL).

  {% include("ttl.twig") %}

5. Click **Create**:

  ![Route 53 a record](/source/docs/assets/images/route53-a-record.png)

### AAAA Records
1. Click **Create Record Set** to add a new record, then select **AAAA - IPv6 address** for the record type.
2. Leave the **Name** field blank and enter the _both_ AAAA record value provided by Pantheon in the **Value** field.
3. Select desired Time to Live (TTL).

  {% include("ttl2.twig") %}

4. Click **Create**:

  ![Route 53 aaaa records](/source/docs/assets/images/route53-aaaa-records.png)

### CNAME Record
A CNAME record is required to configure a subdomain (e.g., `www.example.com`).

1. Click **Create Record Set** to add a new record, then select **CNAME - Canonical name** for the record type.
2. Enter **www** in the **Name** field and enter the CNAME record value provided by Pantheon in the **Value** field (e.g. `live-example.pantheonsite.io`)
3. Select desired Time to Live (TTL).
4. Click **Create**:

  ![Route 53 cname records](/source/docs/assets/images/route53-cname-record.png)

## Next Steps

* [Launch Essentials: Domains & HTTPS](/docs/guides/launch/domains/)
* [Launch Essentials: Redirect to a Primary Domain](/docs/guides/launch/redirects/)
