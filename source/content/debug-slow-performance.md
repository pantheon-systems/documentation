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
reviewed: "2023-10-20"
showtoc: true
contributors: [jms-pantheon]
---

This article covers the most common causes for performance problems, demonstrates how to diagnose bottlenecks, and provides actionable solutions for developers.

### Cache Hit Ratio

Ineffective caching at the GCDN level is often a primary cause of slow site performance.

#### How to Check:

- **Metrics Tab**: Navigate to the Metrics tab on the live environment.
- **Terminus**: Use `terminus env:metrics` to retrieve the cache hit ratio.
- **Verify with Curl**: Use curl to inspect headers and confirm content caching.

#### Recommended Solutions:

- Increase caching TTL in WordPress or Drupal.
- Inspect headers for caching issues.

[Detailed Debug Cache Guide](/debug-cache)

### New Relic Analysis

On all plans except basic, New Relic offers insights into performance bottlenecks and external calls that might be causing slowdowns.

#### How to Check:

- Ensure New Relic is enabled.
- Investigate slow transactions and external calls within New Relic's dashboard.

#### Recommended Solutions:

- Address slow transactions, database calls, and lengthy external requests.

[Full New Relic Guide on Pantheon](/guides/new-relic)

### Bots & Traffic Patterns

Performance can degrade due to unusual or malicious traffic.

#### How to Check:

- Download and inspect `nginx-access.log` files using SFTP.
- Use the `goaccess` tool to analyze log files.

#### Recommended Solutions:

- Address suspicious traffic patterns.
- Block or manage bots causing high loads.

[Pantheon's Guide on Nginx Access Logs](/guides/logs-pantheon/nginx-access-logs)

### Database Performance

Site performance can be affected by slow database queries.

#### How to Check:

- Review the MySQL slow log.
- Use `pt-query-digest` for an efficient breakdown of the MySQL slow log.

#### Recommended Solutions:

- Address and optimize slow queries.

[Pantheon's MySQL Slow Log Guide](/guides/mariadb-mysql/mysql-slow-log)

### Redis Object Caching

On performance plans and above, Redis enhances performance by reducing redundant database queries.

#### How to Check:

- Confirm Redis object caching is enabled.
- Review Redis usage in New Relic or connect directly to Redis.

#### Recommended Solutions:

- Ensure optimal Redis configurations.

[Pantheon's Object Cache Documentation](/object-cache)

### PHP Errors and Watchdog Logs

PHP errors and watchdog logs in Drupal can indicate issues affecting site performance and can slow down the site by constant logging.

#### How to Check:

- **PHP Error Logs**: Review PHP logs for recurring errors or warnings.
- **Drupal Watchdog Logs**: If you're running a Drupal site, regularly check the watchdog logs for errors.

#### Recommended Solutions:

- Solve any recurring PHP errors.
- Address issues identified in the watchdog logs.

[PHP Errors and Exceptions](/guides/php/php-errors)

### Conclusion

Always validate any changes against real-world performance, either through user experiences or performance testing tools. If these steps don't lead to a resolution, consider consulting Pantheon support or opting for a deeper performance analysis. Regular monitoring and optimization ensure the best user experience on the Pantheon platform.
