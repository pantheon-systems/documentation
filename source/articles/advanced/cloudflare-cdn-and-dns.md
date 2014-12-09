---
title: CloudFlare CDN and DNS on Pantheon
category:
  - optimizing
filename: source/_guides/cloudflare-cdn-and-dns-on-pantheon.md
---

## Overview

[CloudFlare](https://www.cloudflare.com) is awesome and we highly recommend them. Here's a list of benefits:

- A hybrid [Content Delivery System](/documentation/advanced-topics/content-delivery-network-cdn-for-file-distribution/) (CDN) & DNS host, providing your website to visitors around the world faster from multiple locations.
- CloudFlare's optimizer enables your site to load faster through asynchronous resource loading, browser optimization, and caching.
- Provides an impressive security layer shielding your site from malicious scripts, DDOS attacks, and other internet evils.

This article will help you set up a site on CloudFlare.


## Before You Begin

Be sure that you have:

- A registered domain name
- The ability to modify your domain's nameservers
- [A paid Pantheon plan](/documentation/howto/selecting-a-plan/)

## CloudFlare Setup

1. Sign up for a [CloudFlare account](https://www.cloudflare.com/sign-up).
2. Enter your domain name. CloudFlare will scan your current nameservers for all the DNS records applicable to your domain and display a list of all the DNS records it finds.
3. Go to your Dashboard and verify that the three DNS records listed were found by CloudFlare.
4. In CloudFlare, select the plan level you want to subscribe to. Select a paid plan if you want SSL support.
5. Update your domain's nameservers with your domain name registrar. If you need help, check their site for instructions or contact their support department.
6. Once you've updated your nameservers, return to CloudFlare to finish the setup process.

## Test CloudFlare

Using either your browser's inspection interface/developer tools or a utility to view the headers for your site, look for the _Set-Cookie_ header and check that you have a _\_\_cfduid=_ keypair set. This indicates CloudFlare served the page.

If you don't see the _\_\_cfduid=_ keypair, check that you're loading a URL that's been enabled in CloudFlare, and that you're viewing the page anonymously (logged out of your site's admin account).

## Drupal Modules

In Drupal, no modules are required to use CloudFlare, but there is an optional [CloudFlare contrib module](https://drupal.org/project/cloudflare) that provides integration with CloudFlare's API from within your Drupal site.

## Known Limitations

Drupal: CloudFlare's JavaScript Aggregation can cause problems when using Drupal's JavaScript Aggregation. Choose one or the other, but not both.

Caching: Pantheon's Varnish cache is not synchronized with CloudFlare's cache, and CloudFlare's cache expiration settings are independent of your site's cache expirations. If you need to clear all caches, you'll need to clear both the cache from your site dashboard, then clear CloudFlare's cache.

Railgun: At this time, CloudFlare Railgun is not available on Pantheon.
