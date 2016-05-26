---
title: Drupal 8 and Composer
description: Understand how to use Composer to manage modules and other dependencies for Drupal 8
categories: [Drupal 8]
tags: [code, local]
---

Composer is a dependency management tool that allows for PHP code to be more easily shared across project and systems. As Drupal 8 was written, many old subsystems written specifically for Drupal were replaced by more widely used packages. For instance, Drupal's notoriously unwieldy function for making external requests, `drupal_http_request()`, [was replaced](https://www.drupal.org/node/1862446) by [Guzzle](http://guzzlephp.org/). Guzzle is included in Drupal 8 via Composer.

## Installing Composer on your local machine


## Generic Composer usage

Understanding how Composer can be used independent of Drupal 8 is a good foundation for learning Drupal 8 usage. [This section is a summary of Composer's own basic usage documentation](https://getcomposer.org/doc/01-basic-usage.md).

Composer's purpose is managing dependencies. To perform this task, Composer needs

1. A list of dependencies
2. A place to put the dependencies.

### Listing dependencies with 	`composer.json` and `composer.lock`

Composer list dependencies with its `composer.json` file. A very simple (and still valid) `composer.json` might simply list the logging tool, [Monolog](https://github.com/Seldaek/monolog/blob/master/doc/01-usage.md).

```json
{
    "require": {
        "monolog/monolog": "1.0.*"
    }
}
```

If you placed this file in an empty directory, you could run `composer install` which would download Monolog and generate a `composer.lock` file. The composer.lock file also is in the JSON format. The main purpose of the lock file is to list exactly what was downloaded by recording details like the url from which Monolog was downloaded, the commit hash used from Monolog's git repository and information composer could use to ensure the same version of Monolog would be downloaded again by the next running of `composer install`. After some period of time (in which Monolog released a new version), running `composer update` would result in downloading that new version of Monolog and changes to the `composer.lock` directory.

Another dependency could be added to both `composer.json` and `composer.lock` by running `composer require`. For instance

```
composer require phpunit/php-timer
```

### Retrieving dependencies from a wider list of packages

For Composer to interpret `"monolog/monolog": "1.0.*"` into something that can actually be downloaded it needs to ask an external system where `monolog/monolog` can be found. For most of the PHP world, https://packagist.org/ is the primary place Composer uses. Drupal is still evolving how it aggregates its packages.

### Placing dependencies in a `vendor` directory.

Both of the commands mentioned above, `composer install` and `composer update` will populate a folder, `vendor`, with the dependencies listed in `composer.json`/`composer.lock`. `vendor` is the default location for downloaded dependencies to live. Below, we will see that Drupal creates some exceptions for placing modules/themes/profiles in their traditional locations within a Drupal install.

## Installing modules in Drupal 8 through Composer

Much of the information in this section comes from [drupal.org documentation on Composer usage](https://www.drupal.org/node/2404989).

Composer assumes that packages use Semantic Versioning where releases have three numbers signifying `MAJOR.MINOR.PATCH` releases. Drupal modules however have release numbers like `8.x-1.2`. This pattern indicates that the release is the third official release (`8.x-1.0` and `8.x-1.1` being the first two) made from the `8.x-1.x` branch. The `8.x` indicates that the release is compatible with Drupal 8. All this to say, Drupal needs an alternative to packagist.org in order to map Drupal release numbers to Composer-compatible semantic versions.

The first step to installing Drupal modules with Composer is to ensure that the `composer.json` in your Drupal site knows about an alternative to packagist.org where Drupal modules can be found. Eventually, drupal.org will provide this information. For now, use https://packagist.drupal-composer.org.

```
composer config repositories.drupal composer https://packagist.drupal-composer.org
```

Once Composer knows where to find modules, they can be added easily with `composer require`. For instance, [address module](https://www.drupal.org/project/address) could be installed via Composer with

```
composer require drupal/address

```

Address module depends on a few external packages (because problems of mailing addresses are not Drupal-specific). Those external packages are downloaded to the `vendor` directory. Address module itself will be put in Drupal's `module` directory.




Delete this paragraph?
Traditionally, Drupal developers have added modules (and themes and profiles) by downloading them manually from Drupal.org and placing them in the appropriate directories. There are helper scripts for this task like `drush pm-download` that make this task of downloading modules easier.




## Committing the vendor directory

Much of the documentation on Composer says that the `vendor` directory should not be committed to version control.


## Is your project Drupal or is Drupal a dependency of your project?

Composer usage has raise a philosophical question for may site developers. Traditionally, Drupal has encouraged a mental model where Drupal *is* the site and modules and custom code is placed inside Drupal. Composer encourages a mental model where code not written specifically for the a given project is a dependency. This question manifests itself in the `composer.json` file. The `name` property in Drupal core's `composer.json` file is `drupal/drupal`. Many Composer-minded developers would prefer that the top-level name property for their projects were something like `mycompanyname/myprojectname` and `drupal/drupal` is listed as a required dependency. This approach is done in [Drupal Project](https://github.com/drupal-composer/drupal-project).



## Repository structure


## Installing a module with Composer

## What about Composer Manager?

Composer Manager module was written for Drupal 7 and Drupal 8 sites (prior to 8.1.0) to use as a system for tracking Composer packages needed by the modules installed on the site. As of Drupal 8.1.0 (released in April 2016), it is easier for site builders to use Drupal core's `composer.json` instead of Composer Manager module.




## Merge conflicts

## Updating packages



## Install profiles


## WordPress Resources


