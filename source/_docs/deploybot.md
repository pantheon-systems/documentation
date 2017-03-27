---
title: Integrating DeployBot with Your Pantheon Site
description: Learn how to set up and use DeployBot on Pantheon.
category:
  - developing
keywords: deploybot, sites
---
Sites that require additional build steps for deployment should use a continuous integration service so that each step is executed with machine precision. Avoiding human error, especially in a repeatable process such as compiling JavaScript and CSS files, helps free up resources while preserving the sanity of developers.

DeployBot provides continuous integration services with a friendly user interface to manage configuration and build steps, as opposed to managing them in YML files like other service providers.

## Before You Begin
1. If you don't already have a DeployBot account, [create one now](https://signup.deploybot.com/account/new).
2. Manage and store your site's code repository on a third party hosting service, such as GitHub.
3. Build steps and their implementation should already be known and in-place before attempting to add continuous integration.

  For example, if you would like to use DeployBot to send compiled CSS and JavaScript files to Pantheon you should already have a task runner, such as Grunt, within your site's codebase that can be used to compile assets.

## Configure DeployBot for Deployments to Pantheon

1. Click **Connect a repository** after creating a new DeployBot account.
2. Click **Connect new account** or select the existing user if available, and select your site's repository from the drop-down menu.
3. Enter a title for this repository and apply a color label, then click **Connect**.
4. Click **Create an environment** and enter an environment name, such as Dev.
5. Select a Deployment Mode: Manual or Automatic. We suggest deploying automatically to Pantheon's Dev environment and manually to Live.
6. Choose a branch from the drop-down menu (typically master), and click **Save**.
7. Select the **SFTP** deployment option within the Files section. At this time, no other deployment methods are supported when deploying to Pantheon.
8. Name the destination for these deployments, such as Pantheon Dev Environment.
9. Retrieve the target environment's SFTP details within the Site Dashboard on Pantheon by clicking **Connection Info**:

 ![Connection info dev dashboard](/source/docs/assets/images/dashboard/connection-info.png)

10. Use the SFTP values gathered in the previous step to enter the host, port, and login (username). The destination path for the purposes of sending compiled CSS and JavaScript assets should be `~/files`. We recommend adding the SSH key provided by DeployBot to your user account on Pantheon to authenticate deployments.

    <div class="alert alert-danger">
    <h4 class="info">Warning</h4>
    <p markdown="1">
      Due to the nature of our platform architecture, the connection information will change from time to time due to server upgrades, endpoint migrations, etc. Update values here with information from Pantheon's Site Dashboard periodically or when you are unable to connect.
    </p>
    </div>

11. Configure build steps by clicking **Compile, compress, or minimize your code** then add specific commands for each step in the build process, such as:

 ```
 npm install
 grunt
 ```

12. Click **Save**. Once a connection can be made successfully using the information provided, DeployBot confirms that everything is ready to go.
13. Deploy to Pantheon by clicking the **Deploy** button.
14. Review the deployment and provide a message, then click **Start deployment**.  

Compiled files should now exist on the Dev environment on Pantheon. You can repeat this process to configure deployments on other Pantheon environments as needed, such as Test and Live. For additional details, see [Building assets with Grunt or Gulp during deployment](https://deploybot.com/guides/building-assets-with-grunt-or-gulp-during-deployment).
