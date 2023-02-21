---
title: WordPress Plugins and Themes with Known Issues
subtitle: P Plugins
description: A list of WordPress plugins beginning with P that are not supported and/or require workarounds.
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
permalink: docs/guides/wp-plugins-themes-known-issues/directory/p-plugins
anchorid: p-plugins
---

## Popup Builder – Responsive WordPress Pop up – Subscription & Newsletter

<ReviewDate date="2019-12-06" />

**Issue:** The [Popup Builder](https://wordpress.org/plugins/popup-builder/) plugin stores full file paths to the options table, which breaks across multiple application containers.

**Solution:** A [user patch](https://gist.github.com/kshaner/7fcbc7e3e967c5694fd38638bff1cc17/revisions) has been [submitted](https://wordpress.org/support/topic/absolute-path-causes-issues-on-environments-with-multiple-containers/) to the plugin maintainers.

___

## PolyLang

<ReviewDate date="2019-12-19" />

**Issue:** The [PolyLang](https://wordpress.org/plugins/polylang/) plugin adds a cache-busting cookie (ex. `pll_language=en`) for each request.

**Solution:** Define the constant `PLL_COOKIE` to false in `wp-config.php` to remove the cookie:

```php:title=wp-config.php
define('PLL_COOKIE', false)
```

The value of `PLL_COOKIE` defaults to `pll_polylang`. This defines the name of the cookie used by Polylang to store the visitor's language. When `PLL_COOKIE` is set to false, Polylang does not set any cookie. Be aware that in this case some features of the plugin may not work completely. For example, the login page will not be translated.

See the [plugin documentation](https://polylang.pro/doc/php-constants/) for more information on its PHP constants.

___

## Posts 2 Posts

<ReviewDate date="2020-12-10" />

**Issue:** [Posts 2 Posts](https://wordpress.org/plugins/posts-to-posts/) can have incompatible index values for `meta_key` on database tables when installed on a site imported from a host using [3-byte character sets](/guides/guided/troubleshooting#maximum-index-size), resulting in the following error on import:

```none
Index column size too large. The maximum column size is 767 bytes
```

**Solution:** You can apply [this patch](https://gist.github.com/rachelwhitton/a348b3aff2aabf867dccd8188bcddb12) to ensure new tables created by the plugin use the supported `meta_key(191)` index value. You can fix existing tables via the MySQL commandline, for example:

```sql
ALTER TABLE wp_18_p2pmeta DROP INDEX meta_key, ADD INDEX meta_key(meta_key(191));
ALTER TABLE wp_29_p2pmeta DROP INDEX meta_key, ADD INDEX meta_key(meta_key(191));
ALTER TABLE wp_30_p2pmeta DROP INDEX meta_key, ADD INDEX meta_key(meta_key(191));
ALTER TABLE wp_31_p2pmeta DROP INDEX meta_key, ADD INDEX meta_key(meta_key(191));
ALTER TABLE wp_33_p2pmeta DROP INDEX meta_key, ADD INDEX meta_key(meta_key(191));
```

___