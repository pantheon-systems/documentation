---
title: Using PHPMyAdmin to Locally Administer a Database
description: Configure and troubleshoot MySQL connections and PHPMyAdmin for Pantheon sites.
category:
  - developing
keywords: phpmyadmin, database, mysql, mysql connection,
---
[PHPMyAdmin](https://github.com/phpmyadmin/phpmyadmin/) is a common tool to administer databases locally and can also provide DBAs the ability to access remote databases. PHPMyAdmin runs PHP so it is possible to install this on Windows, Mac OS X, and Linux.

## Download PHPMyAdmin

The recommended way to get a copy of PHPMyAdmin is to download it via GitHub. You can review our instructions for [Accessing MySQL database](/docs/articles/local/accessing-mysql-databases/) for your site.
```nohighlight
git clone https://github.com/phpmyadmin/phpmyadmin.git
```
Alternatively, you can download a zip archive of the latest code from the GitHub repository.

<div class="alert alert-info" role="alert">
<strong>Note</strong>: A repository for PHPMyAdmin exists on SourceForge, but we recommend the GitHub version as you get direct access to the code.
</div>
## Configure a New MySQL Connection

Since version 1.4.2, PHPMyAdmin added support for administration of multiple MySQL servers. To create a new connection, create a copy of config.sample.inc.php and rename this to config.php.

Add the necessary parameters for the environment's MySQL connection. These can be found on the "Connection Information" widget available on the site's Dashboard above the code log:

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
Once this is done, the permissions on the config.php should be set to at least 755. This can be done via a GUI or using the command line:
```bash
chmod 755 config.inc.php
```
If the permissions are not correctly set, PHPMyAdmin will return an error prompting you to update the file so that it's not writeable.<br />
![enter your password](/source/docs/assets/images/desk_images/224903.png)<br />
After the configuration is complete, the new connection will be available on the MySQL Workbench workspace. 

## Connecting to the Database

At this point, you are all set and can begin to administer your database. There will be a new entry on the Workbench for the newly setup connection and you can click on the icon to initiate a session.<br />
![enter your password](/source/docs/assets/images/desk_images/224907.png)

## Troubleshooting

#### Unable to Connect to Remote Database

The database credentials are updated whenever a server is migrated or updated. If you notice the connection fails, please be sure to verify that you have the current connection information for the environment. If not, get the new information from the site's Dashboard.<br />
![](/source/docs/assets/images/desk_images/224915.png)​

#### Database Credentials are Invalid

The database credentials are updated whenever a server is migrated or updated. If you notice the connection fails, please be sure to verify that you have the current connection information for the environment. If not, get the new information from the site's dashboard.

#### Database is Reaped

To conserve resources environments will be spun down after about two hours of inactivity. If your site is in sleep mode, you may get the following error:

Go to the environment's URL in your browser to"wake up" the reaped site. Once the page has loaded, try to connect again, and this time the database should be accessible. More information about this is available on the [known limitations](/docs/articles/sites/known-limitations) page.
