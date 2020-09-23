---
title: Accessing MySQL Databases
description: Configure and troubleshoot your Pantheon website's MySQL database connections.
categories: [develop]
tags: [database, local, ssh]
reviewed: "2020-07-30"
---
Pantheon provides direct access for your MySQL databases, both for debugging and for importing large databases. Each site environment (Dev, Test and Live) has a separate database, so credentials for one cannot be used on another. The credentials are automatically included in your site configuration.

<Alert title="Note" type="info">
Due to the nature of our platform, the connection information will change from time to time due to server upgrades, endpoint migrations, etc. You will need to check the Dashboard periodically or when you can’t connect.
</Alert>

## Database Connection Information

MySQL credentials for each site environment are located in the Dashboard:<br />
![MySQL Credentials](../images/dashboard/mysql-info.png)<br />
The following required fields are provided:

- **Server**: The hostname of the MySQL server.
- **Port**: The TCP/IP port number to use for the connection. There is no default and will differ for every environment on each site.
- **Username**: MySQL user name to use when connecting to server.
- **Password**: The password to use when connecting to the server.
- **Database**: The database to use; the value will always be pantheon and cannot be altered.

As each database server is in the cloud, the credentials will occasionally be updated and may change without notice. Normally, this is transparent to a site as the credentials are automatically included by the server. However, if you've saved the credentials in a local client and a month later you can't connect, check your Dashboard for the current credentials.

There's a wide array of MySQL clients that can be used, including [MySQL Workbench](https://dev.mysql.com/downloads/workbench/), [Sequel Pro](https://www.sequelpro.com/download), [Navicat](https://www.navicat.com/download), [PHPMyAdmin](https://www.phpmyadmin.net/), and others. See the instruction manual or issue queue of your software to learn more about how to configure a connection.

### Open Sequel Pro Database Connection

Drupal users can create [`spf-template.spf`](https://gist.github.com/aaronbauman/f50cc691eb3ed60a358c#file-spf-template-spf) and use the following script to establish a database connection in Sequel Pro via [Terminus](/terminus) and [Drush](/drush):

```bash:title=establish-db-connection.sh
#!/bin/bash

# exit on any errors:
set -e

if [ $# -lt 1 ]
then
  echo "Usage: $0 @pantheon-alias"
  exit 1
fi

# Path to drush goes here:
DRUSH='/usr/local/bin/drush'

# Authenticate with Terminus
terminus auth:login --email <email>


# see the following file:
TEMPLATE='spf-template.spf'

# may need to change this:
TMP_SPF='/tmp/tmp.spf'

# Update aliases
terminus aliases

echo "fetching connection string"
CONNECTION_STRING=`$DRUSH $1 sql-connect`
echo $CONNECTION_STRING
DATABASE=`echo $CONNECTION_STRING | sed -e 's/.*--database=\([^\\ ]*\).*/\1/g'`
HOST=`echo $CONNECTION_STRING | sed -e 's/.*--host=\([^\\ ]*\).*/\1/g'`
PORT=`echo $CONNECTION_STRING | sed -e 's/.*--port=\([^\\ ]*\).*/\1/g'`
PASSWORD=`echo $CONNECTION_STRING | sed -e 's/.*--password=\([^\\ ]*\).*/\1/g'`
USER=`echo $CONNECTION_STRING | sed -e 's/.*--user=\([^\\ ]*\).*/\1/g'`

# This is for Sequel Pro:
eval "echo \"$(< $TEMPLATE)\""
# For some reason, Sequel Pro or Open do not behave the same way given the -f
# flag compared to opening a file from file system. So, we write to a tmp file.
eval "echo \"$(< $TEMPLATE)\"" > $TMP_SPF

# Swap this out to fit your system:
open $TMP_SPF
```

Props to Aaron Bauman for writing [this script](https://gist.github.com/aaronbauman/f50cc691eb3ed60a358c)!

## SSH Tunneling

By default, MySQL connections made to Pantheon are encrypted:

```sql
mysql> SHOW STATUS LIKE "Ssl_cipher";
+---------------+---------------------------+
| Variable_name | Value                     |
+---------------+---------------------------+
| Ssl_cipher    | DHE-RSA-AES128-GCM-SHA256 |
+---------------+---------------------------+
```

Developers can use SSH tunnels to add additional layers of encryption to remote MySQL connections, or tunnel the connection across non-standard ports. For more information on how to set up tunnels for databases, see [Secure Connections to Pantheon Services via TLS or SSH Tunnels](/ssh-tunnels).

## Troubleshooting MySQL Connections

### Lost Connection to MySQL Server

```sql
ERROR 2013 (HY000): Lost connection to MySQL server at 'reading initial communication packet', system error: 0
```

Or

```sql
ERROR 2003 (HY000): Can't connect to MySQL server on 'dbserver.$ENV.$SITE.drush.in' (111)
```

This error occurs when a request is sent to a database server that is in sleep mode. Pantheon containers spin down after ~1 hour of idle time. Live environments on a paid plan spin down after 12 hours of idle time. Environments usually spin up within 30 seconds of receiving a request. To resolve this error, wake environments by loading the home page or with the following Terminus command:

```bash{promptUser: user}
terminus env:wake <site>.<env>
```

### Can't Connect to Local MySQL Server Through Socket

See [Database Connection Errors](/database-connection-errors) to troubleshoot
 connection errors like the following:

```bash
Can’t connect to local MySQL server through socket '/var/lib/mysql/mysql.sock'...).
```

## Frequently Asked Questions

### How can I access my MySQL slow query logs?

Pantheon logs underperforming database queries using the [MySQL Slow Query Log](https://dev.mysql.com/doc/refman/5.5/en/slow-query-log.html). To access the log for your database, get the SFTP connection info for the environment in question. Then, replace the word "appserver" with "dbserver" in the connection string. The MySQL slow query logs are in the `logs` subdirectory.

### How can I access MySQL binary logs?

To access [MySQL binary logs](https://dev.mysql.com/doc/internals/en/binary-log-overview.html) ("binlogs"), connect to the database server as described above for the slow query logs. Binlogs are stored in the `data` subdirectory. These logs are generally not used for development but may be useful to troubleshoot disk quota issues.

### Are table prefixes supported?

Table prefixes are not supported or recommended by Pantheon. While the server will not prevent their creation or use, managing and supporting tables with prefixes is the developer's responsibility.

### Can I create a database in addition to the Pantheon database?

No, only one database per site is provided. While create privileges are granted, any additional database will not survive regular maintenance operations.

### Can I put unique tables in the Pantheon database?

Pantheon places no restrictions on the contents of the database.
