---
title: CloudFlare CDN and DNS on Pantheon
parent_guide:
  - optimizing
filename: source/_guides/cloudflare-cdn-and-dns-on-pantheon.md
---

## Summary & Contents

[CloudFlare](https://www.cloudflare.com) is awesome and we highly recommend them. Here's a summary list of the benefits:

- A hybrid [Content Delivery System](/documentation/advanced-topics/content-delivery-network-cdn-for-file-distribution/) (CDN) & DNS host, providing your website to visitors around the world faster from multiple locations.
- CloudFlare's optimizer enables your site to load faster through asynchronous resource loading, browser optimization, and caching.
- Provides an impressive security layer shielding your site from malicious scripts, DDOS attacks, and other internet evils.

This guide illustrates setting up a site on CloudFlare.

- Prerequisites
- CloudFlare Setup
- Testing
- Miscellaneous
- Known Limitations

## Prerequisites

- A registered domain name
- Ability to modify your domain's nameservers
- [A paid Pantheon plan](/documentation/howto/selecting-a-plan/)

## CloudFlare Setup

Sign up for a [CloudFlare account:](https://www.cloudflare.com/sign-up)

![](https://pantheon-systems.desk.com/customer/portal/attachments/265382)​

Enter your domain name:

![](https://pantheon-systems.desk.com/customer/portal/attachments/265386)​

CloudFlare will scan your current nameservers for all the DNS records applicable to your domain, this will take a few minutes, then you'll be able to continue:

![](https://pantheon-systems.desk.com/customer/portal/attachments/265395)​

CloudFlare will display a list of all the DNS records it found:

![](https://pantheon-systems.desk.com/customer/portal/attachments/265398)​

There's three records that you'll need to verify are in the list, you can find them in your dashboard:

![](https://pantheon-systems.desk.com/customer/portal/attachments/265404)​

Then you'll select the CloudFlare plan level you want to subscribe to, if you want SSL support you'll need to select a paid plan:

![](https://pantheon-systems.desk.com/customer/portal/attachments/265414)​

At this point you'll need to update your domain's nameservers. This isn't done on CloudFlare or Pantheon's website, this is done with your domain name registrar; check their documentation or with their support department if you can't find the steps.

Once you've updated your nameservers, return to CloudFlare's site & finish the setup process. Feel free to explore their dashboard as CloudFlare has many options that may suit your particular use case.

![](https://pantheon-systems.desk.com/customer/portal/attachments/266054)​

## Testing

Now that you have CloudFlare setup, you'll want to test that it's working as expected. Using either your browser's inspection interface / developer tools or a utility to view the headers for your site, look for the _Set-Cookie_ header and check that you have a _\_\_cfduid=_ keypair that's set. This indicates CloudFlare served the page!

![](https://pantheon-systems.desk.com/customer/portal/attachments/269948)​

If you don't see the _\_\_cfduid=_ keypair, check that you're loading a URL that's been enabled in CloudFlare, and that you're viewing the page anonymously e.g. logged out of your site's admin interface.

## Miscellaneous

Drupal: No modules are required to use CloudFlare, but there is an optional  [CloudFlare contrib module](https://drupal.org/project/cloudflare) that provides integration with CloudFlare's API from within your Drupal site.

## Known Limitations

Drupal: CloudFlare's JavaScript Aggregation can cause unexpected results when using Drupal's JavaScript Aggregation. Choose one or the other, but not both.

Pantheon's Varnish cache is not synchronized with CloudFlare's cache, and CloudFlare's cache expiration settings are independent of your site's cache expirations. Therefore, if you need to clear all caches, you will need to clear both the cache from your site or Pantheon's dashboard, then clear CloudFlare's cache.

At this time, CloudFlare Railgun is not available on Pantheon.
