---
title: Local Development
description: Suggestions and solutions for working locally on your Pantheon Drupal or WordPress site.
categories: [develop]
tags: [git, lando, local, sftp, workflow]
reviewed: "2019-11-27"
---

<Alert title="Pantheon Localdev" type="success" icon="star">

Pantheon's [Localdev](/guides/localdev) offers the best of developing locally — with the ability to perform critical development tasks, including editing files and code, and pushing changes to Pantheon right from your desktop.

</Alert>

While Pantheon provides several options for on-server development, local development has a number of advantages, especially if continuous Internet access is a concern.

Pantheon cannot troubleshoot or [support local development](/support#local-development) solutions; however, we can provide some suggestions and known working solutions. For large teams/sites, we recommend using [Multidev](/multidev).

If you encounter any issues, visit the [Lando GitHub repository](https://github.com/lando/lando#help-troubleshooting--support).

## Before You Begin

There are three parts to any dynamic website:

1. **Code**: The application, modules or plugins, and themes.

1. **Database**: The content.

1. **Files**: User uploaded or application generated.

You will need to transfer each one from Pantheon to your local environment.

Be sure you have:

- A local stack capable of running Drupal or WordPress. [Lando](https://github.com/lando/lando) integrates with the Pantheon platform. Tools such as [MAMP](https://www.mamp.info/en/), [WAMP](http://www.wampserver.com/), and [XAMPP](https://www.apachefriends.org/index.html) all work.
  - Pantheon uses a [particular architecture to maximize performance and availability](/application-containers), but it's possible to run the same code on a variety of different configurations. As long as the solution supports a minimum of PHP 5.3 and MySQL, you should be fine.
  - Ensure that your local stack's PHP version matches the [PHP version set for the target site on Pantheon](/php-versions/#verify-current-php-versions).
- Git client for tracking code changes
- SFTP client or IDE, such as [WinSCP](/winscp) or [Visual Studio Code](/visual-studio-code), for transferring files OR rsync
- [Terminus](/terminus)
- [Drush](/drush) (optional)

### Export Variables

<Partial file="export-alias.md" />

Export the environment as a variable as well:

```bash{promptUser:user}
export ENV=dev
```

### Clear Site Environment Cache

To save time, clear the target site environment's cache. This can be done from the Pantheon Dashboard, from the application itself, or by running the following Terminus command:

```bash{promptUser: user}
terminus env:clear-cache $SITE.$ENV
```

## Get the Code

The first step is to get a `git clone` of your code from Pantheon to your local computer.

1. Go to Your Site Dashboard, and log in to Pantheon and load the Dashboard for the site you want to work on.

1. At the top of the development panel, look for the `git clone` command and copy and paste it in your terminal. It will look something like this:

    ![Copy and Paste Git Clone](../images/dashboard/git-string.png)

1. On your local environment, go to where you want the code to reside. Git will create a directory as part of the clone, so you don't need to create one. Run the command you copied in step 2:

    ```bash{promptUser: user}
    git clone ssh://codeserver.dev.xxx@codeserver.dev.xxx.drush.in:2222/~/repository.git my-site
    ```

    If everything worked correctly, you will see Git fetching the data:

    ```none
    Cloning into 'anita-wordpress'...
    The authenticity of host '[codeserver.dev.....drush.in]:2222 ([173.255.119.72]:2222)' can't be established.
    RSA key fingerprint is SHA256:yPEkh1Amd9WFBSP5syXD5rhUByTjaKBxQnlb5CahZZE.
    Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
    Warning: Permanently added '[codeserver.dev.....drush.in]:2222,[173.255.119.72]:2222' (RSA) to the list of known hosts.
    remote: Counting objects: 20503, done.
    remote: Compressing objects: 100% (8184/8184), done.
    remote: Total 20503 (delta 12802), reused 19671 (delta 11982)
    Receiving objects: 100% (20503/20503), 46.65 MiB | 15.16 MiB/s, done.
    Resolving deltas: 100% (12802/12802), done.
    ```

    If you run into permission problems, check your [SSH key](/ssh-keys) setup. If the clone starts but can't complete, check your network to see if you have a current version of Git.

## Get the Database

### Via Dashboard

From within the Site Dashboard:

1. Create an on-demand backup by selecting **Database / Files** > **Export** > **Export Database**.

1. Download the scheduled or on-demand backup by selecting **Backups** > **Backup Log** > **Database download link**.

1. Import the database into your local environment using a MySQL client:

  ```bash{promptUser: user}
  gunzip < database.sql.gz | mysql -uUSER -pPASSWORD DATABASENAME
  ```

  <Alert title="Note" type="info">

  Replace `database.sql.gz` with the name of the database archive downloaded from Pantheon.

  </Alert>

### Via Terminus

1. Create and get the database with Terminus commands:

    ```bash{promptUser: user}
    terminus backup:create $SITE.$ENV --element=db
    terminus backup:get $SITE.$ENV --element=db
    ```

1. Import the archive into your local MySQL database using the following command:

    ```bash{promptUser: user}
    gunzip < database.sql.gz | mysql -uUSER -pPASSWORD DATABASENAME
    ```

## Get the Files

For an overview of ways to transfer files, see [SFTP and rsync on Pantheon](/rsync-and-sftp).

### Via Terminus

Run the following Terminus commands:

```bash{promptUser: user}
terminus backup:create $SITE.$ENV --element=files
terminus backup:get $SITE.$ENV --element=files
```

This will create and get a backup of the site's files.

Move the resulting backup to the proper directory on your local file system:

- **Drupal**: `sites/default/files`
- **WordPress**: `wp-content/uploads`

### Via SFTP CLI

SFTP is slower, but easier for some to use:

1. Get your SFTP login credentials by clicking **Connection Info**. You will see your connection credentials and a link to connect directly with your preferred client.

1. From the terminal, navigate to the proper directory on your local file system:

    - **Drupal**: `sites/default`
    - **WordPress**: `wp-content/uploads`

1. Paste the CLI command copied from your Dashboard.

1. Run `get -r *` to transfer the files down to your local environment.

## Submit Changes to Pantheon

### Send the Code

Test your changes, then [commit locally and push to Pantheon](/git/#push-changes-to-pantheon):

```bash{promptUser: user}
git commit -am "enter a summary of the changes"
```

Next, push the changes:

```bash{promptUser: user}
git push origin master
```

### Send the Database

Create an archive using the MySQL utility mysqldump:

```bash{promptUser: user}
mysqldump -uUSERNAME -pPASSWORD DATABASENAME | gzip > database.sql.gz
```

Upload and import the file by going to your Pantheon Dashboard and selecting **Database / Files** > **Import**.

### Send the Files

#### Upload files to Drupal Via Drush

Drush and rsync is by far the easiest way to send files for Drupal sites:

```bash{promptUser: user}
drush -r . rsync --temp-dir=../tmp/ @self:sites/default/files/ @pantheon.SITENAME.ENV:%files
```

#### Upload Files to WordPress or Drupal Via SFTP

Send files using SFTP:

1. [Copy the SFTP CLI command](/sftp#sftp-connection-information)
1. From the terminal, navigate to the proper directory on your local file system:

    - **Drupal**: `sites/default/files`
    - **WordPress**: `wp-content/uploads`

1. Paste the CLI command copied from your Dashboard
1. Navigate to the correct remote directory by running `cd files`
1. Run `put -r ./*` to transfer the files up

You can also transfer a single file or a single directory at a time instead of transferring every file, every time.

## Local Configuration Files

You'll need to configure database credentials matching your local database to develop locally. You don't want to manually change these details in your primary configuration file (e.g. `settings.php` or `wp-config.php`) because you could easily commit that change to version control and trigger a connection error on Dev when pushing to Pantheon.

Instead, we recommend using a local configuration file (e.g. `settings.local.php` or `wp-config-local.php`) that is excluded from version control and included by `settings.php` or `wp-config.php` when found. Since the local configuration file is ignored by Git, it won't be found on Pantheon but it will be applied when you run the site locally.

Pantheon's upstreams will detect and include [`wp-config-local.php` (WordPress)](https://github.com/pantheon-systems/WordPress/blob/default/wp-config.php#L18) and [`settings.local.php` (Drupal 8)](https://github.com/pantheon-systems/drops-8/blob/master/sites/default/settings.php#L22-L25) for local environment configurations.

This file is ignored by the `.gitignore` file in [WordPress](https://github.com/pantheon-systems/WordPress/blob/default/.gitignore#L3) and [Drupal 8](https://github.com/pantheon-systems/drops-8/blob/master/.gitignore#L8) so that local configurations do not get pushed to Pantheon. Simply create the file on your local computer, and manage configurations accordingly.

### WordPress wp-config-local.php

Pantheon sites that install WordPress 5.5 include a `wp-config-local-sample.php` file. Older sites can copy [wp-config-local-sample.php file on GitHub](https://github.com/pantheon-systems/WordPress/blob/default/wp-config-local-sample.php) to the same directory as the site's `wp-config.php`, or create one in that location as shown here.

The following can be used as a starting point for `wp-config-local.php`. Replace the database values with the values from your local environment, and the key/salt values with your unique phrase (generated from [WordPress.org](https://api.wordpress.org/secret-key/1.1/salt/)).

<Accordion title={"Full text of wp-config-local-sample.php"} id={"full-wp-config-local-sample"}>

GITHUB-EMBED https://github.com/pantheon-systems/WordPress/blob/default/wp-config-local-sample.php php GITHUB-EMBED

</Accordion>

### Drupal settings.local.php

Create the local settings file and add it to `.gitignore`.

1. Change to the site's directory and create the file. Change the first command in this example to fit the site's directory structure:

   ```bash{promptUser: user}
   cd sites/default
   touch settings.local.php
   ```

1. Add the local configuration file to `.gitignore`:

   ```git:title=.gitignore
   sites/*/settings.local.php
   ```

Drupal 7 users need to add a reference to the local file from within `settings.php`:

```php:title=sites/default/settings.php
/**
 * Drupal 7 only: Include a local settings file if it exists.
 */
$local_settings = dirname(__FILE__) . '/settings.local.php';
if (file_exists($local_settings)) {
  include $local_settings;
}
```
