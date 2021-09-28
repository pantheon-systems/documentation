---
title: Identify and Kill Queries with MySQL Command-Line Tool
description: Learn how to identify and kill long-running MySQL queries on your WordPress or Drupal site in a few commands.
categories: [troubleshoot]
tags: [cli, database]
reviewed: "2020-10-28"
---
Long-running MySQL queries keep other transactions from accessing the necessary tables to execute a request, leaving your users on hold. To kill these queries, you'll need to [access the environment's MySQL database](/mysql-access).

<Enablement title="Ramp up website performance" link="https://pantheon.io/workshops/website-performance-varnish-redis-and-new-relic?docs">

Make your site faster. Check out our free on-demand training, where you'll learn about caching pages with our Advanced CDN, our Redis backend cache, and see how to use New Relic&reg; Performance Monitoring for monitoring performance.

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

## Next Steps

### Troubleshoot With New Relic&reg; Performance Monitoring

To get a better view of what's happening with your queries, take a look at [MySQL Troubleshooting with New Relic&reg; Performance Monitoring](/debug-mysql-new-relic). Using our integrated reporting services with New Relic&reg; Performance Monitoring, you can isolate MySQL performance issues on your Drupal or WordPress sites.

### Review Slow Query Logs

Use your site's [MySQL Slow Log](/mysql-slow-log) to troubleshoot MySQL and identify serious performance issues.

### Enable Redis

Most website frameworks like Drupal and WordPress use the database to cache internal application "objects" which can be expensive to generate (menu trees, filter results, etc.), and to keep cached page content. Since the database also handles many queries for normal page requests, it is the most common bottleneck causing increased load-times.

[Redis](/object-cache) provides an alternative caching backend, taking that work off the database, which is vital for scaling to a larger number of logged-in users. It also provides a number of other nice features for developers looking to use it to manage queues, or do custom caching of their own.

### Consider MySQL Replication (WordPress)

Typical WordPress sites are limited to the capacity of a single database to serve read and write requests. As a result, high traffic sites can experience latency as requests are fulfilled. [MySQL replication](/hyperdb) rapidly copies content from the "master" database to one or more "replica" databases. This allows you to spread requests across multiple databases to improve site performance and load times.

## See Also

- [Access MySQL Databases](/mysql-access)
- [Database Connection Errors](/database-connection-errors)
- [MySQL Slow Log](/mysql-slow-log)
- [MySQL Troubleshooting with New Relic&reg; Performance Monitoring](/debug-mysql-new-relic)
- [Converting MySQL Tables From MyISAM to InnoDB](/myisam-to-innodb)
