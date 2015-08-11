---
title: Using PHPMyAdmin to Locally Administer a Database
description: Configure and troubleshoot MySQL connections and PHPMyAdmin for Pantheon sites.
category:
  - developing
keywords: phpmyadmin, database, mysql, mysql connection,
---
[PHPMyAdmin](https://github.com/phpmyadmin/phpmyadmin/) is a common tool to administer databases locally and can also provide DBAs the ability to access remote databases. PHPMyAdmin runs PHP, so you can install this on Windows, Mac OS X, and Linux.

## Download PHPMyAdmin

The recommended way to get a copy of PHPMyAdmin is to download it via GitHub. For instructions, see [Accessing MySQL database](/docs/articles/local/accessing-mysql-databases/).
```nohighlight
git clone https://github.com/phpmyadmin/phpmyadmin.git
```
Alternatively, you can download a zip archive of the latest code from the GitHub repository.

<div class="alert alert-info" role="alert">
<h4>Note</h4>
A repository for PHPMyAdmin exists on SourceForge, but we recommend the GitHub version as you get direct access to the code.
</div>
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

## Troubleshooting

#### Unable to Connect to Remote Database

The database credentials are updated whenever a server is migrated or updated. If you notice the connection fails, verify that you have the current connection information for the environment. If not, get the new information from the site's Dashboard.

#### Database Credentials are Invalid

The database credentials are updated whenever a server is migrated or updated. If you notice the connection fails, verify that you have the current connection information for the environment. If not, get the new information from the site's dashboard.

#### Database is Reaped

To conserve resources, environments are spun down after about two hours of inactivity. If your site is in sleep mode, you may get an error. Go to the environment's URL in your browser to "wake up" the reaped site. Once the page has loaded, try to connect again, and this time the database should be accessible. For more information, see [Known Limitations](/docs/articles/sites/known-limitations).
