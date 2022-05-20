---
title: WordPress with Integrated Composer on Pantheon
subtitle: Use Integrated Composer with WordPress 
description: Learn how to use Integrated Composer with WordPress on Pantheon.
categories: [develop]
tags: [wordpress]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/wordpress-composer/wordpress-ic
anchorid: wordpress-ic
---

[Integrated Composer](/guides/integrated-composer) is a Pantheon platform feature that extends Composer functionality to WordPress core files, and treats them as a managed dependency. Integrated Composer lets you deploy your site on Pantheon with one-click updates for both upstream commits and Composer dependencies, while still receiving upstream updates.

## Create a New WordPress with Integrated Composer on the Pantheon Platform

The instructions in this section require forking Pantheon's [Composer-enabled WordPress Upstream](https://github.com/pantheon-upstreams/wordpress-project) repository. This is the recommended starting point for forking new upstreams that work with Pantheon's Integrated Composer build process.

This repository is still under active development, and you should not create permanent/production sites from it. There is no guarantee of backwards compatibility. 

Pantheon upstreams influence the Composer packages that are included in downstream sites by including two `composer.json` files in this repository:

- The root `/composer.json` is owned by the downstream site. Upstream maintainers should avoid editing this file. This allows the downstream site maintainer to adjust the `/composer.json` file without creating potential conflicts when merging upstream updates.

- The `upstream-config/composer.json` is owned by the upstream maintainer. It is included by the root `composer.json`, and allows upstreams to add or remove packages from downstream sites. Changes are automatically incorporated into the downstream site whenever upstream updates are applied.

Follow the steps below to create a new WordPress site using Integrated Composer and Upstream.

1. Fork the [Pantheon-maintained repository](https://github.com/pantheon-upstreams/wordpress-project).

1. [Connect your repository](/docs/create-custom-upstream#connect-repository-to-pantheon) to Pantheon.

1. Edit the vendor name used in the upstream-config

    - Pantheon ships the `upstream-config/composer.json` file with the line `name: pantheon-upstreams/upstream-config`. You should change `pantheon-upstreams` to your own project's name. 

1. Update the root `/composer.json` file's `require` section to match the name you chose in the preceding step.

## Add and Remove Packages

1. Use `composer require`in the `upstream-config` directory to edit the upstream `composer.json`.

    - The repository template places a theme in the upstream `composer.json`. This works well for downstream sites that all use the same theme. You should remove themes from the upstream `composer.json` file if you do not intend to use the upstream to lock downstream sites into a particular theme. You cannot remove installed packages from downstream sites if the packages were included from the upstream site. 

## Maintain Your Integrated Composer Fork

 There are some special considerations to keep in mind if you intend to make modifications to your upstream based on this repository.

1. Increment the version number listed in the `upstream-config/composer.json` if you edit the file.

    - Depending on the contents of the root /composer.json, this is sometimes necessary for Composer to detect the changes to your upstream configuration.

1. Check your changes to the `upstream-config/composer.json` file by running `composer install` or `composer update` in the `upstream-config` directory. 

    - Be careful not to rely on ["root-only" properties of composer.json](https://getcomposer.org/doc/04-schema.md).

## Manage Your WordPress Integrated Composer Site

1. Review the [Integrated Composer Guide](/guides/integrated-composer) for information on how to:

    - [Manage Core as a Project Dependency](/guides/composer#managing-core-as-a-project-dependency)

    - [Serve Sites from the Web Subdirectory](/nested-docroot)

    - [Add a Dependency to an Individual Site](/guides/integrated-composer#add-a-dependency-to-an-individual-site)

    - [Add a Package from a Private Repository](/guides/integrated-composer#add-a-package-from-a-private-repository)

    - [Apply One-click Updates](/guides/integrated-composer#apply-one-click-updates)

    - Learn about [Upstream](/guides/integrated-composer#upstream) and how to [add dependencies to your Upstream](/guides/integrated-composer#how-to-add-dependencies-to-your-upstream)

1. Review the [Custom Upstreams](/maintain-custom-upstream) documentation to learn how to:

    - [Test and Release Pantheon Core Updates](/maintain-custom-upstream#test-and-release-pantheon-core-updates)

    - [Automatically Resolve Conflicts from the Command Line](/maintain-custom-upstream#automatically-resolve-from-the-command-line)

    - [Tips and Tricks for Maintaining Custom Upstreams](/maintain-custom-upstream#delete-custom-upstream)

    - [Delete a Custom Upstream](/maintain-custom-upstream#delete-custom-upstream)

1. Review the [Pantheon YAML Configuration Files](/pantheon-yml) documentation to learn about:

    - [Custom Upstream Configurations](/pantheon-yml#custom-upstream-configurations)


## See Also

- [Best Practices for Maintaining Custom Upstreams](/maintain-custom-upstream) 

- [Pantheon YAML Configuration Files](/pantheon-yml)

- [Composer Fundamentals and WebOps Workflows](/guides/composer)