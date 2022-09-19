---
title: Object Cache (formerly Redis)
subtitle: Troubleshoot
description: Review solutions to common troubleshooting scenarios for Object Cache.
categories: [performance]
tags: [cache, plugins, modules, database]
contributors: [cityofoaksdesign, carolynshannon, whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/object-cache/troubleshoot-object-cache
anchorid: troubleshoot-object-cache
---

This section provides solutions to common troubleshooting scenarios for Object Cache.

### Redis Busy Error for Drupal Users

Redis busy errors are caused by large amounts of cached data. Setting the Minimum cache lifetime prevents `flushVolatile` from being called, which only happens when cron runs, and results in the Redis busy error. Drupal instructs Redis to dump cached items that are `CACHE_TEMPORARY` (versus `PERM` or a specified time) when cron runs, which causes the busy error on large cache sets. Review [Drupal's documentation](https://www.drupal.org/project/redis/issues/2538902) for more information.

Refer to the [Minimum Cache Lifetime](/drupal-cache#minimum-cache-lifetime) section of the [Drupal Performance and Caching Settings](/drupal-cache) documentation for more information about this setting.

### Cannot Activate the Redis Plugin for WordPress

WP Redis is a drop-in plugin that should only be loaded using the installation methods in [Enable Object Cache](/guides/object-cache/enable-object-cache). No activation is required.

### RedisException: Redis server went away

The following error occurs when Redis has not been enabled within the Site Dashboard:

```php
RedisException: Redis server went away in Redis->setOption() (line 28 of /srv/bindings/xxxxxxxx/code/sites/all/modules/redis/lib/Redis/Client/PhpRedis.php).
```

Enable Redis via the Pantheon Site Dashboard:

Navigate to **Settings**, click **Add Ons**, click **Add**, and then click **Redis**. It may take a few minutes to provision the service.

### No Keys Found

This is a cache-based error that sometimes occurs in Drupal. When the Dashboard status check reports that Redis is enabled but doesn't have any data (0 keys found), you'll want to confirm the logic behind the check for PANTHEON_ENVIRONMENT in your `settings.php` Redis cache configuration. Depending on the kind of test you're performing, you’ll get different results.

Example of a block that will result in an **incorrectly configured cache backend**:

```php:title=settings.php
if (isset($_ENV['PANTHEON_ENVIRONMENT']) &&
  $_ENV['PANTHEON_ENVIRONMENT'] === 'live') {
    // Use Redis for caching.
    $conf['redis_client_interface'] = 'PhpRedis';
    $conf['cache_backends'][] = 'sites/all/modules/redis/redis.autoload.inc';
    $conf['cache_default_class'] = 'Redis_CacheCompressed';
    $conf['cache_prefix'] = array('default' => 'pantheon-redis');
    // Use Redis for Drupal locks (semaphore).
    $conf['lock_inc'] = 'sites/all/modules/redis/redis.lock.inc';
}
```

The preceding conditional will only evaluate as true if the application in the Live environment is being invoked through a web visitor, but not via command line PHP. Therefore, Redis keys will only be populated through visits, but they will not be cleared or populated via Drush calls, which will result in caching issues for the site. Also, the cache configuration will only apply for the live site, making it difficult to confirm its operation in the development or staging environment prior to deployment.

To resolve this inconsistency, all Redis cache configuration should be enclosed in a conditional like this:

```php:title=settings.php
if (defined('PANTHEON_ENVIRONMENT')) {
  // Use Redis for caching.
}
```

This conditional will be true for both web visits and Drush calls. All Redis cache backend settings, plus any other application configuration that should be true no matter the context, should always be enclosed in these types of conditional blocks on Pantheon.

However, all redirection logic should remain nested in `isset($_ENV['PANTHEON_ENVIRONMENT'])` conditionals, as you only want redirections to occur on web visits, not on any Drush invocations.

In other words, don’t mix your application configuration and redirection logic together. You can have multiple logic blocks in your `settings.php` and it will fix these problems and will be easier for yourself and others to read and maintain.

### Cache Directory Is Not Found

If you push your updates via Git, you might get the error that the cache directory, class, or the `cache.php` file was not found. This is because of a `.gitignore` issue that does not allow you to commit the Redis cache files. Example error:

```bash
Fatal error: Class 'Redis_CacheCompressed' not found in
/srv/bindings/xxxxxxxx/code/sites/all/modules/cache_backport/cache.inc on line 71
```

It is possible that your `.gitignore` file is not up to date with the most recent version of your CMS. To resolve this, ensure you do not have any pending core updates.

The best and easiest way to update your core is by using Pantheon administration Dashboard. Refer to [WordPress and Drupal Core Updates](/core-updates) for the steps to update your project's code and get the most recent version of the `.gitignore`.

### Fatal Error: require\_once()

This is likely due to some variance in your site's directory structure. You will need to check the path at which the Redis module resides and change any paths in the example code snippet to match your path to the Redis module. The error would look something like this:

```bash
Fatal error: require_once(): Failed opening required
'/srv/bindings/xxxxxxxxx/code/sites/all/modules/redis/redis.autoload.inc'
```

### You Have Requested a Non-existent Service

The following error occurs when modifying configurations for the [Redis](https://www.drupal.org/project/redis) module before it has been enabled:

```php
Symfony\Component\DependencyInjection\Exception\ServiceNotFoundException:
You have requested a non-existent service "cache.backend.redis".
```

Install and enable the module to resolve this issue.

### Heavy Redis Transactions Tracing Back to a Specific Plugin (WordPress)

A page load with 2,000 Redis calls can be 2 full seconds of Object Cache transactions. If a plugin you're using is erroneously creating a huge number of cache keys, you might be able to mitigate the problem by disabling cache persistency for the plugin's group in your theme's `function.php` file, or an [MU-plugin](/mu-plugin):

```php
wp_cache_add_non_persistent_groups( array( 'bad-actor' ) );
```

This declaration means use of `wp_cache_set( 'foo', 'bar', 'bad-actor' );` and `wp_cache_get( 'foo', 'bad-actor' );` will not use Redis, and instead fall back to WordPress' default runtime object cache.

### Out of Memory Errors

You can use the `info memory` option to view your site's memory metrics. Object Cache will always use more memory than declared in `maxmemory`. Out of Memory errors can be avoided by configuring a max memory limit **and** an [eviction policy](https://docs.redis.com/latest/rs/concepts/memory-performance/#eviction-policies). Without an eviction policy, the server will not evict any keys, which prevents any writes until memory is freed. With an eviction policy in place, the server will evict keys when memory usage reaches the `maxmemory` limit.

Run the following command to access your site's memory usage metrics:

  ```bash
    redis> info memory
    # Memory
    used_memory:1007280
    used_memory_human:983.67K
    used_memory_rss:2002944
    used_memory_rss_human:1.91M
    used_memory_peak:1008128
    used_memory_peak_human:984.50K
  ```

## More Resources

- [Basic Troubleshooting](/basic-troubleshooting)
- [PHP Errors and Exceptions](/guides/php/php-errors)