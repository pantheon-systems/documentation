---
title: WordPress Best Practices
description: A list of suggestions for developing WordPress sites on Pantheon.
keywords: wordpress, best practices, redis, wp-cfm, behat
---

This article provides suggestions, tips, and best practices for developing and managing WordPress sites on the Pantheon platform.

* Use [Redis](/docs/articles/sites/installing-redis-on-wordpress/). Redis is an open-source, networked, in-memory, key-value data store that can be used as a drop-in caching backend for your WordPress site. Pantheon makes it super simple and you'll be able to catch a lot of database queries in WordPress.

* Verify [Varnish](/docs/articles/sites/varnish/testing-varnish) is working on your site.

* Use [wp-cfm](https://pantheon.io/docs/articles/wordpress/wordpress-configuration-management-wp-cfm/). It lets you store settings from the `wp_options` table in Git and pull it into the database. A lot of WordPress stuff is option-heavy and you can spend a lot of time trying to figure out what you missed between environments. This is true for all WordPress sites, but especially helpful on Pantheon where you have at least three environments you will need to reconfigure every time.

* Automate testing with [Behat](/docs/guides/automated-testing-wordpress-behat/). Adding automated testing into your development workflow will help you deliver higher quality WordPress sites.

* We recommend using SSL/HTTPS. Pro plans and above can [load a certificate](/docs/articles/sites/domains/adding-a-ssl-certificate-for-secure-https-communication/) into Pantheon. On Personal plans (or others), you can use [CloudFlare Free SSL](/docs/guides/ssl-with-cloudflare/).

* Run [Launch Check](/docs/articles/wordpress/launch-check-wordpress-performance-and-configuration-analysis) to review errors and get recommendations on your site's configurations.

*  We recommend using an [IDE](https://en.wikipedia.org/wiki/Comparison_of_integrated_development_environments#PHP), or a text editor designed for development like [Atom](https://atom.io/), [Sublime Text](http://www.sublimetext.com/), or [Brackets](http://brackets.io/).

* Don't use plugins that create files vital to your site logic that you aren't willing to track in Git. Sometimes they're dumped in uploads, sometimes not, and you'll likely have difficulty trying to figure it out later. You'd be surprised how many uploads-type plugins rely on `.htaccess` files — avoid those as well.

* Use [Grunt](http://gruntjs.com/) or [Gulp](http://gulpjs.com/) to aggregate JS/CSS on your local development environment rather than relying on the server to do it for you. This helps speed up your workflow by minimizing redundant tasks.

* Add [Composer](https://getcomposer.org/) and pull your WordPress plugins from [wpackagist.org](http://wpackagist.org/). WordPress Packagist mirrors the WordPress.org plugin repo and adds a composer.json file so things play nice. It makes future debugging much simpler should you need to switch between multiple plugin or WordPress versions to see what caused something to break. While committing Composer dependencies is generally [not recommended](https://getcomposer.org/doc/faqs/should-i-commit-the-dependencies-in-my-vendor-directory.md), you will have to commit the dependencies that Composer downloads on Pantheon since running `composer install` on the environments is not supported (just as Git submodules are not supported).
