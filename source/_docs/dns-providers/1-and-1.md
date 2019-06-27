---
title: 1&1 Domain Configuration
provider: 1&1
dnsprovider: true
description: Learn how to point your 1&1 domain to a Pantheon site.
tags: [providers]
permalink: docs/:basename/
editpath: dns-providers/1-and-1.md/
---
<div class="alert alert-danger">
<h4 class="info">Warning</h4>
<p>1&1 does not support adding multiple AAAA records for IPv6 traffic which can negatively impact performance, especially on mobile devices. We recommend transferring DNS services to a provider that supports more than one IPv6 record per domain.</p></div>

## Before You Begin
Be sure that you have a:

- Registered domain name using 1&1 to host DNS
- [Paid Pantheon plan](/docs/guides/launch/plans/)
- [Domain connected](/docs/guides/launch/domains/) to the target Pantheon environment (typically Live)

## Configure DNS Records on 1&1
### A/AAAA Records

1. Click **Domain Center** from the Domains panel.
2. Click the down arrow to the right of the domain you want to point to Pantheon, then click **Edit DNS Settings**.
3. Click the **Other IP address** option from the IP address (A Record) menu.
4. Enter the A record value provided by Pantheon in the IPv4 Address field and either of the AAAA record values in the IPv6 Address field. 

    Pantheon provides two AAAA records for improved uptime and reliability, however 1&1 only supports one IPv6 record per domain. If you'd like to add both AAAA records, then consider transferring your domain or name server to another DNS host.

5. Click **Save**.
### CNAME Record
A CNAME record is required to configure a subdomain (e.g., `www.example.com`).

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

* [Launch Essentials: Domains & HTTPS](/docs/guides/launch/domains/)
* [Launch Essentials: Redirect to a Primary Domain](/docs/guides/launch/redirects/)
