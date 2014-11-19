---
title: Configuring JetBrains PhpStorm IDE with Pantheon
filename: source/_common-tasks/configuring-jetbrains-phpstorm-ide-with-pantheon.md
---

## Pantheon Academy
<iframe allowfullscreen="" frameborder="0" height="315" src="//www.youtube-nocookie.com/embed/2K20B0cEC4g" width="560"></iframe>
## Overview

[JetBrains PhpStorm](http://www.jetbrains.com/phpstorm/) is a popular commercial PHP IDE that can be configured to work with Drupal sites.

JetBrains has comprehensive documentation on how to configure PhpStorm with Drupal - see their article [Drupal Development using PhpStorm](http://confluence.jetbrains.com/display/PhpStorm/Drupal+Development+using+PhpStorm) for details.

This article will cover some best practices and recommendations for building a Drupal site on Pantheon using PhpStorm after you've followed the JetBrains guide.

## Initial site setup

After you've [created your site on Pantheon](/documentation/howto/pantheon-101-getting-started/), you'll need to set up your local environment.

### Clone the code repository from git

First, make sure your dev environment is in Git mode, then [clone your git repository](/documentation/getting-started/starting-with-git/) to your local workstation.

### Create new PhpStorm project

Then, open PhpStorm and Create New Project from Existing Files.

Create New Project: [Create New Project:](<a href=) [Choose Project Directory](http://www.jetbrains.com/phpstorm/webhelp/create-new-project-choose-project-directory.html) - Project root - Select the folder which is the parent for all the project sources and click this icon or choose Project Root on the context menu of the selection. Click Finish

### Configure PhpStorm project

Ensure that PhpStorm uses [Drupal settings](http://www.jetbrains.com/phpstorm/webhelp/drupal.html) by going to Preferences | Drupal

1. [X] Enable Drupal integration
2. Drupal installation path (click ... to specify)
3. [X] Set up PHP | Include Paths
4. Version: (choose the Drupal major version)

Configure the correct version of PHP. From Preferences | [PHP](http://www.jetbrains.com/phpstorm/webhelp/php.html), specify PHP Language Level: 5.3.

Optional, but recommended - [enable Drush support](http://www.jetbrains.com/phpstorm/webhelp/drush.html). From Preferences | [Command Line Tool Support](http://www.jetbrains.com/phpstorm/webhelp/command-line-tool-support.html), click Plus, then choose Tool: Drush, then specify the path.

### Configure on-server development

At this point, you'll want to put your [dev environment into SFTP mode](/documentation/getting-started/developing-on-pantheon-directly-with-sftp-mode/), then click Connection Info to see the connection settings.

Within PhpStorm, you can get to the deployment configuration by going to Tools | Deployment | Configuration.

Click Plus for the [Add Server Dialog](http://www.jetbrains.com/phpstorm/webhelp/add-server-dialog.html). For the name, enter the pantheon sitename, followed by a dash and the environment. For example, YOURSITE-dev. Type: SFTP. Click OK

[Configure the server](http://www.jetbrains.com/phpstorm/webhelp/deployment-connection-tab.html) Connection tab in the following order:

1. SFTP host: (SFTP Host from Connection Info)
2. Port: 2222
3. Username: (Username from Connection Info)
4. Auth Type: Key Pair
5. Private Key File: (navigate to the location of your id\_rsa file, like /Users/jon/.ssh/id\_rsa)
6. Click Test SFTP Connection...
7. Root path: Click Autodetect, then navigate to the end of the detected path and add /code to the end

Then, go to the Mappings tab.

1. Deployment path on server: /code
2. Web path on server: (URL of your Pantheon dev environment, like http://dev-YOURSITE.gotpantheon.com)

Click Ok, then Tools | Deployment | Automatic Upload. Select the server you created.

Now, any files you change and save locally will be automatically uploaded to Pantheon.
