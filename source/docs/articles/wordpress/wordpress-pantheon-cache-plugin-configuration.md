---
title: WordPress Pantheon Cache Plugin Configuration
description: Optimize WordPress and Varnish caching to maximize your site's performance.  
category:
  - WordPress
keywords: WordPress, performance, cache, caching, varnish, varnish caching
---
Pantheon maintains an [optimized version of WordPress](https://github.com/pantheon-systems/WordPress) that includes a plugin to control cache expiration. By default, pages will expire from the Varnish Edge Cache after 10 minutes (600 seconds). The plugin sets a default HTTP header: `Cache-Control: public, max-age=600`

You can increase the default value to increase the chances that a visitor will request a cached page, which will reduce page load times.

## WordPress Pantheon Cache Plugin Configuration

1. Log in to your WordPress site as an administrator.
2. Click **Settings**.
3. Click **Pantheon Cache**. You'll end up at: `/wp-admin/options-general.php?page=pantheon-cache`
4. Adjust the **Default Cache Time** as desired.
5. Click **Save Changes**.

![WordPress Pantheon Cache Plugin settings](/source/docs/assets/images/WordPress_Pantheon-Cache-Settings.png)

You'll want to strike a balance between freshness of content and speed. We recommend a minimum of 600 seconds.  If you can increase the setting to 30 minutes (1800 seconds) or 1 hour (3600 seconds), many more requests will hit the Edge Cache. Every page served from the Edge Cache won't hit your application container's PHP workers or MySQL database, which means faster page load times and a better user experience for site visitors.

## See Also
* [Testing Varnish](/docs/articles/sites/varnish/testing-varnish/)
* [Varnish Caching for High Performance](/docs/articles/sites/varnish)
* [Redis as a Caching Backend](/docs/articles/sites/redis-as-a-caching-backend/)
