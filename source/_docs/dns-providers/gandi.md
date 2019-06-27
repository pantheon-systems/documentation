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
- [Paid Pantheon plan](/docs/guides/launch/plans/)
- [Domain connected](/docs/guides/launch/domains/) to the target Pantheon environment (typically Live)

## Locate Pantheon's DNS Values
Identify DNS values to point your domain to Pantheon:

1. Navigate to the Site Dashboard and select the target environment (typically <span class="glyphicons glyphicons-cardio"></span> Live) then click **<span class="glyphicons glyphicons-global"></span> Domains / HTTPS**.
2. Click the **Details** button next to your domain.

Keep this page open and login to your <a href="https://id.gandi.net/en/login" target="blank">Gandi account <span class="glyphicons glyphicons-new-window-alt"></span></a> in a new tab before you continue.

## Configure DNS Records on Gandi
### A Record
1. Navigate to the domain's management page and click **Edit the zone**.
2. Click the **Add** button and select **A** from the type dropdown menu.
3. Select desired Time to Live (TTL).

    {% include("ttl.twig") %}

4. Enter **@** in the **Name** field and enter the A record value provided by Pantheon in the **Value** field.
6. Click **Submit**.

### AAAA Records
1. Click the **Add** button and select **AAAA** from the type dropdown menu.
2. Select desired Time to Live (TTL).
3. Enter **@** in the **Name** field and enter the first AAAA record value provided by Pantheon in the **Value** field.
4. Click **Submit**.
5. Repeat steps 1-5 for the second AAAA record value provided by Pantheon. There are two AAAA records for improved uptime and reliability.

### CNAME Record
A CNAME record is required to configure a subdomain (e.g., `www.example.com`).

1. Click the **Add** button and select **CNAME** from the type dropdown menu.
2. Select desired Time to Live (TTL).
3. Enter **www** in the **Name** field and enter the CNAME record value provided by Pantheon, followed by a `.` (e.g. `live-example.pantheonsite.io.`) in the **Value** field.

    <div class="alert alert-info">
    <h4 class="info">Note</h4><p markdown="1">
    Remember to add the dot (`.`) at the end of the **Value** line. Hostnames without a `.` at the end will be suffixed by the current domain.
    </p></div>

4. Click **Submit**.
5. Click the **Activate this version** button.


## Gandi Docs

<a href="https://docs.gandi.net/en/domain_names/index.html" target="blank">Gandi's domain documentation.<span class="glyphicons glyphicons-new-window-alt"></span></a>

## Next Steps

* [Launch Essentials: Domains & HTTPS](/docs/guides/launch/domains/)
* [Launch Essentials: Redirect to a Primary Domain](/docs/guides/launch/redirects/)
