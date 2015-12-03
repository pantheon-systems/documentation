---
logs: true
layout: landing
use:
    - logs
title: Log Files on Pantheon  
description: Use log files to identify errors, track response times, analyze visitors and more on your WordPress or Drupal site.
keywords: log, access log, nginx access log, nginx log, nginx access, nginx error, nginx error log, php error, php error log, php fpm error, php fpm, php error, php slow, php slow log, pyinofity log, pyinofity, watcher log, watcher
---
Log files track and record your site's activity which help you find, debug, and isolate current or potential problems on your site.

Each environment (Multidev, Dev, Test, and Live) has their own respective log files, which can be obtained via SFTP.

## Download Raw Webserver Log Files
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
To automate this process, see [Automate Downloading Logs from the Live Environment](/docs/articles/sites/logs/downloading-live-error-logs/).
### Log Directory Contents
- **`newrelic.log`**: New Relic log; check if an environment is not logging.
- **`nginx-access.log`**: Webserver access log. Do not consider canonical, as this will be wiped if the application server is reset or rebuilt. See [Parsing nginx Access Logs with GoAccess](/docs/articles/sites/logs/nginx-access-log).
- **`nginx-error.log`**: Webserver error log.
- **`php-error.log`**: PHP [fatal error log](http://php.net/manual/en/book.errorfunc.php); will not contain stack overflows. Errors from this log are also shown in the Dashboard.
- **`php-fpm-error.log`** and **`php-slow.log`**: PHP-FPM generated collection of stack traces of slow executions, similar to MySQL's slow query log. See [PHP Slow Log](/docs/articles/sites/logs/php-slow-log).
- **`pyinotify.log`**: Linux filesystem events monitoring.
- **`watcher.log`**: Log of service that checks for files changed in `code` directory while in SFTP Connection Mode.

## Download MySQL Slow Query Log
1. Access the site Dashboard and desired environment (Mulidev, Dev, Test, or Live).
2. Click **Connection Info** and copy the **SFTP Command Line** command.
3. Edit and execute the command by replacing `appserver` with `dbserver`, like so:

 ```nohighlight
 sftp -o Port=2222 dev.de305d54-75b4-431b-adb2-eb6b9e546014@dbserver.dev.de305d54-75b4-431b-adb2-eb6b9e546014.drush.in
 ```

4. Run the following SFTP command in terminal:
```nohighlight
get logs/mysqld-slow-query.log
```
You now have a local copy of the `mysqld-slow-query.log` file.
## See Also
- [Debugging Sites with Log Files](/docs/articles/sites/logs/debugging-sites-with-log-files)
- [MySQL Slow Log](/docs/articles/sites/logs/mysql-slow-log/)
- [PHP Slow Log](/docs/articles/sites/logs/php-slow-log/)
- [PHP Errors and Exceptions](/docs/articles/sites/php-errors-and-exceptions/)
- [Bots and Indexing](/docs/articles/sites/code/bots-and-indexing/)
- [New Relic](/docs/articles/sites/newrelic)
