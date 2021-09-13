---
title: Namecheap Domain Configuration
provider: Namecheap
dnsprovider: true
description: Learn how to point your Namecheap domain to a Pantheon site.
categories: [go-live]
tags: [dns]
permalink: docs/:basename
editpath: dns-providers/namecheap.md/
---
## Before You Begin
Ensure you have the following:

- Registered domain name using Namecheap to host DNS
- [Paid Pantheon plan](/guides/launch/plans)
- [Domain connected](/guides/launch/domains) to the target Pantheon environment (typically Live)

## Locate Pantheon's DNS Values
Identify DNS values to point your domain to Pantheon:

1. Navigate to the Site Dashboard and select the target environment (typically <span class="glyphicons glyphicons-cardio"></span> Live) then click **<span class="glyphicons glyphicons-global"></span> Domains / HTTPS**.
1. Click **Details**.

Keep this page open and log in to your [Namecheap account](https://www.namecheap.com/myaccount/login.aspx) in a new tab before you continue.

Note that when entering the value for the Name/Host, the bare domain and trailing dot (".") must be removed from the value provided by Pantheon. For example, the value entered in the **Name/Host** field for the Namecheap Advanced DNS configuration should look like `_name-sample`, or in the case of a subdomain `_name-sample.subdomain` where the subdomain is replaced with a specific subdomain.


## Configure DNS Records on Namecheap

### A Record
1. Select **Domain List** then click **Manage**, next to the domain you want to point to Pantheon.
1. Navigate to **Advanced DNS** and click **Add New Record**.
1. Select **A Record** for _Type_.
1. Enter `@` in the **Host** field and enter the _A record value_ provided by Pantheon in the **Value** field.
1. Select the desired Time to Live (TTL).

    <Accordion title="Learn More" id="ttl" icon="info-sign">

    #### Time to Live (TTL)

    The TTL dictates the lifespan of a DNS record. A shorter time means less time to wait until the changes go into effect. TTLs are always set in seconds with a few common ones being 86400 (24 hours),  43200 (12 hours), and 3600 (1 hour).

    When you make a change to the TTL of an existing record, you need to wait for the old TTL time to pass - for example, if it is set to 86400, you need to wait a full 24 hours for the new setting to begin propagating everywhere.

    </Accordion>

1. Click **Save changes**.

### AAAA Records
1. From the **Advanced DNS** tab, click **Add New Record**.
1. Select **AAAA Record** for _Type_. 
2. Enter `@` in the **Host** field and enter the first _AAAA record value_ provided by Pantheon in the **Value** field.
3. Select the desired Time to Live (TTL).
4. Click **Save changes**.
5. Repeat steps 1-4 for the second _AAAA record value_ provided by Pantheon. There are two AAAA records for improved uptime and reliability.

### A Record for subdomain
An _A record_ is required to configure a subdomain (e.g., `www.example.com`).

1. From the **Advanced DNS** tab, click **Add New Record**.
1. Select **A Record** for the _Type_. 
1. Enter `www` in the **Host** field and enter the _A record value_ provided by Pantheon (e.g. `23.185.0.2`) in the **Value** field.
1. Select the desired Time to Live (TTL).
1. Click **Save changes**.

## Namecheap Docs

[How do I set up host records for a domain?](https://www.namecheap.com/support/knowledgebase/article.aspx/434/2237/how-do-i-set-up-host-records-for-a-domain)

## Next Steps

* [Launch Essentials: Domains & HTTPS](/guides/launch/domains)
* [Launch Essentials: Redirect to a Primary Domain](/guides/launch/redirects)
