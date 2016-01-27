---
title: Redis as a Caching Backend
description: Understand how to use Redis as a caching mechanism for your Pantheon Drupal or WordPress ite.
category:
    - developing
keywords: redis, caching, what is redis, enable redis, redis command line, redis wordpress, how to use redis with drupal, redis drupal, how to use redis with drupal
---
Redis is an open-source, networked, in-memory, key-value data store that can be used as a drop-in caching backend for your Drupal or WordPress website.

## Benefits of Redis

Most website frameworks like Drupal and WordPress use the database to cache internal application "objects" which can be expensive to generate (menu trees, filter results, etc), and to keep cached page content. Since the database also handles many queries for normal page requests, it is the most common bottleneck causing increase load-times.

Redis provides an alternative caching backend, taking that work off the database, which is vital for scaling to a larger number of logged-in users. It also provides a number of other nice features for developers looking to use it to manage queues, or do custom caching of their own.

## Enable Redis

Enable Redis cache server from your Pantheon Site Dashboard by going to **Settings** > **Add Ons** > **Add**.

Currently, all plans except for Personal can use Redis. Redis is available to Sandbox plans for developmental purposes, but Redis will not be available going live on a Personal plan.


| Plans        | Supported
| ------------- |:-------------:|
| Sandbox      | **Yes** |
| Personal      | No      |
| Professional | **Yes**      |
| Business | **Yes**      |
| Elite | **Yes**      |

---


### Using Redis with WordPress

For detailed information, see [Installing Redis on WordPress](/docs/articles/wordpress/installing-redis-on-wordpress).

### Using Redis with Drupal 7.x and 6.x

The common community module for Drupal to use Redis is simply called [redis](http://drupal.org/project/redis). Enabling it on Pantheon takes only a few steps:

1. Add [the Redis module](http://drupal.org/project/redis) from Drupal.org. Only the 7.x-2.x branch of the Redis module is currently supported for Drupal 7.x sites on Pantheon.

2. As there is no Redis module for Drupal 6.x, you need to install the [Cache Backport](https://drupal.org/project/cache_backport) module to use Redis with Drupal 6.x. See the Troubleshooting section below for details.

3. Ignore the directions bundled with the Redis module. Pantheon automatically manages the following `settings.php`/`$conf`/`variable_get` items for you:

    - `redis_client_host`
    - `redis_client_port`
    - `redis_client_password`

4. Edit `sites/default/settings.php` to add the Redis cache configuration. These are the **mandatory**, required configurations for Redis for every site.  

  ```php
    // All Pantheon Environments.
    if (defined('PANTHEON_ENVIRONMENT')) {
      // Use Redis for caching.
      $conf['redis_client_interface'] = 'PhpRedis';
      $conf['cache_backends'][] = 'sites/all/modules/redis/redis.autoload.inc';
      //or if you have a contrib folder for modules use
      // $conf['cache_backends'][] = 'sites/all/modules/contrib/redis/redis.autoload.inc';
      $conf['cache_default_class'] = 'Redis_Cache';
      $conf['cache_prefix'] = array('default' => 'pantheon-redis');
      // Do not use Redis for cache_form (no performance difference).
      $conf['cache_class_cache_form'] = 'DrupalDatabaseCache';
      // Use Redis for Drupal locks (semaphore).
      $conf['lock_inc'] = 'sites/all/modules/redis/redis.lock.inc';
    }
  ```

      <div class="alert alert-info">
      <h4>Note</h4>Distributions may vary in their directory structure. You will need to check the path at which the Redis module resides and change any paths in the snippet below to match your path.</div>


5. _Optional_ `sites/default/settings.php` configuration A - Higher performance for smaller page counts. This technique does not execute full Drupal bootstrapping and does not invoke the database, which ignores database checks such as Drupal's IP blacklist.

  ```
  // Optional Pantheon redis settings.
  // Higher performance for smaller page counts.
  if (defined('PANTHEON_ENVIRONMENT')) {
    // High performance - no hook_boot(), no hook_exit(), ignores Drupal IP blacklists.
    $conf['page_cache_without_database'] = TRUE;
    $conf['page_cache_invoke_hooks'] = FALSE;
    // Explicitly set page_cache_maximum_age as database won't be available.
    $conf['page_cache_maximum_age'] = 900;
  }
  ```
6. _Optional_ `sites/default/settings.php` configuration B - Higher hit rate for larger page counts.


  This technique avoids evictions due to Redis space limitations when your site has a large quantity of pages to cache. Will conflict with Option A which skips the database entirely; do not use both at the same time.

  ```
  // Optional Pantheon redis settings.
  // Higher performance for larger page counts.
  if (defined('PANTHEON_ENVIRONMENT')) {
    // Use the database for cached HTML.
    $conf['cache_class_cache_page'] = 'DrupalDatabaseCache';
  }
  ```
7. Enable the module via `admin/build/modules`. This is necessary for cache clearing to work in all cases.

8. Check that Redis is working. If the Redis Cache Connection string is being generated, Redis is enabled. Connect to test that its working:
![Redis connect string](/source/docs/assets/images/desk_images/301638.png)
 - For Drupal 7 visit `/admin/config/development/performance/redis` and open **Connection Information**.

 ![Drupal 7 configuring Redis](/source/docs/assets/images/desk_images/71423.png)
 - For Drupal 6 visit  `admin/settings/performance/cache-backend` and you should be able to see the available backends and their statuses.

### Using Redis with Drupal 8
At this time, sites running Drupal 8 cannot use Redis, because there isn't a Drupal 8 release of the Redis module yet. Check the status on the [Redis project page](https://www.drupal.org/project/redis), or view to the [Port Redis issue queue](https://www.drupal.org/node/2233413)for updates.

## Using the Redis Command-Line Client

You don't need to install anything to use Redis on Pantheon. However, if you want to manually connect to the Pantheon hosted Redis server for debugging, you'll need to install Redis locally. If you don't already have Redis installed, it can be downloaded from [http://redis.io/download](http://redis.io/download).

To verify that Redis is working, use the Redis Connection Info from the Dashboard. Once you've logged in, execute the following command:

```bash
redis> keys *
```
The command should return the existing Redis keys. Example:
```bash
redis> keys *
 1) "pantheon-rediscache_menu:links:management:tree-data:en:27cbcc1096e9daf2c319c2c"
 2) "pantheon-rediscache:features_module_info"
 3) "pantheon-rediscache_bootstrap:bootstrap_modules"
 4) "pantheon-rediscache_menu:menu_item:b38e608d4f709b7c1fcb6ac5f6dd2ab72a9a034"
```
If Redis is configured properly, it should output appropriate keys. If it returns nothing (empty), proceed to the troubleshooting section below.

To check if a specific key exists, you can pass the "exists" command. For example:

```bash
redis> SET key1 "Hello"
OK
redis> EXISTS key1
(integer) 1
redis> EXISTS key2
(integer) 0
redis>
```
## Finding a Specific Key

If you need to find a specific key, you can use search patterns that contain globs. For example:

```bash
redis> KEYS *a*
$17
englash bigkahuna
redis> KEYS engl?sh
$23
englosh englash english
redis> KEYS engl[ia]sh
$15
englash english
```
## Clear Cache

Pass the `flushall` command to clear all keys from the cache.
```bash
redis> flushall
OK
```
## Checking the # of Keys in Cache

To check the # of keys in the cache, you can use the `DBSIZE` command. The following is sample output:
```bash
redis> DBSIZE
:0
```
## Troubleshooting

### Redis is enabled but doesn't have any data

When the Dashboard status check reports that Redis is enabled but doesn't have any data (0 keys found), you'll want to confirm the logic behind the check for PANTHEON_ENVIRONMENT in your `settings.php` Redis cache configuration. Depending on the kind of test you're performing, you’ll get different results.

Example of a block that will result in an **incorrectly configured cache backend**:


```
if (isset($_SERVER['PANTHEON_ENVIRONMENT']) &&
  $_SERVER['PANTHEON_ENVIRONMENT'] === 'live') {
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
}

```

The preceding conditional will only evaluate as true if the application in the Live environment is being invoked through a web visitor, but not via command-line PHP. Therefore, Redis keys will only be populated through visits, but they will not be cleared or populated via Drush calls, which will result in caching issues for the site. Also, the cache configuration will only apply for the live site, making it difficult to confirm its operation in the development or staging environment prior to deployment.

To resolve this inconsistency, all Redis cache configuration should be enclosed in a conditional like this:

```
if (defined('PANTHEON_ENVIRONMENT')) {
  // Use Redis for caching.
}
```

This conditional will be true for both web visits and drush calls. All Redis cache backend settings, plus any other application configuration that should be true no matter the context, should always be enclosed in these types of conditional blocks on Pantheon.

However, all redirection logic should remain nested in `isset($SERVER[’PANTHEONENVIRONMENT’])` conditionals, as you would only want redirections to occur on web visits, not any drush invokations.

In other words, don’t mix your application configuration and redirection logic together. You can have multiple logic blocks in your `settings.php` and it will both fix these problems, and will be easier for yourself and others to read and maintain.

### Cache Directory is Not Found

If you push your updates via git you may get the error that the "Cache" directory is not found, Class not found or the `Cache.php` file was not found, this is because of a `.gitignore` issue which did not allow commiting of the Redis cache files. Here is an error that you may see.
```bash
Fatal error: Class 'Redis_Cache' not found in
/srv/bindings/xxxxxxxx/code/sites/all/modules/cache_backport/cache.inc on line 71
```
It is possible that your `.gitignore` file is not up to date with the most recent version of your . To resolve this please make sure you do not have any pending core updates.

The best and easiest way to update your core is by using Pantheon administration Dashboard. Take a look at the [wiki page](/docs/articles/sites/code/applying-upstream-updates) for the steps you will need to take to update, your project's code and get the most recent version of the `.gitignore`.

### Fatal Error: require\_once()

Distributions may vary in their directory structure. You will need to check the path at which the Redis module resides and change any paths in the example code snippet to match your path to the Redis module. The error would like something like this:
```bash
Fatal error: require_once(): Failed opening required
'/srv/bindings/xxxxxxxxx/code/sites/all/modules/redis/redis.autoload.inc'
```
### Drupal 6 Cache Backport

If you have a Drupal 6 site, you will also need the [Cache Backport](https://drupal.org/project/cache_backport) module. This module is a full backport of the Drupal 7 `cache.inc` for Drupal 6.

See [INSTALL.TXT](http://drupalcode.org/project/cache_backport.git/blob_plain/HEAD:/INSTALL.txt) documentation for more details on how to configure Cache Backport.

If you see the following message:

```bash
File not found:
'sites/all/modules/cache_backport/system.admin.inc'
```
You skipped a step; settings.php must include the cache\_backport files. Add the following to settings.php before the redis configuration:

```php
$conf['cache_inc'] = 'sites/all/modules/cache_backport/cache.inc';
```
##Frequently Asked Questions

#### What happens when Redis reaches maxmemory?

The behavior is the same as a standard Redis instance. The overall process is described best in the top four answers of [this thread](http://stackoverflow.com/questions/8652388/how-does-redis-work-when-ram-starts-filling-up), keeping in mind our `maxmemory-policy` is `allkeys-lru`.

#### Is Redis set up as an LRU cache?

We are using [allkeys-lru](http://redis.io/topics/lru-cache). Here is the Redis configuration file for your Live environment:

```nohighlight
cat redis.conf
port 11455
timeout 300
loglevel notice
logfile /srv/bindings/0ba27ab152ab480a9ba54a40c472e837/logs/redis.log
databases 16
save 900 1
save 300 10
save 60 10000
rdbcompression yes
dbfilename dump.rdb
dir /srv/bindings/0ba27ab152ab480a9ba54a40c472e837/data/
requirepass 278801a71e2c4264b7d7b155def62bea
maxclients 1024
maxmemory 964689920
maxmemory-policy allkeys-lru
appendonly no
appendfsync everysec
no-appendfsync-on-rewrite no
list-max-ziplist-entries 512
list-max-ziplist-value 64
set-max-intset-entries 512
activerehashing yes
```

#### If Redis hits the upper limit of memory usage, is this logged on Pantheon?

Yes. There is a `redis.log` file that is available on the redis container for each environment. You can see where the log files and configuration reside:

```nohighlight
$ sftp -o Port=2222 live.81fd3bea-d11b-401a-85e0-07ca0f4ce7cg@cacheserver.live.81fd3bea-d11b-401a-85e0-07ca0f4ce7cg.drush.in Connected to cacheserver.live.81fd3bea-d11b-401a-85e0-07ca0f4ce7cg.drush.in.
sftp> ls -la
-rw-r--r-- 1 11455 11455 18 Oct 06 05:16 .bash_logout -rw-r--r-- 1 11455 11455 193 Oct 06 05:16 .bash_profile -rw-r--r-- 1 11455 11455 231 Oct 06 05:16 .bashrc -rw-r--r-- 1 0 0 0 Mar 10 19:46 .pantheonssh_login drwxr-x--- 2 0 11455 4096 Nov 10 07:55 certs
-rw-r--r-- 1 0 0 42 Mar 10 09:46 chef.stamp drwx------ 2 11455 11455 4096 Mar 10 19:46 data
drwxrwx--- 2 0 11455 4096 Nov 10 07:55 logs
-rw------- 1 0 0 2677 Mar 10 09:46 metadata.json -rw-r----- 1 0 11455 531 Nov 10 07:55 redis.conf drwxrwx--- 2 0 11455 4096 Mar 10 09:46 tmp
sftp> ls -la logs/
-rw-r--r-- 1 11455 11455 40674752 Mar 10 19:46 redis.log sftp>
```
