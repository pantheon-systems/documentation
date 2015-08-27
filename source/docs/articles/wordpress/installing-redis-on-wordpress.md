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
 | Enterprise | **Yes**      |
 | Pantheon One | **Yes**      |

---


##Set up Redis with WordPress
<div class="alert alert-info">
<h4>Important</h4> First enable Redis from your Pantheon Site Dashboard by going to <strong>Settings > Add Ons > Add</strong>. It may take a couple minutes for the Redis server to come online.</div>

1.  Install the [WP Redis](https://wordpress.org/plugins/wp-redis/) plugin (maintained by Pantheon), but **do not** activate.
2. Move the `object-cache.php` file from the plugin directory `wp-content/plugins/wp-redis/` to the `wp-content/` directory.
3. From the Plugins section of the WordPress Dashboard, select **Drop-Ins**.

The drop-in plugin name and description are shown when properly configured:
![Plugin drop ins](/docs/assets/images/plugin-drop-ins.png)
### Use the Redis Command-Line Client

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
WP Redis is a drop-in plugin that should only be activated by moving `object-cache.php` as described above.

### Redis Server is Gone
Enabled Redis via the Pantheon site Dashboard by going to **Settings** > **Add Ons** > **Add** > **Redis**. It may take a few minutes to provision the service.
