---
title: WordPress Best Practices
description: A list of suggestions for developing WordPress sites on Pantheon.
cms: "WordPress"
categories: [develop]
tags: [workflow, security, composer]
reviewed: "2020-10-15"
---

This article provides suggestions, tips, and best practices for developing and managing WordPress sites on the Pantheon platform.

## Development

* We recommend using an [IDE](https://en.wikipedia.org/wiki/Comparison_of_integrated_development_environments#PHP), or a text editor designed for development like [Atom](https://atom.io/), [Sublime Text](https://www.sublimetext.com/), or [Brackets](https://github.com/adobe/brackets/).

* Do not modify core WordPress files as it can cause unintended consequences, and can [prevent you from updating your site regularly](/core-updates#apply-upstream-updates-manually-from-the-command-line-to-resolve-merge-conflicts). If you need to modify any WP functionality, do it as a custom or [Must Use](/mu-plugin) plugin, which adheres to the [WP.org Plugin best practices](https://developer.wordpress.org/plugins/the-basics/best-practices/).

* Use [Redis](/object-cache). Redis is an open-source, networked, in-memory, key-value data store that can be used as a drop-in caching backend for your WordPress site. Pantheon makes it super simple and you'll be able to cache a lot of database queries in WordPress.

* Use [wp-cfm](/wp-cfm). It lets you store settings from the `wp_options` table in Git and pull it into the database. A lot of WordPress stuff is option-heavy and you can spend a lot of time trying to figure out what you missed between environments. This is true for all WordPress sites, but especially helpful on Pantheon where you have at least three environments you will need to reconfigure every time.

* Use [Grunt](https://gruntjs.com) or [Gulp](https://github.com/gulpjs/gulp) to aggregate JS/CSS on your local development environment rather than relying on the server to do it for you. This helps speed up your workflow by minimizing redundant tasks.

* When developing custom plugins or themes, it is best to abide by the [WordPress Coding Standards](https://make.wordpress.org/core/handbook/best-practices/coding-standards/) for efficiency and ease of collaboration.

### Plugins

* Add [Composer](/composer) and pull your WordPress plugins from [wpackagist.org](https://wpackagist.org/). WordPress Packagist mirrors the WordPress.org plugin repository and adds a composer.json file so things play nice. It makes future debugging much simpler should you need to switch between multiple plugin or WordPress versions to see what caused something to break. While [committing Composer dependencies is generally not recommended](https://getcomposer.org/doc/faqs/should-i-commit-the-dependencies-in-my-vendor-directory.md), you will have to commit the dependencies that Composer downloads on Pantheon since running `composer install` on the environments is not supported (just as Git submodules are not supported).

* If you have a custom plugin that retrieves a specific post (or posts), instead of using `wp_query()` to retrieve it, use the `get_post()` function. While wp_query has its uses, the [get_post](https://developer.wordpress.org/reference/functions/get_post/) function is built specifically to retrieve a WordPress Post object, and does so very efficiently.

* Don't use plugins that create files vital to your site logic that you aren't willing to track in Git. Sometimes they're dumped in uploads, sometimes not, and you'll likely have difficulty trying to figure it out later. You'd be surprised how many uploads-type plugins rely on `.htaccess` files — avoid those as well.


### Themes

* In your theme, use a simple PHP `include()` instead of WordPress's [get_template_part()](https://codex.wordpress.org/Function_Reference/get_template_part). The overhead is heavy if your use case is simply adding in another sub-template file. For example:

  ```php
  <?php get_template_part('content', 'sidebar'); ?>
  <?php include('content-sidebar.php'); ?>
  ```
  
#### Manage License Keys for Themes or Plugins

There are many plugins and themes in WordPress that require license keys. Since Dev and Multidev are the only writable environments in SFTP mode, it is best practice to associate the license key in a domain so you can easily update and deploy the updates to Test and Live environments. 


## Testing

* Run [Launch Check](/wordpress-launch-check) to review errors and get recommendations on your site's configurations.

* Automate testing with [Behat](/guides/behat). Adding automated testing into your development workflow will help you deliver higher quality WordPress sites.

## Live

* We recommend using HTTPS. For more information, see [HTTPS on Pantheon's Global CDN](/https)

* Verify [Global CDN caching](/test-global-cdn-caching) is working on your site.

* Follow our [Frontend Performance](/guides/frontend-performance) guide to tune your WordPress site.

## Avoid XML-RPC Attacks

The `/xmlrpc.php` script is a potential security risk for WordPress sites. It can be used by bad actors to brute force administrative usernames and passwords, for example. This can be surfaced by reviewing your site's `nginx-access.log` for the Live environment. If you leverage [GoAccess](/nginx-access-log), you might see something similar to the following:

```none
2 - Top requests (URLs)                                  Total: 366/254431

Hits Vis.     %   Bandwidth Avg. T.S. Cum. T.S. Max. T.S. Data
---- ---- ----- ----------- --------- --------- --------- ----
2026   48 0.77%   34.15 KiB   1.27  s  42.74 mn  38.01  s /xmlrpc.php
566   225 0.21%   12.81 MiB   4.08  s  38.45 mn  59.61  s /
262    79 0.10%  993.71 KiB   2.32  s  10.14 mn  59.03  s /wp-login.php
```

Pantheon recommends disabling XML-RPC, given the WordPress Rest API is a stronger and more secure method for interacting with WordPress via external services.

Pantheon blocked requests to `xmlrpc.php` by default in the [WordPress 5.4.2 core release](/changelog/2020/07#wordpress-542). If your version of WordPress is older than this, you can block `xmlrpc.php` attacks by applying your [upstream updates](/core-updates).

### Disable XML-RPC via Pantheon.yml

This method is more performant than disabling via a plugin since this won't involve bootstrapping WordPress. The result of this configuration is that requests to `/xmlrpc.php` will return a 403 status code.

Add the following configuration to your [`pantheon.yml`](/pantheon-yml) file:

  ```yml:title=pantheon.yml
  protected_web_paths:
    - /xmlrpc.php
  ```

### Disable XML-RPC via a Custom Plugin

This method has the advantage of being toggleable without deploying code, by activating or deactivating a custom plugin. The result of creating and activating this plugin is that exploitable XMLRPC methods will no longer be available via POST requests.

1. [Set the connection mode to SFTP](/sftp) for the Dev or target Multidev environment via the Pantheon Dashboard or with [Terminus](/terminus):

  ```bash{promptUser: user}
  terminus connection:set <site>.<env> sftp
  ```

1. Use [Terminus](/terminus) and [WP-CLI's `scaffold plugin`](https://developer.wordpress.org/cli/commands/scaffold/plugin/) command to create  a new custom plugin.

  In the following example, replace `my-site` with your Pantheon site name, and `disable-xmlrpc` with your preferred name for this new plugin:

  ```bash{promptUser: user}
  terminus wp my-site.dev -- scaffold plugin disable-xmlrpc
  ```

1. Add the following lines to the main PHP plugin file:

  ```php:title=wp-content/plugins/disable-xmlrpc/disable-xmlrpc.php
  # Disable /xmlrpc.php
  add_filter('xmlrpc_methods', function () {
    return [];
  }, PHP_INT_MAX);
  ```

1. Activate the new plugin from within the WordPress admin dashboard, or via Terminus and WP-CLI:

  ```bash{promptUser: user}
  terminus wp my-site.dev -- plugin activate disable-xmlrpc
  ```

1. Commit your work, deploy code changes then activate the plugin on Test and Live environments.

## Avoid WordPress Login Attacks

Similar to XML-RPC, the `wp-login.php` path can be subject to abuse by bots or other spammers. Unlike XML-RPC that is not used often anymore, `wp-login.php` is the primary entry point for logging into WordPress. There are a few recommended actions you can take to protect yourself against login abuse:

1. Change the `wp-login.php` path.

    Using a plugin like [WPS Hide Login](https://wordpress.org/plugins/wps-hide-login/), you can change the login path from `wp-login.php` to any path to your choosing, such as `/login` or `/admin`. You can then redirect all `wp-login.php` requests to another page (such as `/404`).

1. Enforce complex passwords.

    WordPress out-of-the-box provides password complexity guidelines, but does not require you to enforce it. You can use plugins like [Better Passwords](https://wordpress.org/plugins/better-passwords/) to set a minimum password length and let you know if the password has been collected in a previous data breach.

1. Add Multi-Factor Authentication (MFA).

    Two Factor Authentication (2FA) is an added layer of protection to ensure the security of your accounts beyond just a username and password. Multi-Factor only refers to the capability of having more than two factors of authentication (for example: password, SMS, and email verification). There are many [Two-Factor Authentication](https://wordpress.org/plugins/tags/two-factor-authentication/) plugins that can be used to add protection when logging into your WordPress site.

1. Use Single Sign-On (SSO), if available.

    If your organization makes use of an Identity Provider (IdP) such as Google Workspace, Microsoft AzureAD, or others, it is best to utilize that as the login authority for your WordPress site. Some plugins or services can simplify the SSO integration of your IdP, such as [WP SAML Auth](https://wordpress.org/plugins/wp-saml-auth/) or [MiniOrange](https://plugins.miniorange.com/wordpress). Often times, a byproduct of implementing SSO is enabling MFA (if required by your organization's IdP policy).

## Security Headers

Pantheon's Nginx configuration [cannot be modified](/platform-considerations#htaccess) to add security headers, and many solutions (including plugins) written about security headers for WordPress involve modifying the `.htaccess` file for Apache-based platforms.

There are plugins for WordPress that do not require `.htaccess` to set security headers (like [GD Security Headers](https://wordpress.org/plugins/gd-security-headers/) or [HTTP headers to improve web site security](https://wordpress.org/plugins/http-security/)), but header specifications may change more rapidly than the plugins can keep up with. In those cases, you may want to define the headers yourself.

Adding code like the example below in a plugin (or [mu-plugin](/mu-plugin)) can help add security headers for WordPress sites on Pantheon, or any other Nginx-based platform. Do not add this to your theme's `functions.php` file, as it will not be executed for calls to the REST API.

The code below is only an example to get you started. You'll need to modify it to match your needs, especially the Content Security Policy. Tools like [SecurityHeaders.com](https://securityheaders.com) can help to check your security headers, and link to additional information on how to improve your security header profile.

```php
function additional_securityheaders( $headers ) {
  if ( ! is_admin() ) {
    $headers['Referrer-Policy']             = 'no-referrer-when-downgrade'; //This is the default value, the same as if it were not set.
    $headers['X-Content-Type-Options']      = 'nosniff';
    $headers['X-XSS-Protection']            = '1; mode=block';
    $headers['Permissions-Policy']          = 'geolocation=(self "https://example.com") microphone=() camera=()';
    $headers['Content-Security-Policy']     = 'script-src "self"';
    $headers['X-Frame-Options']             = 'SAMEORIGIN';
  }

  return $headers;
}
add_filter( 'wp_headers', 'additional_securityheaders' );
```

**Note:** Because the headers are applied by PHP code when WordPress is invoked, they will not be added when directly accessing assets like `https://example.com/wp-content/uploads/2020/01/sample.json`.
