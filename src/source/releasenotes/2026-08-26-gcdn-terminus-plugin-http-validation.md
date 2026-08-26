---
title: "HTTP-01 certificate validation now available in the GCDN Terminus plugin"
published_date: "2026-08-26"
published_at: "2026-08-26T17:38:39Z"
categories: [tools-apis]
description: "The GCDN Terminus plugin now supports HTTP-01 certificate validation as an alternative to DNS TXT records when verifying domains on the next-generation Global CDN."
---

The [GCDN Terminus plugin](https://github.com/pantheon-systems/terminus-gcdn-plugin) now supports HTTP-01 certificate validation as an alternative to DNS TXT records when verifying domains on the [next-generation Global CDN](/guides/global-cdn/next-gen-global-cdn).

DNS-01 TXT record validation remains the default. If you cannot add TXT records at your DNS provider, you can now verify a domain using HTTP-01 challenges instead:

```bash
terminus gcdn:verify <site>.live <domain> --method=http
```

For full setup steps, see the **Terminus CLI** tab in [Next Generation Global CDN](/guides/global-cdn/next-gen-global-cdn#setup).
