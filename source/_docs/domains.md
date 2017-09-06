---
title: Domains and Redirects
description: Understand how domains work on Pantheon and how to redirect requests in PHP for WordPress and Drupal.
tags: [redirects, variables, dns]
categories: []
---
A domain name is the web address or URL used to visit your site. The Domain Name System (DNS) resolves human-readable names like `www.example.com` into machine-readable IP addresses like 127.0.0.1. All Pantheon sites are accessible via platform domains, and you can easily connect your own custom domain to paid sites.

<div class="enablement">
  <h4 class="info" markdown="1">[Get DevOps Training](https://pantheon.io/agencies/learn-pantheon?docs){.external}</h4>
  <p>Optimize your dev team and streamline internal workflows. Pantheon delivers custom workshops to help development teams master our platform and improve their internal DevOps.</p>
</div>

## Platform domains
Pantheon issues platform domains for all environments. Each environment (Dev, Test, Live, each Multidev) is accessible via the platform domain, matching the following patterns:

- dev-site-name.pantheonsite.io
- test-site-name.pantheonsite.io
- live-site-name.pantheonsite.io
- multidev-env-site-name.pantheonsite.io

All platform domains are available over HTTPS. Redirecting to HTTPS during development and testing is a good best practice to ensure you are ready to go live with HTTPS.

### robots.txt
Pantheon serves a default robots.txt that disallows crawlers on platform domains (`/*.pantheonsite.io`, `/*.pantheon.io`, `/*.gotpantheon.com`, and `/*.sites.my-agency.com`). Crawlers are allowed on the Live environment for requests served with a custom domain (e.g., `www.example.com`). If you attempt to access your Live environment with a platform domain, even if you have a domain associated with the environment, the default robots.txt will be served.

Pantheon does not allow crawlers on Dev, Test, or Multidev environments. Adding a custom domain to an environment other than Live will not permit crawlers to that environment.

## Custom domains

If you don't already own a domain name, register one with a third-party provider. Pantheon is not a domain registrar. Connect your custom domain on the Site Dashboard, and point DNS at Pantheon to trigger [automated HTTPS provisioning](/docs/https/).

{% include("content/tables/custom-domains-limit.html") %}

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p markdown="1">Add all domains (example.com and www.example.com are different domains!) you want to resolve to Pantheon within the Site Dashboard, for each respective environment, as described in [Launch Essentials](/docs/guides/launch/). Automatic resolution of domains and wildcards are not supported.</p></div>

### Primary domain
Pantheon uses the term "primary domain" to refer to a single domain used to serve all traffic from a site. For example, configuring `www.example.com` as the primary domain means that requests to `example.com` (or any other domain connected to the environment) all get redirected to `www.example.com`. Configure the primary domain as part of the going live process described in [Launch Essentials: Redirect to a Primary Domain](/docs/guides/launch/redirects/).

Choosing a primary domain is a best practice for SEO, by avoiding duplicate content. It also prevents session strangeness, where a user can be logged in to one domain but logged out of other domains at the same time.

## Vanity domains for organizations
Pantheon Partners, Strategic Partners, Enterprise accounts, Resellers, and OEM Partners have the ability to provision a custom vanity domain for each environment on every site running on the platform, in addition to the default platform domain (`pantheonsite.io`).

For details, see [Vanity Domains](/docs/vanity-domains/).

## Redirects
It's often useful to redirect requests to a different domain or path. While it's technically possible to use Drupal or WordPress to perform the redirect, it's faster and more efficient to redirect without having to fully bootstrap your web application. You can accomplish this efficiency by adding redirect logic to the WordPress `wp-config.php` file or the Drupal `settings.php` file.

<div class="alert alert-info">
<h4 class="info">Note</h4>
<p markdown="1">Redirects should be managed in PHP, since `.htaccess` is ignored. For details, see [Using PHP as an htaccess Alternative](/docs/htaccess/).</p>
</div>

### Redirect to HTTPS and the primary domain
It's a best practice for SEO and security to standardize all traffic on HTTPS and choose a primary domain. Configure redirects to the primary domain with HTTPS in `settings.php` or `wp-config.php`:

{% include("redirects.twig")%}

<div class="panel panel-drop" id="accordion">
  <div class="panel-heading panel-drop-heading">
    <a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#more-redirects"><h3 class="panel-title panel-drop-title" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-lightbulb"></span> See more redirect scenarios</h3></a>
  </div>
  <div id="more-redirects" class="collapse">
    <div class="panel-inner" markdown="1">
When using multiple snippets, be sure to step through the logic. This is particularly important when redirecting to a common domain while also incorporating redirects for specific pages. All <code>if</code> conditional statements need to be in the correct order. For example, a wholesale redirect executed <em>prior</em> to redirects for specific pages would likely prevent the second statement from being evaluated.
#### Redirect to Subdirectories or Specific URLs

To redirect from a subdomain to a specific area of the site, use the following:

```php
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
```

This will redirect requests like http://subdomain.yoursite.com/some/path to http://www.yoursite.com/subdomain/some/path.

The same technique works for single subdomain redirects. Just specify the path in `$newurl` without bothering with `$_SERVER['REQUEST_URI']`

#### Redirect From One Path to Another

```php
    // 301 Redirect from /old to /new.
    if (($_SERVER['REQUEST_URI'] == '/old') &&
      // Check if Drupal or WordPress is running via command line
      (php_sapi_name() != "cli")) {
      header('HTTP/1.0 301 Moved Permanently');
      header('Location: /new');
      exit();
    }
```
#### Redirect Multiple Subdomains to a Single Domain

```php
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
```
#### Redirect Legacy UNIX-Style User Home Folder Paths

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
#### Redirect to Force Lowercase Letters
WordPress automatically forces lowercase letters within URLs using the [`sanitize_title_with_dashes()`](https://core.trac.wordpress.org/browser/tags/4.6/src/wp-includes/formatting.php#L1744) function in core.

Drupal sites can force lowercase letters using the following:

1. Set general automatic alias settings  to **Change to lower case** within the [PathAuto](https://www.drupal.org/project/pathauto) module configuration (`/admin/build/path/pathauto`).
2. Enable **Case Sensitive URL Checking** within the [Global Redirect](https://www.drupal.org/project/globalredirect) module configuration (`/admin/settings/globalredirect`).
</div>
</div>
</div>

### Troubleshoot redirects
#### Failed cache clears, search and replace, or Drush and WP-CLI operations
All redirect logic should include the `php_sapi_name() != "cli"` conditional statement to see if WordPress or Drupal is running via the command line. Drush and WP-CLI are used by the platform for operations like cache clearing and search and replace, so it is important to only redirect web requests, otherwise the redirect will kill the PHP process before Drush or WP-CLI is executed, resulting in a silent failure:

```bash
[notice] Command: <site>.<env> -- 'drush <command>' [Exit: 1]
[error]
```
#### Infinite redirect loops
Errors referencing too many redirects may be a result of using the ` $_SERVER['HTTP_X_FORWARDED_PROTO']` variable within redirect logic located in your site's `wp-config.php` or `settings.php` file. Resolve this error by replacing the offending redirect logic with the [recommended code samples in the above section](/docs/domains/#redirect-to-https-and-the-primary-domain) and for your specific use case.
#### Mixed-mode browser warnings
Replace `http://` in the site's database and configure your CMS to assume users are visiting via HTTPS and the site’s primary domain. Templates for example should reference HTTPS in absolute CSS and Javascript sources, even when accessed with HTTP.
