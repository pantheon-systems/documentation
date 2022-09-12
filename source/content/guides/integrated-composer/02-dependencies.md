---
title: Integrated Composer
subtitle: Add or Remove Individual Site Dependencies
description: Learn how to add or remove an individual site dependency.
tags: [composer, workflow]
categories: [get-started]
contributors: [ari, edwardangert]
layout: guide
showtoc: true
permalink: docs/guides/integrated-composer/dependencies
anchorid: dependencies
---

This sections provides information on dependency requirements and how to add or remove individual site dependencies.

## Composer `require` and `require dev` Sections

It's important to understand how `require` and `require dev` are used on the Pantheon platform.

### Composer `require` Section

Drupal modules / themes and WordPress plugins / themes should always be in the `require` section, not the `require-dev` section. Dependencies in the `require` section are pushed to all Pantheon environments.

### Composer `require dev` Section

You should use the `require-dev` section for dependencies that are not a part of the web application but are necessary to build or test your project. Some examples are `php_codesniffer` and `phpunit`. Dev dependencies are deployed to Pantheon Dev and Multidev environments, but not to Test and Live environments.

Third-party dependencies, such as modules / plugins and themes, are added to the project via `composer.json`. The `composer.lock` file keeps track of the exact version of dependency. [Composer `installer-paths`](https://getcomposer.org/doc/faqs/how-do-i-install-a-package-to-a-custom-path-for-my-framework.md#how-do-i-install-a-package-to-a-custom-path-for-my-framework-) are used to ensure the dependencies are downloaded into the appropriate directory.

### Select Dependencies Locally

When running `composer install` on a local clone of your Pantheon site's repository, you can use the `--no-dev` option to install the dependencies that will be installed on the Pantheon Test and Live environments. Do not include this option to install the dependencies that will be installed on Dev and Multidev environments on Pantheon. The `--no-dev` option has no effect on what is written to the `composer.lock` file, and therefore does not change the behavior of your site on Pantheon. This option is only relevant to local testing.

## Add a Dependency to an Individual Site

1. [Clone the Git repository](/guides/git/git-config#clone-your-site-codebase) from the Pantheon site's dashboard.

1. Run `composer install`:

   ```bash{promptUser: user}
   composer install
   ```

1. Add a new dependency locally:

   ```bash{promptUser: user}
   composer require drupal/pkg-name
   ```

1. Commit `composer.json` and `composer.lock` and push the changes.

   ```bash{promptUser: user}
   git add composer.json composer.lock && git commit -m "added composer.json and composer.lock" && git push
   ```

   - Pantheon will run Composer, build artifacts, and deploy the changes to your Dev or Multidev environment. You can now deploy the changes from the updated Dev environment to the Test and Live environments.

1. Complete the steps to [commit Dev changes to Test and Live](/pantheon-workflow#combine-code-from-dev-and-content-from-live-in-test) through your Pantheon dashboard or with [Terminus env:deploy](/terminus/commands/env-deploy).

## Remove Individual Site Dependencies

You can remove site dependencies if they are no longer needed. You should use caution when removing individual site dependencies. You can cause problems with your site if you decide you no longer need a module but leave it installed, and then remove site dependencies.

1. [Clone the database from Live](/guides/quickstart/clone-live-to-dev/) to all other environments before continuing.

1. Ensure that all modules in the package have been uninstalled. You can uninstall modules in the Drupal admin dashboard, or from the command line with Terminus:

    ```bash{promptUser: user}
    terminus drush site.live -- pm:uninstall module1 module2
   ```

1. Remove the dependency locally:

   ```bash{promptUser: user}
   composer remove drupal/pkg-name
   ```

1. Commit `composer.json` and `composer.lock` and push the changes.

   - Pantheon will run Composer, generate build artifacts, etc.

## More Resources

- [Manage Some Dependencies with Composer](/guides/partial-composer)

- [Build Tools](/guides/build-tools/)
