---
title: Redirects Guide
subtitle: Redirect with PHP
description: 
categories: [go-live]
tags: [dns, https, redirects]
layout: guide
contributors: [wordsmither]
reviewed: "2022-08-01"
showtoc: true
permalink: docs/guides/redirect/php
anchorid: php
---

If your site configuration prevents you from setting the primary domain from the platform level, you can use PHP redirects. However, redirecting the platform domain will break the screenshot of your site in the User Dashboard, and may complicate troubleshooting for our [Support](/guides/support/contact-support/) team.

AGCDN only works with custom domains; `.pantheonsite.io` domains are not covered. With AGCDN, a site will not be fully protected under WAF if it is using the platform domain. A platform domain redirect to the main domain is recommended. 

<Partial file="_redirects.md" />

## Convert Multiple `.htaccess` Redirects and Rewrites to PHP
If you need to convert a large number of `.htaccess` redirects or rewrites to PHP, feel free to utilize our [free script](https://github.com/Pantheon-SE/pantheon-htaccess-rewrites) for both WordPress and Drupal.

## Redirect Traffic to Your Live Site/Domain from `$site.pantheon.io`

There are several ways you can use PHP to redirect traffic to your live site or domain from `$site.pantheon.io`:

### Basic Use Case

```php:title=wp-config.php%20or%20settings.php
 if($_SERVER['HTTP_HOST'] == 'old.domain.com') {
    header('HTTP/1.0 301 Moved Permanently');
    header('Location: https://new.domain.com/');
  }
```

### Using RegEx

```php:title=wp-config.php%20or%20settings.php
if (preg_match('/^live-(.+)\.pantheonsite\.io$/', $_SERVER["HTTP_HOST"], $matches)) {
		$redirect_url = 'https://www.' . $matches[1] . '.com';
    $response_code = 301;
	}
```

### Without Regex

```php:title=wp-config.php%20or%20settings.php
if ($_SERVER["HTTP_HOST"] == "live-mysite.pantheonsite.io")) {
    header('HTTP/1.0 301 Moved Permanently');
    header('Location: https://www.' . $matches[1] . '.com/');
}
```

### Redirect a `/requested/path`

```php:title=wp-config.php%20or%20settings.php
if($_SERVER["REQUEST_URI"] == '/old/path') {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location: /new/path/');
}
```