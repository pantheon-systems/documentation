---
title: MariaDB and MySQL on Pantheon
subtitle: Using MySQL Workbench to Access a Database
description: Detailed information on using MySQL Workbench for creating, executing, and optimizing SQL queries.
categories: [manage]
tags: [database, local]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/mariadb-mysql/mysql-workbench
anchorid: mysql-workbench
---

This section provides information on how to use [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) to access a database on Pantheon.

[MySQL Workbench](https://dev.mysql.com/downloads/workbench/) provides DBAs and developers an integrated tools environment for: database design & modeling; SQL development; database administration; and support for Windows, Mac OS X, and Linux.

## Get Started

Start by getting the MySQL connection for the environment you want to access. To get the database credentials, copy them from the Connection Information widget available on the site's Dashboard. For detailed information, see [Accessing MySQL database](/guides/mariadb-mysql/mysql-access).

## Create a New MySQL Connection

Now that you have the credentials for the database handy, you can start MySQL Workbench and set up your connection. Once the application has started, click the **+** icon on the top left of the screen to create a MySQL connection. Next, enter the information to connect to the database. Each of the following are required:

**Connection Name** - A unique name (add a prefix for Dev/Test/Live)  
**Connection Method** - Standard (TCP/IP)  
**Hostname** - MySQL database hostname  
**Username** - MySQL database username  
**Port** - MySQL database port (tip: Remember this value)  
**Password** - The password on the dashboard's connection info<br />

Click the **Store in Keychain...** button and enter your MySQL password for the environment.

<Alert title="Note" type="info">
Ensure you have the correct database username and password for your environment.
</Alert>
## Test the Database Connection

After entering all the information, click **Test Connection** to initiate a connection with the remote database. If it succeeds, you'll receive a confirmation message.

After the configuration is complete, the new connection will be available on the MySQL Workbench workspace. 

## Connect to the Database

At this point, you are all set and can administer your database. There will be a new entry on the Workbench for the newly set up connection and you can click the icon to initiate a session.

## Troubleshooting MySQL Connections

Refer to [Accessing MySQL Databases](/guides/mariadb-mysql/mysql-access).

## More Resources

- [Secure Connections to Pantheon Services via TLS or SSH Tunnels](/guides/secure-development/ssh-tunnels)

- [Secure Runtime Access](/guides/secure-development/secure-runtime-access)