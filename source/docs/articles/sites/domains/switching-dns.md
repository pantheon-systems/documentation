---
title: Switching DNS From One Pantheon Site to Another
description: Learn how to change DNS details between Pantheon sites.
category:
  - developing
keywords: DNS
---
On Pantheon, each environment needs to have its own domain. However, it is possible to switch DNS information between two Pantheon sites. For example, if you have one site that is live, and another that you want to take live to replace the current site (e.g. a redesigned site). This article will help you switch DNS records for your sites.

## Before You Begin


## Determine the New DNS Records
The same domain can't be added to two Pantheon environments at once, so if your Live environment for site 1 has example.com, you'll need to add another domain, such as examplenew.com to the Live env for site 2 to determine your DNS records. Make sure to "Show recommended DNS records" for both the bare domain (examplenew.com) and www.examplenew.com

1. Lower TTL

2. Remove Domain(s) from Site 1

3. Add Domain(s) to Site 2

4. Update DNS Records


## Troubleshooting
