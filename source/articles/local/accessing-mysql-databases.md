---
title: Accessing MySQL Databases
filename: source/_common-tasks/accessing-mysql-databases.md
---
Pantheon provides direct access for your MySQL databases, both for debugging and for importing large databases. Each site environment (Dev, Test and Live) has a separate database, so credentials for one cannot be used on another. The credentials are automatically included in your Drupal configuration. 


**Note: Due to the nature of our platform, the connection information will change from time to time due to server upgrades, endpoint migrations, etc. You will need to check the dashboard periodically or when you can’t connect.**

## Database Connection Information

MySQL credentials for each site environment can be found in the dashboard:

![MySQL Credentials](https://pantheon-systems.desk.com/customer/portal/attachments/168060)

The following required fields are provided:

- **Server** : The hostname of the MySQL server.
- **Port** : The TCP/IP port number to use for the connection. There is no default and will differ for every environment on each site.
- **Username** : MySQL user name to use when connecting to server.
- **Password** : The password to use when connecting to the server.
- **Database** : The database to use; the value will always be pantheon and cannot be altered.

As each database server is in the cloud, the credentials will occasionally be updated and may change without notice. Normally, this is transparent to a Drupal site as the credentials are automatically included by the server. However, if you've saved the credentials in a local client and a month later you can't connect, check your dashboard for the current credentials.

There's a wide array of MySQL clients that can be used, including [MySQL Workbench](http://dev.mysql.com/downloads/tools/workbench/), [Sequel Pro](http://www.sequelpro.com/download), [Navicat](http://www.navicat.com/download), and others. See the instruction manual or issue queue of your software to learn more about how to configure a connection.

## SSH Tunneling

Developers can use SSH tunnels to securely encrypt remote MySQL connections. For more information on how to setup tunnels for databases, see [SSH Tunnels for Secure Connections to Pantheon Services](/documentation/advanced-topics/ssh-tunnels-for-secure-connections-to-pantheon-services/).

## Troubleshooting MySQL Connections

If your site suddenly reverts to install.php, or you see database connection errors like the following:

![](https://pantheon-systems.desk.com/customer/portal/attachments/64774)

    Can't connect to local MySQL server through socket '/var/lib/mysql/mysql.sock'...).

This indicates that there's an issue connecting to the Pantheon database. There are two common causes:

#### 1. Overwritten Pressflow Core

Pantheon uses Pressflow, the API compatible version of Drupal for a number of reasons, including security, performance, and the ability to access server environment configurations. If you overwrite Pressflow (commonly done by unpacking Drupal core over a Git checkout or updating core using drush) your site will no longer be able to read the environmental configuration. Your dashboard will also report this as an error.  

If you've overwritten core, see [Core Updates](/documentation/running-drupal/drupal-core-updates/-core-updates) for instructions on how to get back to Pressflow.

#### 2. Non-Standard Bootstraps

If you need to access the MySQL database credentials outside of Drupal, or need to implement the Domain Access module, see [Read Pantheon Environment Configuration](/documentation/howto/reading-pantheon-environment-configuration/-read-pantheon-environment-configuration).

## Frequently Asked Questions

#### How can I access my MySQL slow query logs?

Pantheon logs underperforming database queries using the [MySQL Slow Query Log](http://dev.mysql.com/doc/refman/5.5/en/slow-query-log.html). To access the log for your database, get the SFTP connection info for the environment in question. Then, replace the word "appserver" with "dbserver" in the connection string. The MySQL slow query logs are in the data subdirectory.

#### Are table prefixes supported?

Table prefixes are not supported or recommended by Pantheon. While the server will not prevent their creation or use, managing and supporting tables with prefixes is the developer's responsibility.

#### Can I create a database in addition to the Pantheon database?

No, only one database per site is provided and create privileges are not granted.

#### Can I put non-Drupal tables in the Pantheon database?

Pantheon places no restrictions on the contents of the database.
