---
title: Drupal CMS on Pantheon
description: Learn about installing and managing Drupal CMS sites on Pantheon.
tags: [site, D11]
permalink: docs/drupal-cms
contributors: [alexmoreno, stevector]
contenttype: [doc]
innav: [true]
categories: [create]
cms: [drupal]
audience: [development]
product: [dashboard, terminus]
integration: [--]
reviewed: "2024-02-10"
---

# Drupal CMS

todo, write intro

## Installing Drupal CMS on Pantheon

todo todo

## Applying Recipes from Drupal CMS to existing sites

todo todo

## Troubleshooting common issues with Drupal CMS

Drupal CMS is a moving target (write more)

### Slow recipe installation and timeouts

todo, describe and create issue.

### Project Browser and file system writablility

Project Browser in Drupal requires version-controlled files and directories to be writable in order to install new modules and recipes.
On Pantheon sites, Test and Live environments are locked down for security purposes, and therefore not writable.
This means that Project Browser can only be used in the Dev and Multidev environments when those environments are in SFTP mode.

After using Project Browser to install modules, you must commit and push the changes to your codebase in order to deploy them to Test and Live. (todo, link to docs on how to export config and commit changes)

### Project Browser and Pantheon-provided Composer scripts

https://github.com/pantheon-systems/documentation/issues/9420


