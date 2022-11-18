---
title: Log Files on Pantheon
subtitle: Access Logs with SFTP
description: Access your logs through SFTP on the Pantheon platform.
categories: [performance]
tags: [logs, measure]
contributors: [whitneymeredith]
layout: guide
permalink: docs/guides/logs-pantheon/access-logs
anchorid: access-logs
---

This section provides information on how to use SFTP to access your logs on Pantheon.

Logs are stored within [application containers](/application-containers) that house your site's codebase and files.

1. Navigate to **Site Dashboard**, click **Dev**, and then click **Code**. 

1. Confirm your **Connection Mode** is set to SFTP.

1. Click **Connection Info** in the User Dashboard. You can review the connection information to gain an understanding of the pattern used for the hostnames: `<env>.<site-uuid>@<type>.<env>.<site-uuid>.drush.in`

    | Type         | Env                                     | Site UUID                                                                                                 |
    |:------------ |:--------------------------------------- |:--------------------------------------------------------------------------------------------------------- |
    | `appserver`  | `dev`, `test`, `live`, `<multidev-env>` | ex. `c5c75825-5cd4-418e-8cb0-fb9aa1a7f671`, as found in `https://dashboard.pantheon.io/sites/<site-uuid>` |
    | `dbserver`   |                                         |                                                                                                           |

    - You must [add an SSH key](/ssh-keys) within your User Dashboard if you want to enable password-less access and avoid authentication prompts.


### Application Log Files

Follow the steps below to download your application log files.

1. Navigate to the **Site Dashboard** and open the desired environment (Multidev, Dev, Test, or Live).

1. Click **Connection Info** and copy the **SFTP Command Line** command.

1. Open a terminal window and paste the SFTP connection command.

1. Run the following SFTP command in the terminal:

   ```none
   get -r logs
   ```

    You now have a local copy of the logs directory.

    The directory structure will resemble the example below:

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

1. Navigate to the **Site Dashboard** and open the desired environment (Multidev, Dev, Test, or Live).

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

1. Run the following SFTP command:

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
- [Terminus Guide](/terminus)