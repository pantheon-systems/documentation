---
title: Log Files on Pantheon
subtitle: Download Logs
description: Learn how to download application and database log files.
categories: [logs]
tags: [logs, measure]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/logs-pantheon/download-logs
anchorid: download-logs
---

This section provides information on how to download application and database log files.

### Application Log Files

Follow the steps below to download your application log files.

1. Navigate to the Site Dashboard and open the desired environment (Multidev, Dev, Test, or Live).

1. Click **Connection Info** and copy the **SFTP Command Line** command.

1. Open a terminal window and paste the SFTP connection command.

1. Run the following SFTP command in the terminal:

   ```none
   get -r logs
   ```

    You now have a local copy of the logs directory.

    The directory structure will resemble:

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
            └──error.log
    ```

### Database Log Files

Follow the steps below to download your database log files.

1. Navigate to the Site Dashboard and open the desired environment (Multidev, Dev, Test, or Live).

1. Click **Connection Info** and copy the **SFTP Command Line** command.

1. Edit and execute the command by replacing `appserver` with `dbserver`:

 From:

 ```bash{promptUser: user}
 sftp -o Port=2222 dev.de305d54-75b4-431b-adb2-eb6b9e546014@appserver.dev.de305d54-75b4-431b-adb2-eb6b9e546014.drush.in
 ```

 To:

 ```bash{promptUser: user}
 sftp -o Port=2222 dev.de305d54-75b4-431b-adb2-eb6b9e546014@dbserver.dev.de305d54-75b4-431b-adb2-eb6b9e546014.drush.in
 ```

1. Run the following SFTP command in terminal:

 ```none
 get -r logs
 ```

    You now have a local copy of the logs directory, which contains the following:

    ```none
    ├── logs
        └──mysqld-slow-query.log
        └──mysqld.log
    ```

## More Resources

- [Develop on Pantheon Directly with SFTP Mode](/sftp)
- [Using Git with SFTP & WordPress](/guides/wordpress-git/)