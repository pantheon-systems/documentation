---
title: Configure Redirects
description: Review considerations and recommendations on how to handle redirect logic via Primary Domains or PHP.
categories: [go-live]
tags: [dns, https, redirects]
reviewed: "2020-02-12"
---

This page describes how to configure domain redirects with the Primary Domain setting, and page-level redirects within `settings.php` ([Drupal](/settings-php)) or `wp-config.php` ([WordPress](/wp-config-php)), adjusting placeholder values within snippets as needed (e.g., `example.com`).

## Considerations

### htaccess

Pantheon does not support managing redirects in `.htaccess` files, since they are ignored by [NGINX](https://www.nginx.com/resources/wiki/#) for reduced resource consumption and increased efficiency. This configuration is standard across all Pantheon sites, and modifications to the `nginx.conf` file are not supported.

Using `.htaccess` is generally not recommended - even for sites running [Apache](https://httpd.apache.org/docs/trunk/howto/htaccess.html#when). Instead, we suggest handling domain-level redirects by [setting a primary domain](#set-a-primary-domain-via-the-dashboard), and handling page-level redirects in PHP within your site's configuration file.

Advantages of redirecting via  Primary Domain + PHP instead of `.htaccess` include:

- Logic and decisions can be made that a web server would have no context for, as it's executable code with application state awareness. Conditional logic, regular expressions, and much more are possible.
- Configuration tends to be more maintainable as Drupal and WordPress developers are typically more familiar with PHP than Apache rewrite rules.
- Since `settings.php` and `wp-config.php` are parsed very early in the bootstrap process, redirects like this are "cheap" with low overhead. If you use a 301 redirect, the [Pantheon Global CDN](/global-cdn) will cache it as well.

### Avoid Excessive Redirects

When using multiple snippets, be sure to step through the logic. This is particularly important when redirecting to a common domain while also incorporating redirects for specific pages. All `if` conditional statements need to be in the correct order. For example, a wholesale redirect executed *prior* to redirects for specific pages would likely prevent the second statement from being evaluated.

## Redirect to HTTPS

The standard best practice when using HTTPS is to set an [HSTS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security) header to force connections over HTTPS only.

These redirect configuration are considered best practice and recommended as part of the going live procedure. Configure these settings after connecting a custom domain in the Site Dashboard when you're ready to launch the site.

### Set HSTS with Pantheon.yml

This is the preferred method of setting HTTPS & HSTS for your site. Find the `enforce_https` setting in your site's [pantheon.yml](/pantheon-yml) file.

<Partial file="hsts.md" />

## Set the Primary Domain

<Partial file="primary-domain.md" />

<Partial file="remove-primary-domain.md" />

## Redirect with PHP

If your site configuration prevents you from setting the primary domain from the platform level, you can use PHP redirects. Note that redirecting the platform domain will break the screenshot of your site in the User Dashboard, and may complicate troubleshooting for our [Support](/guides/support/contact-support/) team.

<Partial file="_redirects.md" />

### Convert Multiple `.htaccess` Redirects and Rewrites to PHP
If you need to convert a large number of `.htaccess` redirects or rewrites to PHP, feel free to utilize our [free script](https://github.com/Pantheon-SE/pantheon-htaccess-rewrites) for both WordPress and Drupal.

## Additional Redirects

For additional redirect examples to fit the custom requirements of your site, see [Advanced Redirects](/advanced-redirects).

## See Also

- [Configuring Settings.php](/settings-php)
- [Configuring wp-config.php](/wp-config-php)
- [Platform and Custom Domains](/domains)
- [Launch Essentials](/guides/launch)
- [Relaunch Existing Pantheon Site](/relaunch)
