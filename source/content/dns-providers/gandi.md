---
title: Gandi Domain Configuration
provider: Gandi
dnsprovider: true
description: Learn how to point your Gandi domain to a Pantheon site.
categories: [go-live]
tags: [dns]
permalink: docs/:basename
editpath: dns-providers/gandi.md/
---
## Before You Begin
Be sure that you have a:


- Registered domain name using Gandi to host DNS
- [Paid Pantheon plan](/guides/launch/plans)
- [Domain connected](/guides/launch/domains) to the target Pantheon environment (typically Live)

## Locate Pantheon's DNS Values
Identify DNS values to point your domain to Pantheon:

1. Navigate to the Site Dashboard and select the target environment (typically <span class="glyphicons glyphicons-cardio"></span> Live) then click **<span class="glyphicons glyphicons-global"></span> Domains / HTTPS**.
2. Click the **Details** button next to your domain.

Keep this page open and login to your [Gandi account](https://id.gandi.net/en/login) in a new tab before you continue.

## Configure DNS Records on Gandi

### A Record
1. Navigate to the domain's management page and click **Edit the zone**.
2. Click the **Add** button and select **A** from the type dropdown menu.
3. Select desired Time to Live (TTL).

  <Accordion title="Learn More" id="ttl" icon="info-sign">

  #### Time to Live (TTL)

  The TTL dictates the lifespan of a DNS record; a shorter time means less time to wait until the changes go into effect. TTLs are always set in seconds with a few common ones being 86400 (24 hours),  43200 (12 hours), and 3600 (1 hour).

  When you make a change to the TTL of an existing record, you need to wait for the old TTL time to pass - that is, if it had been set to 86400, you would need to wait a full 24 hours for the new setting to begin propagating everywhere.

  </Accordion>

4. Enter **@** in the **Name** field and enter the A record value provided by Pantheon in the **Value** field.
6. Click **Submit**.

### AAAA Records
1. Click the **Add** button and select **AAAA** from the type dropdown menu.
2. Select desired Time to Live (TTL).
3. Enter **@** in the **Name** field and enter the first AAAA record value provided by Pantheon in the **Value** field.
4. Click **Submit**.
5. Repeat steps 1-5 for the second AAAA record value provided by Pantheon. There are two AAAA records for improved uptime and reliability.

### A Record for subdomain
An A record is required to configure a subdomain (e.g., `www.example.com`).

1. Click the **Add** button and select **A** from the type dropdown menu.
2. Select desired Time to Live (TTL).
3. Enter **www** in the **Name** field and enter the A record value provided by Pantheon (e.g. `23.185.0.2`) in the **Value** field.
4. Click **Submit**.
5. Click the **Activate this version** button.


## Gandi Docs

[Gandi's domain documentation](https://docs.gandi.net/en/domain_names/).

## Next Steps

* [Launch Essentials: Domains & HTTPS](/guides/launch/domains)
* [Launch Essentials: Redirect to a Primary Domain](/guides/launch/redirects)
