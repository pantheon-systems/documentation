---
title: MySQL Database Workflow Tool
description: Learn about the Database that runs in your site
keywords: mysql, sql, database, db, databases
---
The Pantheon platform provides each site environment a dedicated MySQL container, which can be maintained remotely or locally depending on your workflow. For a comprehensive list of MySQL settings [access your database](/docs/articles/local/accessing-mysql-databases/#database-connection-information) and use the [SHOW VARIABLES](http://dev.mysql.com/doc/refman/5.0/en/show-variables.html) statement.
## Maintain Database Content and Configurations
The [Pantheon Workflow](/docs/articles/sites/code/using-the-pantheon-workflow/) moves code up from Dev to Test to Live and content down from Live to Test to Dev. Using the Workflow tool, you can overwrite the databases on your site's Dev or Test environment with the database on your Live environment, allowing you to pull content from Live into other environments.
![Workflow Tool](/source/docs/assets/images/interface-workflow-tool.png)

### MySQL Clients
You can use any number of MySQL clients such as [PHPMyAdmin](/docs/articles/local/using-phpmyadmin-to-locally-administer-a-database/) or [MySQL Workbench](/docs/articles/local/using-mysql-workbench-to-access-a-database/) to  administer your site's database
and [export configurations](/docs/articles/sites/code/using-the-pantheon-workflow/#exporting-configuration) as needed.

<div class="alert alert-danger"><strong>Warning:</strong> Pushing content up to live should almost never be done to a launched site, as it can overwrite the environment configurations. </div>

##Troubleshooting
- [MySQL Troubleshooting with New Relic Pro](/docs/articles/sites/newrelic/mysql-troubleshooting-with-new-relic-pro/)
- [MySQL Slow Log](/docs/articles/sites/database/mysql-slow-log/)
- [Converting MySQL Tables From MyISAM to InnoDB](/docs/articles/sites/database/myisam-to-innodb/)
- [Database Connection Errors](/docs/articles/sites/database/database-connection-errors/)
