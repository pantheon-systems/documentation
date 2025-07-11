---
title: MariaDB and MySQL on Pantheon
subtitle: Database Workflow Tool
description: Learn about the database that runs in your Pantheon site.
contenttype: [guide]
innav: [false]
categories: [database]
cms: [--]
audience: [development]
product: [--]
integration: [--]
tags: [dashboard, database, workflow]
showtoc: true
permalink: docs/guides/mariadb-mysql/database-workflow-tool
---

This section provides information on the database workflow tool for Pantheon sites.

The Pantheon platform provides each site environment with a dedicated MySQL container that runs [MariaDB](https://en.wikipedia.org/wiki/MariaDB). This container can be maintained remotely or locally. For a comprehensive list of MySQL settings, [access your database](/guides/mariadb-mysql/mysql-access/#database-connection-information) and use the [SHOW VARIABLES](https://dev.mysql.com/doc/refman/5.7/en/show-variables.html) statement.

You can use the tools in the Database / Files tab to overwrite the databases on your site's Dev or Test environment with the database on your Live environment. This allows you to pull content from Live in to other environments.

![Workflow Tool](../../../images/dashboard/new-dashboard/2024/_interface-workflow-tool.png)

<Alert title="Warning" type="danger">

Pushing content up to Live should almost never be done to a launched site, as it can overwrite the environment configurations. Refer to [Using the Pantheon Workflow](/pantheon-workflow) for more information.

</Alert>

## MySQL Clients
You can use any number of MySQL clients to administer your site's database and [manage configurations](/pantheon-workflow/#configuration-management), such as:

- [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)
- [Sequel Ace (formerly Sequel Pro)](https://sequel-ace.com/)
- [Navicat](https://www.navicat.com/download)
- [PHPMyAdmin](https://www.phpmyadmin.net/)

## Cloning the Database
Cloning relies on mysqldump, which needs a point-in-time snapshot. We recommend using the `--single-transaction` flag, which will use transactions to get a point-in-time snapshot without locking the database. However, only the InnoDB database engine supports transactions. On MyISAM, the table must be locked. On small databases this is not an issue, but could be for larger databases. We also use the `--quick option`, which reduces the time it would take for large tables. For more information, refer to [Converting MySQL Tables From MyISAM to InnoDB](/guides/mariadb-mysql/myisam-to-innodb) and [Run MySQL Dump Without Locking Tables](https://stackoverflow.com/questions/104612/run-mysqldump-without-locking-tables).

## Wipe Database and Files
Use this tool if you need to completely wipe your database and files for a single environment. Wiping completely resets the database and files, and you will lose all content for that specific environment. For example, if you wipe the Dev environment, Test and Live are not affected. You will then need to import the database and files from a backup, clone them from another environment, or re-install Drupal or WordPress for that environment.

Learn more about the [Pantheon Workflow](/pantheon-workflow).

## Troubleshooting

### WordPress Content References the Wrong Domain After Cloning

<Partial file="search-replace-domains.md" />

### Base table or view not found

Database errors may occur during a database clone, import, or while wiping the environment. In most cases, the error contains `semaphore' doesn't exist` and is generated because the site is accessed before a certain database operation is complete. Simply waiting for database operations to complete resolves the error.

However, Drupal 7 sites using the configuration override system to enable CSS aggregation and compression (`$conf['preprocess_css'] = 1;`) will see the following error after wiping an environment:

```sql
Additional uncaught exception thrown while handling exception.

Original

PDOException: SQLSTATE[42S02]: Base table or view not found: 1146 Table &#039;pantheon.variable&#039; doesn&#039;t exist: SELECT 1 AS expression FROM {variable} variable WHERE ( (name = :db_condition_placeholder_0) ); Array ( [:db_condition_placeholder_0] => drupal_css_cache_files ) in variable_set() (line 1265 of /srv/bindings/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/code/includes/bootstrap.inc).

Additional

PDOException: SQLSTATE[42S02]: Base table or view not found: 1146 Table &#039;pantheon.variable&#039; doesn&#039;t exist: SELECT 1 AS expression FROM {variable} variable WHERE ( (name = :db_condition_placeholder_0) ); Array ( [:db_condition_placeholder_0] => drupal_css_cache_files ) in variable_set() (line 1265 of /srv/bindings/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/code/includes/bootstrap.inc).
```

You can fix this issue by wrapping the configuration logic within a conditional statement in `settings.php`:

```php
if (!function_exists('install_drupal')) {
  $conf['preprocess_css'] = 1;
}
```

<Partial file="ssh-ServerAliveInterval.md" />

## More Resources
- [MySQL Troubleshooting with New Relic&reg; Performance Monitoring](/guides/new-relic/debug-mysql-new-relic)
- [MySQL Slow Log](/guides/mariadb-mysql/mysql-slow-log)
- [Converting MySQL Tables from MyISAM to InnoDB](/guides/mariadb-mysql/myisam-to-innodb)
- [Database Connection Errors](/guides/mariadb-mysql/database-connection-errors)
