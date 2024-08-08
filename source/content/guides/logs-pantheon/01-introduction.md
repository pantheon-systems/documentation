---
title: Environment Log Files on Pantheon
subtitle: Introduction
description: Use logs on Pantheon to help find, debug, and isolate potential problems.
contenttype: [guide]
innav: [true]
categories: [logs]
cms: [--]
audience: [development]
product: [--]
integration: [--]
tags: [logs, measure]
contributors: [whitneymeredith]
permalink: docs/guides/logs-pantheon
---

Log files track and record your the activity within one environment to help you find, debug, and isolate current or potential problems on your site. Each environment (Multidev, Dev, Test, and Live) has individual log files, which can be obtained via SFTP.

These logs are separate from:
  * application-level logs that can be accessed directly through WordPress and Drupal. You can use [New Relic&reg; Performance Monitoring](/guides/new-relic) in conjunction with logs to help diagnose and fix errors and performance bottlenecks.
 * the [workflow logs](/workflow-logs), which are available in the site dashboard, and record details around events like code deployments and the creation of Multidev environments.

The server timezone and log timestamps are in UTC (Coordinated Universal Time).

<Alert title="Note" type="info">

Log files are destroyed during appserver migration (a standard part of regular platform maintenance). Log deletion occurs because the log files are appserver-specific. Consider [automating the collection](/guides/logs-pantheon/automate-log-downloads) of logs regularly to maintain historical log data.

</Alert>

[Fastly on Pantheon](/guides/fastly-pantheon) provides additional features if you are looking for log or media storage integration solutions. 

## Available Logs

| Log                   | Retention Policy           |Comments                                                |
|:--------------------- |:--------------------- |:------------------------------------------------------- |
| **error.log**         |  n/a                     | A legacy file that usually advises about an nginx upgrade or modifying server modules.|
| **newrelic.log**          |    n/a                   | New Relic log; check if an environment is not logging.  |
| **nginx-access.log**      | Up to 60 days of logs | Web server access log. **Do not consider canonical**, as this will be wiped if the application container is reset or rebuilt. See [Parsing nginx Access Logs with GoAccess](/guides/logs-pantheon/nginx-access-logs). |
| **nginx-error.log**       | 1MB of log data       | Web server error log.                                   |
| **php-error.log** <Popover content="PHP errors are only in the PHP error log or in the application logs (watchdog on Drupal, WP_DEBUG for WordPress)."/>  | 1MB of log data       | PHP error log containing warnings and errors. Refer to [PHP Errors and Exceptions](/guides/php/php-errors) for more information. |
| **php-slow.log**     | 1MB of log data       | This is a log of PHP-FPM generated stack traces of slow executions, similar to MySQL's slow query log. Refer to [PHP Slow Log](/guides/php/php-slow-log) for more information. |
| **php-fpm-error.log**   | 1MB of log data    | This is a log of errors in the FastCGI Process Manager and can be useful in finding why processes were terminated. |
| **mysqld-slow-query.log** | 10MB of log data      | Log of MySQL queries that took more than 120 seconds to execute. Located in the database's `logs/` directory. |
| **mysqld.log**            | 1MB of log data       | Log of established MySQL client connections and statements received from clients. Also Located in the database's `logs/` directory. |
| **mysql-bin.0001**        |    n/a                   | MySQL [binary logs](https://dev.mysql.com/doc/internals/en/binary-log-overview.html). Located in the database's `data/` directory. |

## /logs Directory

Rotated log files are archived within the `/logs` directory on [application containers](/application-containers) and database servers. The directory might contain sub-directories for services like Nginx and PHP, or it may log files directly in `/logs` For example: 

- Subdirectories: `/logs/nginx/nginx-access.log-20160617.gz` or `/logs/php/php-error.log-20160617.gz`

- Directly within the `/logs` directory: `/logs/mysqld-slow-query.log-20160606`

## More Resources

- [MySQL Slow Log](/guides/mariadb-mysql/mysql-slow-log)
- [PHP Slow Log](/guides/php/php-slow-log)
- [PHP Errors and Exceptions](/guides/php/php-errors)
- [Bots and Indexing](/bots-and-indexing)
- [New Relic&reg; Performance Monitoring](/guides/new-relic)
- [Fastly on Pantheon](/guides/fastly-pantheon)
