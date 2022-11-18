---
title: Drupal Drush Command-Line Utility on Pantheon
subtitle: Drush Commands
description: Learn how to use Drush commands on your Pantheon site.
cms: "Drupal"
tags: [migrate, terminus, drush]
layout: guide
showtoc: true
permalink: docs/guides/drush/drush-commands
anchorid: drush-commands
contenttype: guide
categories: []
newcms: [drupal]
audience: [development]
product: []
integration: []

---

This section provides information on useful Drush commands to help you manage your site on Pantheon.

## Execute a Drush Command on a Pantheon Site Environment

You can execute a command on any remote site that you see in the list of site aliases. Refer to [Drush Aliases](/guides/drush/drush-aliases) for more information. The syntax is:

```bash{promptUser: user}
drush @pantheon.SITENAME.ENV COMMAND
```

<Alert title="Warning" type="danger">

**Do not use Drush to update Drupal core on Pantheon**. Pantheon uses Pressflow and includes some additional functionality. This conflict with Drush, which assumes that a site is using vanilla Drupal and erroneously overwrites Pressflow. Refer to [Core Updates](/core-updates) for more information.

</Alert>

## Registry Rebuild

<Alert title="Note" type="info" >

[Registry Rebuild](https://www.drupal.org/project/registry_rebuild) is [deprecated](https://www.drupal.org/project/registry_rebuild/issues/1785672) for Drupal 9, but can still be used on Drupal 7.

</Alert>

Drupal's list of PHP classes and files can become corrupted or out-of-date, typically when moving code. If clearing the cache doesn't resolve the issue due to a required class during bootstrap, the registry may need to be rebuilt. Pantheon has installed [`registry_rebuild`](https://drupal.org/project/registry_rebuild) as an available Drush command on every site, which can be executed via [Terminus](/terminus).

**Do not attempt to install the module on your site.** This command is provided as-is and without warranty. You must create a [backup](/backups) before continuing.

```bash{promptUser: user}
terminus drush <site>.<env> -- rr
```

### Drupal 7

Use the `registry rebuild` command for Drupal 7 and older versions of Drupal.

### Drupal 9

Use the `drush cache:rebuild` command for Drupal 9. This command serves the same function that as the `registry rebuild` command for older Drupal versions.

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

You can add `--field=Summary` to the end of the command to extract only the `Summary` field without any of the table formatting. The result is a simple string:

```bash{outputLines:2}
terminus drush <site>.<env> -- core-cli
7.3.14 (<a href="/admin/reports/status/php">more information</a>)
```

## Drush Commands That Alter Site Code

You must set your Dev environment to [SFTP mode](/sftp) in the Pantheon Dashboard to use commands that alter site code, such as `pm-download (dl)`.

## Add Custom Drush Commands

Drush core commands are available for your use, but you can also add a command that you regularly use, for example, [Drush Search and Replace (sar)](https://www.drupal.org/project/sar).

1. Set your Development Mode to Git in the Dev environment.
1. Clone locally.
1. Create a `drush` folder in the Drupal root.
1. Add the `sar` Drush command to the Drush folder.
1. Commit `drush/sar`.
1. Push your code to Pantheon.
1. Clear your Drush cache on each environment. Example:

  ```bash{promptUser: user}
  drush @pantheon.SITENAME.dev cc drush
  ```

You should place Drush commands in `drush/Commands` if using Drupal 9.

## More Resources

- [Developing on Pantheon Directly with SFTP Mode](/sftp)
- [Drupal 9](/drupal-9)