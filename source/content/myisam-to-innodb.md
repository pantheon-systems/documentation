---
title: Converting MySQL Tables From MyISAM to InnoDB
description: Improve the reliability and performance of your MySQL database by moving to InnoDB.
tags: [status]
categories: [performance,go-live]
---
Before [InnoDB](https://dev.mysql.com/doc/refman/5.5/en/innodb-storage-engine.html), indexes would get corrupted, updates meant table locks—not just row locks, and there was no support for transactions. Since the advent of InnoDB we've come a long way.

Sites that don't use InnoDB are missing out on performance and stability gains.  As part of our Launch Check for new sites, we check the engine type on every table. If we find a table using the MyISAM engine, we notify the user so they can fix it. To make it easy, there is a PHP script you can use to help convert your MyISAM tables to InnoDB.

<Alert title="Warning" type="danger">

This is an unofficial script and is not supported by Pantheon. We highly recommend making a backup of your database before running this script. Always make sure to delete the file/script once you are successful converting your database.

</Alert>

## MySQL Command

Run this from the MySQL command prompt to convert a table from MyISAM to InnoDB:

```
ALTER TABLE table_name ENGINE=InnoDB;
```

## Simple PHP Script

<Alert title="Note" type="info">

You must be a Pantheon customer to use this script.

</Alert>

1. Save the code in a file with the extension `.php` and add it to your site root.
2. Upload the new PHP file to your site via SFTP or Git.
3. Point a browser to your newly created script that's located in the root directory of your Dev environment:

        https://dev-yoursite.pantheonsite.io/filename.php

That's all there is to it — the script will do all the work.

Here's the browser version of the script:


<TabList>

<Tab title="PHP 5" id="php5" active={true}>

```php
<h1>Pantheon MyISAM to InnoDB engine converter</h1>

<?php
/*
* Use this script ONLY if you are a Pantheon customer.
* ONLY RUN THIS SCRIPT IN DEV!
*/
$mysqli = @new mysqli($_ENV['DB_HOST'] . ':' . $_ENV['DB_PORT'], $_ENV['DB_USER'], $_ENV['DB_PASSWORD'], $_ENV['DB_NAME']);

if ($mysqli->connect_errno) {
  echo "<h1>Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error ."</h1>\n";
  die(1);
}

$results = $mysqli->query("show tables;");

if ($results===false or $mysqli->connect_errno) {
  echo "<h1>MySQL error: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error ."</h1>\n";
  die(2);
}

while ($row= $results->fetch_assoc())
{
  $sql = "SHOW TABLE STATUS WHERE Name = '{$row['Tables_in_pantheon']}'";
  $thisTable = $mysqli->query($sql)->fetch_assoc();

  if ($thisTable['Engine']==='MyISAM') {
    $sql = "alter table " . $row['Tables_in_pantheon'] . " ENGINE = InnoDB;";
    echo $row['Tables_in_pantheon'] . " is using the " . $thisTable['Engine'] . " Engine. <span class='red'>[ Changing ]</span> <br />\n";
    $mysqli->query($sql);
  } else {
    echo $row['Tables_in_pantheon'] . ' is already using the ' . $thisTable['Engine'] . " Engine. <span class='green'>[ Ignoring ]</span> <br />\n";
  }
};

die(0);
```

</Tab>

<Tab title="PHP 7" id="php7">

```php

<h1>Pantheon MyISAM to InnoDB engine converter</h1>

<?php
/*
* Use this script ONLY if you are a Pantheon customer.
* ONLY RUN THIS SCRIPT IN DEV!
*/
$mysqli = @new mysqli($_ENV['DB_HOST'], $_ENV['DB_USER'], $_ENV['DB_PASSWORD'], $_ENV['DB_NAME'], $_ENV['DB_PORT']);

if ($mysqli->connect_errno) {
  echo "<h1>Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error ."</h1>\n";
  die(1);
}

$results = $mysqli->query("show tables;");

if ($results===false or $mysqli->connect_errno) {
  echo "<h1>MySQL error: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error ."</h1>\n";
  die(2);
}

while ($row= $results->fetch_assoc())
{
  $sql = "SHOW TABLE STATUS WHERE Name = '{$row['Tables_in_pantheon']}'";
  $thisTable = $mysqli->query($sql)->fetch_assoc();

  if ($thisTable['Engine']==='MyISAM') {
    $sql = "alter table " . $row['Tables_in_pantheon'] . " ENGINE = InnoDB;";
    echo $row['Tables_in_pantheon'] . " is using the " . $thisTable['Engine'] . " Engine. <span class='red'>[ Changing ]</span> <br />\n";
    $mysqli->query($sql);
  } else {
    echo $row['Tables_in_pantheon'] . ' is already using the ' . $thisTable['Engine'] . " Engine. <span class='green'>[ Ignoring ]</span> <br />\n";
  }
};

die(0);
```

</Tab>

</TabList>

## Advanced Method via Command Line

If you want to run the script from the command line instead of adding it to your codebase, use this script.

### Before You Begin

Make sure you have:

- PHP installed on your computer
- Your database connection info for your Dev environment from your Site's Dashboard
- Copy the script below and save it in a file with a `.php` extension in your home directory.

Here is the command line script:

```
<?php
/*
 * Use this version if you are NOT a Pantheon customer.
 */
$db = array();
/*
 * Change these to match your database connection information
 */
$db['host']     = "localhost";
$db['port']     = "3306";
$db['user']     = "";
$db['password'] = "";
$db['database'] = "";
/*
 * DO NOT CHANGE ANYTHING BELOW THIS LINE
 * Unless you know what you are doing. :)
 */
$db['connectString'] = $db['host'];
if (isset($db['port']) && (int)$db['port']==$db['port']) {
    $db['connectString'] .= ":" . $db['port'];
}
$mysqli = @new mysqli($db['connectString'], $db['user'], $db['password'], $db['database']);
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error ."\n";
    die(1);
}
$results = $mysqli->query("show tables;");
if ($results===false or $mysqli->connect_errno) {
    echo "MySQL error: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error ."\n";
    die(2);
}
while ($row= $results->fetch_assoc()) {
    $sql = "SHOW TABLE STATUS WHERE Name = '{$row['Tables_in_' . $db['database']]}'";
    $thisTable = $mysqli->query($sql)->fetch_assoc();
    if ($thisTable['Engine']==='MyISAM') {
        $sql = "alter table " . $row['Tables_in_' . $db['database']]. " ENGINE = InnoDB;";
        echo "Changing {$row['Tables_in_' . $db['database']]} from {$thisTable['Engine']} to InnoDB.\n";
        $mysqli->query($sql);
    } else {
        echo $row['Tables_in_' . $db['database']] . ' is of the Engine Type ' . $thisTable['Engine'] . ".\n";
        echo "Not changing to InnoDB.\n\n";
    }
}
die(0);
```

Here are the parameters you will need to configure before running the script:

<dl>

<dt>host</dt>

<dd>

This is the name of the remote machine your database is running on. If you are a Pantheon customer, localhost is wrong. Get the correct host from your [Site Dashboard](/mysql-access/#database-connection-information) and paste it in the PHP script to replace localhost.

</dd>

<dt>port</dt>

<dd>

This is the port that is running MySQL on your computer. Again, if you are a Pantheon customer, we give you this information. If you are not, 3306 is the standard port for MySQL.

</dd>

<dt>user</dt>

<dd>

This is the user name you use to connect to MySQL with.

</dd>

<dt>password</dt>

<dd>

This is your MySQL password for the user you specified in the line above.

</dd>

<dt>database</dt>

<dd>

This is the name of the database that contains the tables. If you are a pantheon customer, this is "pantheon". If you are not a Pantheon customer, you will need to get this from your host.

</dd>

</dl>

Now, save the file. Execute the program from a command window.

The script will alert you to everything it's doing. It has safeties built in to keep it from changing anything but MyISAM tables. It will look at every table in your database, and if the engine is MyISAM, it will change it to an InnoDB.

Once you have run it successfully, check everything. This is not a dangerous script; the change is pretty simple. However, it's your data, so be careful.
