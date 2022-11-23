---
title: Local Development on Pantheon
subtitle: Local Development Configuration
description: Configure your machine for local development with Pantheon.
categories: [develop]
tags: [git, lando, local, sftp, workflow]
reviewed: "2022-03-10"
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/local-development/configuration
anchorid: configuration
---

This section provides information on how to configure your machine for successful local development with Pantheon.

## Before You Begin

This section uses several commands that use the temporary command line alias, `$SITE`, to make entering command examples easier. Export your variables and clear your sit environment cache before you begin to configure your local development setup. 

1. Set the temporary variable `$SITE` in your terminal session to match the name of your site. Replace `anita-drupal` in this example:

  ```bash{promptUser:user}
  export SITE=anita-drupal && echo "New alias set as $SITE"
  ```

  <Accordion title="How to Use Terminus to Find the Site Name" id="site-name" icon="info-sign">

  Use `terminus site:list` for a list of sites you have access to:

  ```bash{outputLines:2-8}
  terminus site:list
  --------------------------- --------------------- ------------- ----------------------------------- -------------------- --------------------- ------------- ------------
  Name                        ID                    Plan          Framework          Region           Owner                Created               Memberships   Is Frozen?
  --------------------------- --------------------- ------------- ------------------- ---------------- -------------------- --------------------- ------------- ------------
  //highlight-start
  anita-drupal                abdc80ce-286c-1234-   Sandbox       drupal8             Canada           3374708c-987e-1234   2020-12-15 19:40:42   d3ecc20c-395a false
  //highlight-end
  anita-wordpres              abdc9954-fab2-1234-   Sandbox       wordpress           United States    c96ddb25-336a-1234   2020-09-02 07:18:51   d3ecc20c-395a false
  ```

  The site name is listed under `Name`. In this example, the site name is `anita-drupal`.

  </Accordion>

1. Export the environment as a variable:

```bash{promptUser:user}
export ENV=dev
```

1. Run the command below to clear the target site environment's cache to save time. This can also be done from the Pantheon Dashboard or from the application itself.

  ```bash{promptUser: user}
  terminus env:clear-cache $SITE.$ENV
  ```

## Get the Code

Follow the steps below to get a clone of your Pantheon code on your local computer.

1. Log in to Pantheon and navigate to the Site Dashboard.

1. Locate the `git clone` command at the top of the development panel and copy and paste it into your terminal.

 It will look similar to this:

    ![Example of Git Clone repo for command line: `git clone ssh://codeserver.dev.0e1f236a-ec36-4143-a900-73a92a344`](../../../images/dashboard/git-string.png)

1. Go to where you want the code to reside in your local environment.

    Git will create a directory as part of the clone, so you don't need to create one.

1. Run the command you copied in step 2:

    ```bash{promptUser: user}
    git clone ssh://codeserver.dev.xxx@codeserver.dev.xxx.drush.in:2222/~/repository.git my-site
    ```

    Git will fetch the data if everything worked correctly:

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

    Check your [SSH key](/ssh-keys) setup if you run into permission problems. Check your network to see if you have a current version of Git if the clone starts but can't complete.

## Get the Database

<Partial file="export-database.md" />

## Get the Files

Refer to [SFTP and rsync on Pantheon](/rsync-and-sftp) for an overview of ways to transfer files.

### Via Terminus

1. Run the following Terminus commands:

  ```bash{promptUser: user}
  terminus backup:create $SITE.$ENV --element=files
  terminus backup:get $SITE.$ENV --element=files
  ```

 This will create and get a backup of the site's files.

1. Move the resulting backup to the correct directory on your local file system:

    - **Drupal**: `sites/default/files`
    - **WordPress**: `wp-content/uploads`

### Via SFTP CLI

SFTP is slower method, but easier for some to use:

1. Click **Connection Info** to get your SFTP login credentials.

 You will see your connection credentials and a link to connect directly with your preferred client.

1. Use the terminal to navigate to the correct directory on your local file system:

    - **Drupal**: `sites/default`
    - **WordPress**: `wp-content/uploads`

1. Paste the CLI command copied from your Dashboard.

1. Run `get -r *` to transfer the files down to your local environment.

## Submit Changes to Pantheon

### Send the Code

1. Test your changes, then [commit locally and push to Pantheon](/guides/git/git-config#push-changes-to-pantheon):

  ```bash{promptUser: user}
  git commit -am "enter a summary of the changes"
  ```

1. Push the changes:

  ```bash{promptUser: user}
  git push origin master
  ```

### Send the Database

1. Create an archive using the MySQL utility mysqldump:

  ```bash{promptUser: user}
  mysqldump -uUSERNAME -pPASSWORD DATABASENAME | gzip > database.sql.gz
  ```

1. Open your Pantheon Dashboard and select **Database / Files**, then select **Import** to upload and import the file.

### Send the Files

#### Upload files to Drupal Via Drush

Drush and Rsync are the easiest ways to send files for Drupal sites:

```bash{promptUser: user}
drush -r . rsync --temp-dir=../tmp/ @self:sites/default/files/ @pantheon.SITENAME.ENV:%files
```

#### Upload Files to WordPress or Drupal Via SFTP

Send files using SFTP:

1. [Copy the SFTP CLI command](/sftp#sftp-connection-information).

1. Use the terminal to navigate to the correct directory on your local file system:

    - **Drupal**: `sites/default/files`
    - **WordPress**: `wp-content/uploads`

1. Paste the CLI command copied from your Dashboard.

1. Navigate to the correct remote directory by running `cd files`

1. Run `put -r ./*` to transfer the files.

You can also transfer a single file or a single directory at a time instead of transferring every file, every time.

## Local Configuration Files

You must configure database credentials matching your local database to develop locally. Do not manually change these details in your primary configuration file (e.g. `settings.php` or `wp-config.php`), as this could commit changes to version control and trigger a connection error on Dev when pushing to Pantheon.

We recommend using a local configuration file (e.g. `settings.local.php` or `wp-config-local.php`) that is excluded from version control and included by `settings.php` or `wp-config.php` when found. Since the local configuration file is ignored by Git, it won't be found on Pantheon but it will be applied when you run the site locally.

Pantheon's upstreams will detect and include [`wp-config-local.php` (WordPress)](https://github.com/pantheon-systems/WordPress/blob/default/wp-config.php#L18) and [`settings.local.php` (Drupal 8)](https://github.com/pantheon-systems/drops-8/blob/master/sites/default/settings.php#L22-L25) for local environment configurations.

This file is ignored by the `.gitignore` file in [WordPress](https://github.com/pantheon-systems/WordPress/blob/default/.gitignore#L3) and [Drupal 8](https://github.com/pantheon-systems/drops-8/blob/master/.gitignore#L8) so that local configurations do not get pushed to Pantheon. Simply create the file on your local computer, and manage configurations accordingly.

### WordPress wp-config-local.php

Pantheon sites that install WordPress 5.5 include a `wp-config-local-sample.php` file. Older sites can copy [wp-config-local-sample.php file on GitHub](https://github.com/pantheon-systems/WordPress/blob/default/wp-config-local-sample.php) to the same directory as the site's `wp-config.php`, or create one in that location as shown here.

The following can be used as a starting point for `wp-config-local.php`. Replace the database values with the values from your local environment, and the key/salt values with your unique phrase (generated from [WordPress.org](https://api.wordpress.org/secret-key/1.1/salt/)).

<Accordion title={"Full text of wp-config-local-sample.php"} id={"full-wp-config-local-sample"}>

GITHUB-EMBED https://github.com/pantheon-systems/WordPress/blob/default/wp-config-local-sample.php php GITHUB-EMBED

</Accordion>

### Drupal settings.local.php

1. Create the local settings file and add it to `.gitignore`.

1. Change to the site's directory and create the file.

1. Change the first command in this example to fit the site's directory structure:

   ```bash{promptUser: user}
   cd sites/default
   touch settings.local.php
   ```

1. Add the local configuration file to `.gitignore`:

   ```git:title=.gitignore
   sites/*/settings.local.php
   ```

Note that Drupal 7 users must add a reference to the local file from within `settings.php`:

```php:title=sites/default/settings.php
/**
 * Drupal 7 only: Include a local settings file if it exists.
 */
$local_settings = dirname(__FILE__) . '/settings.local.php';
if (file_exists($local_settings)) {
  include $local_settings;
}
```