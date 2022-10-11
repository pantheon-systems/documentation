---
title: Log Files on Pantheon
subtitle: Access Logs with SFTP
description: Access your logs with SFTP on the Pantheon platform.
categories: [performance]
tags: [logs, measure]
contributors: [whitneymeredith]
layout: guide
permalink: docs/guides/logs-pantheon/access-logs
anchorid: access-logs
---

Logs are stored within application containers that house your site's codebase and files. [Add an SSH key](/ssh-keys) within your User Dashboard to enable passwordless access and avoid authentication prompts. Otherwise, provide your Pantheon Dashboard credentials when prompted.

In the Connection Information section of the dashboard, we can see a pattern about the hostnames:

```bash{promptUser: user}
<env>.<site-uuid>@<type>.<env>.<site-uuid>.drush.in
```

| Type         | Env                                     | Site UUID                                                                                                 |
|:------------ |:--------------------------------------- |:--------------------------------------------------------------------------------------------------------- |
| `appserver`  | `dev`, `test`, `live`, `<multidev-env>` | ex. `c5c75825-5cd4-418e-8cb0-fb9aa1a7f671`, as found in `https://dashboard.pantheon.io/sites/<site-uuid>` |
| `dbserver`   |                                         |                                                                                                           |
