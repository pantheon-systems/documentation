---
title: PHP on Pantheon
subtitle: Upgrade PHP Versions
description: Learn how to upgrade PHP versions to resolve  compatibility issues.
tags: [libraries, updates]
contenttype: [guide]
innav: [false]
categories: [php]
cms: [--]
audience: [development]
product: [--]
integration: [--]
contributors: [whitneymeredith]
showtoc: true
permalink: docs/guides/php/php-versions
reviewed: "2022-12-13"
---

This section provides information on how to upgrade to [a supported version of PHP](/guides/php##supported-php-versions).

Upgrading your site's PHP version will improve the security, performance, and supportability of your site. Refer to our blog post for an [example of 62% performance gains after upgrading PHP](https://pantheon.io/blog/php-7-now-available-all-sites-pantheon).

## Before You Begin

Older software is more likely to contain code that is incompatible with recent PHP versions. Before you upgrade your PHP version:

- Update core to the latest release. Refer to [WordPress and Drupal Core Updates](/core-updates) for more details.
- Update your themes, plugins, and modules. 

<Alert title="Note" type="info">

Changes to `pantheon.yml` [deployed as hotfixes](/pantheon-yml#deploying-hotfixes) are not detected.

</Alert>

## Verify Your Current PHP Version

[Go to the Site Dashboard](/guides/account-mgmt/workspace-sites-teams/sites#site-dashboard) and click **Settings**, and then click **PHP version** to verify your PHP version.

<Alert title="Note" type="info">

Changes made to the `pantheon.yml` file on a branch **are not** detected when creating the Multidev environment for that branch. Refer to [Why can’t I update the PHP version on my Multidev?](/pantheon-yml/#why-cant-i-update-the-php-version-on-my-multidev) for more information.

</Alert>

### CMS Version Requirements

Confirm that your CMS is compatible before changing your PHP version. 

- [WordPress requirements](https://wordpress.org/about/requirements/)
- [Drupal (Latest Version) PHP version support](https://www.drupal.org/docs/system-requirements/php-requirements#php_required)
- [Drupal 7 PHP version support](https://www.drupal.org/docs/7/system-requirements/php-requirements#php_required)

## Configure Your PHP Version

PHP versions can be set using the `pantheon.yml` configuration file in the root of your site's code repository.

Configurations made in `pantheon.yml` will override custom settings in `pantheon.upstream.yml`.

You can use SFTP or Git mode to create or change the `pantheon.yml` file. Follow the steps below to create or change your `pantheon.yml` file.

<TabList>

<Tab title="SFTP Mode" id="sftp-steps" active={true}>

1. [Go to the Site Dashboard](/guides/account-mgmt/workspace-sites-teams/sites#site-dashboard) and click **Dev**.

1. Select **SFTP** as your **Development Mode**.

1. Use the credentials under **Connect with SFTP** to connect to your preferred SFTP client to Pantheon.

1. Check the `/code` directory for the `pantheon.yml` file (or create one if it is not already present) and edit it to include the desired PHP version.

   ```yaml:title=pantheon.yml
   api_version: 1

   php_version: 8.1
   ```

   - You do not need to specify the PHP version's exact point release (for example, `8.1.10`), as these are managed by the platform and deployed automatically.

1. Navigate to your SFTP client and refresh the `/code` directory to verify that the `pantheon.yml` file has been created and contains the changed version.

1. [Go to the Site Dashboard](/guides/account-mgmt/workspace-sites-teams/sites#site-dashboard) and refresh the **Dev** environment tab to verify that the `pantheon.yml` file is available to commit.

1. Enter a commit message and click **Commit changes**.

1. Refresh the **Dev** environment tab and verify that the `pantheon.yml` file is now committed to the `master` branch.

1. Pull changes to your local repository (if you have one).

   - Now your site’s PHP version is determined via `pantheon.yml`, and managed in version control. The next time you [push your changes](/guides/git/git-config#push-changes-to-pantheon) to Pantheon, your site will begin using the newly specified PHP version.

Your Site Dashboard will detect the changes when you upload a new or modified `pantheon.yml` file in SFTP mode.

![The Site Dashboard sees changes to pantheon.yml](../../../images/dashboard/pantheon-yml-changes-sftp.png)

If the contents of `pantheon.yml` are valid, you can commit normally. If there is a problem with the file, the dashboard will fail to commit and display the error. The example below shows a failed attempt to set the PHP version to 12:

![The Site Dashboard doesn't commit invalid changes](../../../images/dashboard/pantheon-yml-failure-sftp.png)

</Tab>

<Tab title="Git Mode" id="git-steps">

1. [Go to the Site Dashboard](/guides/account-mgmt/workspace-sites-teams/sites#site-dashboard) and click **Dev**.

1. Select **Git** as your **Development Mode**.

1. Follow the steps in [Clone Your Site Codebase](/guides/git/git-config#clone-your-site-codebase) if you have not yet cloned the repository to your local computer.

1. Navigate to your `pantheon.yml` file and edit the `php_version` with the version of PHP you are upgrading to. If the file does not yet exist, it should be created.

   ```yaml:title=pantheon.yml
   api_version: 1

   php_version: 8.1
   ```

   - You do not need to specify the PHP version's exact point release (for example, `8.1.10`), as these are managed by the platform and deployed automatically.

1. Add and commit the changes and push them to your site.

1. Rebase any non-`master` branches to ensure they are on the same PHP version if there are any Multidev environments that also need the same change.

You will see an error when trying to push changes if an invalid version is specified: 

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

### Multidev PHP Configuration

PHP version changes (and other configuration changes) are automatically detected when you modify the `pantheon.yml` file of a site with a pre-existing Multidev. A PHP version change will not appear in a Multidev created after your `pantheon.yml` changes are made.

#### Change the PHP Version on an Existing Multidev

Follow the steps to [Configure Your PHP Version](#configure-your-php-version). Your Multidev configuration will automatically detect and apply the PHP version change from the `pantheon.yml` file.

#### Change the PHP Version on a New Multidev

You must make an additional modification to your `pantheon.yml` file to initiate the PHP version update in your Multidev if you created a new branch and added a Multidev after configuring your PHP version in the `pantheon.yml` file.

1. Navigate to [your `pantheon.yml` file](#configure-your-php-version).

1. Modify your `pantheon.yml` file and re-commit to the Multidev.

  - It does not matter what change you make to the file. Any change- even a comment- will allow the Multidev to detect the configuration change. You will receive a notice indicating configuration changes have been detected and applied to the Multidev environment:

```none
remote:
remote: PANTHEON NOTICE:
remote:
remote: Changes to `pantheon.yml` detected.
remote:
remote: Successfully applied `pantheon.yml` to the 'new-feature' environment.
remote:
remote:
```

## Troubleshoot Post-Upgrade Errors

### Resolve PHP Version Compatibility Issues

We recommend working with theme, module, or plugin maintainers to resolve any issues upstream. For custom code, refer to the corresponding Backward Incompatible Changes documentation in the [PHP Manual](https://secure.php.net/manual/en/appendices.php) for migrating from one PHP version to another.

### Upgrading PHP Version May Require Upgrading Drush Versions

Upgrade your current version of Drush if you see errors on the Pantheon Dashboard when trying to auto-run `update.php`. Refer to [Manage Drush Versions on Pantheon](/guides/drush/drush-versions/#configure-drush-version) for more information.

## More Resources

- [Drupal specific version notes on PHP requirements](https://www.drupal.org/requirements/php#drupalversions)

- [WordPress PHP Requirements](https://wordpress.org/about/requirements/)

- [Log Files on Pantheon](/guides/logs-pantheon)

- [The pantheon.yml Configuration File](/pantheon-yml)

- [php.net - Backward Incompatible Changes](https://secure.php.net/manual/en/migration70.incompatible.php)