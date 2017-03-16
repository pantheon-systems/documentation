---
title: Installing Redis on WordPress
description: A walkthrough of how to enable WP-Redis on your Pantheon WordPress site.
tags: [cacheapp, addons]
categories: [wordpress]
---
Currently, all plans except for Personal can use Redis. Redis is available to Sandbox plans for developmental purposes, but Redis will not be available going live on a Personal plan.



 | Plans        | Supported
 | -------------|:-------------:|
 | Sandbox      | **Yes**       |
 | Personal     | No            |
 | Professional | **Yes**       |
 | Business     | **Yes**       |
 | Elite        | **Yes**       |

---


## Enable Redis on the Pantheon Site Dashboard
First enable Redis from your Pantheon Site Dashboard by going to **Settings** > **Add Ons** > **Add**. It may take a couple minutes for the Redis server to come online.
## Install Drop-in Plugin
[WP Redis](https://wordpress.org/plugins/wp-redis/) is loaded via a drop-in file, so there's no need to activate it on your WordPress sites. The following installation methods are supported:
### Install via Symlink Drop-in
This method will store object cache values persistently in Redis while preserving the standard procedures for applying plugin updates.

1. Install the [WP Redis](https://wordpress.org/plugins/wp-redis/) plugin via SFTP or Git. To install via [Terminus](/docs/terminus), [set the connection mode to SFTP](/docs/sftp) then run:

 ```
 terminus wp <site>.<env> -- plugin install wp-redis
 ```

 For site networks, you will need to specify the site URL by adding that to the command:

  ```
 terminus wp <site>.<env> -- plugin install wp-redis --url=<url>
 ```

2. Create a new file named `wp-content/object-cache.php` that contains the following:

 ```
 <?php
 # This is a Windows-friendly symlink
 require_once WP_CONTENT_DIR . '/plugins/wp-redis/object-cache.php';
 ```
This file is a symlink to the `/plugins/wp-redis/object-cache.php` file. Using SFTP or Git, commit the new file to the Dev environment.

3. In the Dev environment's WordPress Dashboard, verify installation by selecting **Drop-ins** from the Plugins section:

  ![The object-cache Drop-In Plugin](/docs/assets/images/redis-dropin-plugin.png "The object-cache plugin, visible in the Drop-ins section of Plugins.")

  When a new version of the WP Redis plugin is released, you can upgrade by the normal Plugin update mechanism in WordPress or via Terminus:

  ```
  terminus wp <site>.<env> -- plugin update wp-redis
  ```

### Install via Composer

1. Set the Dev environment's connection mode to Git from within the Site Dashboard or via Terminus:

 ```
 terminus connection:set <site>.<env> git
 ```

2. [Clone the site's codebase](/docs/git/#clone-your-site-codebase) and [initialize Composer](/docs/composer/#initialize-composer) with `composer init`, if you have not done so already.

3. Use the following within `composer.json` to install the WP Redis plugin as a drop-in via Composer using [koodimonni/composer-dropin-installer](https://github.com/Koodimonni/Composer-Dropin-Installer):

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

 ```
 git status
 git commit --all -m "Initiate composer, require custom code"
 git push origin master
 ```

## Use the Redis Command-Line Client

1. [Install Redis locally](http://redis.io/download).
2. From the Site Dashboard, select the desired environment (Dev, Test, or Live).
3. Click the **Connection Info** button, copy the Redis connection string, and run the command in your local terminal.

Execute the following command to return existing Redis keys:
```bash
> keys *
```
If Redis is configured properly, it will show all existing keys. If nothing is returned, proceed to the troubleshooting section below.

To check if a specific key exists, you can pass the exists command:
```bash
> SET key1 "Hello"
OK
> EXISTS key1
(integer) 1
> EXISTS key2
(integer) 0
>
```
## Troubleshooting

### Cannot Activate the Redis Plugin
WP Redis is a drop-in plugin that should only be loaded using the installation methods above. No activation is required.

### Redis Server is Gone
Enable Redis via the Pantheon Site Dashboard by going to **Settings** > **Add Ons** > **Add** > **Redis**. It may take a few minutes to provision the service.
