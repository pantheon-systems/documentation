---
title: Using MySQL Workbench to access a database
filename: source/_common-tasks/using-mysql-workbench-to-access-a-database.md
---

[MySQL Workbench](http://dev.mysql.com/downloads/tools/workbench/) provides DBAs and developers an integrated tools environment for: Database Design & Modeling, SQL Development, database adminstration and support for Windows, Mac OS X and Linux.

#### Getting Started

Start by getting the MySQL connection for the environment that you want to access. To get the database credentials you can grab them from the Connection Information widget available on the site's dashboard. For more detailed directions you can review the [Accessing MySQL database](/documentation/advanced-topics/accessing-mysql-databases/) for your site.

#### Create a new MyySQL connection

Now that you have the credentials for the database handy, you can start MySQL workbench and start setting up your connection. Once the application has started click the "+" icon on the top left of the screen to create a MySQL connection.  


 ![](https://pantheon-systems.desk.com/customer/portal/attachments/224665)​

Next you can to enter the needed information in order to connect to the database. Each of the following are required:

**Connection Name** - A unique name (tip: add a prefix for Dev/Test/Live)  
**Hostname** - MySQL database hostname  
**Username** - MySQL database username  
**Port** - MySQL database port (tip: Don't forget this value)  
**Password** - The password on the dashboard's connection info

 

![Create a saved connection](https://pantheon-systems.desk.com/customer/portal/attachments/224652)

Click the "Store in Keychain..." button and you will be prompted to enter your MySQL password for your environment.

![enter your password](http://helpdesk.getpantheon.comhttps://pantheon-systems.desk.com/customer/portal/attachments/224674)

**Note:** Ensure you have the correct database username and password for your environment.

#### Testing the database connection

With all the information entered you should click on the "Test Connection" button and that will attempt to initiate a connection with the remote database. If that succeeds and confirmation window will be presented.

![Test a saved connection](https://pantheon-systems.desk.com/customer/portal/attachments/224669)

After the configuration is complete, the new connection will available on the MySQL Workbench workspace. 

#### Connecting to the database

At this point you are all set and can begin to administer your database as you need to. There will be a new entry on the Workbench for the newly setup connection and you can click on the icon to initiate a session.

![enter your password](http://helpdesk.getpantheon.comhttps://pantheon-systems.desk.com/customer/portal/attachments/224667)

At this point you are all set and can begin to administer your database as you need to. There will be a new entry on the Workbench for the newly setup connection and you can click on the icon to initiate a session.

![enter your password](https://pantheon-systems.desk.com/customer/portal/attachments/224655)

### Troubleshooting

#### Database credentials are no longer valid

The database credentials are updated whenever a server is migrated or updated. If you notice the connection fails, please be sure to verify that you have the current connection information for the environment. If not grab the new information from the site's dashboard.

![](https://pantheon-systems.desk.com/customer/portal/attachments/224670)​

#### Database is reaped

To conserve resources environments will be spun down after about two hours of inactivity. If your site is in a sleep mode you can get the following error:

![](https://pantheon-systems.desk.com/customer/portal/attachments/224763)​

Visit the environment's URL in the browser and this will "wake up" the reaped site. Once the page has loaded you can try to connect again and this time the database should be accessible. More information about this is available on the known limitations page.
