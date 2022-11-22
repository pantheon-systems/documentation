---
title: Migrate a Drupal 9 Site from Another Platform
subtitle: Introduction
description: "Migrate an existing non-Pantheon hosted Drupal 9 site to Pantheon"
cms: "Drupal 9"
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-unhosted
anchorid: drupal-9-unhosted
editpath: drupal-9/drupal-9-unhosted/01-introduction.md
reviewed: "2021-05-13"
contenttype: guide
categories: [migrate, overview]
newcms: [drupal9]
audience: [development]
product: [--]
integration: [--]
---

This guide will show you how to migrate an existing non-Pantheon hosted Drupal 9 site to Pantheon's platform.

| <i class="fa fa-cloud"></i><br/> Current Host | <i class="fa fa-wrench"></i><br/> How Site Was Created <Popover title="Site Creation" content="What is the method you used to create the site?" /> | <i class="fa fa-exclamation-circle"></i><br/> Additional Requirements <Popover title="Additional Requirements" content="Any other features that must be in place, or that are desired." /> |
|:---------------------------------------------:|:--------------------------------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
|                   Elsewhere                   |                                                                        n/a                                                                         |                                                                                             --                                                                                             |

<Partial file="drupal-9/see-landing.md" />

<Partial file="drupal-9/commit-history.md" />

## Requirements

Confirm that you meet the following requirements before continuing:

- Your site is based on the [drupal/legacy-project](https://github.com/drupal/legacy-project/blob/9.1.x/composer.json) template or a similar non-composer managed structure.

- You are able to run `drush` commands in the existing site.

- You are able to check out your existing site codebase in your local machine.

- The site does not use another package and library manager, like [Ludwig](https://www.drupal.org/project/ludwig).

- You have a brand new Drupal Pantheon site to host your project.

## More Resources

- [Composer Fundamentals and Workflows](/guides/composer)
