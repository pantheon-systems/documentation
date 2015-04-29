---
title: Redirect Incoming Requests
description: Learn to redirect requests to an alternate domain name or path.
category:
  - going-live
  - managing
---
## Overview
Often, it's useful to redirect requests to a different domain or path. While it's technically possible to use Drupal or WordPress to perform the redirect, it's faster and more efficient to redirect without having to fully bootstrap your web application.  


**Note**: Drupal sites on Pantheon technically do not require a sites/default/settings.php file to run, and depending on how your site was created it might not have one. If it's missing, just create an empty PHP file and proceed. For more information on settings.php and environment logic, see [configuring settings.php](/docs/articles/drupal/configuring-settings-php).

#### Why redirect with settings.php or wp-config.php and not .htaccess?

Pantheon uses nginx webservers for optimal performance. While completely compatible with Drupal or WordPress, nginx does not recognize or parse Apache's directory-level configuration files, known as .htaccess files; it's like they don't even exist. Instead, redirect logic should be stored in the site's settings.php for Drupal or wp-config.php for WordPress.  


Using settings.php or wp-config.php for redirects has a number of advantages. First, as it's executable code with application state awareness, logic and decisions can be made that a web server would have no context for. Conditional logic, regular expressions, and much more are possible.  


Configuration also tends to be more maintainable as Drupal and WordPress developers are typically literate in PHP, but very few people are naturally fluent in Apache2 rewrite rules and conditions.

Finally, as settings.php or wp-config.php is parsed very early in the bootstrap process, redirects like this are "cheap", meaning low overhead. If you use a 301 redirect, Varnish will cache it as well!

**Note**: Automatic resolution of domains is not supported. For each domain that you want to resolve to Pantheon, a hostname with a matching record must be added to an environment on the  [Pantheon site's dashboard](/docs/articles/going-live).


## Redirect to a Common Domain

While it’s good for visitors and DNS to resolve both www and the domain itself, it's best practice to choose one or the other and redirect from www to non-www (or vice versa, your call). This optimizes SEO by avoiding duplicate content and prevents session strangeness, where a user can be signed on one domain but logged out of other domains at the same time.

    // Require WWW.
    if (isset($_SERVER['PANTHEON_ENVIRONMENT']) &&
      $_SERVER['PANTHEON_ENVIRONMENT'] === 'live') {
      if ($_SERVER['HTTP_HOST'] == 'yoursite.com' ||
          $_SERVER['HTTP_HOST'] == 'live-yoursite.pantheon.io') {
        header('HTTP/1.0 301 Moved Permanently');
        header('Location: http://www.yoursite.com'. $_SERVER['REQUEST_URI']);
        exit();
      }
    }

    // Remove WWW.
    if (isset($_SERVER['PANTHEON_ENVIRONMENT']) &&
      $_SERVER['PANTHEON_ENVIRONMENT'] === 'live') {
      if ($_SERVER['HTTP_HOST'] == 'www.yoursite.com' ||
          $_SERVER['HTTP_HOST'] == 'live-yoursite.pantheon.io') {
        header('HTTP/1.0 301 Moved Permanently');
        header('Location: http://yoursite.com'. $_SERVER['REQUEST_URI']);
        exit();
      }
    }

## Redirecting to HTTPS

### Require SSL for All Pages

If you'd like to put all traffic on your site under HTTPS (a best-practice if you have an SSL cert) you should be checking for the `HTTP_X_SSL` code like so:

    // Require SSL.
    if (isset($_SERVER['PANTHEON_ENVIRONMENT']) &&
      $_SERVER['PANTHEON_ENVIRONMENT'] === 'live') {
      if (!isset($_SERVER['HTTP_X_SSL']) ||
        (isset($_SERVER['HTTP_X_SSL']) && $_SERVER['HTTP_X_SSL'] != 'ON')) {
        header('HTTP/1.0 301 Moved Permanently');
        header('Location: https://www.yoursite.com'. $_SERVER['REQUEST_URI']);
        exit();
      }
    }

### Require SSL for Specific Pages

If you don't want to have your whole site under HTTPS, we recommend using a secure subdomain (e.g. secure.yoursite.com). Mixed-mode secure sessions are vulnerable. There are also edge cases with caching that can create bugs with mixed-mode SSL. Putting the secure pages on a secure domain prevents confusion in caching between secure/insecure content.

You can implement a secure domain for a specific set of page with Drupal modules or WordPress plugins, or in settings.php for Drupal or wp-config.php for WordPress. This example enforces a secure domain for any path that begins with `/admin`:

    // Require SSL for admin pages.
    if (isset($_SERVER['PANTHEON_ENVIRONMENT']) &&
      $_SERVER['PANTHEON_ENVIRONMENT'] === 'live') {
      if (!isset($_SERVER['HTTP_X_SSL']) || $_SERVER['HTTP_X_SSL'] != 'ON') {
        // If admin, redirect to secure.
        if (preg_match('/^\/admin/', $_SERVER['REQUEST_URI'])) {
          header('HTTP/1.0 301 Moved Permanently');
          header('Location: https://secure.yoursite.com'. $_SERVER['REQUEST_URI']);
          exit();
        }
      }
    }

### Require SSL and Standardize Domain

If you want to use SSL everywhere and standardize on your domain, you can combine this kind of logic into a single block:

    // Require SSL, www.
    if (isset($_SERVER['PANTHEON_ENVIRONMENT']) &&
      $_SERVER['PANTHEON_ENVIRONMENT'] === 'live') {
      if ($_SERVER['HTTP_HOST'] != 'www.yoursite.com' ||
          !isset($_SERVER['HTTP_X_SSL']) ||
          $_SERVER['HTTP_X_SSL'] != 'ON' ) {
        header('HTTP/1.0 301 Moved Permanently');
        header('Location: https://www.yoursite.com'. $_SERVER['REQUEST_URI']);
        exit();
      }
    }

### Require SSL Everywhere Except Specific Pages

If you want to use SSL for everything except some specific pages, such as a RSS feed:

    // SSL logic.
    $redirect_domain = 'www.yoursite.com';
    if (isset($_SERVER['PANTHEON_ENVIRONMENT']) && $_SERVER['PANTHEON_ENVIRONMENT'] == 'live') {
      $redirect_location = '';
      // Do not require SSL for specific pages.
      if (in_array($_SERVER['REQUEST_URI'], array('/rss.xml'))) {
        // Check if SSL is enabled.
        if (isset($_SERVER['HTTP_X_SSL']) && $_SERVER['HTTP_X_SSL'] == 'ON') {
          $redirect_location = 'http://' . $redirect_domain . $_SERVER['REQUEST_URI'];
        }
      }
      // Require SSL for everything else.
      else if (!isset($_SERVER['HTTP_X_SSL']) || $_SERVER['HTTP_X_SSL'] != 'ON') {
        $redirect_location = 'https://' . $redirect_domain . $_SERVER['REQUEST_URI'];
      }
      // Perform redirect.
      if ($redirect_location) {
        header('HTTP/1.0 301 Moved Permanently');
        header('Location: ' . $redirect_location);
        exit;
      }
    }

## Redirecting to Subdirectories or Specific URLs

If you would like to redirect from a subdomain to a specific area of the site, use the following:

    // Redirect subdomain to a specific path.
    if (isset($_SERVER['PANTHEON_ENVIRONMENT']) &&
      $_SERVER['HTTP_HOST'] == 'subdomain.yoursite.com') {
      $newurl = 'http://www.yoursite.com/subdomain/'. $_SERVER['REQUEST_URI'];
      header('HTTP/1.0 301 Moved Permanently');
      header("Location: $newurl");
      exit();
    }

This will redirect requests like http://subdomain.yoursite.com/some/path to http://www.yoursite.com/subdomain/some/path.

The same technique works for single subdomain redirects. Just specify the path in `$newurl` without bothering with `$_SERVER['REQUEST_URI']`

## Redirect from one path to another

    // 301 Redirect from /old to /new.
    if ($_SERVER['REQUEST_URI'] == '/old') {
      header('HTTP/1.0 301 Moved Permanently');
      header('Location: /new');
      exit();
    }

## Redirecting multiple subdomains to a single domain

    // Redirect multiple subdomains to a single domain.
    if (isset($_SERVER['PANTHEON_ENVIRONMENT']) &&
      $_SERVER['PANTHEON_ENVIRONMENT'] === 'live') {
      if (in_array($_SERVER['HTTP_HOST'], array(
        'sub1.youroldwebsite.com',
        'sub2.youroldwebsite.com',
        'sub3.youroldwebsite.com',
        'sub4.youroldwebsite.com',
        'sub5.youroldwebsite.com',
      ))) {
        header('HTTP/1.0 301 Moved Permanently');
        header('Location: http://main.yournewwebsite.com'. $_SERVER['REQUEST_URI']);
        exit();
      }
    }

## Redirecting Legacy UNIX-Style User Home Folder Paths

When transitioning from a system that used a tilde to indicate a home directory, the syntax is slightly different. Here's how you can parse out the username and relative path that the request was made for:

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
