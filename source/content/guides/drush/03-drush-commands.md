---
title: Drupal Drush Command-Line Utility on Pantheon
subtitle: Use Drush Commands
description: Learn how to use Drush commands on your Pantheon site.
cms: "Drupal"
categories: [get-started]
tags: [migrate, terminus, drush]
layout: guide
showtoc: true
permalink: docs/guides/drush/drush-commands
anchorid: drush-commands
---

This section provides information on useful Drush commands to help you manage your site on Pantheon.

## Execute a Drush Command on a Pantheon Site Environment

Once you see the target site in the list of site aliases, you can execute a command on any remote site listed. The syntax is:  

```bash{promptUser: user}
drush @pantheon.SITENAME.ENV COMMAND
```

<Alert title="Warning" type="danger">

**Do not use Drush to update Drupal core on Pantheon**. Pantheon uses Pressflow and includes some additional functionality; Drush assumes that a site is using vanilla Drupal and erroneously overwrites Pressflow. For more details, see [Core Updates](/core-updates).

</Alert>

### Registry Rebuild

<Alert title="Note" type="info" >

[Registry Rebuild](https://www.drupal.org/project/registry_rebuild) is [deprecated](https://www.drupal.org/project/registry_rebuild/issues/1785672) for Drupal 9 and will only work on Drupal 7.

</Alert>

Drupal's list of PHP classes and files can get corrupted or out-of-date, typically when moving code. If clearing the cache doesn't resolve the issue due to a required class during bootstrap, the registry may need to be rebuilt. To facilitate this, Pantheon has installed [`registry_rebuild`](https://drupal.org/project/registry_rebuild) as an available Drush command on every site, which can be executed via [Terminus](/terminus).

**Do not attempt to install the module on your site.** This command is provided as-is, without warranty, so make a backup first.  

```bash{promptUser: user}
terminus drush <site>.<env> -- rr
```

Note that the Registry Rebuild command is only necessary on Drupal 7 sites. The command `drush cache:rebuild` for Drupal 9 serves the same function that `registry rebuild` does for older versions of Drupal.

## Filter Drush Responses

Use the `--filter` command to extract relevant information from `terminus drush` responses.

For example, to get the line containing information about your installed version of PHP from the Drupal status report page:

```bash{outputLines:2-7}
terminus drush mysite.env -- core:requirements --filter='title=php'
+-------+----------+--------------------------------------------------+
| Title | Severity | Summary                                          |
+-------+----------+--------------------------------------------------+
| PHP   | Info     | 7.3.14 (<a href="/admin/reports/status/php">more |
|       |          | information</a>)                                 |
+-------+----------+--------------------------------------------------+
```

To extract just the `Summary` field without any of the table formatting, add `--field=Summary` to the end of the command, and the result would be a simple string:

```bash{outputLines:2}
terminus drush <site>.<env> -- core-cli
7.3.14 (<a href="/admin/reports/status/php">more information</a>)
```

## Drush Commands That Alter Site Code

Commands that alter site code, such as pm-download (dl), will only work on a Dev environment that has been set to [SFTP mode](/sftp) from the Pantheon Dashboard.

## Add Custom Drush Commands

While we have the full spectrum of Drush core already available for your use, you may want to add a command that you regularly use; for instance, [Drush Search and Replace (sar)](https://www.drupal.org/project/sar).

1. Put the site in Git mode.
1. Clone locally.
1. Create a `drush` folder in the Drupal root.
1. Add the `sar` Drush command to the Drush folder.
1. Commit `drush/sar`.
1. Push your code up to Pantheon.
1. Clear your Drush cache on each environment. Example:

  ```bash{promptUser: user}
  drush @pantheon.SITENAME.dev cc drush
  ```

For Drupal 9, place Drush commands in `drush/Commands`.

## More Resources

- [Developing on Pantheon Directly with SFTP Mode](/sftp)
- [Drupal 9](/drupal-9)