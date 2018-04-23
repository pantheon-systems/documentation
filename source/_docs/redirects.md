---
title: Additional Recirect Examples
description: For those who need to use specific redirects to customize the user journey, we offer this page of examples for multiple scenarios.
tags: [redirects, variables, dns]
categories: []
---

For most users, the standard redirection to HTTPS and a single primary domain discussed in [Domains and Redirects](/docs/domains/) will suffice. To address more custom redirection needs, you can use the examples below.

When using multiple snippets, be sure to step through the logic. This is particularly important when redirecting to a common domain while also incorporating redirects for specific pages. All `if` conditional statements need to be in the correct order. For example, a wholesale redirect executed *prior* to redirects for specific pages would likely prevent the second statement from being evaluated.

## Redirect to HTTPS
The following configuration will redirect HTTP requests to HTTPS, such as `http://env-site-name.pantheonsite.io` to `https://env-site-name.pantheonsite.io` or `http://example.com` to `https://example.com`:

```php
   // Require HTTPS.
   if (isset($_SERVER['PANTHEON_ENVIRONMENT']) &&
       ($_SERVER['HTTPS'] === 'OFF') &&
       // Check if Drupal or WordPress is running via command line
       (php_sapi_name() != "cli")) {
       if (!isset($_SERVER['HTTP_USER_AGENT_HTTPS']) ||
       (isset($_SERVER['HTTP_USER_AGENT_HTTPS']) && $_SERVER['HTTP_USER_AGENT_HTTPS'] != 'ON')) {
         header('HTTP/1.0 301 Moved Permanently');
         header('Location: https://'. $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']);
         exit();

        # Name transaction "redirect" in New Relic for improved reporting (optional)
        if (extension_loaded('newrelic')) {
          newrelic_name_transaction("redirect");
        }
     }
   }
```

## Redirect from Subdomain to Subdirectory Path
The following configuration will redirect requests for `subdomain.example.com` to `https://example.com/subdirectory/`:

```php
 // Redirect subdomain to a specific path.
 if (isset($_ENV['PANTHEON_ENVIRONMENT']) &&
   ($_SERVER['HTTP_HOST'] == 'subdomain.example.com') &&
   // Check if Drupal or WordPress is running via command line
   (php_sapi_name() != "cli")) {
   $newurl = 'https://www.example.com/subdirectory/'. $_SERVER['REQUEST_URI'];
   header('HTTP/1.0 301 Moved Permanently');
   header("Location: $newurl");
  exit();
 }
```

## Redirect One Path to Another
The following configuration will redirect requests for `example.com/old` to `https://example.com/new`:

```php
// 301 Redirect from /old to /new
// Check if Drupal or WordPress is running via command line
    if (($_SERVER['REQUEST_URI'] == '/old') && (php_sapi_name() != "cli")) {
        header('HTTP/1.0 301 Moved Permanently');
        header('Location: https://'. $_SERVER['HTTP_HOST'] . '/new');
        exit();
    }
```
## Redirect Multiple Paths
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
    exit();
    }
```

## Redirect Multiple Subdomains
The following configuration will redirect requests for `sub1.example.com`, `sub2.example.com`, `sub3.example.com`, and `sub4.example.com` to `https://new.example.com`:

```php
// Redirect multiple subdomains to a single domain.
if (isset($_ENV['PANTHEON_ENVIRONMENT']) &&
  ($_ENV['PANTHEON_ENVIRONMENT'] === 'live') &&
  // Check if Drupal or WordPress is running via command line
  (php_sapi_name() != "cli")) {
  if (in_array($_SERVER['HTTP_HOST'], array(
    'sub1.example.com',
    'sub2.example.com',
    'sub3.example.com',
    'sub4.example.com'
  ))) {
    header('HTTP/1.0 301 Moved Permanently');
    header('Location: https://new.example.com'. $_SERVER['REQUEST_URI']);
    exit();
  }
}
```

## Redirect Legacy UNIX-Style User Home Folder Paths
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

## Redirect to Force Lowercase Letters
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
