---
title: PHPMyAdmin
description: Learn how to configure and use PHPMyAdmin to administrate databases.

---

[PHPMyAdmin](https://github.com/phpmyadmin/phpmyadmin/) is a common tool to administer databases locally and also provides DBAs the ability to access remote databases. PHPMyAdmin runs PHP so it isn't possible to install this on  Windows, Mac OS X and Linux.

## Download PHPMyAdmin

The recommended way to get a copy of PHPMyAdmin is to get this via github. can review the [Accessing MySQL database](/articles/advanced-topics/accessing-mysql-databases/) for your site.

    $ git clone https://github.com/phpmyadmin/phpmyadmin.git

Alternatively you can download a zip archive of the latest code from the github repository.

**Note:** A repository for PHPMyAdmin exists on sourceforge but we recommend the github version as you get direct access to the code.

## Configuring a new MyySQL connection

Since version 1.4.2, PHPMyAdmin added support for administration of multiple MySQL servers. To create a new connection create a copy of `config.sample.inc.php` and renaming this to `config.php`.

Add in the necessary parameters for the environment's MySQL connection. These can be found on the "Connection Information" widget available on the site's dashboard above the code log:

    /* Authentication type */
    $cfg['Servers'][$i]['auth_type'] = 'config';
    /* Server parameters */
    $cfg['Servers'][$i]['host'] = 'dbserver.dev.70f6d692-530d-4420-b3a5-79e0187602ca.drush.in';
    $cfg['Servers'][$i]['user'] = 'pantheon';
    $cfg['Servers'][$i]['port'] = '14411';
    $cfg['Servers'][$i]['password'] = '1ed7d4c6af8947c0937f2238731fee88';
    $cfg['Servers'][$i]['connect_type'] = 'tcp';
    $cfg['Servers'][$i]['compress'] = false;
    /* Select mysql if your server does not have mysqli */
    $cfg['Servers'][$i]['extension'] = 'mysqli';
    $cfg['Servers'][$i]['AllowNoPassword'] = false;

Once this is done the permissions on the `config.php` should be set to 755 at least, this can be done via a GUI or using the command line:

    $ chmod 755 config.inc.php

If the permissions are not correctly set, PHPMyAdmin will return an error prompting you to update the file so it is not writeable.

 

![enter your password](https://pantheon-systems.desk.com/customer/portal/attachments/224903)

After the configuration is complete, the new connection will available on the MySQL Workbench workspace. 

#### Connecting to the Database

At this point you are all set and can begin to administer your database as you need to. There will be a new entry on the Workbench for the newly setup connection and you can click on the icon to initiate a session.

![enter your password](https://pantheon-systems.desk.com/customer/portal/attachments/224907)

## Troubleshooting

#### Unable to Connect to Remote Database

The database credentials are updated whenever a server is migrated or updated. If you notice the connection fails, please be sure to verify that you have the current connection information for the environment. If not grab the new information from the site's dashboard.

![](https://pantheon-systems.desk.com/customer/portal/attachments/224915)​

#### Database Credentials are Invalid

The database credentials are updated whenever a server is migrated or updated. If you notice the connection fails, please be sure to verify that you have the current connection information for the environment. If not grab the new information from the site's dashboard.

#### Database is Reaped

To conserve resources environments will be spun down after about two hours of inactivity. If your site is in a sleep mode you can get the following error:

Visit the environment's URL in the browser and this will "wake up" the reaped site. Once the page has loaded you can try to connect again and this time the database should be accessible. More information about this is available on the known limitations page.
