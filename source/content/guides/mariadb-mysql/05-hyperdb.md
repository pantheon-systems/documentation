---
title: MariaDB and MySQL on Pantheon
subtitle: Scaling WordPress with MySQL Replicas and HyperDB
description: Learn how to distribute requests to replica MySQL databases on WordPress using HyperDB.
cms: "WordPress"
categories: [performance]
tags: [database]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/mariadb-mysql/hyperdb
anchorid: hyperdb
---

This section provides information on how to scale your WordPress site with MySQL Replicas and HyperDB.

<Alert title="Note" type="info" >

Replica MySQL databases are available for sites on the [Elite service level](https://pantheon.io/resources/elite-plan-overview). [Contact sales](https://pantheon.io/pantheon-elite-plans) to inquire about our Elite plans.

</Alert>

## Advantages of MySQL Replication
Typical WordPress sites are limited to the capacity of a single database to serve read and write requests. As a result, high traffic sites can experience latency as requests are fulfilled. MySQL replication rapidly copies content from the primary database to a replica database. This allows you to spread requests across multiple databases to improve site performance and load times.

## About HyperDB
[HyperDB](https://wordpress.org/support/plugin/hyperdb) is a drop-in plugin that replaces the standard [`wpdb`](https://codex.wordpress.org/Class_Reference/wpdb) class. This allows WordPress to write and read from additional database servers. HyperDB supports:

- Database replication
- Failover
- Load balancing
- Partitioning

Keep in mind, HyperDB is a powerful tool with several tuning options based on database architecture and network topology. Before you implement a complex configuration, it’s best to see if a simpler configuration suits your needs.

## Install and Configure HyperDB

A Customer Success Manager (CSM) must change your site service level to Elite before you can install HyperDB. The Pantheon platform will automatically configure and manage your primary and replica databases. [Contact us](https://pantheon.io/contact-us) to learn more about service levels and how a CSM can help. 

Complete the steps below after your site service level has been updated to Elite.

1. Download the archive of [HyperDB from the WordPress plugin repository](https://wordpress.org/support/plugin/hyperdb) and move the `db.php` file into the `/wp-content` directory. This is a drop-in plugin and does not require activation at any time.

1. Configure the primary and replica databases within `db-config.php`. This file should be stored within the same directory as the site's `wp-config.php` file.

1. Deploy the `db.php` database drop-in to production. WordPress will start allocating MySQL database reads and writes based on the configuration details you’ve provided in `db-config.php`.

The following sample configurations can be used in place of the `dp-config.php` file provided within the plugin archive. These examples require no additional edits for sites running on Pantheon. For more advanced options, refer to the `db-config.php` file provided in the HyperDB plugin archive.

### Split Reads Between Primary and Replica
You can split reads between the primary and the replica database to distribute the load between two servers.

```php
<?php
/**
 * Register the primary server to HyperDB
 */
$wpdb->add_database( array(
        'host'     => DB_HOST,
        'user'     => DB_USER,
        'password' => DB_PASSWORD,
        'name'     => DB_NAME,
        'write'    => 1, // primary server takes write queries
        'read'     => 1, // ... and read queries
) );
/**
 * Register replica database server if it's available in this environment
 */
if ( ! empty( $_ENV['REPLICA_DB_HOST'] ) ) {
        $wpdb->add_database(array(
                'host'     => $_ENV['REPLICA_DB_HOST'] . ':' . $_ENV['REPLICA_DB_PORT'],
                'user'     => $_ENV['REPLICA_DB_USER'],
                'password' => $_ENV['REPLICA_DB_PASSWORD'],
                'name'     => $_ENV['REPLICA_DB_NAME'],
                'write'    => 0, // replica doesn't take write queries
                'read'     => 1, // ... but it does take read queries
        ));
}
// That's it!
```


### Pass Frontend Read Queries to Replica, WordPress Dashboard Reads and Writes to Primary
You can pass all frontend database read queries to the replica. This leaves the primary database dedicated to WordPress dashboard reads and writes. This setup can help ensure WordPress dashboard availability during times of high frontend load.

You should use [some form of cache fallback](/object-cache) if reads to the replica begin failing.

```php
<?php
/**
 * Use HyperDB to just use the replica for frontend reads.
 * Register the primary server to HyperDB
 */
$wpdb->add_database( array(
        'host'     => DB_HOST,
        'user'     => DB_USER,
        'password' => DB_PASSWORD,
        'name'     => DB_NAME,
        'write'    => 1, // primary server takes write queries
        'read'     => is_admin() || empty( $_ENV['REPLICA_DB_HOST'] ) ? 1 : 0, // ... but only takes read queries in the admin if the replica is available
) );
/**
 * Register replica database server if it's available in this environment
 */
if ( ! empty( $_ENV['REPLICA_DB_HOST'] ) && ! is_admin() ) {
        $wpdb->add_database(array(
                'host'     => $_ENV['REPLICA_DB_HOST'] . ':' . $_ENV['REPLICA_DB_PORT'],
                'user'     => $_ENV['REPLICA_DB_USER'],
                'password' => $_ENV['REPLICA_DB_PASSWORD'],
                'name'     => $_ENV['REPLICA_DB_NAME'],
                'write'    => 0, // replica doesn't take write queries
                'read'     => 1, // ... but it does take read queries
        ));
}
// That's it!
```

## More Resources

- [WordPress on Pantheon Quick Start Guide](/guides/wordpress-pantheon/)

- [WordPress Best Practices](/wordpress-best-practices)