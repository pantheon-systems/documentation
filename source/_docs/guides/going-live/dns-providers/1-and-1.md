---
title: 1&1 Domain Configuration
provider: 1&1
description: Learn how to point your 1&1 domain to a Pantheon site.
tags: [providers]
permalink: docs/:basename/
editpath: going-live/domains/1-and-1.md/
---
## Before You Begin
Be sure that you have a:

- Registered domain name using 1&1 to host DNS
- [Paid Pantheon plan](/docs/guides/going-live/plans/)
- [Domain connected](/docs/guides/going-live/domains/) to the target Pantheon environment (typically Live)

## Locate Pantheon's DNS Values
Identify DNS values to point your domain to Pantheon:

1. Navigate to the Site Dashboard and select the target environment (typically <span class="glyphicons glyphicons-cardio"></span> Live) then click **<span class="glyphicons glyphicons-home"></span> Domains & HTTPS**.
2. Click the **DNS Recommendations** button next to your domain.

Keep this page open and login to your <a href="https://account.1and1.com/" target="blank">1&1 account <span class="glyphicons glyphicons-new-window-alt"></span></a> in a new tab before you continue.

## Configure DNS Records on 1&1
### A/AAAA Records
1. Click **Domain Center** from the Domains panel.
2. Click the down arrow to the right of the domain you want to point to Pantheon, then click **Edit DNS Settings**.
3. Click the **Other IP address** option from the IP address (A Record) menu.
4. Enter the A record value provided by Pantheon in the IPv4 Address field and the AAAA record values in the IPv6 Address field. There are two AAAA records for improved uptime and reliability.

4. Click **Save**.
### CNAME Record
The CNAME record is only required if you wish to include `www` within your site's primary domain name.

1. Click **Domain Center** from the Domains panel.
2. Click the down arrow to the right of the domain you want to point to Pantheon, then click **Create Subdomain**.
3. Enter `www` then click the **Create Subdomain** button.  
4. Navigate to **Domains** > **Manage Domains** then click the down arrow to the right of the domain and select **Manage Subdomains**.
5. Find the `www` subdomain and click the down arrow then **Edit DNS Settings**.
6. Select CNAME and enter the record value provided by Pantheon (e.g. `live-example.pantheonsite.io`) in the **Alias** field.
7. Check "I am aware and accept that all current DNS settings, e-mail addresses and redirects will be disabled".
8. Click **Save**, then **Yes** to confirm.

## 1&1 Docs

* <a href="https://help.1and1.com/domains-c36931/manage-domains-c79822/dns-c37586" target="blank">Manage Domains – DNS <span class="glyphicons glyphicons-new-window-alt"></span></a>
* <a href="https://help.1and1.com/domains-c36931/manage-domains-c79822/dns-c37586/change-your-domain-s-ip-address-a-record-a599296.html" target="blank">Change Your Domain's IP Address (A record) <span class="glyphicons glyphicons-new-window-alt"></span></a>
* <a href="https://help.1and1.com/domains-c36931/manage-domains-c79822/dns-c37586/enter-a-cname-for-your-subdomain-a643600.html" target="blank">Enter a CNAME for Your Subdomain <span class="glyphicons glyphicons-new-window-alt"></span></a>


## Next Steps

[Going Live Guide: Enable HTTPS](/docs/guides/going-live/https/)
