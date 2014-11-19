---
title: Getting the Client IP address
filename: source/_common-tasks/getting-the-client-ip-address.md
---

There are occasions when you may need to get the remote address of the client requesting resources from your application.

There are two ways of getting the client IP address of requests if you are running Drupal on Pantheon:

1. System environment variable `$_SYSTEM["REMOTE_ADDR"]`. One benefit is that on Pantheon this takes into account if the `X-Forwarded-For` header is sent in cases when a request is filtered by a proxy.
2. Use Drupal’s `ip_address()` function. The function leverages the `$_SYSTEM["REMOTE_ADDR"]` variable to get the client IP as well as parse other meta information like the remote proxy I.P (if available), trims the forwarded IPs if they contain any additional commas or spaces and filter out any untrusted IPs.

When planning your strategy for remote address parsing it is important to note that this is not foolproof as clients may visit your site or application through a proxy that does not specify the correct headers. 

Therefore, be aware that this is not 100% reliable.

## When to use the remote address

This is useful if you need capabilities such as geo-location for your application, when you want to display the weather to a user for their region based on their remote address. You could use the client IP address to determine their location and then show them the weather for their city or region.

Alternatively if you wanted to restrict content to displaying in certain geographic regions you could use the client’s I.P address to filter the content that is displayed.

We offer various methods for you to interact with your Pantheon site, so it is important to understand which traffic entry methods will return a valid client IP address as it is passed to the Pantheon hosted site.

## Known Limitations

Currently, Pantheon sites using SSL for HTTPS traffic, you will not be able to reliably determine in PHP the client's IP address using `$_SYSTEM["REMOTE_ADDR"]` or call Drupal's `ip_address` function.

The "real" client IP is lost at the primary loadbalancer because it’s operating in layer4/tcp-only mode. It passes the encrypted connection opaquely to the back-end sslserver binding (nginx), which performs SSL termination. Unfortunately at that point, the client IP represents the loadbalancer.  


IP-based security schemes are not recommended. However, services such as Geolocation are highly valuable, so as a workaround, [JavaScript can be used to determine both the client's location and IP](/documentation/advanced-topics/geolocation-and-ip-detection-with-ssl-using-javascript/), even over SSL.

## Troubleshooting

### Dealing with Spam and Failed logins

Drupal manages the thresholds for spam and flood detection using configuration variables you can set via settings.php. There are also modules such as flood control that will give you more flexibility and allow you to manage the thresholds via the Drupal admin.

[https://drupal.org/project/flood\_control](https://drupal.org/project/flood_control)
