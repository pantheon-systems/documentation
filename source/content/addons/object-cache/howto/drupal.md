---
title: Enable Object Cache for Drupal
description: How to install and configure Object Cache for Drupal.
permalink: docs/object-cache/drupal
tags: [cache, plugins, modules, database]
reviewed: "2023-08-17"
contenttype: [doc]
innav: [true]
categories: [cache]
cms: [--]
audience: [development]
product: [--]
integration: [--]
showtoc: true
contributors: [cityofoaksdesign, carolynshannon, jms-pantheon, whitneymeredith]
---
## Drupal 9.3+ / Composer-managed
1. Navigate to your Pantheon Site Dashboard, select **Settings**, select **Add Ons**, then select **Add** to enable the Redis cache server. It might take a couple of minutes for the Redis server to come online.

1. Clone the code repository and run the following from the project root:

   ```shell{promptUser: user}
   terminus connection:set $SITE.dev git
   terminus redis:enable $SITE
   composer require drupal/redis
   git add . && git commit -m "Add drupal/redis dependency" && git push origin master
   ```

1. Enable the new Redis module and export configuration:

   ```shell{promptUser: user}
   terminus connection:set $SITE.dev sftp
   terminus drush $SITE.dev -- en redis -y
   terminus drush $SITE.dev -- config:export -y
   terminus env:commit $SITE.dev --message="Enable Redis, export configuration"
   ```

1. Edit `sites/default/settings.php` to add the Redis cache configuration. These are **mandatory**, required Redis configurations for every site:

   ```php:title=sites/default/settings.php
   // Configure Redis

   if (defined(
    'PANTHEON_ENVIRONMENT'
  ) && !\Drupal\Core\Installer\InstallerKernel::installationAttempted(
  ) && extension_loaded('redis')) {
    // Set Redis as the default backend for any cache bin not otherwise specified.
    $settings['cache']['default'] = 'cache.backend.redis';

    //phpredis is built into the Pantheon application container.
    $settings['redis.connection']['interface'] = 'PhpRedis';

    // These are dynamic variables handled by Pantheon.
    $settings['redis.connection']['host'] = $_ENV['CACHE_HOST'];
    $settings['redis.connection']['port'] = $_ENV['CACHE_PORT'];
    $settings['redis.connection']['password'] = $_ENV['CACHE_PASSWORD'];

    $settings['redis_compress_length'] = 100;
    $settings['redis_compress_level'] = 1;

    $settings['cache_prefix']['default'] = 'pantheon-redis';

    $settings['cache']['bins']['form'] = 'cache.backend.database'; // Use the database for forms

    // Apply changes to the container configuration to make better use of Redis.
    // This includes using Redis for the lock and flood control systems, as well
    // as the cache tag checksum. Alternatively, copy the contents of that file
    // to your project-specific services.yml file, modify as appropriate, and
    // remove this line.
    $settings['container_yamls'][] = 'modules/contrib/redis/example.services.yml';

    // Allow the services to work before the Redis module itself is enabled.
    $settings['container_yamls'][] = 'modules/contrib/redis/redis.services.yml';

    // Manually add the classloader path, this is required for the container
    // cache bin definition below.
    $class_loader->addPsr4('Drupal\\redis\\', 'modules/contrib/redis/src');

    // Use redis for container cache.
    // The container cache is used to load the container definition itself, and
    // thus any configuration stored in the container itself is not available
    // yet. These lines force the container cache to use Redis rather than the
    // default SQL cache.
    $settings['bootstrap_container_definition'] = [
      'parameters' => [],
      'services' => [
        'redis.factory' => [
          'class' => 'Drupal\redis\ClientFactory',
        ],
        'cache.backend.redis' => [
          'class' => 'Drupal\redis\Cache\CacheBackendFactory',
          'arguments' => [
            '@redis.factory',
            '@cache_tags_provider.container',
            '@serialization.phpserialize',
          ],
        ],
        'cache.container' => [
          'class' => '\Drupal\redis\Cache\PhpRedis',
          'factory' => ['@cache.backend.redis', 'get'],
          'arguments' => ['container'],
        ],
        'cache_tags_provider.container' => [
          'class' => 'Drupal\redis\Cache\RedisCacheTagsChecksum',
          'arguments' => ['@redis.factory'],
        ],
        'serialization.phpserialize' => [
          'class' => 'Drupal\Component\Serialization\PhpSerialize',
        ],
      ],
    ];
}

   ```

   <Alert title="Note" type="info">

   The above Redis cache configuration should be placed in `sites/default/settings.php`, rather than `settings.pantheon.php`, to avoid conflicts with future upstream updates.

   </Alert>

<Accordion title="Database Cleanup (recommended)" id="database-cleanup-drupal" icon="lightbulb">

After enabling Redis, there are cache tables in the database that are no longer being used. Even when the Drupal cache is cleared, these tables will not be emptied. For sites that were live for awhile before Redis was enabled, there could be significant amounts of data in these tables. Removing this data could increase the speed of cloning, exporting, and backing up the database.

1. [Connect directly to MySQL](/guides/mariadb-mysql/mysql-access) and run the command below to view the cache:

  ```sql
  SELECT table_name FROM information_schema.tables WHERE table_name LIKE 'cache%' AND table_name != 'cache_form';
  ```

  This returns a list of all the cache tables in the database. These are safe to empty, but don't remove the tables themselves in case Redis is disabled in the future.

1. Run the command below on each table, replacing `<tablename>` with the name of the cache table, to empty the cache:

  ```sql
  TRUNCATE TABLE `<tablename>`;
  ```

</Accordion>

## Drupal 7

<Alert title="Note" type="info">

This configuration uses the `Redis_CacheCompressed` class for better performance. This requires the Redis module version 3.13 or later. For versions before 3.13, use `Redis_Cache` in step 4 instead.

</Alert>

1. Navigate to your Pantheon Site Dashboard, select **Settings**, select **Add Ons**, then select **Add** to enable the Redis cache server. It might take a couple of minutes for the Redis server to come online.

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
  if (!empty($_ENV['PANTHEON_ENVIRONMENT']) && !empty($_ENV['CACHE_HOST'])) {
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

1. Enable the module via `/admin/modules`, if you haven't already done so, using Terminus.

1. Navigate to the dashboard and click **Connection Info** to verify that Redis is enabled. If you see the Redis cache connection string, Redis is enabled.

1. Visit `/admin/config/development/performance/redis` and open **Connection Information** to verify the connection.

<Accordion title="Database Cleanup (recommended)" id="database-cleanup-d7" icon="lightbulb">

After enabling Redis, there are cache tables in the database that are no longer being used. Refer to the "Database Cleanup" section above for steps on how to truncate the existing cache tables to make sure the latest data populates object cache properly.

</Accordion>


## More Resources
- [Performance Addons](/addons)
- [Object Cache Overview](/object-cache)


### How-to Guides
- [Enable Object Cache Pro for WordPress](/object-cache/wordpress)
- [Use the Redis CLI](/object-cache/cli)
- [Safely Remove Object Cache](/object-cache/remove)


### References
- [Object Cache Errors](/object-cache/errors)
- [Object Cache FAQs](/object-cache/faq)

### See Also
- [Caching in Drupal Views](/drupal-caching-views)
- [Frontend Performance Caching](/guides/frontend-performance/caching)
