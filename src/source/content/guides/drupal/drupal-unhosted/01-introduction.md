---
title: Migrate a Drupal Site from Another Platform
subtitle: Introduction
description: "Migrate an existing non-Pantheon hosted Drupal site to Pantheon"
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
showtoc: true
permalink: docs/guides/drupal-unhosted
editpath: drupal/drupal-unhosted/01-introduction.md
reviewed: "2022-12-13"
contenttype: [guide]
innav: [true]
categories: [migrate, overview]
cms: [drupal9, drupal, drupal10, drupal8]
audience: [development]
product: [--]
integration: [--]
---

This guide will show you how to migrate an existing non-Pantheon hosted Drupal site to Pantheon's platform.

|  Current Host | How Site Was Created <Popover title="Site Creation" content="What is the method you used to create the site?" /> |  Additional Requirements <Popover title="Additional Requirements" content="Any other features that must be in place, or that are desired." /> |
| :-------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                   Elsewhere                   |                                                                     n/a                                                                      |                                                                                             --                                                                                             |

<Partial file="drupal/see-landing.md" />

<Partial file="drupal/commit-history.md" />

## Requirements

Confirm that you meet the following requirements before continuing:

- Your site is based on the [drupal/legacy-project](https://github.com/drupal/legacy-project/blob/9.1.x/composer.json) template or a similar non-composer managed structure.

- You are able to run `drush` commands in the existing site.

- You are able to check out your existing site codebase in your local machine.

- The site does not use another package and library manager, like [Ludwig](https://www.drupal.org/project/ludwig).

- You have a brand new Drupal Pantheon site to host your project.

## More Resources

- [Composer Fundamentals and Workflows](/guides/composer)
