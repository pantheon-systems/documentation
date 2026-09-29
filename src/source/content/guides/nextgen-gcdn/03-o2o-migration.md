---
title: Next-generation Global CDN
subtitle: Migrate a Cloudflare-Proxied Domain (O2O)
navtitle: O2O Migration
description: Migrate a domain that is proxied through your own Cloudflare zone to Pantheon's next-generation GCDN using Orange-to-Orange (O2O).
tags: [cache, cdn, cloudflare]
contributors: [jazzsequence]
showtoc: true
reviewed: "2026-09-29"
permalink: docs/guides/nextgen-gcdn/o2o
contenttype: [guide]
innav: [false]
categories: [cache, optimize]
cms: [drupal, wordpress]
audience: [development]
product: [cdn]
integration: [cloudflare]
---

If your domain's DNS is hosted in your own Cloudflare zone and proxied (orange-clouded), you can keep that zone in front of Pantheon's next-generation GCDN using Cloudflare's [Orange-to-Orange (O2O)](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/how-it-works/) configuration. This page walks through the migration from start to finish, including the records to add, the order to add them in, and the errors you may see along the way.

Because your DNS lives in Cloudflare, the dashboard's TXT-record verification flow doesn't apply. You add a different set of records in your Cloudflare zone, using values from Terminus.

## Before You Begin

Be sure that you have:

- A site on Pantheon that is eligible for the next-generation GCDN. If the site uses [Advanced Global CDN (AGCDN)](/guides/agcdn), don't start until Pantheon Support or your Account Team confirms it's compatible.
- [Terminus](/terminus) and the [GCDN Terminus plugin](https://github.com/pantheon-systems/terminus-gcdn-plugin) installed on your local computer.
- Access to the Cloudflare account that hosts the zone, with permission to edit DNS records and SSL/TLS settings.
- The domain added to your Pantheon environment's **Domains** tab.

<Alert title="Exports" type="export">

Set the variables `$site` and `$env` in your terminal:

```bash{promptUser: user}
export site=yoursitename
export env=live
```

</Alert>

<Alert title="Plan Differences" type="info">

[Zone Holds](https://developers.cloudflare.com/fundamentals/account/account-security/zone-holds/) are available only on Cloudflare Enterprise plans. If your zone is on a Free, Pro, or Business plan, it has no Zone Hold, so skip the steps that release and re-enable it.

</Alert>

## Start the Migration

1. [Go to the Site Dashboard](/guides/account-mgmt/workspace-sites-teams/sites#site-dashboard).
1. Click the next-generation GCDN banner and confirm the migration, or run `terminus gcdn:upgrade $site` from your terminal.

Your platform hostnames (`*.pantheonsite.io`) move to the new GCDN automatically. A few minutes of downtime on those hostnames is normal.

Don't change any DNS records yet. Your custom domain keeps serving from the old CDN until you point the final CNAME at the new edge.

## Release Your Zone Hold (Enterprise Only)

If your zone has a Zone Hold, especially with **Also prevent subdomains** enabled, release it temporarily so Cloudflare can process the new custom hostname. On the zone homepage, go to **Quick Actions** and switch **Zone Hold** to **Off**.

## Set the SSL/TLS Encryption Mode

In your Cloudflare zone, go to **SSL/TLS** > **Overview** and set the encryption mode to **Full** or **Full (strict)**. Other modes, such as Flexible, cause infinite redirect loops between your zone and the GCDN.

## Get Your O2O Records

```bash{promptUser: user}
terminus gcdn:o2o $site.$env
```

Pass a domain as a third argument to limit the output to one hostname:

```bash{promptUser: user}
terminus gcdn:o2o $site.$env www.example.com
```

The output lists three records for each domain:

| Record | Purpose |
|---|---|
| TXT `_cf-custom-hostname.<hostname>` | Proves you own the hostname. |
| CNAME `_acme-challenge.<hostname>` | Delegates certificate validation so the certificate can be issued and renewed. |
| CNAME `<hostname>` | Sends traffic to the GCDN edge. |

## Add the Records in Cloudflare

Add the records in the order shown here. In the Cloudflare dashboard, go to **DNS** > **Records** for your zone.

### 1. Add the Ownership TXT Record

Add the TXT record whose name begins with `_cf-custom-hostname`, using the value from the `gcdn:o2o` output.

### 2. Add the ACME Challenge CNAME

Add the `_acme-challenge` CNAME and set its proxy status to **DNS only** (grey cloud):

```none
_acme-challenge.<hostname>  CNAME  <hostname>.<zone_dcv_id>.dcv.cloudflare.com
```

This record is what issues your certificate. Leave it in place permanently and keep it grey-clouded. Removing or proxying it breaks certificate renewal.

Confirm the record has propagated before you continue:

```bash{promptUser: user}
dig +short CNAME _acme-challenge.<hostname>
```

The query returns the `dcv.cloudflare.com` target when the record is live.

### 3. Wait for the Certificate

Check the domain on the **Domains** tab of the Site Dashboard. Don't continue until the certificate is issued. Pointing traffic at the GCDN before then results in certificate errors.

### 4. Point the Hostname at the GCDN

Replace the hostname's existing record with a CNAME to the GCDN edge:

```none
<hostname>  CNAME  fe.<zone>.edge.pantheon.io
```

You can leave the record **Proxied** (orange cloud) to keep your Cloudflare zone in front of Pantheon. Set it to **DNS only** if you want traffic to reach the GCDN directly.

O2O requires a CNAME here. A/AAAA records aren't compatible with O2O and can cause downtime.

## Re-enable Your Zone Hold (Enterprise Only)

Once traffic is flowing, switch **Zone Hold** back to **On** in **Quick Actions**.

## Verify the Migration

Request the site and check the response headers:

```bash{promptUser: user}
curl -sI https://www.example.com
```

The response should include Cloudflare headers, and the site should load without certificate warnings or redirect loops.

## Troubleshooting

### Error 1014: CNAME Cross-User Banned

While the domain is in transition, requests may return Cloudflare error 1014. It appears when the hostname's CNAME points to Pantheon's edge before Cloudflare has finished associating the custom hostname with the new GCDN. It typically resolves on its own once the transition completes.

If it persists:

- Confirm the ownership TXT record and the `_acme-challenge` CNAME both exist and match the `gcdn:o2o` output.
- Confirm the `_acme-challenge` CNAME is grey-clouded.
- Re-run `terminus gcdn:o2o $site.$env` and compare the values against your zone.
- Contact [Pantheon Support](/guides/support/contact-support/) if the error remains after the records propagate.

### Too Many Redirects

Set the zone's SSL/TLS encryption mode to **Full** or **Full (strict)**.

## More Resources

- [Next-generation GCDN Setup](/guides/nextgen-gcdn/setup)
- [Next-generation GCDN FAQs](/guides/nextgen-gcdn/faq)
- [Cloudflare for SaaS: How It Works](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/how-it-works/)
- [Custom Domains](/guides/domains/custom-domains)
