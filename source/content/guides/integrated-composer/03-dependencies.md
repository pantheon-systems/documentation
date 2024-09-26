---
title: Integrated Composer
subtitle: Add or Remove Individual Site Dependencies
description: Learn how to add or remove an individual site dependency.
tags: [composer, workflow]
contributors: [ari, edwardangert]
showtoc: true
permalink: docs/guides/integrated-composer/dependencies
contenttype: [guide]
innav: [false]
categories: [dependencies]
cms: [drupal, wordpress]
audience: [development]
product: [composer]
integration: [--]
reviewed: "2022-12-13"
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

1. [Clone the database from Live](/pantheon-workflow#combine-code-from-dev-and-content-from-live-in-test) to all other environments before continuing.

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

## Updating dependencies

To update all Composer dependencies, run:

```bash{promptUser: user}
composer update
```

This will update all Composer-managed packages according to the version constraints in your `composer.json` file. For more information on Composer version constraints, see the [Composer documentation](https://getcomposer.org/doc/articles/versions.md).

To update a specific package, run:

```bash{promptUser: user}
composer update vendor/package
```

Replace `vendor/package` with the package name you want to update. This will update only the named package to the latest version that matches the version constraints in your `composer.json` file.

## Applying Updates and Pushing Code to Pantheon with Integrated Composer

Integrated Composer on Pantheon runs Composer operations on the server level. Which operations are run depends on what you are doing with your code.

### Pushing Code to Pantheon

When you push code to Pantheon, a `composer install` operation is run. This operation installs the dependencies listed in the `composer.lock` file. This ensures that the same versions of dependencies are installed on all environments.

### Applying Upstream Updates

When you check for an upstream update, the `composer update` operation is run. This operation updates all Composer-managed packages according to the version constraints in your `composer.json` file. This ensures that your site is up-to-date with the latest versions of all Composer-managed packages. Refer to the [Composer Versions](https://getcomposer.org/doc/articles/versions.md) documentation for more information on version constraints.

When you click to _apply_ these upstream updates, the `composer update` operation is run on the Pantheon server. This updates the `composer.lock` file with the new versions of the packages. The `composer.lock` file is then committed to the repository and pushed to Pantheon.

## More Resources

- [Manage Some Dependencies with Composer](/guides/partial-composer)
- [Build Tools](/guides/build-tools/)
- [Composer Dependencies - Basic Usage](https://getcomposer.org/doc/01-basic-usage.md#installing-dependencies)
- [Composer Versions](https://getcomposer.org/doc/articles/versions.md)

