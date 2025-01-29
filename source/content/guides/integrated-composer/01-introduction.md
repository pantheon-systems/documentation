---
title: Integrated Composer
subtitle: Introduction
description: Learn how to use Integrated Composer.
tags: [composer, workflow]
contributors: [ari, edwardangert, jazzsequence]
reviewed: "2024-10-15"
showtoc: true
permalink: docs/guides/integrated-composer
contenttype: [guide]
innav: [true]
categories: [dependencies]
cms: [drupal, wordpress]
audience: [development]
product: [composer]
integration: [--]
---

[Composer](https://getcomposer.org/) is a widely-used dependency and package manager for PHP. Composer provides an easy way to manage packages used by a WordPress site. Packages can be WordPress plugins, Drupal modules, themes, other PHP libraries and even the core CMS itself.

At the most basic level, Composer requires:

- A list of dependencies
- A place to put the dependencies

Understanding how Composer can be used independent of Drupal or WordPress is a good place to learn more about the general concepts. For a summary of basic usage, see [Composer's own documentation](https://getcomposer.org/doc/01-basic-usage.md).

**Integrated Composer** is a Pantheon platform feature that extends Composer  functionality to WordPress and Drupal's core files, and treats them as a managed dependency. Integrated Composer enables one-click updates from the Dashboard for upstream updates and Composer dependencies on your Composer-managed Pantheon site.

## Get Started With Integrated Composer

### Drupal with Integrated Composer

- Follow the steps to [Create a new Composer-managed CMS site](/guides/integrated-composer/create) to add a new Drupal site with Integrated Composer built in.

- To upgrade or migrate an existing site to Drupal with Integrated Composer, visit the [Migrate to Drupal](/drupal-migration) guide.

- To convert an existing Drupal site to a Composer-managed site with Integrated Composer, visit the [Composer Convert](/guides/composer-convert) doc.


<Alert title="Note"  type="info" >

[`drupal-composer-managed`](https://github.com/pantheon-upstreams/drupal-composer-managed) is the recommended Composer-based Drupal upstream. The following Composer-based Drupal upstreams have been deprecated:

- `drupal-project`
- `drupal-recommended`

You can use the [Terminus Conversion Tools Plugin](https://github.com/pantheon-systems/terminus-conversion-tools-plugin) if you want to convert your site from one of the deprecated upstreams to the supported `drupal-composer-managed` upstream.

</Alert>

### WordPress with Integrated Composer
- Follow the steps to [Create a new Composer-managed CMS site](/guides/integrated-composer/create) to add a new WordPress site with Integrated Composer built in.

- To upgrade or migrate an existing Composer-managed WordPress site to Pantheon with Integrated Composer, please reach out to our [Professional Services](https://pantheon.io/professional-services) team for information on site migration services.

<Alert title="Note" type="info">

[`wordpress-composer-managed`](https://github.com/pantheon-systems/wordpress-composer-managed) is the recommended Composer-based WordPress upstream. The following Composer-based WordPress upstreams have been deprecated:

- `wordpress-composer`
- `example-wordpress-composer`
- `wordpress-project`

</Alert>

## Dependencies

Composer encourages a mental model where code not written specifically for a given project is a dependency. Only files unique to the project are tracked as part of the project's main source repository, also referred to as the canonical site repository. Dependencies for WordPress and Drupal include core, plugins, contrib modules, themes, and libraries. A single dependency, such as a theme, is referred to as a package. Review [Composer `require` and `require dev` Sections](/guides/integrated-composer/dependencies#composer-require-and-require-dev-sections) for more information on how these sections are on used on the Pantheon platform.

Composer looks within [The PHP Package Repository](https://packagist.org/) for dependencies to install, which does not include Drupal or WordPress packages by default. Additional repositories must be configured for Composer to use packages not found in the default repository. Each framework provides its own respective package repository so dependencies can be managed with Composer:

- WordPress: <https://wpackagist.org>
- Drupal: `https://packages.drupal.org/8`

## Managing Core as a Project Dependency

Integrated Composer sites use the [nested docroot](/nested-docroot) feature, which allows core to be installed within the `web` subdirectory instead of the default root directory of the site's codebase. A nested docroot is the simplest path towards reliable core updates in a Composer workflow. This is done on Pantheon by specifying `web_docroot: true` in the Pantheon configuration file.

When using a Pantheon-maintained upstream for an Integrated Composer site(either [Drupal](https://github.com/pantheon-upstreams/drupal-composer-managed) or [WordPress](https://github.com/pantheon-systems/wordpress-composer-managed)), the nested docroot setting is already configured in the `pantheon.upstream.yml` file.