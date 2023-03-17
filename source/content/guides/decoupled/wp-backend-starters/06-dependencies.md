---
title: Decoupled WordPress Backend Starter for Front-End Sites
subtitle: Manage WordPress Dependencies
description: Learn how to manage WordPress dependencies for your project.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia, whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/wp-backend-starters/dependencies
anchorid: dependencies
contenttype: [guide]
innav: [true]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

This WordPress Project uses [Composer](https://getcomposer.org) to manage
dependencies.

## Add a New Plugin or Theme

You can add a new plugin or theme by using the Composer require command.

Command format:

```bash{promptUser: user}
composer require <namespace>/<packagename>
```

Example:

```bash{promptUser: user}
composer require wpackagist-plugin/akismet
```

Refer to [Composer documentation](https://docs.roots.io/bedrock/master/composer/) for more information.

## Update Dependencies Manually with Composer

You can update dependencies by using the Composer update command:

Command format for updating a plugin or theme:

```bash{promptUser: user}
composer update <namespace>/<packagename> --with-dependencies
```

Example:

```bash{promptUser: user}
composer update wpackagist-plugin/akismet --with-dependencies
```

Refer to [Composer documentation](https://docs.roots.io/bedrock/master/composer/#updating-wp-and-plugin-versions) for more information.

## Update Dependencies Automatically with the [terminus-clu-plugin](https://github.com/pantheon-systems/terminus-clu-plugin)

Composer security updates can be applied automatically using the [Terminus CLU](https://github.com/pantheon-systems/terminus-clu-plugin)
(Composer Lock Updater) plugin. This plugin automatically creates pull requests based on `composer.lock` updates. If your project was created using our recommended Terminus [build tools project create command](creating-new-project.md), this plugin was configured automatically.
