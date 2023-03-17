---
title: Decoupled Drupal Backend Starter for Front-End Sites
subtitle: Update Dependencies
description: Learn how to update your project dependencies.
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

This section provides information on how to update the dependencies for your backend project.

Dependencies can be updated manually with Composer or automatically with the Terminus plugin.

## Update Dependencies Manually with Composer

The Drupal project uses Composer to manage dependencies. The dependencies can be updated using the following Composer command:

### Update Drupal Core

Run the command below to update Drupal core:

  ```bash{promptUser: user}
  composer update drupal/core "drupal/core-*" --with-all-dependencies
  ```

### Update Contributed Module

Run the command below to update the contributed module:

  ```bash{promptUser: user}
   composer update drupal/modulename --with-dependencies
  ```

Refer to the resources below for more information.

- [Updating Drupal core via Composer](https://www.drupal.org/docs/updating-drupal/updating-drupal-core-via-composer)
- [Updating Modules and Themes using Composer](https://www.drupal.org/docs/updating-drupal/updating-modules-and-themes-using-composer)

## Update Dependencies Automatically with the [terminus-clu-plugin](https://github.com/pantheon-systems/terminus-clu-plugin)

Composer security updates can be applied automatically using the [Terminus CLU](https://github.com/pantheon-systems/terminus-clu-plugin)
(Composer Lock Updater) plugin. This plugin automatically creates pull requests based on `composer.lock` updates. This plugin was configured automatically if your project was created using the recommended Terminus [build tools project create command](creating-new-project.md).
