---
title: Migrate a Site That Was Created with Build Tools to Drupal 9
subtitle: Introduction
description: Learn how to migrate a Drupal 8 Site to Drupal 9
cms: "Drupal 9"
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
reviewed: "2021-03-31"
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-hosted-createbt
anchorid: drupal-9-hosted-createbt
editpath: drupal-9/drupal-9-hosted-createbt/01-introduction.md
---

This guide will show you how to migrate a site that meets the following criteria to Drupal 9:

|Criteria|Value
|---|---
|**Pantheon Hosted**| **Yes**
|**Site created using**:| **Build Tools**
|Multi-Dev Environment | n/a
|Build Tools Workflow Needed | n/a
|Drupal version set to 8| n/a
|Site created before November 2021| n/a

Build Tools connects Pantheon with your CI service and external Git provider. See the [Build Tools Guide](/guides/build-tools#a-build-tools-projects-components) for details on supported Git and CI services combinations.


## Requirements

Before you continue, confirm that your site meets the following criteria:

1. Code is managed using an external repository outside of Pantheon (GitHub, GitLab, Bitbucket, etc.).

1. The site is built through a service like Circle CI.

1. Build artifacts are pushed to your Pantheon repository.

## Custom Module Code

Custom module code is outside the scope of this document. See [drupal.org](https://www.drupal.org/docs/creating-custom-modules) for getting your custom code updated with the new version numbers and any code deprecations.

## See Also

- [Integrated Composer Overview](/guides/integrated-composer)
- [Composer Fundamentals and WebOps Workflows](/guides/composer)
- [Pantheon YAML Configuration Files](/pantheon-yml)