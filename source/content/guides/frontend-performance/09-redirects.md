---
title: Frontend Performance
subtitle: Redirects
description: Avoiding unnecessary redirects to optimize site performance.
anchorid: redirects
categories: [performance]
tags: [measure, traffic]
type: guide
layout: guide
showtoc: true
permalink: docs/guides/frontend-performance/guides/redirect/
editpath: frontend-performance/09-redirects.md
image: CDN-speedTest-docs-guide
reviewed: "2020-10-10"
---

## Avoid Redirects

<<<<<<< HEAD
A redirect will add at least one extra HTTP request-response cycle. As a result, eliminating extraneous redirects can make your website more snappy. Despite your best efforts it still may be necessary to include the occasional [redirect to a primary domain](/guides/launch/redirects) using HTTPS with or without the `www`.
=======
A redirect will add at least one extra HTTP request-response cycle. As a result, eliminating extraneous redirects can make your website more snappy. Despite your best efforts it still may be necessary to include the occasional [redirect to a primary domain](/guides/launch/redirect) using HTTPS with or without the `www`.
>>>>>>> 1a0fee07ec7755cba82508f5412c59115b2f8890

Other considerations:

- A DNS service provider such as [Cloudflare](https://support.cloudflare.com/hc/en-us/articles/200170536-How-do-I-redirect-all-visitors-to-HTTPS-SSL-) may allow speedier redirects in some circumstances, but it’s still faster not to redirect at all.
<<<<<<< HEAD
- Avoid several chained redirects that make small changes such as redirecting to HTTPS, adding or removing WWW, or adding a trailing slash. Instead, [redirect to a primary domain](/guides/launch/redirects) that has all of these standardized.
=======
- Avoid several chained redirects that make small changes such as redirecting to HTTPS, adding or removing WWW, or adding a trailing slash. Instead, [redirect to a primary domain](/guides/launch/redirect/) that has all of these standardized.
>>>>>>> 1a0fee07ec7755cba82508f5412c59115b2f8890
- Pantheon doesn’t read changes to the `.htaccess` file or support NGINX customization, so redirections via those methods will not work. For details, see [Configure Redirects](/guides/redirect).

## Mobile redirection

To prevent the need for mobile redirects, avoid mobile-specific subdomains and use responsive web design techniques.
