---
title: Getting the Client IP Address
description: Set up geolocation capabilities on your site.

category:
  -
---
## Overview

There are two ways to get the client IP address if you are running Drupal on Pantheon:

1. Use the system environment variable `$_SYSTEM["REMOTE_ADDR"]`. One benefit is that on Pantheon this takes into account if the `X-Forwarded-For` header is sent in cases when a request is filtered by a proxy.
2. Use Drupal’s `ip_address()` function. The function leverages the `$_SYSTEM["REMOTE_ADDR"]` variable to get the client IP, as well as parse other meta information like the remote proxy IP (if available), trim the forwarded IPs if they contain any additional commas or spaces, and filter out any untrusted IPs.

**Note**: This is not foolproof, as clients may visit your site or application through a proxy that does not specify the correct headers. Therefore, be aware that this is not 100% reliable.

## When to Use the Remote Address

This is useful if you need geolocation capabilities on your application. For example, if you want to display the weather to a user for their region, you can use the client IP address to determine their location and show the weather for their city or region.

Alternatively, if you want to restrict content from displaying in certain geographic regions, you can use the client’s IP address to filter the content that is displayed.

We offer various methods for you to interact with your Pantheon site, so it is important to understand which traffic entry methods will return a valid client IP address, as it is passed to the Pantheon hosted site.

## Known Limitations

Pantheon sites using SSL for HTTPS traffic will not be able to reliably determine in PHP the client's IP address using `$_SYSTEM["REMOTE_ADDR"]` or call Drupal's `ip_address` function.

The "real" client IP is lost at the primary load balancer because it’s operating in layer4/tcp-only mode. It passes the encrypted connection opaquely to the back-end SSL server binding (nginx), which performs SSL termination. Unfortunately at that point, the client IP represents the loadbalancer.  


IP-based security schemes are not recommended. However, services such as geolocation are highly valuable, so as a workaround, [JavaScript can be used to determine both the client's location and IP](common-tasks/geolocation-and-ip-detection-with-ssl-using-javascript), even over SSL.

## Troubleshooting

#### Spam and Failed Logins

Drupal manages the thresholds for spam and flood detection using configuration variables you can set via settings.php. There are also modules such as [flood control](https://drupal.org/project/flood_control) that will give you more flexibility and allow you to manage the thresholds via the Drupal admin.
