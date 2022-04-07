---
title: Advanced Redirects and Restrictions
description: Configure custom redirect logic for specific scenarios
categories: [go-live]
tags: [redirects, https, dns, launch]
reviewed: "2020-02-12"
---

Basic domain and HTTPS redirection can be handled by the [Primary Domain](/redirects#set-the-primary-domain) feature. PHP redirects can be used if these configurations are not an option, or when you need specific redirect logic. Depending on the needs of the site, you may need none, only one, or several of the following configurations.

Redirect logic should be added to `wp-config.php` for [WordPress](/wp-config-php) sites, and `settings.php` for [Drupal](/settings-php) sites.

<Alert type="danger" title="Warning">

With a Primary Domain set at the platform level, all other domains (except the [platform domain](/domains#platform-domains)) will be pointed to your Primary domain _at the root level_. If you want to redirect secondary domains to specific pages on your site (for example, `olddomain.com` to `newdomain.com/old-landing-page`), do not set a Primary Domain (or if set, [remove](/redirects#update-or-remove-primary-domain) the Primary Domain).

</Alert>

## Redirect to HTTPS

The following configuration will redirect HTTP requests to HTTPS, such as `http://env-site-name.pantheonsite.io` to `https://env-site-name.pantheonsite.io` or `http://example.com` to `https://example.com`.

If you're setting [HSTS](/redirects#redirect-to-https) in `pantheon.yml`, you don't need additional PHP redirection.

```php:title=wp-config.php%20or%20settings.php
// Require HTTPS across all Pantheon environments
// Check if Drupal or WordPress is running via command line
if (isset($_SERVER['PANTHEON_ENVIRONMENT']) && ($_SERVER['HTTPS'] === 'OFF') && (php_sapi_name() != "cli")) {
  if (!isset($_SERVER['HTTP_USER_AGENT_HTTPS']) || (isset($_SERVER['HTTP_USER_AGENT_HTTPS']) && $_SERVER['HTTP_USER_AGENT_HTTPS'] != 'ON')) {

    header('HTTP/1.0 301 Moved Permanently');
    header('Location: https://'. $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']);

    // Name transaction "redirect" in New Relic for improved reporting (optional).
    if (extension_loaded('newrelic')) {
      newrelic_name_transaction("redirect");
    }

    exit();
  }
}
```

## Redirect from Subdomain to Subdirectory Path

The following configuration will redirect requests for `subdomain.example.com` to `https://example.com/subdirectory/`.

When using this type of redirect, you must first [remove the primary domain](/redirects#update-or-remove-primary-domain) from the environment.

```php:title=wp-config.php%20or%20settings.php
// Redirect subdomain to a specific path.
// Check if Drupal or WordPress is running via command line
if (isset($_ENV['PANTHEON_ENVIRONMENT']) && ($_SERVER['HTTP_HOST'] == 'subdomain.example.com') && (php_sapi_name() != "cli")) {
  $newurl = 'https://www.example.com/subdirectory'. $_SERVER['REQUEST_URI'];
  header('HTTP/1.0 301 Moved Permanently');
  header("Location: $newurl");

  // Name transaction "redirect" in New Relic for improved reporting (optional).
  if (extension_loaded('newrelic')) {
    newrelic_name_transaction("redirect");
  }

  exit();
}
```

## Redirect One Path to Another

The following configuration will redirect requests for `example.com/old` to `https://example.com/new`:

```php:title=wp-config.php%20or%20settings.php
// 301 Redirect from /old to /new
// Check if Drupal or WordPress is running via command line
if (($_SERVER['REQUEST_URI'] == '/old') && (php_sapi_name() != "cli")) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location: https://'. $_SERVER['HTTP_HOST'] . '/new');

  // Name transaction "redirect" in New Relic for improved reporting (optional).
  if (extension_loaded('newrelic')) {
    newrelic_name_transaction("redirect");
  }

  exit();
}
```

## Redirect Multiple Paths

The following configuration will redirect requests for `example.com`, `example.com/old`, `example.com/another/path`, and  `example.com/old-path` to `https://example.com/new-path-for-all`:

```php:title=wp-config.php%20or%20settings.php
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

  // Name transaction "redirect" in New Relic for improved reporting (optional).
  if (extension_loaded('newrelic')) {
    newrelic_name_transaction("redirect");
  }

  exit();
}
```

## Redirect Multiple URLs

The following configuration will redirect requests for:

- `example.com/old-url1` to `example.com/new-url1`
- `example.com/old-url2` to `example.com/new-url2`
- `example.com/old-url3` to `example.com/new-url3`

```php:title=wp-config.php%20or%20settings.php
// You can easily put a list of many 301 url redirects in this format
// Trailing slashes matters here so /old-url1 is different from /old-url1/
$redirect_targets = array(
  '/old-url1' => '/new-url1',
  '/old-url2' => '/new-url2',
  '/old-url3' => '/new-url3',
);

if ( (isset($redirect_targets[ $_SERVER['REQUEST_URI'] ] ) ) && (php_sapi_name() != "cli") ) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location: https://'. $_SERVER['HTTP_HOST'] . $redirect_targets[ $_SERVER['REQUEST_URI'] ]);

  if (extension_loaded('newrelic')) {
    newrelic_name_transaction("redirect");
  }
  exit();
}
```

## Redirect Multiple Subdomains

<Alert type="info" title="Note">

If you've configured your [primary domain at the platform level](/redirects#set-the-primary-domain) and can [add these subdomains](/domains#custom-domains) to the same same environment, redirection will happen automatically.

</Alert>

The following configuration will redirect requests for `sub1.example.com`, `sub2.example.com`, `sub3.example.com`, and `sub4.example.com` to `https://new.example.com`:

```php:title=wp-config.php%20or%20settings.php
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

    // Name transaction "redirect" in New Relic for improved reporting (optional).
    if (extension_loaded('newrelic')) {
      newrelic_name_transaction("redirect");
    }

    exit();
  }
}
```

## Wildcard Redirect from one subfolder to another

The following configuration will redirect requests pointed to any page in `example.com/old/` to the same page in `example.com/new/`. For example, `example.com/old/contributors.html` will redirect to `example.com/new/contributors.html`:

```php:title=wp-config.php%20or%20settings.php
$uri = $_SERVER['REQUEST_URI'];
$url_to_match = '/old';
$subdirectory_toredirect = '/new';
if( strpos( $uri, $url_to_match ) === 0) {

  $redirect_uri = str_replace( $url_to_match , "", $uri );
  if ( ( php_sapi_name() != "cli" ) ) {
    header( 'HTTP/1.0 301 Moved Permanently');
    header( 'Location: https://' . $_SERVER[ 'HTTP_HOST' ] . $subdirectory_toredirect . $redirect_uri );

    if (extension_loaded('newrelic')) {
      newrelic_name_transaction("redirect");
    }

    exit();
  }

}
```

## Redirect Legacy UNIX-Style User Home Folder Paths

When transitioning from a system that used a tilde to indicate a home directory, the syntax is slightly different. Here's how you can parse out the username and relative path that the request was made for:

```php:title=wp-config.php%20or%20settings.php
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

<TabList>

<Tab title="WordPress" id="wp-lc" active={true}>

WordPress automatically forces lowercase letters within URLs using the [`sanitize_title_with_dashes()`](https://core.trac.wordpress.org/browser/tags/4.6/src/wp-includes/formatting.php#L1744) function in core.

</Tab>

<Tab title="Drupal" id="dp-lc">

Drupal sites can force lowercase letters using the following:

1. Set general automatic alias settings to **Change to lower case** within the [PathAuto](https://www.drupal.org/project/pathauto) module configuration (`/admin/build/path/pathauto`).

1. Enable **Case Sensitive URL Checking** within the [Global Redirect](https://www.drupal.org/project/globalredirect) module configuration (`/admin/settings/globalredirect`).

</Tab>

</TabList>

## Redirect Files

Because Drupal or WordPress aren't bootstrapped when static assets (e.g, images, PDFs, HTML files) are served, the PHP redirects used above will not work when these files are requested directly. You can use [CloudFlare](/cloudflare) or another stacked CDN to handle file redirects.

Alternatively, you can remove the file entirely from the old location. In this case, the request will run through Drupal or WordPress. You can let the CMS serve a 404, or you can utilize a redirect in `wp-config.php` or `settings.php` as shown in the examples above.

## Redirects and Rewrites with PHP

Pantheon uses Nginx for HTTP/HTTPS instead of Apache. You can recreate Apache `mod_redirects` and `mod_rewrites` on the Pantheon platform using the code in the [Pantheon htacess Rewrites](https://github.com/Pantheon-SE/pantheon-htaccess-rewrites) repository.

The file must be included at the very beginning of your Drupal `settings.php` or Wordpress `wp-config.php` file. The code will perform rewrites and redirects prior to full Wordpress or Drupal bootstrap.

## Restrict Access to Paths Based on IP

If you want to restrict access to files based on the source IP address of the request, you can do so with PHP.

<TabList>

<Tab title="WordPress" active={true} id="restrict-wp">

The following example restricts access to `/wp-admin/` and `/wp-login.php` based on the IP addresses listed in the `$trusted_ips` array:

```php:title=wp-config.php
function ip_in_list($ips) {
    foreach(explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']) as $check_ip) {
        foreach($ips as $ip) {
          if(FALSE !== strpos($check_ip, $ip)) {
            return true;
          }
        }
    }

    return false;
}
  
function is_from_trusted_ip() {
    //Replace the IPs in this array with those you want to restrict access to
    $trusted_ips = array(
        '192.0.2.38',
        '198.51.100.12',
        '208.0.113.159',
        '98b9:1da9:71f7:0953:f012:8574:3d58:9ac9',
    );

    return ip_in_list($trusted_ips);
}

if (isset($_SERVER['PANTHEON_ENVIRONMENT']) && (php_sapi_name() !== 'cli') && !is_from_trusted_ip()) {
    // Check if the path should be locked down
    $to_lockdown = false;

    $disallow_uri = array(
        '/wp-login.php',
        '/wp-admin/',
    );

    $allow_uri = array(
        '/wp-admin/admin-ajax.php',
        '/wp-admin/admin-post.php',
    );

    foreach ($disallow_uri as $prefix) {
        if (stripos($_SERVER['REQUEST_URI'], $prefix) === 0) {
            $to_lockdown = true;

            break;
        }
    }

    foreach ($allow_uri as $prefix) {
        if (stripos($_SERVER['REQUEST_URI'], $prefix) === 0) {
           $to_lockdown = false;

           break;
        }
    }

    if ($to_lockdown) {
        header('HTTP/1.0 403 Forbidden');
        echo 'Access denied.';

        exit();
    }
}
```

</Tab>

<Tab title="Drupal 8" id="restrict-drupal-8">

The following example restricts access to `/user/`, `/admin/`, and `/node/` based on the IP addresses listed in the `$trusted_ips` array:

```php:title=settings.php
function ip_in_list($ips) {
    foreach(explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']) as $check_ip) {
        foreach($ips as $ip) {
          if(FALSE !== strpos($check_ip, $ip)) {
            return true;
          }
        }
    }
    return false;
  }

  function is_from_trusted_ip() {
    //Replace the IPs in this array with those you want to restrict access to
    $trusted_ips = array('192.0.2.38','198.51.100.12','208.0.113.159','98b9:1da9:71f7:0953:f012:8574:3d58:9ac9');
    return ip_in_list($trusted_ips);
  }
  if (isset($_SERVER['PANTHEON_ENVIRONMENT']) && !is_from_trusted_ip() ) {
    // Check if the path should be locked down
    $to_lockdown = false;
    $clean_request_uri = rtrim( mb_strtolower(strtok($_SERVER["REQUEST_URI"],'?')), '/' );
    if ( $_GET['q'] == 'admin') {
      // admin pages
      $to_lockdown = true;
    } elseif ( substr($clean_request_uri, 0, 5) == '/user' ) {
      // user login page
      $to_lockdown = true;
    } elseif ( substr($clean_request_uri, 0, 6) == '/admin' ) {
      // admin pages
      $to_lockdown = true;
    } elseif ( substr($clean_request_uri, 0, 6) == '/node/' && substr($clean_request_uri, -4) == 'edit' ) {
      // node edit pages
      $to_lockdown = true;
    }
    if($to_lockdown && (php_sapi_name() != "cli")){
      header('HTTP/1.0 403 Forbidden');
      echo 'Access denied.';
    exit();
    }
  }
  ```

</Tab>

<Tab title="Drupal 7" id="restrict-drupal-7">

The following example restricts access to `/user/`, `/admin/`, and `/node/` based on the IP addresses listed in the `$trusted_ips` array:

```php:title=settings.php
function ip_in_list($ips) {
    foreach(explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']) as $check_ip) {
        foreach($ips as $ip) {
          if(FALSE !== strpos($check_ip, $ip)) {
            return true;
          }
        }
    }
    return false;
  }

  function is_from_trusted_ip() {
    //Replace the IPs in this array with those you want to restrict access to
    $trusted_ips = array('192.0.2.38','198.51.100.12','208.0.113.159','98b9:1da9:71f7:0953:f012:8574:3d58:9ac9');
    return ip_in_list($trusted_ips);
  }
  if (isset($_SERVER['PANTHEON_ENVIRONMENT']) && !is_from_trusted_ip() ) {
    // Check if the path should be locked down
    $to_lockdown = false;
    $clean_request_uri = rtrim( mb_strtolower(strtok($_SERVER["REQUEST_URI"],'?')), '/' );
    $slashes_removed_uri = str_replace( array('/', '%2f'), '', $clean_request_uri );
    if ( $_GET['q'] == 'admin') {
      // admin pages
      $to_lockdown = true;
    } elseif ( substr($slashes_removed_uri, 0, 4) == 'user' ) {
      // user login page
      $to_lockdown = true;
    } elseif ( substr($slashes_removed_uri, 0, 5) == 'admin' ) {
      // admin pages
      $to_lockdown = true;
    } elseif ( substr($slashes_removed_uri, 0, 4) == 'node' && substr($slashes_removed_uri, -4) == 'edit' ) {
      // node edit pages
      $to_lockdown = true;
    }
    if($to_lockdown && (php_sapi_name() != "cli")){
      header('HTTP/1.0 403 Forbidden');
      echo 'Access denied.';
    exit();
    }
  }
```

</Tab>

</TabList>

For more advanced security and optimization, consider the [Advanced CDN](/guides/professional-services/advanced-global-cdn) service from our Professional Services team.
