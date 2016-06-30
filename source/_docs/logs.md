---
title: Log Files on Pantheon  
description: Use log files to identify errors, track response times, analyze visitors and more on your WordPress or Drupal site.
keywords: log, access log, nginx access log, nginx log, nginx access, nginx error, nginx error log, php error, php error log, php fpm error, php fpm, php error, php slow, php slow log, pyinofity log, pyinofity, watcher log, watcher
categories: [developing]
tags: [logs]
---
Log files track and record your site's activity which help you find, debug, and isolate current or potential problems on your site.

Each environment (Multidev, Dev, Test, and Live) has their own respective log files, which can be obtained via SFTP.

## Available Logs

<table class="table  table-bordered table-responsive">
    <thead>
      <tr>
        <th>Log</th>
        <th>Retention Policy</th>
        <th>Comments</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row" class="thead-inverse"><code>newrelic.log</code></th>
        <td></td>
        <td>New Relic log; check if an environment is not logging.</td>
      </tr>
      <tr>
        <th><code>nginx-access.log</code></th>
        <td>60 days of logs</td>
        <td>Webserver access log. Do not consider canonical, as this will be wiped if the application server is reset or rebuilt. See <a href="/docs/nginx-access-log">Parsing nginx Access Logs with GoAccess</a>.</td>
      </tr>
      <tr>
        <th><code>nginx-error.log</code></th>
        <td>1MB of log data</td>
        <td>Webserver error log.</td>
      </tr>
      <tr>
        <th><code>php-error.log</code></th>
        <td>1MB of log data</td>
        <td>PHP <a href="http://php.net/manual/en/book.errorfunc.php">fatal error log</a>; will not contain stack overflows. Errors from this log are also shown in the Dashboard.</td>
      </tr>
      <tr>
        <th><code>php-fpm-error.log</code></th>
        <td>1MB of log data</td>
        <td>PHP-FPM generated collection of stack traces of slow executions, similar to MySQL's slow query log. See <a href="/docs/php-slow-log">PHP Slow Log</a></td>
      </tr>
      <tr>
        <th><code>pyinotify.log</code></th>
        <td></td>
        <td>Linux filesystem events monitoring.</td>
      </tr>
      <tr>
        <th><code>watcher.log</code></th>
        <td></td>
        <td>Log of service that checks for files changed in <code>code</code> directory while in SFTP Connection Mode.</td>
      </tr>
      <tr>
        <th><code>mysqld-slow-query.log</code></th>
        <td>10MB of log data</td>
        <td>Log of MySQL queries that took more than 120 seconds to execute.</td>
      </tr>
      <tr>
        <th><code>mysqld.log</code></th>
        <td>1 MB of log data</td>
        <td>Log of established MySQL client connections and statements received from clients.</td>
      </tr>
    </tbody>
  </table>

Rotated log files are archived within the `/logs` directory on application servers and database servers (e.g. `/logs/nginx-access.log-20160617.gz` or `/logs/mysqld-slow-query.log-20160606`).

### Download Application Log Files
1. Access the site Dashboard and desired environment (Mulidev, Dev, Test, or Live).
2. Click **Connection Info** and copy the **SFTP Command Line** command.
3. Open a terminal window and paste the SFTP connection command.
4. Run the following SFTP command in terminal:

   ```nohighlight
   get -r logs
   ```

You now have a local copy of the logs directory, which contains the following:
```nohighlight
├── logs
    └──newrelic.log
    └──nginx-access.log
    └──nginx-error.log
    └──php-error.log
    └──php-fpm-error.log
    └──php-slow.log
    └──pyinotify.log
    └──watcher.log
```

### Download Database Log Files
1. Access the site Dashboard and desired environment (Mulidev, Dev, Test, or Live).
2. Click **Connection Info** and copy the **SFTP Command Line** command.
3. Edit and execute the command by replacing `appserver` with `dbserver`, like so:

 ```nohighlight
 sftp -o Port=2222 dev.de305d54-75b4-431b-adb2-eb6b9e546014@dbserver.dev.de305d54-75b4-431b-adb2-eb6b9e546014.drush.in
 ```

4. Run the following SFTP command in terminal:
```nohighlight
get -r logs
```
You now have a local copy of the logs directory, which contains the following:
```nohighlight
├── logs
    └──mysqld-slow-query.log
    └──mysqld.log
```
To automate this process, see [Automate Downloading Logs from the Live Environment](/docs/download-logs/).

## See Also
- [Debugging Sites with Log Files](/docs/debug-log-files)
- [MySQL Slow Log](/docs/mysql-slow-log/)
- [PHP Slow Log](/docs/php-slow-log/)
- [PHP Errors and Exceptions](/docs/php-errors/)
- [Bots and Indexing](/docs/bots-and-indexing/)
- [New Relic](/docs/new-relic)
