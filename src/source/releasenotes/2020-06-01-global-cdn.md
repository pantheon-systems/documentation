---
title: Global CDN
published_date: "2020-06-01"
categories: [infrastructure, performance]
---
Global CDN now blocks requests identified as being performed by AspiegelBot (aka PetalBot) when a [query string](https://en.wikipedia.org/wiki/Query_string) is present. This platform-wide change is intended to guard against resource exhaustion and related site downtime. Going forward these requests will result in a 403 and will not count as site traffic for Pages Served and Visits. For more information see [Traffic Limits and Overages](/guides/account-mgmt/traffic).

Capacity Expansion: Auckland, New Zealand (AKL).
