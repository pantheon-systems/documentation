---
title: Identify and Kill Queries with MySQL Command-Line Tool
description: Learn how to identify and kill long-running MySQL queries on your WordPress or Drupal site in a few commands.
tags: [debugdb]
categories: [develop,troubleshoot]
reviewed: "2020-02-05"
---
Long-running MySQL queries keep other transactions from accessing the necessary tables to execute a request, leaving your users on hold. To kill these queries, you'll need to [access the environment's MySQL Database](/mysql-access).

<Enablement title="Web Team Agility Assessment" link="https://pantheon.io/web-team-agility-assessment?docs">

How mature is your web team? Take our Web Team Agility Assessment to find out.

</Enablement>

## Identify Long-Running Queries

After successfully creating a local MySQL connection to the site's database, run the following command to show a list of active threads:

```sql
mysql> show processlist;
```

Review the `Time` field to identify the longest running query and run the following command to kill it. In the example below, replace `<thread_id>` with the ID of the query you want to terminate:

```sql
mysql> kill <thread_id>;
```

## Kill All Queries

If a large number of bad requests are blocking valid queries, you can clear them out without having to run `kill` on every individual thread.

Execute the following to generate `kill` commands from the `PROCESSLIST` table:

```sql
mysql> SELECT GROUP_CONCAT(CONCAT('KILL ',id,';') SEPARATOR ' ') 'Paste the following query to kill all processes' FROM information_schema.processlist WHERE user<>'system user'\G
```

Copy the provided query in the output and run as instructed.

## See Also

- [Access MySQL Databases](/mysql-access)
- [Database Connection Errors](/database-connection-errors)
- [MySQL Slow Log](/mysql-slow-log)
- [MySQL Troubleshooting with New Relic Pro](/debug-mysql-new-relic)
- [Converting MySQL Tables From MyISAM to InnoDB](/myisam-to-innodb)
