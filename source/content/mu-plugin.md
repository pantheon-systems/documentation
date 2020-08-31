---
title: Create a WordPress MU-Plugin for Actions and Filters
description: Learn to make a boilerplate MU-plugin for actions and filters.
contributors: [alexfornuto, eabquina, carlalberto]
cms: "WordPress"
categories: [develop]
tags: [plugins]
reviewed: "2020-08-12"
---

For actions or filters you want to run even when a theme's `functions.php` isn't invoked by a request, or before plugins are loaded by WordPress, you can create a [Must-Use (**MU**) Plugin](https://codex.wordpress.org/Must_Use_Plugins).

MU-plugins are activated by default by adding a PHP file to the `wp-content/mu-plugins` directory. It affects the whole site, including all sites under a WordPress Multisite installation.

MU-plugins are loaded by PHP in alphabetical order, before normal plugins. This means API hooks added in an MU-plugin apply to all other plugins even if they run hooked-functions in the global namespace.

## Why use MU-Plugins?

While you can add code in the `wp-config.php` file for site-wide behavior, actions and filters shouldn't be added here.

If they are added above the `require_once ABSPATH . 'wp-settings.php';` statement, the WordPress site will get a Fatal PHP error because the `add_action()` and `add_filter()` functions won't be defined yet.

If they are added below the `require_once ABSPATH . 'wp-settings.php';` statement, then the entirety of WordPress has already been loaded and the actions / filters won't be applied, or would be applied last.

## Create Your MU-Plugin

1. Create a PHP file (i.e. `your-file.php`) in the `mu-plugins` folder (`code/wp-content/mu-plugins/your-file.php`).

1. Provide the plugin details for its name, description, etc.:

  ```php
  <?php
  /*
    Plugin Name: Custom Actions and Filters
    Plugin URI: https://plugin-site.example.com
    Description: Boilerplate MU-plugin for custom actions and filters to run for a site instead of setting in WP-config.php
    Version: 0.1
    Author: Pantheon
    Author URI: https://yoursite.example.com
  */
  ```

1. Add the custom functions along with the filters or action that you want to run. Use the following script as a starting point for making your own plugin:

  ```php
  <?php
  /*
    Plugin Name: Custom Actions and Filters
    Plugin URI: https://plugin-site.example.com
    Description: Boilerplate MU-plugin for custom actions and filters to run for a site instead of setting in WP-config.php
    Version: 0.1
    Author: Pantheon
    Author URI: https://yoursite.example.com
  */

  if ( isset( $_ENV['PANTHEON_ENVIRONMENT'] ) ) {
    // Actions or Filters that will only run in Pantheon.
  };

  if ( isset( $_ENV['PANTHEON_ENVIRONMENT'] ) && php_sapi_name() != 'cli' ) {
    // Add your actions or filters that you want to exclude during WP CLI execution here.
  }

  /*
   * Set $regex_path_patterns accordingly.
   *
   * We don't set this variable for you, so you must define it
   * yourself per your specific use case before the following conditional.
   *
   * For example, to exclude pages in the /news/ and /about/ path from cache, set:
   *
   *   $regex_path_patterns = array(
   *     '#^/news/?#',
   *     '#^/about/?#',
   *   );
   */

  // Loop through the patterns.
  foreach ( $regex_path_patterns as $regex_path_pattern ) {
    if ( preg_match( $regex_path_pattern, $_SERVER['REQUEST_URI'] ) ) {
      add_action( 'send_headers', 'add_header_nocache', 15 );

      // No need to continue the loop once there's a match.
      break;
    }
  }

  function add_header_nocache() {
    header('Cache-Control: no-cache, must-revalidate, max-age=0');
  }

  /* For WP REST API specific paths, we use a different approach by using the rest_post_dispatch filter */

  // wp-json paths or any custom endpoints

  $regex_json_path_patterns = array(
      '#^/wp-json/wp/v2/users?#',
      '#^/wp-json/?#'
    );

  foreach ( $regex_json_path_patterns as $regex_json_path_pattern ) {
    if ( preg_match( $regex_json_path_pattern, $_SERVER['REQUEST_URI'] ) ) {
      // Re-use the rest_post_dispatch filter in the Pantheon page cache plugin.
      add_filter( 'rest_post_dispatch', 'filter_rest_post_dispatch_send_cache_control', 12, 2 );
      filter_rest_post_dispatch_send_cache_control( $response, $server );
      break;
    }
  }

  // Re-define the send_header value with any custom Cache-Control header.
  function filter_rest_post_dispatch_send_cache_control( $response, $server ) {
    $server->send_header( 'Cache-Control', 'no-cache, must-revalidate, max-age=0' );
    return $response;
  }
  // End of File
  ```

### Use wp_get_environment_type for Environment-specific Actions

<Partial file="wp_get_environment_type.md" />

An MU-plugin can be instructed to run or perform environment-specific actions. Use `wp_get_environment_type` to look up the current environment in a platform-neutral way.

## Example Code Snippets

Create a custom MU-plugin with actions or filters to resolve issues you may encounter with the following plugins, themes, or use cases.

### Cache Control

Set `Cache-Control: max-age=0` by hooking into `send_headers`. This will override `max-age` configured within the Pantheon Cache plugin for all matching requests:

```php
/*
 * Set $regex_path_patterns accordingly.
 *
 * We don't set this variable for you, so you must define it
 * yourself per your specific use case before the following conditional.
 *
 * For example, to exclude pages in the /news/ and /about/ path from cache, set:
 *
 *   $regex_path_patterns = array(
 *     '#^/news/?#',
 *     '#^/about/?#',
 *   );
 */


// Loop through the patterns.
foreach ($regex_path_patterns as $regex_path_pattern) {
  if (preg_match($regex_path_pattern, $_SERVER['REQUEST_URI'])) {
    add_action( 'send_headers', 'add_header_nocache', 15 );

    // No need to continue the loop once there's a match.
    break;
  }
}
function add_header_nocache() {
      header( 'Cache-Control: no-cache, must-revalidate, max-age=0' );
}
```

### Custom Cookies

Setting custom cookies can also be done from an MU-plugin like in the example below. Find more cookie manipulation examples at [Working with Cookies on Pantheon](/cookies).

```php
if ( isset( $_COOKIE['STYXKEY_gorp'] ) ) {

  $foo = $_COOKIE['STYXKEY_gorp'];
  // Generate varied content based on cookie value
  // Do NOT set cookies here. Set-Cookie headers do not allow the response to be cached
  if ($foo == 'ca') {
    str_replace('football', 'hockey');
  }

}
else{
  /**
  * Set local vars passed to setcookie()
  * Example:
  * @code
  * $name = 'STYXKEY_gorp';
  * $value = 'bar';
  * $expire = time()+600;
  * $path = '/foo';
  * $domain =  $_SERVER['HTTP_HOST'];
  * $secure = true;
  * $httponly = true;
  * @endcode
  **/
  setcookie( $name, $value, $expire, $path, $domain, $secure, $httponly );
}
```

### Custom Login Message

To customize the text displayed on `/wp-login.php` when accessing the site from a Platform Domain, add the following filter:

```php
add_filter( 'pantheon_wp_login_text', function() {
  return 'This is my custom login message';
});
```

You can also disable the **Return to Pantheon** button on platform domain login pages, and overwrite the default login text:

```php
if ( ! defined( 'RETURN_TO_PANTHEON_BUTTON' ) ) {
  define( 'RETURN_TO_PANTHEON_BUTTON', false );
}

add_filter( 'login_message', function() {
  return "This is the default login message being overwritten.";
});
```

Please note that overwriting `login_message` changes the text displayed on all login pages, regardless of domain used to access them.

### Exclude Plugins from Redis Cache

A page load with 2,000 Redis calls can be two full seconds of object cache transactions. If a plugin you're using is erroneously creating a huge number of cache keys, you might be able to mitigate the problem by disabling cache persistence for the plugin's group.

For example, let's say you have a custom plugin that sets the cache with:

```php
wp_cache_set( 'cache_key', 'cache_data', 'my_plugin_group' );
wp_cache_get( 'cache_key', 'my_plugin_group' );
```

You can exclude that in Redis with:

```php
wp_cache_add_non_persistent_groups( array( 'my_plugin_group' ) );
```

We can add multiple plugins to the function as well:

```php
wp_cache_add_non_persistent_groups( array( 'my_plugin_group', 'woocommerce' ) );
```

To verify, you can use the [Redis CLI](/redis#use-the-redis-command-line-client) to flush all keys and see that the related objects are no longer added to the cache:

```sql
> KEYS *woocommerce:*
1) "woocommerce:size-gallery_thumbnail"
2) "woocommerce:size-woocommerce_thumbnail"
3) "woocommerce:size-thumbnail"
4) "woocommerce:size-single"

> FLUSHALL

> KEYS *woocommerce:*
(empty list or set)
```

For more information, see [How do I disable the persistent object cache for a bad actor?](https://github.com/pantheon-systems/wp-redis#how-do-i-disable-the-persistent-object-cache-for-a-bad-actor).

### Redirects

In addition to [PHP redirects](/redirects), it's possible to add custom redirects, like path or domain specific redirects, in an MU-plugin.

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

### WP CFM Compatibility

WP CFM works on multidev but a Must Use plugin needs to be setuped with this sample code.

```php
add_filter( 'wpcfm_multi_env', function( $pantheon_envs ) {
	if ( !( in_array( PANTHEON_ENVIRONMENT, $pantheon_envs ) ) ) {
		$pantheon_envs[] = PANTHEON_ENVIRONMENT;
	}
return $pantheon_envs;
} );

add_filter( 'wpcfm_current_env', function( $pantheon_env ) {
    return PANTHEON_ENVIRONMENT;
} );
```

### WP REST API (`wp-json`) Endpoints Cache

For WP REST API endpoints, we can use the `rest_post_dispatch` filter and create a specific function to apply specific headers for each path or endpoint.

```php
/* For WP REST API specific paths, we use a different approach by using the rest_post_dispatch filter */

// wp-json paths or any custom endpoints

$regex_json_path_patterns = array(
    '#^/wp-json/wp/v2/users?#',
    '#^/wp-json/?#'
);

foreach ($regex_json_path_patterns as $regex_json_path_pattern) {
  if (preg_match($regex_json_path_pattern, $_SERVER['REQUEST_URI'])) {
    // re-use the rest_post_dispatch filter in the Pantheon page cache plugin
    add_filter( 'rest_post_dispatch', 'filter_rest_post_dispatch_send_cache_control', 12, 2 );
    // Re-define the send_header value with any custom Cache-Control header
    function filter_rest_post_dispatch_send_cache_control( $response, $server ) {
      $server->send_header( 'Cache-Control', 'no-cache, must-revalidate, max-age=0' );
      return $response;
    }
    break;
  }
}
```

## See Also

This page intends to introduce the concept of using an MU-plugin for applying actions or filters for a site. For Site-specific or Environment-specific context, see these other documentation pages:

- [Configuring wp-config.php](/wp-config-php)
- [Environment-Specific Configuration for WordPress Sites](/environment-specific-config)
- [WordPress Plugins and Themes with Known Issues](/plugins-known-issues)
