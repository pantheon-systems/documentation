---
title: "Global CDN Surrogate-Key-Raw Disabled by Default"
published_date: "2018-03-01"
categories: [infrastructure, performance]
---
The `Surrogate-Key-Raw` header, used for debugging when using [Pantheon Advanced Page Cache](https://pantheon.io/features/advanced-caching),  is no longer sent by default.  To receive this header when making a request, send the `Pantheon-Debug: 1` header, like so:

```bash
curl -IsH "Pantheon-Debug:1" https://example.com | grep key
```

This change addressed an issue that caused Twitter card validation to fail, and also reduces overall page size and speeds up page load time when sending many keys.
