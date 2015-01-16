---
title: Installing Redis on WordPress
description: A walkthrough of how to enable WP-Redis on Pantheon
category:
    - developing

---

## Enable Redis

Enable Redis cache server from your Pantheon site dashboard by going to (Settings > Add Ons > Add).

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

1.  Install the WP-Redis plugin through the WordPress dashboard.
  * After you install the plugin, do not activate the plugin.
2. Go to the WP-Redis plugin directory (wp-content/plugins/wp-redis/) and **move** the file object-cache.php to the directory (wp-content/).
  * Make sure the object-cache.php file is deleted from the WP-Redis directory.
3. Log in to the WordPress dashboard, go to the Plugins section, and click on **Drop-Ins**.  

![Plugin drop ins](/docs/assets/images/plugin-drop-ins.png)  

This is one way to confirm that the plugin has been setup correctly. Another way to verify the configuration is by using the redis-cli.


### Use the Redis Command-Line Client

You don't need to install anything to use Redis on Pantheon. However, if you want to manually connect to the Pantheon hosted Redis server for debugging, you'll need to install Redis locally. If you don't already have Redis installed, it can be downloaded from [http://redis.io/download](http://redis.io/download).

To verify that Redis is working, use the Redis Connection Info from the dashboard. Once you've logged in, execute the following command:

    redis> keys *

The command should return the existing Redis keys. Example:

    redis> keys *
     1) "pantheon-rediscache_menu:links:management:tree-data:en:27cbcc1096e9daf2c319c2c"
     2) "pantheon-rediscache:features_module_info"
     3) "pantheon-rediscache_bootstrap:bootstrap_modules"
     4) "pantheon-rediscache_menu:menu_item:b38e608d4f709b7c1fcb6ac5f6dd2ab72a9a034"

If Redis is configured properly, it should output appropriate keys. If nothing is returned, proceed to the troubleshooting section below.

To check if a specific key exists, you can pass the exists command. For example:

    redis> SET key1 "Hello"
    OK
    redis> EXISTS key1
    (integer) 1
    redis> EXISTS key2
    (integer) 0
    redis>

## Troubleshooting

### Cannot Activate the Redis Plugin
You do not need to activate the plugin. Once you install it, move the `object-cache.php` file over the the **/wp-content/** directory and delete `object-cache.php` from the WP-Redis directory on the server.

### Fatal Error in the WordPress Dashboard

![Plugin fatal error redis](/docs/assets/images/redis-plugin-fatal-error.png)

If you are seeing the error message `Fatal error: Cannot redeclare class WP_Object_Cache...` then you have not deleted the `object-cache.php` from the WP-Redis plugin directory.
