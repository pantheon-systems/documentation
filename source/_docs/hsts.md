---
title: Require HTTPS with the HSTS Header
description: Enforce HTTPS communications on supported browsers using the HTTP Strict Transport Security header.
tags: [security]
---
Set the HTTP Strict Transport Security (HSTS) header to send all communications over HTTPS and prevent use of HTTP. Not only does this help you get an A+ SSL rating from [SSL Labs](https://www.ssllabs.com/ssltest/), it will help protect your website against protocol downgrade attacks and cookie hijacking. For additional details on this header, see [HTTP Strict Transport Security Cheat Sheet](https://www.owasp.org/index.php/HTTP_Strict_Transport_Security_Cheat_Sheet).		

## WordPress
1. Install and activate the [LH HSTS](https://wordpress.org/plugins/lh-hsts/) plugin using the WordPress Dashboard (`/wp-admin/plugin-install.php?tab=search&s=lh+hsts`) or with [Terminus](/docs/terminus):

  ```bash
  terminus remote:wp <site>.<env> -- plugin install lh-hsts --activate
  ```

Once enabled, the following header will be sent in responses:

```http
Strict-Transport-Security: max-age=15984000; includeSubDomains; preload
```

## Drupal 8
1. Install the [HTTP Strict Transport Security](https://drupal.org/project/hsts) module using the [Drupal interface](https://www.drupal.org/docs/8/extending-drupal-8/installing-modules) or with [Terminus](/docs/terminus):

  ```bash
  terminus remote:drush <site>.<env> -- pm-enable hsts --yes
  ```    

2. Visit the module configuration page (`/admin/config/system/hsts`).
3. Check the **Enable HTTP Strict Transport Security** checkbox, set **Max Age** to at least **1 year** and click **Save Configuration**.

Once installed and configured, the following header will be sent in responses:

```http
strict-transport-security: max-age=31536000
```


## Drupal 7

1. Install the [HTTP Strict Transport Security](https://drupal.org/project/hsts) module using the [Drupal interface](https://www.drupal.org/docs/7/extending-drupal/installing-modules) or with [Terminus](/docs/terminus):

  ```bash
  terminus remote:drush <site>.<env> -- pm-enable hsts --yes
  ```

2. Visit the module configuration page (`/admin/config/security/hsts`).
3. Check the **Enable HTTP Strict Transport Security** checkbox, set **Max Age** to **15552000** and click **Save Configuration**.

Once installed and configured, the following header will be sent in responses:

```http
strict-transport-security: max-age=15552000
```
