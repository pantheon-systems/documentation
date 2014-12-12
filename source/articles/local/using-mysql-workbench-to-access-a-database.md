---
title: Using MySQL Workbench to Access a Database
description: Use MySQL Workbench for creating, executing, and optimizing SQL queries.

---

[MySQL Workbench](http://dev.mysql.com/downloads/tools/workbench/) provides DBAs and developers an integrated tools environment for: Database Design & Modeling, SQL Development, database administration, and support for Windows, Mac OS X and Linux.

## Get Started

Start by getting the MySQL connection for the environment that you want to access. To get the database credentials, copy them from the Connection Information widget available on the site's dashboard. For more detailed information, review [Accessing MySQL database](/articles/local/accessing-mysql-databases/) for your site.

## Create a New MySQL Connection

Now that you have the credentials for the database handy, you can start MySQL workbench and start setting up your connection. Once the application has started, click the "+" icon on the top left of the screen to create a MySQL connection.  


 ![](https://pantheon-systems.desk.com/customer/portal/attachments/224665)​

Next, enter the information to connect to the database. Each of the following are required:

**Connection Name** - A unique name (add a prefix for Dev/Test/Live)  
**Hostname** - MySQL database hostname  
**Username** - MySQL database username  
**Port** - MySQL database port (tip: Remember this value)  
**Password** - The password on the dashboard's connection info

 

![Create a saved connection](https://pantheon-systems.desk.com/customer/portal/attachments/224652)

Click the "Store in Keychain..." button and enter your MySQL password for the environment.

![enter your password](http://helpdesk.getpantheon.comhttps://pantheon-systems.desk.com/customer/portal/attachments/224674)

**Note:** Ensure you have the correct database username and password for your environment.

## Test the Database Connection

After entering all the information, click "Test Connection" to initiate a connection with the remote database. If it succeeds, you'll receive a confirmation message.

![Test a saved connection](https://pantheon-systems.desk.com/customer/portal/attachments/224669)

After the configuration is complete, the new connection will available on the MySQL Workbench workspace. 

## Connect to the Database

At this point, you are all set and can administer your database. There will be a new entry on the Workbench for the newly setup connection and you can click on the icon to initiate a session.


## Troubleshooting

### Database Credentials are Invalid

The database credentials are updated whenever a server is migrated or updated. If you notice the connection fails, please be sure to verify that you have the current connection information for the environment. If not, copy the new information from the site's dashboard.

![](https://pantheon-systems.desk.com/customer/portal/attachments/224670)​

### Database is Reaped

To conserve resources, environments will be spun down after about two hours of inactivity. If your site is in  sleep mode you may get the following error:

![](https://pantheon-systems.desk.com/customer/portal/attachments/224763)​

Go to the environment's URL in your browser to "wake up" the reaped site. Once the page has loaded, try to connect again and the database should be accessible. More information about this is available on the [known limitations](articles/drupal/knownlimitations.md) page.
