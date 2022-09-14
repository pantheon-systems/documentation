---
title: Drupal Drush Command-Line Utility on Pantheon
subtitle: Drush Known Limitation with Pantheon
description: Review known Drush limitations. 
cms: "Drupal"
categories: [get-started]
tags: [migrate, terminus, drush]
layout: guide
showtoc: true
permalink: docs/guides/drush/drush-known-limitations
anchorid: drush-known-limitations
---

This section provides an overview of known Drush limitations on Pantheon.

- Crontab: Currently, there is no way to manage Crontab on Pantheon. If you need a way to set up your own Cron interval, you can use an external cron service such as [Easy Cron](https://www.easycron.com/user/register).
- The following Drush commands are not supported and will not work on Pantheon sites:
  - `sql-sync-pipe`. Use `sql-sync` instead.
  - `sql-cli` (`sqlc`) and `sql-query` (`sqlq`) See: [Run SQL Queries Using Drush on Pantheon](#run-sql-queries-using-drush-on-pantheon)
- Due to our highly available architecture, Drush `sql-sync` cannot currently be executed on the live environment with more than 1 application container. We recommend you use terminus or `sql-sync` a multidev, dev or test environment which only has 1 application container.
- Drush may fail if the `['uri']` array key has a different domain than what is expected by Drupal, resulting in the following error:

 ```bash
 drush @pantheon.example.live  st
 Drush command terminated abnormally due to an unrecoverable error.       [error]
 ```

 To resolve this error, conditionally set `$uri` based on the environment in `drushrc.php`, such as:

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

## More Resources

- [MariaDB and MySQL on Pantheon](/guides/mariadb-mysql/mysql-workbench)
- [Cron for Drupal](/drupal-cron)