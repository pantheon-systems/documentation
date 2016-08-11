---
title: Upgrade PHP Versions
description: Learn how to upgrade PHP versions to resolve  compatibility issues.
categories: [managing]
tags: [code, platform]
keywords: php, php version, php versions, how to change php version,  change php version, update php version, downgrade php version, switch php version
---
Upgrading your site's PHP version will improve the security, performance, and supportability of your site. See our blog post for an [example of 20% performance gains after upgrading](https://pantheon.io/blog/choose-your-own-php-adventure-php-55-now-available-20-performance-gains).

## Verify Current PHP Versions
Verify current PHP settings from the Site Dashboard by clicking **Settings** > **PHP version**.

## Configure PHP Version
PHP versions are managed in version control via the `pantheon.yml` configuration file in the root directory of your code repository. Configure the PHP version by including a line like:

```php
php_version: 5.6
```

Configuration changes take effect once modifications to the `pantheon.yml` file have been committed and deployed to an environment.

For more information, see [The pantheon.yml Configuration File](/docs/pantheon-yml/).

### Available PHP Versions
Available PHP versions are 5.3, 5.5 (default), 5.6, and 7.0.

<div class="alert alert-info" role="alert">
<h4>Note</h4>
Drupal 6 sites are only compatible with PHP 5.4 and below.
</div>

## Resolve PHP Version Compatibility Issues

We recommend working with theme, module, or plugin maintainers to resolve any issues upstream. For custom code, see the Backward Incompatible Changes documentation in the [PHP Manual](http://php.net/manual/en/appendices.php) for migrating from one PHP version to another.

## See Also

* [PHP Supported Versions](http://php.net/supported-versions.php)
* [Drupal specific version notes on PHP requirements](https://www.drupal.org/requirements/php#drupalversions) and [WordPress Requirements](https://wordpress.org/about/requirements/)
* [Debugging Sites with Log Files](/docs/debug-log-files/)
* [PHP Errors and Exceptions](/docs/php-errors/)
* [Securely Working with phpinfo](/docs/phpinfo/)
