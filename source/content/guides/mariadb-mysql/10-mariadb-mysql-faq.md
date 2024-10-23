---
title: MariaDB and MySQL on Pantheon
subtitle: MariaDB and MySQL FAQ
description: Get answers to your MariaDB and MySQL questions.
contenttype: [guide]
innav: [false]
categories: [database]
cms: [--]
audience: [development]
product: [--]
integration: [--]
tags: [database]
contributors: [whitneymeredith]
showtoc: true
permalink: docs/guides/mariadb-mysql/mariadb-mysql-faq
---

This section provides answers to frequently asked MariaDB and MySQL questions.

### How can I access my MySQL Slow Query Logs?

Pantheon logs underperforming database queries using the [MySQL Slow Query Log](https://dev.mysql.com/doc/refman/5.5/en/slow-query-log.html).

To access the log for your database:

1. Get the SFTP **Connection Info** for the environment in question.

1. Replace the word `appserver` with `dbserver` in the connection string.

1. Navigate to the `logs` subdirectory to view the MySQL slow query logs.

### How can I access MySQL Binary Logs?

These logs are generally not used for development but may be useful to troubleshoot disk quota issues.

To access [MySQL binary logs](https://dev.mysql.com/doc/internals/en/binary-log-overview.html) ("binlogs"):

1. Get the SFTP **Connection Info** for the environment in question.

1. Replace the word `appserver` with `dbserver` in the connection string.

1. Navigate to the `data` subdirectory to view the MySQL Slow Query logs.

### Are table prefixes supported?

Table prefixes are not supported or recommended by Pantheon. While the server will not prevent their creation or use, managing and supporting tables with prefixes is the developer's responsibility.

### Can I create a database in addition to the Pantheon database?

No, only one database per site is provided. While creation privileges are granted, any additional database will not survive regular maintenance operations.

### Can I put unique tables in the Pantheon database?

Pantheon places no restrictions on the contents of the database.

### Can I create another database user?

No, Pantheon only provides one database user. Some customers have asked about creating a read-only user to provide read but not write access to the database. Consider creating an API or JSON-request application to provide access to the required information.

### How do I convert output from hexadecimal to a binary data?

When updating your MySQL client (CLI) from 5.x to 8.x, reading data from DB columns with BLOB types (such as the `variable` table in Drupal 7.x) may change data from binary to hexadecimal (ex: `0×1f34c9`).

To disable hexadecimal notation, add `--skip-binary-as-hex` to the [database connection](/connection-modes/) when you connect from the command line:

```bash{promptUser: user}
mysql -u pantheon --skip-binary-as-hex -p02f7b34a02…
```

For more information on this behavior change, refer to the [MySQL 8.0 Reference Manual](https://dev.mysql.com/doc/refman/8.0/en/mysql-command-options.html#option_mysql_binary-as-hex).

### What is the database's maximum connections?

To find the maximum connections available to the site’s database, connect to the site’s database and run:

```sql{promptUser: sql}
mysql> SHOW VARIABLES LIKE "max_connections";
```

There are many other factors that you should consider if you have concerns about maximum database connections. Contact your [CSM](/guides/professional-services#customer-success-management) or [Sales](https://pantheon.io/contact-sales?docs) for more information.

## [Drush package drush-gdpr-dumper](https://github.com/druidfi/drush-gdpr-dumper)
  <ReviewDate date="2024-10-18" />  
  
**Issue:** The druidfi/drush-gdpr-dumper breaks `drush-sql-dump` command. It results with following error `The '--column-statistics' option does not exist.`  
  This package ships it's own `mysqldump` file being used to do the MySQL dump, which is incompatible with the platform. Specifically, the package overrides the `extra-dump` configuration, which is passed to mysqldump and does not allow it's alteration. The mysqldump used is not compatible with MariaDB.  
  
**Solution**: Remove the file `mysqldump` or uninstall the package. Then platform's version of `mysqldump` will be used.  
  
Notes: The package likely has other MariaDB incompatibilities!

---

## More Resources

- [Accessing MariaDB and MySQL Databases](/guides/mariadb-mysql/mysql-access)

- [MySQL Slow Log](/guides/mariadb-mysql/mysql-slow-log)

- [MySQL Troubleshooting with New Relic Performance Monitoring](/guides/new-relic/debug-mysql-new-relic)
