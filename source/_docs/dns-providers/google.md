---
title: Google Domain Configuration
provider: Google
dnsprovider: true
description: Learn how to point your Google domain to a Pantheon site.
tags: [providers]
permalink: docs/:basename/
editpath: dns-providers/google.md/
---
## Before You Begin
Be sure that you have a:

- Registered domain name using Google Domains to host DNS
- [Paid Pantheon plan](/docs/guides/launch/plans/)
- [Domain connected](/docs/guides/launch/domains/) to the target Pantheon environment (typically Live)

## Locate Pantheon's DNS Values
Identify DNS values to point your domain to Pantheon:

1. Navigate to the Site Dashboard and select the target environment (typically <span class="glyphicons glyphicons-cardio"></span> Live) then click **<span class="glyphicons glyphicons-global"></span> Domains / HTTPS**.
2. Click the **Details** button next to your domain.

Keep this page open and login to your [Google Domains account](https://domains.google.com/registrar){.external} in a new tab before you continue.

## Configure DNS Records on Google Domains
### A Record
1. Select the **Configure DNS** icon within the Google Domains interface:

  ![Google configure dns](/source/docs/assets/images/google-config-dns.png)

2. Scroll to the **Custom resource records** section.
3. Enter **@** in the **Host** field and provide the A record value provided by Pantheon in the **IPv4** field.
4. Set desired Time to Live (TTL).

    {% include("ttl.twig") %}

5. Click **Add** to create the record.

![Google configure ipv4](/source/docs/assets/images/google-a-record.png)


### AAAA Records

1. Within the same section (**Custom resource records**), change the record type from **A** to **AAAA**.
2. Enter **@** in the **Host** field and provide the first AAAA record value provided by Pantheon in the **IPv6 address** field.
3. Click the **+** icon to the right of the IPv6 field then enter the second AAAA record provided by Pantheon in the **IPv6 address** field.
4. Set desired Time to Live (TTL), then click **Add** to create the record.

![Google configure ipv6](/source/docs/assets/images/google-aaaa.png)


### CNAME Record
A CNAME record is required to configure a subdomain (e.g., `www.example.com`).

1. Within the same section (**Custom resource records**), change the record type from **A** to **CNAME**.
2. Enter `www` in the **Host** field and enter the CNAME record value provided by Pantheon (e.g. `live-example.pantheonsite.io`) in the **Domain name** field.
3. Set desired Time to Live (TTL), then click **Add** to create the record.

![Google configure cname](/source/docs/assets/images/google-cname.png)

## Next Steps

* [Launch Essentials: Domains & HTTPS](/docs/guides/launch/domains/)
* [Launch Essentials: Redirect to a Primary Domain](/docs/guides/launch/redirects/)
