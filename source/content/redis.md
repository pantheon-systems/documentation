---
title: Installing Redis on Drupal or WordPress
description: Understand how to use Redis as a caching mechanism for your Pantheon site.
categories: [performance]
tags: [cache, plugins, modules]
contributors: [cityofoaksdesign]
---
Redis is an open-source, networked, in-memory, key-value data store that can be used as a drop-in caching backend for your Drupal or WordPress website.

<Enablement title="Agency WebOps Training" link="https://pantheon.io/agencies/learn-pantheon?docs">

Learn industry best practices for caching, how to take advantage of them on the platform, and troubleshooting common issues with help from the experts at Pantheon.

</Enablement>

## Benefits of Redis

Most website frameworks like Drupal and WordPress use the database to cache internal application "objects" which can be expensive to generate (menu trees, filter results, etc.), and to keep cached page content. Since the database also handles many queries for normal page requests, it is the most common bottleneck causing increase load-times.

Redis provides an alternative caching backend, taking that work off the database, which is vital for scaling to a larger number of logged-in users. It also provides a number of other nice features for developers looking to use it to manage queues, or do custom caching of their own.

## Enable Redis

All plans except for the Basic plan can use Redis. Sandbox site plans can enable and use Redis for developmental purposes, but if the site plan is upgraded to Basic, the feature will be disabled.

| Plans         | Redis Support <Popover content="Available across all environments, including Multidevs."/> |
| ------------- | -------------------------------------- |
| Sandbox       | <span style="color:green">✔</span> |
| Basic         | ❌                                 |
| Performance   | <span style="color:green">✔</span> |
| Elite         | <span style="color:green">✔</span> |

<TabList>

<Tab title="WordPress" id="wp-install" active={true}>

1. Enable Redis from your Pantheon Site Dashboard by going to **Settings** > **Add Ons** > **Add**. It may take a couple minutes for the Redis server to come online.

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

1. Enable the Redis cache server from your Pantheon Site Dashboard by going to **Settings** > **Add Ons** > **Add**. It may take a couple minutes for the Redis server to come online.

1. Install and activate the [Redis](https://www.drupal.org/project/redis) module from Drupal.org.

  <Alert title="Note" type="info">

  You **must** activate the module before proceeding.

  </Alert>

  You can install and enable the module from the command line using [Terminus](/terminus):

  ```bash{promptUser: user}
  terminus remote:drush <site>.<env> -- en redis -y
  ```

1. Edit `sites/default/settings.php` to add the Redis cache configuration. These are the **mandatory**, required Redis configurations for every site.

   ```php:title=settings.php
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
     $settings['cache_prefix']['default'] = 'pantheon-redis';

     // Set Redis to not get the cache_form (no performance difference).
     $settings['cache']['bins']['form']      = 'cache.backend.database';
   }
   ```

   <Alert title="Note" type="info">

   The above Redis cache configuration should be placed in `sites/default/settings.php` rather than `settings.pantheon.php` to avoid conflicts with future upstream updates.

   </Alert>

1. On your dev site, navigate to `/admin/reports/status` and confirm that the **REDIS** line says "Connected, using the PhpRedis client."

</Tab>

<Tab title="Drupal 7" id={"d7-install"}>

<Alert title="Note" type="info">

This configuration uses the `Redis_CacheCompressed` class for better performance. This requires the Redis plugin version 3.13 or later. For versions before 3.13, use `Redis_Cache` in step 4 instead.

</Alert>

1. Enable the Redis cache server from your Pantheon Site Dashboard by going to **Settings** > **Add Ons** > **Add**. It may take a couple minutes for the Redis server to come online.

1. Add the [Redis](https://www.drupal.org/project/redis) module from Drupal.org. You can install and enable the module from the command line using [Terminus](/terminus):

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

### Clear Cache

Pass the `flushall` command to clear all keys from the cache.

```bash
redis> flushall
OK
```

### Check the Number of Keys in Cache

To check the number of keys in the cache, you can use the `DBSIZE` command. The following is sample output:

```bash
redis> DBSIZE
:0
```

## Troubleshooting

### Cannot Activate the Redis Plugin for WordPress

WP Redis is a drop-in plugin that should only be loaded using the installation methods above. No activation is required.

### RedisException: Redis server went away

The following error occurs when Redis has not been enabled within the Site Dashboard:

```php
RedisException: Redis server went away in Redis->setOption() (line 28 of /srv/bindings/xxxxxxxx/code/sites/all/modules/redis/lib/Redis/Client/PhpRedis.php).
```

Enable Redis via the Pantheon Site Dashboard by going to **Settings** > **Add Ons** > **Add** > **Redis**. It may take a few minutes to provision the service.

### RedisException: Redis is busy running a script.

This usually occurs on higher traffic Drupal sites. In the PHP logs:

```php
RedisException: BUSY Redis is busy running a script.
```

To resolve, set or increase the `redis_perm_ttl` value in `settings.php`. This example is set to six hours:

```php:title=settings.php
$conf['redis_perm_ttl'] = 21600;
```

<Alert title="Warning" type="danger">

The Redis cache needs to be flushed with 'flushall' in the Redis terminal connection afterwards, in order for this to have any effect.

</Alert>

### No Keys Found

When the Dashboard status check reports that Redis is enabled but doesn't have any data (0 keys found), you'll want to confirm the logic behind the check for PANTHEON_ENVIRONMENT in your `settings.php` Redis cache configuration. Depending on the kind of test you're performing, you’ll get different results.

Example of a block that will result in an **incorrectly configured cache backend**:

```php:title=settings.php
if (isset($_ENV['PANTHEON_ENVIRONMENT']) &&
  $_ENV['PANTHEON_ENVIRONMENT'] === 'live') {
    // Use Redis for caching.
    $conf['redis_client_interface'] = 'PhpRedis';
    $conf['cache_backends'][] = 'sites/all/modules/redis/redis.autoload.inc';
    $conf['cache_default_class'] = 'Redis_CacheCompressed';
    $conf['cache_prefix'] = array('default' => 'pantheon-redis');
    // Do not use Redis for cache_form (no performance difference).
    $conf['cache_class_cache_form'] = 'DrupalDatabaseCache';
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

### Drupal 6 Cache Backport

If you have a Drupal 6 site, you will also need the [Cache Backport](https://drupal.org/project/cache_backport) module. This module is a full backport of the Drupal 7 `cache.inc` for Drupal 6. See [INSTALL.TXT](https://git.drupalcode.org/project/cache_backport/blob/master/INSTALL.txt) for how to configure Cache Backport.

If you see the following message:

```bash
File not found:
'sites/all/modules/cache_backport/system.admin.inc'
```

You skipped a step; `settings.php` must include the cache\_backport files. Add the following to `settings.php` before the Redis configuration:

```php:title=settings.php
$conf['cache_inc'] = 'sites/all/modules/cache_backport/cache.inc';
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

## Frequently Asked Questions

### How much Redis cache is available for each plan level?

| Plan                   | Cache Memory Limit (in MB) |
| ---------------------- | -------------------------- |
| Sandbox*               |               64           |
| Performance Small      |               64           |
| Performance M, L, XL   |               512          |
| Professional           |               256          |
| Flagship               |               512          |
| Business               |               512          |
| BusinessXL             |               1024         |
| Elite                  |               1024         |

*Redis is available on free Sandbox plans for usage during development and will remain through upgrades to any other plan except for Basic. See the [Enable Redis](#enable-redis) section above for details about which account types have Redis on paid plans.

### What happens when Redis reaches maxmemory?

When the specified amount of memory is reached, Redis follows the `maxmemory-policy` configuration directive, which is defined in the platform `redis.conf` file.

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

When you replace the database with one that doesn't match the Redis cache, it can cause database errors on the site, and you may be unable to clear the cache via the Dashboard. To resolve the issue, [flush your Redis cache from the command line](#clear-cache).

## Safely Remove Redis

The following code changes are required before Redis can be safely uninstalled and disabled:

<TabList>

<Tab title="WordPress" id="wp-uninstall" active={true}>

<Partial file="remove-addons/wp-redis.md" />

</Tab>

<Tab title="Drupal" id="drops-uninstall">

<Partial file="remove-addons/drupal-redis.md" />

</Tab>

</TabList>
