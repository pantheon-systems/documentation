---
title: Configuring JetBrains PhpStorm IDE with WordPress on Pantheon
description: Best practices and recommendations for building a WordPress site using JetBrains PhpStorm.
category:
  - developing
  - WordPress
keywords: wordpress, jetbrains, phpstorm
---
## Overview

[JetBrains PhpStorm](http://www.jetbrains.com/phpstorm/) is a commercial PHP IDE that can be configured to work with WordPress sites, allowing users to easily build and maintain custom plugins.

For detailed information, see [WordPress Development using PhpStorm](https://confluence.jetbrains.com/display/PhpStorm/WordPress+Development+using+PhpStorm). This document focuses on integrating and showcasing the PhpStorm workflow.

## Clone the Code Repository
If you do not already have one, [create a WordPress site](/docs/articles/wordpress/starting-wordpress-site/). Next, copy the code to your local workstation using [SFTP](/docs/articles/sites/code/developing-directly-with-sftp-mode#sftp-connection-information) or [Git](/docs/articles/local/starting-with-git/#clone-your-site-codebase).

## Create a PHPStorm Project

1. Open PHPStorm.
1. Click **Create New Project** and name your project.
1. Verify the file path for the new project.
1. Select **WordPress Plugin** as the project type, and click **OK**.
1. Provide the root directory for your local WordPress site, and click **OK**.  
![PHPStorm WordPress root directory prompt](/docs/assets/images/phpstorm-root-dir.png)

There will not be any files open within your project once you complete these steps. You will find a PHP file in the project's root, which contains the standard plugin header for WordPress.

## Configure WP-CLI (Optional)
Many WordPress plugin developers use the command line tool [WP-CLI](http://wp-cli.org/). This is useful if you have a local development environment and want to use WP-CLI to manage it.

<div class="alert alert-info" role="alert">
<h4>Note</h4>
You must successfully create a project before adding WP-CLI as a Command Line Tool.</div>

You can configure PHPStorm to recognize WP-CLI from within your project by following these steps:

1. From Preferences > [Command Line Tool Support](http://www.jetbrains.com/phpstorm/webhelp/command-line-tool-support.html), click **+**.
1. Choose the tool **WP-CLI**, and click **OK**.
1. Select **Executable Available** and enter the file path to your local `wp` directory and click **OK**.  
 ![Configuring wp-cli path for PHPStorm](/source/docs/assets/images/path-to-wp-phpstorm.png)
1. Click **OK** to save the changes.


## Configure Your Pantheon Development Environment
1. Put your [Dev environment into SFTP mode](/docs/articles/sites/code/developing-directly-with-sftp-mode#sftp-mode), and click **Connection Info** to see the connection settings.
2. Within your PHPStorm project, go to Tools > Deployment > Configuration.
3. Click **+** to [add a web server](http://www.jetbrains.com/phpstorm/webhelp/add-server-dialog.html).
4. Enter your Pantheon site name, followed by a dash and the environment.
5. Select **SFTP** for type and click **OK**.
 ![Add web server PHPStorm](/source/docs/assets/images/add-web-server-phpstorm.png)
### Connection Tab

Using your site's [SFTP connection information](/docs/articles/sites/code/developing-directly-with-sftp-mode#sftp-connection-information), configure the deployment connection and click **Test SFTP Connection**.

### Mappings Tab
Provide the file paths within the Mappings tab to allow correspondence between project folders:

1. Local path: This field is automatically populated and requires no edits.
2. Deployment path on server: `/code/wp-content/plugins`
3. Web path on server: URL of your Pantheon Dev environment. Example: http://dev-yoursite.pantheon.io
4. Click **OK**.

Now go to Tools > Deployment > Automatic Upload > and select the server you created. Any files you change and save locally will be automatically uploaded to Pantheon.

You are now ready to begin editing your plugin. Any file you create, edit, and save in this project will automatically be pushed up to your Development environment. Once your code is complete, you can migrate your work into test from your Pantheon Dashboard, and eventually into production once everyone has approved the work.
