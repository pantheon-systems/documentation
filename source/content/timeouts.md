---
title: Timeouts on Pantheon
description: Detailed information about timeout errors on your site.
categories: [troubleshoot]
tags: [cron, drush, ssh, solr, terminus]
reviewed: "2020-03-18"
---

Rules are for the good of the group, and timeouts are no exception. Timeouts are configured to fit normal program execution. 

When troubleshooting timeout errors, first verify that the timeout is not caused by [idle application containers](/application-containers#idle-containers). Sometimes timeouts can be reached when working with inefficient code or when attempting to execute a long-running job that would be better suited for [Terminus](/terminus). 

## User-Configurable Timeouts

| Name              | Timeout   | Description |
|:----------------- |:--------- |:----------- |
| [PHP max_execution_time](https://secure.php.net/manual/en/info.configuration.php#ini.max-execution-time) | 120 Seconds | Maximum time a script can run before being terminated by the parser. This includes Drush & WP-CLI commands. Helps prevent poorly written scripts from tying up your application container's PHP workers. <br />  You can edit this timeout via `settings.php` or `wp-config.php`. Scripts executed through the GlobalCDN will still be restricted by the 59 second connection timeout. |
| Solr             | 5 Seconds  | Typically reached if you try to index too much at once (use a reasonable batch size and avoid indexing large binary files). |

## Timeouts That are not Configurable

| Name                                                                                                                         | Timeout     | Description |
|:---------------------------------------------------------------------------------------------------------------------------- |:----------- |:----------- |
| Connection Timeout                                                                                                           | 120 seconds  | Number of seconds to wait for a timeout. |
| First Byte Timeout                                                                                                           | 120 seconds  | Number of seconds to wait for the first byte. |
| Between Bytes Timeout                                                                                                        | 120 seconds  | Number of seconds to wait for between bytes. |
| Pantheon executed Drupal cron                                                                                                | 180 seconds | Only applies to Pantheon's automatic hourly execution of Drush cron. |
| [PHP set_time_limit](https://secure.php.net/manual/en/function.set-time-limit.php)                                           | 120 seconds | Number of seconds a script can run. If reached, the script returns a fatal error. |
| Load Balancer                                                                                                                | 120 seconds | Applies to HTTPS requests and requests to a DNS A record. Requests using the Pantheon CNAME for HTTP requests are *not* limited. |
| SSH                                                                                                                          | 10 minutes idle | Applies to remote Drush and WP-CLI commands, SSH tunneling, SFTP, rsync. |
| [MySQL net_write_timeout](https://dev.mysql.com/doc/refman/5.5/en/server-system-variables.html#sysvar_net_write_timeout)     | 90 seconds  | Number of seconds to wait for a block to be written to a connection before aborting the write. |
| [MySQL net_read_timeout](https://dev.mysql.com/doc/refman/5.5/en/server-system-variables.html#sysvar_net_read_timeout)       | 90 seconds  | Number of seconds to wait for more data from a connection before aborting the read. |
| [MySQL wait_timeout](https://dev.mysql.com/doc/refman/5.5/en/server-system-variables.html#sysvar_wait_timeout)               | 420 seconds | Number of seconds the server waits for activity on a non-interactive connection before closing it. |
| [MySQL interactive_timeout](https://dev.mysql.com/doc/refman/5.5/en/server-system-variables.html#sysvar_interactive_timeout) | 420 seconds | Number of seconds the server waits for activity on an interactive connection before closing it. |
| [Nginx fastcgi_read_timeout](https://nginx.org/en/docs/http/ngx_http_fastcgi_module.html#fastcgi_read_timeout)               | 900 seconds | PHP won't run forever. |

## Frequently Asked Questions

### Can I manually run Drupal cron for longer than the Pantheon executed Drupal cron?

Yes, just use `terminus drush <site>.<env> -- cron` using [Terminus](/terminus). With that said, most slow cron executions are due to PHP errors or a slow external service; best practice is to identify and fix the root cause. Check [log files](/logs) and review [PHP errors and exceptions](/php-errors) for clues.

### What if I run into a timeout when using the Drupal Migrate UI?

As [recommended in the Migrate module documentation](https://www.drupal.org/node/1806824), use Drush, which can be invoked through [Terminus](/terminus).

If you're migrating to a Drupal 7 site, you can also configure Migrate to [trigger Drush imports from the UI](https://www.drupal.org/node/1958170) by configuring the `migrate_drush_path` variable to:

```php
$conf['migrate_drush_path'] = $_ENV['HOME'] . '/bin/drush';
```

### Can Pantheon change the non-configurable timeouts for my site?

No, these settings apply to every site on Pantheon. One of the ways Pantheon scales so well is by avoiding one-off configurations. We run a highly tuned universal configuration for optimized performance.

### How do I change the Solr timeout on Drupal?

Do not edit the `pantheon_apachesolr` module within your Drupal site installation, it will void your warranty and we can't support user modifications. Instead, reduce the batch size and avoid indexing large binary files.

### How do I install a theme or plugin that keeps timing out?

If you receive a `The application did not respond in time` error when trying to install a theme or plugin, your experience may be affected by a combination of large files and a poor internet connection. Extract the files locally and upload them [via SFTP](/rsync-and-sftp).

Agencies that frequently deploy sites using a common set of themes and plugins should consider creating a [custom upstream](/custom-upstream).

## See Also

- [Platform Considerations](/platform-considerations)
- [Errors and Server Responses](/errors-and-server-responses)
- [Modules and Plugins With Known Issues](/modules-plugins-known-issues)
- [Database Connection Errors](/database-connection-errors)
