---
title: "Pantheon's next-generation Global CDN is now generally available"
published_date: "2026-07-13"
published_at: "2026-07-13T14:00:00Z"
categories: [new-feature, action-required]
---

After a successful Beta phase, Pantheon's next-generation Global CDN (GCDN) is now generally available. Built on Cloudflare, the new GCDN delivers built-in bot protection, expanded site eligibility, and the same self-serve migration experience customers have been using in the Beta — now production-ready for the majority of sites on the platform.

## What's included

- **Built-in bot protection** — Incoming traffic is automatically scored, with managed challenges issued to suspicious requests and verified bots (such as search engine crawlers) allowed through.
- **Multizone Failover support** — Sites with [Multizone Failover](/multizone-failover) enabled can migrate to GCDN and continue to benefit from automated regional failover.
- **Custom Certificates support** — Sites using [customer-provided TLS certificates](/custom-certificates) are now supported on GCDN. Migration for these sites is owned by our Professional Services team and coordinated through support — [open a support ticket](/guides/support/contact-support/) to get started.
- **Platform vanity domain support** — Organization-owned [vanity hostnames](/guides/domains/vanity-domains) (e.g., `live-mysite.example-agency.com`) are fully supported. Migration for these sites is owned by our Professional Services team and coordinated through support — [open a support ticket](/guides/support/contact-support/) to get started.

## Action Required

Eligible sites will display a GCDN banner in the Pantheon dashboard. To migrate:

1. Locate the GCDN banner on an eligible site.
2. Click it and complete the guided process.
3. Point your DNS records to the new GCDN infrastructure.

Domain verification supports DNS-01 TXT record validation, requiring TXT records added at your DNS provider.

## Eligibility

GCDN is available to all sites on the platform except those currently using [Advanced Global CDN (AGCDN)](/guides/agcdn). AGCDN customers will be migrated in a future phase — no action is required from them at this time.

## More information

For full details on GCDN, refer to the [Global CDN guide](/guides/global-cdn) on the Pantheon docs site.
