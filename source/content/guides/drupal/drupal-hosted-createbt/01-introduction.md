---
title: Upgrade a Site That Was Created with Build Tools to the Latest Version of Drupal
subtitle: Introduction
description: Learn how to update a Drupal site to the latest version of Drupal
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
showtoc: true
permalink: docs/guides/drupal-hosted-createbt
editpath: drupal/drupal-hosted-createbt/01-introduction.md
reviewed: "2022-12-12"
contenttype: [guide]
innav: [true]
categories: [update]
cms: [drupal, drupal9, drupal10]
audience: [development]
product: [integrated-composer]
integration: [--]
---

This guide will show you how to migrate a site that meets the following criteria to the latest version of Drupal:

| Current Host | How Site Was Created <Popover title="Site Creation" content="What is the method you used to create the site?" /> |  Additional Requirements <Popover title="Additional Requirements" content="Any other features that must be in place, or that are desired." /> |
| :-------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                   Pantheon                    |                                                                 Build Tools                                                                  |                                                                                             --                                                                                             |

<Partial file="drupal/see-landing.md" />

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
