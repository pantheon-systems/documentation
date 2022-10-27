---
title: Log Files on Pantheon
subtitle: Frequently Asked Questions
description: Get answers to your log questions.
categories: [logs]
tags: [logs, measure]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/logs-pantheon/faq-logs
anchorid: faq-logs
---

This section provides answers to frequently asked questions about log files.

### How can I parse my Nginx access logs?

Refer to [Parsing nginx Access Logs with GoAccess](/guides/logs-pantheon/nginx-access-logs) for more information.

### What is the first line in nginx-access.log?

The first entry reflects an internal IP address of Pantheon's routing layer. The last entry provides a list of IPs used to serve the request, starting with the client IP and ending with internal IPs from the routing layer. For environments with HTTPS enabled, the load balancer IP address will be listed second, after the client IP.

The client IP for the following example is `122.248.101.126`:

```nginx
203.0.113.56 - - [19/Feb/2016:02:00:00 +0000]  "GET /edu HTTP/1.1" 200 13142 "https://pantheon.io/agencies/pantheon-for-agencies" "Mozilla/5.0 (Windows NT 6.3; WOW64; rv:43.0) Gecko/20100101 Firefox/43.0" 0.399 "122.248.101.126, 50.57.202.75, 10.x.x.x, 10.x.x.x"
```

### Can I log to the system logger and access syslog?

No, syslog is unavailable. Technically, you can log Drupal events using the syslog module, but you won't be able to read or access them. You can use the [error_log](https://secure.php.net/manual/en/function.error-log.php) function to log to the php-error.log, which is accessible in the logs directory.

### Can I access Apache Solr logs?

No, access to Apache Solr logs is unavailable. Refer to the documentation on [Pantheon Search](/solr) for more information on debugging Solr.

### Can I download Varnish logs?

No, Varnish logs are unavailable for download.

### How do I enable error logging for WordPress?

<Alert title="Warning" type="danger">

The steps in this section enable debug logging. Debug logging increases resource overhead and presents a security risk. It is not recommended for production environments.

Disable debug logging when you are done to minimize risk exposure, especially in a Live environment.

</Alert>

Enable the [WP_DEBUG and WP_DEBUG_LOG](https://codex.wordpress.org/Debugging_in_WordPress) constants on Development environments (Dev and Multidevs) to write errors to `wp-content/uploads/debug.log` and show all PHP errors, notices, and warnings on the page. We suggest setting the WordPress debugging constants per environment in `wp-config.php`:

<Partial file="wp-debugging.md" />

By default, the WordPress debug log path is set to `/wp-content/` and is not writable on Test or Live environments. This can be overridden to the [`/wp-content/uploads/` folder](/guides/php/wp-config-php/#how-do-i-change-the-default-debuglog-location).

### How can I access the Drupal event log?

Drupal logs events with the Database Logging module (dblog) by default. PHP fatal errors can sometimes be found in these logs, depending on how much Drupal bootstrapped. You can access the event logs in a couple ways:

- Visit `/admin/reports/dblog` after you've logged in as administrator.
- Use [Terminus](/terminus):

 ```bash{promptUser: user}
 terminus drush <site>.<env> -- watchdog-show
 ```

- Terminus can invoke Drush commands to "watch" events in real-time; `--tail` can be used to continuously show new watchdog messages until interrupted (Control+C).

 ```bash{promptUser: user}
 terminus drush <site>.<env> -- watchdog-show --tail
 ```

### My Drupal database logs are huge. Should I disable dblog?

We do not recommend disabling dblog. The best practice is to find and resolve the problems. PHP notices, warnings, and errors mean more work for PHP, the database, and your site. If your logs are filling up with PHP messages, find and eliminate the root cause of the problems. This will make your site faster.

Refer to [PHP Errors and Exceptions](/guides/php/php-errors) for more information.

### How do I access logs in environments with multiple containers?

You can use the [shell script](/guides/logs-pantheon/automate-log-downloads#create-a-script) to download the logs from each [application container](/application-containers). Application container numbers by plan are listed below:

**Basic and Performance sites on paid plans:**

   - **Live environment:** 1 main container and 1 failover container with logs

**Performance Medium plans and above:**

   - **Live environment:** multiple containers with logs
   - **Test environment:** multiple containers with logs

### Can I `tail` server logs?

Not directly. You can download your logs locally using [SFTP](#access-logs-via-sftp) and then review the logs with any tool on your workstation.

You can also create the `logwatcher.sh` script below, which uses [Terminus](/terminus) and the [Terminus Rsync Plugin](https://github.com/pantheon-systems/terminus-rsync-plugin) to download log files and display the last several lines.

1. Create a `logs` directory in the local Git repository for each log you want to watch if you're working on multiple projects locally. 

1. Add `logs/*` to the project's [`.gitignore` file](/guides/git/faq-git#can-i-use-gitignore-on-pantheon).

1. Navigate to your project's `logs` directory and create `logwatcher.sh`:

  ```bash:title=logwatcher.sh
  #!/bin/bash
  export TERMINUS_HIDE_UPDATE_MESSAGE=1

  LOGPATH=~/projects/mysite/logs/
  LOGFILE=php-error.log
  SITE=sitename
  ENV=environment

  touch $LOGPATH/$LOGFILE
  terminus rsync $SITE.$ENV:logs/php/$LOGFILE $LOGPATH

  tail $LOGPATH/$LOGFILE
  ```

1. Update the variables:

    - `LOGPATH` points to the `logs` directory in your project
    - `SITE` should match your [site name](/terminus/examples/#siteenv)
    - `ENV` is the environment in which you want to watch logs

1. Make the script executable:

   ```bash{promptUser: user}
   chmod +x ~/projects/mysite/logs/logwatcher.sh
   ```

1. Use `watch` (available on macOS via Homebrew) to keep an updated view of the logs:

   ```bash{promptUser: user}
   watch -n2 ~/projects/mysite/logs/logwatcher.sh
   ```

   Stop the process with **CTRL-C**.


## More Resources

- [PHP on Pantheon](/guides/php)
- [Investigate and Remedy Traffic Events](/guides/account-mgmt/traffic/remedy)
- [Terminus Manual](/terminus)
- [Drupal Drush Command-Line Utility on Pantheon](/guides/drush)