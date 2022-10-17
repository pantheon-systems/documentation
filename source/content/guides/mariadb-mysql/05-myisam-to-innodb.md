---
title: MariaDB and MySQL on Pantheon
subtitle: Convert MySQL Tables from MyISAM to InnoDB
description: Improve the reliability and performance of your MySQL database by moving to InnoDB.
categories: [develop]
tags: [database, cli]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/mariadb-mysql/myisam-to-innodb
anchorid: myisam-to-innodb
---

This section provides information on how to convert MySQL Tables from MyISAM to InnoDB.

Sites that use [InnoDB](https://dev.mysql.com/doc/refman/5.5/en/innodb-storage-engine.html) have better performance and stability gains. Pantheon's Launch Check for new sites looks at the engine type on every table, and notifies you if a table uses MyISAM engine, so you can fix it. There is a PHP script you can use to help convert your MyISAM tables to InnoDB.

<Alert title="Warning" type="danger">

This is an unofficial script and is not supported by Pantheon. We highly recommend making a backup of your database before running this script.

Always make sure to delete the script after successfully converting your database.

</Alert>

## MySQL Command

Run the command below from the MySQL command prompt to convert a table from MyISAM to InnoDB:

```sql
ALTER TABLE table_name ENGINE=InnoDB;
```

## Simple PHP Script

<Alert title="Note" type="info">

This script is designed specifically for sites running on the Pantheon platform, and will not work for other databases.

</Alert>

1. Save the code in a file with the extension `.php` and add it to your site root.
1. Upload the new PHP file to your site via SFTP or Git.
1. Point a browser to your newly created script that's located in the root directory of your Dev environment:

  ```none
  https://dev-yoursite.pantheonsite.io/filename.php
  ```


You can view the browser version of the script below:

<TabList>

<Tab title="PHP 5" id="php5" active={true}>

```php:title=myisam-to-innodb.php
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

<Tab title="PHP 7" id="php7" active={true}>

```php:title=myisam-to-innodb.php
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

Use the script below if you want to run the script from the command line instead of adding it to your codebase. 

### Before You Begin

Make sure you have:

- PHP installed on your computer
- Your [database connection info](/guides/mariadb-mysql/mysql-access#accessing-the-database-directly)


1. Copy the script below.

    ```php:title=myisam-to-innbodb.php
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

1. Configure the parameters below:

    - **Host:** This is the name of the remote machine your database is running on. If you are a Pantheon customer, `localhost` is wrong. Get the correct host from your [Site Dashboard](/guides/mariadb-mysql/mysql-access/#database-connection-information) and paste it in the PHP script to replace `localhost`.

    - **Port:** This is the port that is running MySQL on your computer. Again, if you are a Pantheon customer, we give you this information. If you are not, `3306` is the standard port for MySQL.

    - **User:** This is the user name you use to connect to MySQL.

    - **Password:** This is your MySQL password for the user you specified in the line above.

    - **Database:** This is the name of the database that contains the tables. If you are a pantheon customer, this is `pantheon`. If you are not a Pantheon customer, you will need to get this from your host.
    
1. Save the script in a file with a `.php` extension in your home directory, and set it as executable.

1. Execute the program from a command window.

The script will alert you to everything it's doing. It has safety protocols built in to keep it from changing anything but MyISAM tables. It will look at every table in your database, and if the engine is MyISAM, it will change it to an InnoDB.

Review the changes carefully after you have run the program successfully.

## More Resources

- [Access MySQL Databases](/guides/mariadb-mysql/mysql-access)

- [Global CDN](/guides/global-cdn)