---
title: Local Development Setup and Operation
description: Suggestions and solutions for working locally.
category:
- getting-started
keywords: local development, pantheon, develop locally, developing
---
While Pantheon provides a number of options for on-server development, local development has a number of advantages, especially if continuous Internet access is a concern. While Pantheon cannot troubleshoot or support local development solutions, we can provide some suggestions and known working solutions.  

If you're looking for a self-contained local development solution on Mac, check out [Kalabox](http://www.kalamuna.com/products/kalabox), which integrates with the Pantheon platform.

## Setting up Local Development for a Pantheon Site

To begin, you'll need:

- A local development stack. Pantheon uses a [particular architecture to maximize performance and availability](/docs/articles/sites/all-about-application-containers/), but it's possible to run the same code on a different configurations. As long as the solution supports a minimum of PHP 5.3 and MySQL, you should be fine.  [MAMP](http://www.mamp.info/),  [WAMP](http://www.wampserver.com/) and  [XAMPP](http://www.apachefriends.org/en/xampp.html) all work.
- Git client for tracking code changes.
- SFTP client, such as [FileZilla](https://filezilla-project.org/ "FileZilla, a Cross-platform GUI SFTP client."), for transferring files OR rsync.
- [Terminus](https://github.com/pantheon-systems/cli)
- [Drush](/docs/articles/local/drush-command-line-utility/) (optional)

To save time, clear the target site environment's cache. This can be done from the Pantheon dashboard, from the application itself, or by running the following Terminus command:

```
terminus site clear-caches --site=<site> --env=<env>
```

**Note**: Replace `<site>` with your site name, and `<env>` with the environment (dev, test, or live). You can see a list of all your sites by running `terminus sites list`

There are three parts to any dynamic website:

1. Code (The application, modules or plugins, and themes)
1. Database (content)
1. Files (user uploaded or application generated)

Each will need to be transferred from Pantheon to your local environment.

### Get the Code

[Checkout the codebase using Git.](/docs/articles/local/starting-with-git/#clone-your-site-codebase)

### Get the Database

#### Via the Pantheon Dashboard

There are several ways to get a copy of your Pantheon database. One way is to download a complete database dump from within the Site dashboard:

- On-demand: Workflow > Export > Export Database
- Scheduled or on-demand backup: Backups > Backup Log > Database download link

Next, import the database into your local environment using a MySQL client.

````
$ gunzip < database.sql.gz | mysql -uUSER -pPASSWORD DATABASENAME
````
**Note**: Replace `database.sql.gz` with the name of the database archive downloaded from Pantheon.

#### Via Terminus

You can also export the database running the following Terminus commands:

```
terminus site backup create --element=database --site=<site> --env=<env>
terminus site backup get --element=database --site=<site> --env=<env> --to-directory=$HOME/Desktop/ --latest
```

This will create and download the database to your Desktop. Once you have exported it to a local file, you can import it into your local MySQL database using the following command:

````
$ gunzip < database.sql.gz | mysql -uUSER -pPASSWORD DATABASENAME
````
**Note**: Replace `database.sql.gz` with the name of the database archive downloaded from Pantheon.

### Get the Files

For an overview of ways to transfer files, see [SFTP and rsync on Pantheon](/docs/articles/local/rsync-and-sftp/).

#### Via Terminus

Run the following Terminus commands:
```
terminus site backup create --element=files --site=<site> --env=<env>
terminus site backup get --element=files --site=<site> --env=<env> --to-directory=$HOME/Desktop/ --latest
```
This will create and download a backup of the site's files to your Desktop.

#### Via SFTP

SFTP is slower, but easier to use for some. If you don't have a GUI client like FileZilla, you can use the command line.

- Go to your Pantheon Dashboard and [copy the CLI command](/docs/articles/sites/code/developing-directly-with-sftp-mode/#sftp-connection-information).
- Open a terminal window.
- Navigate to the proper directory.
    - **Drupal**: sites/default
    - **WordPress**: wp-content/uploads
- Paste the SFTP connection command copied from your Pantheon Dashboard into your terminal window, and press ENTER.
- Enter `get -r *` and press ENTER to transfer the files down to your local environment.  
- Once complete enter `exit` and press ENTER to exit your SFTP program.

## Submitting Changes to Pantheon

### Send the Code

Test your changes, then [Git commit locally and push to Pantheon](/docs/articles/local/starting-with-git/#push-changes-to-pantheon).

### Send the Database

Perform a local database dump using the MySQL utility mysqldump:
```
mysqldump -uUSERNAME -pPASSWORD DATABASENAME | gzip > database.sql.gz
```
Then import the file from the Pantheon Dashboard by accessing Workflow > Import. Upload the database archive and click **Import**.

### Send the Files

#### Drupal: Via Drush
If you have Drush and rsync, this is by far the easiest way to transfer your files up to your Pantheon site:

````
drush -r . rsync --temp-dir=../tmp/ @self:sites/default/files/ @pantheon.SITENAME.ENV:%files
````

#### WordPress or Drupal: Via SFTP
If you are using WordPress or you do not have Drush and rsync, you can use your SFTP client to upload the files.

- Go to your Pantheon Dashboard and [copy the CLI command](/docs/articles/sites/code/developing-directly-with-sftp-mode/#sftp-connection-information).
- Open a terminal window.
- Navigate to the proper directory on your local file system.
    - **Drupal**: sites/default/files
    - **WordPress**: wp-content/uploads
- Paste the SFTP connection command copied from your Pantheon Dashboard into your terminal window and press ENTER.
- Enter `cd files` and press ENTER
- Enter `put -r ./*` and press ENTER to transfer the files up.  
- Once complete enter `exit` and press ENTER to exit your SFTP program.

You can of course transfer a single file or a single directory at a time instead of transferring every file, every time.
