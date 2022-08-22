---
title: MariaDB and MySQL on Pantheon
subtitle: Identify and Kill Queries with MySQL Command-Line Tool
description: Learn how to identify and kill long-running MySQL queries on your WordPress or Drupal site.
categories: [troubleshoot]
tags: [cli, database]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/mariadb-mysql/kill-mysql-queries
anchorid: kill-mysql-queries
---

This section provides information on how to identify and kill queries with MySQL Command-Line Tool.

Long-running MySQL queries prevent other transactions from accessing the necessary tables to execute a request, leaving your users on hold. You can [access the environment's MySQL database](/guides/mariadb-mysql/mysql-access) to kill these queries.

<Enablement title="Ramp up website performance" link="/docs/workshops?c=lw4">

Make your site faster. Check out our free on-demand training, where you'll learn about caching pages with our Advanced CDN, our Redis backend cache, and see how to use New Relic&reg; Performance Monitoring for monitoring performance.

</Enablement>

## Identify Long-Running Queries

1. Create a local [MySQL connection](/guides/mariadb-mysql/mysql-access#accessing-the-database-directly) to the site's database.

1. Run the following command to show a list of active threads:

    ```sql
    mysql> show processlist;
    ```

1. Review the `Time` field to identify the longest running query.

1. Run the following command to kill the query. In the example below, replace `<thread_id>` with the ID of the query you want to terminate:

    ```sql
    mysql> kill <thread_id>;
    ```

## Kill All Queries

You can clear out a large number of bad requests without having to run `kill` on each individual thread if they are blocking valid queries.

1. Navigate to the `PROCESSLIST` table.

1. Execute the following to generate `kill` commands:

    ```sql
    mysql> SELECT GROUP_CONCAT(CONCAT('KILL ',id,';') SEPARATOR ' ') 'Paste the following query to kill all processes' FROM information_schema.processlist WHERE user<>'system user'\G
    ```

1. Copy the provided query in the output and run as instructed.

## Next Steps

### Troubleshoot With New Relic&reg; Performance Monitoring

Take a look at [MySQL Troubleshooting with New Relic&reg; Performance Monitoring](/guides/new-relic/debug-mysql-new-relic) to get a better view of what's happening with your queries. Using our integrated reporting services with New Relic&reg; Performance Monitoring, you can isolate MySQL performance issues on your Drupal or WordPress sites.

### Review Slow Query Logs

Use your site's [MySQL Slow Log](/guides/mariadb-mysql/mysql-slow-log) to troubleshoot MySQL and identify serious performance issues.

### Enable Redis

Most website frameworks like Drupal and WordPress use the database to cache internal application objects which can be expensive to generate (menu trees, filter results, etc.), and to keep cached page content. Because the database also handles many queries for normal page requests, it is the most common bottleneck causing increased load-times.

[Object Cache](/object-cache) provides an alternative caching backend. It takes caching work off the database, which is vital for scaling to a larger number of logged-in users. It also provides a number of other features for developers looking to use it to manage queues, or do custom caching of their own.

### Consider MySQL Replication (WordPress)
[MySQL replication](/guides/mariadb-mysql/hyperdb) rapidly copies content from the primary database to a replica database. This allows you to spread requests across multiple databases to improve site performance and load times.

## More Resources

- [Access MySQL Databases](/guides/mariadb-mysql/mysql-access)

- [Database Connection Errors](/database-connection-errors)

- [MySQL Slow Log](/guides/mariadb-mysql/mysql-slow-log)

- [MySQL Troubleshooting with New Relic Performance Monitoring](/guides/new-relic/debug-mysql-new-relic)

- [Converting MySQL Tables From MyISAM to InnoDB](/guides/mariadb-mysql/myisam-to-innodb)