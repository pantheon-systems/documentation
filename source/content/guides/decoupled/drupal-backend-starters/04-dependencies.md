---
title: Decoupled Drupal Backend Starter for Front-End Sites
subtitle: Update Dependencies
description: Learn how to update your dependencies.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/drupal-backend-starters/dependencies
anchorid: dependencies
contenttype: [guide]
innav: [true]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

Dependencies can be updated manually with Composer or automatically with the Terminus plugin.

## Update Dependencies Manually with Composer

The Drupal project uses Composer to manage dependencies. The dependencies can be updated using the following Composer command:

### Update Drupal Core

Run the command below to update Drupal core.

  ```bash{promptUser: user}
  composer update drupal/core "drupal/core-*" --with-all-dependencies
  ```

### Update Contributed Module

Run the command below to update the contributed module.

  ```bash{promptUser: user}
   composer update drupal/modulename --with-dependencies
  ```

Refer to the resources below for more information.

- [Updating Drupal core via Composer](https://www.drupal.org/docs/updating-drupal/updating-drupal-core-via-composer)
- [Updating Modules and Themes using Composer](https://www.drupal.org/docs/updating-drupal/updating-modules-and-themes-using-composer)

## Update Dependencies Automatically with the [terminus-clu-plugin](https://github.com/pantheon-systems/terminus-clu-plugin)

Alternatively, Composer security updates can be applied automatically using the [Terminus CLU](https://github.com/pantheon-systems/terminus-clu-plugin)
(Composer Lock Updater) Plugin. This plugin automatically creates pull requests based on `composer.lock` updates. If your project was created using our recommended Terminus [build tools project create command](creating-new-project.md) then this plugin has been configured automatically.
