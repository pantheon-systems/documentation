---
title: PHP Errors and Exceptions
Description: Detailed information about basic PHP errors.  
category:
  - debugging
  - drupal
  - WordPress

---

## Overview

There are three basic kinds of PHP errors:

- **Notice**  - room for improvement; typically unset variables or missing array keys.
- **Warning**  - errors will probably occur if not addressed.
- **Error**  - fatal, execution terminated. Often known as the "white screen of death".

For a more in-depth discussion on errors in PHP in general, see the PHP documentation on  [Error Handling and Logging](http://www.php.net/manual/en/book.errorfunc.php).

Each of the PHP errors are handled differently depending on the site environment. On dev, they are shown directly to the user in the browser. On test and live, PHP errors are not displayed to users, but they'll still be logged. For Drupal based sites, notices and warnings are logged in the database logs if `db_log` is enabled. For WordPress based sites, the PHP constants `WP_DEBUG` and `WP_DEBUG_LOG` can be enabled in `wp-config.php` save errors to `wp-content/debug.log`. PHP errors are also logged on the application server at `logs/php-error.log`.

Here's a breakdown of what errors are shown and where:
<table>
<thead>
		<tr>
			<th align="left" style="width: 130px">Environment</th>
			<th align="left" style="width: 130px">Severity</th>
			<th align="left" style="width: 130px">Browser</th>
			<th align="left" style="width: 130px">Watchdog</th>
			<th>logs/php-error.log</th>
		</tr>
	</thead><tbody>
		<tr>
			<td align="left" rowspan="3" style="vertical-align:middle; border-bottom:1px solid black">dev</td>
			<td align="left">notice</td>
			<td align="left"><strong>Y</strong></td>
			<td align="left"><strong>Y</strong></td>
			<td align="left">N</td>
		</tr>
		<tr>
			<td align="left">warning</td>
			<td align="left"><strong>Y</strong></td>
			<td align="left"><strong>Y</strong></td>
			<td align="left">N</td>
		</tr>
		<tr>
			<td align="left" style="border-bottom:1px solid black;">error</td>
			<td align="left" style="border-bottom:1px solid black;"><strong>Y</strong></td>
			<td align="left" style="border-bottom:1px solid black;">N</td>
			<td align="left" style="border-bottom:1px solid black;"><strong>Y</strong></td>
		</tr>
		<tr>
			<td align="left" rowspan="3" style="vertical-align:middle; border-bottom:1px solid black">test</td>
			<td align="left">notice</td>
			<td align="left">N</td>
			<td align="left"><strong>Y</strong></td>
			<td align="left">N</td>
		</tr>
		<tr>
			<td align="left">warning</td>
			<td align="left">N</td>
			<td align="left"><strong>Y</strong></td>
			<td align="left">N</td>
		</tr>
		<tr>
			<td align="left" style="border-bottom:1px solid black;">error</td>
			<td align="left" style="border-bottom:1px solid black;">N</td>
			<td align="left" style="border-bottom:1px solid black;">N</td>
			<td align="left" style="border-bottom:1px solid black;"><strong>Y</strong></td>
		</tr>
		<tr>
			<td align="left" rowspan="3" style="vertical-align:middle;">live</td>
			<td align="left">notice</td>
			<td align="left">N</td>
			<td align="left"><strong>Y</strong></td>
			<td align="left">N</td>
		</tr>
		<tr>
			<td align="left">warning</td>
			<td align="left">N</td>
			<td align="left"><strong>Y</strong></td>
			<td align="left">N</td>
		</tr>
		<tr>
			<td align="left">error</td>
			<td align="left">N</td>
			<td align="left">N</td>
			<td align="left"><strong>Y</strong></td>
		</tr>
	</tbody>
</table>

To learn more about PHP error logs, see our article on  [debugging sites with log files](/docs/articles/sites/debugging-sites-with-log-files/).

## PHP Errors Slow Down a Site

An error, no matter what severity, is a problem that needs to be addressed. Any PHP error, even a notice, will drastically reduce the speed of PHP execution. Even if you don't see the error in your browser, and even if you explicitly disable logging, every single PHP error will slow your site down.  



If database logging is enabled, your site will be even slower, requiring a database write for every error. However, disabling logging does not address the problem, it only hides the symptom.



Best practice is to fix every notice, warning, and error as you discover them. If they're in an extension (Drupal module or WordPress plugin), roll a patch and submit it to the project's issue queue.


See [http://stackoverflow.com/a/1869185](http://stackoverflow.com/a/1869185) for some more details, including benchmarks that compare the differences between suppressing notices and actually eliminating the root cause.

## PHP Unhandled Exceptions on Pantheon

​A PHP exception is a mechanism for defining error conditions and how to handle them. For more details on Exceptions, see the [PHP documentation on Exceptions.](http://php.net/manual/en/language.exceptions.php)  

PHP Exceptions are errors, and depending on the severity and whether they are handled correctly can crash your site. As Exceptions are created in code and not by PHP itself, they are not logged in the PHP error log file and will not be visible in the Pantheon dashboard. By default, Drupal will [log exceptions](https://api.drupal.org/api/drupal/includes%21bootstrap.inc/function/watchdog_exception/7) to Watchdog.

## Handling Undefined Index Notices for PHP Variables

When you import your site or enable some new extensions, PHP notices may be reported on your dev site that have never been reported before. These notices are now being made apparent because of the dev environment's strict error reporting level.

An example notice might look like this:

````
Notice: Undefined index: description in theme_imagefield_image_imagecache_lightbox2() (line 163 of /srv/bindings/xxxxxxxxx/code/sites/all/modules/contrib/lightbox2/lightbox2.formatter.inc)..
````

Why is PHP reporting this?

Variable declaration is not required by PHP, but is a recommended practice that can help to avoid security vulnerabilities or bugs if one forgets to provide a value to a variable that be used later on. PHP issues an `E_NOTICE`, a very low-level error, as a reminder.

No one is going to twist your arm about addressing these notices, but Pantheon believes that surfacing them in the development environment will help developers address potential problems in the future before they can occur by following best practices.

## Fatal Error: require_once(): Failed Opening Required

The require\_once() function simply checks to see if a file has been included already, if it has not, then it will be included when checked.

When this error surfaces, it simply means that the file in question is not where it should be. For example, the error will look something like this:

```
Fatal error: require_once(): Failed opening required ‘/srv/bindings/xxxxx/code/sites/all/modules/redis/redis.autoload.inc’ (include_path=‘.:/usr/share/pear:/usr/share/php’) in /srv/bindings/xxxxxx/code/includes/bootstrap.inc on line 2394
```

To fix this error, look for the correct path to the file and update the `require_once()`.
