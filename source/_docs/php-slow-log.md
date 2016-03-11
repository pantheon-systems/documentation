---
title: PHP Slow Log
description: Improve the stability of your Drupal or WordPress site using PHP Slow Log and PHP FPM Error Log to identify serious performance issues.
categories:
- debugging
keywords: performance, slow, slow performance, poor performance, debug, troubleshoot slow site, slow sites, troubleshoot performance, php error, php errors, watchdog, database query, database queries, php slow log, php fpm error log, fpm error log, php log, php execution, execute php, caching, cache, drupal performance, wordpress performance
---
One of the key ways to find issues on your website is to check your PHP logs. This article instructs you on how to use your PHP slow log and PHP FPM error logs to find performance issues and PHP errors on Pantheon sites.

## Before You Begin

Make sure that you have:

- An SFTP command line interface (CLI)
- A working knowledge of PHP

## Download the PHP Slow Log and PHP FPM Error Log via SFTP

1. Add yourself to the site's team membership.
2. Get the SFTP connection information for the environment (Test, Dev, Live, or a Multidev) from the site's Dashboard.
3. Open a command line prompt and paste the SFTP connection information.
4. Navigate to the Logs directory, and use a `get` command to download the PHP slow log to your local machine for analysis.
```php
> $ sftp -o Port=2222 live.91f33beg-d11b-4020a-0005e0-07ca0f4ce7bz@appserver.live.91f33beg-d11b-4020a-0005e0-07ca0f4ce7bz.drush.in
> live.91fd3bea-d11b-401a-85e0-0@appserver.live.91f33beg-d11b-4020a-0005e0-07ca0f4ce7bz.drush.in's password:
> live.91fd3bea-d11b-401a-85e0-0@appserver.live.91f33beg-d11b-4020a-0005e0-07ca0f4ce7bz.drush.in's password:
> Connected to appserver.live.91f33beg-d11b-4020a-0005e0-07ca0f4ce7bz.drush.in.  
> sftp> cd logs  
> sftp> ls -l  
> -rw-r--r--    1 16193    16193      153146 Dec 15 22:34 newrelic.log  
> -rw-r--r--    1 16193    16193    55123460 Dec 15 22:59 nginx-access.log  
> -rw-r--r--    1 16193    16193     3479688 Dec 09 08:07 nginx-access.log-20141209.gz  
> -rw-r--r--    1 16193    16193     5524355 Dec 10 08:07 nginx-access.log-20141210.gz  
> -rw-r--r--    1 16193    16193     5602638 Dec 11 08:06 nginx-access.log-20141211.gz  
> -rw-r--r--    1 16193    16193     6033991 Dec 12 08:07 nginx-access.log-20141212.gz  
> -rw-r--r--    1 16193    16193     5793730 Dec 13 08:07 nginx-access.log-20141213.gz  
> -rw-r--r--    1 16193    16193     4688934 Dec 14 08:07 nginx-access.log-20141214.gz  
> -rw-r--r--    1 16193    16193     5867636 Dec 15 08:07 nginx-access.log-20141215.gz  
> -rw-r--r--    1 16193    16193        3499 Dec 15 22:46 nginx-error.log  
> -rw-r--r--    1 16193    16193     1126685 Dec 14 08:07 nginx-error.log-20141214  
> -rw-r--r--    1 16193    16193        5017 Dec 15 11:52 php-error.log  
> -rw-------    1 16193    16193      642388 Dec 15 22:55 php-fpm-error.log  
> -rw-------    1 16193    16193     1067358 Dec 12 20:07 php-fpm-error.log-20141212  
> -rw-------    1 16193    16193     7209576 Dec 15 22:55 php-slow.log  
> sftp> get php-slow.log  
> Fetching /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/logs/php-slow.log to php-slow.log  
> /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/logs/php-slow.log 100% 7041KB 370.6KB/s   00:19  
> sftp> get php-fpm-error.log  
> Fetching /srv/bindings/b6126cf3069a4ba5983f3e9eaf35d627/logs/php-fpm-error.log to php-fpm-error.log  
> /srv/bindings/b6126cf3069a4ba5983f3e9eaf35d627/logs/php-fpm-error.log                                                                              100%  717KB 238.9KB/s   00:03  
> sftp> exit  
> $
```

## Analyze the PHP Slow Log

Look for custom modules or theme files (template.php file, &ast;.tpl.php files, etc.). This trace has both a custom Feature module (/sites/all/modules/features/tdm_community.module, field_get_items() function) and a .tpl file (/sites/all/themes/themename/templates/page.tpl.php, render() function).

```php
> 08-Dec-2014 19:04:01]  [pool www] pid 47289  
> script_filename = /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/index.php
> [0x000000000328e9e8] field_valid_language() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/modules/field/field.multilingual.inc:269  
> [0x000000000328e7d0] field_language() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/modules/field/field.module:925
> [0x000000000328e080] field_get_items() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/sites/all/modules/features/tdm_community/tdm_community.module:19  
> [0x000000000328c260] tdm_community_preprocess_node() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/includes/theme.inc:1125  
> [0x000000000328b310] theme() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/includes/common.inc:5952  
> [0x000000000328a3c8] drupal_render() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/includes/common.inc:5959  
> [0x0000000003289480] drupal_render() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/includes/common.inc:5959  
> [0x0000000003288db0] drupal_render() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/sites/all/modules/contrib/ds/modules/ds_extras/ds_extras.module:717  
> [0x0000000003286f98] theme_ds_field_minimal() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/includes/theme.inc:1161  
> [0x0000000003286048] theme() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/includes/common.inc:5952  
> [0x0000000003285100] drupal_render() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/includes/common.inc:5959  
> [0x00000000032841b8] drupal_render() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/includes/common.inc:5959  
> [0x0000000003280f48] drupal_render() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/sites/all/modules/contrib/ds/ds.module:747  
> [0x000000000327f128] ds_entity_variables() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/includes/theme.inc:1125  
> [0x000000000327e1d8] theme() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/includes/common.inc:5952  
> [0x000000000327d290] drupal_render() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/includes/common.inc:5959  
> [0x000000000327c348] drupal_render() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/includes/common.inc:5959  
> [0x000000000327b400] drupal_render() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/includes/common.inc:5959  
> [0x000000000327b2d0] drupal_render() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/includes/common.inc:6053  
> [0x000000000327a240] render() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/sites/all/themes/themename/templates/page.tpl.php:113  
```
Next, search for contributed modules or plug-ins that may be detrimental to the site. stream_wrappers.inc is showing twice at the exact same time stamp (08-Dec-2014 16:56:48) and is used to bring in external streaming media. This is often the cause of significant performance issues on sites.

```php
> [08-Dec-2014 16:56:48]  [pool www] pid 3863  
> script_filename = /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/index.php
> [0x0000000005fbc2d0] realpath() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/includes/stream_wrappers.inc:377
> [0x0000000005fbbdd0] getLocalPath()   /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/includes/stream_wrappers.inc:695
> [0x00007ffff7ee1700] url_stat() unknown:0  
> [0x0000000005fbbb60] file_exists() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/includes/common.inc:4945  
> [0x0000000005fbb058] drupal_aggregated_file_exists() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/includes/common.inc:4994  
> [0x0000000005fb92c0] drupal_build_js_cache() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/includes/common.inc:4429  
> [0x0000000005fb8d80] drupal_get_js() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/includes/theme.inc:2703  
> [0x0000000005fb6f60] template_process_html() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/includes/theme.inc:1125  
> [0x0000000005fb6010] theme() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/includes/common.inc:5967  
> [0x0000000005fb5af0] drupal_render() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/includes/common.inc:5814  
> [0x0000000005fb49b8] drupal_render_page() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/includes/common.inc:2701  
> [0x0000000005fb4600] drupal_deliver_html_page() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/includes/common.inc:2589  
> [0x0000000005fb3f50] drupal_deliver_page() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/includes/menu.inc:532  
> [0x0000000005fb3d70] menu_execute_active_handler() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/index.php:21  

> [08-Dec-2014 16:56:48]  [pool www] pid 3883  
script_filename = /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/index.php  
> [0x00000000027b95a0] realpath() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/includes/stream_wrappers.inc:377  
[0x00000000027b90a0] getLocalPath() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/includes/stream_wrappers.inc:695  
> [0x00007ffff7ee1700] url_stat() unknown:0  
> [0x00000000027b8e30] file_exists() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/includes/common.inc:4945  
> [0x00000000027b8328] drupal_aggregated_file_exists() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/includes/common.inc:4994  
> [0x00000000027b6590] drupal_build_js_cache() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/includes/common.inc:4429  
> [0x00000000027b6050] drupal_get_js() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/includes/theme.inc:2703  
> [0x00000000027b4230] template_process_html() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/includes/theme.inc:1125  
> [0x00000000027b32e0] theme() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/includes/common.inc:5967  
> [0x00000000027b2dc0] drupal_render() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/includes/common.inc:5814  
> [0x00000000027b1c88] drupal_render_page() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/includes/common.inc:2701  
> [0x00000000027b18d0] drupal_deliver_html_page() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/includes/common.inc:2589  
> [0x00000000027b1220] drupal_deliver_page() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/includes/menu.inc:532  
> [0x00000000027b1040] menu_execute_active_handler() /srv/bindings/d142301948514750b2ff39988as6f4b9158e5/code/index.php:21  
```
To get a count of how many times any given file is called in a PHP slow log, use a `grep` command. Examples:

```php
> $ grep -o 'stream_wrappers.inc' php-slow.log | wc -l  
56  
> $ grep -o 'page.tpl' php-slow.log | wc -l  
48  
> $ grep -o '.tpl' php-slow.log | wc -l  
73  
> $ grep -o 'tdm_'.&ast;.'module' php-slow.log | wc -l  
1995  
> $  
```
## Analyze the PHP FPM Error Log

Another way to find issues is to examine the PHP FPM error log that is generated by NGINX when PHP workers have issues, such as timing out and terminating. Every PHP worker has a distinct process ID that should also be logged in the PHP slow log. You can therefore make correlations between exceptionally long running entries in the PHP FPM error log and the PHP error log. In this example, it's worker ID 119057.

```php
// From the PHP FPM Error Log
[16-Dec-2014 14:54:21] NOTICE: [pool www] child 119057 exited with code 0 after 323.614265 seconds from start

// From the PHP Slow Log  
[16-Dec-2014 03:13:50]  [pool www] pid 119057  
script_filename = /srv/bindings/d9e7c7e384eb453f8ac80cee5d4d791bad2wqq34d/code/index.php  
[0x0000000003160c28] drupal_substr() /srv/bindings/d9e7c7e384eb453f8ac80cee5d4d791bad2wqq34d/code/sites/all/modules/contrib/cdn/cdn.module:37  
[0x000000000315f820] cdn_file_url_alter() /srv/bindings/d9e7c7e384eb453f8ac80cee5d4d791bad2wqq34d/code/includes/module.inc:1101  
[0x000000000315f498] drupal_alter() /srv/bindings/d9e7c7e384eb453f8ac80cee5d4d791bad2wqq34d/code/includes/file.inc:375  
[0x000000000315f148] file_create_url() /srv/bindings/d9e7c7e384eb453f8ac80cee5d4d791bad2wqq34d/code/sites/all/modules/contrib/cdn/cdn.basic.css.inc:155  
[0x00007fff92553cb0] _cdn_build_css_path() unknown:0  
[0x000000000315e160] preg_replace_callback() /srv/bindings/d9e7c7e384eb453f8ac80cee5d4d791bad2wqq34d/code/sites/all/modules/contrib/cdn/cdn.basic.css.inc:95  
[0x000000000315d7e8] _cdn_build_css_cache() /srv/bindings/d9e7c7e384eb453f8ac80cee5d4d791bad2wqq34d/code/sites/all/modules/contrib/cdn/cdn.basic.css.inc:33  
[0x000000000315bce0] _cdn_aggregate_css() /srv/bindings/d9e7c7e384eb453f8ac80cee5d4d791bad2wqq34d/code/includes/common.inc:3391  
[0x000000000315ad98] drupal_pre_render_styles() /srv/bindings/d9e7c7e384eb453f8ac80cee5d4d791bad2wqq34d/code/includes/common.inc:5931  
[0x000000000315a568] drupal_render() /srv/bindings/d9e7c7e384eb453f8ac80cee5d4d791bad2wqq34d/code/includes/common.inc:3127  
[0x000000000315a030] drupal_get_css() /srv/bindings/d9e7c7e384eb453f8ac80cee5d4d791bad2wqq34d/code/includes/theme.inc:2707  
[0x0000000003158210] template_process_html() /srv/bindings/d9e7c7e384eb453f8ac80cee5d4d791bad2wqq34d/code/includes/theme.inc:1125  
[0x00000000031572c0] theme() /srv/bindings/d9e7c7e384eb453f8ac80cee5d4d791bad2wqq34d/code/includes/common.inc:5967  
[0x0000000003156da0] drupal_render() /srv/bindings/d9e7c7e384eb453f8ac80cee5d4d791bad2wqq34d/code/includes/common.inc:5814  
[0x0000000003155c68] drupal_render_page() /srv/bindings/d9e7c7e384eb453f8ac80cee5d4d791bad2wqq34d/code/includes/common.inc:2701  
[0x00000000031558b0] drupal_deliver_html_page() /srv/bindings/d9e7c7e384eb453f8ac80cee5d4d791bad2wqq34d/code/includes/common.inc:2589  
[0x0000000003155200] drupal_deliver_page() /srv/bindings/d9e7c7e384eb453f8ac80cee5d4d791bad2wqq34d/code/includes/menu.inc:532  
[0x0000000003155020] menu_execute_active_handler() /srv/bindings/d9e7c7e384eb453f8ac80cee5d4d791bad2wqq34d/code/index.php:21  
```

By using these methods and files to find your PHP errors and performance issues, you will be able to greatly improve the stability of your website.
