---
title: Integrated Composer
subtitle: Use an Upstream with Integrated Composer
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

This section provides information on how to use an Upstream with Integrated Composer, including steps to add dependencies to your Upstream.


## Upstreams

An Upstream refers to the source code in Git that shares a Git history with "downstream" individual sites made from it. Upstreams includes the core code for [Drupal](https://github.com/pantheon-upstreams/drupal-composer-managed), [WordPress](https://github.com/pantheon-upstreams/wordpress-composer-managed), and some customizations for the Pantheon platform.

### Upstream and Site Structure

<Partial file="ic-upstream-structure.md" />

<Partial file="upstream-management-dependencies.md" />

## Create Your Integrated Composer Custom Upstream

Follow the steps in this section to create a custom upstream that uses Integrated Composer.

1. Fork the Pantheon-maintained [WordPress (Composer Managed)](https://github.com/pantheon-upstreams/wordpress-composer-managed) or [Drupal Composer Managed](https://github.com/pantheon-upstreams/drupal-composer-managed) upstream repository.

1. [Connect your repository](/guides/custom-upstream/create-custom-upstream#connect-repository-to-pantheon) to Pantheon.

1. Update the **require** section of the root `/composer.json` file to match the name you chose in the preceding step.

## Add and Remove Packages

1. Use `composer require`in the `upstream-configuration` directory (or `composer upstream-require` if using `upstream-management`) to edit the upstream `composer.json` file.
    - The WordPress (Composer Managed) repository places a theme in the upstream `composer.json` file. This works well for downstream sites that all use the same theme. You should remove themes from the upstream `composer.json` file if you do not intend to use the upstream to lock downstream sites into a particular theme. You cannot remove installed packages from downstream sites if the packages were included from the upstream site.

## Maintain Your Integrated Composer Fork

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
