---
title: Migrate a Site Created With the Pantheon Dashboard to Drupal 9
subtitle: Add Contrib and Custom Code
description: 
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
reviewed: "2021-03-31"
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-hosted-btworkflow/contrib-custom
anchorid: contrib-custom
editpath: drupal-9/drupal-9-hosted-btworkflow/07-contrib-custom.md
---

This section describes how to replicate your selection of contributed modules and themes, and any custom modules or themes your development team has created in your new project structure.

## Contributed Code

The goal of this process is to have Composer manage all the site's contrib modules, contrib themes, core upgrades, and libraries (referred to as *contributed code*). The only items from the existing site that should remain in the Git repository are custom code, custom themes, and custom modules that are specific to the existing site.

### Modules and Themes

Your site should already be managing contributed modules and themes through Composer. Follow the steps below to migrate these items to a new site.

1. Open the source site `composer.json`.

1. Run a `composer require` command for each module and theme in the `$DESTINATION` directory:

```bash
composer require drupal/PROJECT_NAME:^VERSION
```

You can require multiple packages in the same commands if desired.

### Other Composer Packages

Follow the steps below, if you added non-Drupal packages to your site via Composer. 

1. Run the command `composer require` to migrate each package. 

1. Use the following command to display the differences between the master and current `composer.json`:

```
diff -Nup --ignore-all-space $SOURCE/composer.json $DESTINATION/composer.json
```

### Libraries

Libraries can be handled similarly to modules, but the specifics depend on how your library code was included in the source site. If you're using a library's API, you may have to do additional work to ensure that it functions properly.


## Custom Code

Manually copy custom code from the existing site repository to the Composer-managed directory.

### Modules and Themes

To move modules, use the following commands:
<!-- do we need to add another sample with web/ added modules/custom ? -->


  ```bash{promptUser:user}
  mkdir -p $DESTINATION/web/modules/custom
  cp -r $SOURCE/web/modules/custom $DESTINATION/web/modules/custom
  # From $DESTINATION:
  git add web/modules/
  git commit -m "Copy custom modules"
  ```
<!-- do we need to add another sample with web/ added modules/custom ? -->

To move themes, use the following commands:

  ```bash{promptUser:user}
  mkdir -p $DESTINATION/web/themes/custom
  cp -r $SOURCE/web/themes/custom $DESTINATION/web/themes/custom
  # From $DESTINATION:
  git add web/themes/
  git commit -m "Copy custom themes"
  ```

Use the above commands with any of the custom code.

### settings.php

Your existing site may have customizations to `settings.php` or other configuration files. Given that both sites (`$SOURCE` and `$DESTINATION`) have been created from the same upstream, it is ok to replace the `$DESTINATION` `settings.php` with the one coming from the `$SOURCE` site:
<!-- do we need to add another sample with web/  ? -->

```bash{promptUser:user}
cp $SOURCE/web/sites/default/settings.php $DESTINATION/web/sites/default/settings.php
# Review changes and commit as needed
```

The resulting `settings.php` should have no `$databases` array.

## Additional Composer Configuration

Any additional Composer configuration that you have added to your site should be ported over to the new `composer.json` file. This can include configurations related to repositories, minimum-stability, or extra sections.

Use the `diff` command to get the information you need to copy:

  ```
  diff -Nup --ignore-all-space $SOURCE/composer.json $DESTINATION/composer.json
  ```

Commit your changes as needed.

## Push to the External Repository Master Branch

1. Push to the master branch in the external repository:

  ```
  git push origin master
  ```

1. Confirm that the Continuous Integration workflow to succeeds in committing your code changes to the Pantheon site.
