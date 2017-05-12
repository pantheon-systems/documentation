---
title: Debug Intermittent PHP 7 Notices
description: Debug and fix "Deprecated Constructor" notices in your Pantheon site.
categories: []
tags: [debugcode]
contributors: greg-1-anderson
---

PHP notices are usually handled automatically by the Pantheon Platform as described on the page [PHP Errors and Exceptions](/docs/php-errors); however, occasionally a PHP notice might be emitted directly into the web page content.

An example notice might look like this:
```nohighlight
Deprecated: Methods with the same name as their class will not be constructors in a future version of PHP; views_display has a deprecated constructor in /srv/bindings/46027a30ca4c4980a7188036eb2fcea5/code/sites/all/modules/views/includes/view.inc on line 2553
Deprecated: Methods with the same name as their class will not be constructors in a future version of PHP; views_many_to_one_helper has a deprecated constructor in /srv/bindings/46027a30ca4c4980a7188036eb2fcea5/code/sites/all/modules/views/includes/handlers.inc on line 753
```

When an error like this is encountered, it will usually only appear intermittently; most page loads will come up correctly until, after a period of inactivity on the site, the same message will appear again.

## Cause and Remediation

This error is caused by a combination of two factors:

- PHP notices generated during source code parsing
- PHP opcache is in use

To fix these errors, convert your class constructor to `__construct()`. See [deprecation notice for PHP-4-style constructors](http://php.net/manual/en/migration70.deprecated.php#migration70.deprecated.php4-constructors) for more information.

## Finding PHP Files Containing Parse-Time Notices

To make it easier to find and debug intermittent notices, **temporarily** disable the opcache in your settings.php file:
```php
if (!isset($_ENV['PANTHEON_ENVIRONMENT']) || ($_ENV['PANTHEON_ENVIRONMENT'] != 'live'))
{
    ini_set("opcache.enable", 0);
}
```
<div class="alert alert-danger">
<h4 class="info">Warning</h4>
<p>Disabling opcache has a sever impact on performance, so care should be taken not to do this on a production system. Note that <code>display_errors</code> is set to <code>off</code> on Pantheon live environments, so there is no motivation to disable opcache in production anyway. When disabling opcache in dev and multi-dev environments, be sure to re-enable it again once you are done debugging.
</p>
</div>

You may also search for deprecated constructors using the PHP linter on the command line (requires PHP 7.0 to be installed locally). First, create a local copy of your site as described in [Local Development](/docs/local-development); then, run:
```nohighlight
$ php -l sites/all/modules/views/includes/handlers.inc
PHP Deprecated:  Methods with the same name as their class will not be constructors in a future version of PHP; views_many_to_one_helper has a deprecated constructor in sites/all/modules/views/includes/handlers.inc on line 753

Deprecated: Methods with the same name as their class will not be constructors in a future version of PHP; views_many_to_one_helper has a deprecated constructor in sites/all/modules/views/includes/handlers.inc on line 753

No syntax errors detected in sites/all/modules/views/includes/handlers.inc
```
Replace the path to the file you would like to check. To check every .php, .inc and .module file in a Drupal site, run:
```nohighlight
find -E . -iregex ".*\.(inc|php|module)$" -exec php -l {} \; | grep -v 'No syntax errors'
```
Adjust the regular expression as needed to scan other file extensions that may contain php code.

## Explanation

[Deprecation notices for deprecated constructors](http://php.net/manual/en/migration70.deprecated.php#migration70.deprecated.php4-constructors) are emitted if a class contains a method with the same name as the class name. This was the recommended way to declare class constructors in PHP 4, but it was not until PHP 7 that this form actually started producing a notice. At this time, the PHP-4-style constructor is the only deprecation notice that is reported during source code parsing. In theory, this structure should only be encountered in very old code; in practice, though, some projects may have continued using the deprecated form, so it may be encountered from time to time.

Opcache is always enabled on Pantheon. When opcache is in use, PHP will print any notice emitted during source code processing directly to the standard output, ignoring any error handler that may be set. These notices may still be disabled by setting `error_reporting` to ignore E_DEPRECATED; however, Drupal always enables E_DEPRECATED in `error_reporting` early in its bootstrap process, so these notices will be printed if `display_errors` is set to `on`.

Opcache also influences when this error is displayed. Since opcache caches the compiled form (opcodes) of the PHP that is being executed, the deprecation notices will not be printed when the PHP opcodes are fetched from the opcache. This is what leads to the intermittent nature of this problem.

<div class="alert alert-info">
<h4 class="info">Note</h4>
<p>The deprecation notices used in the examples on this page appeared in an old version of the Drupal <a href="https://www.drupal.org/project/views">views</a> module for Drupal 7.x. This was fixed in issue <a href="https://www.drupal.org/node/2579819">#2579819</a>, and included in the <a href="https://www.drupal.org/project/views/releases/7.x-3.12">7.x-3.12</a> release.
</p>
</div>
