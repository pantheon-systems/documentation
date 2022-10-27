---
title: WordPress with Composer on Pantheon
subtitle: Create a Composer-managed WordPress Site with Bedrock
description: Learn more about Bedrock and Composer-managed WordPress sites.
categories: [develop]
tags: [wordpress]
contributors: [whitneymeredith, jspellman814, jazzsequence]
layout: guide
type: guide
showtoc: true
permalink: docs/guides/wordpress-composer/pre-ga/wordpress-composer-managed
anchorid: wordpress-composer-managed
---

<Alert title="Early Access" type="info" icon="leaf">

The WordPress Composer Managed upstream is available for [Early Access](/oss-support-levels#early-access) participants. Features for WordPress Composer Managed are in active development. Pantheon's development team is rolling out new functionality often while this product is in Early Access. Visit [#wordpress in our community Slack](https://pantheon-community.slack.com/archives/CT8MC5Y0K) (you can sign up for the [Pantheon Slack channel here](https://slackin.pantheon.io/) if you don't already have an account) to learn how you can enroll in our Early Access program. Please review Pantheon's [Software Evaluation Licensing Terms](https://legal.pantheon.io/#contract-hkqlbwpxo) for more information about access to our software.

</Alert>

This section provides information on how to use Bedrock with Integrated Composer on a WordPress site.

WordPress does not natively support [Composer](https://getcomposer.org/), however, [Bedrock](https://roots.io/bedrock/) is a WordPress-specific framework for using Composer on WordPress sites.

## Requirements

- [PHP version](/guides/php/php-versions#verify-current-php-versions) 7.4 or greater

- [Composer](https://getcomposer.org/)

## Create Your Site

There are two ways you can spin up a site using the WordPress Composer Managed upstream:

- Running the following Terminus command:

    ```bash{promptUser: user}
    terminus site:create --org ORG --region REGION -- <site_name> <label> "WordPress (Composer Managed)"
    ```

- Using this [site create link](https://dashboard.pantheon.io/sites/create?upstream_id=90a683cd-4e03-4832-9b49-be97ab2a0be4).

The site you create will be based on the Pantheon-maintained [WordPress Composer Managed](https://github.com/pantheon-upstreams/pre-ga/wordpress-composer-managed) upstream. Once this install completes, visit the Dev environment and follow the prompts to complete the CMS installation.

Review the sections below for important information about your site, including an explanation of the directory structure and essential configuration actions.

## Use Roots Bedrock

### Environment Variables

Bedrock makes use of an `.env` file to store environment variables. Pantheon takes care of many of these variables in `.env.pantheon`. You may set your own environment variables in a new `.env` or environment variables that are local-only in `.env.local` using the `.env.example` as a guide. Wrap values that may contain non-alphanumeric characters with quotes, or they may be incorrectly parsed.

### WordPress Config

The `wp-config.php` file is located in the `web` directory. As with other WordPress sites on Pantheon, much of this is taken care of for you in `wp-config-pantheon.php`. Application-level configuration takes place in `config/application.php`. This can be referenced as a guide to understand how the constants are set up and how the `.env` files work, but modifying this file may result in merge conflicts and is not recommended. Any configuration changes should be made to your `wp-config.php` file directly.

You can learn more about WordPress configuration with Bedrock in the [Bedrock Configuration docs](https://docs.roots.io/bedrock/master/configuration/).

### Understand the WordPress Codebase

Bedrock installs WordPress as a required package so updates can be managed by Composer. As such, the contents of the `wp-content` directory have been moved outside the WordPress codebase so changes can be made safely to files within those directories without conflicts. Learn more about [Bedrock's folder structure here](https://docs.roots.io/bedrock/master/folder-structure/).

* Theme are installed into `web/app/themes/`
* Plugins are installed into `web/app/plugins`
* Must-use plugins are installed into `web/app/mu-plugins`
* The WordPress admin dashboard is available at `https://example.com/wp/wp-admin/`

### Using Composer to manage plugins and themes

[Packagist](https://packagist.org) is a repository of Composer packages that are available by default to projects managed by Composer. Packagist libraries receive updates from their source GitHub repositories automatically.

[WPackagist](https://wpackagist.org) is a Packagist-like mirror of the WordPress.org [plugin](https://wordpress.org/plugins) and [theme](https://wordpress.org/themes) repositories and is included with Bedrock out of the box. 

You can install packages from Packagist or WPackagist without any additional configuration using `composer upstream-require`.

#### Require a Package from Packagist

Some WordPress developers push their packages to Packagist in addition to the WordPress plugin and theme repositories. In this way, it may be beneficial to pull those packages directly from Packagist to get the latest code directly from the source.

```bash{promptUser: user}
composer upstream-require yoast/wordpress-seo
```

Packages that are flagged as `wordpress-plugin`, `wordpress-theme` or `wordpress-muplugin` in their `composer.json` files will be installed automatically in the appropriate `web/app/` directory by Composer.

#### Requiring a package from WPackagist

For all other plugins and themes that are not managed on Packagist, you can use `composer upstream-require` as well, using `wpackagist-plugin` or `wpackagist-theme` as the vendor and the plugin or theme slug as the package name:

```bash{promptUser: user}
composer upstream-require wpackagist-theme/twentytwentytwo
```

```bash{promptUser: user}
composer upstream-require wpackagist-plugin/advanced-custom-fields
```

## Known Issues

- The WordPress Composer Managed upstream is not yet compatible with WordPress Multisite with subdirectories.
- There is a bug with WordPress Multisite with subdomains when running the site locally with Lando and running WP-CLI commands. There is a [gist](https://gist.github.com/jazzsequence/8b68c35aa7668b77776fc1b9df216304) to fix this, which will eventually be incorporated into the upstream.

## Report an Issue

Create an [issue in the GitHub repo](https://github.com/pantheon-systems/pre-ga/wordpress-composer-managed/issues) for the team to review and address if you discover an issue with the WordPress Composer Managed upstream.

Visit [#wordpress in our community Slack](https://pantheon-community.slack.com/archives/CT8MC5Y0K) (you can sign up for the [Pantheon Slack channel here](https://slackin.pantheon.io/) if you don't already have an account) to learn how you can enroll in our Early Access program.

## More Resources

- [Bedrock Documentation](https://roots.io/bedrock/)

- [Install and Configure Lando for WordPress](/guides/lando-wordpress)

- [Back to the Pantheon WordPress Composer Guide](/guides/wordpress-composer)
