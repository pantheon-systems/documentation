---
title: Redis as a Caching Backend
description: Understand how to use Redis as a caching mechanism for your Pantheon Drupal or WordPress site.
tags: [cacheapp, addons]
categories: []
---
Redis is an open-source, networked, in-memory, key-value data store that can be used as a drop-in caching backend for your Drupal or WordPress website.

## Benefits of Redis

Most website frameworks like Drupal and WordPress use the database to cache internal application "objects" which can be expensive to generate (menu trees, filter results, etc.), and to keep cached page content. Since the database also handles many queries for normal page requests, it is the most common bottleneck causing increase load-times.

Redis provides an alternative caching backend, taking that work off the database, which is vital for scaling to a larger number of logged-in users. It also provides a number of other nice features for developers looking to use it to manage queues, or do custom caching of their own.

## Enable Redis

Enable Redis cache server from your Pantheon Site Dashboard by going to **Settings** > **Add Ons** > **Add**.


| Plans        | Supported
| ------------- |:-------------:|
| Sandbox      | **Yes** |
| Personal      | No      |
| Professional | **Yes**      |
| Business | **Yes**      |
| Elite | **Yes**      |

---


### WordPress Sites

For detailed information, see [Installing Redis on WordPress](/docs/wordpress-redis).

### Drupal 8 Sites

1. Enable the Redis cache server from your Pantheon Site Dashboard by going to **Settings** > **Add Ons** > **Add**.

2. Add the [Redis](http://drupal.org/project/redis) module from Drupal.org.

3. Edit `sites/default/settings.php` to add the Redis cache configuration. These are the **mandatory**, required Redis configurations for every site.

    ```php
    // Configure Redis

    if (defined('PANTHEON_ENVIRONMENT')) {
      // Include the Redis services.yml file. Adjust the path if you installed to a contrib or other subdirectory.
      $settings['container_yamls'][] = 'modules/redis/example.services.yml';

      //phpredis is built into the Pantheon application container.
      $settings['redis.connection']['interface'] = 'PhpRedis';
      // These are dynamic variables handled by Pantheon.
      $settings['redis.connection']['host']      = $_ENV['CACHE_HOST'];
      $settings['redis.connection']['port']      = $_ENV['CACHE_PORT'];
      $settings['redis.connection']['password']  = $_ENV['CACHE_PASSWORD'];

      $settings['cache']['default'] = 'cache.backend.redis'; // Use Redis as the default cache.

      // Always set the fast backend for bootstrap, discover and config, otherwise this gets lost when redis is enabled.
      $settings['cache']['bins']['bootstrap'] = 'cache.backend.chainedfast';
      $settings['cache']['bins']['discovery'] = 'cache.backend.chainedfast';
      $settings['cache']['bins']['config']    = 'cache.backend.chainedfast';
    }
    ```

4. On your dev site, navigate to `/admin/reports/status` and confirm that the **REDIS** line says "Connected, using the PhpRedis client."

### Drupal 7 Sites

1. Enable the Redis cache server from your Pantheon Site Dashboard by going to **Settings** > **Add Ons** > **Add**.

2. Add the [Redis](http://drupal.org/project/redis) module from Drupal.org.

3. Ignore the directions bundled with the Redis module. Pantheon automatically manages the following `settings.php`/`$conf`/`variable_get` items for you:
 - `redis_client_host`
 - `redis_client_port`
 - `redis_client_password`

4. Edit `sites/default/settings.php` to add the Redis cache configuration. These are the **mandatory**, required Redis configurations for every site.

        // All Pantheon Environments.
        if (defined('PANTHEON_ENVIRONMENT')) {
          // Use Redis for caching.
          $conf['redis_client_interface'] = 'PhpRedis';

          // Point Drupal to the location of the Redis plugin.
          $conf['cache_backends'][] = 'sites/all/modules/redis/redis.autoload.inc';
          // If you've installed your plugin in a contrib directory, use this line instead:
          // $conf['cache_backends'][] = 'sites/all/modules/contrib/redis/redis.autoload.inc';

          $conf['cache_default_class'] = 'Redis_Cache';
          $conf['cache_prefix'] = array('default' => 'pantheon-redis');

          // Do not use Redis for cache_form (no performance difference).
          $conf['cache_class_cache_form'] = 'DrupalDatabaseCache';

          // Use Redis for Drupal locks (semaphore).
          $conf['lock_inc'] = 'sites/all/modules/redis/redis.lock.inc';
          // Or if you've installed the redis module in a contrib subdirectory, use:
          // $conf['lock_inc'] = 'sites/all/modules/contrib/redis/redis.lock.inc';

        }

    <div class="alert alert-info">
    <h4 class="info">Note</h4><p>Distributions may vary in their directory structure. You will need to check the path at which the Redis module resides and change any paths in the snippet above to match your path.</p></div>

7. Enable the module via `admin/build/modules`. This is necessary for cache clearing to work in all cases.

8. Verify Redis is enabled by going to the Dashboard and clicking **Connection Info**. If you see the Redis cache connection string, Redis is enabled.

9. Visit `/admin/config/development/performance/redis` and open **Connection Information** to verify the connection.

## Use the Redis Command-Line Client

You don't need to install anything to use Redis on Pantheon. However, if you want to manually connect to the Pantheon-hosted Redis server for debugging, you'll need to install Redis locally. You can download it at  [http://redis.io/download](http://redis.io/download).

To verify that Redis is working, use the Redis Connection Info from the Dashboard. Once you've logged in, execute the following command:
```
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
If Redis is configured properly, it should output appropriate keys. If it returns nothing (empty), proceed to the [Troubleshooting](/docs/redis/#troubleshooting) section below.

To check if a specific key exists, you can pass the `exists` command. For example:

```bash
redis> SET key1 "Hello"
OK
redis> EXISTS key1
(integer) 1
redis> EXISTS key2
(integer) 0
redis>
```
## Find a Specific Key

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
## Check the Number of Keys in Cache

To check the number of keys in the cache, you can use the `DBSIZE` command. The following is sample output:
```bash
redis> DBSIZE
:0
```
## Troubleshooting
### RedisException: Redis server went away
The following error occurs when Redis has not been enabled within the Site Dashboard:
```php
RedisException: Redis server went away in Redis->setOption() (line 28 of /srv/bindings/xxxxxxxx/code/sites/all/modules/redis/lib/Redis/Client/PhpRedis.php).
```
Enable Redis via the Pantheon Site Dashboard by going to **Settings** > **Add Ons** > **Add** > **Redis**. It may take a few minutes to provision the service.


### Redis is enabled but there is no data

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
```

The preceding conditional will only evaluate as true if the application in the Live environment is being invoked through a web visitor, but not via command line PHP. Therefore, Redis keys will only be populated through visits, but they will not be cleared or populated via Drush calls, which will result in caching issues for the site. Also, the cache configuration will only apply for the live site, making it difficult to confirm its operation in the development or staging environment prior to deployment.

To resolve this inconsistency, all Redis cache configuration should be enclosed in a conditional like this:

```
if (defined('PANTHEON_ENVIRONMENT')) {
  // Use Redis for caching.
}
```

This conditional will be true for both web visits and Drush calls. All Redis cache backend settings, plus any other application configuration that should be true no matter the context, should always be enclosed in these types of conditional blocks on Pantheon.

However, all redirection logic should remain nested in `isset($_SERVER['PANTHEON_ENVIRONMENT'])` conditionals, as you only want redirections to occur on web visits, not any Drush invocations.

In other words, don’t mix your application configuration and redirection logic together. You can have multiple logic blocks in your `settings.php` and it will fix these problems and will be easier for yourself and others to read and maintain.

### Cache Directory is Not Found

If you push your updates via Git, you may get the error that the Cache directory is not found, Class not found, or the `Cache.php` file was not found. This is because of a `.gitignore` issue that did not allow committing of the Redis cache files. Example error:
```bash
Fatal error: Class 'Redis_Cache' not found in
/srv/bindings/xxxxxxxx/code/sites/all/modules/cache_backport/cache.inc on line 71
```
It is possible that your `.gitignore` file is not up to date with the most recent version of your CMS. To resolve this, make sure you do not have any pending core updates.

The best and easiest way to update your core is by using Pantheon administration Dashboard. See [Applying Upstream Updates](/docs/upstream-updates) for the steps to update your project's code and get the most recent version of the `.gitignore`.

### Fatal Error: require\_once()

Distributions may vary in their directory structure. You will need to check the path at which the Redis module resides and change any paths in the example code snippet to match your path to the Redis module. The error would look something like this:
```bash
Fatal error: require_once(): Failed opening required
'/srv/bindings/xxxxxxxxx/code/sites/all/modules/redis/redis.autoload.inc'
```
### Drupal 6 Cache Backport

If you have a Drupal 6 site, you will also need the [Cache Backport](https://drupal.org/project/cache_backport) module. This module is a full backport of the Drupal 7 `cache.inc` for Drupal 6. See [INSTALL.TXT](http://drupalcode.org/project/cache_backport.git/blob_plain/HEAD:/INSTALL.txt) for how to configure Cache Backport.

If you see the following message:

```bash
File not found:
'sites/all/modules/cache_backport/system.admin.inc'
```
You skipped a step; `settings.php` must include the cache\_backport files. Add the following to `settings.php` before the Redis configuration:

```php
$conf['cache_inc'] = 'sites/all/modules/cache_backport/cache.inc';
```
## Frequently Asked Questions

#### What happens when Redis reaches maxmemory?

The behavior is the same as a standard Redis instance. The overall process is described best in the top four answers of [this thread](http://stackoverflow.com/questions/8652388/how-does-redis-work-when-ram-starts-filling-up), keeping in mind our `maxmemory-policy` is `allkeys-lru`.

#### Is Redis set up as an LRU cache?

We are using [allkeys-lru](http://redis.io/topics/lru-cache). Here is the Redis configuration file for your Live environment:

```nohighlight
cat redis.conf
port 11455
timeout 300
loglevel notice
logfile /srv/bindings/xxxxxxxxx/logs/redis.log
databases 16
save 900 1
save 300 10
save 60 10000
rdbcompression yes
dbfilename dump.rdb
dir /srv/bindings/xxxxxxxxx/data/
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

Yes. There is a `redis.log` file that is available on the Redis container for each environment. You can see where the log files and configuration reside:

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
