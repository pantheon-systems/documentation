---
title: Upgrade PHP Versions
description: Learn how to upgrade PHP versions to resolve  compatibility issues.
tags: [pantheonyml, services]
categories: []
---
Upgrading your site's PHP version will improve the security, performance, and supportability of your site. See our blog post for an [example of 62% performance gains after upgrading](https://pantheon.io/blog/php-7-now-available-all-sites-pantheon).

## Before You Begin
Older software is more likely to contain code that is incompatible with recent PHP versions. Before you change your PHP version:

- Update core to the latest release. For details, see [WordPress and Drupal Core Updates](/docs/core-updates/).
- Update themes, plugins, and modules. For details, see [Working in the WordPress Dashboard and Drupal Admin Interface](/docs/cms-admin/).

## Verify Current PHP Versions
Verify current PHP settings from the Site Dashboard by clicking **Settings** > **PHP version**.

<div class="alert alert-info" role="alert" markdown="1">
#### Note {.info}
Changes made to the `pantheon.yml` file on a branch **are not** detected when creating the Multidev environment for that branch. See [Deploying Configuration Changes to Multidev](/docs/pantheon-yml/#deploying-configuration-changes-to-multidev) for more information.
</div>

### Available PHP Versions
The recommended PHP versions available on Pantheon are:

- [7.3](https://v73-php-info.pantheonsite.io/){.external}
- [7.2](https://v72-php-info.pantheonsite.io/){.external}
- [7.1](https://v71-php-info.pantheonsite.io/){.external}

Click on the links above to see the complete PHP info for each version, including the list of supported PHP extensions.

### EOL PHP Versions
Pantheon also makes PHP [7.0](https://v70-php-info.pantheonsite.io/){.external}, [5.6](https://v56-php-info.pantheonsite.io/){.external}, [5.5](https://v55-php-info.pantheonsite.io/){.external}, and [5.3](https://v53-php-info.pantheonsite.io/){.external} available on the platform, although these are end-of-life (**EOL**), and should not be used unless absolutely necessary.

<div markdown="1" class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p markdown="1">Before changing your PHP version, confirm that your CMS is compatible:</p>

* [WordPress Requirements](https://wordpress.org/about/requirements/){.external}
* [Drupal 8 PHP versions supported](https://www.drupal.org/docs/8/system-requirements/php-requirements#php_required){.external}
* [Drupal 7 PHP versions supported](https://www.drupal.org/docs/7/system-requirements/drupal-7-php-requirements#php_required){.external}
* As of Drupal 6.45, Drupal 6 is [compatible with PHP 7.2](https://www.mydropwizard.com/blog/announcing-drupal-645-and-selected-contrib-php-72){.external}. Older versions of Drupal 6 require PHP 5.4 and below.
</p></div>

## Configure PHP Version
Manage PHP versions by committing a `pantheon.yml` configuration file to the root of your site's code repository. If you have a local git clone of your site, this is the project root. When looking at the site over an SFTP connection, look in the `code` directory. If the `pantheon.yml` file is not present, create one to look like the following:

```yaml
api_version: 1

php_version: 7.0
```

You do not need to specify the PHP version's exact point release (e.g, `7.2.6`), as these are managed by the platform and deployed automatically.

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

<div markdown="1" class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p markdown="1">Changes to `pantheon.yml` [deployed as hotfixes](/docs/pantheon-yml#deploying-hotfixes) are not detected.</p>
</div>

#### SFTP Mode

When you upload a new or modified `pantheon.yml` file in SFTP mode, your site dashboard will detect the changes:

![The Site Dashboard sees changes to pantheon.yml](/source/docs/assets/images/dashboard/pantheon-yml-changes-sftp.png)

If the contents of `pantheon.yml` are valid, you can commit normally. If there is a problem with the file, the dashboard will fail to commit and display the error. In the example below we've attempted to set the PHP version to 12:

![The Site Dashboard doesn't commit invalid changes](/source/docs/assets/images/dashboard/pantheon-yml-failure-sftp.png)

## Troubleshoot Post-Upgrade Errors

### Resolve PHP Version Compatibility Issues

We recommend working with theme, module, or plugin maintainers to resolve any issues upstream. For custom code, see the corresponding Backward Incompatible Changes documentation in the [PHP Manual](https://secure.php.net/manual/en/appendices.php) for migrating from one PHP version to another.

### Upgrading PHP Version May Require Upgrading Drush Versions

If you see errors on the Pantheon Dashboard when trying to auto-run `update.php`, for example, upgrading Drush should resolve the issue. For more information, see [Manage Drush Versions on Pantheon](https://pantheon.io/docs/drush-versions/#configure-drush-version).



## See Also

* [PHP Supported Versions](https://secure.php.net/supported-versions.php)
* [Drupal specific version notes on PHP requirements](https://www.drupal.org/requirements/php#drupalversions) and [WordPress Requirements](https://wordpress.org/about/requirements/)
* [Log Files on Pantheon](/docs/logs)
* [PHP Errors and Exceptions](/docs/php-errors/)
* [The pantheon.yml Configuration File](/docs/pantheon-yml/)
* [Securely Working with phpinfo](/docs/phpinfo/)
* [php.net - Backward Incompatible Changes](https://secure.php.net/manual/en/migration70.incompatible.php)
* [Debug Intermittent PHP 7 Notices](/docs/deprecated-constructor-notices)
