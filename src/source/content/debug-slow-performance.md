---
title: Debugging Slow Performance
description: Identify and address common performance issues in Drupal or WordPress.
tags: [cache, code, logs, measure]
permalink: docs/debug-slow-performance
contenttype: [doc]
innav: [true]
categories: [optimize]
cms: [drupal, wordpress]
audience: [development]
product: [--]
integration: [--]
reviewed: "2024-06-12"
showtoc: true
contributors: [jms-pantheon]
image: CDN-speedTest-docs-guide.png
---

This article covers the most common causes for performance problems, demonstrates how to diagnose bottlenecks, and provides actionable solutions for developers.
___
## Cache Hit Ratio
A low Cache Hit Ratio <Popover title="Cache Hit Ratio" content="Serving requests from cache rather than by the CMS allows visitors to experience a faster response and removes load from the site's server resources. <a href='/metrics#cache-hit-ratio'> Read more</a>." />  from the Global CDN level is often a primary cause of slow site performance.

**How to Check:**
- From the Site Dashboard, Navigate to Live > Metrics to view Cache Hit Ratio.
- Or view Cache Hit Ratio from the command-line with Terminus:
  ```bash{promptUser: user}
  terminus env:metrics <site>.<env>
  ```

**Recommended Solutions:**
- Increase caching TTL in [WordPress](/guides/wordpress-configurations/wordpress-cache-plugin#pantheon-page-cache-plugin-configuration) or [Drupal](/drupal-cache#caching).
- Inspect [cache related headers](/debug-cache/#cache-related-headers) for cache busting culprits either from the [command-line with curl](/debug-cache#debug-caching-issues) or [in the browser](/guides/global-cdn/test-global-cdn-caching/#test-global-cdn-with-browser-headers).

**See Also**
- [Debug Caching Issues](/debug-cache)
- [Metrics in the Site Dashboard](/metrics#cache-hit-ratio)
___

## Redis Object Caching
On performance plans and above, Redis reads and writes cache data incredibly quickly and takes load off the primary database.

**How to Check:**
- Make sure Redis has been activated from Settings > Addons in the Pantheon Site Dashboard.
- Navigate to the Status tab of a given environment and click "run the checks now" and review results for Redis to make sure "Redis is enabled and serving data".

**Recommended Solutions:**
- Use recommended configurations for [WordPress](/object-cache/wordpress) or [Drupal](/object-cache/drupal)  
- Review Redis usage in [New Relic](/guides/new-relic) or connect directly to [Redis via the command-line](/object-cache/cli).

**See Also**
- [Object Cache Overview](/object-cache)
___

## Error Logging
PHP errors can indicate issues affecting site performance and can slow down the site by constantly writing to application log files (e.g., `php-error.log`). Drupal sites also log PHP notices and warnings to the database by default via the Database Logging module (Watchdog).

**How to Check:**
- Download [Application log files](/guides/logs-pantheon/access-logs#application-log-files) and review for recurring entries.
- For Drupal sites, regularly check the status of Watchdog at `/admin/reports/dblog`

**Recommended Solutions:**
- Solve any recurring log entries observed in `php-error.log`
- Solve any recurring notices and warnings logged by Watchdog (Drupal Sites).

**See Also**
- [PHP Errors and Exceptions](/guides/php/php-errors)
- [Log Files on Pantheon](/guides/logs-pantheon)
___

## New Relic Analysis
On all plans except basic, New Relic offers insights into performance bottlenecks and external calls that might be causing slowdowns.

**How to Check:**
- Make sure New Relic has been activated in the Pantheon Site Dashboard.
- Review slow [transaction traces](https://docs.newrelic.com/docs/apm/transactions/transaction-traces/introduction-transaction-traces/), which are logged for responses that exceed your configured Apdex threshold (.5s by default).

**Recommended Solutions:**
- Address and optimize slow transactions.
  - Prioritize efforts on the most time consuming overall (repeat offenders). Fixing a slow transaction that only occurs once every 12 hours for example, is not as impactful as fixing bottlenecks that occur on every page load.

**See Also**
- [New Relic Performance Monitoring on Pantheon](/guides/new-relic)
___
## Database Performance
Site performance can be affected by slow database queries.

**How to Check:**
- Download and review the MySQL slow log (`mysqld-slow-query.log`).
- Use `pt-query-digest` for an efficient breakdown of the MySQL slow log.
- Log into New Relic and [review slow queries](https://docs.newrelic.com/docs/apm/apm-ui-pages/monitoring/view-slow-query-details/) from the Database page.

**Recommended Solutions:**
- Address and optimize slow queries.
  - Prioritize efforts on the most time consuming overall (repeat offenders). Optimizing a query that runs nightly for example, is not as impactful as fixing slow queries that occur on every page load.

**See Also**
- [MySQL Slow Log](/guides/mariadb-mysql/mysql-slow-log)
- [New Relic Performance Monitoring on Pantheon](/guides/new-relic)

___

## Bots & Traffic Patterns
Performance can degrade due to unusual or malicious traffic.

**How to Check:**
- Download and inspect `nginx-access.log` files using SFTP.
- Use the `goaccess` tool to analyze log files.

**Recommended Solutions:**
- Address suspicious traffic patterns.
- Block or manage bots causing high loads.

**See Also**
- [Parse Nginx Access Logs with GoAccess](/guides/logs-pantheon/nginx-access-logs)
- [Troubleshooting Traffic Events](/guides/account-mgmt/traffic/remedy)
___



## Conclusion

Always validate any changes against real-world performance, either through user experiences or performance testing tools. If these steps don't lead to a resolution, consider consulting Pantheon support or opting for a deeper performance analysis. Regular monitoring and optimization ensure the best user experience on the Pantheon platform.
