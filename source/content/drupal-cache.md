---
title: Drupal Performance and Caching Settings
description: Optimize Drupal and Global CDN caching to maximize your site's performance.
tags: [caching, cdn, D8, D9, D10]
contenttype: [doc]
innav: [true]
categories: [cache, optimize]
cms: [drupal]
audience: [development]
product: [cdn]
integration: [--]
---
To maximize your site's performance on Pantheon and to take advantage of our [Global CDN caching](/guides/global-cdn/global-cdn-caching), you'll need to configure your site's performance settings.

<Enablement title="Agency WebOps Training" link="https://pantheon.io/learn-pantheon?docs" campaign="docs-webops">

Learn industry best practices for Drupal caching, how to take advantage of them on the platform, and troubleshooting common issues with help from the experts at Pantheon.

</Enablement>

## Drupal 8, 9, 10, and 11

Visit `/admin/config/development/performance` for Drupal's performance settings.

### Caching

![Drupal Caching options](../images/d11-cache-config.png)
**This is a key setting**. It determines what value Drupal delivers in its `max-age` header, which is how long the reverse-proxy layer will retain a cache.

Performance is often a trade-off between how fresh your content is, and how fast you want to deliver it to the internet. A good value to start with is 15 minutes, but this is something to consider. If you can set it to an hour, that's great for performance.

On Pantheon, this value defaults to 15 minutes. This is done on the first cache-clear operation on the site; immediately after installing the site, you may see this set to `<no caching>`. In this case, press the "Clear all caches" button, or select the page cache maximum age from the available selections.

Note that Drupal has no setting to configure the minimum cache lifetime.

### Bandwidth Optimization

![Drupal aggregate CSS and JS files](../images/d11-aggregate-css-js.png)

Pantheon uses HTTP/2 which allows files to download in parallel. This can *potentially* make aggregation unnecessary for your site. Aggregation depends on several factors, including:

- File sizes
- Number of files
- End users' browsers

We recommend that you keep aggregation enabled if you aren't familiar with how aggregation factors apply to your site. 

### Cache Tags

Drupal uses the [cache metadata](https://api.drupal.org/api/drupal/core%21core.api.php/group/cache/9.0.x) system (introduced in Drupal 8) that allows internal and external caches to be cleared in very granular fashion as data is changed. For instance, if `node 123` were resaved, caches that depends upon that node, like the full page cache of the page `mysite.com/node/123`, should be cleared.

This functionality can be added via the [Pantheon Advanced Page Cache](https://www.drupal.org/project/pantheon_advanced_page_cache) module, which uses Drupal's cache metadata to communicate with the [Pantheon Global CDN](/guides/global-cdn). The Drupal 7 version of the module depends upon the [Drupal 8 Cache Backport module](https://www.drupal.org/project/d8cache).

For the latest version of Drupal, install the Pantheon Advanced Page Cache module via [Composer](/guides/integrated-composer/dependencies), then enable it via the Drupal Admin:

```bash{promptUser: user}
composer require drupal/pantheon_advanced_page_cache
git commit -am "add pantheon advanced page cache module" && git push origin master
```

## Drupal 7

Visit `/admin/config/development/performance` for Drupal's performance settings.

### Caching

![Drupal Caching options](../images/re-d7-cache-config.png)

Unless needed for development, you should always enable "Cache pages for anonymous users". Without it, your Drupal site will have to rebuild every page and the Pantheon Global CDN will not cache your site. If possible, enable "Cache blocks" as well to increase performance for logged-in users.

### Minimum Cache Lifetime

![Drupal minimum cache lifetime](../images/regenerated-d7-min-cache-lifetime.png)

Minimum caching lifetime forces cached content to continue to exist before it can be flushed. High traffic sites may want to set this to a non-zero value; when in doubt, set it to none.

Redis busy errors are caused by large amounts of cached data. Setting the Minimum cache lifetime prevents `flushVolatile` from being called, which only happens when cron runs, and results in the Redis busy error. Drupal instructs Redis to dump cached items that are `CACHE_TEMPORARY` (versus `PERM` or a specified time) when cron runs, which causes the busy error on large cache sets. Review [Drupal's documentation](https://www.drupal.org/project/redis/issues/2538902) for more information.

### Expiration of Cached Pages
 ![Drupal expiration of cached pages](../images/d7-exp-cached-pages.png)<br />
**This is a key setting**. It determines what value Drupal delivers in its `max-age` header, which is how long the reverse-proxy layer will retain a cache.

Performance is often a trade-off between how fresh your content is, and how fast you want to deliver it to the internet. A good value to start with is 15 minutes, but this is something to consider. If you can set it to an hour, that's great for performance. More than a day is usually excessive, since the edge cache will decay over that amount of time in most cases.

### Bandwidth Optimization
On Pantheon, the "Compress cached pages" setting should not checked, as pages are already compressed with gzip.  <br />
 ![Drupal aggregate CSS and JS files](../images/d7-bandwidth-optimization.png)<br />
On the Live environment, make sure to enable "Aggregate and compress CSS files" and "Aggregate and compress JavaScript files". This is critical for page render times by reducing the number of HTTP requests and reducing the amount of data transferred.

### The `cache_form` Table

Drupal sites can encounter performance problems when the `cache_form` table in the database grows to be too large in size. Unlike other Drupal cache tables, entries in `cache_form` are only removed after expiration. By default, entries expire after six hours. Entries which are older than six hours will be deleted.

In addition to storing in-flight form data, Drupal writes to the `cache_form` table every time a form that uses the `#ajax` Form API property is viewed. On a high-traffic site, or a site with an AJAX form on every page (for example a search field with autocomplete), traffic can cause the table to grow large enough to severely impact performance, impede MySQL replication, and cause downtime.

[Drupal 7.61](https://www.drupal.org/node/2857751) introduced a feature to control the expiration of entries in `cache_form`. If your site is having issues with the table, you can add the following code to your `settings.php` file:

```php
$conf['form_cache_expiration'] = 1800; // Expire cache_form items after 30 minutes.
```

Cleanup on the `cache_form` table runs on cron. If the table continues to grow to be too large, despite setting a low expiration time, you can [troubleshoot cron](/drupal-cron#troubleshooting-cron). You can also safely delete the contents of the table with a SQL query:

```sql
mysql> TRUNCATE TABLE cache_form;
```

## More Resources
- [Global CDN Caching for High Performance](/guides/global-cdn/global-cdn-caching)
