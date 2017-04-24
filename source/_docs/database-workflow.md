---
title: Database Workflow Tool
description: Learn about the database that runs in your Pantheon Drupal or WordPress site.
tags: [services, dashboard, workflow]
categories: []
---
The Pantheon platform provides each site environment with a dedicated MySQL container running [MariaDB](http://en.wikipedia.org/wiki/MariaDB) that can be maintained remotely or locally. For a comprehensive list of MySQL settings, [access your database](/docs/mysql-access/#database-connection-information) and use the [SHOW VARIABLES](http://dev.mysql.com/doc/refman/5.0/en/show-variables.html) statement.

Using the tools in the Database / Files tab, you can overwrite the databases on your site's Dev or Test environment with the database on your Live environment, allowing you to pull content from Live in to other environments.
![Workflow Tool](/source/docs/assets/images/dashboard/interface-workflow-tool.png)
<div class="alert alert-danger"><h4 class="info">Warning</h4>
<p>Pushing content up to Live should almost never be done to a launched site, as it can overwrite the environment configurations. See <a href="/docs/pantheon-workflow/">Using the Pantheon Workflow</a>. </p></div>

## MySQL Clients
You can use any number of MySQL clients such as [MySQL Workbench](http://dev.mysql.com/downloads/tools/workbench/), [Sequel Pro](http://www.sequelpro.com/download), [Navicat](http://www.navicat.com/download), [PHPMyAdmin](https://www.phpmyadmin.net/), and others to  administer your site's database
and [manage configurations](/docs/pantheon-workflow/#configuration-management) as needed.

## Cloning the Database
Cloning relies on mysqldump, which needs a point-in-time snapshot. We recommend using the `--single-transaction` flag, which will use transactions to get a point-in-time snapshot without locking the DB. However, only the InnoDB database engine supports transactions. On MyISAM, the table needs to be locked. On small DBs this is not an issue, but could be for larger DBs. We also use the `--quick option`, which reduces the time it would take for large tables. For more information, see [Converting MySQL Tables From MyISAM to InnoDB](/docs/myisam-to-innodb/) and [Run MySQL Dump Without Locking Tables](http://stackoverflow.com/questions/104612/run-mysqldump-without-locking-tables).

## Wipe Database and Files
Use this tool if you need to completely wipe your database and files for a single environment. Wiping completely resets the database and files, and you will lose all content for that specific environment. For example, if you wipe the Dev environment, Test and Live are not affected. You will then need to import the database and files from a backup, clone them from another environment, or re-install Drupal or WordPress for that environment.

Learn more about the [Pantheon Workflow](/docs/pantheon-workflow/).

## Troubleshooting
### WordPress Content References the Wrong Domain After Cloning
WordPress sites with custom domains configured on multiple environments may see references to the wrong platform domain after cloning the database from one environment to another.

The Site Dashboard runs `wp search-replace` during the cloning workflow to update environment URLs automatically. This operation, however, only runs once on a single set of URLs. If the target environment has a custom domain (e.g `test.example.com`), it's used to replace the source environment's custom domain (e.g. `www.example.com`). This can cause the target environment to have incorrect references to platform domains (e.g. `live-example.pantheonsite.io`).

To resolve this issue, use [Terminus](/docs/terminus) to run an additional `wp search-replace` command on the target environment after cloning:
```
terminus remote:wp <env>.<site> -- search-replace '://live-example.pantheonsite.io' '://test.example.com' --all-tables --verbose
```

The following example also converts the URL from HTTP to HTTPS, for situations where you might have HTTPS in one environment and not another:

```
terminus remote:wp <env>.<site> -- search-replace 'https://live-example.pantheonsite.io' 'http://test.example.com' --all-tables --verbose
```

### Base table or view not found
Database errors may occur during a database clone, import or while wiping the environment. In most cases, the error contains `semaphore' doesn't exist` and is generated because the site is accessed before a certain database operation is complete. Simply waiting for database operations to complete resolves the error.

However, Drupal 7 sites using the configuration override system to enable CSS aggregation and compression (`$conf['preprocess_css'] = 1;`) will see the following error after wiping an environment:
```
Additional uncaught exception thrown while handling exception.

Original

PDOException: SQLSTATE[42S02]: Base table or view not found: 1146 Table &#039;pantheon.variable&#039; doesn&#039;t exist: SELECT 1 AS expression FROM {variable} variable WHERE ( (name = :db_condition_placeholder_0) ); Array ( [:db_condition_placeholder_0] =&gt; drupal_css_cache_files ) in variable_set() (line 1265 of /srv/bindings/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/code/includes/bootstrap.inc).

Additional

PDOException: SQLSTATE[42S02]: Base table or view not found: 1146 Table &#039;pantheon.variable&#039; doesn&#039;t exist: SELECT 1 AS expression FROM {variable} variable WHERE ( (name = :db_condition_placeholder_0) ); Array ( [:db_condition_placeholder_0] =&gt; drupal_css_cache_files ) in variable_set() (line 1265 of /srv/bindings/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/code/includes/bootstrap.inc).
```

You can fix this issue by wrapping the configuration logic within a conditional statement in `settings.php`:

```php
if (!function_exists('install_drupal')) {
  $conf['preprocess_css'] = 1;
}
```

## See Also
- [MySQL Troubleshooting with New Relic Pro](/docs/debug-mysql-new-relic/)
- [MySQL Slow Log](/docs/mysql-slow-log/)
- [Converting MySQL Tables from MyISAM to InnoDB](/docs/myisam-to-innodb/)
- [Database Connection Errors](/docs/database-connection-errors/)
