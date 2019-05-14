---
title: Installing Redis on Drupal or WordPress
description: Understand how to use Redis as a caching mechanism for your Pantheon site.
tags: [cacheapp, addons]
categories: []
contributors: [cityofoaksdesign]
---
import Callout from "components/callout";
import Alert from "components/alert";
import Accordion from "components/accordion"
import ExternalLink from "components/externalLink"

Redis is an open-source, networked, in-memory, key-value data store that can be used as a drop-in caching backend for your Drupal or WordPress website.

<Callout title="Agency DevOps Training" link="https://pantheon.io/agencies/learn-pantheon?docs">
  <p>
    Learn industry best practices for caching, how to take advantage of them on the platform, and troubleshooting common issues with help from the experts at Pantheon.
  </p>
</Callout>

## Benefits of Redis
Most website frameworks like Drupal and WordPress use the database to cache internal application "objects" which can be expensive to generate (menu trees, filter results, etc.), and to keep cached page content. Since the database also handles many queries for normal page requests, it is the most common bottleneck causing increase load-times.

Redis provides an alternative caching backend, taking that work off the database, which is vital for scaling to a larger number of logged-in users. It also provides a number of other nice features for developers looking to use it to manage queues, or do custom caching of their own.

## Enable Redis
All plans except for the Basic plan can use Redis. Sandbox site plans can enable and use Redis for developmental purposes, but if the site plan is upgraded to Basic, the feature will be disabled.

| Plans         | Redis Support <a rel="popover" data-proofer-ignore data-toggle="tooltip" data-html="true" data-content="Available across all environments, including Multidevs."><em class="fa fa-info-circle"></em></a> |
| ------------- | -------------------------------------- |
| Sandbox       | <span style="color:green">✔</span> |
| Basic         | <span style="color:red">❌</span>  |
| Performance   | <span style="color:green">✔</span> |
| Elite         | <span style="color:green">✔</span> |

> NOTE: Nav Tab Component  

<Alert title="Note" type="info">
  <p>
    <a href="https://wordpress.org/plugins/wp-redis/">WP Redis</a> is loaded via a drop-in file, so there's no need to activate it on your WordPress sites.
  </p>
</Alert>

> NOTE: Nav Tab Component  

<Accordion title={"Explore Advanced Install Methods (Optional)"} id={"advance-installs"} icon={"lightbulb"}>

#### Install via Composer

1. Set the Dev environment's connection mode to Git from within the Site Dashboard or via Terminus:

```bash 
terminus connection:set <site>.<env> git
```

2. [Clone the site's codebase](/docs/git/#clone-your-site-codebase) if you have not done so already.
3. Use the following within `composer.json` to install the WP Redis plugin as a drop-in via Composer using <ExternalLink text={"koodimonni/composer-dropin-installer"} link={"  https://github.com/Koodimonni/Composer-Dropin-Installer"}/>
 :

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



</Accordion>

## Use the Redis Command-Line Client
You don't need to install anything locally to use Redis on Pantheon. However, if you want to manually connect to the Pantheon-hosted Redis server for debugging, you'll need to install Redis on your machine.

1. Download Redis at <ExternalLink text={"https://redis.io/download"} link={"https://redis.io/download"}/> and install it on your local computer. Mac users may prefer to install Redis using <ExternalLink text={"Homebrew"} link={"(https://brew.sh/)"}/>(`brew install redis`).
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
Fatal error: Class 'Redis_CacheCompressed' not found in
/srv/bindings/xxxxxxxx/code/sites/all/modules/cache_backport/cache.inc on line 71
```

It is possible that your `.gitignore` file is not up to date with the most recent version of your CMS. To resolve this, make sure you do not have any pending core updates.

The best and easiest way to update your core is by using Pantheon administration Dashboard. See [WordPress and Drupal Core Updates](/docs/core-updates) for the steps to update your project's code and get the most recent version of the `.gitignore`.

### Fatal Error: require\_once()

This is likely due to some variance in your site's directory structure. You will need to check the path at which the Redis module resides and change any paths in the example code snippet to match your path to the Redis module. The error would look something like this:

```bash
Fatal error: require_once(): Failed opening required
'/srv/bindings/xxxxxxxxx/code/sites/all/modules/redis/redis.autoload.inc'
```

### Drupal 6 Cache Backport

If you have a Drupal 6 site, you will also need the <ExternalLink text={"Cache Backport"} link={"https://drupal.org/project/cache_backport"}/> module. This module is a full backport of the Drupal 7 `cache.inc` for Drupal 6. See <ExternalLink text={"INSTALL.TXT"} link={"http://drupalcode.org/project/cache_backport.git/blob_plain/HEAD:/INSTALL.txt"}/> for how to configure Cache Backport.

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
The following error occurs when modifying configurations for the <ExternalLink text={"Redis"} link={"https://www.drupal.org/project/redis"}/> module before it has been enabled:

```php
Symfony\Component\DependencyInjection\Exception\ServiceNotFoundException:
You have requested a non-existent service "cache.backend.redis".
```

Install and enable the module to resolve.

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

\*Redis is available on free Sandbox plans for usage during development and will remain through upgrades to any other plan except for Basic. See the <a href="#enable-redis" data-proofer-ignore>Enable Redis</a> section above for details about which account types have Redis on paid plans.

### What happens when Redis reaches maxmemory?
When the specified amount of memory is reached, Redis follows the `maxmemory-policy` configuration directive, which is defined in the platform `redis.conf` file. 

On Pantheon, the maxmemory policy is `allkeys-lru`: evict keys by trying to remove the less recently used (LRU) keys first, in order to make space for the new data added. For more information, please see the official <ExternalLink text={"Redis documentation"} link={"https://redis.io/topics/lru-cache"}/>.

### How is Redis configured on the platform?
Your `redis.conf` file can be retrieved via SFTP similarly to how you can download Redis log files (see below), or you can review it here:

```nohighlight
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

```nohighlight
$ sftp -o Port=2222 live.81fd3bea-d11b-401a-85e0-07ca0f4ce7cg@cacheserver.live.81fd3bea-d11b-401a-85e0-07ca0f4ce7cg.drush.in
Connected to cacheserver.live.81fd3bea-d11b-401a-85e0-07ca0f4ce7cg.drush.in.
sftp> ls
certs          chef.stamp     data           lock           logs           metadata.json  redis.conf     tmp
sftp> ls -la logs/
-rw-r--r-- 1 11455 11455 40674752 Mar 10 19:46 redis.log
sftp>
```

### Why won't my site work after importing a database backup?
When you replace the database with one that doesn't match the Redis cache, it can cause database errors on the site, and you may be unable to clear the cache via the Dashboard. To resolve the issue, [flush your Redis cache from the command line](#clear-cache).
