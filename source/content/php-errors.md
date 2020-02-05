---
title: PHP Errors and Exceptions
description: Detailed information about basic PHP errors on your Pantheon Drupal or WordPress site.
tags: [debugcode]
categories: [troubleshoot]
---
There are three basic kinds of PHP errors:

- **Notice**: room for improvement; typically unset variables or missing array keys.
- **Warning**: errors will probably occur if not addressed.
- **Error**: fatal, execution terminated. Often known as the "white screen of death".

For more in-depth information, see [Error Handling and Logging](https://secure.php.net/manual/en/book.errorfunc.php).

Each of the PHP errors are handled differently depending on the site environment. On Dev and Test, they are shown directly to the user in the browser. On Live, PHP errors are not displayed to users, but they'll still be logged. Notices and warnings are logged in the database logs if `db_log` is enabled for Drupal. The PHP constants `WP_DEBUG` and `WP_DEBUG_LOG` can be enabled for WordPress to save errors to `wp-content/debug.log`. PHP errors are also logged on the application container at `logs/php-error.log`.

Here's a breakdown of what errors are shown and where:

+-----------------+--------------+-------------+--------------+------------------------+
| **Environment** | **Severity** | **Browser** | **Watchdog** | **logs/php-error.log** |
+-----------------+--------------+-------------+--------------+------------------------+
|                 | notice       | **✓**       | **✓**        |                        |
|                 +--------------+-------------+--------------+------------------------+
| Dev             | warning      | **✓**       | **✓**        |                        |
|                 +--------------+-------------+--------------+------------------------+
|                 | error        | **✓**       |              |  **✓**                 |
+-----------------+--------------+-------------+--------------+------------------------+
|                 | notice       |             | **✓**        |                        |
+                 +--------------+-------------+--------------+------------------------+
| Test            | warning      |             | **✓**        |                        |
|                 +--------------+-------------+--------------+------------------------+
|                 | error        | **✓**       |              |  **✓**                 |
+-----------------+--------------+-------------+--------------+------------------------+
|                 | notice       |             | **✓**        |                        |
+                 +--------------+-------------+--------------+------------------------+
| Live            | warning      |             | **✓**        |                        |
|                 +--------------+-------------+--------------+------------------------+
|                 | error        |             |              |  **✓**                 |
+-----------------+--------------+-------------+--------------+------------------------+

To learn more about PHP error logs, see [Log Files on Pantheon](/logs).

## Performance Hits

An error, no matter what severity, is a problem that needs to be addressed. Any PHP error, even a notice, will drastically reduce the speed of PHP execution. Even if you don't see the error in your browser, and even if you explicitly disable logging, every single PHP error will slow your site down.

If database logging is enabled, your site will be even slower, requiring a database write for every error. However, disabling logging does not address the problem, it only hides the symptom.

Best practice is to fix every notice, warning, and error as you discover them. If they're in an extension (WordPress plugin or Drupal module), roll a patch and submit it to the project's issue queue.

See [this stackoverflow thread](https://stackoverflow.com/questions/1868874/does-php-run-faster-without-warnings/1869185#1869185) for some more details, including benchmarks that compare the differences between suppressing notices and actually eliminating the root cause.

## Unhandled Exceptions
A PHP exception is a mechanism for defining error conditions and how to handle them. For more details on Exceptions, see the [PHP documentation on Exceptions.](https://secure.php.net/manual/en/language.exceptions.php).

PHP Exceptions are errors, and depending on the severity and whether they are handled correctly can crash your site. As Exceptions are created in code and not by PHP itself, they are not logged in the PHP error log file and will not be visible in the Pantheon Dashboard. By default, Drupal will [log exceptions](https://api.drupal.org/api/drupal/includes%21bootstrap.inc/function/watchdog_exception/7) to Watchdog.

## Undefined Function Error
Normally a request to Drupal or WordPress starts by reading the `index.php` file at the root directory, which then bootstraps <Popover title="Bootstrap" content="Loading sequence for an application, or the process of loading necessary functionality." /> the site.

However, when a PHP file is requested directly (e.g., `https://example.com/path/to/phpfile.php`) the `index.php` file and the bootstrap process are skipped. Instead, the PHP file is executed on it's own and any function included but not defined by the file will cause a `Call to undefined function` fatal error.

For example, in the following error PHP reports the `phpfile.php` file at line `xx` for calling `some_function()`, which has not yet been defined: `Call to undefined function  [some_function()] in [path/to/phpfile.php:xx]`

### Troubleshooting
Use the following debugging techniques to investigate undefined function error messages:

- Search for the offending function elsewhere in the codebase to make sure it's defined somewhere in the project.
- Check the reported PHP file at full bootstrap. Rather than accessing the reported PHP file directly (e.g., `https://example.com/path/to/phpfile.php`), browse to a page that includes the file (e.g., `https://example.com/some-page/`) to see if the same error occurs with the site fully bootstrapped.
- Review [`nginx-access.log`](/logs) for requests to the reported PHP file.

If you see direct requests to PHP files causing fatal undefined function errors (often caused by bot traffic), use the `pantheon.yml` configuration file to set protected web paths. For details, see [Pantheon YAML Configuration Files](/pantheon-yml/#protected-web-paths). This stops the file from being web accessible while keeping the file available to PHP during bootstrap. When accessed directly, protected paths and files return a 403 Access Denied server response.

We also recommend submitting a sitemap and instructing bots to only crawl designated paths set in `robots.txt`. For details, see [Bots and Indexing on Pantheon](/bots-and-indexing).

## Undefined Index Notices

When you import your site or enable some new modules, PHP notices may be reported on your Dev site that have never been reported before. These notices are now being made apparent because of the Dev environment's strict error reporting level.

An example notice might look like this:

```php
Notice: Undefined index: description in theme_imagefield_image_imagecache_lightbox2() (line 163 of /srv/bindings/xxxxxxxxx/code/sites/all/modules/contrib/lightbox2/lightbox2.formatter.inc)..
```

Why is PHP reporting this?

Variable declaration is not required by PHP, but is a recommended practice that can help to avoid security vulnerabilities or bugs if one forgets to provide a value to a variable that be used later on. PHP issues an E\_NOTICE, a very low-level error, as a reminder.

No one is going to twist your arm about addressing these notices, but Pantheon believes that surfacing them in the Development environment will help developers address potential problems in the future before they can occur by following best practices.

## Fatal Error: require\_once(): Failed Opening Required

The require\_once() function simply checks to see if a file has been included already, if it has not, then it will be included when checked.

When this error surfaces, it simply means that the file in question is not where it should be. For example, the error will look something like this:

```php
Fatal error: require_once(): Failed opening required ‘/srv/bindings/xxxxx/code/sites/all/modules/redis/redis.autoload.inc’ (include_path=‘.:/usr/share/pear:/usr/share/php’) in /srv/bindings/xxxxxx/code/includes/bootstrap.inc on line 2394
```

To fix this error, look for the correct path to the file and update the require\_once().

## Intermittent Notices

If you are encountering intermittent notices that are not behaving as described on this page, see [Debug Intermittent PHP 7 Notices](/deprecated-constructor-notices) for additional information. This is not common.
