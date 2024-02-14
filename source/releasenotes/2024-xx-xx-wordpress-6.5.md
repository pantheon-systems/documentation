---
title: WordPress 6.5 (release name) Release
published_date: "2024-xx-xx"
categories: [wordpress]
---

The latest version of WordPress, [6.5 (release name)](https://wordpress.org/news/2024/xx/xx/wordpress-6-5/), became available on Pantheon as of Month XX, 2024.

<h3>Highlights</h3>

One notable addition to WordPress 6.5 is the new [Font Library](). This feature allows you to upload fonts to your WordPress site or install any of the fonts available from Google's font library.

By default, WordPress will store these fonts into the `wp-content/fonts` directory. On Pantheon, this directory is not writeable on live sites. We have added a feature to our [Pantheon MU Plugin](https://github.com/pantheon-systems/pantheon-mu-plugin) to store those fonts in a writeable `wp-content/uploads/fonts/` directory, so that you can use the feature without any issues after updating your sites to 6.5.

If you would like to restore the original behavior and commit fonts to your site repository, you can use the following filter:

```php
add_filter( 'pantheon_modify_fonts_dir', '__return_false' );
```