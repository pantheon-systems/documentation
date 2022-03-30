---
title: "Object Cache (formerly Redis)"
description: Understand how to use Object Cache as a drop-in caching mechanism for your Pantheon site.
categories: [performance]
tags: [cache, plugins, modules, database]
contributors: [cityofoaksdesign, carolynshannon, whitneymeredith]
reviewed: "2022-02-10"
---

Pantheon's [<dfn id="objectcache">Object Cache (formerly Redis)</dfn>](/object-cache) is an open-source, networked, in-memory, key-value data store based on Redis that can be used as a drop-in caching backend for your Drupal or WordPress website.

## Benefits of Object Cache

Most website frameworks like Drupal and WordPress use databases to cache internal application "objects" along with queries for normal page requests, which causes increased load-times.

Object Cache remembers, or caches, any queries to the server after the first time a Drupal or WordPress page is loaded. When another user loads the page, the results are provided from the Object Cache stored in memory without needing to query the database again. This results in much faster page load times, and less server impact on database resources.

### Scalable Performance

Object Cache provides an alternative caching backend that resides in memory rather than databases that store data on disks or SSDs. By eliminating the need to access disks, Object Cache avoids seek time delays and can access data in microseconds. This improves performance for dynamic pages and logged-in users. It also provides a number of other features for developers looking to use it to manage queues, or perform custom caching of their own.

## Enable Object Cache

All plans except for the Basic plan can use Object Cache. Sandbox site plans can enable and use Object Cache for development purposes, but if the site plan is upgraded to Basic, the feature will be disabled.

| Plans         | Object Cache Support <Popover content="Available across all environments, including Multidevs."/> |
| ------------- | -------------------------------------- |
| Sandbox       | <span style="color:green">✔</span> |
| Basic         | ❌                                 |
| Performance   | <span style="color:green">✔</span> |
| Elite         | <span style="color:green">✔</span> |

<TabList>

<Tab title="WordPress" id="wp-install" active={true}>

1. Enable Object Cache from your Pantheon Site Dashboard by going to **Settings** > **Add Ons** > **Add**. It may take a couple minutes for the Object Cache server to come online.

1. Install the [WP Redis](https://wordpress.org/plugins/wp-redis/) plugin via SFTP or Git. To install via [Terminus](/terminus), [set the connection mode to SFTP](/sftp) then run:

  ```bash{promptUser: user}
  terminus wp <site>.<env> -- plugin install wp-redis
  ```

  For site networks, you will need to specify the site URL by adding that to the command:

  ```bash{promptUser: user}
  terminus wp <site>.<env> -- plugin install wp-redis --url=<url>
  ```

1. Create a new file named `wp-content/object-cache.php` that contains the following:

  ```php:title="object-cache.php"
  <?php
  # This is a Windows-friendly symlink
  if (!empty($_ENV['CACHE_HOST'])) {
    require_once WP_CONTENT_DIR . '/plugins/wp-redis/object-cache.php';
  }
  ```

  This file is a symlink to the `/plugins/wp-redis/object-cache.php` file. Using SFTP or Git, commit the new file to the Dev environment.

1. In the Dev environment's WordPress Dashboard, verify installation by selecting **Drop-ins** from the Plugins section:

  ![The object-cache Drop-In Plugin](../images/redis-dropin-plugin.png "The object-cache plugin, visible in the Drop-ins section of Plugins.")

  When a new version of the WP Redis plugin is released, you can upgrade by the normal Plugin update mechanism in WordPress or via Terminus:

  ```bash{promptUser: user}
  terminus wp <site>.<env> -- plugin update wp-redis
  ```

<Alert title="Note" type="info">

[WP Redis](https://wordpress.org/plugins/wp-redis/) is loaded via a drop-in file, so there's no need to activate it on your WordPress sites.

</Alert>

<Accordion title="Explore Advanced Install Methods (Optional)" id="advance-installs" icon="lightbulb">

#### Install via Composer

1. Set the Dev environment's connection mode to Git from within the Site Dashboard or via Terminus:

  ```bash{promptUser: user}
  terminus connection:set <site>.<env> git
  ```

1. [Clone the site's codebase](/git/#clone-your-site-codebase) if you have not done so already.

1. Use the following within `composer.json` to install the WP Redis plugin as a drop-in via Composer using [koodimonni/composer-dropin-installer](https://github.com/Koodimonni/Composer-Dropin-Installer):

  ```json:title=composer.json
  "repositories": {
    "wpackagist": {
      "type": "composer",
      "url": "https://wpackagist.org"
    }
  },
  "require": {
    "composer/installers": "^1.0.21",
    "koodimonni/composer-dropin-installer": "*",
    "wpackagist-plugin/wp-redis": "0.6.0"
    },
    "extra": {
      "installer-paths": {
        "wp-content/plugins/{$name}/": ["type:wordpress-plugin"]
        },
      "dropin-paths": {
          "wp-content": [
          "package:wpackagist-plugin/wp-redis:object-cache.php"
        ]
      }
    }
  ```

1. Run `composer install` to install WP Redis into the `wp-content` directory.

1. Use git status to verify your local state, then commit and push your code to Pantheon:

  ```bash{promptUser: user}
  git status
  git commit --all -m "Initiate composer, require custom code"
  git push origin master
  ```

</Accordion>

</Tab>

<Tab title="Drupal 8" id="d8-install">

1. Enable Object Cache from your Pantheon Site Dashboard by going to **Settings** > **Add Ons** > **Add**. It may take a couple minutes for Object Cache to come online.

1. Install and activate the [Redis](https://www.drupal.org/project/redis) module from Drupal.org.

  <Alert title="Note" type="info">

  You **must** activate the module before proceeding.

  </Alert>

  You can install and enable the module from the command line using [Terminus](/terminus):

  ```bash{promptUser: user}
  terminus remote:drush <site>.<env> -- en redis -y
  ```

1. Edit `sites/default/settings.php` to add the Redis cache configuration. These are the **mandatory**, required Redis configurations for every site.

   ```php:title=sites/default/settings.php
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

     $settings['redis_compress_length'] = 100;
     $settings['redis_compress_level'] = 1;

     $settings['cache']['default'] = 'cache.backend.redis'; // Use Redis as the default cache.
     $settings['cache_prefix']['default'] = 'pantheon-redis';

     $settings['cache']['bins']['form'] = 'cache.backend.database'; // Use the database for forms
   }
   ```

   <Alert title="Note" type="info">

   The above Redis cache configuration should be placed in `sites/default/settings.php` rather than `settings.pantheon.php` to avoid conflicts with future upstream updates.

   </Alert>

1. On your dev site, navigate to `/admin/reports/status` and confirm that the **REDIS** line says "Connected, using the PhpRedis client."

<Accordion title="Database Cleanup (optional)" id="database-cleanup-d8" icon="lightbulb">

After enabling Redis via this method, there are cache tables in the database that are no longer being used. Even when the Drupal cache is cleared, these tables will not be emptied. For sites that were live for awhile before Redis was enabled, there could be significant amounts of data in these tables. Removing this data could increase the speed of cloning, exporting and backing up the database.

To do this, [connect directly to MySQL](/mysql-access) and run the command:

```sql
SHOW TABLES LIKE 'cache%';
```

This returns a list of all the cache tables in the database. These are safe to empty, but don't remove the tables themselves in case Redis is disabled in the future.

To empty them, run this command on each table, replacing `<tablename>` with the name of the cache table:

```sql
TRUNCATE TABLE `<tablename>`;
```

</Accordion>

</Tab>

<Tab title="Drupal 9 / Composer-managed" id="d9-install">

1. Clone the code repository and, from the project root, run the following:

   ```shell{promptUser: user}
   terminus connection:set $SITE.dev git
   terminus redis:enable $SITE
   composer require drupal/redis
   git commit --am "Add drupal/redis dependency"
   git push origin master
   ```

1. Enable the new module and export configuration:  
   ```shell{promptUser: user}
   terminus connection:set $SITE.dev sftp
   terminus drush $SITE.dev -- en redis -y
   terminus drush $SITE.dev -- config:export -y
   terminus env:commit $SITE.dev --message="Enable Redis, export configuration"
   ```

1. Edit `sites/default/settings.php` to add the Redis cache configuration. These are **mandatory**, required Redis configurations for every site:

   ```php:title=sites/default/settings.php
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

     $settings['redis_compress_length'] = 100;
     $settings['redis_compress_level'] = 1;

     $settings['cache']['default'] = 'cache.backend.redis'; // Use Redis as the default cache.
     $settings['cache_prefix']['default'] = 'pantheon-redis';

     $settings['cache']['bins']['form'] = 'cache.backend.database'; // Use the database for forms
   }
   ```

   <Alert title="Note" type="info">

   The above Redis cache configuration should be placed in `sites/default/settings.php`, rather than `settings.pantheon.php`, to avoid conflicts with future upstream updates.

   </Alert>

</Tab>

<Tab title="Drupal 7" id="d7-install">

<Alert title="Note" type="info">

This configuration uses the `Redis_CacheCompressed` class for better performance. This requires the Redis module version 3.13 or later. For versions before 3.13, use `Redis_Cache` in step 4 instead.

</Alert>

<Alert title="Note" type="info">

The current version of the Redis module for Drupal 7 does not work with PHP 7.4, which uses the `php-redis 5.x` library. Refer to [Drupal 7 and PHP 7.4](/object-cache#drupal-7-and-php-74) for more information.

</Alert>

1. Enable the Redis cache server from your Pantheon Site Dashboard by going to **Settings** > **Add Ons** > **Add**. It may take a couple minutes for the Redis server to come online.

1. Add the [Redis](https://www.drupal.org/project/redis) module from Drupal.org. You can install and enable the module from the command line using [Terminus](/terminus):

  ```bash{promptUser: user}
  terminus remote:drush <site>.<env> -- en redis -y
  ```

1. Ignore the directions bundled with the Redis module. Pantheon automatically manages the following `settings.php`/`$conf`/`variable_get` items for you:
   - `redis_client_host`
   - `redis_client_port`
   - `redis_client_password`

1. Edit `sites/default/settings.php` to add the Redis cache configuration. These are the **mandatory**, required Redis configurations for every site.

  ```php:title=settings.php
  // All Pantheon Environments.
  if (defined('PANTHEON_ENVIRONMENT')) {
    // Use Redis for caching.
    $conf['redis_client_interface'] = 'PhpRedis';

    // Point Drupal to the location of the Redis plugin.
    $conf['cache_backends'][] = 'sites/all/modules/redis/redis.autoload.inc';
    // If you've installed your plugin in a contrib directory, use this line instead:
    // $conf['cache_backends'][] = 'sites/all/modules/contrib/redis/redis.autoload.inc';

    $conf['cache_default_class'] = 'Redis_CacheCompressed';
    $conf['cache_prefix'] = array('default' => 'pantheon-redis');

    // Do not use Redis for cache_form (no performance difference).
    $conf['cache_class_cache_form'] = 'DrupalDatabaseCache';

    // Use Redis for Drupal locks (semaphore).
    $conf['lock_inc'] = 'sites/all/modules/redis/redis.lock.inc';
    // Or if you've installed the redis module in a contrib subdirectory, use:
    // $conf['lock_inc'] = 'sites/all/modules/contrib/redis/redis.lock.inc';

  }
  ```

1. Enable the module via from `/admin/modules` if you haven't already done so with Terminus.

1. Verify Redis is enabled by going to the Dashboard and clicking **Connection Info**. If you see the Redis cache connection string, Redis is enabled.

1. Visit `/admin/config/development/performance/redis` and open **Connection Information** to verify the connection.

<Accordion title="Database Cleanup (optional)" id="database-cleanup-d7" icon="lightbulb">

After enabling Redis, there are cache tables in the database that are no longer being used. Even when the Drupal cache is cleared, these tables will not be emptied. For sites that were live for awhile before Redis was enabled, there could be significant amounts of data in these tables. Removing this data could increase the speed of cloning, exporting and backing up the database.

To do this, [connect directly to MySQL](/mysql-access) and run the command:

```sql
SELECT table_name FROM information_schema.tables WHERE table_name LIKE 'cache%' AND table_name != 'cache_form';
```

This returns a list of all the cache tables in the database. These are safe to empty, but don't remove the tables themselves in case Redis is disabled in the future.

To empty them, run this command on each table, replacing `<tablename>` with the name of the cache table:

```sql
TRUNCATE TABLE `<tablename>`;
```

</Accordion>

</Tab>

</TabList>

## Use the Redis Command-Line Client

You don't need to install anything locally to use Redis on Pantheon. However, if you want to manually connect to the Pantheon-hosted Redis server for debugging, you'll need to install Redis on your machine.

1. Download Redis at [https://redis.io/download](https://redis.io/download) and install it on your local computer. Mac users may prefer to install Redis using [Homebrew](https://brew.sh/) (`brew install redis`).

1. From the Site Dashboard, select the desired environment (Dev, Test, or Live).

1. Click the **Connection Info** button, copy the Redis connection string, and run the command in your local terminal.

1. To verify that Redis is working, use the Redis Connection Info from the Dashboard. Once you've logged in, execute the following command:

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

  If Redis is configured properly, it should output appropriate keys. If it returns nothing (empty), proceed to the [Troubleshooting](#troubleshooting) section below.

1. To check if a specific key exists, you can pass the `exists` command. For example:

  ```bash
  redis> SET key1 "Hello"
  OK
  redis> EXISTS key1
  (integer) 1
  redis> EXISTS key2
  (integer) 0
  redis>
  ```

### Find a Specific Key

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

### Clear Cache in Pantheon Dashboard

You can clear the Object Cache through the [Pantheon Dashboard](https://pantheon.io/docs/clear-caches#pantheon-dashboard). Clearing the Object Cache this way sets all keys to expire, or clear, when initiated. 

Alternatively, you can use the `flushall` command to clear all keys from the cache.

```bash
redis> flushall
OK
```

### Clear Cache with WP Redis

When [WP Redis](https://wordpress.org/plugins/wp-redis/) is installed, any operation that calls the WordPress function `wp_cache_flush()` will also clear the entire Redis cache. This happens during WordPress core upgrades, and when clearing the cache via the [Pantheon Advanced Page Cache](https://wordpress.org/plugins/pantheon-advanced-page-cache) plugin or the Pantheon dashboard.

### Check the Number of Keys in Cache

To check the number of keys in the cache, you can use the `DBSIZE` command. The following is sample output:

```bash
redis> DBSIZE
:0
```

### View Service Configuration Details

To check the cache memory, you can use the `config get *memory*` command. The following is sample output:

```bash
redis> config get *memory*
maxmemory
52428800
```

### Hit/Miss Ratio

You can use the `info stats` option to view the Hit/Miss ratio. The Hit/Miss ratio describes cache efficiency and provides relevant information about your approach. A low cache hit ratio results in larger latency since most of the requests are fetching data from the disk. In this instance, you should reconsider the data you have stored and increase the size of the Redis cache to improve your sites’s performance. A low cache hit is usually the result of premature optimization in the early stages of project when you can only guess which data you should cache.

Run the following code to access your Hit/Miss ratio:

```bash
  redis> info stats
  #Stats
  keyspace_hits:4
  keyspace_misses:15
  ```

### Continuous Stats Mode

Continuous Stats Mode uses the `--stat` option to monitor Object Cache instances in real time. In this mode, a new line of information with differences between old data points and new data points is printed every second by default. This allows you to view memory usage and connected clients. 

Run the following command to access stat mode: 

  ```bash
  redis> --stat
  ------- data ------ --------------------- load -------------------- - child -
  keys       mem      clients blocked requests            connections
  506        1015.00K 1       0       24 (+0)             7
  506        1015.00K 1       0       25 (+1)             7
  506        3.40M    51      0       60461 (+60436)      57
  506        3.40M    51      0       146425 (+85964)     107
  507        3.40M    51      0       233844 (+87419)     157
  507        3.40M    51      0       321715 (+87871)     207
  508        3.40M    51      0       408642 (+86927)     257
  508        3.40M    51      0       497038 (+88396)     257
  ```

You can also use the `i` (interval) option in this mode to change the frequency at which new lines are printed. 

### Big Keys Mode

Object Cache works as a key space analyzer when using the `--bigkeys` option. It scans the dataset for big keys, but also provides information about the data types within the dataset. 

Run the following command to search for big keys:

    ```bash
      redis> --bigkeys

      # Scanning the entire keyspace to find biggest keys as well as
      # average sizes per key type.  You can use -i 0.01 to sleep 0.01 sec
      # per SCAN command (not usually needed).

      [00.00%] Biggest string found so far 'key-419' with 3 bytes
      [05.14%] Biggest list   found so far 'mylist' with 100004 items
      [35.77%] Biggest string found so far 'counter:__rand_int__' with 6 bytes
      [73.91%] Biggest hash   found so far 'myobject' with 3 fields

      -------- summary -------

      Sampled 506 keys in the keyspace!
      Total key length in bytes is 3452 (avg len 6.82)

      Biggest string found 'counter:__rand_int__' has 6 bytes
      Biggest   list found 'mylist' has 100004 items
      Biggest   hash found 'myobject' has 3 fields

      504 strings with 1403 bytes (99.60% of keys, avg size 2.78)
      1 lists with 100004 items (00.20% of keys, avg size 100004.00)
      0 sets with 0 members (00.00% of keys, avg size 0.00)
      1 hashs with 3 fields (00.20% of keys, avg size 3.00)
      0 zsets with 0 members (00.00% of keys, avg size 0.00)
    ```

## Troubleshooting

### Cannot Activate the Redis Plugin for WordPress

WP Redis is a drop-in plugin that should only be loaded using the installation methods above. No activation is required.

### Drupal 7 and PHP 7.4

The current version of the [Drupal 7 Redis module](https://www.drupal.org/project/redis) is not compatible with PHP 7.4, which uses the `php-redis 5.x` library. You may get errors like this:

```php
Deprecated function: Function Redis::delete() is deprecated in Redis_Lock_PhpRedis->lockRelease() (line 111 of /web/sites/all/modules/contrib/redis/lib/Redis/Lock/PhpRedis.php).
```

To patch the Redis module, visit [Drupal.org](https://www.drupal.org/project/redis/issues/3074189), download the latest patch, and patch the module in the site's code with these changes.

### RedisException: Redis server went away

The following error occurs when Redis has not been enabled within the Site Dashboard:

```php
RedisException: Redis server went away in Redis->setOption() (line 28 of /srv/bindings/xxxxxxxx/code/sites/all/modules/redis/lib/Redis/Client/PhpRedis.php).
```

Enable Redis via the Pantheon Site Dashboard by going to **Settings** > **Add Ons** > **Add** > **Redis**. It may take a few minutes to provision the service.


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

However, all redirection logic should remain nested in `isset($_ENV['PANTHEON_ENVIRONMENT'])` conditionals, as you only want redirections to occur on web visits, not any Drush invocations.

In other words, don’t mix your application configuration and redirection logic together. You can have multiple logic blocks in your `settings.php` and it will fix these problems and will be easier for yourself and others to read and maintain.

### Cache Directory is Not Found

If you push your updates via Git, you may get the error that the Cache directory is not found, Class not found, or the `Cache.php` file was not found. This is because of a `.gitignore` issue that did not allow committing of the Redis cache files. Example error:

```bash
Fatal error: Class 'Redis_CacheCompressed' not found in
/srv/bindings/xxxxxxxx/code/sites/all/modules/cache_backport/cache.inc on line 71
```

It is possible that your `.gitignore` file is not up to date with the most recent version of your CMS. To resolve this, make sure you do not have any pending core updates.

The best and easiest way to update your core is by using Pantheon administration Dashboard. See [WordPress and Drupal Core Updates](/core-updates) for the steps to update your project's code and get the most recent version of the `.gitignore`.

### Fatal Error: require\_once()

This is likely due to some variance in your site's directory structure. You will need to check the path at which the Redis module resides and change any paths in the example code snippet to match your path to the Redis module. The error would look something like this:

```bash
Fatal error: require_once(): Failed opening required
'/srv/bindings/xxxxxxxxx/code/sites/all/modules/redis/redis.autoload.inc'
```


### You have requested a non-existent service

The following error occurs when modifying configurations for the [Redis](https://www.drupal.org/project/redis) module before it has been enabled:

```php
Symfony\Component\DependencyInjection\Exception\ServiceNotFoundException:
You have requested a non-existent service "cache.backend.redis".
```

Install and enable the module to resolve.

### Heavy Redis transactions tracing back to a specific plugin (WordPress)

A page load with 2,000 Redis calls can be 2 full seconds of object cache transactions. If a plugin you're using is erroneously creating a huge number of cache keys, you might be able to mitigate the problem by disabling cache persistency for the plugin's group in your theme's `function.php` file, or an [MU-plugin](/mu-plugin):

```php
wp_cache_add_non_persistent_groups( array( 'bad-actor' ) );
```

This declaration means use of `wp_cache_set( 'foo', 'bar', 'bad-actor' );` and `wp_cache_get( 'foo', 'bad-actor' );` will not use Redis, and instead fall back to WordPress' default runtime object cache.

### Out of Memory Errors

You can use the `info memory` option to view your site's memory metrics. Object Cache will always use more memory than declared in `maxmemory`. Out of Memory errors can be avoided by configuring a max memory limit **and** an [eviction policy](https://docs.redis.com/latest/rs/concepts/memory-performance/eviction-policy/). Without an eviction policy, the server will not evict any keys, which prevents any writes until memory is freed. With an eviction policy in place, the server will evict keys when memory usage reaches the `maxmemory` limit. 

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

## Frequently Asked Questions

### How much Object cache is available for each plan level?

| Plan                   | Cache Memory Limit (in MB) |
| ---------------------- | -------------------------- |
| Sandbox*               |               64           |
| Basic                  |               N/A          |
| Performance Small      |               256          |
| Performance M, L, XL   |               512          |
| Elite                  |               1024         |

*Object Cache is available on free Sandbox plans for usage during development and will remain through upgrades to any other plan except for Basic. See the [Enable Object Cache](#enable-object-cache) section above for details about which account types have Object Cache on paid plans.

### What happens when Object Cache reaches maxmemory?

When the specified amount of memory is reached, Object Cache follows the `maxmemory-policy` configuration directive, which is defined in the platform `redis.conf` file.

On Pantheon, the maxmemory policy is `allkeys-lru`: evict keys by trying to remove the less recently used (LRU) keys first, in order to make space for the new data added. For more information, please see the official [Redis documentation](https://redis.io/topics/lru-cache).

### How is Redis configured on the platform?

Your `redis.conf` file can be retrieved via SFTP similarly to how you can download Redis log files (see below), or you can review it here:

```batch:title=redis.conf
port xxxxx
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
requirepass xxxxx
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

Note that the `maxmemory` value will vary based on plan level.

### If Redis hits the upper limit of memory usage, is this logged on Pantheon?

Yes. There is a `redis.log` file that is available on the Redis container for each environment.

To access the Redis container, copy the SFTP command line string from the **Connection Info** button, and replace `appserver` with `cacheserver`. You can see where the log files and configuration reside:

```bash{outputLines:2-7}
sftp -o Port=2222 live.81fd3bea-d11b-401a-85e0-07ca0f4ce7cg@cacheserver.live.81fd3bea-d11b-401a-85e0-07ca0f4ce7cg.drush.in
Connected to cacheserver.live.81fd3bea-d11b-401a-85e0-07ca0f4ce7cg.drush.in.
sftp> ls
certs          chef.stamp     data           lock           logs           metadata.json  redis.conf     tmp
sftp> ls -la logs/
-rw-r--r-- 1 11455 11455 40674752 Mar 10 19:46 redis.log
sftp>
```

### Why won't my site work after importing a database backup?

When you replace the database with one that doesn't match the object cache, it can cause database errors on the site, and you may be unable to clear the cache via the Dashboard. To resolve the issue, [flush the object cache from the command line](#clear-cache).

## Safely Remove Object Cache

The following code changes are required before Object Cache can be safely uninstalled and disabled:

<TabList>

<Tab title="WordPress" id="wp-uninstall" active={true}>

<Partial file="remove-addons/wp-redis.md" />

</Tab>

<Tab title="Drupal" id="drops-uninstall">

<Partial file="remove-addons/drupal-redis.md" />

</Tab>

</TabList>
