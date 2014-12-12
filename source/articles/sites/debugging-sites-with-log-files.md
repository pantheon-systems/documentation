---
title: Debugging sites with log files
description: Learn to debug sites using log files with Drupal.
category:
  - developing
category:
	- drupal

---

## Database Logging

Drupal, by default, logs events using the Database Logging module (dblog). Sometimes, PHP fatal errors can be found in these logs, depending on how much Drupal bootstrapped. These event logs can be accessed in multiple ways.  


From the web, logged in as an administrator, visit Home > Administration > Reports > Recent log messages.  


Using drush:  


drush @pantheon.SITENAME.ENV watchdog-show

Drush can be used to "watch" events in real-time; tail can be used to continuously show new watchdog messages until interrupted (Control+C).  


drush @pantheon.SITENAME.ENV watchdog-show --tail

## Raw Webserver Log Files

When developing a site, it can be useful to directly access the server logs for the site environment.  


From your dashboard for a given site environment, click "Connection Info" for SFTP access credentials; take note of the non-standard port.  


Once connected, several directories will be shown:

- **code** - All executable code; stored in git. Cannot upload code unless site Connection Mode is set to [SFTP mode](/articles/getting-started/developing-on-pantheon-directly-with-sftp-mode/) on Development environment.
- **logs** - Environment's access, error logs. Read only.
  - **newrelic.log** - New Relic log; check if an environment is not logging.
  - **nginx-access.log** - Webserver access log. Do not consider canonical, as this will be wiped if the application server is reset or rebuilt.
  - **nginx-error.log** - Webserver error log.
  - **php-error.log** - PHP [fatal error log](http://php.net/manual/en/book.errorfunc.php); will not contain stack overflows. Errors from this log are also shown in the dashboard.
  - **php-slow.log** - PHP-FPM's collection of stack traces of slow executions, similar to MySQL's slow query log. See  [http://php-fpm.org/wiki/Features#request\_slowlog\_timeout](http://php-fpm.org/wiki/Features#request_slowlog_timeout)
  - **watcher.log** - Log of service that checks for code changed when in SFTP mode

- **files** - Valhalla file mount; code/sites/default/files is symbolically linked to this directory. Read and write (upload).

## Frequently Asked Questions

### I have multiple Application Containers workers in my live environment. Does Pantheon aggregate their logs?

No, Pantheon does not have a mechanism for combining server logs across multiple Application Containers.

#### Can I access the logs on a specific DROP worker?

Yes, but it'll take a couple steps.

    SITE_UUID=(value from dashboard url)
    # Get IPs of individual appserver processes.
    dig +short appserver.live.$SITE_UUID.drush.in

Then, for each appserver that you want to connect to:

    APPSERVER_IP=(value from dig command)
    sftp -o Port=2222 live.$SITE_UUID@$APPSERVER_IP

If you wanted to download all the access logs from a particular site:

    sftp -o Port=2222 live.$SITE_UUID@$APPSERVER_IP:logs/nginx-access.log*

#### How can I parse my Nginx access logs?

You can use a free utility like [goaccess](http://goaccess.prosoftcorp.com/) to parse your Pantheon Nginx access logs. The Pantheon log format can be stored in the <tt>.goaccessrc</tt> configuration file as follows:

    date_format d/%b/%Y:%T %z
    log_format %^ %^ %^ [%d] “%r” %s %b “%R” “%u” %T "%h,^"

#### Can I log to the system logger? Can I access syslog?

The short answer is no, syslog is not available. Technically, you can log Drupal events using the syslog module, but you won't be able to read or access them.

#### Can I access Apache Solr logs?

No, access to Apache Solr logs is not available. For more information on debugging Solr, see [Apache Solr on Pantheon](/articles/running-drupal/apache-solr-on-pantheon/).

#### My Drupal database logs are huge. Should I disable dblog?

Best practice is to find and resolve the problems. PHP notices, warnings and errors mean more work for PHP, the database and your site. If your logs are filling up with PHP messages, find and eliminate the root cause of the problems. The end result will be a faster site.  


Disabling dblog because it's full of errors that are making your site slow is like going to your doctor complaining of pain, getting a diagnosis of a broken arm then leaving before it can healed.
