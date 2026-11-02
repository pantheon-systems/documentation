---
contenttype: [partial]
categories: [cache]
cms: [--]
product: [cdn]
integration: [cloudflare]
tags: [--]
reviewed: "2026-10-29"
---

<Alert title="Use Terminus, not the dashboard" type="danger">

O2O is set up through the GCDN Terminus plugin, and the dashboard can contradict these steps. Ignore the DNS records and TXT verification steps the dashboard shows for these domains, and use the records from `terminus gcdn:o2o` instead.

The CNAME-based validation described on this page replaces the `terminus gcdn:verify` check. Don't run `terminus gcdn:verify` to gate your cutover. After you route traffic to the GCDN, run `terminus gcdn:verify <site>.<env> <domain>` so Cloudflare and Pantheon detect the change sooner.

</Alert>
