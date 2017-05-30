---
title: Redirect Incoming Requests
description: Learn to redirect requests to an alternate Drupal or WordPress domain name or path via PHP.
tags: [redirects, variables]
categories: []
---
It's often useful to redirect requests to a different domain or path. While it's technically possible to use Drupal or WordPress to perform the redirect, it's faster and more efficient to redirect without having to fully bootstrap your web application.
<div class="alert alert-danger" role="alert">
<h4 class="info">Warning</h4>
<p>When using multiple snippets, be sure to step through the logic. This is particularly important when redirecting to a common domain while also incorporating redirects for specific pages. All <code>if</code> conditional statements need to be in the correct order. For example, a wholesale redirect executed <em>prior</em> to redirects for specific pages would likely prevent the second statement from being evaluated.</p>
</div>


## Redirecting via PHP instead of .htaccess

Pantheon uses nginx webservers for optimal performance. While completely compatible with Drupal or WordPress, nginx does not recognize or parse Apache's directory-level configuration files, known as `.htaccess` files. Instead, redirect logic should be stored in the site's `settings.php` for Drupal or `wp-config.php` for WordPress.

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p>Drupal 7 sites on Pantheon do not require a <code>sites/default/settings.php</code> file to run, and depending on how your site was created it might not have one. If it's missing, just create an empty PHP file and proceed. For more information, see <a href="/docs/settings-php">Configuring settings.php</a>.</p></div>


Some advantages of redirecting via PHP instead of `.htaccess` include:

- Logic and decisions can be made that a web server would have no context for, as it's executable code with application state awareness. Conditional logic, regular expressions, and much more are possible.
- Configuration tends to be more maintainable as Drupal and WordPress developers are typically literate in PHP, but very few people are naturally fluent in Apache2 rewrite rules and conditions.
- Since `settings.php` and `wp-config.php` are parsed very early in the bootstrap process, redirects like this are "cheap" with low overhead. If you use a 301 redirect, Varnish will cache it as well.

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p>Automatic resolution of domains is not supported. For each domain that you want to resolve to Pantheon, add a hostname with a matching record to an environment on the <a href="/docs/domains#step-2-add-domains-to-the-site-environment" data-proofer-ignore> site's Dashboard</a>.</p>
</div>

### Command Line Conditionals
All redirect logic run on Pantheon environments should include the `php_sapi_name() != "cli"` conditional statement to see if WordPress or Drupal is running via the command line. Otherwise, redirects kill the PHP process before Drush and WP-CLI is executed resulting in a silent failure:

```bash
[notice] Command: <site>.<env> -- 'drush <command>' [Exit: 1]
[error]
```

## Redirect to a Common Domain

While it’s good for visitors and DNS to resolve both www and the domain itself, it's best practice to choose one or the other and redirect from www to non-www (or vice versa, your call). This optimizes SEO by avoiding duplicate content and prevents session strangeness, where a user can be logged in to one domain but logged out of other domains at the same time.

<div class="panel panel-video" id="accordion">
  <div class="panel-heading panel-video-heading">
    <a class="accordion-toggle panel-video-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#redirects-video"><h3 class="panel-title panel-video-title" style="cursor:pointer;">Show me how </h3></a>
  </div>
  <div id="redirects-video" class="collapse">
    <script src="//fast.wistia.com/embed/medias/fof9qie645.jsonp" async></script><script src="//fast.wistia.com/assets/external/E-v1.js" async></script><div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><div class="wistia_embed wistia_async_fof9qie645 videoFoam=true" style="height:100%;width:100%">&nbsp;</div></div></div>
  </div>
</div>

### Redirect to www

```
// Require www.
if (isset($_SERVER['PANTHEON_ENVIRONMENT']) &&
  ($_SERVER['PANTHEON_ENVIRONMENT'] === 'live') &&
  // Check if Drupal or WordPress is running via command line
  (php_sapi_name() != "cli")) {
  if ($_SERVER['HTTP_HOST'] == 'yoursite.com' ||
      $_SERVER['HTTP_HOST'] == 'thatothersiteyouhad.com') {
    header('HTTP/1.0 301 Moved Permanently');
    header('Location: http://www.yoursite.com'. $_SERVER['REQUEST_URI']);
    exit();
  }
}
```

### Redirect from www to the Bare Domain

If you prefer to use the bare domain, use the following code block and run your DNS settings through a service that supports CNAME flattening. For details, see <a href="/docs/domains/#step-3-configure-your-dns" data-proofer-ignore>Domains and DNS</a>.

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p>If you are running the site on a Pro plan or above with an SSL certificate, use the snippet below without configuring a CNAME flattening service. </p></div>

To direct all traffic to the bare domain using Cloudflare:

 - Sign up for a service that supports CNAME flattening, such as [Cloudflare](https://www.cloudflare.com/).
 - Remove the existing A record generated by Cloudflare, then create CNAME records for www and the bare domain.
 - Add the following snippet to your settings.php or wp-config.php:

 ```
    // Redirect all traffic to non-www. For example yoursite.com
    if (isset($_SERVER['PANTHEON_ENVIRONMENT']) &&
      ($_SERVER['PANTHEON_ENVIRONMENT'] === 'live') &&
      // Check if Drupal or WordPress is running via command line
      (php_sapi_name() != "cli")) {
      if ($_SERVER['HTTP_HOST'] == 'www.yoursite.com') {
        header('HTTP/1.0 301 Moved Permanently');
        header('Location: http://yoursite.com'. $_SERVER['REQUEST_URI']);
        exit();
      }
    }
 ```

## Redirect to HTTPS

### Require HTTPS for All Pages
To enable HTTPS across Pantheon's Dev, Test, and Live environments for all traffic on your site (a best practice if you have a certificate), check for the `HTTP_X_SSL` code:

    // Require HTTPS.
    if (isset($_SERVER['PANTHEON_ENVIRONMENT']) &&
      ($_SERVER['HTTPS'] === 'OFF') &&
      // Check if Drupal or WordPress is running via command line
      (php_sapi_name() != "cli")) {
      if (!isset($_SERVER['HTTP_X_SSL']) ||
      (isset($_SERVER['HTTP_X_SSL']) && $_SERVER['HTTP_X_SSL'] != 'ON')) {
        header('HTTP/1.0 301 Moved Permanently');
        header('Location: https://'. $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']);
        exit();
      }
    }


### Require HTTPS for Specific Pages

If you don't want to have your whole site under HTTPS, we recommend using a secure subdomain (e.g. secure.yoursite.com). Mixed-mode secure sessions are vulnerable. There are also edge cases with caching that can create bugs with mixed-mode HTTPS. Putting the secure pages on a secure domain prevents confusion in caching between secure/insecure content.

You can implement a secure domain for a specific set of pages with Drupal modules or WordPress plugins, or in settings.php for Drupal or wp-config.php for WordPress. This example enforces a secure domain for any path that begins with `/admin`:

    // Require HTTPS for admin pages.
    if (isset($_SERVER['PANTHEON_ENVIRONMENT']) &&
      ($_SERVER['HTTPS'] === 'OFF') &&
      // Check if Drupal or WordPress is running via command line
      (php_sapi_name() != "cli")) {
      if (!isset($_SERVER['HTTP_X_SSL']) || $_SERVER['HTTP_X_SSL'] != 'ON') {
        // If admin, redirect to secure.
        if (preg_match('/^\/admin/', $_SERVER['REQUEST_URI'])) {
          header('HTTP/1.0 301 Moved Permanently');
          header('Location: https://secure.yoursite.com'. $_SERVER['REQUEST_URI']);
          exit();
        }
      }
    }

### Require HTTPS and Standardize Domain

To use HTTPS everywhere and standardize on your domain (e.g. `www.yoursite.com`), combine this kind of logic into a single block:

    // Require HTTPS, www.
    if (isset($_SERVER['PANTHEON_ENVIRONMENT']) &&
      ($_SERVER['PANTHEON_ENVIRONMENT'] === 'live') &&
      // Check if Drupal or WordPress is running via command line
      (php_sapi_name() != "cli")) {
      if ($_SERVER['HTTP_HOST'] != 'www.yoursite.com' ||
          !isset($_SERVER['HTTP_X_SSL']) ||
          $_SERVER['HTTP_X_SSL'] != 'ON' ) {
        header('HTTP/1.0 301 Moved Permanently');
        header('Location: https://www.yoursite.com'. $_SERVER['REQUEST_URI']);
        exit();
      }
    }

### Require HTTPS Everywhere Except Specific Pages

To use HTTPS for everything except some specific pages, such as an RSS feed:

    // HTTPS logic.
    $redirect_domain = 'www.yoursite.com';
    if (isset($_SERVER['PANTHEON_ENVIRONMENT']) && $_SERVER['PANTHEON_ENVIRONMENT'] == 'live') &&
    // Check if Drupal or WordPress is running via command line
    (php_sapi_name() != "cli")) {
      $redirect_location = '';
      // Do not require HTTPS for specific pages.
      if (in_array($_SERVER['REQUEST_URI'], array('/rss.xml'))) {
        // Check if HTTPS is enabled.
        if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') {
          $redirect_location = 'http://' . $redirect_domain . $_SERVER['REQUEST_URI'];
        }
      }
      // Require HTTPS for everything else.
      else if (!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] != 'on') {
        $redirect_location = 'https://' . $redirect_domain . $_SERVER['REQUEST_URI'];
      }
      // Perform redirect.
      if ($redirect_location) {
        header('HTTP/1.0 301 Moved Permanently');
        header('Location: ' . $redirect_location);
        exit;
      }
    }

### Troubleshooting
#### Infinite Redirect Loops
Errors referencing too many redirects may be a result of using the ` $_SERVER['HTTP_X_FORWARDED_PROTO']` variable within redirect logic located in your site's `wp-config.php` or `settings.php` file. Resolve this error by replacing the offending redirect logic with the [recommended code samples in the above section](/docs/redirects/#require-https-and-standardize-domain) and for your specific use case.


## Redirect to Subdirectories or Specific URLs

To redirect from a subdomain to a specific area of the site, use the following:

    // Redirect subdomain to a specific path.
    if (isset($_SERVER['PANTHEON_ENVIRONMENT']) &&
      ($_SERVER['HTTP_HOST'] == 'subdomain.yoursite.com') &&
      // Check if Drupal or WordPress is running via command line
      (php_sapi_name() != "cli")) {
      $newurl = 'http://www.yoursite.com/subdomain/'. $_SERVER['REQUEST_URI'];
      header('HTTP/1.0 301 Moved Permanently');
      header("Location: $newurl");
      exit();
    }

This will redirect requests like http://subdomain.yoursite.com/some/path to http://www.yoursite.com/subdomain/some/path.

The same technique works for single subdomain redirects. Just specify the path in `$newurl` without bothering with `$_SERVER['REQUEST_URI']`

## Redirect From One Path to Another

    // 301 Redirect from /old to /new.
    if (($_SERVER['REQUEST_URI'] == '/old') &&
      // Check if Drupal or WordPress is running via command line
      (php_sapi_name() != "cli")) {
      header('HTTP/1.0 301 Moved Permanently');
      header('Location: /new');
      exit();
    }

## Redirect Multiple Subdomains to a Single Domain

    // Redirect multiple subdomains to a single domain.
    if (isset($_SERVER['PANTHEON_ENVIRONMENT']) &&
      ($_SERVER['PANTHEON_ENVIRONMENT'] === 'live') &&
      // Check if Drupal or WordPress is running via command line
      (php_sapi_name() != "cli")) {
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

## Redirect Legacy UNIX-Style User Home Folder Paths

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

## Redirect to Force Lowercase Letters
WordPress automatically forces lowercase letters within URLs using the [`sanitize_title_with_dashes()`](https://core.trac.wordpress.org/browser/tags/4.6/src/wp-includes/formatting.php#L1744) function in core.

Drupal sites can force lowercase letters using the following:

1. Set general automatic alias settings  to **Change to lower case** within the [PathAuto](https://www.drupal.org/project/pathauto) module configuration (`/admin/build/path/pathauto`).
2. Enable **Case Sensitive URL Checking** within the [Global Redirect](https://www.drupal.org/project/globalredirect) module configuration (`/admin/settings/globalredirect`).
