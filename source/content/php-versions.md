---
title: Upgrade PHP Versions
description: Learn how to upgrade PHP versions to resolve  compatibility issues.
tags: [libraries, updates]
categories: [platform]
reviewed: "2020-05-05"
---

Upgrading your site's PHP version will improve the security, performance, and supportability of your site. See our blog post for an [example of 62% performance gains after upgrading](https://pantheon.io/blog/php-7-now-available-all-sites-pantheon).

## Before You Begin

Older software is more likely to contain code that is incompatible with recent PHP versions. Before you change your PHP version:

- Update core to the latest release. For details, see [WordPress and Drupal Core Updates](/core-updates).
- Update themes, plugins, and modules. For details, see [Working in the WordPress Dashboard and Drupal Admin Interface](/cms-admin).

## Verify Current PHP Versions

Verify current PHP settings from the Site Dashboard by clicking **Settings** > **PHP version**.

<Alert title="Note" type="info">

Changes made to the `pantheon.yml` file on a branch **are not** detected when creating the Multidev environment for that branch. See [Deploying Configuration Changes to Multidev](/pantheon-yml/#deploying-configuration-changes-to-multidev) for more information.

</Alert>

### All PHP Versions

<ReviewDate date="2022-04-06" />

| Version                                      | Recommended |  Status |
| --------------------------------------------:|:-----------:| ------- |
| [8.1](https://v81-php-info.pantheonsite.io/)| ➖ | Available <Popover title="Compatibility Note" content="WordPress is not fully compatible with PHP 8.1. New Relic is not supported in PHP 8.1." /> |
| [8.0](https://v80-php-info.pantheonsite.io/) | ✅          | Active <Popover title="Compatibility Note" content="WordPress is not fully compatible with PHP 8.0." /> |
| [7.4](https://v74-php-info.pantheonsite.io/) | ✅          | Active  |
| [7.3](https://v73-php-info.pantheonsite.io/) | ⚠️          | EOL     |
| [7.2](https://v72-php-info.pantheonsite.io/) | ⚠️          | EOL     |
| [7.1](https://v71-php-info.pantheonsite.io/) | ⚠️          | EOL     |
| [7.0](https://v70-php-info.pantheonsite.io/) | ⚠️          | EOL     |
| [5.6](https://v56-php-info.pantheonsite.io/) | ⚠️          | EOL |
| [5.5](https://v55-php-info.pantheonsite.io/) | ❌          | End-of-Sale |
| [5.3](https://v53-php-info.pantheonsite.io/) | ❌          | End-of-Sale * |

Click on the links above to see the complete PHP info for each version, including the list of supported PHP extensions.

<dl>

<dt>EOL</dt>

<dd>

End-of-life (**EOL**) versions are available on the platform but no longer receiving updates, and should not be used unless absolutely necessary.

</dd>

</dl>

<dl>

<dt>End-of-Sale</dt>

<dd>

End-of-Sale versions are no longer available to new sites on the platform.  Existing sites using these versions will be automatically upgraded in the future.

</dd>

</dl>

\* Sites that use PHP version 5.3 will continue to serve pages. However, new development cannot be done because the development environment behavior is undefined and no longer supported. You can upgrade your PHP version in the development environment to resume development on your site. 

#### Compatibility Considerations

New Relic is not supported in PHP 8.1

WordPress is not fully compatible with PHP 8.0 or PHP 8.1 and deprecation notices remain in WordPress 5.9. With a deprecation notice, the PHP code will continue to work for supported entities until a future release. 

You can follow the development updates for WordPress with PHP 8.0 and PHP 8.1 on the [WordPress core](https://make.wordpress.org/core/2022/01/10/wordpress-5-9-and-php-8-0-8-1/) site.

### CMS Version Requirements

Before changing your PHP version, confirm that your CMS is compatible:

- [WordPress Requirements](https://wordpress.org/about/requirements/)
- [Drupal 9 PHP version support](https://www.drupal.org/docs/system-requirements/php-requirements#php_required)
- [Drupal 7 PHP version support](https://www.drupal.org/docs/7/system-requirements/php-requirements#php_required)

## Configure PHP Version

PHP versions can be set using the `pantheon.yml` configuration file in the root of your site's code repository. If you have a local git clone of your site, the project root is `/code/`.

> **`pantheon.yml` is used to store your custom settings that override those in `pantheon.upstream.yml`.**

You must use SFTP to create or change the `pantheon.yml` file. You will receive a pre-receive hook error if you try to use the `git push` command in Git. Follow the steps below to create or change your `pantheon.yml` file.

1. Navigate to the Pantheon dashboard > click the **Dev** environment tab > set the **Development Mode** to **SFTP**.

1. Use the credentials under the **Connect with SFTP** to connect your preferred SFTP client to Pantheon.

1. Check the `/code` directory for the `pantheon.yml` file and create one if it is not already present:

   ```yaml:title=pantheon.yml
   api_version: 1
   
   php_version: 8.0
   ```
   
   - You do not need to specify the PHP version's exact point release (e.g, `7.2.6`), as these are managed by the platform and deployed automatically.
   
1. Refresh the **Dev** environment tab >  click `/code` directory >  verify that the `pantheon.yml` file has been created.

1. Enter a commit message and click **Commit changes**.

1. Refresh the **Dev** environment tab > verify that the `pantheon.yml` file is now committed to the `master branch`.

1. Set the **Development Mode** to **Git**.

1. Pull down the changes to your local repo (if you have one). 

Now your site’s PHP version is determined via `pantheon.yml`, and managed in version control. The next time you [push your changes](/git#push-changes-to-pantheon) back to Pantheon, your site will begin using the newly specified PHP version.

Note that you will need to rebase any non-`master` branches and remove their remote versions, then re-push the branches to avoid the Git pre-receive error.

```none
remote: PANTHEON ERROR:
remote:
remote: Changes to `pantheon.yml` detected, but there was an error while processing it:
remote:
remote:
remote: Validation failed with error:
remote: >   8.0 is not one of [5.3, 5.5, 5.6, 7.0]
```

Modify `pantheon.yml` until valid and commit the fix before attempting to push again.

<Alert title="Note" type="info">

Changes to `pantheon.yml` [deployed as hotfixes](/pantheon-yml#deploying-hotfixes) are not detected.

</Alert>

#### SFTP Mode

Your site dashboard will detect the changes when you upload a new or modified `pantheon.yml` file in SFTP mode.

![The Site Dashboard sees changes to pantheon.yml](../images/dashboard/pantheon-yml-changes-sftp.png)

If the contents of `pantheon.yml` are valid, you can commit normally. If there is a problem with the file, the dashboard will fail to commit and display the error. In the example below we've attempted to set the PHP version to 12:

![The Site Dashboard doesn't commit invalid changes](../images/dashboard/pantheon-yml-failure-sftp.png)

## Troubleshoot Post-Upgrade Errors

### Resolve PHP Version Compatibility Issues

We recommend working with theme, module, or plugin maintainers to resolve any issues upstream. For custom code, see the corresponding Backward Incompatible Changes documentation in the [PHP Manual](https://secure.php.net/manual/en/appendices.php) for migrating from one PHP version to another.

### Upgrading PHP Version May Require Upgrading Drush Versions

If you see errors on the Pantheon Dashboard when trying to auto-run `update.php`, for example, upgrading Drush should resolve the issue. For more information, see [Manage Drush Versions on Pantheon](/drush-versions/#configure-drush-version).

## See Also

- [PHP Supported Versions](https://secure.php.net/supported-versions.php)
- [Drupal specific version notes on PHP requirements](https://www.drupal.org/requirements/php#drupalversions) and [WordPress Requirements](https://wordpress.org/about/requirements/)
- [Log Files on Pantheon](/logs)
- [PHP Errors and Exceptions](/php-errors)
- [The pantheon.yml Configuration File](/pantheon-yml)
- [Securely Working with phpinfo](/phpinfo)
- [php.net - Backward Incompatible Changes](https://secure.php.net/manual/en/migration70.incompatible.php)
- [Debug Intermittent PHP 7 Notices](/deprecated-constructor-notices)
