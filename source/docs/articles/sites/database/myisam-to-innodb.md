---
title: Moving MySQL Tables From MyISAM to InnoDB
description: Improve the reliability and performance of your database by moving to InnoDB.
category:
  - debugging

---

One of the best things to ever happen to MySQL was the [InnoDB](https://dev.mysql.com/doc/refman/5.5/en/innodb-storage-engine.html) engine. Before InnoDB, indexes would get corrupted, updates meant table locks—not just row locks, and there was no support for transactions. Since the advent of InnoDB we've come a long way. These days, most serious DBAs using MySQL build exclusively on the InnoDB engine.

However, many sites are still using the MyISAM engine. Some are hosted on shared hosting servers and some just don't have a proper DBA to look after their databases. These sites are missing out on the performance and stability gains that the rest of us take for granted. At Pantheon, we know there are a lot of these sites out there because we see them when they migrate their sites onto our platform. As part of our Launch Check, we check the engine type on every table. If we find a table using the MyISAM engine, we notify the user so they can fix it.

Fixing this problem is simple to any developer who understands SQL, but for non-developers it can be a daunting task. To make it easier, there is a PHP script you can use to help convert your MyISAM tables to InnoDB.

<div class="alert alert-danger" role="alert"><strong>Warning:</strong> This is an unofficial script and is not supported by Pantheon. We highly recommend making a backup of your database before running this script.</div>

##The Easy Way

**Note:** You must be a Pantheon customer to use this script.

1. Save the code in a file with the extension .php and SFTP it up to your site.
2. Place it in the code directory of your website.
3. Point a browser to your newly created script that should be in the root directory of your Dev environment:
http://your.dev.url.gotpantheon.com/filename.php

That's all there is to it—the script will do all the work.

Here's the browser version of the script:

<script src="https://gist.github.com/calevans/9944410.js"></script>

##The Developer Way

If you're not a Pantheon customer, or you want to run the script from the command line, use this script.

###Before You Begin

Make sure you have:

- PHP installed on your computer.
- Your database connection info for your Dev environment from your Site's Dashboard.

Here is the command line script:

<script src="https://gist.github.com/calevans/9943627.js"></script>

Here are the parameters you will need to configure before running the script:

- host = This is the name of the machine your db is running on. If you are a Pantheon customer localhost is wrong. Get the correct host and paste it in there to replace localhost.

- port = This is the port that is running MySQL on your computer. Again, if you are a Pantheon customer, we give you this information. If you are not, 3306 is the standard port for MySQL.

- user = This is the user name you use to connect to MySQL with.

- password = This is your MySQL password for the user you specified in the line above.

- database = This is the name of the database that contains the tables. If you are a pantheon customer, this is "pantheon". If you are not a Pantheon customer, you will need to get this from your host.

Now, save the file. Then from a command window execute the program.

The script will tell you everything it is doing. It has safeties built in to keep it from changing anything but MyISAM tables. It will look at every table in your database and if the engine is MyISAM, it will change it to an InnoDB.

Once you have run it successfully, check everything!

This is not a particularly dangerous script; the change is pretty simple. However, it's your data, so be careful.
