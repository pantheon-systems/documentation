---
title: Converting MySQL Tables From MyISAM to InnoDB
description: Improve the reliability and performance of your MySQL database by moving to InnoDB.
category:
  - debugging
keywords: innodb, mysql, convert mysql tables, myisam, convert myisam to innodb, how to convert mysql tables, sql tables, innodb tables, mysql performance, sql performance
---
Before [InnoDB](https://dev.mysql.com/doc/refman/5.5/en/innodb-storage-engine.html), indexes would get corrupted, updates meant table locks—not just row locks, and there was no support for transactions. Since the advent of InnoDB we've come a long way.

Sites that don't use InnoDB are missing out on performance and stability gains.  As part of our Launch Check for new sites, we check the engine type on every table. If we find a table using the MyISAM engine, we notify the user so they can fix it. To make it easy, there is a PHP script you can use to help convert your MyISAM tables to InnoDB.

<div class="alert alert-danger" role="alert"><h4>Warning</h4>
 This is an unofficial script and is not supported by Pantheon. We highly recommend making a backup of your database before running this script.</div>

##Simple Script

<div class="alert alert-info" role="alert">
<h4>Note</h4>
You must be a Pantheon customer to use this script.</div>

1. Save the code in a file with the extension .php and SFTP it up to your site.
2. Place it in the code directory of your website.
3. Point a browser to your newly created script that's located in the root directory of your Dev environment:
http://your.dev.url.gotpantheon.com/filename.php

That's all there is to it—the script will do all the work.

Here's the browser version of the script:

<script src="//gist.github.com/calevans/9944410.js"></script>

##Advanced Method

If you want to run the script from the command line instead of adding it to your codebase, use this script.

###Before You Begin

Make sure you have:

- PHP installed on your computer
- Your database connection info for your Dev environment from your Site's Dashboard

Here is the command line script:

<script src="//gist.github.com/calevans/9943627.js"></script>

Here are the parameters you will need to configure before running the script:
<dl>
	<dt>host</dt>
	<dd>This is the name of the machine your db is running on. If you are a Pantheon customer localhost is wrong. Get the correct host and paste it in there to replace localhost.</dd><br>
  <dt>port</dt>
  <dd>This is the port that is running MySQL on your computer. Again, if you are a Pantheon customer, we give you this information. If you are not, 3306 is the standard port for MySQL.</dd><br>
  <dt>user </dt>
  <dd>This is the user name you use to connect to MySQL with.</dd><br>
  <dt>password</dt>
  <dd>This is your MySQL password for the user you specified in the line above.</dd><br>
  <dt>database</dt>
  <dd>This is the name of the database that contains the tables. If you are a pantheon customer, this is "pantheon". If you are not a Pantheon customer, you will need to get this from your host.</dd>
</dl>

Now, save the file. Execute the program from a command window.

The script will alert you to everything it's doing. It has safeties built in to keep it from changing anything but MyISAM tables. It will look at every table in your database, and if the engine is MyISAM, it will change it to an InnoDB.

Once you have run it successfully, check everything. This is not a dangerous script; the change is pretty simple. However, it's your data, so be careful.
