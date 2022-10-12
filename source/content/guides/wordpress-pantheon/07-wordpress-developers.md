---
title: WordPress on Pantheon Quick Start Guide
subtitle: WordPress on Pantheon for Developers
description: Develop efficiently with WordPress on Pantheon.
categories: [wordpress]
tags: [wordpress, webops]
contributors: [whitneymeredith]
reviewed: "2022-05-05"
layout: guide
showtoc: true
permalink: docs/guides/wordpress-pantheon/wordpress-developers
anchorid: wordpress-pantheon/wordpress-developers
---

Review the resources in this section to learn how to develop your WordPress Pantheon site efficiently.

## Create a WordPress Site from the Command Line with Terminus and WP-CLI

View our [WordPress Command Line](/guides/wp-cli) guide for steps to create and develop your WordPress site using your command line interface and WP-CLI. 

## Run WordPress as a Backend API

Pantheon supports [running WordPress as an API](/headless) (Application Programming Interface) for the backend of headless sites, which enables the CMS to interact with external frontend applications over HTTP requests.

## WordPress on Pantheon Developer Best Practices

Review our [WordPress Best Practices](/wordpress-best-practices) doc for suggestions, tips, and best practices for developing and managing WordPress sites on the Pantheon platform.

## WordPress Core Updates

Review our [WordPress Core Updates](/core-updates) doc for instructions on how to make core updates to WordPress sites hosted on the Pantheon WebOps platform.

## Testing WordPress Core Updates

Review our [Testing WordPress Core Development Versions](/wordpress-development-versions) doc to test development versions of WordPress by pushing updates through the WordPress Dashboard or via Git.

## Environment Specific Configuration for WordPress Sites

Review our [Environment Specific Configuration for WordPress Sites](/guides/environment-configuration/environment-specific-config) doc to learn how to turn WordPress site plugins on and off for each environment. This doc also shows you how to use the same codebase with different settings for each environment, using values for the [PANTHEON_ENVIRONMENT variable](/guides/environment-configuration/read-environment-config).

## Local Development

Read our [Local Development](/local-development) doc to learn about developing locally, including the ability to perform critical development tasks, such as editing files and code, and pushing changes to Pantheon right from your desktop.

## Manage Custom Code in WordPress with Plugins

Review our [Managing Custom Code for WordPress with Plugins](/wordpress-custom-code) doc to learn how to manage custom plugins or themes for WordPress sites using GitHub Updater or WP Pusher.

## AWS S3 Setup for WordPress

Amazon Web Services (AWS) offers Simple Storage Service (S3) for scalable storage and content distribution, which can be integrated with sites running on Pantheon. Pantheon already offers content distribution through the [Global CDN](/guides/global-cdn), but S3 is a good option for addressing issues with [highly populated directories](/guides/platform-considerations/files-directories#highly-populated-directories) or serving [large files](/guides/platform-considerations/files-directories#large-files).

## WordPress and PHP Sessions

WordPress Core [does not use sessions](https://wordpress.org/support/topic/how-does-wordpress-handle-sessions-and-session-variables/?replies=7) by design. Every "user state" is managed via cookies. However, some plugins or themes will use `session_start()` or PHP's `$_SESSION` superglobal. On Pantheon, support for sessions requires the WordPress Native PHP Sessions plugin which we maintain. Sites that need to utilize PHP Sessions should install this plugin. Review [WordPress and PHP Sessions](/guides/php/wordpress-sessions) for more information about working with PHP Sessions in WordPress.

## Configure PhpStorm to Create WordPress Plugins on Pantheon

Review our [Configuring PhpStorm to Create WordPress Plugins on Pantheon](/wordpress-phpstorm) doc to learn about [JetBrains PhpStorm](https://www.jetbrains.com/phpstorm/), a commercial PHP IDE that can be configured to work with WordPress sites, allowing users to easily build and maintain custom plugins. This doc will set you up with a local environment in PhpStorm to create your custom plugins and themes.
