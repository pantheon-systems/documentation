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

<Alert title="Note" type="info">

Changes to `pantheon.yml` [deployed as hotfixes](/pantheon-yml#deploying-hotfixes) are not detected.

</Alert>

## Verify Your Current PHP Version

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
| [7.3](https://v73-php-info.pantheonsite.io/) | ❌          | EOL     |
| [7.2](https://v72-php-info.pantheonsite.io/) | ❌          | EOL     |
| [7.1](https://v71-php-info.pantheonsite.io/) | ❌          | EOL     |
| [7.0](https://v70-php-info.pantheonsite.io/) | ❌          | EOL     |
| [5.6](https://v56-php-info.pantheonsite.io/) | ❌          | EOL |
| [5.5](https://v55-php-info.pantheonsite.io/) | 🚫          | End-of-Sale <Popover title="End-of-Sale" content="End-of-Sale versions are no longer available to new sites on the platform. Existing sites using these versions will be automatically upgraded in the future." /> |
| [5.3](https://v53-php-info.pantheonsite.io/) | 🚫          | End-of-Sale <Popover title="End-of-Sale" content="End-of-Sale versions are no longer available to new sites on the platform. Existing sites using these versions will be automatically upgraded in the future. To resume development on a site using a retired version of PHP, upgrade the PHP version on the development environment." />* |

Click on the links above to see the complete PHP info for each version, including the list of supported PHP extensions.

<dl>

<dt>❌ EOL</dt>

<dd>

End-of-life (**EOL**) versions are available on the platform but no longer receiving updates, and should not be used unless absolutely necessary.

</dd>

</dl>

<dl>

<dt>🚫 End-of-Sale</dt>

<dd>

End-of-Sale versions are no longer available to new sites on the platform. Existing sites using these versions will be automatically upgraded in the future.

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

## Configure Your PHP Version

PHP versions can be set using the `pantheon.yml` configuration file in the root of your site's code repository.

Configurations made in `pantheon.yml` will override custom settings in `pantheon.upstream.yml`.

You can use SFTP or Git mode to create or change the `pantheon.yml` file. Follow the steps below to create or change your `pantheon.yml` file.

<TabList>

<Tab title="SFTP Mode" id="sftp-steps" active={true}>

1. Navigate to the Site dashboard > click **Dev**.

1. Select **SFTP** as your **Development Mode**.

1. Use the credentials under **Connect with SFTP** to connect your preferred SFTP client to Pantheon.

1. Check the `/code` directory for the `pantheon.yml` file (or create one if it is not already present) and alter it to include the desired PHP version.

   ```yaml:title=pantheon.yml
   api_version: 1

   php_version: 8.0
   ```

   - You do not need to specify the PHP version's exact point release (e.g, `8.0.19`), as these are managed by the platform and deployed automatically.

1. Navigate to your SFTP client and refresh the `/code` directory to verify that the `pantheon.yml` file has been created and contains the changed version.

1. Navigate to the Site dashboard and refresh the **Dev** environment tab to verify that the `pantheon.yml` file is available to commit.

1. Enter a commit message and click **Commit changes**.

1. Refresh the **Dev** environment tab and verify that the `pantheon.yml` file is now committed to the `master` branch.

1. Pull changes to your local repository (if you have one).

   - Now your site’s PHP version is determined via `pantheon.yml`, and managed in version control. The next time you [push your changes](/guides/git/git-config#push-changes-to-pantheon) back to Pantheon, your site will begin using the newly specified PHP version.

Your site dashboard will detect the changes when you upload a new or modified `pantheon.yml` file in SFTP mode.

![The Site Dashboard sees changes to pantheon.yml](../images/dashboard/pantheon-yml-changes-sftp.png)

If the contents of `pantheon.yml` are valid, you can commit normally. If there is a problem with the file, the dashboard will fail to commit and display the error. The example below shows a failed attempt to set the PHP version to 12:

![The Site Dashboard doesn't commit invalid changes](../images/dashboard/pantheon-yml-failure-sftp.png)

</Tab>

<Tab title="Git Mode" id="git-steps">

1. Navigate to the Site dashboard > click **Dev**.

1. Select **Git** as your **Development Mode**.

1. Follow the steps in [Clone Your Site Codebase](/guides/git/git-config#clone-your-site-codebase) if you have not yet cloned the repository to your local computer.

1. Navigate to your **pantheon.yml** file and edit the `php_version` with the version of PHP you are upgrading to. If the file does not yet exist, it should be created.

   ```yaml:title=pantheon.yml
   api_version: 1

   php_version: 8.0
   ```

   - You do not need to specify the PHP version's exact point release (e.g, `8.0.19`), as these are managed by the platform and deployed automatically.

1. Add and commit the changes and push them to your site.

1. Rebase any non-`master` branches to ensure they are on the same PHP version if there are any Multidev environments that also need the same change.

If an invalid version is specified there will be an error when trying to push changes:

   ```none
   remote: PANTHEON ERROR:
   remote:
   remote: Changes to `pantheon.yml` detected, but there was an error while processing it:
   remote:
   remote:
   remote: Validation failed with error:
   remote: >   12.0 is not one of [5.6, 7.0, 7.1, 7.2, 7.3, 7.4, 8.0, 8.1]
   ```

Modify the `pantheon.yml` file until it is valid and commit the fix before attempting to push again.

</Tab>

</TabList>


## Troubleshoot Post-Upgrade Errors

### Resolve PHP Version Compatibility Issues

We recommend working with theme, module, or plugin maintainers to resolve any issues upstream. For custom code, see the corresponding Backward Incompatible Changes documentation in the [PHP Manual](https://secure.php.net/manual/en/appendices.php) for migrating from one PHP version to another.

### Upgrading PHP Version May Require Upgrading Drush Versions

If you see errors on the Pantheon Dashboard when trying to auto-run `update.php`, for example, upgrading Drush should resolve the issue. For more information, see [Manage Drush Versions on Pantheon](/drush-versions/#configure-drush-version).

## More Resources

- [PHP Supported Versions](https://secure.php.net/supported-versions.php)
- [Drupal specific version notes on PHP requirements](https://www.drupal.org/requirements/php#drupalversions) and [WordPress Requirements](https://wordpress.org/about/requirements/)
- [Log Files on Pantheon](/logs)
- [PHP Errors and Exceptions](/php-errors)
- [The pantheon.yml Configuration File](/pantheon-yml)
- [Securely Working with phpinfo](/phpinfo)
- [php.net - Backward Incompatible Changes](https://secure.php.net/manual/en/migration70.incompatible.php)
- [Debug Intermittent PHP 7 Notices](/deprecated-constructor-notices)
