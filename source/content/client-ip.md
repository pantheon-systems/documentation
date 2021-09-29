---
title: Getting the Client IP Address
description: Getting the client IP address to set up geolocation capabilities on your Pantheon site.
categories: [develop]
tags: [cdn]
reviewed: "2020-03-09"
---

<Alert title="Warning" type="danger">

This page was written before the [Pantheon Global CDN](/global-cdn) was launched for all customers. Now that all traffic runs through a CDN endpoint and is cached when possible, the methods below are no longer an accurate way to geolocate your traffic.

If geolocation is a requirement for your site, consider an [Advanced Global CDN](/guides/professional-services/advanced-global-cdn) configuration, or a third party geo-aware edge, like Cloudflare.

</Alert>

There are two ways to get the client IP address if you are running Drupal on Pantheon:

1. Use the system environment variable `$_SERVER["REMOTE_ADDR"]`. One benefit is that on Pantheon this takes into account if the `X-Forwarded-For` header is sent in cases when a request is filtered by a proxy.

1. Use Drupal’s `ip_address()` function. The function leverages the `$_SERVER["REMOTE_ADDR"]` variable to get the client IP, as well as parse other meta information like the remote proxy IP (if available), trim the forwarded IPs if they contain any additional commas or spaces, and filter out any untrusted IPs.

<Alert title="Note" type="info">

This is not foolproof, as clients may visit your site or application through a proxy that does not specify the correct headers. Therefore, be aware that this is not 100% reliable.

</Alert>

## When to Use the Remote Address

This is useful if you need geolocation capabilities on your application. For example, if you want to display the weather to a user for their region, you can use the client IP address to determine their location and show the weather for their city or region.

Alternatively, if you want to restrict content from displaying in certain geographic regions, you can use the client’s IP address to filter the content that is displayed.

We offer various methods for you to interact with your Pantheon site, so it is important to understand which traffic entry methods will return a valid client IP address, as it is passed to the Pantheon hosted site.

## Troubleshooting

### Cloudflare

When using Cloudflare as a stacked CDN or proxy, use the variable `$_SERVER["HTTP_CF_CONNECTING_IP"]` instead of `$_SERVER["REMOTE_ADDR"]`. 

#### Geolocation with Cloudflare
For geolocation, [enable geolocation](https://support.cloudflare.com/hc/en-us/articles/200168236-Configuring-Cloudflare-IP-Geolocation) on the Cloudflare dashboard. The country code value is passed along in the `CF-IPCountry` request header to the origin web server.

Any PhP reading `CF-IPCountry` values should also add `Vary: CF-IPCountry` to responses to ensure Pantheon's Global CDN properly personalizes cache hits. This will ensure cache behavior is both correct (content returned for the user agent's actual location) and efficient (cache can hit for other requests coming from the same country)

#### Drupal 7 Domain Access module with Cloudflare

When using Cloudflare in combination with the Domain Access module on Drupal 7, the user's IP address will get cached by the `ip_address()` function incorrectly, early during the bootstrap process. To correct this you can add the following code block to your `settings.php` file, above where you include the Domain Access module's `settings.inc` file:

```php:title=settings.php
if (!empty($_SERVER['HTTP_CF_CONNECTING_IP'])) {
  $_SERVER['REMOTE_ADDR'] = $_SERVER['HTTP_CF_CONNECTING_IP'];
  $_SERVER['HTTP_X_FORWARDED_FOR'] = ", {$_SERVER['REMOTE_ADDR']}";
  ip_address();
}
```

### Spam and Failed Logins

Drupal manages the thresholds for spam and flood detection using configuration variables you can set via settings.php. There are also modules such as [flood control](https://drupal.org/project/flood_control) that will give you more flexibility and allow you to manage the thresholds via the Drupal admin.
