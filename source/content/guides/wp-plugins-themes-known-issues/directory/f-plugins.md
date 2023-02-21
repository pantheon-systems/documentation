---
title: WordPress Plugins and Themes with Known Issues
subtitle: F Plugins
description: A list of WordPress plugins beginning with F that are not supported and/or require workarounds.
tags: [plugins, themes, code]
categories: [help]
newcms: [wordpress]
audience: [development]
product: [--]
integration: [--]
reviewed: "2022-03-24"
contenttype: [guide]
layout: guide
showtoc: true
permalink: docs/guides/wp-plugins-themes-known-issues/directory/f-plugins
anchorid: f-plugins
---

## Facebook for WordPress (official-facebook-pixel)

<ReviewDate date="2021-11-22" />

**Issue:** The plugin includes Git submodules in `code/wp-content/plugins/official-facebook-pixel/vendor/techcrunch/wp-async-task/`

which returns a PHP error because the`wp-async-task/*` can't be promoted to other environments due to the Git submodules.

```php
Warning: include(/code/wp-content/plugins/official-facebook-pixel/vendor/composer/../techcrunch/wp-async-task/wp-async-task.php): failed to open stream: No such file or directory in /code/wp-content/plugins/webp-converter-for-media/vendor/composer/ClassLoader.php
```

**Solution:** Download the plugin from [https://wordpress.org/plugins/official-facebook-pixel/](https://wordpress.org/plugins/official-facebook-pixel/) and extract it to your desktop. Then navigate to ```official-facebook-pixel/vendor/techcrunch/wp-async-task``` and delete the `.git` & `.gitignore` files before uploading to Dev.
___

## FacetWP

<ReviewDate date="2019-10-15" />

**Issue:** The [FacetWP](https://facetwp.com) plugin [conflicts with New Relic](https://facetwp.com/new-relic-compatibility/).

**Solution:** [Disable New Relic](/guides/new-relic#disable-new-relic-browser-monitoring-agent) when using FacetWP.

___

## Fast Velocity Minify

<ReviewDate date="2022-12-12" />

**Issue:** Your site may suddenly display a white screen of death in Git mode or in the Test/Live environment when using the [Fast Velocity Minify](https://wordpress.org/plugins/fast-velocity-minify/) plugin. This occurs because the default cache location, `wp-content/cache`, is not writable in Pantheon.

**Solution 1:** The default cache path for this plugin is `wp-content/cache` as of version [3.2.2](https://github.com/peixotorms/fast-velocity-minify/commit/c267c0bddfd9aaac9bf2015ad34b7ddd75b0c88d).

1.Create a symlink for `wp-content/cache` in the `wp-content` directory. Refer to the documentation on [Using Extensions That Assume Write Access](/symlinks-assumed-write-access) for more information.

1. Run the following line of code:

  ```
  ln -s ./uploads/cache ./cache
  ```

1. Remember to [clear the cache from Pantheon](/clear-caches) and [flush the Redis cache](/guides/object-cache/redis-command-line#clear-cache). Earlier versions have this option in the Fast Velocity Minify's **Settings** tab for the **Cache Location**.

**Solution 2:** The `FVM_CACHE_DIR` and `FVM_CACHE_URL` variables are available to override the cache location to address this [bug](https://github.com/peixotorms/fast-velocity-minify/issues/7) as of version 3.3.3.

Add the example configuration in the `wp-config.php` file:

```
define( 'FVM_CACHE_DIR', '/code/wp-content/uploads' );
define( 'FVM_CACHE_URL', WP_SITEURL . '/code/wp-content/uploads' );
```

___

## Force Login

<ReviewDate date="2018-07-26" />

**Issue:** The [Force Login](https://wordpress.org/plugins/wp-force-login/) plugin appends a port number using `$_SERVER['SERVER_PORT']` at the end of the URL when the user logs in to the site.

**Solution:** See [Set SERVER_PORT Correctly](/server_name-and-server_port#set-server_port-correctly).

___