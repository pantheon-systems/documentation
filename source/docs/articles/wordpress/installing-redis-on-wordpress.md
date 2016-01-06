---
title: Installing Redis on WordPress
description: A walkthrough of how to enable WP-Redis on your Pantheon Drupal or WordPress site.
category:
    - developing
keywords: enable redis, add redis, redis on wordpress, redis for wordpress, using redis on wordpress, configure redis on wordpress, configure redis
---
Currently, all plans except for Personal can use Redis. Redis is available to Sandbox plans for developmental purposes, but Redis will not be available going live on a Personal plan.



 | Plans        | Supported
 | ------------- |:-------------:|
 | Sandbox      | **Yes** |
 | Personal      | No      |
 | Professional | **Yes**      |
 | Business | **Yes**      |
 | Elite | **Yes**      |

---


## Enable Redis on the Pantheon Site Dashboard
First enable Redis from your Pantheon Site Dashboard by going to **Settings** > **Add Ons** > **Add**. It may take a couple minutes for the Redis server to come online.
## Install Drop-in Plugin
[WP Redis](https://wordpress.org/plugins/wp-redis/) is loaded via a drop-in file, so there's no need to activate it on your WordPress sites. The following installation methods are supported:
### Preferred Method: Symlink Drop-in
This method will store object cache values persistently in Redis while preserving the standard procedures for applying plugin updates.

1. Install the [WP Redis](https://wordpress.org/plugins/wp-redis/) plugin via SFTP, Git, or the following [Terminus](/docs/articles/local/cli) command:

 ```
 terminus wp 'plugin install wp-redis' --site=<site> --env=dev
 ```
2. Using SFTP or Git, create a new file named `wp-content/object-cache.php` that contains the following:

 ```
 <?php
 # This is a Windows-friendly symlink
 require_once WP_CONTENT_DIR . '/plugins/wp-redis/object-cache.php';
 ```
3. Verify installation by selecting **Drop-ins** from the Plugins section of the WordPress Dashboard.

When a new version of the WP Redis plugin is released, you can upgrade by the normal Plugin update mechanism in WordPress or via Terminus:

```
terminus wp 'plugin update wp-redis' --site=<site> --env=dev
```

### Alternate Method: Move Plugin File
This method does not support the normal Plugin update mechanism in WordPress.

1. Install the [WP Redis](https://wordpress.org/plugins/wp-redis/) plugin via SFTP, Git, or the following [Terminus](/docs/articles/local/cli) command:

 ```
 terminus wp 'plugin install wp-redis' --site=<site> --env=dev
 ```
2. Move the `object-cache.php` file from the plugin directory `wp-content/plugins/wp-redis/` to the `wp-content/` directory.
3. Verify installation by selecting **Drop-ins** from the Plugins section of the WordPress Dashboard.

When a new version of the WP Redis plugin is released, you will need to re-install the plugin entirely.

## Use the Redis Command-Line Client

1. [Install Redis locally](http://redis.io/download).
2. From the site Dashboard, select the desired environment (Dev, Test or Live).
3. Click the **Connection Info** button, copy the Redis connection string and run the command in your local terminal.

Execute the following command to return existing Redis keys:
```bash
redis> keys *
```
If Redis is configured properly, it will show appropriate keys. If nothing is returned, proceed to the troubleshooting section below.

To check if a specific key exists, you can pass the exists command:
```bash
redis> SET key1 "Hello"
OK
redis> EXISTS key1
(integer) 1
redis> EXISTS key2
(integer) 0
redis>
```
## Troubleshooting

### Cannot Activate the Redis Plugin
WP Redis is a drop-in plugin that should only be loaded using the installation methods above. No activation is required.

### Redis Server is Gone
Enabled Redis via the Pantheon site Dashboard by going to **Settings** > **Add Ons** > **Add** > **Redis**. It may take a few minutes to provision the service.
