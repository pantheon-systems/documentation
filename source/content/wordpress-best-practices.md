---
title: WordPress Best Practices
description: A list of suggestions for developing WordPress sites on Pantheon.
tags: [workflow]
categories: [wordpress]
---

This article provides suggestions, tips, and best practices for developing and managing WordPress sites on the Pantheon platform.

## Development

*  We recommend using an [IDE](https://en.wikipedia.org/wiki/Comparison_of_integrated_development_environments#PHP){.external}, or a text editor designed for development like [Atom](https://atom.io/){.external}, [Sublime Text](https://www.sublimetext.com/){.external}, or [Brackets](https://github.com/adobe/brackets/){.external}.

* Do not modify core WordPress files as it can cause unintended consequences, and can [prevent you from updating your site regularly](/docs/core-updates#apply-upstream-updates-manually-from-the-command-line-to-resolve-merge-conflicts). If you need to modify any WP functionality, do it as a custom plugin, which adheres to the [WP.org Plugin best practices](https://developer.wordpress.org/plugins/the-basics/best-practices/){.external}.

* Use [Redis](/docs/redis/). Redis is an open-source, networked, in-memory, key-value data store that can be used as a drop-in caching backend for your WordPress site. Pantheon makes it super simple and you'll be able to catch a lot of database queries in WordPress.

* Use [wp-cfm](/docs/wp-cfm/). It lets you store settings from the `wp_options` table in Git and pull it into the database. A lot of WordPress stuff is option-heavy and you can spend a lot of time trying to figure out what you missed between environments. This is true for all WordPress sites, but especially helpful on Pantheon where you have at least three environments you will need to reconfigure every time.

* Use [Grunt](https://gruntjs.com){.external} or [Gulp](https://github.com/gulpjs/gulp){.external} to aggregate JS/CSS on your local development environment rather than relying on the server to do it for you. This helps speed up your workflow by minimizing redundant tasks.

* When developing custom plugins or themes, it is best to abide by the [WordPress Coding Standards](https://make.wordpress.org/core/handbook/best-practices/coding-standards/){.external} for efficiency and ease of collaboration.

### Plugins

* Add [Composer](/docs/composer/) and pull your WordPress plugins from [wpackagist.org](https://wpackagist.org/){.external}. WordPress Packagist mirrors the WordPress.org plugin repository and adds a composer.json file so things play nice. It makes future debugging much simpler should you need to switch between multiple plugin or WordPress versions to see what caused something to break. While [committing Composer dependencies is generally not recommended](https://getcomposer.org/doc/faqs/should-i-commit-the-dependencies-in-my-vendor-directory.md){.external}, you will have to commit the dependencies that Composer downloads on Pantheon since running `composer install` on the environments is not supported (just as Git submodules are not supported).

* If you have a custom plugin that retrieves a specific post (or posts), instead of using `wp_query()` to retrieve it, use the `get_post()` function. While wp_query has its uses, the [get_post](https://developer.wordpress.org/reference/functions/get_post/){.external} function is built specifically to retrieve a WordPress Post object, and does so very efficiently.

* Don't use plugins that create files vital to your site logic that you aren't willing to track in Git. Sometimes they're dumped in uploads, sometimes not, and you'll likely have difficulty trying to figure it out later. You'd be surprised how many uploads-type plugins rely on `.htaccess` files — avoid those as well.

### Themes

* In your theme, use a simple PHP `include()` instead of WordPress's [get_template_part()](https://codex.wordpress.org/Function_Reference/get_template_part){.external}. The overhead is heavy if your use case is simply adding in another sub-template file. For example:

        <?php get_template_part('content', 'sidebar'); ?>
        <?php include('content-sidebar.php'); ?>

## Testing

* Run [Launch Check](/docs/wordpress-launch-check) to review errors and get recommendations on your site's configurations.

* Automate testing with [Behat](/docs/guides/behat/). Adding automated testing into your development workflow will help you deliver higher quality WordPress sites.

## Live

* We recommend using HTTPS. For more information, see [HTTPS on Pantheon's Global CDN](/docs/https/)

* Verify [Global CDN caching](/docs/test-global-cdn-caching/) is working on your site.
