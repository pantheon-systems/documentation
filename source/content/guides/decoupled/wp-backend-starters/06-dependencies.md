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

A new pluginor theme can be added using the following composer require command:

```
composer require <namespace>/<packagename>
```

For example:

```
composer require wpackagist-plugin/akismet
```

For more info:

- https://docs.roots.io/bedrock/master/composer/

## Update Dependencies Manually with Composer

The dependencies can be updated using the following composer update command: For updating any plugin/theme:

```
composer update <namespace>/<packagename> --with-dependencies
```

For example:

```
composer update wpackagist-plugin/akismet --with-dependencies
```

For more info:

- https://docs.roots.io/bedrock/master/composer/#updating-wp-and-plugin-versions

## Update Dependencies Automatically with the [terminus-clu-plugin](https://github.com/pantheon-systems/terminus-clu-plugin)

Alternatively, Composer security updates can be applied automatically using the [Terminus CLU](https://github.com/pantheon-systems/terminus-clu-plugin)
(Composer Lock Updater) Plugin. This plugin automatically creates pull requests based on composer.lock updates. If your project was created using our recommended Terminus [build tools project create command](creating-new-project.md) then this plugin has been configured automatically.
