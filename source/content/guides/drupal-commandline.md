---
title: Create a Drupal Site From the Command Line Using Terminus and Drush
description: Learn how to manage configuration between Pantheon environments using the command line.
cms: "Drupal"
categories: [get-started]
tags: [terminus, site, cli]
type: guide
permalink: docs/guides/drupal-commandline
contributors: [stevector, whitneymeredith]
date: 2/23/2022
---

[Drush](https://github.com/drush-ops/drush) is a tool for working with Drupal from the command line. [Terminus](/terminus) allows you to use the command line to do everything you can do in Pantheon's browser-based dashboard. You can also run Drush commands directly from Terminus, making it a single solution for command line development on Pantheon.

This guide walks you through using Drush and Terminus in the command line to create a new Drupal site and move configurations between Pantheon environments.

## Before You Begin

Be sure that you:

- Are familiar with your operating system's command line.
- Are using a Unix-based system (Linux or Mac OS X). Windows commands will vary slightly.
- Have created a [Pantheon account](https://dashboard.pantheon.io/register). Pantheon accounts are always free for development.
- Have an [SSH key](/ssh-keys) generated, added to your Pantheon dashboard, and loaded in to your local SSH agent.

## Install and Authenticate Terminus

Terminus provides advanced interaction with the platform and allows us to run Drush commands remotely. Terminus also opens the door to automating parts of your workflow by combining multiple operations. For more information about Terminus, see our [Terminus Manual](/terminus).

1. Install Terminus in the `$HOME/terminus` directory:

  ```bash{promptUser: user}
  mkdir $HOME/terminus
  cd $HOME/terminus
  curl -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar && php installer.phar install
  ```

1. [Generate a Machine Token](https://dashboard.pantheon.io/login?destination=%2Fuser#account/tokens/create/terminus/) in the Pantheon dashboard by clicking **User Dashboard** > **Account** > **Machine Tokens**. Use the Machine Token to authenticate Terminus:

  ```bash{promptUser: user}
  terminus auth:login --machine-token=‹machine-token›
  ```

1. Verify your session after installation:

  ```bash{promptUser: user}
  terminus site:list
  ```

If you see your Pantheon sites, then installation and authentication were successful! When you are comfortable with Terminus, you will find it faster to use than the browser.

## Create Your Site and Initialize Environments

<Alert title="Note" type="info">

The next few sections of this guide use the example variables `steve-new-site` and `"Steve's New Site"` as the site name and label. Make sure to replace each instance, as well as other variables, with your desired values.

</Alert>

1. Create a new Drupal site on Pantheon:

  ```bash{promptUser: user}
  terminus site:create steve-new-site "Steve's New Site" "897fdf15-992e-4fa1-beab-89e2b5027e" -- org "Example Organization"
  ```

   The `--org` option in the command above passes the Organization name, label, or ID to associate the site with an Organization. Use the `site:org:add` command to associate an existing site with an Organization.

1. Open your new Site Dashboard in a browser:

  ```bash{promptUser: user}
  terminus dashboard:view steve-new-site
  ```

  Keep this window open to see the changes you are making in Terminus appear almost immediately in your Site Dashboard.

1. Use the Drush [`site-install`](https://drushcommands.com/drush-9x/) command to install Drupal on the Dev environment:

  ```bash{promptUser: user}
  terminus drush steve-new-site.dev -- site-install -y
  ```
  
   You will need to [update your SSH configuration](/ssh-keys#control-path-error) if you get the `ControlPath too long` error message.

1. Use the password included in the output of the command above to sign in to the site with your browser, or run the following command to get a one-time login link:

   ```bash{promptUser: user}
   terminus drush  steve-new-site.dev  -- user-login
  ```

1. Create the Test environment:

  ```bash{promptUser: user}
  terminus env:deploy steve-new-site.test
  ```

1. Create the Live environment:

  ```bash{promptUser: user}
  terminus env:deploy steve-new-site.live
  ```

### Export the Site Name as a Variable

At this point you are probably tired of replacing `steve-new-site` in every command.

1. Set your site name to a variable to copy and paste it for the remainder of the commands:

  ```bash{promptUser: user}
  export TERMINUS_SITE=steve-new-site
  ```

  This sets an [**environment variable**](https://en.wikipedia.org/wiki/Environment_variable) named `$TERMINUS_SITE` with the value `steve-new-site`. The variable name is replaced in the executed command with the value whenever you use the variable name.

1. Test this by echoing your variable:

  ```bash{promptUser: user}
  echo $TERMINUS_SITE
  ```

  Copy and paste the remainder of these commands without replacing the site name, as they use the `$TERMINUS_SITE` variable.

1. Run the code below to get the connection information for the Dev environment:

  ```bash{promptUser: user}
  terminus connection:info $TERMINUS_SITE.dev
  ```

## Install Drupal Modules

We recommend that you use [Integrated Composer](/guides/integrated-composer) to install and manage your modules. Integrated Composer is a Pantheon platform feature that extends Composer functionality to Drupal's core files, and treats them as a managed dependency. Integrated Composer let's you perform one-click updates from the Dashboard for upstream updates and Composer dependencies.

You can also manage all modules with [Composer](/guides/composer), or with Pantheon's [Terminus Composer plugin](https://github.com/pantheon-systems/terminus-composer-plugin), which runs Composer commands in your development environment.

## Managing Content, Configuration, and Code Across Environments

[Configuration management is a complex topic with its own detailed recommendations](/drupal-9-configuration-management). For this guide, all you need to know is that by default, Drupal 9 configuration is stored in the database and can be cleanly exported to `yml` files. Once exported to files and committed to Git, these configuration changes can be deployed to different environments (like Test and Live) where they can then be imported to the database.

In the lifecycle of managing a site, content editors will add new material to the Live environment. Move updated content into the Test and Dev environments from time to time to build and test features with fresh material from the Live environment.

## See Also

- [Use the Pantheon Workflow](/pantheon-workflow)
- [Configuration Workflow for Drupal 9 Sites](/drupal-9-configuration-management)
- [The Terminus Manual](/terminus)
- [Drupal Drush Command-Line Utility](/drush)
