---
title: Identify and Kill Queries with MySQL Command-Line Tool
description: Learn how to identify and kill long-running MySQL queries on your WordPress or Drupal site in a few commands.
keywords: mysql, mysql query, mysql queries, kill query, kill queries, kill mysql, kill mysql queries, queries, query, debug mysql, debug, mysql error, kill all queries, kill all mysql queries, kill all mysql
---
Long-running MySQL queries keep other transactions from accessing the necessary tables to execute a request, leaving your users on hold. To kill these queries, you'll need to [Access the appropriate environment's MySQL Database](/docs/accessing-mysql-databases).

## Identify Long-Running Queries
After successfully creating a local MySQL connection to the site's database, run the following command to show a list of active threads:
```
show processlist;
```
Review the `Time` field to identify the longest running query and run the following command to kill it:
```
kill <thread_id>;
```
<div class="alert alert-info" role="alert">
<h4>Note</h4>
Replace <code>&lt;thread_id&gt;</code> with the ID of the query you want to terminate.
</div>

## Kill All Queries
If a large number of bad requests are blocking valid queries, you can clear them out without having to run `kill` on every individual thread.

Execute the following to generate `kill` commands from the `PROCESSLIST` table:
```
mysql> SELECT GROUP_CONCAT(CONCAT('KILL ',id,';') SEPARATOR ' ') 'Paste the following query to kill all processes' FROM information_schema.processlist WHERE user<>'system user'\G
```
Copy the provided query in the output and run as instructed.

## See Also
- [Access MySQL Databases](/docs/accessing-mysql-databases)
- [Database Connection Errors](/docs/database-connection-errors)
- [MySQL Slow Log](/docs/mysql-slow-log/)
- [MySQL Troubleshooting with New Relic Pro](/docs/mysql-troubleshooting-with-new-relic-pro/)
- [Converting MySQL Tables From MyISAM to InnoDB](/docs/myisam-to-innodb/)
