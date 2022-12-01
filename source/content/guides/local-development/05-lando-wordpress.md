---
title: Local Development on Pantheon
subtitle: Install and Configure Lando for WordPress
description: Install and configure Lando for WordPress local development.
contributors: [digisavvy]
categories: [develop]
tags: [code, iterate, lando, local, webops]
layout: guide
showtoc: true
permalink: docs/guides/local-development/lando-wordpress
anchorid: lando-wordpress
---

This section provides information on how to use Lando for local development with WordPress sites on Pantheon.

[Lando](https://lando.dev/) is an Open Source development tool for customizable local server environment configurations that can be tracked in source-control repositories.

## Before You Begin

Be sure that you have:

- An existing WordPress site on Pantheon, or [create](https://dashboard.pantheon.io/sites/create) a site.
- A working knowledge of local server environments.
- Reviewed the [Lando getting started guide](https://docs.lando.dev/contrib/contrib-intro.html) and the [Lando CLI usage](https://docs.lando.dev/basics/usage.html).
- Verified that your meet Lando's [system requirements](https://docs.devwithlando.io/installation/system-requirements.html). Note that Lando does not currently provide a Graphical User Interface (**GUI**). Everything is managed from the command line.

## Download and Install Lando

1. Download the appropriate [Lando release](https://github.com/lando/lando/releases) for your Operating System.

1. Open the installer package. The installer has a few pre-flight checks it runs before it starts.

  ![Image of the Lando installer](../../../images/guides/lando-wordpress/lando-installer.png)

1. Follow the system prompts to install Lando.

## Get Started

You must manage your Lando instances via the command-line. The Lando command is installed globally. You can run it from anywhere within your terminal. 

1. Review the short list of useful Lando commands [here](https://docs.devwithlando.io/cli/usage.html) or run the command below for a list of useful Lando commands:

  ```bash
  lando --help
  ```

1. Keep your project's site files and folders organized by placing your website projects in separate folders from one another.

1. Create a separate folder to hold your Lando-powered installations rather than mixing with installs managed by other server environments.

## Install WordPress Locally

This example shows you how to install and spin up a fresh WordPress site locally, without Pantheon integration.

Note that you can follow these same basic steps with an existing Pantheon Drupal site by replacing the starting recipe.

1. Open your terminal and go to the directory where you plan to run your Lando WP site. Replace `my-wp-site` with the name of your site.

  ```bash
  cd ~/projects/my-wp-site
  ```

1. Initialize the Lando site:

  ```bash
  lando init
  ```

1. Select your directory. You can choose to start from your current directory or you can clone from Pantheon, Github, or another remote repository, or zip file. This example uses the **current working directory**.

1. Choose WordPress as your starting recipe.

  ![Choose your Lando recipe to spin up a new website.](../../../images/guides/lando-wordpress/lando-choose-recipe.png)

1. Press enter and Lando will spin up the site for your webroot from your current directory.

1. Enter the name of the site to create your local site. Use something you’ll remember. 

1. Start Lando:

  ```bash
  lando start
  ```

  This starts your Lando app and gives you some basic information like your Appserver URLs to access the site in your local browser of choice:

  ![alt text](../../../images/guides/lando-wordpress/lando-start.png)

1. Download the WordPress Core:

  ```bash
  lando wp core download
  ```

  This command downloads the current stable release of WordPress and unpacks it in your current working directory. This step isn’t necessary if you started with a Git or Pantheon repository instead of the current working directory.

  <Alert type="info" title="Note">

  Prefix your `wp` command with `lando` to use WP-CLI commands in Lando.

  </Alert>

1. Create your WP configuration file. You can also do this in the command line.

1. Open your browser and enter the URL provided when you started Lando. You’ll notice WordPress’s _Famous Five Minute install_ screen.

1. Click next after choosing your preferred language, and then click let’s go on the following screen.

1. Enter your credentials and complete the installation process. In Lando, for a WordPress installation without Pantheon, the Database, Username, and Password are all `wordpress` and Database Host is `database` (all values are case-sensitive).

<Alert type="info" title="Note">

You can find your site’s login details by typing `lando info` in your terminal.

</Alert>

## WordPress with the Pantheon Recipe

Using Lando with Pantheon provides a few key advantages:

- It closely mimics Pantheon’s tech stacks and environments for your local environment, getting you as close to a one-to-one development setup as possible.

- The recipe also installs [Terminus](/terminus) (if you don’t already have it installed), Pantheon’s powerful web server management CLI.

- The ability to push and pull changes directly into Lando from any of your Pantheon environments.

### WordPress Pantheon Requirements

Verify that you have:

- An account with Pantheon, which you can [register](https://pantheon.io/register) for free.

- A Pantheon hosted site ready to go. You can either use an existing Pantheon site or [spin up a new one](/guides/quickstart/create-new-site).

- A unique Pantheon [machine token](/machine-tokens).

### Install WordPress with the Pantheon Recipe

1. Open the directory of the WordPress site created in the section above, and stop the Lando instance (if it is running):

  ```bash
  lando stop
  ```

1. Open your project directory, create a new directory for your WordPress and Pantheon integrated environment, and `cd` to it.

1. Initiate a new Lando site, specifying Pantheon as the source:

  ```bash
  lando init --source pantheon
  ```

  The only difference between this and `lando init` is that defining the source as Pantheon allows you to skip some prompts.

1. Paste the Pantheon machine token you created for Lando when prompted. Note that most Terminal emulators use **CTRL/Command + V** to paste, and you will not see any characters added, `*` or otherwise.

1. Choose the Pantheon site you want to pull from to create your local site.

  <Alert type="info" title="Note">

  Lando creates your local environment, mirroring your Dev environment closely, and then clones down the site’s codebase (this part of the process does not include media files in the uploads folder or the site’s database). This will take a few minutes or so depending on the site’s size.

  </Alert>

1. Run the site locally when the installation completes:

  ```bash
  lando start
  ```

You can get your local site URL when you start your site and access it from your browser. You can also pull your code, media files, and your database from the site’s Pantheon environment.

## Push and Pull Your Changes

### Push Local Changes to Pantheon

One of the benefits of using Lando with the Pantheon recipe is the ability to _push_ your changes from your local site to your various Pantheon environments (including Live and Multidev instances).

1. Make changes to your local site.

1. Enter `lando push` to initiate a push from your local environment.

1. Complete the Lando prompts to select the environments you want to push your codebase, files, and database changes to.

<Alert type="info" title="Note">

Your **database** refers to your app's database. Your **code** refers to your app’s codebase, and includes any files that you would track within your site’s source control repository. Your **media** refers to assets and files stored within the `/uploads` folder. In general, it’s a good idea to NOT include your media files in your repository as your repo’s size can get out of hand quickly.

</Alert>

### Pull Changes from Pantheon to Your Local Environment

1. Open your terminal.

1. Pull changes from Pantheon:

  ```bash
  lando pull
  ```

1. Select the environment you want to pull from when prompted. You can pull from any Pantheon environment, including Multidev environments.



  Lando runs a search and replace on the database **siteurl** and **sitename** table fields and replaces Pantheon’s values with your local values.

  <Alert type="info" title="Note">

  You can run your own search and replace on your local site after a pull has finished. You can also run a search replace on a site on Pantheon you pushed to. Here’s how you can do both:

  ```bash
  lando wp search-replace 'yourpantheondevurl.com' 'yourlocalapp.lndo.site'
  ```

  OR

  ```bash
  terminus wp yourpantheonsitename.dev -- search-replace 'yourlocalapp.lndo.site' 'yourpantheondevurl.com'
  ```

  </Alert>

## Support

Please note that [Pantheon's Support Team](/guides/support) doesn't provide support for Lando.
Visit the [Lando GitHub repository](https://github.com/lando/lando#help-troubleshooting--support) if you encounter issues.

## More Resources

- [WP-CLI on Pantheon](/guides/wp-cli)
- [WordPress on Pantheon Quick Start Guide](/guides/wordpress-pantheon)
- [Configure Your wp-config.php File](/guides/php/wp-config-php)
- [Pantheon WebOps Workflow](/pantheon-workflow)