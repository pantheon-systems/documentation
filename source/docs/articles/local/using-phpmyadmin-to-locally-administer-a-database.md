---
title: Using PHPMyAdmin to Locally Administer a Database
description: Configure and troubleshoot MySQL connections and PHPMyAdmin for Pantheon sites.
category:
  - developing
keywords: phpmyadmin, database, mysql, mysql connection,
---
[PHPMyAdmin](https://github.com/phpmyadmin/phpmyadmin/) is a common tool to administer databases locally and can also provide DBAs the ability to access remote databases. PHPMyAdmin runs PHP, so you can install this on Windows, Mac OS X, and Linux.

## Download PHPMyAdmin

Visit [https://www.phpmyadmin.net/](https://www.phpmyadmin.net/) to download the latest version. For installation instructions or help with other issues, see the [PHPMyAdmin documentation](http://docs.phpmyadmin.net/en/latest/).

## Configure a New MySQL Connection

Since version 1.4.2, PHPMyAdmin added support for administration of multiple MySQL servers. To create a new connection, create a copy of config.sample.inc.php and rename this to config.php.

Add the necessary parameters for the environment's MySQL connection. You can find this on the Connection Info tab on the site's Dashboard above the code log:

```sql
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
```
Once this is done, set the permissions on the config.php to at least 755. This can be done via a GUI or using the command line:
```bash
chmod 755 config.inc.php
```
If the permissions are not correctly set, PHPMyAdmin will return an error prompting you to update the file so that it's not writeable. After the configuration is complete, the new connection will be available on the MySQL Workbench workspace. 

## Connect to the Database

You are now ready to administer your database. There will be a new entry on the Workbench for the newly set up connection and you can click the icon to initiate a session.
## Troubleshooting MySQL Connections
See [Accessing MySQL Databases](/docs/articles/local/accessing-mysql-databases).
