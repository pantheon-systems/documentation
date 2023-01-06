---
title: WordPress Plugins and Themes with Known Issues
subtitle: "C" Plugins
description: A list of WordPress plugins beginning with "C" that are not supported and/or require workarounds.
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
permalink: docs/guides/wp-plugins-themes-known-issues/c-plugins
anchorid: c-plugins
---


## Caching Plugins

This includes but is not limited to:

- [Batcache](https://wordpress.org/plugins/batcache/)
- [W3 Total Cache](https://wordpress.org/plugins/w3-total-cache/)
- [WP Super Cache](https://wordpress.org/plugins/wp-super-cache/).

**Issue:** Conflicts with platform-level page caching.

**Solution:** See [Caching: Advanced Topics](/caching-advanced-topics) for details on how to bypass the platform page cache.

___

## Coming Soon

<ReviewDate date="2018-10-03" />

**Issue:** The [Coming Soon](https://wordpress.org/plugins/coming-soon/) plugin's `Maintenance mode` gives the `ERR_TOO_MANY_REDIRECTS` error in the frontend. This plugin returns the error `503 Header status - Service Temporarily Unavailable` which creates a redirect loop. Please see [this issue](https://wordpress.org/support/topic/plugin-give-err_too_many_redirects-in-pantheon-hosting/) for more details regarding the error.

**Solution:** This plugin only works in the `Coming Soon Mode` on Pantheon. You need to add content to the **Page Settings** > **Message**, so the Coming Soon page won't appear as a blank page.

Alternatively, if you don't want your site to be crawled by search engines, you can lock it via the platform and you can use a [custom lock page](/guides/secure-development/security-tool#customize-lock-page).

___

## Contact Form 7

<ReviewDate date="2021-08-21" />

**Issue 1:** The [Contact Form 7](https://wordpress.org/plugins/contact-form-7/) plugin relies on `$_SERVER['SERVER_NAME']` and `$_SERVER['SERVER_PORT']`, which pass static values subject to change over time during routine platform maintenance.

**Solution:** Add the following to `wp-config.php`:

```php:title=wp-config.php
$_SERVER['SERVER_NAME'] = $_SERVER['HTTP_HOST'];

if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
  if (isset($_SERVER['HTTP_USER_AGENT_HTTPS']) && $_SERVER['HTTP_USER_AGENT_HTTPS'] === 'ON') {
    $_SERVER['SERVER_PORT'] = 443;
  }
  else {
    $_SERVER['SERVER_PORT'] = 80;
  }
}
```

For more details, see [SERVER_NAME and SERVER_PORT on Pantheon](/server_name-and-server_port).

**Issue 2:** In order to attach or upload files, local file attachments set in the admin panel cannot come from the `uploads` folder. Therefore, you must direct attachments to a temporary folder.


**Solution:** You can customize the upload path for the temporary folder using the following:

`define( 'WPCF7_UPLOADS_TMP_DIR',  WP_CONTENT_DIR . '/uploads/wpcf7_uploads' );`

Please note that the temporary folder needs to reside in a folder that can be accessed by Dev, Test, Live, or whichever [Multidev](/guides/multidev) you are using.

At this time, this setting alone does not resolve the issue. An issue has been submitted by the community and is being worked on [here](https://wordpress.org/support/topic/attached-files-are-not-sent-anymore/).

The suggested temporary workaround is to comment out the following code in your `/contact-form-7/includes/mail.php` file:
```php
# Comment out the following code:
if ( ! wpcf7_is_file_path_in_content_dir( $path ) ) {
  if ( WP_DEBUG ) {
    trigger_error(
      sprintf(
        /* translators: %s: Attachment file path. */
        __( 'Failed to attach a file. %s is not in the allowed directory.', 'contact-form-7' ),
        $path
      ),
      E_USER_NOTICE
    );
  }
  return false;
}
```

___

## Constant Contact Forms

<ReviewDate date="2018-08-24" />

**Issue:** The [Constant Contact Forms](https://wordpress.org/plugins/constant-contact-forms/) plugin adds dependencies using Composer and provides a .gitignore file which prevents these dependencies from being picked up by Git. This leads to problematic deployments as not all code moves forward to Test and Live.

**Solution:** Remove .gitignore files from the `constant-contact-forms` and `constant-contact-forms/vendor/psr/log` directories.

___
