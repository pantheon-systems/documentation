---
title: WordPress Plugins and Themes with Known Issues
subtitle: Y Plugins
description: A list of WordPress plugins beginning with Y that are not supported and/or require workarounds.
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
permalink: docs/guides/wp-plugins-themes-known-issues/directory/y-plugins
anchorid: y-plugins
---

## YITH WooCommerce Request a Quote

<ReviewDate date="2022-04-8" />

**Issue:** [YITH WooCommerce Request a Quote](https://yithemes.com/themes/plugins/yith-woocommerce-request-a-quote/) uses the MPFD library which assumes write access to the site's codebase within the `wp-content/plugins` directory. This is applicable to the caching of PDFs, which is not granted on Test and Live environments on Pantheon. For additional details, refer to [Using Extensions That Assume Write Access](/symlinks-assumed-write-access).

**Solution:**  Change the location where the plugin stores the PDF cache. Configure YITH WooCommerce Request a Quote to write files within the `wp-content/uploads` path for WordPress (`wp-content/uploads/ywraq_mpdf_tmp`) by adding the following code sample to `functions.php`:

```php:title=wp-config.php
/** Changes location where YITH WooCommerce Request a Quote stores PDF cache */
add_filter( 'ywraq_mpdf_args', 'ywraq_mpdf_change_tmp_dir', 20, 1 );
if ( ! function_exists( 'ywraq_mpdf_change_tmp_dir' ) ) {
   function ywraq_mpdf_change_tmp_dir( $args ) {
      $upload_dir      = wp_upload_dir();
      $upload_dir      = $upload_dir['basedir'];
      $args['tempDir'] = $upload_dir . '/ywraq_mpdf_tmp/';

      return $args;
   }
}
```
___
## Yoast SEO

<ReviewDate date="2018-06-12" />

**Issue:** The redirects for the [Yoast SEO](https://wordpress.org/plugins/wordpress-seo/) plugin setting will detect two options for redirect methods, "PHP", and "Web Server". The Web Server option expects write access to the `nginx.conf` file, which is not writable on Pantheon.

**Solution:** Only use the "PHP" redirect method.

___
## Yoast Indexables

<ReviewDate date="2022-06-14" />

**Issue:** [Yoast Indexables](https://yoast.com/innovations/indexables/) can cause performance issues on large sites. Sites with 100,000+ posts might find that indexing the table with `wp yoast index` will time out. Sites might also see slow load times in both the frontend and wp-admin areas due to queries on the `wp_yoast_indexables` table.

**Solution:** [Disable saving data](https://developer.yoast.com/customization/yoast-seo/filters/filtering-yoast-seo-indexables/#disabling-indexables) to the `wp_yoast_indexables` table to improve wp-admin performance. However, if you have 1,000,000+ posts you might see extremely poor performance on the frontend with indexables disabled. Use the code below to disable data saving for Yoast indexables.

```php:title=plugin.php
/** Tell Yoast not to save indexable data to the wp_yoast_indexables table. */
add_filter( 'Yoast\WP\SEO\should_index_indexables', '__return_false' );
```

Pantheon's [Professional Services](/guides/professional-services) team has tooling available to help index large sites. Reach out to your Customer Success Manager to get more information about tooling.

___

## YotuWP Easy YouTube Embed

<ReviewDate date="2019-11-27" />

**Issue:** The [YotuWP Easy YouTube Embed](https://wordpress.org/plugins/yotuwp-easy-youtube-embed/) plugin asks for SFTP credentials after installation.

**Solution:** [Define `FS_METHOD`](#define-fs_method).

___