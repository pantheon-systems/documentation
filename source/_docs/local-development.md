---
title: Local Development
description: Suggestions and solutions for working locally on your Pantheon Drupal or WordPress site.
tags: [local]
categories: []
---
While Pantheon provides several options for on-server development, local development has a number of advantages, especially if continuous Internet access is a concern.

<div class="enablement">
  <h4 class="info" markdown="1">[Agency DevOps Training](https://pantheon.io/agencies/learn-pantheon?docs){.external}</h4>
  <p>Dev/Test/Live, Multidev, local development, and more! Learn how Pantheon's DevOps training can accelerate your workflow.</p>
</div>

Pantheon cannot troubleshoot or support local development solutions; however, we can provide some suggestions and known working solutions. For large teams/sites, we recommend using [Multidev](/docs/multidev/) instead of local development.

## Before You Begin
Be sure you have:

- A local stack capable of running Drupal or WordPress. [Lando](https://github.com/lando/lando){.external} integrates with the Pantheon platform. Tools such as [MAMP](https://www.mamp.info/en/), [WAMP](http://www.wampserver.com/), and [XAMPP](https://www.apachefriends.org/index.html) all work.
    - Pantheon uses a [particular architecture to maximize performance and availability](/docs/application-containers/), but it's possible to run the same code on a variety of different configurations. As long as the solution supports a minimum of PHP 5.3 and MySQL, you should be fine.
    - Ensure that your local stack's PHP version matches the [PHP version set for the target site on Pantheon](/docs/php-versions/#verify-current-php-versions).
- Git client for tracking code changes
- SFTP client, such as [FileZilla](https://filezilla-project.org/ "FileZilla, a Cross-platform GUI SFTP client."), for transferring files OR rsync
- [Terminus](/docs/terminus/)
- [Drush](/docs/drush) (optional)

To save time, clear the target site environment's cache. This can be done from the Pantheon Dashboard, from the application itself, or by running the following Terminus command:

```bash
terminus env:clear-cache <site>.<env>
```

There are three parts to any dynamic website:

1. Code (The application, modules or plugins, and themes)
1. Database (content)
1. Files (user uploaded or application generated)

You will need to transfer each one from Pantheon to your local environment.

## Get the Code

The first step is to get a `git clone` of your code from Pantheon to your local computer.

1. Go to Your Site Dashboard, and log in to Pantheon and load the Dashboard for the site you want to work on.

2. At the top of the development panel, look for the `git clone` command and copy and paste it in your terminal. It will look something like this:

    ![Copy Past Git Clone](/source/docs/assets/images/dashboard/git-string.png)<br />

3. On your local environment, go to where you want the code to reside. Git will create a directory as part of the clone, so you don't need to create one. Run the command you copied in step 2:

    ```nohighlight
    git clone ssh://codeserver.dev.xxx@codeserver.dev.xxx.drush.in:2222/~/repository.git my-site
    ```
    If everything worked correctly, you will see Git fetching the data:

    ![Git Clone During](/source/docs/assets/images/git_clone.png)<br />

    If you run into permission problems, check your [SSH key](/docs/ssh-keys/) setup. If the clone starts but can't complete, check your network to see if you have a current version of Git.

## Get the Database

### Via Dashboard
From within the Site Dashboard:

1. Create an on-demand backup by selecting **Database / Files** > **Export** > **Export Database**.

2. Download the scheduled or on-demand backup by selecting **Backups** > **Backup Log** > **Database download link**.

3. Import the database into your local environment using a MySQL client:

    ````sql
    $ gunzip < database.sql.gz | mysql -uUSER -pPASSWORD DATABASENAME
    ````
    <div class="alert alert-info" role="alert">
    <h4 class="info">Note</h4>
    <p>Replace <code>database.sql.gz</code> with the name of the database archive downloaded from Pantheon.</p></div>

### Via Terminus

1. Create and get the database with Terminus commands:

    ```nohighlight
    terminus backup:create <site>.<env> --element=db
    terminus backup:get <site>.<env> --element=db
    ```


2. Import the archive into your local MySQL database using the following command:

    ````sql
    $ gunzip < database.sql.gz | mysql -uUSER -pPASSWORD DATABASENAME
    ````

## Get the Files

For an overview of ways to transfer files, see [SFTP and rsync on Pantheon](/docs/rsync-and-sftp/).

### Via Terminus

Run the following Terminus commands:
```nohighlight
terminus backup:create <site>.<env> --element=files
terminus backup:get <site>.<env> --element=files
```
This will create and get a backup of the site's files.

### Via SFTP CLI

SFTP is slower, but easier for some to use:

- Get your SFTP login credentials by clicking **Connection Info**. You will see your connection credentials and a link to connect directly with your preferred client.
- From the terminal, navigate to the proper directory on your local file system:
    - **Drupal**: `sites/default`
    - **WordPress**: `wp-content/uploads`
- Paste the CLI command copied from your Dashboard.
- Run `get -r *` to transfer the files down to your local environment.

## Submit Changes to Pantheon

### Send the Code

Test your changes, then [commit locally and push to Pantheon](/docs/git/#push-changes-to-pantheon):

```bash
git commit -am "enter a summary of the changes"
```
Next, push the changes:

```bash
git push origin master
```

### Send the Database

Create an archive using the MySQL utility mysqldump:
```sql
mysqldump -uUSERNAME -pPASSWORD DATABASENAME | gzip > database.sql.gz
```
Upload and import the file by going to your Pantheon Dashboard and selecting **Database / Files** > **Import**.

### Send the Files

**Drupal: Via Drush**

Drush and rsync is by far the easiest way to send files for Drupal sites:

````nohighlight
drush -r . rsync --temp-dir=../tmp/ @self:sites/default/files/ @pantheon.SITENAME.ENV:%files
````

**WordPress or Drupal: Via SFTP**

Send files using SFTP:

- [Copy the SFTP CLI command](/docs/sftp#sftp-connection-information)
- From terminal, navigate to the proper directory on your local file system:
    - **Drupal**: `sites/default/files`
    - **WordPress**: `wp-content/uploads`
- Paste the CLI command copied from your Dashboard
- Navigate to the correct remote directory by running `cd files`
- Run `put -r ./*` to transfer the files up

You can also transfer a single file or a single directory at a time instead of transferring every file, every time.

## Local Configuration Files

You'll need to configure database credentials matching your local database to develop locally. You don't want to manually change these details in your primary configuration file (e.g. `settings.php` or `wp-config.php`) because you could easily commit that change to version control and trigger a connection error on Dev when pushing to Pantheon.

Instead, we recommend using a local configuration file (e.g. `settings.local.php` or `wp-config-local.php`) that is excluded from version control and included by `settings.php` or `wp-config.php` when found. Since the local configuration file is ignored by git, it won't be found on Pantheon but it will be applied when you run the site locally.

### Drupal 8 and WordPress

Pantheon's upstreams will detect and include [`wp-config-local.php` (WordPress)](https://github.com/pantheon-systems/WordPress/blob/master/wp-config.php#L11-L20) and [`settings.local.php` (Drupal 8)](https://github.com/pantheon-systems/drops-8/blob/master/sites/default/settings.php#L22-L25) for local environment configurations.

This file is ignored by the `.gitignore` file  in [WordPress](https://github.com/pantheon-systems/WordPress/blob/master/.gitignore#L3) and [Drupal 8](https://github.com/pantheon-systems/drops-8/blob/master/.gitignore#L8) so that local configurations do not get pushed to Pantheon. Simply create the file on your local computer, and manage configurations accordingly.

#### Example `wp-config-local.php` File

The following can be used as a starting point for the `wp-config-local.php` file which needs to be saved in the same location as your `wp-config.php` file. You will need to replace the database values with the values from your local environment, and the key/salt values with your unique phrase (generated from [WordPress.org](https://api.wordpress.org/secret-key$){.external}).

```php
<?php
define('DB_NAME',     'database_name_here');
define('DB_USER',     'username_here');
define('DB_PASSWORD', 'password_here');
define('DB_HOST',     'localhost');
define('DB_CHARSET',  'utf8');
define('DB_COLLATE',  '');

define('AUTH_KEY',         'put your unique phrase here');
define('SECURE_AUTH_KEY',  'put your unique phrase here');
define('LOGGED_IN_KEY',    'put your unique phrase here');
define('NONCE_KEY',        'put your unique phrase here');
define('AUTH_SALT',        'put your unique phrase here');
define('SECURE_AUTH_SALT', 'put your unique phrase here');
define('LOGGED_IN_SALT',   'put your unique phrase here');
define('NONCE_SALT',       'put your unique phrase here');

define('WP_DEBUG',         true);
define('WP_DEBUG_LOG',     true);
define('WP_DEBUG_DISPLAY', true);

define('WP_AUTO_UPDATE_CORE', false);

define('WP_HOME',    'http://' . $_SERVER['HTTP_HOST']);
define('WP_SITEURL', 'http://' . $_SERVER['HTTP_HOST']);
```

### Drupal 7

1. Drupal 7 users will need to create a local settings file (e.g.`settings.local.php`) and include it within their `settings.php` file:

    ```php
    /**
     * Include a local settings file if it exists. D7 only
     */
    $local_settings = dirname(__FILE__) . '/settings.local.php';
    if (file_exists($local_settings)) {
      include $local_settings;
    }
    ```

2. You will also need to exclude the local configuration file from git, by adding the following to `.gitignore`:

    ```
    sites/*/settings.local.php
    ```
