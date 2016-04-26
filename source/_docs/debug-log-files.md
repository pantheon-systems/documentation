---
title: Debugging Sites with Log Files
description: Learn to debug your Pantheon Drupal or WordPress sites using log files.
categories: [developing]
tags: [debug, code, logs, featured]
keywords: debug, debugging sites, debug sites, debugging site, debugging mysql, debug sql, troubleshoot mysql, troubleshoot sql, database logs, db logs, where are db logs stored, where are database logs
---
One of the key ways to find issues on your website is to check your database logs to isolate current or potential problems.

### Drupal

Drupal, by default, logs events using the Database Logging module (dblog). Sometimes, PHP fatal errors can be found in these logs, depending on how much Drupal bootstrapped. You can access the event logs in a couple ways:  

1. Visit `/admin/reports/dblog` once you've logged in as administrator.
2. Using [Terminus](/docs/terminus/):  

```bash
terminus drush "watchdog-show"
```

Terminus can invoke Drush commands to "watch" events in real-time; tail can be used to continuously show new watchdog messages until interrupted (Control+C).  

```bash
terminus drush "watchdog-show --tail"
```

### WordPress

Set the WP_DEBUG variable to "true" within your wp-config.php file to display all PHP errors, notices, and warnings. Reference the [WordPress codex](http://codex.wordpress.org/Debugging_in_WordPress) for additional information on debugging in WordPress.

```php
define('WP_DEBUG', true);
```

## Raw Webserver Log Files
When developing a site, it can be useful to directly access the server logs for the site environment. For instructions on how to download, see [Log Files on Pantheon](/docs/logs/#download-raw-webserver-log-files).

## Frequently Asked Questions

#### How can I parse my Nginx access logs?

See [Parsing nginx Access Logs with GoAccess](/docs/nginx-access-log) for details.

#### Why do I see requests coming from 10.x.x.x IPs in nginx-access.log?
The first entry reflects an internal IP address of Pantheon's routing layer. The last entry provides a list of IPs used to serve the request, starting with the client IP and ending with internal IPs from the routing layer. For environments with HTTPS enabled, the loadbalancer IP address will be listed second, after the client IP.

The client IP for the following example is `122.248.101.126`:

```nginx
10.x.x.x - - [19/Feb/2016:02:00:00 +0000]  "GET /edu HTTP/1.1" 200 13142 "https://pantheon.io/agencies/pantheon-for-agencies" "Mozilla/5.0 (Windows NT 6.3; WOW64; rv:43.0) Gecko/20100101 Firefox/43.0" 0.399 "122.248.101.126, 50.57.202.75, 10.x.x.x, 10.x.x.x"
```

#### Can I log to the system logger and access syslog?

The short answer is no, syslog is not available. Technically, you can log Drupal events using the syslog module, but you won't be able to read or access them.  You can use the [error_log](http://php.net/manual/en/function.error-log.php) function to log to the php-error.log, which is accessible in the logs directory.

#### Can I access Apache Solr logs?

No, access to Apache Solr logs is not available. For more information on debugging Solr, see [Apache Solr on Pantheon](/docs/solr).

#### Can I download Varnish logs?

No, Varnish logs are not available for download.

#### My Drupal database logs are huge. Should I disable dblog?

The best recommended practice is to find and resolve the problems. PHP notices, warnings, and errors mean more work for PHP, the database, and your site. If your logs are filling up with PHP messages, find and eliminate the root cause of the problems. The end result will be a faster site.  

#### How do I access logs in environments with multiple containers?

Business and Elite plans have more than a single container in the Live environment. In order to download the logs from each application container, use the following shell script:

```bash
# Site UUID from Dashboard URL
SITE_UUID=UUID
for app_server in `dig +short appserver.live.$SITE_UUID.drush.in`;
do
mkdir $app_server
sftp -o Port=2222 live.$SITE_UUID@$app_server << !
  cd logs
  lcd $app_server
  mget *.log
!
done
```
