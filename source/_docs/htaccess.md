---
title: Using PHP as an htaccess Alternative
description: Learn why htaccess files are ignored by NGINX and discover alternatives for modifying a site's configuration.
tags: [services, redirects]
categories: []
---
Pantheon sites use [NGINX](https://www.nginx.com/resources/wiki/#) to concurrently serve requests. The NGINX web server ignores distributed configuration files such as `.htaccess` for reduced resource consumption and increased efficiency. This configuration is standard across all Pantheon sites, and modifications to the `nginx.conf` file are not supported.

For more details on the performance impacts of `.htaccess` files, see the [NGINX documentation](https://www.nginx.com/resources/wiki/start/topics/examples/likeapache-htaccess/).

## Manage Configuration with PHP
Using `.htaccess` is generally not recommended - even for sites running  [Apache](http://httpd.apache.org/docs/trunk/howto/htaccess.html#when). As a rule of thumb, we recommend using PHP logic to accomplish configuration changes instead.

Some advantages of redirecting via PHP instead of `.htaccess` include:

- Logic and decisions can be made that a web server would have no context for, as it's executable code with application state awareness. Conditional logic, regular expressions, and much more are possible.
- Configuration tends to be more maintainable as Drupal and WordPress developers are typically literate in PHP, but very few people are naturally fluent in Apache2 rewrite rules and conditions.
- Since `settings.php` and `wp-config.php` are parsed very early in the bootstrap process, redirects like this are "cheap" with low overhead. If you use a 301 redirect, Varnish will cache it as well.

## See Also
- [Redirect Incoming Requests](/docs/redirects/)
- [Prevent Image Hotlinking](https://www.maketecheasier.com/prevent-people-from-hotlinking-your-images)
