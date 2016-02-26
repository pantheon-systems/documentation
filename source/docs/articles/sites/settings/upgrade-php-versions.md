---
title: Upgrade PHP Versions
description: Learn how to upgrade PHP versions to resolve  compatibility issues.
category:
  - developing
keywords: php, php version, php versions, how to change php version, toggle php version, change php version, update php version, downgrade php version, switch php version
---
Upgrading your site's PHP version will improve the security, performance, and supportability of your site. See our blog post for an [example of 20% performance gains after upgrading](https://pantheon.io/blog/choose-your-own-php-adventure-php-55-now-available-20-performance-gains).
## Verify Current PHP Versions
Current PHP Versions for site environments can be verified from the site Dashboard within **Settings** > **PHP version**. The site default PHP version will be applied to every environment unless a PHP version for that environment is explicitly selected.

![PHP Versions](/source/docs/assets/images/php-versions.png)

## Upgrade PHP Versions

<div class="alert alert-info" role="alert">
<h4>Note</h4>
Running different versions of PHP per environment is risky and should only be done while you resolve compatibility issues. If you are not working on PHP version compatibility specifically, you should restore all environments to the default value.
</div>

1. Use [Terminus](/docs/articles/local/cli) to temprarily set Dev or Multidev envirnoment to the newer version of PHP: `terminus site set-php-version --env=<dev|multidev> --site=<site>`

 _Verify the version of an environment in the site Dashboard or with Terminus: `terminus site environment-info`_

2. Resolve any PHP version compatibility issues or warnings in Dev or Multidev.
3. Temporarily set Test to the newer version of PHP and deploy there for a final check.
4. Set the **Site Default** to the newer version and deploy your compatibility changes (if any) to Live.
5. Restore all environments to `Site Default` to ensure they remain the same and you’re ready for the next update.

## Resolve PHP Version Compatibility Issues

We recommend working with theme, module, or plugin maintainers to resolve any issues upstream. For custom code, see the **Backward Incompatible Changes documentation** in the [PHP Manual](http://php.net/manual/en/appendices.php) for migrating from one PHP version to another.

## See Also

* [PHP Supported Versions](http://php.net/supported-versions.php)
* [Drupal specific version notes on PHP requirements](https://www.drupal.org/requirements/php#drupalversions) and [WordPress Requirements](https://wordpress.org/about/requirements/)
* [Debugging Sites with Log Files](/docs/articles/sites/logs/debugging-sites-with-log-files/)
* [PHP Errors and Exceptions](/docs/articles/sites/php-errors-and-exceptions/)
* [Securely Working with phpinfo](/docs/articles/sites/secure-phpinfo/)
