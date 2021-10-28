---
title: Pantheon Global CDN
description: Improve Site Performance and Security with Pantheon's Global CDN.
reviewed: "2020-02-27"
categories: [performance]
tags: [cache, cdn, launch, security]
---

Pantheon's [Global CDN](https://pantheon.io/features/global-cdn) is a core platform offering, with improved performance and security for customer sites. Tap into powerful and strategically distributed Points of Presence (POPs) around the globe, where site pages and assets are cached, and [HTTPS](/https) certificates are fully managed using [Let's Encrypt](https://letsencrypt.org).

<Enablement title="Agency WebOps Training" link="https://pantheon.io/learn-pantheon?docs">

Get the most out of Global CDN with help from the experts at Pantheon. We deliver on-demand training to help development teams master the platform and improve internal WebOps.

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

## Experience Protection

Serve your Drupal or WordPress site even in the unlikely event that it goes down.

The goal of Experience Protection is to provide a seamless, uninterrupted experience for the user. If the server is not responding and can't serve a new copy of a page, the CDN will choose to serve a cached version instead of displaying an error, even if the cached version has expired (this is called _stale cache_).

### How long does content stay fresh? Adjust TTL

Adjust the length of time before the site's cached content is considered stale by adjusting the time-to-live (TTL).

Your site’s CMS page-level caching must be correctly configured in order to take advantage of Experience Protection.

On [Drupal](/drupal-cache#drupal-8-performance-configuration) and [WordPress](/wordpress-cache-plugin#pantheon-page-cache-plugin-configuration), you can adjust your CDN edge configuration to serve stale content for a specific amount of time.

For best results, set the cache TTL to a value equal to or over 3700 seconds.

Users with session-style cookies set, or a `NO_CACHE` cookie set will bypass the cache, and will not see cached content. For best results, set the `NO_CACHE` cookie to persist longer than the site’s page cache (this includes logged in users and authenticated traffic). Learn more about the exceptions to page caching rules in [Caching: Advanced Topics](/caching-advanced-topics#allow-a-user-to-bypass-the-cache).

### Confirm That Experience Protection Works

To test how stale cache is served, compare the header results of a page refresh when the site's Dev environment is live to the header results when Dev is in Maintenance Mode:

<TabList>

<Tab title="Via Command Line" id="cli" active={true}>

1. Examine the headers through the command line:

  ```bash{outputLines: 2-20}
  curl --head https://pantheon.io/docs
  HTTP/2 301
  content-type: text/html
  location: https://pantheon.io/docs/
  server: nginx
  strict-transport-security: max-age=31622400
  x-pantheon-styx-hostname: styx-fe2-a-5d96768699-vcdvh
  x-styx-req-id: b7b8d4d2-04d9-11ec-a467-9a05fab906d1
  cache-control: public, max-age=86400
  date: Tue, 24 Aug 2021 15:30:21 GMT
  x-served-by: cache-mdw17379-MDW, cache-ewr18124-EWR
  x-cache: HIT, HIT
  x-cache-hits: 1, 1
  x-timer: S1629819022.932985,VS0,VE1
  pantheon-trace-id: be58e6a03a904fbfa64515ee136ffd34
  vary: Cookie, Cookie
  age: 9654
  accept-ranges: bytes
  via: 1.1 varnish, 1.1 varnish
  content-length: 162
  ```

  Note the result for `age` or `max-age`.

1. Navigate to the site's Dev environment and set the site to Maintenance Mode.

1. Clear the cache from either the Advanced Page Cache module or from the Dashboard.

1. In a terminal, cURL the site headers filtered for stale cache:

  ```bash{promptUser: user}
  curl --head https://pantheon.io/docs | grep PContext-Resp-Is-Stale
  ```

  If the response headers include `PContext-Resp-Is-Stale`, the page has been successfully served from stale cache.

</Tab>

<Tab title="Via Web Browser" id="web-browser">

1. Navigate to the page using [Firefox](https://developer.mozilla.org/en-US/docs/Tools) or [Chrome](https://developer.chrome.com/docs/devtools/), and in the browser's developer tools open the **Network** tab.

  Find the response headers for the page or asset.

1. Go to the site's Dev environment and set the site to Maintenance Mode.

1. Clear the cache from either the Advanced Page Cache module or [from the Dashboard](/clear-caches#pantheon-dashboard).

1. Go back to the page and Developer Tools, then refresh the page for the newest header responses.

  If the result includes `PContext-Resp-Is-Stale`, the page has been successfully served from stale cache.

</Tab>

</TabList>

### Cache Management and Optimization

To improve site caching and cache hit ratio, you must first understand the current state of your site's cache. To gain some preliminary insight, you can:

<TabList>

<Tab title="Via WordPress" id="wp-cache" active={true}>

1. Install the [Advanced Page Cache (APC) Plugin](https://wordpress.org/plugins/pantheon-advanced-page-cache/). This enables the selective purging of cache on content editing and creation. For more information, you can refer to [WordPress Pantheon Cache Plugin Configuration](/wordpress-cache-plugin). Use this doc to set the global TTL for your site. Pantheon's Page Cache plugin is included in the standard WordPress upstream and sets global TTL for your site.

  ![Advanced Page Cache on WordPress.org](../images/advanced-page-cache-wordpress-plugin.png)

</Tab>

<Tab title="Via Drupal" id="drupal-cache">

1. Install the [Advanced Page Cache module](https://www.drupal.org/project/pantheon_advanced_page_cache). This enables the selective purging of cache on content editing and creation.
1. Visit `/admin/config/development/performance` for Drupal's performance settings. 
    * [Drupal 7](/drupal-cache#drupal-7-performance-configuration) - set maximum age, minimum cache time, and enable "Cache pages for anonymous users"
    * [Drupal 8](/drupal-cache#drupal-8-performance-configuration) - set maximum age


</Tab>

</TabList>

Once you know what your site's cache currently looks like, you can check your NGINX or Fastly logs for any traffic anomalies or overages.

[NGINX logs](/logs#available-logs) track all requests made to WordPress/Drupal, but do not include any requests that were served from the edge cache. You can use [GoAccess](/nginx-access-log) to produce a compiled report on most common requests, such as: 404s, user agents, etc.

Fastly log extracts can be requested from your Customer Success Engineer. Standard analytics includes all pages requested, but will not include service calls and other traffic that does not load the tracking script.

In your log report, you want to look for:
- Disproportionate patterns of requests and 404s indicate possible exploits.
- Too many requests to the index paths may indicate a volumetric attack against the domain.
- Heavy requests to administrative and login paths may indicate a generalized CMS exploit attempt.
- Known exploit and excess traffic paths. 

Please refer to the following docs for common caching issues:

- [Caching: Advanced Topics](/caching-advanced-topics)
- [Debug Common Cache Busters](/guides/frontend-performance#debug-common-cache-busters)
- [Traffic Limits and Overages](/traffic-limits)

## Frequently Asked Questions

### I already have a CDN. Can I use it with the Pantheon Global CDN?

Yes, but because it adds additional complexity, we suggest you only do so if you identify a need that the Pantheon Global CDN doesn't address.

To retain your existing CDN, set up a "stacked CDN" configuration. Ensure that you are enforcing HTTPS only at the outer CDN and are assuming HTTPS in the application. Check your CDN for how to redirect all traffic to HTTPS.

While we have some limited documentation for this setup with [Cloudflare](/cloudflare#option-2-use-cloudflares-cdn-stacked-on-top-of-pantheons-global-cdn), this is a largely self-serve practice.

If you need additional features or customization for your CDN, consider our [Advanced Global CDN](/guides/professional-services/advanced-global-cdn) service.

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

For custom solutions addressing the unique challenges your site build presents, see our [Advanced Global CDN](/guides/professional-services/advanced-global-cdn) service.
