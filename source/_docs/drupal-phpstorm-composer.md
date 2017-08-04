---
title: Installing Composer-based extensions on a Pantheon Drupal 8 site using JetBrains PhpStorm
description:
tags: []
categories: [drupal8]
---

This article explains how to use [Composer](https://getcomposer.org/) to install extensions for your Drupal 8 site on Pantheon using the [Composer integration](https://confluence.jetbrains.com/display/PhpStorm/Composer+Support+in+PhpStorm) in [JetBrains PhpStorm](https://www.jetbrains.com/phpstorm/). Composer, if you haven't used it before, is a package manager used to manage dependencies such as code libraries and vendor SDKs in most modern modular PHP projects. It is a core part of Drupal since version 8 as Drupal 8 relies on packages that are distributed through Composer and its default repository [Packagist](https://packagist.org/). Composer is a CLI tool but with the PhpStorm integration you can do everything directly in your IDE and don't have to fall back to the command line for managing your Drupal site on Pantheon.

## Prerequisites

The following description assumes that you have PhpStorm installed on your computer and a site with a Drupal 8 upstream created in Pantheon.

## Clone the Code Repository and Create A PhpStorm Project

1. Open PhpStorm, and in the _Welcome to PhpStorm_ screen choose **Check out from Version Control** and **Git**.
   
   ![Welcome to PhpStorm](/source/docs/assets/images/integrations/phpstorm/Welcome_to_PhpStorm.png)

2. From the Pantheon dashboard for your Drupal site, switch to _Git Connection Mode_. Your site should remain in this mode while you're working offline with Git in PhpStorm. Then, copy the URL from Git Connection Info. Note that you only need the URL (from `ssh://` to `.git`), not the full `git` command).

    ![Pantheon Dashboard](/source/docs/assets/images/integrations/phpstorm/Pantheon_Dashboard1.png)

3. In PhpStorm, paste the Git URL in the _Git Repository URL_ field of the _Clone Repository_ dialog and enter your project name into _Directory Name_.

   ![Clone repository](/source/docs/assets/images/integrations/phpstorm/Clone_Repository.png)

4. Hit **Clone** and wait for PhpStorm to download your site from Pantheon.
5. Reply **Yes** when PhpStorm asks whether you want to open the project.

## Configure PhpStorm Drupal Integration

After opening the project you'll see the following message, in which you should click on **Initialize**:

![Drupal Support](/source/docs/assets/images/integrations/phpstorm/initdrupal-popup.png)

Enable Drupal integration, choose the correct version and confirm with **OK**:

![Drupal Integration](/source/docs/assets/images/integrations/phpstorm/Drupal.png)

In case you missed this message you'll find it again in the _Event Log_.

## Configure PhpStorm Composer Integration

After opening the project you'll also see the following message, in which you should click on **Initialize** as well:

![Composer configuration file found.](/source/docs/assets/images/integrations/phpstorm/initcomposer-popup.png)

In case you missed this message you'll find it again in the _Event Log_, or you can close and reopen the project.

PhpStorm should catch the settings correctly so you can simply confirm with **OK**:

![Composer](/source/docs/assets/images/integrations/phpstorm/Composer.png)

## Update Composer Packages

If you've already worked with Composer before you should be used to running `composer update` on the command line to ensure you have the latest version of your dependencies installed. With PhpStorm you can run this command directly within your IDE using either one of the following ways:

* Go to the **Tools** menu, **Composer** and choose **Update**.
* Open `composer.json` in the IDE and click **Update** in the header shown above the file:

  ![Composer](/source/docs/assets/images/integrations/phpstorm/composer-update.png)

In both cases, if this is the first time you use PhpStorm's Composer integration, you'll see the _Composer Settings_ window in which you need to set or confirm your local Composer installation. PhpStorm needs to know where it can find this tool on your computer and you can point it either to the `composer` executable or a `composer.phar` archive. If you have previously [installed Composer globally](https://getcomposer.org/doc/00-intro.md#globally) you don't need to specify any path here but can simply leave the commmand `composer` in the field for the composer executable and confirm with **OK**:

![Composer Settings](/source/docs/assets/images/integrations/phpstorm/Composer_Settings.png)

If you have no global install of composer, for example because this is the first time you're using Composer, you can instruct PhpStorm to download a local `composer.phar` for the project.

Once the update command is complete a tooltip and an entry in the _Event Log_ will confirm this. Next time you run _Update_ or another Composer command you won't see this settings screen again. If you wish to modify your Composer settings, however, you can go to PhpStorm's _Preferences_, then **Languages & Frameworks**, **PHP** and **Composer**. Make your changes and hit **Apply** or **OK**.

## Install a Drupal Module via Composer

Composer fetches modules from repositories. As mentioned in the introduction, the default repository is Packagist. Drupal, however, hosts their own repositories for [all modules listed on drupal.org](https://www.drupal.org/project/project_module). If you look at the root `composer.json` file you'll notice a section called _repositories_ which includes a custom _composer_ repository hosted at _https://packages.drupal.org/8_.

PhpStorm's Composer integration has a search UI available that can be accessed by going to the **Tools** menu, **Composer** and **Manage Dependencies ...**. You can type the name of any package hosted on Packagist in the search field.

![Manage Composer Dependencies](/source/docs/assets/images/integrations/phpstorm/Manage_Composer_Dependencies.png)

Unfortunately PhpStorm's current Composer support does not include custom repositories as used by Drupal. This means that if your Composer extension is not on Packagist you have to add it manually to the `composer.json` file. Packages are added to the _require_ section and for each package you need to specify either an exact version number or [a version constraint](https://getcomposer.org/doc/articles/versions.md). Follow these steps:

1. Search for the module on drupal.org, for example for *Pathauto*.
2. Determine the latest available stable version from [the project page](https://www.drupal.org/project/pathauto):

   ![Drupal Pathauto](/source/docs/assets/images/integrations/phpstorm/Pathauto___Drupal_org.png)

3. Composer package names always follow a _vendor/name_ convention. All packages in the Drupal repositories have _drupal_ as the vendor and the Drupal project name as their package name, which means _drupal/pathauto_ is the name for the package we want to install. Add it to your `composer.json` file with a version constraint of `~1.0`, then click **Update** to start the download and installation process:

   ![Composer with Pathauto](/source/docs/assets/images/integrations/phpstorm/composer-pathauto.png)

4. Wait for a confirmation message from Composer.

## Deploy and Test Changes

Now it's time to deploy and test your newly installed module. Here's how to do that:

1. The newly added directories from the module are not yet under version control. Usually Composer recommends not to add dependencies to your own Git repository but with Pantheon's default workflow this is required because there's no server-side build step. Right click on the *vendor* directory, select **Git** and **Add**. This ensures all previously unversioned files are added. Repeat the same for the _modules_ directory.
2. Next, open the **VCS** menu, **Commit Changes**. By default PhpStorm wants to perform a code analysis and check TODOs but since we have only added third party code which we do not want to fix or optimize you should disable the options in order to hide any warnings. Enter a commit message and click **Commit** to confirm.

   ![Commit Changes](/source/docs/assets/images/integrations/phpstorm/Commit_Changes.png)

3. Open **VCS** once again, select **Git**, **Push** and confirm pushing your changes.
4. Go to the Pantheon dashboard. Your commit message should be visible in the Commit Log.
5. Adding a module with Composer makes it available to Drupal but you still need to activate it within Drupal itself. Thus, from your dashboard, click **Visit Development Site**. Go to **Extend** on the admin menu, scroll down until you see _Pathauto_ listed, check it and confirm with **Install**.

   ![Extend](/source/docs/assets/images/integrations/phpstorm/Extend.png)

6. Drupal might ask you to install required modules as well. Confirm with **Continue**.

Congratulations, your Pathauto module is installed and ready to use!