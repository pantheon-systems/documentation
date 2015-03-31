---
title: Local Development Setup and Operation
description: Suggestions and solutions for working locally.
category:
- getting-started

---

While Pantheon provides a number of options for on-server development, local development has a number of advantages, especially if continuous internet access is a concern. While Pantheon cannot troubleshoot or support local development solutions, we can provide some suggestions and known working solutions.  

If you're looking for a self-contained local development solution on Mac, check out [Kalabox](http://www.kalamuna.com/products/kalabox), which integrates with the Pantheon platform.

## Setting up Local Development for a Pantheon Site

To begin, you'll need:

- A local development stack. Pantheon uses a [particular architecture to maximize performance and availability](/docs/articles/architecture/all-about-application-containers/), but it's possible to run the same code on a different configurations. As long as the solution supports PHP 5.3 and MySQL, you should be fine.  [MAMP](http://www.mamp.info/),  [WAMP](http://www.wampserver.com/) and  [XAMPP](http://www.apachefriends.org/en/xampp.html) all work.
- Git client for tracking code changes.
- SFTP client for transferring files OR rsync.
- [Drush](/docs/articles/local/drush-command-line-utility/) (recommended, not required).

To save time, clear the target site environment's cache from the Pantheon dashboard or from Drupal.

There are three parts to a Drupal website:

1. Code (Drupal, modules, and themes)
2. Database (content)
3. Files (user uploaded and Drupal generated)

Each will need to be transferred from Pantheon to your local environment.

### Get the Code

[Checkout the codebase using Git.](/docs/articles/local/starting-with-git/#clone-your-site-codebase)

### Get the Database

There are several ways to get a copy of your Pantheon database.

- You can download a complete database dump.
  - On-demand: Workflow > Export > Export Database
  - Scheduled or on-demand backup: Backups > Backup Log > Database download link
- Import the database into your local environment using a MySQL client.
`gunzip < database.sql.gz | mysql -uUSER -pPASSWORD DATABASENAME`

### Get the Files

For an overview of ways to transfer files, see [SFTP and rsync on Pantheon](/docs/articles/local/rsync-and-sftp/).

**Via Drush:**

```
drush @pantheon.SITENAME.ENV cc all
drush -r . rsync @pantheon.SITENAME.ENV:%files @self:sites/default/
```
**Via SFTP:**
SFTP is slower but can be easier to use. If you don't have a GUI client like FileZilla, you can use the command line:
```
cd sites/default  
# Paste SFTP connection info from dashboard  
get -r files  
exit
```
## Submitting Changes to Pantheon

### Send the Code

Test your changes, then [Git commit locally and push to Pantheon](/docs/articles/local/starting-with-git/#push-changes-to-pantheon).

### Send the Database

Perform a local database dump using the MySQL utility mysqldump:
```
mysqldump -uUSERNAME -pPASSWORD DATABASENAME | gzip > database.sql.gz
```
Then import the file into Pantheon from Workflow > Import.

### Send the Files

If you have drush and rsync, this is by far the easiest way:
```
drush -r . rsync --temp-dir=../tmp/ @self:sites/default/files/ @pantheon.SITENAME.ENV:%files
```
You can also use an SFTP client to upload the files.
