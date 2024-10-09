---
title: Integrated Composer
subtitle: Introduction
description: Learn how to use Integrated Composer.
tags: [composer, workflow]
contributors: [ari, edwardangert, jazzsequence]
reviewed: "2024-09-24"
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

- Follow the [Drupal on Pantheon](/drupal) doc to create a new Drupal site with Integrated Composer built in.

- To upgrade or migrate an existing site to Drupal with Integrated Composer, visit the [Migrate to Drupal](/drupal-migration) guide.

- To convert an existing Drupal site to a Composer-managed site with Integrated Composer, visit the [Composer Convert](/guides/composer-convert) doc.


<Alert title="Note"  type="info" >

`drupal-composer-managed` is the recommended Composer-based Drupal upstream. The Composer-based Drupal upstreams below have been deprecated.

- `drupal-project`
- `drupal-recommended`

You can use the [Terminus Conversion Tools Plugin](https://github.com/pantheon-systems/terminus-conversion-tools-plugin) if you want to convert your site from one of the deprecated upstreams to the supported `drupal-composer-managed` upstream.

</Alert>

### WordPress with Integrated Composer

- Follow the [WordPress (Composer Managed)](/guides/wordpress-composer/wordpress-composer-managed) doc to create a new WordPress site with Integrated Composer built in.

- To upgrade or migrate an existing Composer-managed WordPress site to Pantheon with Integrated Composer, please reach out to our [Professional Services](https://pantheon.io/professional-services) team for information on site migration services.

<Alert title="Note" type="info">

[WordPress (Composer Managed)](https://github.com/pantheon-systems/wordpress-composer-managed) is the recommended Composer-based WordPress upstream. The Composer-based WordPress upstreams below have been deprecated.

- `wordpress-composer`
- `example-wordpress-composer`
- `wordpress-project`

</Alert>

## Dependencies

Composer encourages a mental model where code not written specifically for a given project is a dependency. Only files unique to the project are tracked as part of the project's main source repository, also referred to as the canonical site repository. Dependencies for WordPress and Drupal include core, plugins, contrib modules, themes, and libraries. A single dependency, such as a theme, is referred to as a package. Review [Composer `require` and `require dev` Sections](/guides/integrated-composer/dependencies#composer-require-dev-and-require-sections) for more information on how these sections are on used on the Pantheon platform.

Composer looks within [The PHP Package Repository](https://packagist.org/) for dependencies to install, which does not include Drupal or WordPress packages by default. Additional repositories must be configured for Composer to use packages not found in the default repository. Each framework provides its own respective package repository so dependencies can be managed with Composer:

- WordPress: <https://wpackagist.org>
- Drupal (Latest Version): `https://packages.drupal.org/11`
- Drupal 7: `https://packages.drupal.org/7`

## Managing Core as a Project Dependency

Sites managed with Composer should use the [nested docroot](/nested-docroot) feature, which allows core to be installed within the `web` subdirectory instead of the default root directory of the site's codebase. A nested docroot is the simplest path towards reliable core updates in a Composer workflow.

This is possible on Pantheon by specifying `web_docroot: true` in `pantheon.yml` file. For details, see [Serving Sites from the Web Subdirectory](/nested-docroot).

When using a Pantheon-maintained upstream (either Drupal or WordPress Composer Managed), the nested docroot setting is already configured in the `pantheon.yml` file.

## Next Steps

Here are some ways to get started using Composer for your Pantheon sites:

- Create a new [Drupal with Integrated Composer](/drupal) or [WordPress (Composer Managed](/guides/wordpress-composer/wordpress-composer-managed) site.
- [Migrate or upgrade](/drupal-migration) an existing Drupal site to the latest version of Drupal with Integrated Composer.
- [Convert a Standard Drupal Site to a Composer Managed Site](/guides/composer-convert).
- Follow the [Build Tools Guide](/guides/build-tools) to learn best practices for Composer-managed sites with continuous integration (CI) workflows.
- Review [Composer's documentation](https://getcomposer.org/doc/) to understand how Composer can be used independently of WordPress or Drupal.
- Learn about [Roots Bedrock](https://roots.io/bedrock/), the foundation of the WordPress Composer Managed upstream.

### Partial Adoption

If you're not ready to go all in with a Composer workflow and you want to see how it works on a smaller scale, follow the [Manage Some Dependencies with Composer](/guides/partial-composer) guide to get started.

<Partial file="notes/partial-composer-adoption-warning.md" />

## More Resources

- [Convert a Standard Drupal Site to a Composer-Managed Site](/guides/composer-convert)
- [WordPress on Pantheon Quick Start Guide](/guides/wordpress-pantheon/)
- [WordPress with Composer on Pantheon](/guides/wordpress-composer/wordpress-composer-managed)
- [Supported Drupal Versions](/supported-drupal)
- [Drupal](/drupal)
