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

1. Navigate to your **User Dashboard** and enter your Pantheon Dashboard credentials when prompted.

    - You must [add an SSH key](/ssh-keys) within your User Dashboard if you want to enable password-less access and avoid authentication prompts.

1. Click **Connection Info** in the User Dashboard. You can review the connection information to gain an understanding of the pattern used for the hostnames:

    | Type         | Env                                     | Site UUID                                                                                                 |
    |:------------ |:--------------------------------------- |:--------------------------------------------------------------------------------------------------------- |
    | `appserver`  | `dev`, `test`, `live`, `<multidev-env>` | ex. `c5c75825-5cd4-418e-8cb0-fb9aa1a7f671`, as found in `https://dashboard.pantheon.io/sites/<site-uuid>` |
    | `dbserver`   |                                         |                                                                                                           |

1. Run the command below, replacing `env` and `site-uuid` with the correct connection information listed in the dashboard.

    ```bash{promptUser: user}
    <env>.<site-uuid>@<type>.<env>.<site-uuid>.drush.in
    ```

## Environment Code Log

You can also view the code log for each environment using Terminus.

1. Navigate to Terminus and authenticate your account with [machine tokens](/machine-tokens) or your Pantheon Dashboard credentials. For example:

    Replace `MACHINE TOKEN` and `EMAIL` with your machine token and email address.

    ```bash{promptUser: user}
    terminus auth:login --machine-token MACHINE-TOKEN --email EMAIL
    ```

1. Run the command below, replacing `site` and `env` with your site's name and the correct environment.

    ```bash{promptUser: user}
    env:code-log <site>.<env> 
    ```

## More Resources

- [Develop on Pantheon Directly with SFTP Mode](/sftp)
- [Using Git with SFTP & WordPress](/guides/wordpress-git/)
- [Terminus Manual](/terminus)