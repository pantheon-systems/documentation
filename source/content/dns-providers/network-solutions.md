---
title: Network Solutions Domain Configuration
provider: Network Solutions
dnsprovider: true
description: Learn how to point your Network Solutions domain to a Pantheon site.
categories: [go-live]
tags: [dns]
permalink: docs/:basename
editpath: dns-providers/network-solutions.md/
---

<Alert type="danger" title="Warning">

Network Solutions does not host AAAA records for IPv6 traffic which can negatively impact performance, especially on mobile devices. They support glue records pointing to another authoritative name server. We recommend transferring DNS services to a provider that hosts IPv6 records directly.

</Alert>

## Before You Begin
Be sure that you have a:

- Registered domain name using Network Solutions to host DNS
- [Paid Pantheon plan](/guides/launch/plans)
- [Domain connected](/guides/launch/domains) to the target Pantheon environment (typically Live)

## Locate Pantheon's DNS Values
Identify DNS values to point your domain to Pantheon:

1. Navigate to the Site Dashboard and select the target environment (typically <span class="glyphicons glyphicons-cardio"></span> Live) then click **<span class="glyphicons glyphicons-global"></span> Domains / HTTPS**.
2. Click the **Details** button next to your domain.

Keep this page open and login to your [Network Solutions account](https://www.networksolutions.com) in a new tab before you continue.

## Configure DNS Records on Network Solutions

### A Record
1. Navigate to **Account Manager** > **My Domain Names**
2. Select the domain you want to point to Pantheon, then click **Manage**.
3. Click **Change Where Domain Points**, then select **Advanced DNS**.
4. In the IP Address (A records) section, click **Edit A Records**.
5. The domain likely has a few default values for `www` and the bare domain. Paste the IP address provided by Pantheon in the Numeric IP field for the existing `@ (None)` record, then delete any default records like so:

  ![Network Solutions Edit A Records](../../images/dns/networksolutions/default-a-records.png)

6. Select desired Time to Live (TTL).

    <Accordion title="Learn More" id="ttl" icon="info-sign">

    #### Time to Live (TTL)

    The TTL dictates the lifespan of a DNS record; a shorter time means less time to wait until the changes go into effect. TTLs are always set in seconds with a few common ones being 86400 (24 hours),  43200 (12 hours), and 3600 (1 hour).

    When you make a change to the TTL of an existing record, you need to wait for the old TTL time to pass - that is, if it had been set to 86400, you would need to wait a full 24 hours for the new setting to begin propagating everywhere.

    </Accordion>

7. Click **Save Changes**.
8. Once changes are saved, the section of the Advanced DNS interface for A records should look like this:

### A Record for Subdomain
An A record is required to configure a subdomain (e.g., `www.example.com`).

1. In the IP Address (A records) section, click **Edit A Records**.
2. Edit the **www** record field and enter the A record value provided by Pantheon (e.g. `23.185.0.2`) in the **Numeric IP** field.
3. Select desired Time to Live (TTL).
4. Click **Save Changes**.

### AAAA Records

Glue records to a name server that hosts AAAA records can be set via the [How Do I Modify IPv6 Records?](https://knowledge.web.com/subjects/article/KA-01100/en-us#NS) instructions on the Network Solutions docs, and require an email to their support to complete.

## Network Solutions Docs

* [Managing Advanced DNS Records](https://knowledge.web.com/subjects/article/KA-01111/en-us#Network%20Solutions)
* [Adding an IPv6 AAAA record](https://knowledge.web.com/subjects/article/KA-01100/en-us#NS)

## Next Steps

* [Launch Essentials: Domains & HTTPS](/guides/launch/domains)
* [Launch Essentials: Redirect to a Primary Domain](/guides/launch/redirects)
