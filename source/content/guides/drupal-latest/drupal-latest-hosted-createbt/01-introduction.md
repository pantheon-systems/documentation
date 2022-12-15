---
title: Migrate a Site That Was Created with Build Tools to Drupal:latest
subtitle: Introduction
description: Learn how to migrate a Drupal 8 Site to Drupal:latest
cms: "Drupal:latest"
tags: [code, launch, migrate, site, updates, D8, D9, D10]
contributors: [wordsmither]
layout: guide
showtoc: true
permalink: docs/guides/drupal-latest-hosted-createbt
anchorid: drupal-latest-hosted-createbt
editpath: drupal-latest/drupal-latest-hosted-createbt/01-introduction.md
reviewed: "2022-12-12"
contenttype: [guide]
categories: [migrate]
newcms: [drupal, drupal9, drupal10]
audience: [development]
product: [integrated-composer]
integration: [--]
---

This guide will show you how to migrate a site that meets the following criteria to drupal:latest:

| <i class="fa fa-cloud"></i><br/> Current Host | <i class="fa fa-wrench"></i><br/> How Site Was Created <Popover title="Site Creation" content="What is the method you used to create the site?" /> | <i class="fa fa-exclamation-circle"></i><br/> Additional Requirements <Popover title="Additional Requirements" content="Any other features that must be in place, or that are desired." /> |
|:---------------------------------------------:|:--------------------------------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
|                   Pantheon                    |                                                                    Build Tools                                                                     |                                                                                             --                                                                                             |

<Partial file="drupal-latest/see-landing.md" />

Build Tools connects Pantheon with your CI service and external Git provider. See the [Build Tools Guide](/guides/build-tools#a-build-tools-projects-components) for details on supported Git and CI services combinations.

## Requirements

Before you continue, confirm that your site meets the following criteria:

1. Code is managed using an external repository outside of Pantheon (GitHub, GitLab, Bitbucket, etc.).

1. The site is built through a service like Circle CI.

1. Build artifacts are pushed to your Pantheon repository.

## More Resources

- [Integrated Composer Overview](/guides/integrated-composer)
- [Composer Fundamentals and WebOps Workflows](/guides/composer)
- [Pantheon YAML Configuration Files](/pantheon-yml)
