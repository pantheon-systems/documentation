---
title: Identify and Kill Queries with MySQL Command-Line Tool
description: Learn how to identify and kill long-running MySQL queries on your WordPress or Drupal site in a few commands.
tags: [debugdb]
categories: []
---
Long-running MySQL queries keep other transactions from accessing the necessary tables to execute a request, leaving your users on hold. To kill these queries, you'll need to [access the environment's MySQL Database](/docs/mysql-access).

<Enablement title="Agency DevOps Training" link="https://pantheon.io/agencies/learn-pantheon?docs">

Tune your site (or sites!) for optimal performance with help from the experts at Pantheon. We deliver custom workshops to help development teams master the platform and build awesome websites.

</Enablement>

## Identify Long-Running Queries
After successfully creating a local MySQL connection to the site's database, run the following command to show a list of active threads:

```
show processlist;
```

Review the `Time` field to identify the longest running query and run the following command to kill it:

```
kill <thread_id>;
```

<Alert title="Note" type="info">

Replace `<thread_id>` with the ID of the query you want to terminate.

</Alert>

## Kill All Queries
If a large number of bad requests are blocking valid queries, you can clear them out without having to run `kill` on every individual thread.

Execute the following to generate `kill` commands from the `PROCESSLIST` table:

```
mysql> SELECT GROUP_CONCAT(CONCAT('KILL ',id,';') SEPARATOR ' ') 'Paste the following query to kill all processes' FROM information_schema.processlist WHERE user<>'system user'\G
```

Copy the provided query in the output and run as instructed.

## See Also
- [Access MySQL Databases](/docs/mysql-access)
- [Database Connection Errors](/docs/database-connection-errors)
- [MySQL Slow Log](/docs/mysql-slow-log/)
- [MySQL Troubleshooting with New Relic Pro](/docs/debug-mysql-new-relic/)
- [Converting MySQL Tables From MyISAM to InnoDB](/docs/myisam-to-innodb/)
