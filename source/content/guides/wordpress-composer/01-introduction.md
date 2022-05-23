---
title: WordPress with Composer on Pantheon
subtitle: Introduction
description: Learn more about using WordPress with Composer on Pantheon.
categories: [develop]
tags: [wordpress]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/wordpress-composer
anchorid: wordpress-composer
---

[Composer](https://getcomposer.org/) is a widely-used PHP dependency and package manager that provides a modern way to manage the external (non-core) code used by a WordPress site.

At the most basic level, Composer requires:

- A list of dependencies
- A place to put the dependencies

There are different cases for using Composer to manage dependencies in WordPress, including:

- Manage dependencies for themes and plugins you’re currently developing

- Manage the themes and plugins currently used on the site

- Total site dependency management, including custom code


## First Steps

Complete the steps below before using this guide to create or manage updates on your Pantheon Composer-managed WordPress site.

<Alert title="Note for WordPress Composer Sites"  type="info" >

Please reach out to our [Professional Services](https://pantheon.io/professional-services) team for information on site migration services if you have an existing Composer-managed WordPress site that you would like to migrate to the Pantheon platform.

</Alert>

1. Review [Composer's own documentation](https://getcomposer.org/doc/) to understand how Composer can be used independently of WordPress.

1. Review [Composer Fundamentals Dependencies](/guides/composer#dependencies).

1. Review [Managing Core as Project Dependency](/guides/composer#managing-core-as-a-project-dependency).

1. Review [Custom Upstream Workflow](/guides/composer#custom-upstream-workflow).

## See Also

- [Composer Fundamentals and WebOps Workflows](/guides/composer)

- [Convert a Standard Drupal 8 Site to a Composer-Managed Site](/guides/composer-convert)