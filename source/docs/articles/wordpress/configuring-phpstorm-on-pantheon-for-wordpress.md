---
title: Configuring JetBrains PhpStorm IDE with WordPress on Pantheon
description: Best practices and recommendations for building a WordPress site using PhpStorm.
category:
  - developing
  - WordPress

---
## Overview

[JetBrains PhpStorm](http://www.jetbrains.com/phpstorm/) is a commercial PHP IDE that can be configured to work with WordPress sites, allowing users to easily build and maintain custom plugins.

For more detailed information, see [WordPress development using PhpStorm](https://confluence.jetbrains.com/display/PhpStorm/WordPress+Development+using+PhpStorm). This document focuses on integrating and showcasing the PhpStorm workflow.

## Clone the Code Repository
First, if you do not already have one, [create a WordPress site](/docs/articles/wordpress/starting-wordpress-site/). Next, copy the code to your local workstation using [SFTP](/docs/articles/sites/code/developing-directly-with-sftp-mode/#sftp-connection-information) or [Git](/docs/articles/local/starting-with-git/#clone-your-site-codebase).

## Create a PHPStorm project

1. Open PHPStorm
1. Click **Create New Project**
1. Name your project
1. Verify the file path for the new project
1. Select "WordPress Plugin" as the project type
1. Provide the root directory for your local WordPress site

![PHPStorm WordPress root directory prompt](/docs/assets/images/phpstorm-root-dir.png)

There will not be any files open within your project once you complete these steps. You will find a PHP file in the project's root, which contains the standard plugin header for WordPress.

## Configure wp-cli (Optional)
Many WordPress plugin developers use the command line tool [wp-cli](http://wp-cli.org/). This is useful if you have a local development environment and want to use wp-cli to manage it. If you use wp-cli, you can configure PHPStorm to recognize it and be able to use it form within your project. To configure PHPStorm to use wp-cli, follow these steps.

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

### Connection Tab
[Configure the server](http://www.jetbrains.com/phpstorm/webhelp/deployment-connection-tab.html) connection tab in the following order:

* SFTP Host: (SFTP Host from Connection Info)
* Port: 2222
* Username: (Username from Connection Info)
* Auth Type: Key Pair
* Private Key File: (navigate to the location of your id\_rsa file. Example: /Users/jon/.ssh/id\_rsa)
* Click Test SFTP Connection...
* Root Path: Click Auto-detect, and navigate to the end of the detected path and add /code to the end

### Mappings Tab

1. Deployment path on server: /code/wp-content/plugins
2. Web path on server: (URL of your Pantheon Dev environment. Example: http://dev-yoursite.pantheon.io)
3. Click **OK**.
4. Go to Tools > Deployment > Automatic Upload > and select the server you created.

Now any files you change and save locally will be automatically uploaded to Pantheon.

## Conclusion
You are now ready to begin editing your plugin. Any file you create in this project, or any file you edit and save will automatically be pushed up to your development environment. Once your code is complete, you can migrate your work into test from your Pantheon dashboard, and eventually into production once everyone has approved the work.
