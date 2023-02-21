---
title: WordPress Plugins and Themes with Known Issues
subtitle: G Plugins
description: A list of WordPress plugins beginning with G that are not supported and/or require workarounds.
tags: [plugins, themes, code]
categories: [help]
newcms: [wordpress]
audience: [development]
product: [--]
integration: [--]
reviewed: "2022-03-24"
contenttype: [guide]
layout: guide
showtoc: true
permalink: docs/guides/wp-plugins-themes-known-issues/directory/g-plugins
anchorid: g-plugins
---

## GDPR Cookie Consent

<ReviewDate date="2020-02-20" />

**Issue:** The [GDPR Cookie Consent](https://wordpress.org/plugins/cookie-law-info/) plugin sends two `set-cookie` headers in each response, which breaks caching on Pantheon's Global CDN. For example:

```bash{outputLines: 2-20}
curl -I https://www.example.com
HTTP/2 200
cache-control: public, max-age=600
content-type: text/html; charset=UTF-8
server: nginx
//highlight-start
set-cookie: cookielawinfo-checkbox-necessary=yes; expires=Thu, 20-Feb-2020 17:31:51 GMT; Max-Age=3600; path=/
set-cookie: cookielawinfo-checkbox-non-necessary=yes; expires=Thu, 20-Feb-2020 17:31:51 GMT; Max-Age=3600; path=/
//highlight-end
x-pantheon-styx-hostname: styx-fe1-a-789d66bff9-tztp6
x-styx-req-id: 7f93c166-53fe-11ea-803e-b26d7703e33f
date: Thu, 20 Feb 2020 16:31:51 GMT
x-served-by: cache-mdw17379-MDW, cache-chi21146-CHI
x-cache: MISS, MISS
x-cache-hits: 0, 0
x-timer: S1582216311.492451,VS0,VE204
vary: Accept-Encoding, Cookie, Cookie
age: 0
accept-ranges: bytes
via: 1.1 varnish
```

**Solution:** Several users have reported that [upgrading to the premium version of this plugin](https://www.webtoffee.com/product/gdpr-cookie-consent/) and disabling the included script blocker fixed the issue. For additional support, work with the plugin maintainers and review [related documentation for the premium version](https://www.webtoffee.com/cache-plugin-compatibility/).

___
