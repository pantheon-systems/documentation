---
title: Cloudflare CDN and DNS on Pantheon
description: Set up and test Cloudflare CDN on your Pantheon Drupal or WordPress site.
tags: [cacheedge, siteintegrations]
categories: []
---
[Cloudflare](https://www.cloudflare.com) is awesome and we highly recommend them. Here's a list of benefits:

- A hybrid [Content Delivery System](/docs/content-delivery-network/) (CDN) & DNS host, providing your website to visitors around the world faster from multiple locations.
- Cloudflare's optimizer enables your site to load faster through asynchronous resource loading, browser optimization, and caching.
- Provides an impressive security layer shielding your site from malicious scripts, DDOS attacks, and other internet evils.


## Before You Begin

Be sure that you have:

- A registered domain name
- The ability to modify your domain's nameservers
- [A paid Pantheon plan](/docs/select-plan)

## Cloudflare Setup

1. Sign up for a [Cloudflare account](https://www.cloudflare.com/sign-up).
2. Enter your domain name. Cloudflare will scan your current nameservers for all DNS records applicable to your domain and list the results.
3. Verify all DNS records provided in the site's Dashboard were found by Cloudflare.
4. In Cloudflare, select the plan level you want to subscribe to.
5. Update nameservers at your domain's registrar.
6. Return to Cloudflare to finish the setup process.

## Test Cloudflare

Using either your browser's inspection interface/developer tools or a utility to view the headers for your site, look for the `Set-Cookie` header and check that you have a `__cfduid=` keypair set. This indicates Cloudflare served the page.

If you don't see the `__cfduid=` keypair, check that you're loading a URL that's been enabled in Cloudflare, and that you're viewing the page anonymously (logged out of your site's admin account).

## Drupal Modules

In Drupal, no modules are required to use Cloudflare, but there is an optional [Cloudflare](https://drupal.org/project/cloudflare) contrib module that provides integration with Cloudflare's API from within your Drupal site.

## WordPress Plugins

[The Cloudflare WordPress Plugin](https://wordpress.org/plugins/cloudflare/) is not required to use the CDN on your site. However, since Cloudflare works as a reverse proxy, connecting IP addresses will appear as Cloudflare IPs. This plugin's main function is to preserve the originating IP address for comments posted to your WordPress site.

## Advanced Settings: Page Rules
Page Rules let you control which Cloudflare settings trigger on a given URL. Only one Page Rule will trigger per URL, so it is helpful if you sort Page Rules in priority order, and make your URL patterns as specific as possible.

### Always use HTTPS

If you choose to enable Cloudflare's HTTPS certificate as described in
[Adding HTTPS For Free With Cloudflare](https://pantheon.io/docs/guides/cloudflare-enable-https/), you can create a page rule to redirect all your traffic to HTTPS.

![Example Always HTTPS](/source/docs/assets/images/cloudflare-always-https2.png)

### Increase security level for a section of the site

The site's `/admin`, `/wp-admin` or `/user` section may require an increased level of security against potential attackers. This can be achieved using a Page Rule as well. In the example below, everything under `/user` (notice the wildcard which includes anything after` /user`; e.g. `/user/1` or `/user/1/edit` will also match) has an increased security level. You can also decide to bypass the Cloudflare cache although this won't impact Pantheon's edge cache.

![Example Increased Security](/source/docs/assets/images/cloudflare-secure-url.png)

### Always Online

In the unlikely event of a backend failure, you can configure Cloudflare to continue serving pages from its local cache. The Page Rule settings are found below. As an added security feature, you can add an option to obfuscate email addresses. You and your users will be able to see the email address but the robots/bots will not.

![Example Always online](/source/docs/assets/images/cloudflare-always-online.png)

## Known Limitations

**Drupal**: Cloudflare's JavaScript Aggregation can cause problems when using Drupal's JavaScript Aggregation. Choose one or the other, but not both.

**Caching**: Pantheon's Varnish cache is not synchronized with Cloudflare's cache, and Cloudflare's cache expiration settings are independent of your site's cache expirations. If you need to clear all caches, clear the cache from your Site Dashboard and clear Cloudflare's cache.

**Railgun**: At this time, Cloudflare Railgun is not available on Pantheon.

**Rocket Loader**: This has the potential to break some JavaScript and jQuery functions as a beta feature, and we recommend disabling it in Cloudflare.


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
