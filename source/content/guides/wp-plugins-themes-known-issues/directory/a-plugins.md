---
title: WordPress Plugins and Themes with Known Issues
subtitle: A Plugins
description: A list of WordPress plugins beginning with A that are not supported and/or require workarounds.
tags: [plugins, themes, code]
categories: [help]
newcms: [wordpress]
audience: [development]
product: [--]
integration: [--]
reviewed: "2022-03-24"
contenttype: [guide]
layout: guide
showtoc: true
permalink: docs/guides/wp-plugins-themes-known-issues/directory/a-plugins
anchorid: a-plugins
---

## AdThrive Ads

<ReviewDate date="2022-10-10" />

[AdThrive Ads](https://wordpress.org/support/plugin/adthrive-ads/) is an ad provider for bloggers. AdThrive Ads is not compatible with the Pantheon platform because the plugin assumes write access and is also incompatible with:

- Git deployments
- Docker
- Kubernetes

There is no solution for the compatibility issues with this plugin.

## All-in-One WP Migration

<ReviewDate date="2020-11-30" />

**Issue:** [All-in-One WP Migration](https://wordpress.org/plugins/all-in-one-wp-migration/) attempts to store all of the environment's code, database, and files in version control. This is too much for git to handle, and will cause all deployments to fail.

<Alert title="Warning" type="danger">

There is a very strong possibility this plugin will break the site's workflows, leaving you unable to deploy for a minimum of 24 hours.

</Alert>

**Solution:** Use the platforms automated backups [from the Site Dashboard](/backups).

___

## AMP for WP – Accelerated Mobile Pages

<ReviewDate date="2019-12-5" />

**Issue:** With the [AMP for WP – Accelerated Mobile Pages](https://wordpress.org/plugins/accelerated-mobile-pages/) plugin, enabling the Mobile Redirection feature within AMP for WP sends a session cookie which conflicts with platform-level page caching. See the [WordPress support forum](https://wordpress.org/support/topic/varnish-compatibility-issue-with-session-keys/) for details.

**Solution:** Disable the option for Mobile Redirection within the AMP for WP options page. Then handle mobile redirection via PHP within `wp-config.php`, for example:

```php:title=wp-config.php
if ((is_mobile())&&(strrpos($_SERVER['REQUEST_URI'],'amp') == false)) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location: https://'. $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'] .'/amp');

  // Name transaction "redirect" in New Relic for improved reporting (optional).
  if (extension_loaded('newrelic')) {
    newrelic_name_transaction("redirect");
  }
  exit();
}
function is_mobile() {
  if ( empty($_SERVER['HTTP_USER_AGENT']) ) {
          $is_mobile = false;
  }
  elseif ( strpos($_SERVER['HTTP_USER_AGENT'], 'Mobile') !== false // many mobile devices (all iPhone, iPad, etc.)
          || strpos($_SERVER['HTTP_USER_AGENT'], 'Android') !== false
          || strpos($_SERVER['HTTP_USER_AGENT'], 'Silk/') !== false
          || strpos($_SERVER['HTTP_USER_AGENT'], 'Kindle') !== false
          || strpos($_SERVER['HTTP_USER_AGENT'], 'BlackBerry') !== false
          || strpos($_SERVER['HTTP_USER_AGENT'], 'Opera Mini') !== false
          || strpos($_SERVER['HTTP_USER_AGENT'], 'Opera Mobi') !== false ) {
                  $is_mobile = true;
  }
  else {
          $is_mobile = false;
  }
  return $is_mobile;
}
```

___

## Autoptimize

<ReviewDate date="2020-02-10" />

**Issue 1:** [Autoptimize](https://wordpress.org/plugins/autoptimize/) assumes write access to the site's codebase within the `wp-content/resources` directory, which is not granted on Test and Live environments on Pantheon by design. For additional details, refer to [Using Extensions That Assume Write Access](/symlinks-assumed-write-access).

**Solution:** Configure Autoptimize to write files within the standard `wp-content/uploads` path for WordPress (`wp-content/uploads/autoptimize`) by adding the following to `wp-config.php`:

```php:title=wp-config.php
/** Changes location where Autoptimize stores optimized files */
define('AUTOPTIMIZE_CACHE_CHILD_DIR','/uploads/autoptimize/');
```

Be sure to add this configuration _above_ the comment to stop editing:

![Example of Autoptimize configuration above the stop editing comment](../../../images/autoptimize-config.png)

For additional details, see the [Autoptimize FAQ](https://wordpress.org/plugins/autoptimize/faq). An alternative solution is to [create a symbolic link](/symlinks-assumed-write-access#create-a-symbolic-link).

**Issue 2:** Autoptimize attempts to generate the file `wp-content/autoptimize_404_handler.php` upon activation, and if not present will throw a php warning.

Enabling this setting requires write access and a [location directive](https://wordpress.org/plugins/autoptimize/#%0Awhat%20does%20%E2%80%9Cenable%20404%20fallbacks%E2%80%9D%20do%3F%20why%20would%20i%20need%20this%3F%0A) not configured in platform's Nginx configuration, generating the error:

```php
Warning: file_put_contents(/code/wp-content/autoptimize_404_handler.php):
failed to open stream: Permission denied in /code/wp-content/plugins/autoptimize/classes/autoptimizeCache.php on line 642
```

**Solution:** Uncheck **Enable 404 fallbacks** in the Autoptimize settings page `wp-admin/options-general.php?page=autoptimize`.
The Pantheon Platform does not provide support for custom HTTP server configurations, so file redirects will not work. More information can be found in the [redirect files](/guides/redirect/advanced#redirect-files) section of [Advanced Redirects and Restrictions](/guides/redirect/advanced).

___
