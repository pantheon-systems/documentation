---
title: SERVER_NAME and SERVER_PORT on Pantheon
description: Learn how to work around SERVER_NAME and SERVER_PORT variables in your Pantheon Website Management Platform environment configuration.
tags: [site]
reviewed: "2025-02-14"
contenttype: [doc]
innav: [true]
categories: [config]
cms: [drupal, wordpress]
audience: [development]
product: [--]
integration: [--]
---

Some code relies on `$_SERVER['SERVER_NAME']` and `$_SERVER['SERVER_PORT']` to construct URLs, either to "call itself" or to create URLs that are passed to third parties and expect to be routed back. This doesn't work well on Pantheon because the environmental data will be for ephemeral container data.

In general, you don't want your code to rely on this, but some extensions (themes, modules, plugins) give you no choice. In that case, you will need to modify the `$_SERVER` variable in your `settings.php` (Drupal) or `wp-config.php` (WordPress) file to ensure the right values are present.

## Use PANTHEON_HOSTNAME Instead of SERVER_NAME

`PANTHEON_HOSTNAME` is added in `wp-config-pantheon.php` and constructed from `HTTP_HOST` (if available) or the Pantheon environment if `HTTP_HOST` is unavailable (e.g. in WP-CLI). If the `$_SERVER`variable is set to `'SERVER_NAME'`, the URL generated for a request will be something similar to `https://endpoint05ccd237.chios.panth.io` instead of the intended `https://yourdomain.com`.

Adding the following code will pass the correct value when `'SERVER_NAME'` is used:

```php
$_SERVER['SERVER_NAME'] = PANTHEON_HOSTNAME;
```

`PANTHEON_HOSTNAME` can be overridden by defining the constant manually in your `wp-config.php` file before the `wp-config-pantheon.php` file is required as noted in the [`wp-config.php` documentation](/guides/php/wp-config-php#how-can-i-override-the-default-pantheon_hostname-value).

While this fix does correct symptoms such as undesirable URLs, we recommended replacing all instances of `'SERVER_NAME'` with `'HTTP_HOST'` directly (e.g. [`WP_HOME` and `WP_SITE`](https://github.com/pantheon-systems/WordPress/blob/default/wp-config-pantheon.php#L52) for WordPress).

<Alert title="Note" type="info">

`$_ENV` will also be around for command-line uses. `$_SERVER` is only set up when handling a web initiated request.

</Alert>

## Set SERVER_PORT Correctly

Certain applications (like SimpleSAML) require specific port values to be set at the web server level, before our GlobalCDN. Use the snippet below to assign port value `443` for nginx when the headers specify HTTPS:

```php
if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
  if (isset($_SERVER['HTTP_USER_AGENT_HTTPS']) && $_SERVER['HTTP_USER_AGENT_HTTPS'] === 'ON') {
    $_SERVER['SERVER_PORT'] = 443;
  }
  else {
    $_SERVER['SERVER_PORT'] = 80;
  }
}
```

## More Resources

- [Advanced Redirects and Restrictions](/guides/redirect/advanced)
- [Configuring Settings.php](/guides/php/settings-php)
- [Configuring wp-config.php](/guides/php/wp-config-php)
- [WordPress Known Issues](/wordpress-known-issues)
- [Reading Pantheon Environment Configuration](/guides/environment-configuration/read-environment-config)
