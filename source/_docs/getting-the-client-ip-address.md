---
title: Getting the Client IP Address
description: Getting the Client IP Address to set up geolocation capabilities on your site.
category:
  - developing
keywords: drupal, IP, client IP address, geolocation
---
There are two ways to get the client IP address if you are running Drupal on Pantheon:

1. Use the system environment variable `$_SYSTEM["REMOTE_ADDR"]`. One benefit is that on Pantheon this takes into account if the `X-Forwarded-For` header is sent in cases when a request is filtered by a proxy.
2. Use Drupal’s `ip_address()` function. The function leverages the `$_SYSTEM["REMOTE_ADDR"]` variable to get the client IP, as well as parse other meta information like the remote proxy IP (if available), trim the forwarded IPs if they contain any additional commas or spaces, and filter out any untrusted IPs.
<div class="alert alert-info" role="alert">
<h4>Note</h4>
This is not foolproof, as clients may visit your site or application through a proxy that does not specify the correct headers. Therefore, be aware that this is not 100% reliable.
</div>

## When to Use the Remote Address

This is useful if you need geolocation capabilities on your application. For example, if you want to display the weather to a user for their region, you can use the client IP address to determine their location and show the weather for their city or region.

Alternatively, if you want to restrict content from displaying in certain geographic regions, you can use the client’s IP address to filter the content that is displayed.

We offer various methods for you to interact with your Pantheon site, so it is important to understand which traffic entry methods will return a valid client IP address, as it is passed to the Pantheon hosted site.

## Troubleshooting

#### Spam and Failed Logins

Drupal manages the thresholds for spam and flood detection using configuration variables you can set via settings.php. There are also modules such as [flood control](https://drupal.org/project/flood_control) that will give you more flexibility and allow you to manage the thresholds via the Drupal admin.
