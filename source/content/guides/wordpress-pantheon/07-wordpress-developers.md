---
title: WordPress on Pantheon Guide
subtitle: WordPress on Pantheon for Developers
description: Develop efficiently with WordPress on Pantheon.
categories: [wordpress]
tags: [wordpress, webops]
contributors: [whitneymeredith]
reviewed: "2022-05-05"
layout: guide
permalink: docs/guides/wordpress-pantheon/wordpress-developers
anchorid: wordpress-pantheon/wordpress-developers
---

Review the resources in this section for on developing your WordPress Pantheon site efficiently.

## Create a WordPress Site from the Command Line with Terminus and WP-CLI

View our [WordPress Command Line](/guides/wordpress-commandline) guide for steps to create and develop your WordPress site using your command line interface and WP-CLI. 

## Run WordPress as a Backend API

Pantheon supports [running WordPress as an API](/headless) (Application Programming Interface) for the backend of headless sites, which enables the CMS to interact with external frontend applications over HTTP requests.

## WordPress on Pantheon Developer Best Practices

Review our [WordPress Best Practices](/wordpress-best-practices) doc for suggestions, tips, and best practices for developing and managing WordPress sites on the Pantheon platform.

## Environment Specific Configuration for WordPress Sites

Review our [Environment Specific Configuration for WordPress Sites](/environment-specific-config) doc to learn how to turn WordPress site plugins on and off based on the environment they are running on. This doc also shows you how to use the same codebase with different settings for each environment, using values for the [PANTHEON_ENVIRONMENT variable](/read-environment-config).

## AWS S3 Setup for WordPress

Amazon Web Services (AWS) offers Simple Storage Service (S3) for scalable storage and content distribution, which can be integrated with sites running on Pantheon. Pantheon already offers content distribution through the [Global CDN](/global-cdn), but S3 is a good option for addressing issues with [highly populated directories](/docs/platform-considerations#highly-populated-directories) or serving [large files](/platform-considerations#large-files).

## WordPress and PHP Sessions

WordPress Core [does not use sessions](https://wordpress.org/support/topic/how-does-wordpress-handle-sessions-and-session-variables/?replies=7) by design. All "user state" is managed via cookies. However, some plugins or themes will use `session_start()` or PHP's `$_SESSION` superglobal. On Pantheon, support for sessions requires the WordPress Native PHP Sessions plugin which we maintain. Sites that need to utilize PHP Sessions should install this plugin. Review our [WordPress and PHP Sessions](/wordpress-sessions) doc for more information about working with PHP Sessions in WordPress.