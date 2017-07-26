---
title: Using Composer to manage a Pantheon Drupal 8 site using JetBrains PhpStorm
description:
tags: []
categories: [drupal8]
---

This article explains how you can use the [Composer](https://getcomposer.org/) package manager to install extensions for your Drupal 8 site on Pantheon using the [Composer integration](https://confluence.jetbrains.com/display/PhpStorm/Composer+Support+in+PhpStorm) in [JetBrains PhpStorm] so that you can do it directly in your IDE and don't have to fall back to using the command line.

## Prerequisites

The following description assumes that you have [PhpStorm](https://www.jetbrains.com/phpstorm/) installed on your computer and a site with a Drupal 8 upstream created in Pantheon.

## Clone the Code Repository and Create A PhpStorm Project

1. Open PhpStorm and in the _Welcome to PhpStorm_ screen choose **Check out from Version Control**.
2. From the Pantheon dashboard for your Drupal site, switch to Git Connection Mode. Then copy the URL from Git Connection Info. Note that you only need the URL (from `ssh://` to `.git`), not the full command).
3. In PhpStorm, paste the Git URL in the _Git Repository URL_ field of the _Clone Repository_ dialog and enter your project name into _Directory Name_.
4. Hit **Clone** and wait for PhpStorm to download your site from Pantheon.
5. Reply **Yes** when PhpStorm asks whether you want to open the project.

![Welcome to PhpStorm](/source/docs/assets/images/integrations/phpstorm/Welcome_to_PhpStorm.png)

![Clone repository](/source/docs/assets/images/integrations/phpstorm/Clone_Repository.png)

## Configuring PhpStorm Composer Integration

After opening the project you'll see the following message, in which you should click on **Initialize**:

![Composer configuration file found.](/Users/lukas/Repositories/documentation/source/docs/assets/images/integrations/phpstorm/initcomposer-popup.png)

In case you missed this message you'll find it again in the _Event Log_.

PhpStorm should catch the settings correctly so you can simply confirm:

![Composer](/Users/lukas/Repositories/documentation/source/docs/assets/images/integrations/phpstorm/Composer.png)

Next PhpStorm might tell you that it has updated settings for excluded files. You can simply ignore this for now.

## Updating Composer Packages

When you've already worked with Composer on the command line you should be used to running the `composer update` command to ensure you have the latest version of your dependencies installed. With PhpStorm you can run this command directly within your IDE using either one of the following ways:

* Go to the **Tools** menu, **Composer** and choose **Update**.
* Open `composer.json` in the IDE and click **Update** in the header shown above the file.

![Composer](/Users/lukas/Repositories/documentation/source/docs/assets/images/integrations/phpstorm/composer-update.png)

In both cases, if this is the first time you use PhpStorm's Composer integration, you'll see the _Composer Settings_ window in which you need to set or confirm your local Composer installation. PhpStorm needs to know where it can find this tool on your computer and you can point it either to the `composer` executable or a `composer.phar` archive. If you have previously [installed Composer globally](https://getcomposer.org/doc/00-intro.md#globally) you don't need to specify any path here but can simply leave the commmand `composer` in the field for the composer executable and confirm with **OK**:

![Composer Settings](/Users/lukas/Repositories/documentation/source/docs/assets/images/integrations/phpstorm/Composer_Settings.png)

If you have no global install of composer you can instruct PhpStorm to download a local composer install for the project.

Once the update command is complete a tooltip and an entry in the _Event Log_ will confirm this. Next time you run _Update_ or another Composer command you won't be asked to configure it again.

## Install a Drupal Module via Composer

(TODO ...)

## Deploy and Test Changes

(TODO ...)

## Changing Composer Configuration

The _Composer If you wish to modify your Composer settings go to PhpStorm's _Preferences_, then **Languages & Frameworks**, **PHP** and **Composer**. Make your changes and hit **Apply** or **OK**.

...