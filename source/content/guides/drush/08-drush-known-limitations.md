---
title: Drupal Drush Command-Line Utility on Pantheon
subtitle: Drush Known Limitations with Pantheon
description: Review known Drush limitations.
tags: [migrate, terminus, drush]
showtoc: true
permalink: docs/guides/drush/drush-known-limitations
contenttype: [guide]
innav: [false]
categories: [cli]
cms: [drupal]
audience: [development]
product: [--]
integration: [drush]
---

This section provides an overview of known Drush limitations on Pantheon.

## Crontab

Currently, there is no way to manage Crontab on Pantheon. You can use an external cron service such as [Easy Cron](https://www.easycron.com/user/register) if you need a way to set up your own Cron interval.

## Unsupported Commands

The following Drush commands are not supported and will not work on Pantheon sites:
- `sql-sync-pipe`. Use `sql-sync` instead.
- `sql-cli` (`sqlc`) and `sql-query` (`sqlq`). Refer to [Drush SQL Queries](/guides/drush/drush-sql-queries)
- `sql-sync` cannot currently be executed on the Live environment with more than 1 application container due to Pantheon's highly available architecture. We recommend you use Terminus or `sql-sync` on a Multidev, Dev or Test environment which only has 1 application container.
- `['uri']` may cause Drush to fail if the array key has a different domain than what is expected by Drupal, resulting in the following error:

 ```bash
 drush @pantheon.example.live  st
 Drush command terminated abnormally due to an unrecoverable error.       [error]
 ```

 Conditionally set `$uri` based on the environment in `drushrc.php` to resolve this error, such as:

 ```php
   if (isset($_ENV['PANTHEON_ENVIRONMENT']) &&
     ($_ENV['PANTHEON_ENVIRONMENT'] === 'live')) {
       $uri = 'https://www.example.com';
   }
   $options['uri'] = $uri;
 ```

 The most reliable locations to put `drushrc.php` files are:

 ```php
 __ROOT__/drush/drushrc.php
 __ROOT__/../drush/drushrc.php
 __ROOT__/sites/default/drushrc.php
 ```

## Cancelling Confirmation Prompts with Ctrl + c is not Supported

Attempting to cancel a Drush confirmation prompt using `ctrl+c` will send the default response to the server. This happens because SSH requires a PTY to correctly handle signals like `SIGINT` (`ctrl+c`), which is not supported on Pantheon.

## More Resources

- [MariaDB and MySQL on Pantheon](/guides/mariadb-mysql/mysql-workbench)
- [Cron for Drupal](/drupal-cron)
- [Configure Your Drupal Settings.php File](/guides/php/settings-php)