---
title: Backups
subtitle: Code Archives and Backup Log
description: Learn about your code archives and Backup Log.
tags: [backups, security]
innav: [false]
categories: [backup]
cms: [drupal, wordpress]
audience: [development]
product: [--]
integration: [--]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/backups/code-archives-backups-log
anchorid: code-archives-backups-log
contenttype: [guide]
---

This section provides information on your code archives and your Backup Log.

## Code Archives

Code archives contain your full remote Git repository and reflect the state of code for the given environment. Backups created on Test and Live environments automatically checkout the [`git tag`](https://git-scm.com/book/en/v2/Git-Basics-Tagging) associated with the most recent deployment.

You can use a free tool like [Sourcetree](https://www.sourcetreeapp.com/) to inspect the branches that the repo contains.

<Alert title="Note" type="info">

Pantheon provides default `.gitignore` files in the base of each site's code repository. This file includes the path `sites/default/files` for Drupal sites, and `wp-contents/uploads` for WordPress sites. You can use this file to exclude directories from version control and backups. Refer to Pantheon's upstreams for [WordPress](https://github.com/pantheon-systems/WordPress/blob/default/.gitignore), [Drupal 8](https://github.com/pantheon-systems/drops-8/blob/master/.gitignore), and [Drupal 7](https://github.com/pantheon-systems/drops-7/blob/master/.gitignore) to see the default `.gitignore` file.

</Alert>

## Backup Log

The Backup Log displays a list of existing backups for each environment. Recent logs are listed at the top. The backup components listed below can be downloaded and viewed individually.

- Code
- Databases
- Files

### Access Backup Log

1. [Go to the Site Dashboard](/guides/account-mgmt/workspace-sites-teams/sites#site-dashboard).

1. Click **Backups** and then click **Backup Log**.

1. Click the down arrow next to **Code**, **Database**, or **Files** to access the link for the offsite backup.

## More Resources

- [Pantheon Logs](/guides/logs-pantheon)
- [Fastly on Pantheon](/guides/fastly-pantheon)
- [Your Site Code on Pantheon](/pantheon-workflow#your-site-code-on-pantheon)