---
title: Configure Redirects
description: Review considerations and recommendations on how to handle redirect logic via PHP within your site's configuration file.
tags: [redirects, variables, dns]
categories: []
---
Configure redirects within `settings.php` (Drupal) or `wp-config.php` (WordPress), adjusting placeholder values within snippets as needed (e.g., `example.com`).

## Considerations
### PHP vs htaccess
Pantheon does not support managing redirects in `.htaccess` files, since they are ignored by [NGINX](https://www.nginx.com/resources/wiki/#){.external} for reduced resource consumption and increased efficiency. This configuration is standard across all Pantheon sites, and modifications to the `nginx.conf` file are not supported.

Using `.htaccess` is generally not recommended - even for sites running  [Apache](https://httpd.apache.org/docs/trunk/howto/htaccess.html#when){.external}. Instead, we suggest handling redirects in PHP within your site's configuration file. Some advantages of redirecting via PHP instead of `.htaccess` include:

- Logic and decisions can be made that a web server would have no context for, as it's executable code with application state awareness. Conditional logic, regular expressions, and much more are possible.
- Configuration tends to be more maintainable as Drupal and WordPress developers are typically more familiar with PHP than Apache rewrite rules.
- Since `settings.php` and `wp-config.php` are parsed very early in the bootstrap process, redirects like this are "cheap" with low overhead. If you use a 301 redirect, the [Pantheon Global CDN](/docs/global-cdn/) will cache it as well.

### Avoid Excessive Redirects
When using multiple snippets, be sure to step through the logic. This is particularly important when redirecting to a common domain while also incorporating redirects for specific pages. All `if` conditional statements need to be in the correct order. For example, a wholesale redirect executed *prior* to redirects for specific pages would likely prevent the second statement from being evaluated.

## Redirect to HTTPS and the Primary Domain
This redirect is considered best practice and recommended as part of the going live procedure. Configure this redirect after connecting a custom domain in the Site Dashboard when you're ready to launch the site. For details, see [Launch Essentials](/docs/guides/launch/).

The following configuration will redirect HTTP to HTTPS _and_ enforce use of a primary domain, such as `http://live-site-name.pantheonsite.io` to `https://www.example.com` or `http://example.com` to `https://www.example.com`:

{% include("redirects.twig")%}

## Additional Redirects (Optional)
Implement scenario specific redirects as required by the site. Depending on the needs of the site, you may only need one, some, or none of the following.

As described [above](#redirect-to-https-and-the-primary-domain), redirect logic should be added to `wp-config.php` for WordPress sites, and `settings.php` for Drupal sites.
### Redirect to HTTPS
The following configuration will redirect HTTP requests to HTTPS, such as `http://env-site-name.pantheonsite.io` to `https://env-site-name.pantheonsite.io` or `http://example.com` to `https://example.com`:

```php
// Require HTTPS across all Pantheon environments
// Check if Drupal or WordPress is running via command line
if (isset($_SERVER['PANTHEON_ENVIRONMENT']) && ($_SERVER['HTTPS'] === 'OFF') && (php_sapi_name() != "cli")) {
  if (!isset($_SERVER['HTTP_USER_AGENT_HTTPS']) || (isset($_SERVER['HTTP_USER_AGENT_HTTPS']) && $_SERVER['HTTP_USER_AGENT_HTTPS'] != 'ON')) {

    header('HTTP/1.0 301 Moved Permanently');
    header('Location: https://'. $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']);

    # Name transaction "redirect" in New Relic for improved reporting (optional)
    if (extension_loaded('newrelic')) {
      newrelic_name_transaction("redirect");
    }
    
    exit();
  }
}
```

### Redirect from Subdomain to Subdirectory Path
The following configuration will redirect requests for `subdomain.example.com` to `https://example.com/subdirectory/`:

```php
// Redirect subdomain to a specific path.
// Check if Drupal or WordPress is running via command line
if (isset($_ENV['PANTHEON_ENVIRONMENT']) && ($_SERVER['HTTP_HOST'] == 'subdomain.example.com') && (php_sapi_name() != "cli")) {
  $newurl = 'https://www.example.com/subdirectory/'. $_SERVER['REQUEST_URI'];
  header('HTTP/1.0 301 Moved Permanently');
  header("Location: $newurl");

  # Name transaction "redirect" in New Relic for improved reporting (optional)
  if (extension_loaded('newrelic')) {
    newrelic_name_transaction("redirect");
  }
  
  exit();
}
```

### Redirect One Path to Another
The following configuration will redirect requests for `example.com/old` to `https://example.com/new`:

```php
// 301 Redirect from /old to /new
// Check if Drupal or WordPress is running via command line
if (($_SERVER['REQUEST_URI'] == '/old') && (php_sapi_name() != "cli")) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location: https://'. $_SERVER['HTTP_HOST'] . '/new');

  # Name transaction "redirect" in New Relic for improved reporting (optional)
  if (extension_loaded('newrelic')) {
    newrelic_name_transaction("redirect");
  }
  
  exit();
}
```
### Redirect Multiple Paths
The following configuration will redirect requests for `example.com`, `example.com/old`, `example.com/another/path`, and  `example.com/old-path` to `https://example.com/new-path-for-all`:

```php
$redirects = array(
  "/",
  "/old",
  "/another/path",
  "/old-path");

// 301 Redirect from multiple paths
// Check if Drupal or WordPress is running via command line
if ((in_array($_SERVER['REQUEST_URI'], $redirects)) && (php_sapi_name() != "cli")) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location: https://'. $_SERVER['HTTP_HOST'] . '/new-path-for-all');

  # Name transaction "redirect" in New Relic for improved reporting (optional)
  if (extension_loaded('newrelic')) {
    newrelic_name_transaction("redirect");
  }
  
  exit();
}
```

### Redirect Multiple URLs
The following configuration will redirect requests for:

 - `example.com/old-url1` to `example.com/new-url1`
 - `example.com/old-url2` to `example.com/new-url2`
 - `example.com/old-url3` to `example.com/new-url3`

```php
// You can easily put a list of many 301 url redirects in this format
// Trailing slashes matters here so /old-url1 is different from /old-url1/
$redirect_targets = array(
  '/old-url1' => '/new-url1',
  '/old-url2' => '/new-url2',
  '/old-url3' => '/new-url3',
);

if ( (isset($redirect_targets[ $_SERVER['REQUEST_URI'] ] ) ) && (php_sapi_name() != "cli") ) {
  echo 'https://'. $_SERVER['HTTP_HOST'] . $redirect_targets[ $_SERVER['REQUEST_URI'] ];
  header('HTTP/1.0 301 Moved Permanently');
  header('Location: https://'. $_SERVER['HTTP_HOST'] . $redirect_targets[ $_SERVER['REQUEST_URI'] ]);

  if (extension_loaded('newrelic')) {
    newrelic_name_transaction("redirect");
  } 
  exit();
}
```

### Redirect Multiple Subdomains
The following configuration will redirect requests for `sub1.example.com`, `sub2.example.com`, `sub3.example.com`, and `sub4.example.com` to `https://new.example.com`:

```php
// Redirect multiple subdomains to a single domain.
// Check if Drupal or WordPress is running via command line
if (isset($_ENV['PANTHEON_ENVIRONMENT']) && ($_ENV['PANTHEON_ENVIRONMENT'] === 'live') && (php_sapi_name() != "cli")) {
  if (in_array($_SERVER['HTTP_HOST'], array(
    'sub1.example.com',
    'sub2.example.com',
    'sub3.example.com',
    'sub4.example.com'
  ))) {
    header('HTTP/1.0 301 Moved Permanently');
    header('Location: https://new.example.com'. $_SERVER['REQUEST_URI']);

    # Name transaction "redirect" in New Relic for improved reporting (optional)
    if (extension_loaded('newrelic')) {
      newrelic_name_transaction("redirect");
    }

    exit();
  }
}
```

### Redirect Legacy UNIX-Style User Home Folder Paths
When transitioning from a system that used a tilde to indicate a home directory, the syntax is slightly different. Here's how you can parse out the username and relative path that the request was made for:

```php
$request_parts = explode('/', $_SERVER['REQUEST_URI']);
$legacy_username = $legacy_path = '';
if (isset($request_parts[1]) && strpos($request_parts[1], '~') === 0) {
  $legacy_username = substr($request_parts[1], 1);
  // If FALSE, then the request was just to the username.
  $legacy_path = substr($_SERVER['REQUEST_URI'], (strlen($request_parts[1]) + 1));
}
if ($legacy_username) {
  // Your custom logic.
}
```

### Redirect to Force Lowercase Letters
<!-- Nav tabs -->
<ul class="nav nav-tabs" role="tablist">
  <!-- Active tab -->
  <li id="tab-1-id" role="presentation" class="active"><a href="#tab-1-anchor" aria-controls="tab-1-anchor" role="tab" data-toggle="tab">WordPress</a></li>

  <!-- 2nd Tab Nav -->
  <li id="tab-2-id" role="presentation"><a href="#tab-2-anchor" aria-controls="tab-2-anchor" role="tab" data-toggle="tab">Drupal</a></li>
</ul>

<!-- Tab panes -->
<div class="tab-content">
  <!-- Active pane content -->
  <div role="tabpanel" class="tab-pane active" id="tab-1-anchor" markdown="1">
  WordPress automatically forces lowercase letters within URLs using the [`sanitize_title_with_dashes()`](https://core.trac.wordpress.org/browser/tags/4.6/src/wp-includes/formatting.php#L1744){.external} function in core.
  </div>

  <!-- 2nd pane content -->
  <div role="tabpanel" class="tab-pane" id="tab-2-anchor" markdown="1">
  Drupal sites can force lowercase letters using the following:

  1. Set general automatic alias settings to **Change to lower case** within the [PathAuto](https://www.drupal.org/project/pathauto){.external} module configuration (`/admin/build/path/pathauto`).
  2. Enable **Case Sensitive URL Checking** within the [Global Redirect](https://www.drupal.org/project/globalredirect){.external} module configuration (`/admin/settings/globalredirect`).
</div>
</div>

### Redirect Files
Because Drupal or WordPress aren't bootstrapped when static assets (e.g, images, PDFs, HTML files) are served, the PHP redirects used above will not work when these files are requested directly. You can use [CloudFlare](/docs/cloudflare/) or another stacked CDN to handle file redirects.

Alternatively, you can remove the file entirely from the old location. In this case, the request will run through Drupal or WordPress. You can let the CMS serve a 404, or you can utilize a redirect in `wp-config.php` or `settings.php` as shown in the examples above.

## See Also
- [Configuring Settings.php](/docs/settings-php/)
- [Configuring wp-config.php](/docs/wp-config-php/)
- [Platform and Custom Domains](/docs/domains/)
- [Launch Essentials](/docs/guides/launch/)
- [Relaunch Existing Pantheon Site](/docs/relaunch/)
