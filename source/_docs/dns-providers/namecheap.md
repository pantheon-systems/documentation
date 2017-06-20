---
title: Namecheap Domain Configuration
provider: Namecheap
dnsprovider: true
description: Learn how to point your Namecheap domain to a Pantheon site.
tags: [providers]
permalink: docs/:basename/
editpath: dns-providers/namecheap.md/
---
## Before You Begin
Be sure that you have a:


- Registered domain name using Namecheap to host DNS
- [Paid Pantheon plan](/docs/guides/going-live/plans/)
- [Domain connected](/docs/guides/going-live/domains/) to the target Pantheon environment (typically Live)

## Locate Pantheon's DNS Values
Identify DNS values to point your domain to Pantheon:

1. Navigate to the Site Dashboard and select the target environment (typically <span class="glyphicons glyphicons-cardio"></span> Live) then click **<span class="glyphicons glyphicons-home"></span> Domains & HTTPS**.
2. Click the **DNS Recommendations** button next to your domain.

Keep this page open and login to your <a href="https://www.namecheap.com/myaccount/login.aspx" target="blank">Namecheap account <span class="glyphicons glyphicons-new-window-alt"></span></a> in a new tab before you continue.

## Configure DNS Records on Namecheap
### A Record
2. Select **Domain List** then click the **Manage** button next to the domain you want to point to Pantheon.
3. Navigate to **Advanced DNS** and click the **Add New Record** button.
4. Select **A Record** for Type and enter **@** in the **Host** field and enter the A record value provided by Pantheon in the **Value** field.
5. Set the TTL to **1/2 Hour**.
6. Click **Save changes**.

### AAAA Records
1. From the **Advanced DNS** tab, click the **Add New Record** button.
2. Select **AAAA Record** for Type and enter **@** in the **Host** field and enter the first AAAA record value provided by Pantheon in the **Value** field.
3. Set the TTL to **1/2 Hour**.
4. Click **Save changes**.
5. Repeat steps 1-4 for the second AAAA record value provided by Pantheon. There are two AAAA records for improved uptime and reliability.

### CNAME Record
The CNAME record is only required if you wish to include `www` within your site's primary domain name.

1. From the **Advanced DNS** tab, click the **Add New Record** button.
2. Select **CNAME Record** for the Type and enter **www** in the **Host** field and enter the CNAME record value provided by Pantheon (e.g. `live-example.pantheonsite.io`) in the **Value** field.
3. Set the TTL to **1/2 Hour**.
4. Click **Save changes**.

### TXT Record
The TXT record is only required if you need to prove ownership of your domain in order to pre-provision certificates to avoid HTTPS service interruption.

1. From the **Advanced DNS** tab, click the **Add New Record** button.
2. Select **TXT Record** for the Type and leave the **Host** field blank, then enter the record value provided by Pantheon in the **Value** field.
3. Set the TTL to **1/2 Hour**.
4. Click **Save changes**.


## Namecheap Docs

<a href="https://www.namecheap.com/support/knowledgebase/article.aspx/434/2237/how-do-i-set-up-host-records-for-a-domain" target="blank">How do I set up host records for a domain? <span class="glyphicons glyphicons-new-window-alt"></span></a>

## Next Steps

* [Going Live: Domains & HTTPS](/docs/guides/going-live/domains-https/)
* [Going Live: Redirect to a Primary Domain](/docs/guides/going-live/redirects/)
