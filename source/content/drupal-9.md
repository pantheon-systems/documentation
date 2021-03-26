---
title: Drupal 9
description: Launch the latest Drupal on the Pantheon WebOps Platform.
categories: [get-started]
tags: [site]
contributors: [populist, edwardangert]
reviewed: "2020-12-02"
---

Drupal 9 includes many of the features and layout that Drupal 8 users are familiar with, and it removes deprecated code to help improve future Drupal development.

Drupal 9 updates Drupal’s underlying dependencies like [Symfony 4.4](https://symfony.com/releases/4.4) and [Twig 2](https://twig.symfony.com/doc/2.x/index.html), removes several deprecated API functions in favor of better options, and allows everyone running Drupal 8.8+ an easy upgrade path to Drupal 9 and beyond.

<Alert title="A note about Limited Availability" type="info" icon="leaf">

Currently, Drupal 9 is available on Pantheon as a Limited Availability feature release. This means the feature is currently in active development.

Pantheon engineers are rolling out changes often.

</Alert>

## Before You Begin

- Log in to your Pantheon account. If you don't have one, [create one first](https://pantheon.io/register?docs) and familiarize yourself with the [User Dashboard](/guides/quickstart/user-dashboard) before you create a new site.

- Set up [SSH Keys](/ssh-keys) on your local computer and Pantheon account.

- Install and configure [Git](/git) and [Composer](https://getcomposer.org/download/) on your local computer.

   - Mac users can use [Homebrew](https://brew.sh/) to install both Git and Composer, along with their required dependencies:

     ```bash{promptUser:user}
     brew install git composer
     ```

## Create a New Drupal 9 Site with Integrated Composer

Please note the Limited Availability program does not include a path to upgrade from previous Drupal versions to Drupal 9. Upgrade instructions for existing Drupal 8 Composer-enabled sites will be available when Integrated Composer moves into General Availability.

<Partial file="drupal-9-upstream-install.md" />

If you're not ready to create a new site yet, you can also [check an existing site's compatibility to upgrade](#test-an-existing-drupal-site-for-drupal-9-upgrade-compatibility).

## Test an Existing Drupal Site for Drupal 9 Upgrade Compatibility

1. Upgrade to the latest Drupal 8.9 release.

   - Although Drupal supports upgrading to Drupal 9 from Drupal 8.8, ensure that your site is on the latest Drupal 8.9 release before trying Drupal 9 on Pantheon.

1. Review the [How to Prepare Your Drupal 7 or Drupal 8 Site for Drupal 9](https://www.drupal.org/docs/9/how-to-prepare-your-drupal-7-or-8-site-for-drupal-9) guide on Drupal.org.

1. Use the [Upgrade Status](https://www.drupal.org/project/upgrade_status) Drupal 8/9 module to generate a full report of your site’s compatibility.

1. [Help contributed modules](https://www.drupal.org/node/3032484) prepare for Drupal 9, for example by updating modules' deprecated API usages and converting tests to PHPUnit.

1. Check out [Acquia’s Drupal 9 Deprecation Status Upgrade Tracker](https://dev.acquia.com/drupal9/deprecation_status) for information about Drupal 9 support for contributed Drupal modules and themes.

### Update Deprecated Code for Drupal 9 Compatibility

Drupal 9 has deprecated a number of different functions and APIs in favor of better options going forward.

For example, `node_load()` was replaced in Drupal 9 with `Node::load` resulting in this change needed:

Drupal 8:

```php
$node = node_load(1);
```

Drupal 9:

```php
use \Drupal\node\Entity\Node;
$node = Node::load(1);
```

Since most of these changes are relatively minor, there are a number of [deprecation checking and correction tools](https://www.drupal.org/docs/9/how-to-prepare-your-drupal-7-or-8-site-for-drupal-9/deprecation-checking-and-correction-tools) available.

## Convert an Existing Drupal 8 Site to Drupal 9

In this section, you'll create a new Drupal 9 site and migrate the code from an existing Drupal 8 site to it.

Prerequisites:
- Install Terminus, Git, and Composer (see "[Before You Begin](#before-you-begin)" above)
- Install the [Terminus Site Clone](https://github.com/pantheon-systems/terminus-site-clone-plugin) plugin
- Set environment variables with your Drupal 8 and Drupal 9 site names:

  ```bash{promptUser: user}
  export D8_SITE=best-drupal8-site-ever
  export D9_SITE=best-drupal9-site-ever
  ```

Steps to convert and migrate your Drupal 8 site to a new Drupal 9 instance.

1. Create a new Drupal 9 site using the link in the [Create a New Drupal 9 Site](#create-a-new-drupal-9-site-with-integrated-composer) section above.

1. Use Git to clone your new Drupal 9 site codebase to your local machine.

1. From the local Drupal 9 site's directory, use Terminus to retrieve the D8 site's Git URL:

  ```bash{promptUser: user}
  terminus connection:info $D8_SITE.dev --field=git_url
  ```

1. Add the Drupal 8 site as a remote repository called `existing-8`. Use the URL retrieved in the previous step:

  ```bash{promptUser: user}
  git remote add existing-8 ssh://codeserver.dev.xxxx@codeserver.dev.xxxx.drush.in:2222/~/repository.git
  git fetch existing-8
  ```

1. Copy over exported configuration from the original site. From your D9 site, run the following commands:

  ```bash{promptUser: user}
  git checkout existing-8/master -- sites/default/config
  git mv sites/default/config/* config/
  git commit -m "Add site configuration."
  ```

1. Compare your current `pantheon.yml` file with the new D9 `pantheon.upstream.yml`:

  ```bash{promptUser: user}
  git diff existing-8/master:pantheon.yml pantheon.upstream.yml
  ```

1. If you have customizations in your D8 site's `pantheon.yml` that you want to keep for D9 (e.g., a Quicksilver script or site-specific protected web paths), copy `pantheon.yml` over:

  ```bash{promptUser: user}
  git checkout existing-8/master -- pantheon.yml
  git commit -m "Update pantheon.yml."
  ```

1. Copy over any Quicksilver scripts referenced in `pantheon.yml`:

  ```bash{promptUser: user}
  git checkout existing-8/master -- private/scripts
  git commit -m "Add Quicksilver scripts."
  ```

1. List contrib modules and themes on your D8 site:

  ```bash{promptUser: user}
  terminus drush $D8_SITE.dev -- pm:projectinfo --status=enabled --fields=name,version --format=table
  ```

1. Then use Composer on your D9 site to add these there:

  ```bash{promptUser: user}
  composer require drupal/ctools:^3.4 drupal/redirect:^1.6 drupal/token:^1.7
  git add composer.*
  git commit -m "Add contrib projects."
  ```

1. Copy over any custom modules or themes from your D8 site:

  ```bash{promptUser: user}
  git checkout existing-8/master -- modules/custom themes/custom
  git mv themes/* web/themes
  git mv modules/* web/modules
  git commit -m "Add custom projects."
  ```

1. Check `settings.php` for any customizations to copy over:

  ```bash{promptUser: user}
  # Fetch your D8 settings file.
  git show existing-8/master:sites/default/settings.php > web/sites/default/original-settings.php
  # Check for any customizations (if this returns nothing, you can move on to the next step).
  # Copy what you need over to web/sites/default/settings.php, and commit as needed.
  diff -Nup web/sites/default/settings.php web/sites/default/original-settings.php
  # Remove the original copy.
  rm web/sites/default/original-settings.php
  ```

1. Copy your files and database from your D8 site to the D9 site:

  ```bash{promptUser: user}
  terminus site:clone $D8_SITE.live $D9_SITE.dev --no-code --no-destination-backup --no-source-backup
  ```

1. Push the D9 codebase from your local machine up to Pantheon:

  ```bash{promptUser: user}
  terminus connection:set $D9_SITE.dev git
  git push origin master
  ```

1. Run database updates:

  ```bash{promptUser: user}
  terminus drush $D9_SITE.dev -- updatedb
  ```

1. Review the site, then proceed to launch using the [Pantheon Relauch](/relaunch) documentation.

## FAQ

### Can I upgrade my existing Drupal site to Drupal 9?

Not yet. While Drupal 9 on Pantheon is in Limited Availability, there is no supported upgrade path yet.

### Pantheon Launch Check Status Error: services.yml does not exist

After you set up Drupal 9, you might see this error in the **Best practices** section of the Pantheon Launch Check:

> <span  style="color:red">x <strong>sites/default/services.yml:</strong></span> services.yml does not exist! Copy the default.service.yml to services.yml and see https://www.drupal.org/documentation/install/settings-file for details.
><br />
><br />
>
> *Create services.yml file inside sites/default directory by copying default/services.yml file. See https://www.drupal.org/documentation/install/settings-file for details.*

Ensure your site's [Development Mode](/guides/quickstart/connection-modes/) is set to **Git**, then use the terminal on the local machine where you cloned the site, and from the project's root directory:

1. Copy `default.services.yml` to `services.yml`:

 ```bash{promptUser: user}
 cp web/sites/default/default.services.yml web/sites/default/services.yml
 ```

1. Commit and push:

 ```bash{promptUser: user}
 git add web/sites/default/services.yml && git commit -m "init services.yml"
 git push origin master
  ```

Learn more about the [service configuration](/services-yml#create-and-modify-servicesyml) file.

### Pantheon Drupal 8 Modules Being Upgraded to Drupal 9

| Module Name                                                                                 | Drupal 8 Version? | Drupal 9 Version? |
|---------------------------------------------------------------------------------------------|:-----------:|:-----------:|
| [Pantheon Advanced Page Cache](https://www.drupal.org/project/pantheon_advanced_page_cache) |     Yes     |     Yes     |
| [Search API Pantheon](https://www.drupal.org/project/search_api_pantheon)                   |     Yes     |   Not yet   |

### Where can I report an issue?

[Contact support](/support) to report any issues that you encounter.

### Error: Class "Drupal\views\Routing\ViewPageController" does not exist

As reported in [Drupal Issue 3161309](https://www.drupal.org/project/drupal/issues/3161309), some fresh installations may encounter the error:

```none
InvalidArgumentException: Class "Drupal\views\Routing\ViewPageController" does not exist.
```

If you encounter this error, [clear the cache through the Site Dashboard](/clear-caches#pantheon-dashboard), or with the [Terminus](/terminus) `drush cr` command:

```bash{promptUser: user}
terminus drush <site>.<env> -- cr
```

Given the nature of the bug, it might be easier to reinstall Drupal 9.
