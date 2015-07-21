---
title: Log Files on Pantheon  
description: Use log files to identify errors, track response times, analyze visitors and more on your WordPress or Drupal site.
keywords: log, access log, nginx access log, nginx log, nginx access, nginx error, nginx error log, php error, php error log, php fpm error, php fpm, php error, php slow, php slow log, pyinofity log, pyinofity, watcher log, watcher
draft: true
---
Log files track and record your site's activity which help you find, debug, and isolate current or potential problems on your site. These logs can also be used to compile statistics on your visitors and referral traffic.

Each environment (Multidev, Dev, Test, and Live) have their own respective log files, which can be obtained via SFTP.

## Download Logs
1. Access the site Dashboard and desired environment (Mulidev, Dev, Test, or Live).
2. Click **Connection Info** and copy the **SFTP Command Line** command.
3. Open a terminal window and paste the SFTP connection command.
4. Run the following SFTP command in terminal:

   ```nohighlight
   get -r logs
   ```

You will now have a local copy of the logs directory, which contains the following:
```nohighlight
├── logs
    └──nginx-access.log
    └──nginx-error.log
    └──php-error.log
    └──php-fpm-error.log
    └──php-slow.log
    └──pyinotify.log
    └──watcher.err
    └──watcher.log
```
You can automate this process with the following script:
```
# Replace SITE_UUID with value from Dashboard URL
SITE_UUID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
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
For more information, see [Automate Downloading Logs from the Live Environment](/docs/articles/sites/downloading-live-error-logs/).

## Debugging


## Reporting
