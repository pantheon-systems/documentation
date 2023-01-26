---
title: WordPress Plugins and Themes with Known Issues
subtitle: S Plugins
description: A list of WordPress plugins beginning with S that are not supported and/or require workarounds.
cms: "WordPress"
tags: [plugins, themes, code]
contributors: [aleksandrkorolyov, jocastaneda, carl-alberto]
categories: [help]
newcms: [wordpress]
audience: [development]
product: [--]
integration: [--]
reviewed: "2022-03-24"
contenttype: [guide]
layout: guide
showtoc: true
permalink: docs/guides/wp-plugins-themes-known-issues/directory/s-plugins
anchorid: s-plugins
---

## SendGrid Subscription Widget

<ReviewDate date="2021-11-04" />

<Alert title="Note"  type="info" >

This section exists for reference purposes, as SendGrid for WordPress has been [deprecated](https://wordpress.org/plugins/sendgrid-email-delivery-simplified/)  as of July 13, 2021. [Support](/guides/support/contact-support/) can continue to help with platform issues, but may not be able to troubleshoot SendGrid-specific issues.

</Alert>

**Issue:** The email confirmation link sent from the [SendGrid Subscription Widget](https://wordpress.org/plugins/sendgrid-email-delivery-simplified/) goes to a redirect loop (see the [open issue on wp.org](https://wordpress.org/support/topic/email-sent-from-the-subscription-widget-goes-to-a-redirect-loop-in-pantheon)). The link created uses a URL `GET` parameter `__sg_api`, which has double underscores. The platform strips this type of parameter to improve [caching performance](/pantheon_stripped/#which-query-parameters-are-optimized).

**Solution:** Manually change the the parameter `__sg_api` to any variable (like `sg_api`) without double underscores as prefix in the following lines of `sendgrid-email-delivery-simplified/lib/class-sendgrid-mc-optin.php`:

- Line 25:  `$vars[] = '__sg_api';`
- Line 40:  `if( isset( $wp->query_vars['__sg_api'] ) )`
- Line 146: `$confirmation_link = site_url() . '/?__sg_api=1&token=' . $token;`

<Alert title="Warning" type="danger">

This workaround may potentially break again with the next plugin update, and you will need to manually reapply the modification.

</Alert>

___

## Site24x7

<ReviewDate date="2021-10-20" />

**Issue:** [Site24x7](https://wordpress.org/plugins/site24x7-rum/) is an uptime monitor that pings a site to observe stability and various functions. Each time a site is pinged, Site24x7 uses a unique user agent string or various IP addresses, which may falsely inflate [traffic metrics](/guides/account-mgmt/traffic) with Pantheon.

**Solution:** Consider using [New Relic](/guides/new-relic) or Pingdom (/guides/pingdom-uptime-check) to monitor uptime. Pantheon maintains partnerships with these services and does not meter or bill requests from their user agents.

___

## Slider Revolution

<ReviewDate date="2020-10-01" />

**Issue:** [Slider Revolution](https://www.sliderrevolution.com/) video backgrounds will not auto-play when added to a layer, and throws this error in the Javascript console:

```js
Failed to execute 'postMessage' on 'DOMWindow': The target origin provided ('https://www.youtube.com') does not match the recipient window's origin ('https://<env>-example.pantheonsite.io').
```

The plugin generates the site's URL using `$_SERVER['SERVER_NAME']` instead of `$_SERVER['HTTP_HOST']`. Due to the dynamic nature of Pantheon's cloud architecture, [`$_SERVER['HTTP_HOST']` is considered best practice.](/server_name-and-server_port#use-http_host-instead-of-server_name)

**Solution:** Add the following line to `wp-config.php`:

```php:title=wp-config.php
$_SERVER['SERVER_NAME'] = $_SERVER['HTTP_HOST'];
```

___

## SmartCrawl Pro

<ReviewDate date="2018-10-17" />

**Issue:** The sitemap URL linked by the [SmartCrawl Pro](https://premium.wpmudev.org/project/smartcrawl-wordpress-seo/) plugin produces a `500 Internal Server Error` on Test and Live environments. This results in a PHP error: `class not found WP_Filesystem_Direct`. See more [details about the issue](https://premium.wpmudev.org/forums/topic/smartcrawl-pro-class-wp_filesystem_direct-not-found).

**Solution:** [Define `FS_METHOD`](#define-fs_method).

Alternative plugins that have an XML sitemap feature that works well on the platform include:

- [Google Sitemap Generator](https://wordpress.org/plugins/google-sitemap-generator/)
- [Yoast](https://wordpress.org/plugins/wordpress-seo/)

___

## Smush Pro

<ReviewDate date="2022-03-24" />

**Issue:** The [Smush Pro](https://wpmudev.com/docs/wpmu-dev-plugins/smush/) plugin requires NGINX configuration for WebP image support. This results in issues with assuming write access. In some cases, there is also an issue with the image library processing using a temporary filesystem. Both scenarios are incompatible with Pantheon's platform.

**Solution:** Consider using Pantheon's [AGCDN](/guides/professional-services/advanced-global-cdn) as an alternative. AGCDN provides image optimization that saves PHP resources without the need for a plugin.

___