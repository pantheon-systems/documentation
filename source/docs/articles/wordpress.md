---
title: WordPress
description: WordPress powers more websites than any CMS. Learn how to bring WordPress sites onto the platform, and considerations for developing and running them.
---
What began as a blogging platform, WordPress has now evolved into the most used Content Management Systems today. This open source software thrives through it's expanding community and highly customizable core, making it a perfect fit for projects of any scope. Learn how to use this powerhouse CMS on the Pantheon platform with confidence by exploring our WordPress documentation.
## Get Started
[Import an existing WordPress site](/docs/articles/wordpress/importing-a-wordpress-site) or [launch a new one](/docs/articles/wordpress/starting-wordpress-site) using the Pantheon dashboard tools. You can also use the [Duplicator plugin](/docs/articles/wordpress/clone-a-wordpress-site-with-duplicator-plugin) to clone an existing site.
## WordPress Dashboard
Learn how to [manage plugins and themes using the WordPress Dashboard](/docs/articles/sites/code/more-ways-of-managing-code-in-sftp-mode#using-wp-admin-to-manage-plugins-and-themes) and SFTP mode.
## wp-config.php
The Pantheon architecture allows every environment on your site to run on it's own container, meaning variables within the `wp-config.php` file change periodically. Despite dynamic variables, you are still free to [configure `wp-config.php`](/docs/articles/wordpress/configuring-wp-config-php) on Pantheon to fit your unique needs.
## PHP Sessions
While WordPress core itself does not use PHP sessions, some plugins and themes do. Learn how to implement [built-in session handling functions](/docs/articles/wordpress/wordpress-and-php-sessions).
## WordPress Configuration Management
Keep track of database configurations with ease by using [wp-cfm](/docs/articles/wordpress/wordpress-configuration-management-wp-cfm).
## WordPress Cron
You are probably familiar with cron jobs, but do you know how `wp-cron` works? Learn and understand how [cron for WordPress](/docs/articles/wordpress/cron-for-wordpress) is triggered.
## Launch Check
Pantheon analyzes code to provide performance and configuration recommendations for your dynamic WordPress sites. Go live with confidence using [Launch Check for WordPress](/docs/articles/wordpress/launch-check-wordpress-performance-and-configuration-analysis).
## Additional Resources
- [WordPress FAQ](/docs/articles/wordpress/wordpress-faq)
- [Wordpress Known Issues](/docs/articles/wordpress/wordpress-known-issues)
- [Add Cloudflare Free SSL to WordPress Sites](http://localhost:8000/docs/articles/wordpress/add-cloudflare-free-ssl-to-wordpress-sites)
- [CloudFront CDN Setup for WordPress](/docs/articles/wordpress/cloudFront-setup-for-wordpress)
- [Configuring JetBrains PhpStorm IDE with WordPress on Pantheon](/docs/articles/wordpress/configuring-phpstorm-on-pantheon-for-wordpress)
- [Fix Broken Links in WordPress](/docs/articles/wordpress/fix-broken-links-in-wordpress)
- [Installing Redis on WordPress](/docs/articles/sites/installing-redis-on-wordpress)
