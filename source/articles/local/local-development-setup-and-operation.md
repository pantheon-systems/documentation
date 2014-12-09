---
title: Local development setup and operation
category:
  - getting-started
filename: source/_guides/local-development-setup-and-operation.md
---

While Pantheon provides a number of options for on-server development, local development has a number of advantages - especially if continuous internet access is a concern. While Pantheon cannot troubleshoot or support local development solution, we can provide some suggestions and known working solutions.  


As an alternative, if you're looking for self-contained local development solution on Mac, check out [Kalabox](http://www.kalamuna.com/products/kalabox), which integrates with the Pantheon platform.

## Setting up local development for a Pantheon site

At a high level, you'll need:

- A local development stack. Pantheon uses a [particular architecture to maximize performance and availability](/documentation/advanced-topics/all-about-application-containers/), but it's possible to run the same code on a different configurations. As long as the solution supports PHP 5.3 and MySQL, you should be fine.  [MAMP](http://www.mamp.info/),  [WAMP](http://www.wampserver.com/) and  [XAMPP](http://www.apachefriends.org/en/xampp.html) all work.
- Git client for tracking code changes
- SFTP client for transferring files OR rsync
- [Drush](/documentation/advanced-topics/drush-command-line-utility/) (recommended, not required)

To save time, clear the target site environment's cache from the Pantheon dashboard or from Drupal.

There are three parts to a Drupal website:

1. Code (Drupal, modules and themes)
2. Database (content)
3. Files (user uploaded and Drupal generated)

Each will need to be transferred from Pantheon to your local environment.

### Get the code

[Checkout the codebase using Git.](/documentation/getting-started/starting-with-git/)

### Get the database

There are several ways that you can get a copy of your Pantheon database.

You can download a complete database dump.

- On-demand - Workflow > Export > Export Database
- Scheduled or on-demand backup - Backups > Backup Log > Database download link

Then, import the database into your local environment using a MySQL client.

    gunzip < database.sql.gz | mysql -uUSER -pPASSWORD DATABASENAME

Alternatively, you can directly sync the content of your remote database to your local environment using [Drush](http://drush.org) and [sql-sync-pipe](https://drupal.org/project/drush_sql_sync_pipe)

    drush sql-sync-pipe @pantheon.SITENAME.ENV @self

### Get the files

For an overview of ways to transfer files, see [SFTP and rsync on Pantheon](/documentation/advanced-topics/rsync-and-sftp/).

You can use Drush to rsync the files over.

    drush @pantheon.SITENAME.ENV cc all
    drush -r . rsync @pantheon.SITENAME.ENV:%files @self:sites/default/

Alternatively, you can use SFTP which is slower but can be easier to use. If you don't have a GUI client like FileZilla, you can use the command line:

    cd sites/default
    # Paste SFTP connection info from dashboard
    get -r files
    exit

## Putting changes on Pantheon

### Send the code

Test your changes, then [git commit locally and push to Pantheon](/documentation/getting-started/starting-with-git/).

### Send the database

You can perform a local database dump using the MySQL utility mysqldump:

    mysqldump -uUSERNAME -pPASSWORD DATABASENAME | gzip > database.sql.gz

Then, import the resulting file into Pantheon from Workflow > Import

### Send the files

If you have drush and rsync, this is by far the easiest way:

    drush -r . rsync --temp-dir=../tmp/ @self:sites/default/files/ @pantheon.SITENAME.ENV:%files

Alternatively, you can use a SFTP client to upload the files.
