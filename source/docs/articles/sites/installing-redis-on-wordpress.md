---
title: Installing Redis on WordPress
description: A walkthrough of how to enable WP-Redis on your Pantheon Drupal or WordPress site.
category:
    - developing
keywords: enable redis, add redis, redis on wordpress, redis for wordpress, using redis on wordpress, configure redis on wordpress, configure redis
---
*Important:* First enable Redis cache server from your Pantheon Site Dashboard by going to Settings > Add Ons > Add. It may take a couple minutes for the Redis server to come online.

Currently, all plans except for Personal can use Redis. Redis is available to Sandbox plans for developmental purposes, but Redis will not be available going live on a Personal plan.



 | Plans        | Supported
 | ------------- |:-------------:|
 | Sandbox      | **Yes** |
 | Personal      | No      |
 | Professional | **Yes**      |
 | Business | **Yes**      |
 | Enterprise | **Yes**      |
 | Pantheon One | **Yes**      |

---


##Set up Redis with WordPress

Pantheon maintains the [wp-redis](https://wordpress.org/plugins/wp-redis/) plugin.

First install the WP Redis plugin through the WordPress dashboard (or via WP-CLI `wp plugin install wp-redis`), but do not activate the plugin (you never need to activate it due to it being loaded via a drop-in, in the next step).

Secondly, create an external object cache drop-in plugin at `wp-content/object-cache.php` that contains the following:

```php
<?php
# This is a Windows-friendly symlink :-)
require_once WP_CONTENT_DIR . '/plugins/wp-redis/object-cache.php';
```

Lastly, push this file to Pantheon (via Git or SFTP).

Once you push this to Pantheon, your WordPress site will store object cache values persistently in Redis.

To verify, log in to the WordPress dashboard, go to the Plugins section, and click on **Drop-Ins** and look for WP Redis listed there. Again, you do not need to activate this plugin since the `object-cache.php` drop-in you added will load it; activating it will have no effect.

![Plugin drop ins](/docs/assets/images/plugin-drop-ins.png)  

When a new version of the WP Redis plugin is released, you can upgrade by the normal Plugin update mechanism in WordPress or via WP-CLI `wp plugin update wp-redis`.

This is one way to confirm that the plugin has been set up correctly. Another way to verify the configuration is by using the redis-cli.


### Use the Redis Command-Line Client

You don't need to install anything to use Redis on Pantheon. However, if you want to manually connect to the Pantheon hosted Redis server for debugging, you'll need to install Redis locally. If you don't already have Redis installed, it can be downloaded from [http://redis.io/download](http://redis.io/download).

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
If Redis is configured properly, it should output appropriate keys. If nothing is returned, proceed to the troubleshooting section below.

To check if a specific key exists, you can pass the exists command. For example:
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
You do not need to activate the plugin. You install it by adding the `object-cache.php` drop-in plugin as noted above.

### Redis server went away
Make sure you first enabled Redis on your site via the Dashboard and navigating to Settings > Add Ons > Add > Redis. It may take a couple minutes for the server to first come online.
