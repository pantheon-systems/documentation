---
title: Amazon Route 53 Domain Configuration
provider: Amazon Route 53
dnsprovider: true
description: Learn how to point your Amazon Route 53 domain to a Pantheon site.
categories: [go-live]
tags: [dns]
permalink: docs/:basename
editpath: dns-providers/route53.md/
---
## Before You Begin
Be sure that you have a:

- Registered domain name using Amazon Route 53 to host DNS
- [Paid Pantheon plan](/guides/launch/plans)
- [Domain connected](/guides/launch/domains) to the target Pantheon environment (typically Live)

## Locate Pantheon's DNS Values
Identify DNS values to point your domain to Pantheon:

1. Navigate to the Site Dashboard and select the target environment (typically <span class="glyphicons glyphicons-cardio"></span> Live) then click **<span class="glyphicons glyphicons-global"></span> Domains / HTTPS**.
2. Click the **Details** button next to your domain.

Keep this page open and login to your [Amazon Route 53 account](https://console.aws.amazon.com/route53/) in a new tab before you continue.

## Configure DNS Records on Route 53

### A Record

1. Click **Hosted Zones** and select the domain you wish to configure.
2. Click **Create Record Set** to add a new record, then select **A - IPv4 address** for the record type.
3. Leave the **Name** field blank and enter the A record value provided by Pantheon in the **Value** field.
4. Select desired Time to Live (TTL).

  <Accordion title="Learn More" id="ttl" icon="info-sign">

  #### Time to Live (TTL)

  The TTL dictates the lifespan of a DNS record; a shorter time means less time to wait until the changes go into effect. TTLs are always set in seconds with a few common ones being 86400 (24 hours),  43200 (12 hours), and 3600 (1 hour).

  When you make a change to the TTL of an existing record, you need to wait for the old TTL time to pass - that is, if it had been set to 86400, you would need to wait a full 24 hours for the new setting to begin propagating everywhere.

  </Accordion>

5. Click **Create**:

  ![Route 53 A record](../../images/route53-a-record.png)

### AAAA Records

1. Click **Create Record Set** to add a new record, then select **AAAA - IPv6 address** for the record type.
2. Leave the **Name** field blank and enter the _both_ AAAA record value provided by Pantheon in the **Value** field.
3. Select desired Time to Live (TTL).

  <Accordion title="Learn More" id="ttl2" icon="info-sign">

  #### Time to Live (TTL)

  The TTL dictates the lifespan of a DNS record; a shorter time means less time to wait until the changes go into effect. TTLs are always set in seconds with a few common ones being 86400 (24 hours),  43200 (12 hours), and 3600 (1 hour).

  When you make a change to the TTL of an existing record, you need to wait for the old TTL time to pass - that is, if it had been set to 86400, you would need to wait a full 24 hours for the new setting to be in place everywhere.

  </Accordion>

4. Click **Create**:

  ![Route 53 AAAA records](../../images/route53-aaaa-records.png)

### A Record for subdomain
An A record is required to configure a subdomain (e.g., `www.example.com`).

1. Click **Create Record Set** to add a new record, then select **A - IPv4 address** for the record type.
2. Enter **www** in the **Name** field and enter the A record value provided by Pantheon in the **Value** field (e.g. `23.185.0.2`)
3. Select desired Time to Live (TTL).
4. Click **Create**:

## Next Steps

- [Launch Essentials: Domains & HTTPS](/guides/launch/domains)
- [Launch Essentials: Redirect to a Primary Domain](/guides/launch/redirects)
