---
title: MariaDB and MySQL on Pantheon
subtitle: Use MySQL Workbench to Access a Database
description: Use MySQL Workbench to create, execute, and optimize SQL queries.
contenttype: [guide]
categories: [database]
newcms: [--]
audience: [development]
product: [--]
integration: [--]
tags: [database, local]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/mariadb-mysql/mysql-workbench
anchorid: mysql-workbench
---

This section provides information on how to use [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) to access a database on Pantheon.

[MySQL Workbench](https://dev.mysql.com/downloads/workbench/) provides database administrators and developers with integrated tools for: 

- Database design and modeling

- SQL development

- Database administration

- Support for Windows, Mac OS X, and Linux

## Get Started

Start by getting the MySQL connection for the environment you want to access. To get the database credentials, copy them from the Connection Information widget available on the sites Dashboard. Refer to [Accessing MySQL database](/guides/mariadb-mysql/mysql-access) for detailed information. 

## Create a New MySQL Connection

1. Start MySQL Workbench and click the **+** icon on the top left of the screen to create a MySQL connection. 

1. Enter the information to connect to the database. The following fields are required:

    **Connection Name** - A unique name (add a prefix for Dev/Test/Live)  
    **Connection Method** - Standard (TCP/IP)  
    **Hostname** - MySQL database hostname  
    **Username** - MySQL database username  
    **Port** - MySQL database port (tip: Remember this value)  
    **Password** - The password on the dashboard's connection info<br />

1. Click the **Store in Keychain...** button and enter your MySQL password for the environment.

<Alert title="Note" type="info">

Ensure you have the correct database username and password for your environment.

</Alert>

## Test the Database Connection

1. Click **Test Connection** to initiate a connection with the remote database after you complete the steps in the section above.

    -  You'll receive a confirmation message if it succeeds.

1. Confirm that the new connection is available on the MySQL Workbench workspace after the configuration completes.

## Connect to the Database

You can now administer your database. There will be a new entry on the Workbench for the newly configured connection and you can click the icon to initiate a session.

## Troubleshooting MySQL Connections

Refer to [Troubleshooting MySQL Connections](/guides/mariadb-mysql/mysql-access#troubleshooting-mysql-connections) for more information.

## More Resources

- [Secure Connections to Pantheon Services via TLS or SSH Tunnels](/guides/secure-development/ssh-tunnels)

- [Secure Runtime Access](/guides/secure-development/secure-runtime-access)