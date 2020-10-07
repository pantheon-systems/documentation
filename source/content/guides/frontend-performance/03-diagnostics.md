---
title: Frontend Performance 
subtitle: Diagnostic Tools
description: Tools for evaluating performance issues.
anchorid: diagnostics
categories: [performance]
tags: [measure, traffic]
type: guide
permalink: docs/guides/frontend-performance/diagnostics
editpath: frontend-performance/03-diagnostics.md
image: CDN-speedTest-docs-guide
reviewed: "2020-10-10"
---

Diagnostics and tools for evaluating performance issues.

## Lighthouse

Google's [Lighthouse](https://github.com/GoogleChrome/lighthouse) 

## New Relic

Pantheon's New Relic One.

### Monitor Performance with New Relic
If your site doesn't seem to be able to send uncached content fast enough, enable monitoring services for free with [New Relic](/new-relic) for help identifying bottlenecks.

#### Helper Tools
There are toolbars for both Drupal and WordPress that provide stats like the number of queries, amount of memory, and response time. These can be helpful for real time debugging.

<TabList>
<Tab title="WordPress" id="wordpress-helpers" active={true}>

The [Debug Bar](https://wordpress.org/plugins/debug-bar/) plugin can be useful identifying advanced cache behaviors. This plugin requires that you enable debugging via `wp-config.php`:

```php
/**
 * For developers: WordPress debugging mode.
 *
 * Sets WP_DEBUG to true on if on a non-production environment.
 *
 */
    if ( in_array( $_ENV['PANTHEON_ENVIRONMENT'], array( 'test', 'live' ) ) && ! defined( 'WP_DEBUG', false ) ) {
      define('WP_DEBUG', false);
    }
    else
      define( 'WP_DEBUG', true );
```

1. Navigate to a development environment's site URL that has the plugin installed and enabled, with the above configuration in place.
2. From the WordPress dashboard, click **Debug** towards the top right.
3. Review the request and object cache data for potential red flags.

![Debug Bar WordPress](../../images/guides/front-end-performance/debug-bar.png)

</Tab>

<Tab title="Drupal" id="drupal-helpers">

The `webprofiler` module is provided by [Devel](https://www.drupal.org/project/devel) and generates a helpful toolbar at the bottom which can dig into performance and caching behaviors.

![Devel Drupal](../../images/drupal8-commandline--webprofiler.png)

</Tab>

</TabList>

For debugging deep and complex server-side performance problems you might need to run your site locally with profiler like [Blackfire](https://blackfire.io/).

