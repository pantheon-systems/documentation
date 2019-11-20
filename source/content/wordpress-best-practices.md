---
title: WordPress Best Practices
description: A list of suggestions for developing WordPress sites on Pantheon.
tags: [workflow]
categories: [wordpress]
---

This article provides suggestions, tips, and best practices for developing and managing WordPress sites on the Pantheon platform.

## Development

* We recommend using an [IDE](https://en.wikipedia.org/wiki/Comparison_of_integrated_development_environments#PHP), or a text editor designed for development like [Atom](https://atom.io/), [Sublime Text](https://www.sublimetext.com/), or [Brackets](https://github.com/adobe/brackets/).

* Do not modify core WordPress files as it can cause unintended consequences, and can [prevent you from updating your site regularly](/core-updates#apply-upstream-updates-manually-from-the-command-line-to-resolve-merge-conflicts). If you need to modify any WP functionality, do it as a custom or [Must Use](/mu-plugin/) plugin, which adheres to the [WP.org Plugin best practices](https://developer.wordpress.org/plugins/the-basics/best-practices/).

* Use [Redis](/redis/). Redis is an open-source, networked, in-memory, key-value data store that can be used as a drop-in caching backend for your WordPress site. Pantheon makes it super simple and you'll be able to catch a lot of database queries in WordPress.

* Use [wp-cfm](/wp-cfm/). It lets you store settings from the `wp_options` table in Git and pull it into the database. A lot of WordPress stuff is option-heavy and you can spend a lot of time trying to figure out what you missed between environments. This is true for all WordPress sites, but especially helpful on Pantheon where you have at least three environments you will need to reconfigure every time.

* Use [Grunt](https://gruntjs.com) or [Gulp](https://github.com/gulpjs/gulp) to aggregate JS/CSS on your local development environment rather than relying on the server to do it for you. This helps speed up your workflow by minimizing redundant tasks.

* When developing custom plugins or themes, it is best to abide by the [WordPress Coding Standards](https://make.wordpress.org/core/handbook/best-practices/coding-standards/) for efficiency and ease of collaboration.

### Plugins

* Add [Composer](/composer/) and pull your WordPress plugins from [wpackagist.org](https://wpackagist.org/). WordPress Packagist mirrors the WordPress.org plugin repository and adds a composer.json file so things play nice. It makes future debugging much simpler should you need to switch between multiple plugin or WordPress versions to see what caused something to break. While [committing Composer dependencies is generally not recommended](https://getcomposer.org/doc/faqs/should-i-commit-the-dependencies-in-my-vendor-directory.md), you will have to commit the dependencies that Composer downloads on Pantheon since running `composer install` on the environments is not supported (just as Git submodules are not supported).

* If you have a custom plugin that retrieves a specific post (or posts), instead of using `wp_query()` to retrieve it, use the `get_post()` function. While wp_query has its uses, the [get_post](https://developer.wordpress.org/reference/functions/get_post/) function is built specifically to retrieve a WordPress Post object, and does so very efficiently.

* Don't use plugins that create files vital to your site logic that you aren't willing to track in Git. Sometimes they're dumped in uploads, sometimes not, and you'll likely have difficulty trying to figure it out later. You'd be surprised how many uploads-type plugins rely on `.htaccess` files — avoid those as well.

### Themes

* In your theme, use a simple PHP `include()` instead of WordPress's [get_template_part()](https://codex.wordpress.org/Function_Reference/get_template_part). The overhead is heavy if your use case is simply adding in another sub-template file. For example:

  ```php
  <?php get_template_part('content', 'sidebar'); ?>
  <?php include('content-sidebar.php'); ?>
  ```

## Testing

* Run [Launch Check](/wordpress-launch-check) to review errors and get recommendations on your site's configurations.

* Automate testing with [Behat](/guides/behat/). Adding automated testing into your development workflow will help you deliver higher quality WordPress sites.

## Live

* We recommend using HTTPS. For more information, see [HTTPS on Pantheon's Global CDN](/https/)

* Verify [Global CDN caching](/test-global-cdn-caching/) is working on your site.

* Follow our [Frontend Performance](/guides/frontend-performance/) guide to tune your WordPress site.

## Avoid XML-RPC Attacks
The `/xml-rpc.php` path is a potential security risk for WordPress sites. It can be used by bad actors to brute force administrative usernames and passwords. All calls made to this file must supply a plain text username and password. If a valid combination is found, a success message is returned letting the bad actor know they can log in via the standard `/wp-login.php` method.

This can be surfaced by reviewing your site's `nginx-access.log` for the Live environment. If you leverage [GoAccess](/nginx-access-log/), you might see something similar to the following:

```none
2 - Top requests (URLs)                                  Total: 366/254431

Hits Vis.     %   Bandwidth Avg. T.S. Cum. T.S. Max. T.S. Data
---- ---- ----- ----------- --------- --------- --------- ----
2026   48 0.77%   34.15 KiB   1.27  s  42.74 mn  38.01  s /xmlrpc.php
566   225 0.21%   12.81 MiB   4.08  s  38.45 mn  59.61  s /
262    79 0.10%  993.71 KiB   2.32  s  10.14 mn  59.03  s /wp-login.php
```

Pantheon recommends disabling XML-RPC, given the WordPress Rest API is a stronger and more secure method for interacting with WordPress via some external service.

### Disable XML-RPC via Pantheon.yml

Add the following configuration to your [`pantheon.yml`](/pantheon-yml/) file:

  ```yml
  protected_web_paths:
    - /xmlrpc.php
  ```

This method is more performant than disabling via PHP since this won't involve bootstrapping the application.

### Disable XML-RPC via PHP

This method has the advantage of being toggleable without deploying code, by activating or deactivating a custom MU Plugin.

1. If you have not already created an **MU Plugin** (Must Use Plugin) to maintain custom code, review [Create a WordPress MU Plugin for Actions and Filters](/mu-plugin/).

1. Add the following lines your MU plugin:

  ```php
  # Disable /xmlrpc.php
  add_filter('xmlrpc_enabled', '__return_false');
  ```
