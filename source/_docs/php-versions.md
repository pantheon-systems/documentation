---
title: Upgrade PHP Versions
description: Learn how to upgrade PHP versions to resolve  compatibility issues.
tags: [pantheonyml, services]
categories: []
---
Upgrading your site's PHP version will improve the security, performance, and supportability of your site. See our blog post for an [example of 62% performance gains after upgrading](https://pantheon.io/blog/php-7-now-available-all-sites-pantheon).

## Verify Current PHP Versions
Verify current PHP settings from the Site Dashboard by clicking **Settings** > **PHP version**.

### Available PHP Versions
Available PHP versions are 5.3, 5.5, 5.6, and 7.0.

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p>Drupal 6 sites are only compatible with PHP 5.4 and below.
</p></div>

## Upgrade Your Site
Before you change your PHP version, ensure that your CMS and all of your themes, modules and plugins are up-to-date. Older software is more likely to contain code that is incompatible with recent PHP versions.

## Configure PHP Version
Manage PHP versions by committing a `pantheon.yml` configuration file to the root of your site's code repository. When using SFTP mode, navigate to the `code` directory. Your `pantheon.yml` file will look like the following:

```yaml
api_version: 1

php_version: 7.0
```

Now your site’s PHP version is determined via `pantheon.yml`, and managed in version control.

The next time you [push your changes](/docs/git#push-changes-to-pantheon) back to Pantheon, your site will begin using the newly specified PHP version.

### Verify Changes

#### Git Mode

The first place to determine if your changes have been successful is the output from your `git push` command. A correct implementation will return:

```
remote: PANTHEON NOTICE:
remote:
remote: Changes to `pantheon.yml` detected.
remote:
remote: Successfully applied `pantheon.yml` to the 'dev' environment.
```
<br>
If you have an invalid `pantheon.yml` file, the `git push` operation will fail and your commit will be rejected. In this example, we've set an unavailable PHP version:

```
remote: PANTHEON ERROR:
remote:
remote: Changes to `pantheon.yml` detected, but there was an error while processing it:
remote:
remote:
remote: Validation failed with error:
remote: >   8.0 is not one of [5.3, 5.5, 5.6, 7.0]
```

Modify `pantheon.yml` until valid and commit the fix before attempting to push again.

#### SFTP Mode

When you upload a new or modified `pantheon.yml` file in SFTP mode, your side dashboard will detect the changes:

![The Site Dashboard sees changes to pantheon.yml](/source/docs/assets/images/dashboard/pantheon-yml-changes-sftp.png)

If the contents of `pantheon.yml` are valid, you can commit normally. If there is a problem with the file, the dashboard will fail to commit and display the error. In the example below we've attempted to set the PHP version to 12:

![The Site Dashboard doesn't commit invalid changes](/source/docs/assets/images/dashboard/pantheon-yml-failure-sftp.png)

## Troubleshoot Post-Upgrade Errors

### Resolve PHP Version Compatibility Issues

We recommend working with theme, module, or plugin maintainers to resolve any issues upstream. For custom code, see the corresponding Backward Incompatible Changes documentation in the [PHP Manual](http://php.net/manual/en/appendices.php) for migrating from one PHP version to another.

### Upgrading PHP Version May Require Upgrading Drush Versions

If you see errors on the Pantheon Dashboard when trying to auto-run `update.php`, for example, upgrading Drush should resolve the issue. For more information, see [Manage Drush Versions on Pantheon](https://pantheon.io/docs/drush-versions/#configure-drush-version).



## See Also

* [PHP Supported Versions](http://php.net/supported-versions.php)
* [Drupal specific version notes on PHP requirements](https://www.drupal.org/requirements/php#drupalversions) and [WordPress Requirements](https://wordpress.org/about/requirements/)
* [Log Files on Pantheon](/docs/logs)
* [PHP Errors and Exceptions](/docs/php-errors/)
* [The pantheon.yml Configuration File](/docs/pantheon-yml/)
* [Securely Working with phpinfo](/docs/phpinfo/)
* [php.net - Backward Incompatible Changes](http://php.net/manual/en/migration70.incompatible.php)
* [Debug Intermittent PHP 7 Notices](/docs/deprecated-constructor-notices)
