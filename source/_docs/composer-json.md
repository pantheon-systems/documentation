---
title: Composer.json and Composer.lock
description: Learn more about Pantheon's example composer.json files for WordPress, Drupal 8, and Drupal 7.
tags: [automation, workflow]
---
Composer is a dependency management tool that allows PHP code to be more easily shared across projects. The `composer.json` file is a configuration file that tells Composer details about your projects and it’s dependencies. This is where installation paths are set for core, plugins, contrib modules, and themes.

<div class="alert alert-info">
<h4 class="info">Note</h4>
<p markdown="1">If you are considering adopting a Composer workflow, start by [learning the fundamentals](/docs/composer/) then identify which of the two workflows best meets your use case ([GitHub Pull Request](/docs/composer/#github-pull-request) or [Custom Upstream](/docs/composer/#custom-upstream)). **The following content can be applied within either workflow.**</p>
</div>

## Pantheon Examples
Pantheon maintains the following `composer.json` files within Composer based repositories:
* [WordPress](https://github.com/pantheon-systems/example-wordpress-composer/blob/master/composer.json)
* [Drupal 8](https://github.com/pantheon-systems/example-drops-8-composer/blob/master/composer.json)
* [Drupal 7](https://github.com/pantheon-systems/example-drops-7-composer/blob/master/composer.json)

## Minimum Stability
Pantheon uses "alpha"
Learn more from Composer docs: https://getcomposer.org/doc/04-schema.md#minimum-stability

## Repositories
The default Composer repository is https://packagist.org. Any package here can be declared as a dependency by name.
If you wish to use a package that is not in the default Packagist repository you must declare additional repositories.

This allows Composer to look up projects (themes, modules, etc.) from Drupal.org:

```json
"repositories": [
  {
    "type": "composer",
    "url": "https://packages.drupal.org/8"
  }
],
```

## Require
`composer require` will add the given package to the `composer.json` file as a dependency, which can then be installed using composer install

For example: `composer require “<package> <version>”`
## Require Dev
This section is used to declare dependencies required during the development of a project. This avoids sending dead code out to production unnecessarily. For example, phpunit:

```json
"phpunit/phpunit": "^6.1",
```

## Config
Define where to install code that is not part of the site framework:

```json
"config": {
  "vendor-dir": "vendor"
},
```
## Extra
### Installation Paths
### Preserve Paths
### Build Commands
## Autoload
## Scripts
## Composer.lock
The composer.lock file that gets generated when you run composer update does just what the name implies - locks in specific dependency versions.

This way until composer update is deliberately ran and a new composer.lock is generated you will deploy consistent versions to production.
