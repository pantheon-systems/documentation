---
title: Network Solutions Domain Configuration
provider: Network Solutions
dnsprovider: true
description: Learn how to point your Network Solutions domain to a Pantheon site.
tags: [providers]
permalink: docs/:basename/
editpath: dns-providers/network-solutions.md/
---
<div class="alert alert-danger">
<h4 class="info">Warning</h4>
<p>Network Solutions does not support AAAA records for IPv6 traffic which can negatively impact performance, especially on mobile devices. We recommend transferring DNS services to a provider that supports IPv6.</p></div>

## Before You Begin
Be sure that you have a:


- Registered domain name using Network Solutions to host DNS
- [Paid Pantheon plan](/docs/guides/launch/plans/)
- [Domain connected](/docs/guides/launch/domains/) to the target Pantheon environment (typically Live)

## Locate Pantheon's DNS Values
Identify DNS values to point your domain to Pantheon:

1. Navigate to the Site Dashboard and select the target environment (typically <span class="glyphicons glyphicons-cardio"></span> Live) then click **<span class="glyphicons glyphicons-global"></span> Domains / HTTPS**.
2. Click the **Details** button next to your domain.

Keep this page open and login to your <a href="https://www.networksolutions.com" target="blank">Network Solutions account <span class="glyphicons glyphicons-new-window-alt"></span></a> in a new tab before you continue.

## Configure DNS Records on Network Solutions
### A Record
1. Navigate to **Account Manager** > **My Domain Names**
2. Select the domain you want to point to Pantheon, then click **Manage**.
3. Click **Change Where Domain Points**, then select **Advanced DNS**.
4. In the IP Address (A records) section, click **Edit A Records**.
5. The domain likely has a few default values for `www` and the bare domain. Paste the IP address provided by Pantheon in the Numeric IP field for the existing `@ (None)` record, then delete any default records like so:

  ![Network Solutions Edit A Records](/source/docs/assets/images/dns/networksolutions/default-a-records.png)

6. Select desired Time to Live (TTL).

    {% include("ttl.twig") %}

7. Click **Save Changes**.
8. Once changes are saved, the section of the Advanced DNS interface for A records should look like this:

  ![Network Solutions Final CNAME](/source/docs/assets/images/dns/networksolutions/final-a.png)


### CNAME Record
The CNAME record is required if you wish to include `www` within your site's primary domain name.

1. In the Host Aliases (CNAME Records) section, click **Edit CNAME Records**.
2. Enter **www** in the **Alias** field and enter the CNAME record value provided by Pantheon (e.g. `live-example.pantheonsite.io`) in the **Other Host** field:

  ![Network Solutions CNAME](/source/docs/assets/images/dns/networksolutions/create-cname.png)

3. Select desired Time to Live (TTL).
4. Click **Continue**, then **Save Changes**.
5. Once changes are saved, the section of the Advanced DNS interface for CNAME records should look like this:

  ![Network Solutions Final CNAME](/source/docs/assets/images/dns/networksolutions/final-cname.png)


### AAAA Records
Unfortunately, Network Solutions does not support AAAA records, which means you can't route IPv6 traffic to your bare domain with Network Solutions. Failure to route IPv6 traffic to your site can negatively impact performance, especially for mobile devices. If you'd like to add AAAA records, then consider transferring your domain or name server to another DNS host.

## Network Solutions Docs

<a href="http://www.networksolutions.com/support/how-to-manage-advanced-dns-records/" target="blank">Managing Advanced DNS Records <span class="glyphicons glyphicons-new-window-alt"></span></a>

## Next Steps

* [Launch Essentials: Domains & HTTPS](/docs/guides/launch/domains/)
* [Launch Essentials: Redirect to a Primary Domain](/docs/guides/launch/redirects/)
