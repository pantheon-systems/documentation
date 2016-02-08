---
title: Scaling WordPress with MySQL Replicas and HyperDB
description: Learn how to distribute requests to replica MySQL databases on WordPress using HyperDB.
---

<div class="alert alert-info">
<h4>Note</h4>
Replica MySQL databases are available for sites on the <a href="https://pantheon.io/resources/elite-plan-overview">Elite service level</a>. <a href="https://pantheon.io/pantheon-elite-plans">Contact sales</a> to inquire about our Elite plans.
</div>

## Advantages of MySQL Replication
Typical WordPress sites are limited to the capacity of a single database to serve read and write requests. As a result, high traffic sites can experience latency as requests are fulfilled. MySQL replication rapidly copies content from the "master" database to one or more "replica" databases. This allows you to spread requests across multiple databases to improve site performance and load times.

## About HyperDB
The [HyperDB](https://wordpress.org/support/plugin/hyperdb) plugin replaces the standard [`wpdb`](https://codex.wordpress.org/Class_Reference/wpdb) class so that WordPress is able to write and read from additional database servers. The drop-in plugin supports database replication, failover, load balancing, and partitioning — all tools for scaling WordPress.

Keep in mind, HyperDB is a powerful tool with several tuning options based on database architecture and network topology. Before you implement a complex configuration, it’s best to see if a simpler configuration suits your needs.

## Install and Configure HyperDB

Before you begin, an Enterprise Onboarding Manager must change your site service level to "Elite". The platform will automatically configure and manage your master and replica databases.

Download the archive of [HyperDB from the WordPress plugin repository](https://wordpress.org/support/plugin/hyperdb) and move the `db.php` file into the `/wp-content` directory. This is a drop-in plugin and does not require activation at any time.

Next, configure the master/replica databases within `db-config.php`. This file should be stored within the same directory as the site's `wp-config.php` file.

When the `db.php` database drop-in is deployed to production, WordPress will begin allocating MySQL database reads and writes based on the configuration details you’ve provided in `db-config.php`.

The following sample configurations can be used in place of the `dp-config.php` file provided within the plugin archive. These examples require no additional edits for sites running on Pantheon. For more advanced options, refer to the `db-config.php` file provided in the HyperDB plguin archive.

### Split Reads Between Master and Replica
Split reads between the master and the replica, to simply distribute the load between two servers.
<script src="//gist-it.appspot.com/https://github.com/pantheon-systems/pantheon-settings-examples/blob/master/wordpress/split-reads.dbconfig.php?footer=minimal"></script>

### Pass Frontend Read Queries to Replica, WordPress Dashboard Reads and Writes to Master
Pass all front-end database read queries to the replica, leaving the master dedicated to WordPress dashboard reads and writes. This can better ensure WordPress dashboard availability during high front-end load.
<script src="//gist-it.appspot.com/https://github.com/pantheon-systems/pantheon-settings-examples/blob/master/wordpress/master-write-replica-read.dbconfig.php?footer=minimal"></script>

In this example, you’ll want [some form of cache fallback](/docs/articles/wordpress/installing-redis-on-wordpress/) if reads to the replica begin failing.
