---
title: Next-generation Global CDN
subtitle: Connect a Cloudflare-Proxied Domain to a New Site (O2O)
navtitle: O2O New Site
description: Connect a domain that is proxied through your own Cloudflare zone to a new Pantheon site on the next-generation GCDN using Orange-to-Orange (O2O).
tags: [cache, cdn, cloudflare]
contributors: [jazzsequence]
showtoc: true
reviewed: "2026-10-29"
permalink: docs/guides/nextgen-gcdn/o2o-new-site
contenttype: [guide]
innav: [false]
categories: [cache, optimize]
cms: [drupal, wordpress]
audience: [development]
product: [cdn]
integration: [cloudflare]
---

If you're adding a domain to a new Pantheon site and your own Cloudflare zone already proxies that domain (orange-clouded), you can keep the zone in front of Pantheon's next-generation GCDN using Cloudflare's [Orange-to-Orange (O2O)](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/how-it-works/) configuration. This page walks through connecting the domain, including the records to add, the order to add them in, and the errors you may see along the way. To move an existing site from the legacy Global CDN instead, see [Migrate a Cloudflare-Proxied Domain (O2O)](/guides/nextgen-gcdn/o2o).

O2O setup runs through Terminus rather than the dashboard's TXT-record verification flow. You add the domain to your site, then get every record you need from Terminus and add them in your Cloudflare zone. Repeat the process for each domain.

## Before you begin

Be sure that you have:

- A new site on Pantheon. New sites already use the next-generation GCDN, so there's nothing to upgrade.
- [Terminus](/terminus) and the [GCDN Terminus plugin](https://github.com/pantheon-systems/terminus-gcdn-plugin) installed on your local computer.
- Access to the Cloudflare account that hosts the zone, with permission to edit DNS records and SSL/TLS settings.
- A domain that your Cloudflare zone proxies and that currently serves traffic from another host.

<Partial file="o2o-gcdn-verify-warning.md" />

<Partial file="o2o-zone-hold-release.md" />

## Add the domain to your site

1. [Go to the Site Dashboard](/guides/account-mgmt/workspace-sites-teams/sites#site-dashboard).
1. Add the domain on your Pantheon environment's **Domains** tab. See [Custom Domains](/guides/domains/custom-domains) for the steps.

The dashboard might show DNS records for the domain. Use the records from `terminus gcdn:o2o` in the next sections instead. Don't change the domain's traffic record yet. Your domain keeps serving from its current host until you point the traffic CNAME at the new edge.

<Partial file="o2o-records-and-cutover.md" />

## Verify the connection

Request the site at its public URL:

```bash{promptUser: user}
curl -sI https://<hostname>
```

The response returns an HTTP `200` or `30x` status. The site should load without certificate warnings or redirect loops.

<Partial file="o2o-troubleshooting.md" />

## More resources

- [Migrate a Cloudflare-Proxied Domain (O2O)](/guides/nextgen-gcdn/o2o)
- [Next-generation GCDN Setup](/guides/nextgen-gcdn/setup)
- [Next-generation GCDN FAQs](/guides/nextgen-gcdn/faq)
- [Cloudflare for SaaS: How It Works](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/how-it-works/)
- [Custom Domains](/guides/domains/custom-domains)
