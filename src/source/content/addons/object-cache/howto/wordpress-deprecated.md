---
title: Enable WP-Redis [Deprecated]
description: How to install and configure WP Redis for WordPress.
permalink: docs/object-cache/wordpress-deprecated
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

<Alert title="Warning" type="danger">

This page is considered deprecated.

[WP Redis](https://wordpress.org/plugins/wp-redis), while still actively maintained, is no longer the preferred method for enabling object cache for WordPress on Pantheon.

Performance and Elite WordPress site(s) that are currently running WP Redis are eligible for an upgraded solution: [Enable Object Cache Pro for WordPress](/object-cache/wordpress).

</Alert>


1. Navigate to your Pantheon Site Dashboard, select **Settings**, select **Add Ons**, then select **Add**. It might take a couple of minutes for the Object Cache server to come online.

1. Install the [WP Redis](https://wordpress.org/plugins/wp-redis/) plugin via SFTP or Git. You can also install the plugin via [Terminus](/terminus) if you [set the connection mode to SFTP](/guides/sftp) and run:

  ```bash{promptUser: user}
  terminus wp <site>.<env> -- plugin install wp-redis
  ```

  If you use WordPress Multisite, you must add the site URL by adding to the command:

  ```bash{promptUser: user}
  terminus wp <site>.<env> -- plugin install wp-redis --url=<url>
  ```

1. Create a new file named `wp-content/object-cache.php` that contains the following:

  ```php:title="object-cache.php"
  <?php
  # This is a Windows-friendly symlink
  $objectCacheFile = WP_CONTENT_DIR . '/plugins/wp-redis/object-cache.php';
  if (!empty($_ENV['PANTHEON_ENVIRONMENT']) && !empty($_ENV['CACHE_HOST']) && file_exists($objectCacheFile)) {
      require_once $objectCacheFile;
  }
  ```

  This file is a symlink to the `/plugins/wp-redis/object-cache.php` file. Use SFTP or Git to commit the new file to the Dev environment.

1. Navigate to the Dev environment's WordPress Dashboard, and verify the installation by selecting **Drop-ins** from the Plugins section:

  ![The object-cache Drop-In Plugin](../../../../images/redis-dropin-plugin.png "The object-cache plugin, visible in the Drop-ins section of Plugins.")

  You can upgrade by the normal Plugin update mechanism in WordPress or via Terminus when a new version of the WP Redis plugin is released:

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

1. [Clone the site's codebase](/guides/git/git-config#clone-your-site-codebase) if you have not done so already.

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
