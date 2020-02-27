---
title: Pantheon Global CDN
description: Improve Site Performance and Security with Pantheon's Global CDN.
reviewed: "2020-02-27"
tags: [CDN,security]
categories: [develop]
---

Pantheon's [Global CDN](https://pantheon.io/global-cdn) is a core platform offering, with improved performance and security for customer sites. Content is served from 70+ global **POP**s (Points Of Presence) where site pages and assets are cached, and [HTTPS](/https) certificates are fully managed using [Let's Encrypt](https://letsencrypt.org).

<Enablement title="Agency WebOps Training" link="https://pantheon.io/agencies/learn-pantheon?docs">

Get the most out of Global CDN with help from the experts at Pantheon. We deliver custom workshops to help development teams master the platform and improve internal WebOps.

</Enablement>

## How Does It Work?

Global CDN takes Pantheon's high-performance page and asset caching system (Varnish) and pushes it out globally. Rather than requests coming all the way to our primary datacenter, we terminate HTTPS and serve pages from a location much closer to the end-user. This speeds up the time to render a web-page significantly.

- The Global CDN cache strategy eliminates "cache sharding," in which the same content needs to be cached in separate edge cache instances. This results in higher cache hit rates.

- Global CDN includes interfaces to dynamically expire selected content from the cache, rather than doing a full cache flush. There are basic implementations available as Drupal modules and WordPress plugins, as well as a developer API for implementing custom cache tagging/clearing behavior.

When we first turned on the Global CDN, we saw multi-second speedups in Visual Progress <Popover title="Visual Progress" content="The pace at which content renders on the visible page" /> even within the continental US. International users will benefit even more:

![Example before and after page load time](../images/global-cdn-time-to-load.png)

## Cache Clearing

We recommend installing the Pantheon Advanced Page Cache [plugin](https://wordpress.org/plugins/pantheon-advanced-page-cache/) or [module](https://www.drupal.org/project/pantheon_advanced_page_cache) to take advantage of the granular cache clearing capabilities of the Global CDN. Additionally, you can remove all pages from cache at once from the Site Dashboard, within the Site Admin, and even from the command line.

For more details, see [Clearing Caches for Drupal and WordPress](/clear-caches).

## Frequently Asked Questions

### I already have a CDN - should I switch?

Pantheon's Global CDN has some advantages over solutions some customers may already have in place:

1. It includes [free and automatic HTTPS service](/https)

1. It is heavily optimized for website performance

1. It is configured, maintained, and supported by Pantheon

1. It is available at no additional cost

Even if you want to retain your existing CDN because of specific features they provide, the upgrade will improve your end-user experience, as your custom CDN will be able to pull pages and assets from a nearby Pantheon Global CDN location, rather than the origin datacenter.

### Is the www-redirector service still available?

No, the www-redirector service is part of the legacy infrastructure. You can choose your primary domain and redirect all traffic to HTTPS by adding [301 redirects](/guides/launch/redirects) to your site's configuration file (wp-config.php or settings.php).

### Are vanity domains supported?

You can upgrade a site to Global CDN that is using [vanity domains](/vanity-domains), but HTTPS will not be provisioned for the vanity domains. Only custom domains will have HTTPS provisioned.

### What about Cloudflare?

See [Cloudflare Domain Configuration](/cloudflare).

### Is the CDN configurable?

No, we pre-configured the CDN so you don’t have to hassle with configuration, and we can guarantee performance and uptime. The Global CDN's behavior is the same as our legacy cache which is heavily optimized for Drupal and WordPress sites, and serves billions of pages monthly, except it's globally distributed.

### Do I get access to hit rates or other statistics?

Hit rates are not currently available, but you can measure traffic for the Live environment. For details, see [Metrics in the Site Dashboard](/metrics).

### Can I use other CDNs with the Pantheon Global CDN?

Yes, but because it adds additional complexity, we suggest you only do so if you identify a need that the Pantheon Global CDN doesn't address. We recommend that you ensure you are enforcing HTTPS only at the outer CDN and are assuming HTTPS in the application. Check your CDN for how to redirect all traffic to HTTPS.

### Can I use my own Fastly account with the Pantheon Global CDN?

You can, but as mentioned above you should identify a need for adding additional complexity first. If you're using Fastly TLS services with WordPress, you'll want to check for the `HTTP_FASTLY_SSL` header so that WordPress can build URLs to your CSS and JS assets correctly. Do this by adding the following to `wp-config.php`:

```php:title=wp-config.php
if (!empty( $_SERVER['HTTP_FASTLY_SSL'])) {
  $_SERVER['HTTPS'] = 'on';
}
```

### Can I expose the `Surrogate-Key-Raw` header?

Yes! Expose `Surrogate-Key-Raw` by including `Pantheon-Debug:1` in a curl request, then use `grep` to filter the output. Replace `https://www.example.com/` in the following example:

```bash{promptUser: user}
curl -IsH "Pantheon-Debug:1" https://www.example.com/ | grep surrogate-key-raw
```

![curl -IsH "Pantheon-Debug:1" https://www.scalewp.io/ | grep surrogate-key-raw](../images/surrogate-key-raw-example.png)

To prevent issues with Twitter card validation and to reduce the overall time to load, the `Surrogate-Key-Raw` header is not returned by default. Exposing this header provides context for entities included on a given page.

## Advanced Global CDN

For custom solutions addressing the unique challenges your site build presents, see our [Advanced Global CDN](/advanced-global-cdn) service.
