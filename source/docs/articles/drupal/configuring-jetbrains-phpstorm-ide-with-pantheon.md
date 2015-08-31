---
title: Configuring JetBrains PhpStorm IDE with Drupal on Pantheon
description: Best practices and recommendations for building a site using JetBrains PhpStorm.
category:
  - developing
keywords: drupal, jetbrains, phpstorm, pantheon, drush
---
[JetBrains PhpStorm](http://www.jetbrains.com/phpstorm/) is a commercial PHP IDE that you can configure to work with your Drupal sites. For detailed information, see [Drupal Development Using PhpStorm](http://confluence.jetbrains.com/display/PhpStorm/Drupal+Development+using+PhpStorm) and [Developing on Pantheon with PhpStorm](https://confluence.jetbrains.com/display/PhpStorm/Developing+on+Pantheon+with+PhpStorm).

This article covers some best practices and recommendations for building a Drupal site on Pantheon using PhpStorm.

## Initial Site Setup

After you've [created your site on Pantheon](/docs/articles/getting-started/), you'll need to set up your local environment.

## Clone the Code Repository

Make sure your Dev environment is in Git mode, then [clone your Git repository](/docs/articles/local/starting-with-git/) to your local workstation.

## Create a New PhpStorm Project

1. Open PhpStorm and create a new project from existing files.
2. Choose the [project directory](http://www.jetbrains.com/phpstorm/webhelp/create-new-project-choose-project-directory.html).
3. Select the parent folder for all the project sources and click the icon, or choose **Project Root** on the menu.
4. Click **Finish**.

## Configure a PhpStorm Project

1. Ensure that PhpStorm uses [Drupal settings](http://www.jetbrains.com/phpstorm/webhelp/drupal.html) by going to Preferences > Drupal.
2. Enable Drupal integration and select the Drupal installation path.
4. Set up PHP/Include Paths.
5. Choose the Drupal major version.
6. Configure the correct version of PHP by going to Preferences > [PHP](http://www.jetbrains.com/phpstorm/webhelp/php.html), and choose PHP Language Level 5.3.

#### Drush Support
  We recommend [enabling Drush support](https://confluence.jetbrains.com/display/PhpStorm/Drupal+Development+using+PhpStorm#DrupalDevelopmentusingPhpStorm-DrupalCommandLineToolDrushIntegration).

1. From Preferences > [Command Line Tool Support](http://www.jetbrains.com/phpstorm/webhelp/command-line-tool-support.html), click **Plus**.  
2. Choose Tool > Drush, and specify the path.

## Configure On-Server Development

1. Put your [Dev environment into SFTP mode](/docs/articles/sites/code/developing-directly-with-sftp-mode/), and click **Connection Info** to see the connection settings.
2. Within PhpStorm, go to Tools > Deployment > Configuration.
3. Click **plus** for the [add server dialog](http://www.jetbrains.com/phpstorm/webhelp/add-server-dialog.html).
4. Enter the Pantheon site name followed by a dash and the environment.<br />
**Example**: Yoursite-dev.
5. Type SFTP and click **OK**.

#### Connection Tab
  [Configure the server](http://www.jetbrains.com/phpstorm/webhelp/deployment-connection-tab.html) connection tab in the following order:

* SFTP Host: SFTP Host from Connection Info
* Port: 2222
* Username: Username from Connection Info
* Auth Type: Key Pair
* Private Key File: Navigate to the location of your id\_rsa file. Example: /Users/jon/.ssh/id\_rsa
* Click **Test SFTP Connection...**
* Root Path: Click Autodetect, and navigate to the end of the detected path and add /code to the end

#### Mappings Tab

1. Deployment path on server: /code
2. Web path on server: URL of your Pantheon Dev environment. Example: http://dev-yoursite.pantheon.io
3. Click **OK**.
4. Go to Tools > Deployment > Automatic Upload > and select the server you created.

Now any files you change and save locally will be automatically uploaded to Pantheon.
