---
title: Using MySQL Workbench to Access a Database
description: Detailed information on using MySQL Workbench for creating, executing, and optimizing SQL queries.
category:
  - developing
keywords: mysql workbench, database, mysql connection
---
[MySQL Workbench](http://dev.mysql.com/downloads/tools/workbench/) provides DBAs and developers an integrated tools environment for: database design & modeling; SQL development; database administration; and support for Windows, Mac OS X, and Linux.

## Get Started

Start by getting the MySQL connection for the environment you want to access. To get the database credentials, copy them from the Connection Information widget available on the site's Dashboard. For detailed information, see [Accessing MySQL database](/docs/articles/local/accessing-mysql-databases/).

## Create a New MySQL Connection

Now that you have the credentials for the database handy, you can start MySQL Workbench and set up your connection. Once the application has started, click the **+** icon on the top left of the screen to create a MySQL connection. Next, enter the information to connect to the database. Each of the following are required:

**Connection Name** - A unique name (add a prefix for Dev/Test/Live)  
**Hostname** - MySQL database hostname  
**Username** - MySQL database username  
**Port** - MySQL database port (tip: Remember this value)  
**Password** - The password on the dashboard's connection info<br />

Click the **Store in Keychain...** button and enter your MySQL password for the environment.

<div class="alert alert-info" role="alert">
<h4>Note</h4>
Ensure you have the correct database username and password for your environment.
</div>
## Test the Database Connection

After entering all the information, click **Test Connection** to initiate a connection with the remote database. If it succeeds, you'll receive a confirmation message.

After the configuration is complete, the new connection will available on the MySQL Workbench workspace. 

## Connect to the Database

At this point, you are all set and can administer your database. There will be a new entry on the Workbench for the newly set up connection and you can click the icon to initiate a session.

## Troubleshooting

### Database Credentials are Invalid

The database credentials are updated whenever a server is migrated or updated. If you notice the connection fails, please be sure to verify that you have the current connection information for the environment. If not, copy the new information from the site's Dashboard.<br />
![](/source/docs/assets/images/desk_images/224670.png)​

### Database is Reaped

To conserve resources, environments are spun down after about two hours of inactivity. If your site is in sleep mode, you may get the following error:<br />
![](/source/docs/assets/images/desk_images/224763.png)​<br />
Go to the environment's URL in your browser to "wake up" the reaped site. Once the page has loaded, try to connect again and the database should be accessible. For more information, see [Known Limitations](/docs/articles/sites/known-limitations).
