---
title: Redirects Guide
subtitle: Introduction
description: Learn how to redirect sites on Pantheon.
categories: [go-live]
tags: [dns, https, redirects]
layout: guide
contributors: [wordsmither]
reviewed: "2022-08-01"
permalink: docs/guides/redirect
anchorid: redirect
---

This guide provides information on how to:

- [Configure domain redirects](/guides/redirect/https/)

- Use [advanced configuration](/guides/redirect/advanced) options

- Use [Cloudflare for mobile configuration](/guides/redirect/mobile) 

Before getting started, keep in mind the following considerations:

## htaccess

Pantheon does not support managing redirects in `.htaccess` files, because they are ignored by [nginx](https://www.nginx.com/resources/wiki/#) for reduced resource consumption and increased efficiency. This configuration is standard across all Pantheon sites, and modifications to the `nginx.conf` file are not supported.

Using `.htaccess` is generally not recommended - even for sites running [Apache](https://httpd.apache.org/docs/trunk/howto/htaccess.html#when). Instead, we suggest handling domain-level redirects by [setting a primary domain](#set-a-primary-domain-via-the-dashboard), and handling page-level redirects in PHP within your site's configuration file.

Advantages of redirecting via  Primary Domain + PHP instead of `.htaccess` include:

- Logic and decisions can be made that a web server would have no context for, as it is executable code with application state awareness. Conditional logic, regular expressions, and much more are possible.

- Configuration tends to be more maintainable as Drupal and WordPress developers are typically more familiar with PHP than Apache rewrite rules.

- Because `settings.php` and `wp-config.php` are parsed very early in the bootstrap process, redirects like this are "cheap" with low overhead. If you use a 301 redirect, the [Pantheon Global CDN](/guides/global-cdn) will cache it as well.

## Avoid Excessive Redirects

When using multiple snippets, be sure to step through the logic. This is particularly important when redirecting to a common domain while also incorporating redirects for specific pages. All `if` conditional statements need to be in the correct order. For example, a wholesale redirect executed *prior* to redirects for specific pages would likely prevent the second statement from being evaluated.

## More Resources

- [Configuring Settings.php](/settings-php)
- [Configuring wp-config.php](/wp-config-php)
- [Platform and Custom Domains](/domains)
- [Launch Essentials](/guides/launch)
- [Relaunch Existing Pantheon Site](/relaunch)
