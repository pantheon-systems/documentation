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

Because your DNS lives in Cloudflare, the dashboard's TXT-record verification flow doesn't apply. You start the upgrade, then get every record you need from Terminus and add them in your Cloudflare zone. Repeat the process for each domain.

## Before You Begin

Be sure that you have:

- A site on Pantheon that is eligible for the next-generation GCDN. If the site uses [Advanced Global CDN (AGCDN)](/guides/agcdn), don't start until Pantheon Support or your Account Team confirms it's compatible.
- [Terminus](/terminus) and the [GCDN Terminus plugin](https://github.com/pantheon-systems/terminus-gcdn-plugin) installed on your local computer.
- Access to the Cloudflare account that hosts the zone, with permission to edit DNS records and SSL/TLS settings.
- The domain added to your Pantheon environment's **Domains** tab.

<Alert title="Do Not Use gcdn:verify" type="danger">

O2O uses the CNAME-based validation described on this page. Don't run `terminus gcdn:verify`, and skip the TXT verification steps the dashboard shows for your domain.

</Alert>

## Release Your Zone Hold (Enterprise Only)

[Zone Holds](https://developers.cloudflare.com/fundamentals/account/account-security/zone-holds/) are enabled by default on Cloudflare Enterprise plans and Cloudflare for SaaS Enterprise accounts. If your zone is on a Free, Pro, or Business plan and your domain was not previously on a Cloudflare for SaaS provider, it has no Zone Hold, so skip this step and [re-enabling the hold](#re-enable-your-zone-hold-enterprise-only) at the end.

Otherwise, do this before you start the migration. If a Zone Hold applies to your domain, Cloudflare can't issue certificates for the custom hostname. With **Also prevent subdomains** enabled, the hostname becomes `Blocked`, which doesn't recover when you release the hold later and leaves the domain on a 1014 error.

**Your own Enterprise zone:** On the zone homepage, go to **Quick Actions** and switch **Zone Hold** to **Off**.

**Cloudflare for SaaS provider zone hold:** If the Zone Hold comes from another Cloudflare for SaaS provider — such as HubSpot, WPEngine, or Kinsta — you can't release it yourself. [Contact Pantheon Support](/guides/support/contact-support/) and the team will work with Cloudflare to clear the hold. This is the more common scenario.

## Start the Migration

1. [Go to the Site Dashboard](/guides/account-mgmt/workspace-sites-teams/sites#site-dashboard).
1. Click the next-generation GCDN banner and confirm the migration, or run `terminus gcdn:upgrade <site>` from your terminal.

The upgrade migrates all environments. Your platform hostnames (`*.pantheonsite.io`) move to the new GCDN automatically, and a few minutes of downtime on those hostnames is normal.

Everything after the upgrade comes from Terminus. Don't change any DNS records yet. Your custom domain keeps serving from the old CDN until you point the traffic CNAME at the new edge.

## Set the SSL/TLS Encryption Mode

In your Cloudflare zone, go to **SSL/TLS** > **Overview** and set the encryption mode to **Full** or **Full (strict)**. Other modes, such as Flexible, cause infinite redirect loops between your zone and the GCDN.

## Get Your O2O Records

```bash{promptUser: user}
terminus gcdn:o2o <site>.<env> <domain>
```

Omit `<domain>` to list records for every Cloudflare domain on the environment. Save the output. It lists two records for each domain:

| Record | Purpose |
|---|---|
| CNAME `_acme-challenge.<hostname>` | Delegates certificate validation so the certificate can be issued and renewed. |
| CNAME `<hostname>` | Sends traffic to the GCDN edge. |

<Alert title="Note" type="info">

Older versions of the plugin also print a `_cf-custom-hostname` TXT record. O2O doesn't need it, so don't add it.

</Alert>

## Add the Records in Cloudflare

In the Cloudflare dashboard, go to **DNS** > **Records** for your zone.

### 1. Add the ACME Challenge CNAME

Delete any existing `_acme-challenge.<hostname>` TXT records first. They block certificate delegation, and Cloudflare doesn't allow a CNAME to share a name with another record. Don't remove unrelated TXT records, such as SPF, DKIM, or DMARC.

Then add the `_acme-challenge` CNAME and set its proxy status to **DNS only** (grey cloud):

```none
_acme-challenge.<hostname>  CNAME  <hostname>.<zone_dcv_id>.dcv.cloudflare.com
```

This record issues your certificate. Leave it in place permanently and keep it grey-clouded. Removing or proxying it breaks certificate renewal, and changing it to a TXT record breaks delegation.

### 2. Confirm Propagation

```bash{promptUser: user}
dig +short CNAME _acme-challenge.<hostname>
```

The query returns a `dcv.cloudflare.com` target when the record is live. Then check the domain's status:

```bash{promptUser: user}
terminus gcdn:dns <site>.<env>
```

Find your hostname in the output and look for the `Cloudflare ownership` line. Proceed once it reads `verified`. If it reads `not verified`, run the command again after a minute or two. Don't point traffic at the GCDN before it verifies, or visitors reach Pantheon's edge without a valid certificate.

The `gcdn:dns` command will list A and AAAA records marked `[action required]`, with Cloudflare proxy IP addresses as the current values. Ignore those for O2O. Your domain uses the CNAME, which is listed as `fe.<zone>.edge.pantheon.io`.

### 3. Route Traffic to the GCDN

O2O requires a CNAME at the hostname. Cloudflare doesn't allow a CNAME alongside A or AAAA records, so delete the hostname's existing A and AAAA records and add the traffic CNAME right away. The time between the two changes is downtime. If the hostname is already a CNAME, edit its target instead.

```none
<hostname>  CNAME  fe.<zone>.edge.pantheon.io
```

Create the record as **DNS only** (grey cloud) and leave it that way for 15 to 20 minutes. Cloudflare needs that time to associate the custom hostname with the new GCDN. If you proxy the record before it does, requests may return a 1014 error. After the wait, edit the record and switch it to **Proxied** (orange cloud) to complete the O2O configuration if you wish to keep your own Cloudflare rules.

<Alert title="Note" type="info">

While the record is grey-clouded, visitors connect directly to Pantheon's edge, so your Cloudflare zone's WAF rules, Workers, and page rules don't apply. They resume when you switch to Proxied.

</Alert>

A/AAAA records aren't compatible with O2O and can cause downtime.

## Re-enable Your Zone Hold (Enterprise Only)

Once traffic is flowing, switch **Zone Hold** back to **On** in **Quick Actions**.

## Verify the Migration

Request the site and check the response headers:

```bash{promptUser: user}
curl -sI https://<hostname>
```

The response should no longer include Fastly headers such as `x-served-by: cache-...`, `x-cache`, or `x-timer`, and `via` should no longer mention `varnish`. The site should load without certificate warnings or redirect loops.

## Troubleshooting

### Errors 1014, 1016, and 1034

These errors are usually transient. They appear while Cloudflare validates the custom hostname on Pantheon's edge and typically clear on their own.

If the error persists:

- Confirm the `_acme-challenge` CNAME exists, matches the `gcdn:o2o` output, and is grey-clouded.
- Confirm the hostname CNAME points to `fe.<zone>.edge.pantheon.io`.
- Confirm you followed the staged grey-cloud then orange-cloud change.

[Contact Pantheon Support](/guides/support/contact-support/) if the hostname is `Blocked` (the Zone Hold was on when you upgraded) or `moved` (it stayed pending past Cloudflare's 7-day validation window). Neither recovers on its own.

### Too Many Redirects

Set the zone's SSL/TLS encryption mode to **Full** or **Full (strict)**.

## More Resources

- [Next-generation GCDN Setup](/guides/nextgen-gcdn/setup)
- [Next-generation GCDN FAQs](/guides/nextgen-gcdn/faq)
- [Cloudflare for SaaS: How It Works](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/how-it-works/)
- [Custom Domains](/guides/domains/custom-domains)
