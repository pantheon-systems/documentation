---
title: Using Drupal 8 and Composer
description: Use Composer to manage modules and other dependencies for Drupal 8 sites on Pantheon.
tags: [workflow]
categories: [drupal8]
contributors:
  - stevector
---

[Composer](https://getcomposer.org/) is a dependency management tool that allows PHP code to be more easily shared across projects. As Drupal 8 was written, many of its subsystems written specifically for Drupal were replaced by more widely used packages. For instance, Drupal's notoriously unwieldy function for making external requests, `drupal_http_request()`, [was replaced](https://www.drupal.org/node/1862446) by [Guzzle](http://guzzlephp.org/). Guzzle is included in Drupal 8 via Composer.

## Install Composer Locally
For details, see Composer's documentation on [Installation - Linux / Unix / OSX](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-osx).

## Composer Usage

Understanding how Composer can be used independent of Drupal 8 is a good foundation for learning Drupal 8. [This section is a summary of Composer's own basic usage documentation](https://getcomposer.org/doc/01-basic-usage.md).

Composer's purpose is managing dependencies. To perform this task, Composer needs:

- A list of dependencies
- A place to put the dependencies

### List Dependencies with composer.json and composer.lock

Composer lists dependencies with its `composer.json` file. For example, a very simple (and still valid) `composer.json` might list only the logging tool, [Monolog](https://github.com/Seldaek/monolog/blob/master/doc/01-usage.md).

```json
{
    "require": {
        "monolog/monolog": "1.0.*"
    }
}
```

If you placed this file in an empty directory, you could run `composer install` to download Monolog and generate a `composer.lock` file. The `composer.lock` file also uses the JSON format. The purpose of the lock file is to list exactly what was downloaded by recording details like the URL from which Monolog was downloaded, the commit hash used from Monolog's Git repository, and information Composer could use to ensure the same version of Monolog would be downloaded again the next time `composer install` is run. After some period of time (in which Monolog released a new version), running `composer update` would result in downloading the new version of Monolog and changes to the `composer.lock` directory.

Another dependency could be added to both `composer.json` and `composer.lock` by running `composer require`. For example:

```
composer require phpunit/php-timer
```

### Retrieve Dependencies from a Wider List of Packages

For Composer to interpret `"monolog/monolog": "1.0.*"` into something that can actually be downloaded, it needs to ask an external system where `monolog/monolog` can be found. For most of the PHP world, [packagist.org](https://packagist.org/) is the primary place Composer uses. Drupal is still evolving how it aggregates its packages.

### Place Dependencies in a Vendor Directory

Both of the commands mentioned above, `composer install` and `composer update`, will populate the `vendor` folder with the dependencies listed in `composer.json`/`composer.lock`. `vendor` is the default location for downloaded dependencies to live. Below, you'll see that Drupal creates some exceptions for placing modules/themes/profiles in their traditional locations within a Drupal install.

## Install Modules in Drupal 8 through Composer

Composer assumes that packages use semantic versioning where releases have three numbers signifying `MAJOR.MINOR.PATCH` releases. Drupal modules however have release numbers like `8.x-1.2`. This pattern indicates that the release is the third official release (`8.x-1.0` and `8.x-1.1` being the first two) made from the `8.x-1.x` branch. The `8.x` indicates that the release is compatible with Drupal 8. Drupal needs an alternative to packagist.org in order to map Drupal release numbers to Composer-compatible semantic versions.

The first step to installing Drupal modules with Composer is to ensure that the `composer.json` in your Drupal site knows about an alternative to packagist.org where Drupal modules can be found. Around the time Drupal 8 was released, the primary Drupal Packagist site was packagist.drupal-composer.org. You can now use [Drupal.org](https://www.drupal.org/node/2718229).

```
composer config repositories.drupal composer https://packages.drupal.org/8
```

Once Composer knows where to find modules, they can be added easily with `composer require`. For instance, [address module](https://www.drupal.org/project/address) could be installed via Composer with

```
composer require drupal/address --prefer-dist

```

Address module depends on a few external packages (because problems of mailing addresses are not Drupal-specific). Those external packages are downloaded to the `vendor` directory. Address module itself will be put in Drupal's `module` directory. `composer require` can also be used for themes and profiles which will also be placed in the appropriate Drupal directories.

For more information, see the Drupal [documentation on Composer usage](https://www.drupal.org/node/2404989).


## Decide Whether to Commit the Vendor Directory

Much of the [documentation on Composer says that the `vendor` directory should not be committed to version control.](https://getcomposer.org/doc/faqs/should-i-commit-the-dependencies-in-my-vendor-directory.md) This recommendation presumes some abstraction layer between the Git repository developers commit to and the way their code is deployed to a live site. That abstraction might be a build system that takes the development team's repository, and creates a "build artifact" from the repository (by running `composer install` and possibly other steps like compiling Sass) that is then deployed. That build artifact might be tracked in a separate Git repository. In fact, this [mental model has been the way many teams have used Pantheon for years](https://pantheon.io/blog/example-repository-build-drupal-composer-travis). They use GitHub, Bitbucket, or some other external repository as the repository where developers commit their changes. A continuous integration service then builds the developers' changes and sends them to Pantheon. If this is the model you are using, you do not have to commit your `vendor` directory.

If Pantheon is your site's only repository, then you do have to commit the `vendor` directory. Pantheon uses the same Git repository to control how code is deployed to all Pantheon environments. We consider it a security feature to make it easy for developers to see how exactly the same code is deployed to all environments. Many teams using Pantheon consider a two-repository model to be unnecessarily complex.

### Avoid Committing Dependencies as Submodules

Sometimes running Composer commands like `install`, `update`, or `require` result in the downloading of `.git` directories for the dependencies being downloaded. Downloading the Git source of a dependency may be helpful for editing and contributing back to a dependency, but it is unlikely to be needed for most site building. Use `--prefer-dist` when running `composer require` so that Composer will download a distribution of the dependency that does not include the Git history of that dependency. When you `git add` the dependency, Git will not attempt to add the dependency as [a git submodule, which is not supported on Pantheon](https://pantheon.io/docs/git-faq/#does-pantheon-support-git-submodules%3F).

### Using Continuous Integration

As the Drupal community comes to a clearer consensus on how to manage build steps, Pantheon will add more documentation and examples for how to integrate common build processes with Pantheon tools.

For those interested in working in the two-repository model, see some of our GitHub repositories:

* [ci-scripts](https://github.com/pantheon-systems/ci-scripts): Helper scripts for doing Continuous Integration with Pantheon
* [example-drupal8-circle-composer](https://github.com/pantheon-systems/example-drupal8-circle-composer): Building Drupal 8 from Circle CI with Composer


### Merge Conflicts

As of Drupal core 8.1.0, the `vendor` directory is not committed to Git. Drupal.org uses a build process to populate the `vendor` directory if you simply want to download a .zip or .tar file of Drupal and be able to install it. The `vendor` directory must be present for Drupal to be installed. This is why [Pantheon's Git repository for Drupal 8](https://github.com/pantheon-systems/drops-8) still has the vendor directory populated. We expect it to be installable. However, you might find Git conflicts when you attempt to apply updates to Drupal core through the Pantheon Dashboard. It is possible that the same files in `vendor` have been updated by your installation of modules and changes in Drupal core. When this happens, the best way to resolve the conflicts is to simply delete the `vendor` directory and run `composer install` again. You'll need to:

Add our version of Drupal core as an upstream to your local checkout of your Pantheon site and fetching:

```
git remote add drops-8 git@github.com:pantheon-systems/drops-8.git
git fetch drops-8
```

Merge from Drops-8:

```
git merge drops-8/master
```

If there are conflicts in `vendor`, remove it and re-populate:

```
rm -rf vendor/
composer install
```

We recommend `composer install` in this case instead of `composer update` because `install` will download the same packages that were previously installed. `update` might download newer versions of packages than have been tested for Drupal core.

## Update Packages

It will still be necessary at times to update your packages. It is best to update only the packages you intend to update rather than performing a blanket update. To update specific modules, run `composer update drupal/address` instead of a broad `composer update`.


## Frequently Asked Questions

### Is your project Drupal or is Drupal a dependency of your project?

Composer usage has raised a philosophical question for many site developers. Traditionally, Drupal has encouraged a mental model where Drupal is the site, and modules and custom code are placed inside Drupal. Composer encourages a mental model where code not written specifically for a given project is a dependency. This question can be seen in the `composer.json` file. The `name` property in Drupal core's `composer.json` file is `drupal/drupal`. Many Composer-minded developers would prefer that the top level name property for their projects were something like `mycompanyname/myprojectname` and `drupal/drupal` would then be listed as a required dependency. This approach is done in [Drupal Project](https://github.com/drupal-composer/drupal-project). Drupal Project will also put the docroot of the website in the `web` directory rather than the Git root as Pantheon currently presumes. We are investigating ways to best support this mental model.

### What about using the Composer Manager module?

Composer Manager module was written for Drupal 7 and Drupal 8 sites (prior to 8.1.0) to use as a system for tracking Composer packages needed by the modules installed on the site. As of Drupal 8.1.0 (released in April 2016), it is easier for site builders to use Drupal core's `composer.json` instead of Composer Manager module. Composer Manager has made its [final release for Drupal 8](https://www.drupal.org/project/composer_manager/releases/8.x-1.0-rc2) and [the maintainer recommends no longer using it](https://twitter.com/bojan_zivanovic/status/737694659829436416).
