---
title: Backups Tool
subtitle: Code Archives and Backups Log
description: Learn about your code archives and Backups log.
tags: [backups, security]
innav: [true]
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

This section provides information on your code archives and your Backups log.

## About Your Code Archives
Code archives contain the full remote Git repository and reflect the state of code for the given environment. Backups created on the Test and Live environments automatically checkout the [`git tag`](https://git-scm.com/book/en/v2/Git-Basics-Tagging) associated with the most recent deployment.

For a clear visual of the Git repo contents, you can use a free tool like [Sourcetree](https://www.sourcetreeapp.com/) to inspect the branches that the repo contains.

<Alert title="Note" type="info">

The `.gitignore` file determines paths ignored by version control and consequently excluded in code archives. To see the default `.gitignore` file refer to Pantheon's upstreams for [WordPress](https://github.com/pantheon-systems/WordPress/blob/default/.gitignore), [Drupal 8](https://github.com/pantheon-systems/drops-8/blob/master/.gitignore), and [Drupal 7](https://github.com/pantheon-systems/drops-7/blob/master/.gitignore).

</Alert>

## Backup Log
The backup log displays a list of existing backups for that environment. You can also create a new backup or restore your site from an existing backup.
