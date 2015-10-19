---
title: CloudFlare CDN and DNS on Pantheon
description: Learn how to setup and test CloudFlare CDN on your Pantheon Drupal or WordPress site.
category:
  - developing
  - drupal
keywords: cloudflare cdn, cloudfare, cdn, dns, cdn dns, cloudflare dns, domains with cdns, configure cloudflare, configure cdn, dns host, security, performance
---
[CloudFlare](https://www.cloudflare.com) is awesome and we highly recommend them. Here's a list of benefits:

- A hybrid [Content Delivery System](/docs/articles/drupal/content-delivery-network-cdn-for-file-distribution/) (CDN) & DNS host, providing your website to visitors around the world faster from multiple locations.
- CloudFlare's optimizer enables your site to load faster through asynchronous resource loading, browser optimization, and caching.
- Provides an impressive security layer shielding your site from malicious scripts, DDOS attacks, and other internet evils.


## Before You Begin

Be sure that you have:

- A registered domain name
- The ability to modify your domain's nameservers
- [A paid Pantheon plan](/docs/articles/sites/settings/selecting-a-plan)

## CloudFlare Setup

1. Sign up for a [CloudFlare account](https://www.cloudflare.com/sign-up).
2. Enter your domain name. CloudFlare will scan your current nameservers for all DNS records applicable to your domain and list the results.
3. Verify all DNS records provided in the site's Dashboard were found by CloudFlare.
4. In CloudFlare, select the plan level you want to subscribe to.
5. Update nameservers at your domain's registrar.
6. Return to CloudFlare to finish the setup process.

## Test CloudFlare

Using either your browser's inspection interface/developer tools or a utility to view the headers for your site, look for the `Set-Cookie` header and check that you have a `__cfduid=` keypair set. This indicates CloudFlare served the page.

If you don't see the `__cfduid=` keypair, check that you're loading a URL that's been enabled in CloudFlare, and that you're viewing the page anonymously (logged out of your site's admin account).

## Drupal Modules

In Drupal, no modules are required to use CloudFlare, but there is an optional [CloudFlare contrib module](https://drupal.org/project/cloudflare) that provides integration with CloudFlare's API from within your Drupal site.

## WordPress Plugins

[The CloudFlare WordPress Plugin](https://wordpress.org/plugins/cloudflare/) is not required to use the CDN on your site. However, since CloudFlare works as a reverse proxy, connecting IP addresses will appear as CloudFlare IPs. This plugin's main function is to preserve the originating IP address for comments posted to your WordPress site.

## Known Limitations

**Drupal**: CloudFlare's JavaScript Aggregation can cause problems when using Drupal's JavaScript Aggregation. Choose one or the other, but not both.

**Caching**: Pantheon's Varnish cache is not synchronized with CloudFlare's cache, and CloudFlare's cache expiration settings are independent of your site's cache expirations. If you need to clear all caches, clear the cache from your Site Dashboard and clear CloudFlare's cache.

**Railgun**: At this time, CloudFlare Railgun is not available on Pantheon.

**Rocket Loader**: This has the potential to break some JavaScript and jQuery functions as a beta feature, and we recommend disabling it in CloudFlare.


## FAQs

**Why isn't JavaScript or jQuery working on my site?**

If your JS files are not loading, check Firebug to see if one of your links shows the following error:

```
MIME-Version: 1.0
Content-Type: multipart/mixed; boundary="qA7D'DGwpMH,)x"

--qA7D'DGwpMH,)x
X-Cf-Url: http://www.domain.com/sites/all/modules/admin_menu/admin_menu.js?nvql2t
X-Cf-Status: 403
Content-Transfer-Encoding: binary
X-Cf-Max-Age: 7200
X-Cf-Origin-Status: 403
X-Cf-Cache-Status: EXPIRED
Content-Type: text/html; charset=UTF-8
X-Cf-Error: true
```
