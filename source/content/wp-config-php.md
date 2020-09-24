---
title: Configuring wp-config.php
description: Understand how to adjust and customize the WordPress configuration file for your Pantheon WordPress site.
cms: "WordPress"
categories: [develop]
tags: [wp-config]
contributors: [masonjames]
reviewed: "2020-08-07"
---

## Overview

Woug.log'
```

### Where do I specify database credentials?

You don't have to! Pantheon automatically injects database credentials into the site environment; if you hard code database credentials, you will break the Pantheon workflow.

### Where can I get a copy of a default wp-config.php for Pantheon?

- [Pantheon WordPress](https://github.com/pantheon-systems/WordPress/blob/default/wp-config.php)
- [WordPress Core](https://github.com/WordPress/WordPress/blob/master/wp-config-sample.php)

### How do I enable ionCube Decoder support?

1. If you are using a licensed plugin that requires ionCube Decoder support, first ensure you are running [PHP 7.1](/php-versions). Please note later PHP versions do not currently support ionCube.

1. Enable ionCube Decoder support site-wide by adding this line to `wp-config.php`:

```php:title=wp-config.php
ini_set('ioncube.loader.encoded_paths', '/');
```

*(More information can be found in our [PHP 7.1 & ionCube Decoder Now Available for All Sites on Pantheon](https://pantheon.io/blog/php-71-ioncube-decoder-now-available-all-sites-pantheon) blog post.)*

### Can I increase the memory limit of my WordPress site?

By default, WordPress installations have a core PHP memory limit of 40MB for single sites and 64MB for site networks.
You can [increase this limit](https://wordpress.org/support/article/editing-wp-config-php/#increasing-memory-allocated-to-php) up to the limit of memory allocated for your [site plan](/site-plans-faq#plan-resources).

Example for Elite sites:
```php:title=wp-config.php
define( 'WP_MEMORY_LIMIT', '512M' );
```

## Troubleshooting

### Request to a Remote API Does Not Return Expected Response

The PHP 5.5 default is `&` and the PHP 5.3 default is `&amp;`.

If the API expects `&` as an argument separator but receives `&amp;` (for example, when using http_build_query), you can override the default arg_separator.output value by adding the following line to `wp-config.php`:

```php:title=wp-config.php
ini_set('arg_separator.output', '&');
```

### Actions and Filters in `wp-config.php`

Actions or filters that require CLI tools like WP-CLI may fail from `wp-config.php`, because the functions required are not yet accessible. To resolve, put these directives in an [MU Plugin](/mu-plugin).
