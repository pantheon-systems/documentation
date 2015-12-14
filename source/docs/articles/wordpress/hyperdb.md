---
title: Using HyperDB to Scale WordPress sites
description: Learn how to configure WordPress sites to read from a replica database and write to the primary database.
---

[HyperDB](https://wordpress.org/support/plugin/hyperdb) is currently only usable by sites on the [Elite service level](/resources/elite-plan-overview). Please [contact sales](/pantheon-elite-plans) to inquire about our Elite plans. The Replica databases HyperDB uses are automatically added when the site service-level is changed to "Elite" by an Enterprise Onboarding Manager.

## Introduction to HyperDB

Many WordPress sites are limited to the capacity of a single MySQL database server. HyperDB is a WordPress plugin that lets you scale your WordPress site by letting it write to and read from additional database servers. Specifically, it extends WordPress’ default database class to add support for database replication, failover, load balancing, and partitioning — all tools for scaling WordPress.

Keep in mind, HyperDB is a superuser tool with tons of tuning options based on database architecture and network topology. Before you implement a more complex configuration, it’s best to see if a simpler configuration suits your needs.

## Using HyperDB

Before you begin, your site service level must be changed to "Elite" by an Enterprise Onboarding Manager. The platform will automatically configure and manage your master and replica databases. Once your extra database server is online, installing HyperDB is a matter of:

- Adding your configuration details to a `db-config.php` file in the same directory as `wp-config.php`
- Installing the HyperDB-provided `db.php` database drop-in to `/wp-content`

When the `db.php` database drop-in is deployed to production, WordPress will begin allocating MySQL database reads and writes based on the configuration details you’ve provided in `db-config.php`.

Here are two sample configurations you can use. Check out the `db-config.php` provided by HyperDB for more advanced configuration notes.

### Split Reads Between Master and Replica
Split reads between the master and the replica, to simply distribute the load between two servers.
<script src="http://gist-it.appspot.com/https://github.com/pantheon-systems/pantheon-settings-examples/blob/master/wordpress/split-reads.dbconfig.php?footer=minimal"></script>

### Pass Frontend Read Queries to Replica, WordPress Dashboard Reads and Writes to Master
Pass all front-end database read queries to the replica, leaving the master dedicated to WordPress dashboard reads and writes. This can better ensure WordPress dashboard availability during high front-end load.
<script src="http://gist-it.appspot.com/https://github.com/pantheon-systems/pantheon-settings-examples/blob/master/wordpress/master-write-replica-read.dbconfig.php?footer=minimal"></script>

Note: in this example, you’ll want some form of cache fallback if reads to the replica begin failing.

### Distributed Reads for Localization or multisite
For those scaling WordPress Multisite, one can allocate a collection of master servers amongst sites on the network. Sites A and B could use different MySQL masters, and continue to share the same codebase. This use-case is not yet possible on Pantheon. Secondary master database servers would need to be configured elsewhere.
