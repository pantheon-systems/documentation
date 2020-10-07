---
title: Frontend Performance 
subtitle: Redirects
description: desc
anchorid: redirects
layout: guide
categories: [performance]
tags: [measure, traffic]
type: guide
permalink: docs/guides/frontend-performance/redirects/
editpath: frontend-performance/09-redirects.md
image: CDN-speedTest-docs-guide
reviewed: "2020-10-10"
---

Redirection.

## Avoid Redirects
A redirect will add at least one extra HTTP request-response cycle. As a result, eliminating extraneous redirects can make your website more snappy. Despite your best efforts it still may be necessary to include the occasional [redirect to a primary domain](/guides/launch/redirects) using HTTPS with or without the WWW.

Other considerations:

- A DNS service provider such as [Cloudflare](https://support.cloudflare.com/hc/en-us/articles/200170536-How-do-I-redirect-all-visitors-to-HTTPS-SSL-) may allow speedier redirects in some circumstances, but it’s still faster not to redirect at all.
- Avoid several chained redirects that make small changes such as redirecting to HTTPS, adding or removing WWW, or adding a trailing slash. Instead, [redirect to a primary domain](/guides/launch/redirects) that has all of these standardized.
- Pantheon doesn’t read changes to the `.htaccess` file or support NGINX customization, so redirections via those methods will not work. For details, see [Configure Redirects](/redirects/#php-vs-htaccess).


## Mobile redirection

To prevent the need for mobile redirects, avoid mobile-specific subdomains and use responsive web design techniques.
