---
title: Create an Advanced Composer-managed WordPress Site 
subtitle: Create an Advanced Composer-managed WordPress Site 
description: Learn how to create a WordPress Site that uses Composer, Continuous Integration, and Automated Testing on Pantheon
categories: [develop]
tags: [wordpress]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/wordpress-composer/create-wp-site-composer-ci-auto-test
anchorid: create-wp-site-composer-ci-auto-test
---

This section provides steps to create a new Pantheon WordPress site that will use [Composer](https://getcomposer.org/), Continuous Integration, and Automated Testing. This guide will get you started, but you will need to customize and maintain the CI/testing set up for your projects.

## Requirements

- [Terminus Build Tools Plugin](https://github.com/pantheon-systems/terminus-build-tools-plugin)

    - You must use the [Build Tools 3.x release](https://github.com/pantheon-systems/terminus-build-tools-plugin/tree/3.x) if you are using **Terminus 3**.

    - You must use the [Build Tools 2.x release](https://github.com/pantheon-systems/terminus-build-tools-plugin/tree/2.x) if you are using **Terminus 2**.

- [PHP version](/php-versions#verify-current-php-versions) 7.2 or greater

## Create Your Site

1. Use the [Terminus Build Tools Plugin](https://github.com/pantheon-systems/terminus-build-tools-plugin) to copy the Pantheon-maintained [WordPress Composer repository](https://github.com/pantheon-systems/example-wordpress-composer).

    - The Terminus Build Tools plugin will scaffold the new project, including:

       - A Git repository
       - A free [Pantheon sandbox](/create-sites#sandbox-sites) site
       - [Continuous Integration](https://pantheon.io/integrations/continuous-integration) configuration
       - Credential set up

1. Review the sections below for important information about your site, including an explanation of the directory structure, Continuous Integration functions, and essential configuration actions.

## Important Directories and Files

### /web Directory

1. Store your website in the `/web` subdirectory.

Pantheon serves the site from the `/web` subdirectory because of the configuration in the `pantheon.yml` file. You must store your website in the subdirectory for a Composer-based workflow. Placing your website in the subdirectory also allows you  to store tests, scripts, and other files related to your project in your repo without affecting your web document root and prevents web access through Pantheon. Your files may still be accessible from your version control project if it is public. See the [`pantheon.yml` documentation](/pantheon-yml#nested-docroot) for details.

### /web/wp Directory

Other directories and files within the `/web` directory are in different locations compared to a default WordPress installation. [WordPress allows installing WordPress core in its own directory](https://wordpress.org/support/article/giving-wordpress-its-own-directory/), which is necessary when installing WordPress with Composer. The overall layout of directories in the repo is similar to [Bedrock](https://github.com/roots/bedrock).

1. Move the `WP_SITEURL` to the `/web/wp` directory to allow WordPress core functions to work correctly. 

1. Review the `/web/wp-config.php` file for key settings and move other files to the to the `/web/wp` directory as necessary.

### composer.json File

This project uses Composer to manage third-party PHP dependencies. Some files, such as `web/wp` may not be visible in the repository. This is because WordPress core and its plugins are installed via Composer and ignored in the `.gitignore` file.

A custom, [Composer version of WordPress for Pantheon](https://github.com/pantheon-systems/wordpress-composer/) is used as the source for WordPress core.

Third party WordPress dependencies, such as plugins and themes, are added to the project via `composer.json`. The `composer.lock` file keeps track of the exact dependency version. Composer installer-paths are used to ensure the WordPress dependencies are downloaded into the appropriate directory.

Non-WordPress dependencies are downloaded to the `/vendor` directory.

1. Place all dependencies in the **require section** of your `composer.json` file. 

    - This includes dependencies that are only used in non-Live environments. All dependencies in the require section are pushed to Pantheon.

1. Place all dependencies that are not a part of the web application but are necessary to build or test the project in the **require-dev section**.

    - Some examples are `php_codesniffer` and `phpunit`. Dev dependencies are not deployed to Pantheon.

## Continuous Integration

The scripts that run on Continuous Integration are stored in the `.ci` directory. Provider-specific configuration files, such as `.circle/config.yml` and `.gitlab-ci.yml` use these scripts.

The scripts are organized into subdirectories according to their function: 

- Build
- Deploy
- Test

### Build Scripts .ci/build

The `.ci/build` script builds an artifact suitable for deployment.

- `.ci/build/php` installs PHP dependencies with Composer

### Build Scripts .ci/deploy

The `.ci/deploy` scripts facilitate code deployment to Pantheon.

 - `.ci/deploy/pantheon/create-multidev` creates a new [Pantheon multidev environment](/multidev) for branches other than the default Git branch. Note that not all users have multidev access. Please consult the [multidev FAQ doc](/multidev-faq) for details.

- `.ci/deploy/pantheon/dev-multidev` deploys the built artifact to either the Pantheon dev or a multidev environment, depending on the Git branch.

### Github Actions Workflows .ci/.github

The `.ci/.github` file enables GitHub Actions in your project.

1. Copy the `.ci/.github` file to the `.github` folder in root to enable Github Actions. 

1. Add your secrets to the GitHub Actions configuration.

## Automated Test Scripts .ci/tests

The `.ci/tests` scripts run automated tests. You can add or remove scripts depending on your testing needs.

### Static Testing 

`.ci/test/static` and `tests/unit` are static tests that analyze code without executing it. These tests are good at detecting syntax errors but not functionality errors.

1. Create all project-specific test files in the `tests/unit` directory.

- `.ci/test/static/run` runs [PHP CodeSniffer](https://github.com/squizlabs/PHP_CodeSniffer) with [WordPress coding standards](https://github.com/WordPress/WordPress-Coding-Standards), PHP Unit, and [PHP syntax checking](https://phpcodechecker.com/).

- `tests/unit/bootstrap.php` bootstraps the Composer autoloader.

- `tests/unit/TestAssert.php` provides an example Unit test. 

### Visual Regression Testing

`.ci/test/visual-regression` runs visual regression testing through a headless browser to take screenshots of web pages and compare them for visual differences.

1. Update the settings in `.ci/test/visual-regression/backstopConfig.js` file for your project. 

    - For example, the `pathsToTest` variable determines the URLs to test.

- `.ci/test/visual-regression/run` runs [BackstopJS](https://github.com/garris/BackstopJS) visual regression testing.

- `.ci/test/visual-regression/backstopConfig.js` is the [BackstopJS](https://github.com/garris/BackstopJS) configuration file. 

## Behat Testing 

Behat testing uses `.ci/test/behat` and `tests/behat`. [Behat](https://behat.org/en/latest/) is an acceptance/end-to-end testing framework written in PHP. It facilitates testing the fully-built WordPress site on Pantheon. [WordHat](https://wordhat.info/) is used to help integrate Behat and WordPress.

1. Store all `.feature` extension test files in the `tests/behat/tests/behat/features` directory.

    - The example tests must be replaced with project-specific tests.

        - `tests/behat/tests/behat/features/visit-homepage.feature` is a Behat test file that visits the homepage and verifies a `200` response.

        - `tests/behat/tests/behat/features/admin-login.feature` is a Behat test file that logs into the WordPress dashboard as an administrator and verifies access to new user creation.

        - `tests/behat/tests/behat/features/admin-login.feature` is a Behat test file that logs into the WordPress dashboard as an administrator, updates the `blogname` and `blogdescription` settings, clears the Pantheon cache, visits the home page, and verifies how the updated blog name and description appear.

- `.ci/test/behat/initialize` deletes any existing WordPress user from Behat testing and creates a backup of the environment to be tested.

- `.ci/test/behat/run` sets the `BEHAT_PARAMS` environment variable with dynamic information necessary for Behat and configures it to use [WP-CLI](https://wp-cli.org/) via [Terminus](/terminus). This script also creates the necessary WordPress user, starts headless Chrome, and runs Behat.

- `.ci/test/behat/cleanup` restores the previously made database backup, deletes the WordPress user used for Behat testing, and saves screenshots taken by Behat.

- `tests/behat/behat-pantheon.yml` is compatible with running tests against a Pantheon site.

- `tests/behat/tests/behat/features` stores Behat `.feature` extension test files.  

## GitHub Actions

This section provides information on how to enable GitHub Actions for an existing project. 

1. Copy `.ci/.github` to `.github`. 

1. Add the following secrets to the Github Actions configuration:

    `ADMIN_EMAIL`
    `ADMIN_PASSWORD`
    `ADMIN_USERNAME`
    `TERMINUS_TOKEN`
    `TERMINUS_SITE`
    `SSH_PRIVATE_KEY`
    `GH_TOKEN`


## Working Locally with Lando

Complete the one-time steps below to get started using [Lando](https://docs.devwithlando.io/) to develop locally. Please note than Lando is an independent product and is not supported by Pantheon. Refer to the [Lando documentation](https://docs.devwithlando.io/) for more information.

1. [Install Lando](https://docs.lando.dev/getting-started/installation.html) if it is not already installed.

1. Clone your project repository from GitHub to your local.

1. Manually create a `.lando.yml` file with your preferred configuration, based on the WordPress recipe.

1. Run `lando start` to start Lando.
    
1. Save the local site URL. 

    - It should be similar to `https://<PROJECT_NAME>.lndo.site.`

1. Run `lando composer install --no-ansi --no-interaction --optimize-autoloader --no-progress` to download dependencies.

1. Run `lando pull --code=none` to download the media files and database from Pantheon.
    
1. Visit the local site URL saved in the preceding steps.

    - You should now be able to edit your site locally. The steps above do not need to be completed on subsequent starts. You can stop Lando with `lando stop` and start it again with `lando start`.

1. Run all Composer, Terminus and wp-cli commands in Lando instead of the host machine. 

    - This is done by prefixing the desired command with `lando`. For example, after a change to `composer.json` run `lando composer update` rather than `composer update`.

<Alert title="Warning" type="danger" >

Do NOT push/pull code between Lando and Pantheon directly. All code should be pushed to GitHub and deployed to Pantheon through a continuous integration service, such as CircleCI.

</Alert>

## See Also

- [Install and Configure Lando for WordPress](/guides/lando-wordpress)