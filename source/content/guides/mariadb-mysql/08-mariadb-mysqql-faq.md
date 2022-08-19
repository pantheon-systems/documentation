---
title: MariaDB (MySQL) on Pantheon
subtitle: MariaDB (MySQL) FAQ
description: Get answers to your MariaDB (MySQL) questions.
categories: [develop]
tags: [database]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/mariadb-mysql/mariadb-mysql-faq
anchorid: mariadb-mysql-faq
---

This section provides answers to frequently asked MariaDB (MySQL) questions.

### How can I access my MySQL Slow Query logs?

Pantheon logs underperforming database queries using the [MySQL Slow Query Log](https://dev.mysql.com/doc/refman/5.5/en/slow-query-log.html).

To access the log for your database:

1. Get the SFTP connection info for the environment in question.
1. Replace the word `appserver` with `dbserver` in the connection string.
1. The MySQL slow query logs are in the `logs` subdirectory.

### How can I access MySQL binary logs?

These logs are generally not used for development but may be useful to troubleshoot disk quota issues.

To access [MySQL binary logs](https://dev.mysql.com/doc/internals/en/binary-log-overview.html) ("binlogs"):

1. Get the SFTP connection info for the environment in question.
1. Replace the word `appserver` with `dbserver` in the connection string.
1. The MySQL slow query logs are in the `data` subdirectory.

### Are table prefixes supported?

Table prefixes are not supported or recommended by Pantheon. While the server will not prevent their creation or use, managing and supporting tables with prefixes is the developer's responsibility.

### Can I create a database in addition to the Pantheon database?

No, only one database per site is provided. While create privileges are granted, any additional database will not survive regular maintenance operations.

### Can I put unique tables in the Pantheon database?

Pantheon places no restrictions on the contents of the database.

### Can I create another database user?

No, Pantheon only provides one database user. Some customers have asked about creating a read-only user to provide read but not write access to the database. Consider creating an API or JSON-request application to provide access to the required information.

### How do I convert output from hexadecimal to a binary data?

When updating your MySQL client (CLI) from 5.x to 8.x, reading data from DB columns with BLOB types (such as the `variable` table in Drupal 7.x) may change data from binary to hexadecimal (ex: `0×1f34c9`).

To disable hexadecimal notation, add `--skip-binary-as-hex` to the [database connection](/guides/quickstart/connection-modes/) when you connect from the command line:

```bash{promptUser: user}
mysql -u pantheon --skip-binary-as-hex -p02f7b34a02…
```

For more information on this behavior change, refer to the [MySQL 8.0 Reference Manual](https://dev.mysql.com/doc/refman/8.0/en/mysql-command-options.html#option_mysql_binary-as-hex).