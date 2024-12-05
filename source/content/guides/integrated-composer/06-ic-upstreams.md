---
title: Integrated Composer
subtitle: Custom Upstream Usage
description: Learn how to use an Upstream with Integrated Composer.
tags: [composer, workflow]
contributors: [ari, edwardangert, jazzsequence]
reviewed: "2024-10-15"
showtoc: true
permalink: docs/guides/integrated-composer/ic-upstreams
contenttype: [guide]
innav: [false]
categories: [dependencies]
cms: [drupal, wordpress]
audience: [development]
product: [composer]
integration: [--]
---

This section provides usage and maintanenance information for composer-managed [Custom Upstreams](/guides/custom-upstream) on Pantheon, including steps to add upstream dependencies.


## Custom Upstreams

An Upstream refers to the source code in Git that shares a Git history with "downstream" individual sites made from it. Upstreams includes the core code for [Drupal](https://github.com/pantheon-upstreams/drupal-composer-managed), [WordPress](https://github.com/pantheon-upstreams/wordpress-composer-managed), and some customizations for the Pantheon platform.

### Create Your Integrated Composer Custom Upstream

Follow the steps to [Create a Custom Upstream](/guides/custom-upstream/create-custom-upstream/) to create and connect a new integrated composer custom upstream. 

### Custom Upstream and Site Structure

<Partial file="ic-upstream-structure.md" />

<Partial file="upstream-management-dependencies.md" />

## Maintain Your Integrated Composer Custom Upstream

 There are some special considerations to keep in mind if you intend to make modifications to your upstream based on this repository.

1. Increase the version number listed in the `upstream-configuration/composer.json` file each time you make edits.
    - Composer checks the contents of the root `/composer.json` file for changes that should be pushed to your upstream configuration.

1. Verify your changes to the `upstream-configuration/composer.json` file by running `composer install` or `composer update` in the `upstream-configuration` directory.
    - Be careful not to rely on ["root-only" properties of composer.json](https://getcomposer.org/doc/04-schema.md).

## More Resources

- [Custom Upstreams](/guides/custom-upstream)
- [Autopilot for Custom Upstreams](/guides/autopilot-custom-upstream)
- [Migrate a Custom Upstream to Drupal](/guides/drupal-hosted-createcustom)
- [Pantheon YAML Configuration Files](/pantheon-yml)
- [Best Practices for Maintaining Custom Upstreams](/guides/custom-upstream/maintain-custom-upstream)
- [Composer Fundamentals and WebOps Workflows](/guides/composer)
- [Create a Composer-managed WordPress Site with Bedrock](/guides/wordpress-composer/wordpress-composer-managed)
