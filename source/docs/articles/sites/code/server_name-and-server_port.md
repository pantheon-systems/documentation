---
title: SERVER_NAME and SERVER_PORT on Pantheon
description: Learn how to work around SERVER_NAME and SERVER_PORT variables in your environment configuration.
category:
  - developing
---
There's code out there that relies on `$_SERVER['SERVER_NAME']` and sometimes `$_SERVER['SERVER_PORT']` to construct URLs, either to "call itself" or to create URLs that are passed to third parties and expect to be routed back. This doesn't work well on Pantheon because the environmental data will be for ephemeral container data.

In general, you don't want your code to rely on this, but some extensions (themes, modules, plugins) give you no choice. In that case, you will need to modify the `$_SERVER` variable in your `settings.php` (Drupal) or `wp-config.php` (WordPress) file to ensure the right values are present.

## Use HTTP_HOST Instead of SERVER_NAME
`HTTP_HOST` is generated dynamically based on the current request, while `SERVER_NAME` is static. If the `$_SERVER`variable is set to `'SERVER_NAME'`, the URL generated for a request will be something similar to http://endpoint05ccd237.chios.panth.io instead of the intended http://yourdomain.com.

Adding the following code will pass the correct value when `'SERVER_NAME'` is used:
```
$_SERVER['SERVER_NAME'] = $_SERVER['HTTP_HOST'];
```
While this fix does correct symptoms such as undesirable URLs, it is recommended that all instances of `'SERVER_NAME'` be replaced with `'HTTP_HOST'` directly (e.g. [`WP_HOME` and `WP_SITE`](https://github.com/pantheon-systems/WordPress/blob/master/wp-config.php#L69-L71) for WordPress).

**Note:** `$_ENV will` also be around for command-line uses. `$_SERVER` is only set up when handling a web initiated request.
## Set SERVER_PORT Correctly
The following is as an example of how to successfully assign a port value for nginx:
```
if (isset($_SERVER['PANTHEON_ENVIRONMENT'])) {
  if (isset($_SERVER['HTTP_X_SSL']) && $_SERVER['HTTP_X_SSL'] != 'ON') {
    $_SERVER['SERVER_PORT'] = 443;
  }
  else {
    $_SERVER['SERVER_PORT'] = 80;
  }
}
```

## Known Plugins/Modules Using SERVER_NAME
- [Simple Share Buttons](https://simplesharebuttons.com/plus/)
- [WP Super Cache](https://wordpress.org/support/plugin/wp-super-cache)
