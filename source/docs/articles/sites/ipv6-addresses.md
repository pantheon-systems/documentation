---
title: IPv6 Addresses on Pantheon
description: Detailed information about using IPv6 addresses on Pantheon's Website Management Platform.
category:
  - getting-started
keywords: ipv6, drupal, ipv4 traffic
---

[Internet Protocol version 6](http://en.wikipedia.org/wiki/IPv6) (IPv6) is the latest revision of the Internet Protocol (IP), intended to replace IPv4. IPv6 traffic is expected to reach 2% by the end of 2013 ([source](http://www.circleid.com/posts/20121128_ipv6_a_2012_report_card/)). Pantheon, in an effort to future proof our platform, is in the process of providing IPv6 support. IPv4 will still be supported.

## After the IPv6 Upgrade

If a visitor is using IPv6 accesses your site, `$_SERVER['REMOTE_ADDR']` will return IPv6 addresses (eight groups of four hexadecimal digits separated by colons). IPv4 addresses will still be returned in IPv4 format.  


If you are using SSL and an IPv6 request is received, `$_SERVER['REMOTE_ADDR']` will return the IP address of the load balancer, not of the IPv6 request. This is a [known limitation](/docs/articles/drupal/getting-the-client-ip-address/#known-limitations) that also affects IPv4 traffic.

## Frequently Asked Questions

#### A contrib module that I use for my Drupal site does not support IPv6; how should I proceed?

[Use the issue queue](https://drupal.org/node/317) of the module in question to communicate with the module maintainers.

#### My site site is completely incompatible with IPv6 traffic; how can I force IPv4 traffic?

Use a A DNS record instead of a CNAME DNS record pointing to one of the load-balanced IPv4 IP addresses listed in [going live](/docs/articles/going-live).
