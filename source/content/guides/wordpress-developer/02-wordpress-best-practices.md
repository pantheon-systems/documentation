---
title: WordPress Developer's Guide
subtitle: WordPress Best Practices
description: A list of best practices for developing WordPress sites on Pantheon.
contenttype: [guide]
innav: [false]
categories: [cms]
cms: [wordpress]
audience: [development]
product: [--]
integration: [--]
tags: [workflow, security, composer]
reviewed: "2022-05-16"
showtoc: true
permalink: docs/guides/wordpress-developer/wordpress-best-practices
---

This section provides suggestions for best practices to develop and manage WordPress sites on the Pantheon platform.

## Development

- Use an [IDE](https://en.wikipedia.org/wiki/Comparison_of_integrated_development_environments#PHP), or a text editor designed for development like [Atom](https://atom.io/), [Sublime Text](https://www.sublimetext.com/), [Brackets](https://github.com/adobe/brackets/), [CodeLobster](https://codelobster.com/), or [Visual Studio Code](/guides/local-development/visual-studio-code).

- Do not modify core WordPress files. Core file modification frequently causes unintended issues, and can [prevent you from updating your site regularly](/core-updates#apply-upstream-updates-manually-from-the-command-line-to-resolve-merge-conflicts).  Create a custom or [Must Use](/guides/wordpress-configurations/mu-plugin) plugin, which adheres to the [WP.org Plugin best practices](https://developer.wordpress.org/plugins/the-basics/best-practices/) if you need to modify any WP functionality.

- Use [Object Cache Pro](/object-cache/wordpress). Redis is an open-source, networked, in-memory, key-value data store that can be used as a drop-in caching backend for your WordPress site. Redis on Pantheon makes it easy to cache a large number database queries in WordPress.

- Use [wp-cfm](/guides/wordpress-configurations/wp-cfm). wp-cfm lets you store settings from the `wp_options` table in Git and pull it into the database. This helps with the option-heavy nature of WordPress site configurations. This is true for all WordPress sites, but especially helpful on Pantheon where you have at least three environments you will need to reconfigure every time.

- Use [Grunt](https://gruntjs.com) or [Gulp](https://github.com/gulpjs/gulp) to aggregate JS/CSS on your local development environment rather than relying on the server to do it for you. This helps speed up your workflow by minimizing redundant tasks.

- Follow the [WordPress Coding Standards](https://make.wordpress.org/core/handbook/best-practices/coding-standards/) when developing custom plugins or themes for efficiency and ease of collaboration.

## Plugins

- Add [Composer](/guides/composer) and pull your WordPress plugins from [wpackagist.org](https://wpackagist.org/). WordPress Packagist mirrors the WordPress.org plugin repository and adds a `composer.json` file to your files. This makes future debugging simpler if you need to switch between multiple plugin or WordPress versions to see what caused something to break. Running `composer install` on the environments is not supported (just as Git submodules are not supported). You must commit the dependencies that Composer downloads on Pantheon to workaround this even though [committing Composer dependencies is generally not recommended](https://getcomposer.org/doc/faqs/should-i-commit-the-dependencies-in-my-vendor-directory.md).

- If you have a custom plugin that retrieves a specific post (or posts), use the `get_post()` function instead of using `wp_query()`. `wp_query` can be useful in some situations, however, the [get_post](https://developer.wordpress.org/reference/functions/get_post/) function is built specifically to retrieve a WordPress Post object.

- Don't use plugins that create files vital to your site logic that you aren't willing to track in Git. Sometimes these files are dumped in uploads, sometimes not, and you'll likely have difficulty trying to figure it out later. Many plugins for uploads rely on [`.htaccess` files](/guides/redirect#htaccess) which Pantheon does not support.

## Themes

- Use a simple PHP `include()` instead of WordPress's [get_template_part()](https://codex.wordpress.org/Function_Reference/get_template_part) in your theme. The overhead is heavy if your use case is simply adding in another sub-template file. For example:

  ```php
  <?php get_template_part('content', 'sidebar'); ?>
  <?php include('content-sidebar.php'); ?>
  ```

### Manage License Keys for Themes or Plugins

There are many plugins and themes in WordPress that require license keys. It is best practice to associate the license key in a domain. You can easily update and deploy the updates to Test and Live environments because Dev and Multidev are the only writable environments in SFTP mode.

## Testing

- Run [Launch Check](/guides/wordpress-pantheon/wordpress-launch-check) to review errors and get recommendations on your site's configurations.

- Automate testing with [Behat](/guides/behat). Adding automated testing into your development workflow will help you deliver higher quality WordPress sites.

## Live

- Use HTTPS. Refer to [HTTPS on Pantheon's Global CDN](/guides/global-cdn/https) for more information.

- Verify that [Global CDN caching](/guides/global-cdn/test-global-cdn-caching) works on your site.

- Follow our [Frontend Performance](/guides/frontend-performance) guide to tune your WordPress site.

## Disable Anonymous Access to WordPress Rest API

The WordPress REST API is enabled for all users by default. You can disable the WordPress REST API for anonymous requests to improve security and avoid exposing admin users. This action improves site safety and reduces unexpected errors that can result in compromised WordPress core functionalities.

The following function ensures that anonymous access to your site's REST API is disabled and that only authenticated requests will work. You can add this code sample to a theme's `functions.php` file or to a must-use plugin:

```php
// Disable WP Users REST API for non-authenticated users (allows anyone to see username list at /wp-json/wp/v2/users)
add_filter( 'rest_authentication_errors', function( $result ) {
	if ( true === $result || is_wp_error( $result ) ) {
		return $result;
	}

	if ( ! is_user_logged_in() ) {
		return new WP_Error(
			'rest_not_logged_in',
			__( 'You are not currently logged in.' ),
			array( 'status' => 401 )
		);
	}

	return $result;
});
```

## Security Headers

Pantheon's Nginx configuration [cannot be modified](/guides/platform-considerations/platform-site-info#htaccess) to add security headers, and many solutions (including plugins) written about security headers for WordPress involve modifying the `.htaccess` file for Apache-based platforms.

There are plugins for WordPress that do not require `.htaccess` to set security headers, but header specifications may change more rapidly than the plugins can keep up with. In those cases, you may want to define the headers yourself.

You can add code like the example below in a plugin (or [mu-plugin](/guides/wordpress-configurations/mu-plugin)) to help add security headers for WordPress sites on Pantheon, or any other Nginx-based platform. Do not add this to your theme's `functions.php` file, as it will not be executed for calls to the REST API.

The code below is only an example to get you started. You must modify the code to match your needs, especially the Content Security Policy. Tools like [SecurityHeaders.com](https://securityheaders.com) can help to check your security headers, and link to additional information on how to improve your security header profile.

```php
function additional_securityheaders( $headers ) {
  if ( ! is_admin() ) {
    $headers['Referrer-Policy']             = 'no-referrer-when-downgrade'; //This is the default value, the same as if it were not set.
    $headers['X-Content-Type-Options']      = 'nosniff';
    $headers['X-XSS-Protection']            = '1; mode=block';
    $headers['Permissions-Policy']          = 'geolocation=(self "https://example.com") microphone=() camera=()';
    $headers['Content-Security-Policy']     = "script-src 'self'";
    $headers['X-Frame-Options']             = 'SAMEORIGIN';
  }

  return $headers;
}
add_filter( 'wp_headers', 'additional_securityheaders' );
```

**Note:** The headers are applied by PHP code when WordPress is invoked. This means that headers will not be added when directly accessing assets like `https://example.com/wp-content/uploads/2020/01/sample.json`.

## More Resources

- [Secure Development on Pantheon](/guides/secure-development)
- [Automate Testing with Behat](/guides/behat)
- [Manage Custom Code for WordPress with Plugins](/guides/wordpress-configurations/wordpress-custom-code)
