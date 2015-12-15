---
title: Scaling WordPress with MySQL Replication
description: Learn how to distribute requests to replica MySQL databases on WordPress using HyperDB.
---

Replica MySQL database configuration via the [HyperDB](https://wordpress.org/support/plugin/hyperdb) plugin is available only for WordPress sites on the [Elite service level](/resources/elite-plan-overview). [Contact sales](/pantheon-elite-plans) to inquire about our Elite plans.

## Advantages of MySQL Replication
Typical WordPress sites are limited to the capacity of a single database to serve read and write requests. As a result, high traffic sites can experience latency as requests are fulfilled. MySQL replication rapidly copies content from the "master" database to one or more "slave" databases. This allows you to spread requests across multiple databases to improve site performance and load times.

## About HyperDB
The [HyperDB](https://wordpress.org/support/plugin/hyperdb) plugin replaces the standard [`wpdb`](https://codex.wordpress.org/Class_Reference/wpdb) class so that WordPress is able to write and read from additional database servers. The drop-in plugin supports database replication, failover, load balancing, and partitioning — all tools for scaling WordPress.

Keep in mind, HyperDB is a powerful tool with several tuning options based on database architecture and network topology. Before you implement a complex configuration, it’s best to see if a simpler configuration suits your needs.

## Install and Configure HyperDB

Before you begin, your site service level must be changed to "Elite" by an Enterprise Onboarding Manager. The platform will automatically configure and manage your master and replica databases.

Download the archive of [HyperDB from the WordPress plugin repository](https://wordpress.org/support/plugin/hyperdb) and move the `db.php` file into the `/wp-content` directory. This is a drop-in plugin and does not require activation at any time.

Next, configure the master/slave databases within `db-config.php`. This file should be stored within the same directory as the site's `wp-config.php` file.

When the `db.php` database drop-in is deployed to production, WordPress will begin allocating MySQL database reads and writes based on the configuration details you’ve provided in `db-config.php`.

The following sample configurations can be used in place of the `dp-config.php` file provided within the plugin archive. These examples require no additional edits for sites running on Pantheon. For more advanced options, refer to the `db-config.php` file provided in the HyperDB plguin archive.

### Split Reads Between Master and Replica
Split reads between the master and the replica, to simply distribute the load between two servers.
<script src="http://gist-it.appspot.com/https://github.com/pantheon-systems/pantheon-settings-examples/blob/master/wordpress/split-reads.dbconfig.php?footer=minimal"></script>

### Pass Frontend Read Queries to Replica, WordPress Dashboard Reads and Writes to Master
Pass all front-end database read queries to the replica, leaving the master dedicated to WordPress dashboard reads and writes. This can better ensure WordPress dashboard availability during high front-end load.
<script src="http://gist-it.appspot.com/https://github.com/pantheon-systems/pantheon-settings-examples/blob/master/wordpress/master-write-replica-read.dbconfig.php?footer=minimal"></script>

Note: In this example, you’ll want [some form of cache fallback](/docs/articles/wordpress/installing-redis-on-wordpress/) if reads to the replica begin failing.

### Distributed Reads for Localization or Site Networks
For those scaling WordPress Multisite, one can allocate a collection of master servers amongst sites on the network. Sites A and B could use different MySQL masters, and continue to share the same codebase. This use-case is not yet possible on Pantheon. Secondary master database servers would need to be configured elsewhere.
