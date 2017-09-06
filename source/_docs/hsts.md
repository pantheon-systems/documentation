---
title: Require HTTPS with the HSTS Header
description: Enforce HTTPS communications on supported browsers using the HTTP Strict Transport Security header.
tags: [security]
---
After you have required HTTPS for all pages by adding the [necessary redirect](/docs/domains/#redirect-to-https-and-the-primary-domain), set the HTTP Strict Transport Security (HSTS) header to standardize all client connections on HTTPS and prevent use of HTTP. Not only does this help you get an A+ SSL rating from [SSL Labs](https://www.ssllabs.com/ssltest/), it will help protect your website against protocol downgrade attacks and cookie hijacking. For additional details on this header, see [HTTP Strict Transport Security Cheat Sheet](https://www.owasp.org/index.php/HTTP_Strict_Transport_Security_Cheat_Sheet) and [this solid article](https://https.cio.gov/hsts/) also provides a excellent overview.	

The HTTP Strict-Transport-Security response header (often abbreviated as HSTS) is a security feature that lets a web site tell browsers that it should only be communicated with using HTTPS, instead of using HTTP. To accomplish this, your site emits the strict-transport-security header. 

You may use a Drupal module or WordPress plugin to add the headers to your website pages, but then next you should immediately configure the strict-transport-security header attributes as are best for your site. 

There are three attributes to configure for the strict-transport-security header: max-age, includeSubDomains and preload. How you configure or include these attributes raises the rigor of the security that your HSTS effort provides. 

As an example this is the strict-transport-security header as used by the Whitehouse.gov site: 
Strict-Transport-Security: max-age=31536000;includeSubdomains;preload

HSTS strict-transport-security header settings to review:
max-age=<expire-time>
The time, in seconds, that the browser should remember that this site is only to be accessed using HTTPS. 
includeSubDomains Optional, but usually advisable
If this optional parameter is specified, this HSTS rule applies to all of your site's subdomains as well.
preload Optional, Not part of the specification
The Chrome browser security team created an “HSTS preload list”: a list of domains baked into Chrome that get Strict Transport Security enabled automatically, even for the first visit. Firefox, Safari, Opera, and Edge also incorporate Chrome’s HSTS preload list, making this feature shared across major browsers.


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
