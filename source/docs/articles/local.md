---
title: Local Development Setup and Operation
description: Suggestions and solutions for working locally.
category:
- getting-started

---

While Pantheon provides a number of options for on-server development, local development has a number of advantages, especially if continuous Internet access is a concern. While Pantheon cannot troubleshoot or support local development solutions, we can provide some suggestions and known working solutions.  

If you're looking for a self-contained local development solution on Mac, check out [Kalabox](http://www.kalamuna.com/products/kalabox), which integrates with the Pantheon platform.

## Setting up Local Development for a Pantheon Site

To begin, you'll need:

- A local development stack. Pantheon uses a [particular architecture to maximize performance and availability](/docs/articles/architecture/all-about-application-containers/), but it's possible to run the same code on a different configurations. As long as the solution supports a minimum of PHP 5.3 and MySQL, you should be fine.  [MAMP](http://www.mamp.info/),  [WAMP](http://www.wampserver.com/) and  [XAMPP](http://www.apachefriends.org/en/xampp.html) all work.
- Git client for tracking code changes.
- SFTP client like [FileZilla](https://filezilla-project.org/ "FileZilla, a Cross-platform GUI SFTP client.") for transferring files OR rsync.
- [Terminus](https://github.com/pantheon-systems/cli)

### Drupal Note

 - [Drush](/docs/articles/local/drush-command-line-utility/) (recommended, not required).

To save time, clear the target site environment's cache from the Pantheon dashboard or from the application itself.

There are three parts to any website:

1. Code (The application, modules or plugins, and themes)
1. Database (content)
1. Files (user uploaded or application generated)

Each will need to be transferred from Pantheon to your local environment.

### Get the Code

[Checkout the codebase using Git](/docs/articles/local/starting-with-git/)

### Get the Database

There are several ways to get a copy of your Pantheon database.

- You can download a complete database dump.

  - On-demand: Workflow > Export > Export Database
  - Scheduled or on-demand backup: Backups > Backup Log > Database download link

- Import the database into your local environment using a MySQL client.

````
$ gunzip < database.sql.gz | mysql -uUSER -pPASSWORD DATABASENAME
````

#### Drupal Note
If you have Drush installed, you can directly sync the content of your remote database to your local environment using [Drush](http://drush.org) and [sql-sync-pipe](https://drupal.org/project/drush_sql_sync_pipe).

````
$ drush sql-sync-pipe @pantheon.SITENAME.ENV @self
````

#### WordPress Note
If you have terminus installed, you can export the database database from your WordPress powered site with this command.

````
$ terminus wp db export - --site=SITE_NAME --env=dev|test|live > database.sql
````

The single `-` after the export command is important as it will force the output to be sent to your terminal to be captured in a file named `database.sql`.

Once you have exported it to a local file, you can import it into your local MySQL database.

````
mysql -uUSER -pPASSWORD DATABASENAME < database.sql
````


### Get the Files

For an overview of ways to transfer files, see [SFTP and rsync on Pantheon](/docs/articles/local/rsync-and-sftp/).

**Drupal: Via Drush** 

drush @pantheon.SITENAME.ENV cc all
drush -r . rsync @pantheon.SITENAME.ENV:%files @self:sites/default/

**WordPress or Drupal Via SFTP**   
SFTP is slower but is easier to use. If you don't have a GUI client like FileZilla, you can use the command line on your OS. 

- Go to your Pantheon dashboard and copy the sftp command. 
- Open a command line session on your OS
- Navigate to the proper directory.
    - **Drupal** sites/default
    - **WordPress** wp-content/uploads
- Paste SFTP connection info copied from your Pantheon dashboard into your command line window and press ENTER.
- Enter `get -r *` and press ENTER to transfer the files down to your local environment.  
- Once complete enter `exit` and press ENTER to exit your SFTP program.

## Submitting Changes to Pantheon

### Send the Code

Test your changes, then [Git commit locally and push to Pantheon](/docs/articles/local/starting-with-git/).

### Send the Database

Perform a local database dump using the MySQL utility mysqldump:

mysqldump -uUSERNAME -pPASSWORD DATABASENAME | gzip > database.sql.gz

Then import the file into Pantheon from Workflow > Import.

### Send the Files

#### Drupal Note
If you have drush and rsync, this is by far the easiest way to trasnfer your files up to your Pantheon site. (Files, not code)

````
drush -r . rsync --temp-dir=../tmp/ @self:sites/default/files/ @pantheon.SITENAME.ENV:%files
````

#### Both WordPress and Drupal
If you are using WordPress or you do not have drush and rsync, you can use your SFTP client to upload the files.

- Go to your Pantheon dashboard and copy the sftp command. 
- Open a command line session on your OS
- Navigate to the proper directory on your local file system.
    - **Drupal** sites/default
    - **WordPress** wp-content/uploads
- Paste SFTP connection info copied from your Pantheon dashboard into your command line window and press ENTER.
    - **Drupal** Enter `cd files/sites/default` and press ENTER
    - **WordPress** enter `cd files/wp-content/uploads` and press ENTER
- Enter `put -r ./*` and press ENTER to transfer the files up.  
- Once complete enter `exit` and press ENTER to exit your SFTP program.

You can of course transfer a single file or a single directory at a time instead of transfering eveyr file, every time. 