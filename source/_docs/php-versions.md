---
title: Upgrade PHP Versions
description: Learn how to upgrade PHP versions to resolve  compatibility issues.
categories: [managing]
tags: [code, platform]
keywords: php, php version, php versions, how to change php version,  change php version, update php version, downgrade php version, switch php version
---
Upgrading your site's PHP version will improve the security, performance, and supportability of your site. See our blog post for an [example of 20% performance gains after upgrading](https://pantheon.io/blog/choose-your-own-php-adventure-php-55-now-available-20-performance-gains).

## Verify Current PHP Versions
Verify current PHP versions for site environments from the Site Dashboard by clicking **Settings** > **PHP version**. The site default PHP version is applied to every environment unless a PHP version for that environment is explicitly selected.

The available PHP versions are 5.3, 5.5, 5.6, and 7.0.

<div class="alert alert-info" role="alert">
<h4>Note</h4>
Running different versions of PHP per environment is risky and should only be done while you resolve compatibility issues. If you are not working on PHP version compatibility specifically, you should restore all environments to the default value.
</div>

## Configure the PHP Version via pantheon.yml

You can configure the PHP version in the `pantheon.yml` file so that it's managed in version control by adding a `pantheon.yml` file to the root of your codebase that includes a line like:

```
php_version: 5.6
```
For more information on configuring the `pantheon.yml` file, see [this article](/docs/pantheon-yml/).

## Resolve PHP Version Compatibility Issues

We recommend working with theme, module, or plugin maintainers to resolve any issues upstream. For custom code, see the Backward Incompatible Changes documentation in the [PHP Manual](http://php.net/manual/en/appendices.php) for migrating from one PHP version to another.

## See Also

* [PHP Supported Versions](http://php.net/supported-versions.php)
* [Drupal specific version notes on PHP requirements](https://www.drupal.org/requirements/php#drupalversions) and [WordPress Requirements](https://wordpress.org/about/requirements/)
* [Debugging Sites with Log Files](/docs/debug-log-files/)
* [PHP Errors and Exceptions](/docs/php-errors/)
* [Securely Working with phpinfo](/docs/phpinfo/)
