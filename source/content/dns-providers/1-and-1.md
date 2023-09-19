---
title: 1&1 Domain Configuration
provider: 1&1
description: Learn how to point your 1&1 domain to a Pantheon site.
tags: [domains]
permalink: docs/:basename
editpath: dns-providers/1-and-1.md/
contenttype: [doc]
innav: [true]
categories: [domains]
cms: [--]
audience: [development]
product: [--]
integration: [--]
---
<Alert title="Warning" type="danger">

1&1 does not support adding multiple AAAA records for IPv6 traffic which can negatively impact performance, especially on mobile devices. We recommend transferring DNS services to a provider that supports more than one IPv6 record per domain.

</Alert>

## Before You Begin
Be sure that you have a:

- Registered domain name using 1&1 to host DNS
- [Paid Pantheon plan](/guides/launch/plans)
- [Domain connected](/guides/launch/domains) to the target Pantheon environment (typically Live)

## Configure DNS Records on 1&1

### A/AAAA Records
Complete the following to configure DNS for the bare domain (e.g., `example.com`) and repeat for any subdomains (e.g., `www`):

1. Click **Domain Center** from the Domains panel.
2. Click the down arrow to the right of the domain you want to point to Pantheon, then click **Edit DNS Settings**.
3. Click the **Other IP address** option from the IP address (A Record) menu.
4. Enter the A record value provided by Pantheon in the IPv4 Address field and either of the AAAA record values in the IPv6 Address field.

    Pantheon provides two AAAA records for improved uptime and reliability, however 1&1 only supports one IPv6 record per domain. If you'd like to add both AAAA records, then consider transferring your domain or name server to another DNS host.

5. Click **Save**.


## 1&1 Docs

* [Manage Domains – DNS](https://help.1and1.com/domains-c36931/manage-domains-c79822/dns-c37586)
* [Change Your Domain's IP Address (A record)](https://help.1and1.com/domains-c36931/manage-domains-c79822/dns-c37586/change-your-domain-s-ip-address-a-record-a599296.html)

## Next Steps

* [Launch Essentials: Domains & HTTPS](/guides/launch/domains)

* [Launch Essentials: Redirect to a Primary Domain](/guides/launch/redirects)
