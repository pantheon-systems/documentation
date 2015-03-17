---
title: Configuring PhpStorm IDE with WordPress on Pantheon
description: Best practices and recommendations for building a WordPress powered site using PhpStorm.
category:
  - developing
  - WordPress
  
---
## Overview

[JetBrains PhpStorm](http://www.jetbrains.com/phpstorm/) is a commercial PHP IDE that can be configured to work with WordPress sites. Doing so allows you to easily build custom plugins or do maintence work on existing ones.

For more detailed information, see [WordPress development using PhpStorm](https://confluence.jetbrains.com/display/PhpStorm/WordPress+Development+using+PhpStorm). This document focuses on connecting the pieces together and showcasing the workflow.

## Setup
First, if you have not done so already, [create your WordPress site on Pantheon](/docs/articles/getting-started/). Once you have it created, copy it down locally using either SFTP or Git. PHPStorm will need to know where your local WordPress environment is located. Git is the fastest way to pull the site down, however, it is possible to use SFTP, if you so desire. 

## Create/Configure your PHPStorm project
The next task is to create a project.

1. Open PHPStorm
1. In the menu, click on "File" and then "New Project".
1. In the dialog box provided, give your new plugin a name, verify that PHPStorm is saving the project in the place you want it saved, and select "WordPress Plugin" as the project type.

PHPStorm will create your project but will need a little more information before it can complete the task. It needs to know where you have stored your WordPress powered site. Enter the name of the directory that contains `wp-configure.php`. Alternativly, you can use the finder option by clicking the box labeled '...' to find the directory.

Once complete, there will not be any files open in your project, however, there will be a PHP file in the root directory of your project with your project name. This file will contain the standard WordPress plugin header.

## Configure wp-cli (Optional)
Many WordPress plugin develoeprs use the command line tool [wp-cli](http://wp-cli.org/). This is useful if you have a local development environment and want to use wp-cli to manage it. If you use wp-cli, you can configure PHPStorm to recognize it and be able to use it form within your project. To configure PHPStorm to use wp-cli, follow these steps.

1. From Preferences > [Command Line Tool Support](http://www.jetbrains.com/phpstorm/webhelp/command-line-tool-support.html), click **Plus**. 
1. Select WP-CLI. Click **OK**
1. If you have installed the wp-cli executable, select the "Executable Available" option and enter the path to `wp`.
1. Once it has completed the setup, it will return to the Preferences window. Click **OK** to commit the changes.

## Configure your Pantheon Development Environment
1. Put your [Dev environment into SFTP mode](/docs/articles/sites/code/developing-directly-with-sftp-mode/), and click **Connection Info** to see the connection settings.
2. Within PhpStorm, go to Tools > Deployment > Configuration.
3. Click **plus** for the [add server dialog](http://www.jetbrains.com/phpstorm/webhelp/add-server-dialog.html).
4. Enter the Pantheon site name followed by a dash, and the environment.<br />
**Example**: Yoursite-dev.
5. Type SFTP and click **OK**.

#### Connection Tab
[Configure the server](http://www.jetbrains.com/phpstorm/webhelp/deployment-connection-tab.html) connection tab in the following order:

* SFTP Host: (SFTP Host from Connection Info)
* Port: 2222
* Username: (Username from Connection Info)
* Auth Type: Key Pair
* Private Key File: (navigate to the location of your id\_rsa file. Example: /Users/jon/.ssh/id\_rsa)
* Click Test SFTP Connection...
* Root Path: Click Autodetect, and navigate to the end of the detected path and add /code to the end

#### Mappings Tab

1. Deployment path on server: /code/wp-content/plugins
2. Web path on server: (URL of your Pantheon Dev environment. Example: http://dev-yoursite.pantheon.io)
3. Click **OK**.
4. Go to Tools > Deployment > Automatic Upload > and select the server you created.

Now any files you change and save locally will be automatically uploaded to Pantheon.

## Conclusion
You are now ready to begin editing your plugin. Any file you create in this project, or any file you edit and save will automatically be pushed up to your development enviornment. Once your code is complete, you can migrate your work into test from your Pantheon dashboard, and eventually into production once everyone has approved the work.






