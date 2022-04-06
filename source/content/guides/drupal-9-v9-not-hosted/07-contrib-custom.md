---
title: Migrate a Drupal 9 Site from Another Platform to Drupal 9
subtitle: Add Contrib and Custom Code
description: 
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
reviewed: "2021-03-31"
layout: guide
permalink: docs/guides/drupal-9-v9-not-hosted/contrib-custom
anchorid: contrib-custom
editpath: drupal-9-v9-not-hosted/07-contrib-custom.md
---
This section describes how to replicate your selection of contributed modules and themes, and any custom modules or themes your development team has created in your new project structure.

## Contributed Code

The goal of this process is to have Composer manage all the site's contrib modules, contrib themes, core upgrades, and libraries (referred to as *contributed code*). The only items from the existing site that should remain in the Git repository are custom code, custom themes, and custom modules that are specific to the existing site.


### Modules and Themes

The steps here ensure that any modules and themes from [drupal.org](https://drupal.org) are in the `composer.json` `require` list.

After Composer is aware of all the contributed code, you'll be able to run `composer update` from within the directory. Composer will upgrade all the contributed code automatically. The Pantheon dashboard will also update Composer dependencies in addition to updating the files from the upstream.

1. Review the existing site's code and check for contributed modules in `/modules`, `/modules/contrib`, `/sites/all/modules`, and `/sites/all/modules/contrib`.

1. Run the `pm:list` Drush command within a contributed modules folder (e.g. `/modules`, `/themes`, `/themes/contrib`, `/sites/all/themes`, `/sites/all/themes/contrib`, etc.).

  This will list each module followed by the version of that module that is installed:

  ```bash{promptUser:user}
  drush pm:list --no-core --fields=name,project,version  --format=table
  ```
  
1. Review the list and note the versions of modules and themes you depend on.

1. Add these modules to your new codebase using Composer by running the following for each module in the `$DESTINATION` directory:

  ```bash{promptUser:user}
  composer require drupal/PROJECT_NAME:^VERSION
  ```

  Where `PROJECT_NAME` is the project name from the **Project** field, and `VERSION` is the version of that module the site is currently using. Composer may pull in a newer version than what you specify, depending upon what versions are available. You can read more about the caret (`^`) in the [Composer documentation](https://getcomposer.org/doc/articles/versions.md#caret-version-range-).

  Some modules use different version formats.

   - For older-style Drupal version strings:

   ```none
   Chaos Tools (ctools)  8.x-3.4
   ```

    Replace the `8.x-` to convert this into `^3.4`

   - Semantic Versioning version strings:

   ```none
   Devel (devel)  4.1.1
   ```

    Use the version directly, e.g. `^4.1.1`

    <Partial file="could-not-find-version-module_name.md" />	  

#### Other Composer Packages

If you have added non-Drupal packages to your site via Composer, use the command `composer require` to migrate each package. You can use the following command to display the differences between the master and your current `composer.json`:

```bash{promptUser:user}
diff -Nup --ignore-all-space $SOURCE/composer.json $DESTINATION/composer.json
```

#### Libraries

Libraries can be handled similarly to modules, but the specifics depend on how your library code was included in the source site. If you're using a library's API, you may have to do additional work to ensure that it functions properly.

### Custom Code

Manually copy custom code from the existing site repository to the Composer-managed directory.

#### Modules and Themes

To move modules, use the following commands:

```bash{promptUser:user}
mkdir -p $DESTINATION/web/modules/custom
cp -r $SOURCE/modules/custom $DESTINATION/web/modules/custom
cd $DESTINATION
git add web/modules/
git commit -m "Copy custom modules"
```

To move themes, use the following commands:

```bash{promptUser:user}
mkdir -p $DESTINATION/web/themes/custom
cp -r $SOURCE/themes/custom $DESTINATION/web/themes/custom
cd $DESTINATION
git add web/themes/
git commit -m "Copy custom themes"
```

Use the above commands with any of the custom code.

#### settings.php

Your existing site may have customizations to `settings.php` or other configuration files. Review these carefully and extract relevant changes from these files to copy over. Always review any file paths referenced in the code, as these paths may change in the transition to Composer.

We don't recommend that you completely overwrite the `settings.php` file with the old one, as it contains customizations for moving the configuration directory, as well as platform-specific customizations.

```bash{promptUser:user}
git status # Ensure working tree is clean
diff -Nup --ignore-all-space $SOURCE/sites/default/settings.php $DESTINATION/web/sites/default/settings.php
```

Then edit web/sites/default/settings.php and commit as needed.

The resulting `settings.php` should have no `$databases` array.

### Additional Composer Configuration

Any additional Composer configuration that you have added to your site should be ported over to the new `composer.json` file. This can include configurations related to repositories, minimum-stability, or extra sections.

You can use the diff command to get the information you need to copy:

```bash{promptUser:user}
diff -Nup --ignore-all-space $SOURCE/composer.json $DESTINATION/composer.json
```

Commit your changes as needed.

