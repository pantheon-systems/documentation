---
title: Installing Redis on Drupal or WordPress
description: Understand how to use Redis as a caching mechanism for your Pantheon site.
tags: [cacheapp, addons]
categories: []
---
Redis is an open-source, networked, in-memory, key-value data store that can be used as a drop-in caching backend for your Drupal or WordPress website.

<div class="enablement">
  <h4 class="info" markdown="1">[Agency DevOps Training](https://pantheon.io/agencies/learn-pantheon?docs){.external}</h4>
  <p>Learn industry best practices for caching, how to take advantage of them on the platform, and troubleshooting common issues with help from the experts at Pantheon.</p>
</div>
## Benefits of Redis
Most website frameworks like Drupal and WordPress use the database to cache internal application "objects" which can be expensive to generate (menu trees, filter results, etc.), and to keep cached page content. Since the database also handles many queries for normal page requests, it is the most common bottleneck causing increase load-times.

Redis provides an alternative caching backend, taking that work off the database, which is vital for scaling to a larger number of logged-in users. It also provides a number of other nice features for developers looking to use it to manage queues, or do custom caching of their own.

## Enable Redis
All plans except for a Personal plan can use Redis. Redis is available to Sandbox plans for developmental purposes, but Redis will not be available going live on a Personal plan.

| Plans         | Supported
| ------------- |:-------------:|
| Sandbox       | **Yes**       |
| Personal      | No            |
| Professional  | **Yes**       |
| Business      | **Yes**       |
| Elite         | **Yes**       |

---

<!-- Nav tabs -->
<ul class="nav nav-tabs" role="tablist">
<!-- Active tab -->
<li id="tab-1-id" role="presentation" class="active"><a href="#tab-1-anchor" aria-controls="tab-1-anchor" role="tab" data-toggle="tab">WordPress</a></li>

<!-- 2nd Tab Nav -->
<li id="tab-2-id" role="presentation"><a href="#tab-2-anchor" aria-controls="tab-2-anchor" role="tab" data-toggle="tab">Drupal 8</a></li>

<!-- 3rd Tab Nav -->
<li id="tab-3-id" role="presentation"><a href="#tab-3-anchor" aria-controls="tab-3-anchor" role="tab" data-toggle="tab">Drupal 7</a></li>
</ul>

<!-- Tab panes -->
<div class="tab-content">
  <!-- Active pane content -->
  <div role="tabpanel" class="tab-pane active" id="tab-1-anchor" markdown="1">
  1. Enable Redis from your Pantheon Site Dashboard by going to **Settings** > **Add Ons** > **Add**. It may take a couple minutes for the Redis server to come online.
  2. Install the [WP Redis](https://wordpress.org/plugins/wp-redis/){.external} plugin via SFTP or Git. To install via [Terminus](/docs/terminus), [set the connection mode to SFTP](/docs/sftp) then run:

    ```
    terminus wp <site>.<env> -- plugin install wp-redis
    ```

    For site networks, you will need to specify the site URL by adding that to the command:

    ```
    terminus wp <site>.<env> -- plugin install wp-redis --url=<url>
    ```
  3. Create a new file named `wp-content/object-cache.php` that contains the following:

    ```php
    <?php
    # This is a Windows-friendly symlink
    require_once WP_CONTENT_DIR . '/plugins/wp-redis/object-cache.php';
    ```

    This file is a symlink to the `/plugins/wp-redis/object-cache.php` file. Using SFTP or Git, commit the new file to the Dev environment.
  4. In the Dev environment's WordPress Dashboard, verify installation by selecting **Drop-ins** from the Plugins section:

    ![The object-cache Drop-In Plugin](/docs/assets/images/redis-dropin-plugin.png "The object-cache plugin, visible in the Drop-ins section of Plugins.")

    When a new version of the WP Redis plugin is released, you can upgrade by the normal Plugin update mechanism in WordPress or via Terminus:

    ```
    terminus wp <site>.<env> -- plugin update wp-redis
    ```
  <div class="alert alert-info">
  <h4 class="info">Note</h4>
  <p markdown="1">[WP Redis](https://wordpress.org/plugins/wp-redis/){.external} is loaded via a drop-in file, so there's no need to activate it on your WordPress sites.</p></div>

  <div class="panel panel-drop panel-guide" id="accordion">
    <div class="panel-heading panel-drop-heading">
       <a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#advance-installs"><h3 class="panel-title panel-drop-title info" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-lightbulb"></span> Explore Advanced Install Methods (Optional)</h3></a>
     </div>
     <div id="advance-installs" class="collapse">
       <div class="panel-inner" markdown="1">
        #### Install via Composer {.info}
        1. Set the Dev environment's connection mode to Git from within the Site Dashboard or via Terminus:

            ```
            terminus connection:set <site>.<env> git
            ```
        2. [Clone the site's codebase](/docs/git/#clone-your-site-codebase) if you have not done so already.
        3. Use the following within `composer.json` to install the WP Redis plugin as a drop-in via Composer using [koodimonni/composer-dropin-installer](https://github.com/Koodimonni/Composer-Dropin-Installer){.external}:

            ```json
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
        4. Run `composer install` to install WP Redis into the `wp-content` directory.
        5. Use git status to verify your local state, then commit and push your code to Pantheon:

            ```bash
            git status
            git commit --all -m "Initiate composer, require custom code"
            git push origin master
            ```
        </div>
      </div>
    </div>
  </div>

  <!-- 2nd pane content -->
  <div role="tabpanel" class="tab-pane" id="tab-2-anchor" markdown="1">
  1. Enable the Redis cache server from your Pantheon Site Dashboard by going to **Settings** > **Add Ons** > **Add**. It may take a couple minutes for the Redis server to come online.
  2. Install and activate the [Redis](https://www.drupal.org/project/redis){.external} module from Drupal.org.

      <div class="alert alert-info">
      <h4 class="info">Note</h4><p markdown="1">You **must** activate the module before proceeding.
      </p></div>

      You can install and enable the module from the command line using [Terminus](/docs/terminus):

          terminus remote:drush <site>.<env> -- en redis -y
  3. Edit `sites/default/settings.php` to add the Redis cache configuration. These are the **mandatory**, required Redis configurations for every site.

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
        $settings['cache_prefix']['default'] = 'pantheon-redis';

        // Always set the fast backend for bootstrap, discover and config, otherwise this gets lost when Redis is enabled.
        $settings['cache']['bins']['bootstrap'] = 'cache.backend.chainedfast';
        $settings['cache']['bins']['discovery'] = 'cache.backend.chainedfast';
        $settings['cache']['bins']['config']    = 'cache.backend.chainedfast';

        // Set Redis to not get the cache_form (no performance difference).
        $settings['cache']['bins']['form']      = 'cache.backend.database';
      }
      ```
  4. On your dev site, navigate to `/admin/reports/status` and confirm that the **REDIS** line says "Connected, using the PhpRedis client."
  </div>

  <!-- 3rd pane content -->
  <div role="tabpanel" class="tab-pane" id="tab-3-anchor" markdown="1">
  1. Enable the Redis cache server from your Pantheon Site Dashboard by going to **Settings** > **Add Ons** > **Add**. It may take a couple minutes for the Redis server to come online.
  2. Add the [Redis](https://www.drupal.org/project/redis){.external} module from Drupal.org. You can install and enable the module from the command line using [Terminus](/docs/terminus):

          terminus remote:drush <site>.<env> -- en redis -y
  3. Ignore the directions bundled with the Redis module. Pantheon automatically manages the following `settings.php`/`$conf`/`variable_get` items for you:
      - `redis_client_host`
      - `redis_client_port`
      - `redis_client_password`
  4. Edit `sites/default/settings.php` to add the Redis cache configuration. These are the **mandatory**, required Redis configurations for every site.

      ```php
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
      ```
  7. Enable the module via `admin/build/modules`. This is necessary for cache clearing to work in all cases.
  8. Verify Redis is enabled by going to the Dashboard and clicking **Connection Info**. If you see the Redis cache connection string, Redis is enabled.
  9. Visit `/admin/config/development/performance/redis` and open **Connection Information** to verify the connection.
  </div>
</div>

## Use the Redis Command-Line Client
You don't need to install anything locally to use Redis on Pantheon. However, if you want to manually connect to the Pantheon-hosted Redis server for debugging, you'll need to install Redis on your machine.

1. Download Redis at [https://redis.io/download](https://redis.io/download){.external} and install it on your local computer.
2. From the Site Dashboard, select the desired environment (Dev, Test, or Live).
3. Click the **Connection Info** button, copy the Redis connection string, and run the command in your local terminal.
4. To verify that Redis is working, use the Redis Connection Info from the Dashboard. Once you've logged in, execute the following command:

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
5. To check if a specific key exists, you can pass the `exists` command. For example:

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

### No Keys Found
When the Dashboard status check reports that Redis is enabled but doesn't have any data (0 keys found), you'll want to confirm the logic behind the check for PANTHEON_ENVIRONMENT in your `settings.php` Redis cache configuration. Depending on the kind of test you're performing, you’ll get different results.

Example of a block that will result in an **incorrectly configured cache backend**:


```php
if (isset($_ENV['PANTHEON_ENVIRONMENT']) &&
  $_ENV['PANTHEON_ENVIRONMENT'] === 'live') {
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

```php
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
Fatal error: Class 'Redis_Cache' not found in
/srv/bindings/xxxxxxxx/code/sites/all/modules/cache_backport/cache.inc on line 71
```

It is possible that your `.gitignore` file is not up to date with the most recent version of your CMS. To resolve this, make sure you do not have any pending core updates.

The best and easiest way to update your core is by using Pantheon administration Dashboard. See [Applying Upstream Updates](/docs/upstream-updates) for the steps to update your project's code and get the most recent version of the `.gitignore`.

### Fatal Error: require\_once()

This is likely due to some variance in your site's directory structure. You will need to check the path at which the Redis module resides and change any paths in the example code snippet to match your path to the Redis module. The error would look something like this:

```bash
Fatal error: require_once(): Failed opening required
'/srv/bindings/xxxxxxxxx/code/sites/all/modules/redis/redis.autoload.inc'
```

### Drupal 6 Cache Backport

If you have a Drupal 6 site, you will also need the [Cache Backport](https://drupal.org/project/cache_backport){.external} module. This module is a full backport of the Drupal 7 `cache.inc` for Drupal 6. See [INSTALL.TXT](http://drupalcode.org/project/cache_backport.git/blob_plain/HEAD:/INSTALL.txt){.external} for how to configure Cache Backport.

If you see the following message:

```bash
File not found:
'sites/all/modules/cache_backport/system.admin.inc'
```

You skipped a step; `settings.php` must include the cache\_backport files. Add the following to `settings.php` before the Redis configuration:

```php
$conf['cache_inc'] = 'sites/all/modules/cache_backport/cache.inc';
```

### You have requested a non-existent service
The following error occurs when modifying configurations for the [Redis](https://www.drupal.org/project/redis){.external} module before it has been enabled:

```php
Symfony\Component\DependencyInjection\Exception\ServiceNotFoundException:
You have requested a non-existent service "cache.backend.redis".
```

Install and enable the module to resolve.

## Frequently Asked Questions
### What happens when Redis reaches maxmemory?
The behavior is the same as a standard Redis instance. The overall process is described best in the top four answers of [this thread](https://stackoverflow.com/questions/8652388/how-does-redis-work-when-ram-starts-filling-up){.external}, keeping in mind our `maxmemory-policy` is `allkeys-lru`.

### Is Redis set up as an LRU cache?
We are using [allkeys-lru](https://redis.io/topics/lru-cache){.external}. Here is the Redis configuration file for your Live environment:

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

### If Redis hits the upper limit of memory usage, is this logged on Pantheon?
Yes. There is a `redis.log` file that is available on the Redis container for each environment. You can see where the log files and configuration reside:

```nohighlight
$ sftp -o Port=2222 live.81fd3bea-d11b-401a-85e0-07ca0f4ce7cg@cacheserver.live.81fd3bea-d11b-401a-85e0-07ca0f4ce7cg.drush.in Connected to cacheserver.live.81fd3bea-d11b-401a-85e0-07ca0f4ce7cg.drush.in.
sftp> ls -la logs/
-rw-r--r-- 1 11455 11455 40674752 Mar 10 19:46 redis.log
sftp>
```

### Why won't my site work after importing a database backup?
When you replace the database with one that doesn't match the Redis cache, it can cause database errors on the site, and you may be unable to clear the cache via the dashboard. To resolve the issue, [flush your Redis cache from the command line](#clear-cache).
