---
contenttype: [partial]
categories: [cache]
cms: [--]
product: [cdn]
integration: [cloudflare]
tags: [--]
reviewed: "2026-11-16"
---

<Alert title="Use Terminus, not the dashboard" type="danger">

O2O setup [requires the GCDN Terminus plugin](/guides/nextgen-gcdn/faq#i-have-cloudflare-in-front-of-my-site-is-that-supported), and the dashboard can contradict these steps. Ignore the DNS records and TXT verification steps the dashboard shows for these domains, and use the records from `terminus gcdn:o2o` instead.

Run `terminus gcdn:update` before you start to install the latest plugin version. `gcdn:update` can't upgrade version 0.4.0 or earlier: run `terminus self:plugin:uninstall pantheon-systems/terminus-gcdn-plugin`, then `terminus self:plugin:install pantheon-systems/terminus-gcdn-plugin` instead. Older versions report `not verified` for O2O domains, even when the certificate is issued.

</Alert>
