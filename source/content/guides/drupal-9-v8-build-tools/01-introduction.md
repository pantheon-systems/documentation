---
title: Migrate from a Build tools Managed Drupal 8 Site to Drupal 9
subtitle: Introduction
description: Learn how to migrate a Drupal 8 Site to Drupal 9
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
reviewed: "2021-03-31"
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-v8-build-tools
anchorid: drupal-9-v8-build-tools
editpath: drupal-9-v8-build-tools/01-introduction.md
---

This guide will show you how to migrate a site that meets the following criteria to Drupal 9:

|Criteria|Value
|---|---
|Pantheon Hosted| Yes
|Drupal Version| 8
|Multi-Dev Environment | No
|Build Tools| Yes
|Composer Managed| No
|Custom Upstream| No


<Alert title="About Build Tools" type="info" icon="info-sign">

Build Tools connects Pantheon with your CI service and external Git provider. See the [Build Tools Guide](/guides/build-tools#a-build-tools-projects-components) for details on supported Git and CI services combinations.

</Alert>

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