---
title: Environment Configuration
subtitle: Environment Configuration on Pantheon
description: Learn how to implement an environment indicator for Drupal and WordPress sites running on Pantheon.
categories: [develop]
tags: [site, terminus, workflow, webops]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/environment-configuration
anchorid: environment-configuration
---

Each site on Pantheon comes with three environments: Dev, Test, and Live. This allows you to develop and test features without impacting the live site. Additional development environments are available with [Multidev](/guides/multidev). Refer to the [Pantheon WebOps Workflow](/pantheon-workflow) documentation for more details.

The separation of configuration and code also helps improve security and makes it easy to restore an individual environment to a backup version.

This guide shows you how to:

- Use database credentials for [Object Cache](/object-cache)(Redis) authentication

- Install an indicator to receive updates on your Pantheon site and environments

- Restore an environment

- Configure WordPress-specific environments and Drupal 9-specific environments

## More Resources

- [Configuration Management](/pantheon-workflow#configuration-management)

- [Content Staging](/content-staging)

