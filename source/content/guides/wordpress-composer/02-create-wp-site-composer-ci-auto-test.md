---
title: WordPress with Composer on Pantheon 
subtitle: Create a CI, Composer-managed WordPress Site
description: Learn how to create a WordPress Site that uses Composer, Continuous Integration, and Automated Testing on Pantheon
categories: [develop]
tags: [wordpress]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/wordpress-composer/create-wp-site-composer-ci-auto-test
anchorid: create-wp-site-composer-ci-auto-test
---

This section provides steps to create a new Pantheon WordPress site that will use [Composer](https://getcomposer.org/), Continuous Integration (CI), and Automated Testing. This guide will get you started, but you will need to customize and maintain the CI/testing set up for your projects.

## Requirements

- [Terminus Build Tools Plugin](https://github.com/pantheon-systems/terminus-build-tools-plugin)

    - You must use the [Build Tools 3.x release](https://github.com/pantheon-systems/terminus-build-tools-plugin/tree/3.x) if you are using **Terminus 3**.

    - You must use the [Build Tools 2.x release](https://github.com/pantheon-systems/terminus-build-tools-plugin/tree/2.x) if you are using **Terminus 2**.

- [PHP version](/php-versions#verify-current-php-versions) 7.2 or greater

## Create Your Site

1. Use the [Terminus Build Tools Plugin](https://github.com/pantheon-systems/terminus-build-tools-plugin).

    - The Terminus Build Tools plugin will scaffold the new project, including:

       - A Git repository
       - A free [Pantheon sandbox](/create-sites#sandbox-sites) site
       - [Continuous Integration](https://pantheon.io/integrations/continuous-integration) configuration
       - Credential set up

1. Run the following command to spin up your site: 

    ```bash
    terminus build:project:create wp
    ```

    - This site will be based on the Pantheon-maintained [WordPress Composer repository](https://github.com/pantheon-systems/example-wordpress-composer).

1. Review the sections below for important information about your site, including an explanation of the directory structure, Continuous Integration functions, and essential configuration actions.

## Review Important Directories and Update File Paths

### /web Directory

Your site is stored and served from the `/web` subdirectory located next to the `pantheon.yml` file. You must store your website in this subdirectory for a Composer-based workflow. Placing your website in the subdirectory also allows you  to store tests, scripts, and other files related to your project in your repo without affecting your web document root. It also provides additional security by preventing web access to files outside of the document root through Pantheon.
Your files may still be accessible from your version control project if it is public. Refer to the [`pantheon.yml` documentation](/pantheon-yml#nested-docroot) for details.

1. Verify that your website is stored in the `/web` subdirectory.

### /web/wp Directory

Your directories and files within the `/web` directory are stored in different locations compared to a default WordPress installation. [WordPress allows installing WordPress core in its own directory](https://wordpress.org/support/article/giving-wordpress-its-own-directory/), which is necessary when installing WordPress with Composer. The overall layout of directories in the repo is similar to [Bedrock](https://github.com/roots/bedrock).

1. Verify that the `WP_SITEURL` file is in the `/web/wp` directory to allow WordPress core functions to work correctly. 

1. Review the `/web/wp-config.php` file for key settings and move other files to the to the `/web/wp` directory as necessary.

### composer.json File

This project uses Composer to manage third-party PHP dependencies. Some files, such as `web/wp`, may not be visible in the repository. This is because WordPress core and its plugins are installed via Composer and ignored in the `.gitignore` file.

Third-party WordPress dependencies, such as plugins and themes, are added to the project via `composer.json` file. The `composer.lock` file keeps track of the exact dependency version. Composer installer-paths are used to ensure the WordPress dependencies are downloaded into the appropriate directory.

Non-WordPress dependencies are downloaded to the `/vendor` directory.

1. Place all dependencies in the **require** section of your `composer.json` file. 

    - This includes dependencies that are only used in non-Live environments. All dependencies in the **require** section are pushed to Pantheon.

1. Place all dependencies that are not a part of the web application but are necessary to build or test the project in the **require-dev** section.

    - Example dependencies are `php_codesniffer` and `phpunit`. Dev dependencies are deployed to Dev and Multidev environments, but not to Test and Live environments.

## Continuous Integration

The scripts that run on Continuous Integration are stored in the `.ci` directory. Provider-specific configuration files, such as `.circle/config.yml` and `.gitlab-ci.yml` use these scripts.

The scripts are organized into subdirectories according to their function: 

- Build
- Deploy
- Test

### Build Scripts .ci/build

- `.ci/build` script builds an artifact suitable for deployment.

- `.ci/build/php` installs PHP dependencies with Composer.

### Build Scripts .ci/deploy

All scripts stored in the `.ci/deploy` directory facilitate code deployment to Pantheon.

 - `.ci/deploy/pantheon/create-multidev` creates a new [Pantheon Multidev environment](/guides/multidev) for branches other than the default Git branch. Note that not all users have Multidev access. Please consult the [Multidev FAQ doc](/guides/multidev/multidev-faq) for details.

- `.ci/deploy/pantheon/dev-multidev` deploys the built artifact to either the Pantheon Dev or a Multidev environment, depending on the Git branch.

## Automated Test Scripts .ci/tests

The `.ci/tests` scripts run automated tests. You can add or remove scripts depending on your testing needs.

### Static Testing 

- `.ci/test/static` and `tests/unit` are static tests that analyze code without executing it. These tests are good at detecting syntax errors but not functionality errors.

- `.ci/test/static/run` runs [PHP CodeSniffer](https://github.com/squizlabs/PHP_CodeSniffer) with [WordPress coding standards](https://github.com/WordPress/WordPress-Coding-Standards), [PHP Unit](https://phpunit.de/), and [PHP syntax checking](https://phpcodechecker.com/).

- `tests/unit/bootstrap.php` bootstraps the Composer autoloader.

- `tests/unit/TestAssert.php` provides an example Unit test. 

1. Create all project-specific test files in the `tests/unit` directory.

### Visual Regression Testing

The scripts stored in the `.ci/test/visual-regression` directory run visual regression testing through a headless browser to take screenshots of web pages and compare them for visual differences.

- `.ci/test/visual-regression/run` runs [BackstopJS](https://github.com/garris/BackstopJS) visual regression testing.

- `.ci/test/visual-regression/backstopConfig.js` is the [BackstopJS](https://github.com/garris/BackstopJS) configuration file. 

1. Update the settings in `.ci/test/visual-regression/backstopConfig.js` file for your project. 

    - For example, the `pathsToTest` variable determines the URLs to test.


## More Resources

- [Pantheon YAML Configuration Files](/pantheon-yml)

- [Continuous Integration Solutions on Pantheon](/continuous-integration)
