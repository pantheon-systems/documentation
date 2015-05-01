---
title: MySQL Database
description: Learn about the Database that runs in your site
keywords: mysql, sql, database, db, databases
---
The Pantheon platform provides each site a dedicated MySQL container, which can be maintained remotely or locally depending on your workflow. For a comprehensive list of MySQL settings [access your database](/docs/articles/local/accessing-mysql-databases/#database-connection-information) and use the [SHOW VARIABLES](http://dev.mysql.com/doc/refman/5.0/en/show-variables.html) statement.

## Maintain Database Content and Configurations
The [Pantheon Workflow](/docs/articles/sites/code/using-the-pantheon-workflow/) moves content down from your Live environment to Test and then to Dev. This means that any content added via the database to your Live site can be imported into the existing database on the Test and Dev environments using the Workflow tool.

You can use [PHPMyAdmin](/docs/articles/local/using-phpmyadmin-to-locally-administer-a-database/) or [MySQL Workbench](/docs/articles/local/using-mysql-workbench-to-access-a-database/) to  administer your site's database
and [export configurations](/docs/articles/sites/code/using-the-pantheon-workflow/#exporting-configuration) as needed.

##Troubleshooting
- [MySQL Troubleshooting with New Relic Pro](/docs/articles/sites/newrelic/mysql-troubleshooting-with-new-relic-pro/)
- [MySQL Slow Log](/docs/articles/sites/database/mysql-slow-log/)
- [Converting MySQL Tables From MyISAM to InnoDB](/docs/articles/sites/database/myisam-to-innodb/)
- [Database Connection Errors](/docs/articles/sites/database/database-connection-errors/)
