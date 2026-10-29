---
title: Next-generation Global CDN
subtitle: Migrate a Cloudflare-Proxied Domain (O2O)
navtitle: O2O Migration
description: Migrate a domain that is proxied through your own Cloudflare zone to Pantheon's next-generation GCDN using Orange-to-Orange (O2O).
tags: [cache, cdn, cloudflare]
contributors: [jazzsequence]
showtoc: true
reviewed: "2026-10-29"
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

## Before you begin

Be sure that you have:

- A site on Pantheon that is eligible for the next-generation GCDN. If the site uses [Advanced Global CDN (AGCDN)](/guides/agcdn), don't start until Pantheon Support or your Account Team confirms it's compatible.
- [Terminus](/terminus) and the [GCDN Terminus plugin](https://github.com/pantheon-systems/terminus-gcdn-plugin) installed on your local computer.
- Access to the Cloudflare account that hosts the zone, with permission to edit DNS records and SSL/TLS settings.
- The domain added to your Pantheon environment's **Domains** tab.

<Partial file="o2o-gcdn-verify-warning.md" />

<Partial file="o2o-zone-hold-release.md" />

## Start the migration

1. [Go to the Site Dashboard](/guides/account-mgmt/workspace-sites-teams/sites#site-dashboard).
1. Click the next-generation GCDN banner and confirm the migration, or run `terminus gcdn:upgrade <site>` from your terminal.

The upgrade migrates all environments. Your platform hostnames (`*.pantheonsite.io`) move to the new GCDN automatically, and a few minutes of downtime on those hostnames is normal.

Everything after the upgrade comes from Terminus. Don't change any DNS records yet. Your custom domain keeps serving from the old CDN until you point the traffic CNAME at the new edge.

<Partial file="o2o-records-and-cutover.md" />

## Verify the migration

Request the site and check the response headers:

```bash{promptUser: user}
curl -sI https://<hostname>
```

The response should no longer include Fastly headers such as `x-served-by: cache-...`, `x-cache`, or `x-timer`, and `via` should no longer mention `varnish`. The site should load without certificate warnings or redirect loops.

<Partial file="o2o-troubleshooting.md" />

## More resources

- [Next-generation GCDN Setup](/guides/nextgen-gcdn/setup)
- [Next-generation GCDN FAQs](/guides/nextgen-gcdn/faq)
- [Cloudflare for SaaS: How It Works](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/how-it-works/)
- [Custom Domains](/guides/domains/custom-domains)
