---
contenttype: [partial]
categories: [cache]
cms: [--]
product: [cdn]
integration: [cloudflare]
tags: [--]
reviewed: "2026-11-02"
---

## Troubleshooting

### Errors 1014, 1016, and 1034

These errors are usually transient. They appear while Cloudflare validates the custom hostname on Pantheon's edge and typically clear on their own.

If the error persists:

- Confirm the `_acme-challenge` CNAME exists, matches the `gcdn:o2o` output, and is grey-clouded.
- Confirm the hostname CNAME points to `fe.<zone>.edge.pantheon.io`.
- Confirm you followed the staged grey-cloud then orange-cloud change.

If the hostname shows `Blocked`, a Zone Hold applied when Pantheon created it. Switch **Zone Hold** to **Off**, then run `terminus gcdn:verify <site>.<env> <domain>`. If the hold comes from another Cloudflare for SaaS provider, [contact Pantheon Support](/guides/support/contact-support/).

[Contact Pantheon Support](/guides/support/contact-support/) if the hostname is `moved` (it stayed pending past Cloudflare's 7-day validation window). It doesn't recover on its own.

### Too many redirects

Set the zone's SSL/TLS encryption mode to **Full** or **Full (strict)**.
