---
title: Redis as a caching backend
description: Understand how to use Redis as a caching mechanism.
category:
    - developing

---


Note: You no longer need to submit a ticket to get Redis enabled. Please see updated screenshot below.
## What is Redis?

Redis is an open-source, networked, in-memory, key-value data store that can be used as a drop-in caching backend for your Drupal or WordPress website.

## Why should I use Redis?

Most website frameworks like Drupal and WordPress use the database to cache internal application "objects" which can be expensive to generate (menu trees, filter resultes, etc), and to keep cached page content. Since the database also handles many queries for normal page requests, it is the most common bottleneck causing increase load-times.

Redis provides an alternative caching backend, taking that work off the database, which is vital for scaling to a larger number of logged-in users. It also provides a number of other nice features for develoeprs looking to use it to manage queues, or do custom caching of their own.

## How can I enable Redis on my site?

Currently, all plans except for Personal can use Redis. Redis is available to Sandbox plans for developmental purposes, but Redis will not be available going live on a Personal plan.

<tbody>
		<tr>
			<th>Plan</th>
			<th>Is Redis Available?</th>
		</tr>
		<tr>
		</tr>
		<tr>
			<td>Sandbox</td>
			<td>Yes</td>
		</tr>
		<tr>
			<td>Personal</td>
			<td>No</td>
		</tr>
		<tr>
			<td>Professional</td>
			<td>Yes</td>
		</tr>
		<tr>
			<td>Business</td>
			<td>Yes</td>
		</tr>
		<tr>
			<td>Enterprise</td>
			<td>Yes</td>
		</tr>
		<tr>
			<td>Pantheon One</td>
			<td>Yes</td>
		</tr>
	</tbody>

Enabling Redis Cache Server from Pantheon Site Dashboard (Settings >> Add Ons >> Add)

![Enable Redis via Dashboard](https://pantheon-systems.desk.com/customer/portal/attachments/301650)

#### Using Redis with WordPress

Pantheon maintains the [wp-redis](https://wordpress.org/plugins/wp-redis/) plugin. On our platform you simply need to copy `object-cache.php` to the `wp-content/object-cache.php` and the settings will be automatically loaded from there.

#### Using Redis with Drupal

The common community module for Drupal to use Redis is simply called [redis](http://drupal.org/project/redis). Enabling it on Pantheon takes only a few steps:

1.

Add [the Redis module](http://drupal.org/project/redis) from Drupal.org.

2.

Drupal 6.x sites will also need to install the [Cache Backport](https://drupal.org/project/cache_backport) module to use Redis. See the "troubleshooting" section below for details.

3.

Ignore the directions bundled with the Redis module. Pantheon automatically manages the following `settings.php`/`$conf`/`variable_get` items for you:

  - `redis_client_host`
  - `redis_client_port`
  - `redis_client_password`

4.

Edit `sites/default/settings.php` to add the Redis cache configuration. These are the **mandatory** , required configurations for Redis for every site.  


**NOTE:**** _Distributions may vary in their directory structure._ ****_You will need to check the path at which the Redis module resides and change any paths in the snippet below to match your path._**

    // All Pantheon Environments.
    if (defined('PANTHEON_ENVIRONMENT')) {
      // Use Redis for caching.
      $conf['redis_client_interface'] = 'PhpRedis';
      $conf['cache_backends'][] = 'sites/all/modules/redis/redis.autoload.inc';
      $conf['cache_default_class'] = 'Redis_Cache';
      $conf['cache_prefix'] = array('default' => 'pantheon-redis');
      // Do not use Redis for cache_form (no performance difference).
      $conf['cache_class_cache_form'] = 'DrupalDatabaseCache';
      // Use Redis for Drupal locks (semaphore).
      $conf['lock_inc'] = 'sites/all/modules/redis/redis.lock.inc';
    }

5.

_Optional_ `sites/default/settings.php` configuration A - Higher performance for smaller page counts. This technique does not execute full Drupal bootstrapping and does not invoke the database, which ignores database checks such as Drupal's IP blacklist.

    // Optional Pantheon redis settings.
    // Higher performance for smaller page counts.
    if (defined('PANTHEON_ENVIRONMENT')) {
      // High performance - no hook_boot(), no hook_exit(), ignores Drupal IP blacklists.
      $conf['page_cache_without_database'] = TRUE;
      $conf['page_cache_invoke_hooks'] = FALSE;
      // Explicitly set page_cache_maximum_age as database won't be available.
      $conf['page_cache_maximum_age'] = 900;
    }

6.

_Optional_ `sites/default/settings.php` configuration B - Higher hit rate for larger page counts.

This technique avoids evictions due to redis space limitations when your site has a large quantity of pages to cache. Will conflict with Option A which skips the database entirely; do not use both at the same time.

    // Optional Pantheon redis settings.
    // Higher performance for larger page counts.
    if (defined('PANTHEON_ENVIRONMENT')) {
      // Use the database for cached HTML.
      $conf['cache_class_cache_page'] = 'DrupalDatabaseCache';
    }

7.

Enable the module via admin/build/modules. This is necessary for cache clearing to work in all cases.

8.

Check that Redis is working. If the Redis Cache Connection string is being generated, Redis is enabled. Connect to test that its working:

![Redis connect string](https://pantheon-systems.desk.com/customer/portal/attachments/301638)

  -

For Drupal 7 visit `/admin/config/development/performance/redis` and open "Connection Information." 

![](https://pantheon-systems.desk.com/customer/portal/attachments/71423)

  -

For Drupal 6 visit  `admin/settings/performance/cache-backend` and you should be able to see the available backends and their statuses.

### Using the Redis command-line client

You don't need to install anything to use Redis on Pantheon. However, if you want to manually connect to the Pantheon hosted Redis server for debugging, you'll need to install Redis locally. If you don't already have Redis installed, it can be downloaded from [http://redis.io/download](http://redis.io/download).

To verify that Redis is working, use the Redis Connection Info from the dashboard. Once you've logged in, execute the following command:

    redis> keys *

The command should return the existing Redis keys. Example:

    redis> keys *
     1) "pantheon-rediscache_menu:links:management:tree-data:en:27cbcc1096e9daf2c319c2c"
     2) "pantheon-rediscache:features_module_info"
     3) "pantheon-rediscache_bootstrap:bootstrap_modules"
     4) "pantheon-rediscache_menu:menu_item:b38e608d4f709b7c1fcb6ac5f6dd2ab72a9a034"

If Redis is configured properly, it should output appropriate keys. If it returns nothing (empty), proceed to the troubleshooting section below.

To check if a specific key exists, you can pass the "exists" command. For example:

    redis> SET key1 "Hello"
    OK
    redis> EXISTS key1
    (integer) 1
    redis> EXISTS key2
    (integer) 0
    redis>

### Finding a Specific Key

If you need to find a specific key, you can use search patterns that contain globs. For example:

    redis> KEYS *a*
    $17
    englash bigkahuna
    redis> KEYS engl?sh
    $23
    englosh englash english
    redis> KEYS engl[ia]sh
    $15
    englash english

### Purging the Cache

If you would like to purge your cache, you can pass the "flushall" command to flush all keys from the cache.

    redis> flushall
    OK

### Checking the # of Keys in Cache

To check the # of keys in the cache, you can use the "DBSIZE" command. The following is sample output:

    redis> DBSIZE
    :0

## Troubleshooting

### Cache directory is not found

If you push your updates via git you may get the error that the "Cache" directory is not found, Class not found or the `Cache.php` file was not found, this is because of a `.gitignore` issue which did not allow commiting of the Redis cache files. Here is an error that you may see.

    Fatal error: Class 'Redis_Cache' not found in
    /srv/bindings/xxxxxxxx/code/sites/all/modules/cache_backport/cache.inc on line 71

It is possible that your `.gitignore` file is not up to date with the most recent version of your . To resolve this please make sure you do not have any pending core updates.

The best and easiest way to update your core is by using Pantheon administration dashboard. Take a look at the [wiki page](/docs/articles/drupal/drupal-core-updates#core-updates) for the steps you will need to take to update, your project's code and get the most recent version of the `.gitignore`.

### Fatal error: require\_once()

Distributions may vary in their directory structure. You will need to check the path at which the Redis module resides and change any paths in the example code snippet to match your path to the Redis module. The error would like something like this:

    Fatal error: require_once(): Failed opening required
    '/srv/bindings/xxxxxxxxx/code/sites/all/modules/redis/redis.autoload.inc'

### Drupal 6 Cache Backport

If you have a Drupal 6 site, you will also need the [Cache Backport](https://drupal.org/project/cache_backport) module. This module is a full backport of the Drupal 7 `cache.inc` for Drupal 6.

See [INSTALL.TXT](http://drupalcode.org/project/cache_backport.git/blob_plain/HEAD:/INSTALL.txt) documentation for more details on how to configure Cache Backport.

Mp>If you see the following message:

    File not found:
    'sites/all/modules/cache_backport/system.admin.inc'

then you skipped a step; settings.php must include the cache\_backport files. Add the following to settings.php before the redis configuration:

    $conf['cache_inc'] = 'sites/all/modules/cache_backport/cache.inc';
