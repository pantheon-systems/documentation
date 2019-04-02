---
title: Log Files on Pantheon
description: Use log files to identify errors, track response times, analyze visitors and more on your WordPress or Drupal site.
tags: [logs, services]
categories: []
---
Log files track and record your site's activity to help you find, debug, and isolate current or potential problems on your site. Each environment (Multidev, Dev, Test, and Live) has their own respective log files, which can be obtained via SFTP. Application-level logs can be accessed through Drupal directly. In addition to logs, [New Relic Pro](/docs/new-relic) is a great way to help diagnose and fix errors and performance bottlenecks.

The server timezone and all log timestamps are in UTC (Coordinated Universal Time).

## Available Logs

<table class="table  table-bordered table-responsive" markdown="1">
<thead>
  <tr>
    <th>Log</th>
    <th>Retention Policy</th>
    <th>Comments</th>
  </tr>
</thead>
<tbody>
  <tr>
    <th>newrelic.log</th>
    <td></td>
    <td>New Relic log; check if an environment is not logging.</td>
  </tr>
  <tr>
    <th>nginx-access.log</th>
    <td>Up to 60 days of logs</td>
    <td  markdown="1">Webserver access log. **Do not consider canonical**, as this will be wiped if the application container is reset or rebuilt. See <a href="/docs/nginx-access-log">Parsing nginx Access Logs with GoAccess</a>.</td>
  </tr>
  <tr>
    <th>nginx-error.log</th>
    <td>1MB of log data</td>
    <td>Webserver error log.</td>
  </tr>
  <tr>
    <th>php-error.log <a class="pop" rel="popover" data-proofer-ignore data-toggle="popover" data-html="true" data-content="Fatal errors from PHP error log are provided in each environment on the <strong>Errors</strong> tab of the Site Dashboard. Lower priority PHP errors are only in the PHP error log or in the application logs (watchdog on Drupal, WP_DEBUG for WordPress). For details, see <a href='/docs/php-errors'>PHP Errors and Exceptions</a>."><em class="fa fa-info-circle"></em></a></th>
    <td>1MB of log data</td>
    <td>PHP <a href="https://secure.php.net/manual/en/book.errorfunc.php">fatal error log</a>; will not contain stack overflows. Fatal errors from this log are also shown in the Dashboard.</td>
  </tr>
  <tr>
    <th>php-fpm-error.log</th>
    <td>1MB of log data</td>
    <td>PHP-FPM generated collection of stack traces of slow executions, similar to MySQL's slow query log. See <a href="/docs/php-slow-log">PHP Slow Log</a></td>
  </tr>
  <tr>
    <th>mysqld-slow-query.log</th>
    <td>10MB of log data</td>
    <td>Log of MySQL queries that took more than 120 seconds to execute. Located in the database's `logs/` directory.</td>
  </tr>
  <tr>
    <th>mysqld.log</th>
    <td>1 MB of log data</td>
    <td>Log of established MySQL client connections and statements received from clients. Also Located in the database's `logs/` directory.</td>
  </tr>
</tbody>
</table>

Rotated log files are archived within the `/logs` directory on application containers and database servers (e.g. `/logs/nginx-access.log-20160617.gz` or `/logs/mysqld-slow-query.log-20160606`).

<div class="alert alert-info">
<h4 class="info">Note</h4>
<p markdown="1">When appservers are migrated as a regular part of platform maintenance, log files are destroyed as they are appserver-specific.  Consider <a href="#automate-downloading-logs" data-proofer-ignore>automating the collection</a> of logs regularly to maintain historical log data.</p>
</div>

## Access Logs Via SFTP
Logs are stored within application containers that house your site's codebase and files. [Add an SSH key](/docs/ssh-keys/) within your User Dashboard to enable passwordless access and avoid authentication prompts. Otherwise, provide your Pantheon Dashboard credentials when prompted.

## Downloading Logs
<div class="panel panel-drop" id="accordion">
  <div class="panel-heading panel-drop-heading">
    <a class="accordion-toggle panel-drop-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#logs-video"><h3 class="panel-title panel-drop-title" style="cursor:pointer;"><span style="line-height:.9" class="glyphicons glyphicons-facetime-video"></span> Watch: Download Appserver and Database Log Files</h3></a>
  </div>
  <div id="logs-video" class="collapse">
    <script src="//fast.wistia.com/embed/medias/hqqq24z2iv.jsonp" async></script><script src="//fast.wistia.com/assets/external/E-v1.js" async></script><div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><div class="wistia_embed wistia_async_hqqq24z2iv videoFoam=true" style="height:100%;width:100%">&nbsp;</div></div></div>
  </div>
</div>

### Application Log Files

1. Access the Site Dashboard and desired environment (Multidev, Dev, Test, or Live).
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

### Database Log Files
1. Access the Site Dashboard and desired environment (Multidev, Dev, Test, or Live).
2. Click **Connection Info** and copy the **SFTP Command Line** command.
3. Edit and execute the command by replacing `appserver` with `dbserver`:

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

## Automate Downloading Logs

You can automate the process of accessing and maintaining these logs with a simple script.

### Create a Script
Open your local terminal to create and access a new local directory:
```bash
mkdir $HOME/site-logs
cd $HOME/site-logs
```
Using your favorite text editor, create a file within the `site-logs` directory called `collect-logs.sh` and include the following:
```bash
# Site UUID from Dashboard URL, eg 12345678-1234-1234-abcd-0123456789ab
SITE_UUID=xxxxxxxxxxx
ENV=live
for app_server in `dig +short appserver.$ENV.$SITE_UUID.drush.in`;
do
  rsync -rlvz --size-only --ipv4 --progress -e 'ssh -p 2222' $ENV.$SITE_UUID@appserver.$ENV.$SITE_UUID.drush.in:logs/* app_server_$app_server
done

# Include MySQL logs
db_server=`dig dbserver.$ENV.$SITE_UUID.drush.in +short`
rsync -rlvz --size-only --ipv4 --progress -e 'ssh -p 2222' $ENV.$SITE_UUID@dbserver.$ENV.$SITE_UUID.drush.in:logs db_server_$db_server
```

<div class="alert alert-info">
<h4 class="info">Note</h4>
<p markdown="1">For densely populated directories, using `*` can cause failures. If the script fails, consider removing the wildcard.</p>
</div>

### Collect Logs
Download logs by executing the script from within the `site-logs` directory:
```
sh collect-logs.sh
```
You can now access the logs from within the `site-log` directory. More than one directory is generated for sites that use multiple application containers.

## Frequently Asked Questions

### How can I parse my Nginx access logs?

See [Parsing nginx Access Logs with GoAccess](/docs/nginx-access-log) for details.

### Why do I see requests coming from 10.x.x.x IPs in nginx-access.log?
The first entry reflects an internal IP address of Pantheon's routing layer. The last entry provides a list of IPs used to serve the request, starting with the client IP and ending with internal IPs from the routing layer. For environments with HTTPS enabled, the loadbalancer IP address will be listed second, after the client IP.

The client IP for the following example is `122.248.101.126`:

```nginx
10.x.x.x - - [19/Feb/2016:02:00:00 +0000]  "GET /edu HTTP/1.1" 200 13142 "https://pantheon.io/agencies/pantheon-for-agencies" "Mozilla/5.0 (Windows NT 6.3; WOW64; rv:43.0) Gecko/20100101 Firefox/43.0" 0.399 "122.248.101.126, 50.57.202.75, 10.x.x.x, 10.x.x.x"
```

### Can I log to the system logger and access syslog?

No, syslog is not available. Technically, you can log Drupal events using the syslog module, but you won't be able to read or access them.  You can use the [error_log](https://secure.php.net/manual/en/function.error-log.php) function to log to the php-error.log, which is accessible in the logs directory.

### Can I access Apache Solr logs?

No, access to Apache Solr logs is not available. For more information on debugging Solr, see [Apache Solr on Pantheon](/docs/solr).

### Can I download Varnish logs?

No, Varnish logs are not available for download.

### How do I enable error logging for WordPress?

<div class="alert alert-danger" role="alert" markdown="1">
#### Warning {.info}
The steps in this section enable debug logging. Debug logging increases resource overhead and presents a security risk. It is not recommended for production environments.

To minimize risk exposure, especially in a Live environment, disable debug logging when you are done.
</div>

Enable the [WP_DEBUG and WP_DEBUG_LOG](https://codex.wordpress.org/Debugging_in_WordPress) constants on Development environments (Dev and Multidevs) to write errors to `wp-content/debug.log` and show all PHP errors, notices, and warnings on the page. We suggest setting the WordPress debugging constants per environment in `wp-config.php`:

```php
// All Pantheon Environments.
if (defined('PANTHEON_ENVIRONMENT')) {
  //WordPress debug settings in development environments.
  if (!in_array(PANTHEON_ENVIRONMENT, array('test', 'live'))) {
    // Debugging enabled.
    if (!defined( 'WP_DEBUG' )) {
    define( 'WP_DEBUG', true );
    }
    ini_set('log_errors','On');
    ini_set('display_errors','On');
    ini_set('error_reporting', E_ALL );
    define( 'WP_DEBUG_LOG', true ); // Stored in wp-content/debug.log by default.
    ini_set( 'error_log', WP_CONTENT_DIR . '/uploads/debug.log' ); // Optionally overrides the debug.log location to a writable path.
    define( 'WP_DEBUG_DISPLAY', true );
  }
  // WordPress debug settings in test and live environments.
  else {
    // Debugging disabled.
    ini_set('log_errors','Off');
    ini_set('display_errors','Off');
    define('WP_DEBUG', false);
    define('WP_DEBUG_LOG', false);
    define('WP_DEBUG_DISPLAY', false);
  }
}
```

By default, the WordPress debug log path is set to `/wp-content/` and is not writable on Test or Live environments. This can be overridden to the <a href="/docs/wp-config-php/#how-do-i-change-the-default-debuglog-location" data-proofer-ignore>`/wp-content/uploads/` folder</a>.

### How can I access the Drupal event log?

By default, Drupal logs events using the Database Logging module (dblog). PHP fatal errors can sometimes be found in these logs, depending on how much Drupal bootstrapped. You can access the event logs in a couple ways:

* Visit `/admin/reports/dblog` once you've logged in as administrator.
* Using [Terminus](/docs/terminus/):

 ```bash
 terminus drush <site>.<env> -- watchdog-show
 ```

 * Terminus can invoke Drush commands to "watch" events in real-time; `--tail` can be used to continuously show new watchdog messages until  interrupted (Control+C).

        ```bash
        terminus drush <site>.<env> -- watchdog-show --tail
        ```

        <div class="alert alert-info">
        <h4 class="info">Note</h4>
        <p>At this time, <code>terminus drush "watchdog-show --tail"</code> is supported in 0.13.x versions and below, and not yet supported in  Terminus 1.x.</p>
        </div>

### My Drupal database logs are huge. Should I disable dblog?

We do not recommend disabling dblog. Best practice is to find and resolve the problems. PHP notices, warnings, and errors mean more work for PHP, the database, and your site. If your logs are filling up with PHP messages, find and eliminate the root cause of the problems. The end result will be a faster site.

### How do I access logs in environments with multiple containers?

Live environments for Basic and Performance sites on paid plans have one main and one failover container that can contain logs. Performance Medium plans and above have more than one container in the Live *and* Test environments. In order to download the logs from each application container, use the following shell script:

```bash
# Site UUID from Dashboard URL, eg 12345678-1234-1234-abcd-0123456789ab
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
- Adjust to `appserver.test.$SITE_UUID.drush.in` to pull logs from Test.
- Adjust to `mget *` to include archived log files.

### Can I `tail` server logs?

Not directly. You can download your logs locally using [SFTP](#access-logs-via-sftp) then review them with any tool on your workstation.

You can also use the `logwatcher.sh` script below, which uses [Terminus](/docs/terminus/) and the [Terminus Rsync Plugin](https://github.com/pantheon-systems/terminus-rsync-plugin){.external} to download log files repeatedly. Remember to update the variables to match your site name, environment, path, and the log file you want to watch:

```bash
#!/bin/bash
LOGPATH=~/logs
LOGFILE=php-error.log
SITE=sitename
ENV=environment
TERMINUS_HIDE_UPDATE_MESSAGE=1

touch $LOGPATH/$LOGFILE
terminus rsync $SITE.$ENV:logs/$LOGFILE $LOGPATH

tail $LOGPATH/$LOGFILE

```

Once you create this script and give it executable permissions (`chmod +x`), you can use `watch` (available on macOS via Homebrew), to keep an updated view of the logs:

```bash
watch -n2 logwatcher.sh
```

## See Also
- [MySQL Slow Log](/docs/mysql-slow-log/)
- [PHP Slow Log](/docs/php-slow-log/)
- [PHP Errors and Exceptions](/docs/php-errors/)
- [Bots and Indexing](/docs/bots-and-indexing/)
- [New Relic](/docs/new-relic)
