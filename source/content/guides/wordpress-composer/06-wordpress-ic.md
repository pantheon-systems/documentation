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

[Integrated Composer](/guides/integrated-composer) is a Pantheon platform feature. Integrated Composer extends Composer functionality to WordPress core files and treats them as a managed dependency. Integrated Composer lets you deploy your site on Pantheon with one-click updates for both upstream commits and Composer dependencies, while still receiving upstream updates.

## WordPress with Integrated Composer on Pantheon 

Pantheon maintains a [Composer-enabled WordPress Upstream](https://github.com/pantheon-upstreams/wordpress-project) repository. This is the recommended starting point for forking new upstreams that work with Pantheon's Integrated Composer build process.

This repository is still under active development, and you should not create permanent/production sites from it. There is no guarantee of backwards compatibility. 

Pantheon upstreams influence the Composer packages that are included in downstream sites by including two `composer.json` files in this repository:

- The root `/composer.json` file is owned by the downstream site. Upstream maintainers should avoid editing this file. This allows the downstream site maintainer to adjust the `/composer.json` file without creating potential conflicts when merging upstream updates.

- The `upstream-config/composer.json` file is owned by the upstream maintainer. It is included by the root `composer.json` file, and allows upstreams to add or remove packages from downstream sites. Changes are automatically incorporated into the downstream site whenever upstream updates are applied.

## Create Your WordPress Integrated Composer Site

Follow the steps in this section to create a new WordPress site using Integrated Composer and Upstream.

1. Fork the [Pantheon-maintained WordPress Upstream repository](https://github.com/pantheon-upstreams/wordpress-project).

1. [Connect your repository](/create-custom-upstream#connect-repository-to-pantheon) to Pantheon.

1. Update the `require` section of the root `/composer.json` file to match the name you chose in the preceding step.

## Add and Remove Packages

1. Use `composer require`in the `upstream-config` directory to edit the upstream `composer.json` file.

    - The repository template places a theme in the upstream `composer.json` file. This works well for downstream sites that all use the same theme. You should remove themes from the upstream `composer.json` file if you do not intend to use the upstream to lock downstream sites into a particular theme. You cannot remove installed packages from downstream sites if the packages were included from the upstream site. 

## Maintain Your Integrated Composer Fork

 There are some special considerations to keep in mind if you intend to make modifications to your upstream based on this repository.

1. Increase the version number listed in the `upstream-config/composer.json` file each time you make edits.

    - Composer checks the contents of the root `/composer.json` file for changes that should be pushed to your upstream configuration. 

1. Verify your changes to the `upstream-config/composer.json` file by running `composer install` or `composer update` in the `upstream-config` directory. 

    - Be careful not to rely on ["root-only" properties of composer.json](https://getcomposer.org/doc/04-schema.md).

## Manage Your WordPress Integrated Composer Site

1. Review the [Integrated Composer Guide](/guides/integrated-composer) for information on how to:

    - [Manage Core as a Project Dependency](/guides/composer#managing-core-as-a-project-dependency)

    - [Serve Sites from the Web Subdirectory](/nested-docroot)

    - [Add a Dependency to an Individual Site](/guides/integrated-composer#add-a-dependency-to-an-individual-site)

    - [Add a Package from a Private Repository](/guides/integrated-composer#add-a-package-from-a-private-repository)

    - [Apply One-click Updates](/guides/integrated-composer#apply-one-click-updates)

    - [Add dependencies to your Upstream](/guides/integrated-composer#how-to-add-dependencies-to-your-upstream)

1. Review the [Custom Upstreams](/maintain-custom-upstream) documentation to learn how to:

    - [Test and Release Pantheon Core Updates](/maintain-custom-upstream#test-and-release-pantheon-core-updates)

    - [Automatically Resolve Conflicts from the Command Line](/maintain-custom-upstream#automatically-resolve-from-the-command-line)

    - [Tips and Tricks for Maintaining Custom Upstreams](/maintain-custom-upstream#delete-custom-upstream)

    - [Delete a Custom Upstream](/maintain-custom-upstream#delete-custom-upstream)

1. Review the [Pantheon YAML Configuration Files](/pantheon-yml) documentation to learn about:

    - [Custom Upstream Configurations](/pantheon-yml#custom-upstream-configurations)


## See Also

- [Best Practices for Maintaining Custom Upstreams](/maintain-custom-upstream) 

- [Composer Fundamentals and WebOps Workflows](/guides/composer)