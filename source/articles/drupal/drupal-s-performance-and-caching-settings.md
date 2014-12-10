---
title: Drupal's Performance and Caching Settings
description: Use Varnish caching to maximize your site's performance.  
parent_guide:
  - optimizing
framework:
  - Drupal
filename: source/_guides/drupal-s-performance-and-caching-settings.md
---

To maximize your site's performance on Pantheon and to take advantage of our Varnish caching, you'll need to configure your site's performance settings.​ For more information, see  [Varnish caching for high performance](/documentation/advanced-topics/varnish-caching-for-high-performance/).

## Drupal 7 Performance Configuration

Drupal's performance settings can be found at Administration > Configuration > Development > Performance.

## Caching

![](https://pantheon-systems.desk.com/customer/portal/attachments/180072)  
Unless needed for development, you should always enable "Cache pages for anonymous users". Without it, your Drupal site will have to rebuild every page and Varnish will not cache your site. If possible, enable "Cache blocks" as well to increase performance for logged-in users.

### Minimum Cache Lifetime

![](https://pantheon-systems.desk.com/customer/portal/attachments/180073)  
Minimum caching lifetime forces cached content to continue to exist before it can be flushed. If all caches are cleared, any content under the minimum cache lifetime will not be expunged. High traffic sites may want to set this to a non-zero value; when in doubt, set it to none.

### Expiration of Cached Pages
 ![](https://pantheon-systems.desk.com/customer/portal/attachments/180074)

**This is a key setting**. Determines what value Drupal delivers in its `max-age` header, which is how long the reverse-proxy layer will retain a cache.

Performance is often a trade-off between how fresh your content is, and how fast you want to deliver it to the internet. A good value to start with is 15 mins, but this is something to consider. If you can set it to an hour, that's great for performance. More than a day is usually excessive, since the edge cache will decay over that amount of time in most cases.

## Bandwidth Optimization
 ![](https://pantheon-systems.desk.com/customer/portal/attachments/180075)

On Pantheon, the _"Compress cached pages"_ setting should not checked, as pages are already compressed with gzip.  


 ![](https://pantheon-systems.desk.com/customer/portal/attachments/180077)

On the live environment, make sure to enable "Aggregate and compress CSS files" and "Aggregate and compress JavaScript files" are both checked. This is critical for page render times by reducing the number of HTTP requests and reducing the amount of data transferred.

## Drupal 6

### Caching Mode

In Drupal 6, most users should set their cache mode to "Aggressive" to take advantage of the reverse-proxy layer. This is like checking "cache pages for anonymous users": Drupal will "double cache" the pages locally. That can be an advantage as they'll be held until the next cache flush, which can last much longer in practice than the reverse-proxy layer.

Checking "External" prevents this kind of "double caching" by freeing Drupal from the responsibility to store a page that is also being stored at the reverse-proxy layer. Again, this should only be used on sites which don't want the long-term protection of an internal page cache.

### Compatibility Warnings
Any module implementing Drupal's `hook_boot()` or `hook_exit()` will show up with a compatibility warning on External or Aggressive modes. This is because when Drupal uses Aggressive mode no logic is excuted on a successful cache hit. As soon as the CMS detects that the URL being request has a cache, it returns that cache.

Obviously, when the page is cached Externally in a reverse-proxy layer, Drupal is not consulted when cached pages are delivered.

This limits some functionality in Drupal. For instance, the core `statistics.module` cannot count anonymous pageviews if it isn't being exercised every time a page is viewed. That said, `statistics.module` is not great for high performance sites.

As a developer, you should understand the implications of the code in your application, and what it means to have cached pages delivered from an external source.

### Minimum Cache Lifetime

As above, this is useful for high traffic sites that don't want to be flushing their caches when every comment is submitted.

### Page Cache Maximum Age

As above, this determines the amount of time a cache will be honored in the reverse-proxy layer. Set it as high as you are comfortable.

### Block Cache

As above, can help with logged-in performance by preventing re-generation of block elements in sidebars every pageview.

### Optimize CSS and JavaScript Files

This setting controls whether or not to compile and cache your CSS and JavaScript files together, speeding up browser-render times significantly. You might want to turn it off in dev if you are building a theme (or developing JS), but this should always be Enabled in production.

![Drupal 6 Performance cache settings](https://pantheon-systems.desk.com/customer/portal/attachments/31793)

### Contributed Modules

Contributed modules like `views.module` and `panels.module` contain their own caching options, which are much more fine-grained than the basic Drupal cache settings. If you use these modules, you should definitely look at implementing their cache settings to provide a good logged-in user experience.
