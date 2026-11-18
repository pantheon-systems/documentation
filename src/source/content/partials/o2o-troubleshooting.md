---
contenttype: [partial]
categories: [cache]
cms: [--]
product: [cdn]
integration: [cloudflare]
tags: [--]
reviewed: "2026-11-16"
---

## Troubleshooting

### Errors 1014, 1016, and 1034

These errors are usually transient. They appear while Cloudflare validates the custom hostname on Pantheon's edge and typically clear on their own.

If the error persists:

- Confirm the `_acme-challenge` CNAME exists, matches the `gcdn:o2o` output, and is grey-clouded.
- Confirm the hostname CNAME points to `fe.<zone>.edge.pantheon.io`.
- Confirm you followed the staged grey-cloud then orange-cloud change.

If the hostname shows `Blocked`, a Zone Hold applied when Pantheon created it. Switch **Zone Hold** to **Off**, then run `terminus gcdn:verify <site>.<env> <domain>`. If the hold comes from another Cloudflare for SaaS provider, [contact Pantheon Support](/guides/support/contact-support/).

If the hostname shows `moved`, Cloudflare paused its checks because the domain waited about 11 days for the DNS switch. If it stays paused for 7 more days, Cloudflare marks it `deleted`. Run `terminus gcdn:verify <site>.<env> <domain>` to restart the checks. If it shows `deleted`, [contact Pantheon Support](/guides/support/contact-support/).

### Too many redirects

Set the zone's SSL/TLS encryption mode to **Full** or **Full (strict)**.
