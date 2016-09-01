---
title: Upgrade PHP Versions
description: Learn how to upgrade PHP versions to resolve  compatibility issues.
categories: [managing]
tags: [code, platform]
keywords: php, php version, php versions, how to change php version,  change php version, update php version, downgrade php version, switch php version
---
Upgrading your site's PHP version will improve the security, performance, and supportability of your site. See our blog post for an [example of 62% performance gains after upgrading](https://pantheon.io/blog/php-7-now-available-all-sites-pantheon).

## Verify Current PHP Versions
Verify current PHP settings from the Site Dashboard by clicking **Settings** > **PHP version**.

## Configure PHP Version
Manage PHP versions by committing a `pantheon.yml` configuration file to the root of your site's code repository. Your `pantheon.yml` file will look like the following:

```yaml
api_version: 1

php_version: 7.0
```

Now your site’s PHP version is managed via `pantheon.yml`, so it’s in version control and deployed along with the rest of your code.


### Available PHP Versions
Available PHP versions are 5.3, 5.5, 5.6, and 7.0.

<div class="alert alert-info" role="alert">
<h4>Note</h4>
Drupal 6 sites are only compatible with PHP 5.4 and below.
</div>

## Resolve PHP Version Compatibility Issues

We recommend working with theme, module, or plugin maintainers to resolve any issues upstream. For custom code, see the Backward Incompatible Changes documentation in the [PHP Manual](http://php.net/manual/en/appendices.php) for migrating from one PHP version to another.

## Troubleshooting

### Upgrading PHP Version May Require Upgrading Drush Versions

If you see errors on the Pantheon Dashboard when trying to auto-run `update.php`, for example, upgrading Drush should resolve the issue. For more information, see [Manage Drush Versions on Pantheon](https://pantheon.io/docs/drush-versions/#modifying-default-drush-version).



## See Also

* [PHP Supported Versions](http://php.net/supported-versions.php)
* [Drupal specific version notes on PHP requirements](https://www.drupal.org/requirements/php#drupalversions) and [WordPress Requirements](https://wordpress.org/about/requirements/)
* [Debugging Sites with Log Files](/docs/debug-log-files/)
* [PHP Errors and Exceptions](/docs/php-errors/)
* [The pantheon.yml Configuration File](/docs/pantheon-yml/)
* [Securely Working with phpinfo](/docs/phpinfo/)
* [Learn 5 New Features in PHP 7](http://blog.teamtreehouse.com/5-new-features-php-7)
* [Php.net Backward incompatible changes](http://php.net/manual/en/migration70.incompatible.php)
