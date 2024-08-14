---
title: Redirects Guide
subtitle: Redirect with PHP
description: Learn how to redirect with PHP.
contenttype: [guide]
innav: [false]
categories: [domains]
cms: [--]
audience: [development]
product: [--]
integration: [--]
tags: [dns, https, redirects]
contributors: [wordsmither]
reviewed: "2022-08-01"
showtoc: true
permalink: docs/guides/redirect/php
---

If your site configuration prevents you from setting the primary domain from the platform level, you can use PHP redirects. However, redirecting the platform domain will break the screenshot of your site in the Personal Workspace, and might complicate troubleshooting for our [Support](/guides/support/contact-support/) team.

AGCDN only works with custom domains. This means that `.pantheonsite.io` domains are not covered. With AGCDN, a site will not be fully protected under WAF if it is using the platform domain. A platform domain redirect to the main domain is recommended.

<Partial file="_redirects.md" />

## Redirect Platform Domains (`.pantheonsite.io`)
We do not recommend redirecting away from [platform domains](/guides/domains/platform-domains), especially on Live production environments, as it restricts our ability to provide support for scenarios where 3rd party services are utilized prior to the domain resolving to Pantheon (e.g., you're stacking your own custom CDN service on top of Pantheon's infrastructure). 

## Convert Multiple `.htaccess` Redirects and Rewrites to PHP
If you need to convert a large number of `.htaccess` redirects or rewrites to PHP, feel free to utilize our [free script](https://github.com/Pantheon-SE/pantheon-htaccess-rewrites) for both WordPress and Drupal. You can also do more [advanced redirects with PHP](/guides/redirect/advanced).
