---
title: Accessing MySQL databases
filename: source/_docs/accessing-mysql-databases.md
---

Pantheon provides direct access for your MySQL databases, both for debugging and for importing large databases. Each site environment (dev, test and live) has a separate database, so credentials for one cannot be used on another. The credentials are automatically included in your Drupal configuration; there's no need to hard code them!  


**NOTE: Due to the nature of our platform, the connection information will change from time to time due to server upgrades, endpoint migrations, etc. You will need to check this with the dashboard periodically or when you find that you can’t connect.**

## Database Connection Info

MySQL credentials for each site environment can be found in the dashboard:

![MySQL Credentials](https://pantheon-systems.desk.com/customer/portal/attachments/168060)

The following fields are provided; each is required.

- **Server** : The hostname of the MySQL server.
- **Port** : The TCP/IP port number to use for the connection. There is no default and will different for every environment on each site.
- **Username** : MySQL user name to use when connecting to server.
- **Password** : The password to use when connecting to the server.
- **Database** : The database to use; the value will always be pantheon and cannot be altered.

As each database server is in the cloud, the credentials will occasionally be updated and may change without notice. Normally, this is transparent to a Drupal site as the credentials are automatically included by the server. However, if you've saved the credentials in a local client and a month later you can't connect, check your dashboard for the current credentials.

There's a wide array of MySQL clients that can be used, including [MySQL Workbench](http://dev.mysql.com/downloads/tools/workbench/),  [Sequel Pro](http://www.sequelpro.com/download), [Navicat](http://www.navicat.com/download), and others. Please consult the instruction manual or issue queue for your version of software to learn more about how to configure a connection.

## SSH Tunneling

Developers can use SSH tunnels to securely encrypt their remote MySQL connections. For more information on how to setup tunnels for databases, please consult [SSH tunnels for secure connections to Pantheon services](/documentation/advanced-topics/ssh-tunnels-for-secure-connections-to-pantheon-services/).

## Troubleshooting MySQL connections

If your site suddenly reverts to install.php, or you see database connection errors like the following:

![](https://pantheon-systems.desk.com/customer/portal/attachments/64774)

    Can't connect to local MySQL server through socket '/var/lib/mysql/mysql.sock'...).

This indicates that there's an issue connecting to the Pantheon database. There are two common causes.

### Overwritten Pressflow Core

Pantheon uses Pressflow, the 100% API compatible version of Drupal for a number of reasons, including security, performance and the ability to access server environment configurations - like the database connection. If you overwrite Pressflow - most commonly by unpacking Drupal core over a git checkout or updating core using drush - your site will no longer be able to read the environmental configuration. Your dashboard will also report this as an error.  


If you've overwritten core, see [Core Updates](/documentation/running-drupal/drupal-core-updates/-core-updates) for instructions on how to get back to Pressflow.

### Non-Standard Bootstraps

If you have a need to access the MySQL database credentials directly outside of Drupal, or need to implement the Domain Access module, see [Read Pantheon Environment Configuration](/documentation/howto/reading-pantheon-environment-configuration/-read-pantheon-environment-configuration).

## Frequently Asked Questions

### How can I access my MySQL slow query logs?

Pantheon logs underperforming database queries using the [MySQL slow query log](http://dev.mysql.com/doc/refman/5.5/en/slow-query-log.html). To access the log for your database, first get the SFTP connection info for the environment in question. Then, replace the word "appserver" with "dbserver" in the connection string. The MySQL slow query logs are in the data subdirectory.

### Are table prefixes supported?

Table prefixes are not supported or recommended by Pantheon. While the server will not prevent their creation or use, managing and supporting tables with prefixes is the developer's responsibility.

### Can I create a database in addition to the pantheon database?

No, only one database per site is provided, create privileges are not granted.

### Can I put non-Drupal tables in the pantheon database?

Pantheon places no restrictions on the contents of the database.
