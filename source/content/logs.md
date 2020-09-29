---
title: Log Files on Pantheon
description: Use log files to identify errors, track response times, analyze visitors and more on your WordPress or Drupal site.
categories: [platform]
tags: [logs, newrelic, workflow]
reviewed: "2020-07-14"
---
Log files track and record your site's activity to help you find, debug, and isolate current or potential problems on your site. Each environment (Multidev, Dev, Test, and Live) has their own respective log files, which can be obtained via SFTP. Application-level logs can be accessed through Drupal directly. In addition to logs, [New Relic Pro](/new-relic) is a great way to help diagnose and fix errors and performance bottlenecks.

The server timezone and all log timestamps are in UTC (Coordinated Universal Time).

## Available Logs

| Log                   | Retention Policy           | Comments                                                |
|:--------------------- |:--------------------- |:------------------------------------------------------- |
| **newrelic.log**          |                       | New Relic log; check if an environment is not logging.  |
| **nginx-access.log**      | Up to 60 days of logs | Web server access log. **Do not consider canonical**, as this will be wiped if the application container is reset or rebuilt. See [Parsing nginx Access Logs with GoAccess](/nginx-access-log). |
| **nginx-error.log**       | 1MB of log data       | Web server error log.                                   |
| **php-error.log** <Popover content="Fatal errors from PHP error log are provided in each environment on the **Errors** tab of the Site Dashboard. Lower priority PHP errors are only in the PHP error log or in the application logs (watchdog on Drupal, WP_DEBUG for WordPress). For details, see <a href='/docs/php-errors'>PHP Errors and Exceptions</a>" />  | 1MB of log data       | PHP [fatal error log](https://secure.php.net/manual/en/book.errorfunc.php); will not contain stack overflows. Fatal errors from this log are also shown in the Dashboard. |
| **php-fpm-error.log**     | 1MB of log data       | PHP-FPM generated collection of stack traces of slow executions, similar to MySQL's slow query log. See [PHP Slow Log](/php-slow-log) |
| **mysqld-slow-query.log** | 10MB of log data      | Log of MySQL queries that took more than 120 seconds to execute. Located in the database's `logs/` directory. |
| **mysqld.log**            | 1MB of log data       | Log of established MySQL client connections and statements received from clients. Also Located in the database's `logs/` directory. |
| **mysql-bin.0001**        |                       | MySQL [binary logs](https://dev.mysql.com/doc/internals/en/binary-log-overview.html). Located in the database's `data/` directory. |

Rotated log files are archived within the `/logs` directory on application containers and database servers.

You may find that this directory contains sub-directories for services like Nginx and PHP (e.g. `/logs/nginx/nginx-access.log-20160617.gz` or `/logs/php/php-error.log-20160617.gz`) or log files directly in `logs` (e.g. `/logs/mysqld-slow-query.log-20160606`).

<Alert title="Note" type="info">

When appservers are migrated as a regular part of platform maintenance, log files are destroyed as they are appserver-specific. Consider [automating the collection](#automate-downloading-logs) of logs regularly to maintain historical log data.

</Alert>

## Access Logs Via SFTP

Logs are stored within application containers that house your site's codebase and files. [Add an SSH key](/ssh-keys) within your User Dashboard to enable passwordless access and avoid authentication prompts. Otherwise, provide your Pantheon Dashboard credentials when prompted.

In the Connection Information section of the dashboard, we can see a pattern about the hostnames:

```bash{promptUser: user}
<env>.<site-uuid>@<type>.<env>.<site-uuid>.drush.in
```

| Type         | Env                                     | Site UUID                                                                                                 |
|:------------ |:--------------------------------------- |:--------------------------------------------------------------------------------------------------------- |
| `appserver`  | `dev`, `test`, `live`, `<multidev-env>` | ex. `c5c75825-5cd4-418e-8cb0-fb9aa1a7f671`, as found in `https://dashboard.pantheon.io/sites/<site-uuid>` |
| `dbserver`   |                                         |                                                                                                           |

## Downloading Logs

### Application Log Files

1. Access the Site Dashboard and desired environment (Multidev, Dev, Test, or Live).
2. Click **Connection Info** and copy the **SFTP Command Line** command.
3. Open a terminal window and paste the SFTP connection command.
4. Run the following SFTP command in terminal:

   ```none
   get -r logs
   ```

You now have a local copy of the logs directory.

For sites on [Compute Optimized Environments (COE)](/platform-considerations#compute-optimized-environments-coe), the directory structure will resemble:

```none
├── logs
    └──php
        └──newrelic.log
        └──php-error.log
        └──php-fpm-error.log
        └──php-slow.log
    └──nginx
        └──nginx-access.log
        └──nginx-error.log
```

For sites not on COE, the directory structure will be more like this:

```none
├── logs
    └──newrelic.log
    └──nginx-access.log
    └──nginx-error.log
    └──php-error.log
    └──php-fpm-error.log
    └──php-slow.log
```

### Database Log Files

1. Access the Site Dashboard and desired environment (Multidev, Dev, Test, or Live).
1. Click **Connection Info** and copy the **SFTP Command Line** command.
1. Edit and execute the command by replacing `appserver` with `dbserver`:

 From:

 ```bash{promptUser: user}
 sftp -o Port=2222 dev.de305d54-75b4-431b-adb2-eb6b9e546014@appserver.dev.de305d54-75b4-431b-adb2-eb6b9e546014.drush.in`
 ```

 To:

 ```bash{promptUser: user}
 sftp -o Port=2222 dev.de305d54-75b4-431b-adb2-eb6b9e546014@dbserver.dev.de305d54-75b4-431b-adb2-eb6b9e546014.drush.in`
 ```

4. Run the following SFTP command in terminal:

 ```none
 get -r logs
 ```

You now have a local copy of the logs directory, which contains the following:

```none
├── logs
    └──mysqld-slow-query.log
    └──mysqld.log
```

## Automate Downloading Logs

You can automate the process of accessing and maintaining these logs with a simple script.

### Create a Script

Open your local terminal to create and access a new local directory:

```bash{promptUser: user}
mkdir $HOME/site-logs
cd $HOME/site-logs
```

Using your favorite text editor, create a file within the `site-logs` directory called `collect-logs.sh` and include the following:

  <TabList>

  <Tab title="Rsync version" id="rsync-ver" active={true}>

  ```bash:title=collect-logs.sh
  #!/bin/bash
  # Site UUID from Dashboard URL, eg 12345678-1234-1234-abcd-0123456789ab
  SITE_UUID=xxxxxxxxxxx
  ENV=live
  for app_server in `dig +short -4 appserver.$ENV.$SITE_UUID.drush.in`;
  do
    rsync -rlvz --size-only --ipv4 --progress -e 'ssh -p 2222' $ENV.$SITE_UUID@$app_server:logs/* app_server_$app_server
  done

  # Include MySQL logs
  for db_server in `dig +short -4 dbserver.$ENV.$SITE_UUID.drush.in`;
  do
    rsync -rlvz --size-only --ipv4 --progress -e 'ssh -p 2222' $ENV.$SITE_UUID@$db_server:logs/* db_server_$db_server
  done
  ```

  <Alert title="Note" type="info">

  For densely populated directories, using `*` can cause failures. If the script fails, consider removing the wildcard.

  </Alert>

  </Tab>

  <Tab title="SFTP version" id="sftp-ver">

  ```bash:title=collect-logs.sh
  #!/bin/bash
  # Site UUID from Dashboard URL, eg 12345678-1234-1234-abcd-0123456789ab
  SITE_UUID=xxxxxxxxxxx
  ENV=live
  for app_server in `dig +short -4 appserver.$ENV.$SITE_UUID.drush.in`;
  do
  mkdir $app_server
  sftp -o Port=2222 $ENV.$SITE_UUID@$app_server << !
    cd logs
    lcd $app_server
    mget *.log
  !
  done
  ```

  <Alert title="Note" type="info">

  Adjust to `mget *` to include archived log files.

  </Alert>

  </Tab>

  </TabList>

### Collect Logs

Download logs by executing the script from within the `site-logs` directory:

```bash{promptUser:user}
bash collect-logs.sh
```

You can now access the logs from within the `site-logs` directory. More than one directory is generated for sites that use multiple application containers.

## Frequently Asked Questions

### How can I parse my Nginx access logs?

See [Parsing nginx Access Logs with GoAccess](/nginx-access-log) for details.

### What is the first line in nginx-access.log?

The first entry reflects an internal IP address of Pantheon's routing layer. The last entry provides a list of IPs used to serve the request, starting with the client IP and ending with internal IPs from the routing layer. For environments with HTTPS enabled, the loadbalancer IP address will be listed second, after the client IP.

The client IP for the following example is `122.248.101.126`:

```nginx
203.0.113.56 - - [19/Feb/2016:02:00:00 +0000]  "GET /edu HTTP/1.1" 200 13142 "https://pantheon.io/agencies/pantheon-for-agencies" "Mozilla/5.0 (Windows NT 6.3; WOW64; rv:43.0) Gecko/20100101 Firefox/43.0" 0.399 "122.248.101.126, 50.57.202.75, 10.x.x.x, 10.x.x.x"
```

### Can I log to the system logger and access syslog?

No, syslog is not available. Technically, you can log Drupal events using the syslog module, but you won't be able to read or access them.  You can use the [error_log](https://secure.php.net/manual/en/function.error-log.php) function to log to the php-error.log, which is accessible in the logs directory.

### Can I access Apache Solr logs?

No, access to Apache Solr logs is not available. For more information on debugging Solr, see [Apache Solr on Pantheon](/solr).

### Can I download Varnish logs?

No, Varnish logs are not available for download.

### How do I enable error logging for WordPress?

<Alert title="Warning" type="danger">

The steps in this section enable debug logging. Debug logging increases resource overhead and presents a security risk. It is not recommended for production environments.

To minimize risk exposure, especially in a Live environment, disable debug logging when you are done.

</Alert>

Enable the [WP_DEBUG and WP_DEBUG_LOG](https://codex.wordpress.org/Debugging_in_WordPress) constants on Development environments (Dev and Multidevs) to write errors to `wp-content/uploads/debug.log` and show all PHP errors, notices, and warnings on the page. We suggest setting the WordPress debugging constants per environment in `wp-config.php`:

<Partial file="wp-debugging.md" />

By default, the WordPress debug log path is set to `/wp-content/` and is not writable on Test or Live environments. This can be overridden to the [`/wp-content/uploads/` folder](/wp-config-php/#how-do-i-change-the-default-debuglog-location).

### How can I access the Drupal event log?

By default, Drupal logs events using the Database Logging module (dblog). PHP fatal errors can sometimes be found in these logs, depending on how much Drupal bootstrapped. You can access the event logs in a couple ways:

- Visit `/admin/reports/dblog` once you've logged in as administrator.
- Using [Terminus](/terminus):

 ```bash{promptUser: user}
 terminus drush <site>.<env> -- watchdog-show
 ```

- Terminus can invoke Drush commands to "watch" events in real-time; `--tail` can be used to continuously show new watchdog messages until  interrupted (Control+C).

 ```bash{promptUser: user}
 terminus drush <site>.<env> -- watchdog-show --tail
 ```

### My Drupal database logs are huge. Should I disable dblog?

We do not recommend disabling dblog. Best practice is to find and resolve the problems. PHP notices, warnings, and errors mean more work for PHP, the database, and your site. If your logs are filling up with PHP messages, find and eliminate the root cause of the problems. The end result will be a faster site.

### How do I access logs in environments with multiple containers?

Live environments for Basic and Performance sites on paid plans have one main and one failover container that can contain logs. Performance Medium plans and above have more than one container in the Live *and* Test environments. In order to download the logs from each application container, use the [shell script](#automate-downloading-logs) above.

### Can I `tail` server logs?

Not directly. You can download your logs locally using [SFTP](#access-logs-via-sftp) then review them with any tool on your workstation.

You can also create the `logwatcher.sh` script below, which uses [Terminus](/terminus) and the [Terminus Rsync Plugin](https://github.com/pantheon-systems/terminus-rsync-plugin) to download log files and display the last several lines.

1. If you're working on multiple projects locally, create a `logs` directory in the local Git repository for each one you want to watch logs for.

1. Add `logs/*` to the project's [`.gitignore` file](/git-faq/#can-i-use-gitignore-on-pantheon).

1. In your project's `logs` directory, create `logwatcher.sh`:

  ```bash:title=logwatcher.sh
  #!/bin/bash
  TERMINUS_HIDE_UPDATE_MESSAGE=1

  LOGPATH=~/projects/mysite/logs
  LOGFILE=php-error.log
  SITE=sitename
  ENV=environment

  touch $LOGPATH/$LOGFILE
  terminus rsync $SITE.$ENV:logs/$LOGFILE $LOGPATH

  tail $LOGPATH/$LOGFILE
  ```

1. Update the variables:

    - `LOGPATH` points to the `logs` directory in your project,
    - `SITE` should match your [site name](/terminus/examples/#siteenv),
    - `ENV` is the environment you want to watch logs from

1. Make the script executable:

   ```bash{promptUser: user}
   chmod +x ~/projects/mysite/logs/logwatcher.sh
   ```

1. Now you can use `watch` (available on macOS via Homebrew), to keep an updated view of the logs:

   ```bash{promptUser: user}
   watch -n2 ~/projects/mysite/logs/logwatcher.sh
   ```

   Stop the process with **CTRL-C**.

## See Also
- [MySQL Slow Log](/mysql-slow-log)
- [PHP Slow Log](/php-slow-log)
- [PHP Errors and Exceptions](/php-errors)
- [Bots and Indexing](/bots-and-indexing)
- [New Relic](/new-relic)
