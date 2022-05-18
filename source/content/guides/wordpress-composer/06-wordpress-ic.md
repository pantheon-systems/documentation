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

## WordPress with Integrated Composer

Follow the steps below to create a new WordPress site using Integrated Composer and Upstream.

1. Fork the [Pantheon-maintained repository](https://github.com/pantheon-upstreams/wordpress-project).

1. Add a new **Custom Upstream** on the Pantheon dashboard.

1. Create a new WordPress site from the Upstream.

    - Do not customize the upstream yet.

1. Navigate to the **Dev** environment > click **Visit Development Site** > follow the prompts to complete the CMS installation.

1. [Clone the site locally](/local-development#get-the-code) and run `composer install`.

## Managing Your WordPress Integrated Composer Site

1. Review the [Integrated Composer Guide](/guides/integrated-composer) for information on how to:

    - [Managing Core as a Project Dependency](https://pantheon.io/docs/guides/composer#managing-core-as-a-project-dependency)

    - [Serving Sites from the Web Subdirectory](/nested-docroot)

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

- [Best Practices for Maintaining Custom Upstreams](/docs/maintain-custom-upstream) 

- [Pantheon YAML Configuration Files](/pantheon-yml)

- [Composer Fundamentals and WebOps Workflows](https://pantheon.io/docs/guides/composer)