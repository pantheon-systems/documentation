---
title: "Global CDN Beta now available with built-in bot protection"
published_date: "2026-04-02"
categories: [new-feature, action-required]
---

Following a successful Alpha phase, the next-generation Global CDN (GCDN) is now entering Beta. The new GCDN introduces bot protection by default — meaning sites that migrate will automatically benefit from bot detection and mitigation without any additional configuration or cost.

## What's included

- **Automated bot detection and scoring** — Incoming traffic is automatically evaluated and scored, with managed challenges issued to suspicious requests.
- **Verified bot identification** — Legitimate bots (such as search engine crawlers) are recognized and allowed through while unverified bots are challenged.

## Action Required

Eligible sites will see a banner at the site level in the Pantheon dashboard. To participate in the Beta:

1. Look for the GCDN Beta banner on your eligible site.
2. Click the banner and follow the guided steps.
3. Update your DNS records to point to the new GCDN infrastructure.

During the Beta, DNS-01 TXT record validation is the only supported method for domain verification. You will need to add TXT records to your DNS provider to verify domain ownership.

## Known limitations

- **Traffic metrics** — The traffic metrics page in the Pantheon dashboard will not reflect GCDN Beta traffic during the initial Beta period. Traffic metrics for migrated sites will be restored in a future update.

## Eligibility

The following configurations are **not** eligible for the GCDN Beta at this time:

- Sites using Advanced Global CDN (AGCDN), WAF, or Security Starter packages
- Sites with Multi Zone Failover enabled
- Sites using Custom Certificates
 
## More information

To learn more about the new GCDN Beta with Bot Protection, see our [beta documentation page](/guides/global-cdn/global-cdn-beta) on our docs site.
