---
title: Local Development Setup and Operation
description: Suggestions and solutions for working locally on your Pantheon Drupal or WordPress site.
category:
- getting-started
keywords: local development, pantheon, develop locally, developing
---
While Pantheon provides several options for on-server development, local development has a number of advantages, especially if continuous Internet access is a concern. Pantheon cannot troubleshoot or support local development solutions, however we can provide some suggestions and known working solutions.  
If you're looking for a self-contained local development solution, check out [Kalabox](http://www.kalamuna.com/products/kalabox), which integrates with the Pantheon platform.

## Before You Begin
Be sure you have:

- A local development stack. Pantheon uses a [particular architecture to maximize performance and availability](/docs/articles/sites/all-about-application-containers/), but it's possible to run the same code on a different configurations. As long as the solution supports a minimum of PHP 5.3 and MySQL, you should be fine.  [MAMP](http://www.mamp.info/),  [WAMP](http://www.wampserver.com/),  [XAMPP](https://www.apachefriends.org/index.html), and [Kalabox](http://www.kalamuna.com/products/kalabox) all work.
- Git client for tracking code changes
- SFTP client, such as [FileZilla](https://filezilla-project.org/ "FileZilla, a Cross-platform GUI SFTP client."), for transferring files OR rsync
- [Terminus](https://github.com/pantheon-systems/cli)
- [Drush](/docs/articles/local/drupal-drush-command-line-utility/) (optional)

To save time, clear the target site environment's cache. This can be done from the Pantheon Dashboard, from the application itself, or by running the following Terminus command:

```bash
terminus site clear-cache --site=<site> --env=<env>
```

<div class="alert alert-info" role="alert">
<h4>Note</h4>
Replace <code>&lt;site&gt;</code> with your site name, and <code>&lt;env&gt;</code> with the environment (Dev, Test, or Live). You can see a list of all your sites by running <code>terminus sites list</code></div>

There are three parts to any dynamic website:

1. Code (The application, modules or plugins, and themes)
1. Database (content)
1. Files (user uploaded or application generated)

Each will need to be transferred from Pantheon to your local environment.

## Get the Code

[Checkout the codebase using Git](/docs/articles/local/starting-with-git/#clone-your-site-codebase).

## Get the Database

### Via Dashboard
From within the site Dashboard:

- **Create on-demand backup**: Workflow > Export > Export Database
- **Download scheduled or on-demand backup**: Backups > Backup Log > Database download link

Next, import the database into your local environment using a MySQL client.

````sql
$ gunzip < database.sql.gz | mysql -uUSER -pPASSWORD DATABASENAME
````
<div class="alert alert-info" role="alert">
<h4>Note</h4>
Replace <code>database.sql.gz</code> with the name of the database archive downloaded from Pantheon.</div>

### Via Terminus
Create and export the database by running the following Terminus commands:

```nohighlight
terminus site backups create --element=database --site=<site> --env=<env>
terminus site backups get --element=database --site=<site> --env=<env> --to-directory=$HOME/Desktop/ --latest
```

You can now import the archive into your local MySQL database using the following command:

````sql
$ gunzip < database.sql.gz | mysql -uUSER -pPASSWORD DATABASENAME
````
## Get the Files

For an overview of ways to transfer files, see [SFTP and rsync on Pantheon](/docs/articles/local/rsync-and-sftp/).

### Via Terminus

Run the following Terminus commands:
```nohighlight
terminus site backups create --element=files --site=<site> --env=<env>
terminus site backups get --element=files --site=<site> --env=<env> --to-directory=$HOME/Desktop/ --latest
```
This will create and download a backup of the site's files to your desktop.

### Via SFTP CLI

SFTP is slower, but easier for some to use:

- [Copy the SFTP CLI command](/docs/articles/sites/code/developing-directly-with-sftp-mode/#sftp-connection-information)
- From terminal, navigate to the proper directory on your local file system:
    - **Drupal**: `sites/default`
    - **WordPress**: `wp-content/uploads`
- Paste the CLI command copied from your Dashboard
- Run `get -r *` to transfer the files down to your local environment

## Submit Changes to Pantheon

### Send the Code

Test your changes, then [commit locally and push to Pantheon](/docs/articles/local/starting-with-git/#push-changes-to-pantheon).

### Send the Database

Create an archive using the MySQL utility mysqldump:
```sql
mysqldump -uUSERNAME -pPASSWORD DATABASENAME | gzip > database.sql.gz
```
Upload and import the file from the Pantheon Dashboard at **Workflow** > **Import**.

### Send the Files

**Drupal: Via Drush**

Drush and rsync is by far the easiest way to send files for Drupal sites:

````nohighlight
drush -r . rsync --temp-dir=../tmp/ @self:sites/default/files/ @pantheon.SITENAME.ENV:%files
````

**WordPress or Drupal: Via SFTP**

Send files using SFTP:

- [Copy the SFTP CLI command](/docs/articles/sites/code/developing-directly-with-sftp-mode/#sftp-connection-information)
- From terminal, navigate to the proper directory on your local file system:
    - **Drupal**: `sites/default/files`
    - **WordPress**: `wp-content/uploads`
- Paste the CLI command copied from your Dashboard
- Navigate to the correct remote directory by running `cd files`
- Run `put -r ./*` to transfer the files up  

You can of course transfer a single file or a single directory at a time instead of transferring every file, every time.
