---
title: Platform Considerations
subtitle: PHP Platform Support
description: Learn more about Pantheon platform PHP support.
categories: [platform]
tags: [files, libraries, security, webops]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/platform-considerations/php-platform
anchorid: php-platform
---





## General PHP Framework Support

Pantheon does not currently support any PHP frameworks outside of Drupal and WordPress. The platform is only optimized for Drupal or WordPress and no others. Although PHP will run, we can not assist you in getting the non-approved frameworks running in any way.

## PHP Configuration

`php.ini` cannot be customized or overridden on the Platform. See [Securely Working with phpinfo](/guides/secure-development/phpinfo) for more information on PHP configuration.

## PHP/Java Bridge

Pantheon does not currently support the [PHP/Java Bridge](http://php-java-bridge.sourceforge.net/pjb/).

## PHP Maximum Execution Time Limit

The upper time limit for PHP processing on the platform is 120 seconds. This is outlined in the [Timeouts](/timeouts) documentation and it cannot be increased.  If a script is processing a large amount of data, for example, we recommend that the process be done in smaller batches that can execute sequentially to ensure success.

## PHP Sessions with WordPress

If you need to use PHP's native session handling, please install the [WordPress Native PHP Sessions](https://wordpress.org/plugins/wp-native-php-sessions/) plugin, which we maintain for this purpose. This provides a horizontally scalable storage mechanism for sessions.

You'll need the plugin if you are seeing errors like this:

```php
Warning: session_start(): user session functions not defined
```

[More information on sessions](/wordpress-sessions).

## PHP Short Tags

PHP short tags (`<? ... ?>`) are not supported on Pantheon. The [PHP Manual](https://secure.php.net/manual/en/language.basic-syntax.phpmode.php) recommends not utilizing short tags because they are not supported on every server. Additionally, using short tags can interfere with embedding PHP in XML. Avoiding their use leads to more portable, re-distributable code.

## Server Side Includes (SSI)

Pantheon does not and will not support Server Side Includes. We recommend converting those to use PHP includes.


## XML-RPC

The [XML-RPC PHP extension](https://www.php.net/manual/en/intro.xmlrpc.php) is, as of the last update to this document, listed as experimental and not included on the platform. Consider the [XML-RPC for PHP](http://gggeek.github.io/phpxmlrpc/) library as an alternative.

## MySQL LOAD DATA LOCAL INFILE

For [security reasons](https://dev.mysql.com/doc/refman/8.0/en/load-data-local-security.html), Pantheon does not support executing MySQL `LOAD DATA LOCAL INFILE` statements from your PHP application. As a workaround, developers can [connect directly to MySQL](/guides/mariadb-mysql/mysql-access) and load files from their local machine:

```bash{promptUser: user}
MariaDB [pantheon]> LOAD DATA LOCAL INFILE 'mydata.csv' INTO TABLE `pantheon`.`mytable` FIELDS TERMINATED BY ',' ENCLOSED BY '\"' LINES TERMINATED BY '\n';
```