---
title: Integrated Composer
subtitle: Create a new Composer-managed CMS site
description: Learn how to create new integrated composer Drupal and WordPress sites on Pantheon.
contenttype: [guide]
innav: [false]
categories: [dependencies]
cms: [wordpress]
audience: [development]
product: [composer]
integration: [--]
tags: [wordpress]
contributors: [whitneymeredith, jspellman814, jazzsequence]
layout: guide
showtoc: true
permalink: docs/guides/integrated-composer/create
anchorid: wordpress-composer-managed
reviewed: "2024-10-15"
---

## Drupal with Integrated Composer
This section provides information on how to use Drupal with Integrated Composer. 

### Create Your Site

There are two ways you can spin up a site using WordPress Composer Managed:

- Running the following terminus command:

    ```bash{promptUser: user}
    terminus site:create --org ORG --region REGION -- <site_name> <label> drupal-11-composer-managed
    ```

- Using this [site create link](https://dashboard.pantheon.io/sites/create?upstream_machine_name=drupal-11-composer-managed).

The site you create will be based on the Pantheon-maintained [Drupal Composer Managed](https://github.com/pantheon-upstreams/drupal-composer-managed) upstream. Once this install completes, visit the Dev environment and follow the prompts to complete the CMS installation.

#### Understand the Drupal Codebase

Composer installs required packages into configured paths for Drupal, such as: 

* Contributed themes are installed into `web/themes/contrib/`
* Custom themes are installed into `web/themes/custom/`
* Contributed modules are installed into `web/modules/contrib/`
* Custom modules are installed into `web/modules/custom/`
* Drupal core is installed into `web/core/`
* Librariries are installed into `web/libraries/`

For more information about managing dependencies with Composer on Pantheon, see our documentation about [dependencies](/guides/integrated-composer/dependencies) or the [Composer documentation](https://getcomposer.org/doc/).

## WordPress with Integrated Composer and Bedrock
This section provides information on how to use Bedrock with Integrated Composer on a WordPress site.

WordPress does not natively support [Composer](https://getcomposer.org/), however, [Bedrock](https://roots.io/bedrock/) is a WordPress-specific framework for using Composer on WordPress sites.

## Requirements

- [PHP version](/guides/php/php-versions#verify-current-php-versions) 8.0 or greater
- [Composer](https://getcomposer.org/)

### Create Your Site

There are two ways you can spin up a site using WordPress Composer Managed:

- Running the following terminus command:

    ```bash{promptUser: user}
    terminus site:create --org ORG --region REGION -- <site_name> <label> wordpress-composer-managed
    ```

- Using this [site create link](https://dashboard.pantheon.io/sites/create?upstream_machine_name=wordpress-composer-managed).

The site you create will be based on the Pantheon-maintained [WordPress Composer Managed](https://github.com/pantheon-upstreams/wordpress-composer-managed) upstream. Once this install completes, visit the Dev environment and follow the prompts to complete the CMS installation.

Review the sections below for important information about your site, including an explanation of the directory structure and essential configuration actions.

### Use Roots Bedrock

#### Environment Variables

Bedrock makes use of an `.env` file to store environment variables. Pantheon takes care of many of these variables in `.env.pantheon`. You may set your own environment variables in a new `.env` or environment variables that are local-only in `.env.local` using the `.env.example` as a guide. Wrap values that may contain non-alphanumeric characters with quotes, or they may be incorrectly parsed.

#### WordPress Config

The `wp-config.php` file is located in the `web` directory. As with other WordPress sites on Pantheon, much of this is taken care of for you in `wp-config-pantheon.php`. Application-level configuration takes place in `config/application.php` while platform-specific updates are made in `config/application.pantheon.php`. This means that `config/application.php` can be modified for your WordPress configuration settings without fear of conflicts with the upstream. Any configuration changes should be made to your `config/appliction.php` **not** your `wp-config.php` file directly.

You can learn more about WordPress configuration with Bedrock in the [Bedrock Configuration docs](https://docs.roots.io/bedrock/master/configuration/).

#### Understand the WordPress Codebase

Bedrock installs WordPress as a required package so updates can be managed by Composer. As such, the contents of the `wp-content` directory have been moved outside the WordPress codebase so changes can be made safely to files within those directories without conflicts. Learn more about [Bedrock's folder structure here](https://docs.roots.io/bedrock/master/folder-structure/).

* Themes are installed into `web/app/themes/`
* Plugins are installed into `web/app/plugins`
* Must-use plugins are installed into `web/app/mu-plugins`
* WordPress core is installed into `web/wp`
* The WordPress admin dashboard is available at `https://example.com/wp/wp-admin/`

For more information about managing dependencies with Composer on Pantheon, see our documentation about [dependencies](/guides/integrated-composer/dependencies) or the [Composer documentation](https://getcomposer.org/doc/).

### More Resources

- [Bedrock Documentation](https://roots.io/bedrock/)
- [Install and Configure Lando for WordPress](/guides/local-development/lando-wordpress)
