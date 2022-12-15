---
title: Migrate a Drupal:latest Site from Another Platform
subtitle: Add Contrib and Custom Code
description: 
cms: "Drupal"
tags: [code, launch, migrate, site, updates, D8, D9, D10]
contributors: [wordsmither]
layout: guide
showtoc: true
permalink: docs/guides/drupal-latest-unhosted/contrib-custom
anchorid: contrib-custom
editpath: drupal-latest/drupal-latest-unhosted/07-contrib-custom.md
reviewed: "2022-12-13"
contenttype: [guide]
categories: [migrate]
newcms: [drupal9, drupal8, drupal10, drupal]
audience: [development]
product: [--]
integration: [--]
---

This section describes how to replicate your selection of contributed modules and themes, and any custom modules or themes your development team has created in your new project structure.

## Contributed Code

The goal of this process is to have Composer manage the site's:

- Contrib modules

- Contrib themes

- Core upgrades

- Libraries (referred to as *contributed code*)

The only items from the existing site that should remain in the Git repository are custom code, custom themes, and custom modules that are specific to the existing site.

### Modules and Themes

The steps here ensure that all modules and themes from [drupal.org](https://drupal.org) are in the `composer.json` `require` list.

Composer must be aware of all contributed code before you can run `composer update` command within the directory. This command tells Composer to upgrade all contributed code automatically. The Pantheon dashboard will also update Composer dependencies in addition to updating the files from the upstream.

1. Review the existing site's code and check for contributed modules in:

    - `/modules`

    - `/modules/contrib`

    - `/sites/all/modules`

    - `/sites/all/modules/contrib`

1. Run the `pm:list` Drush command within a contributed modules folder, for example:

    - `/modules`

    - `/themes`

    - `/themes/contrib`

    - `/sites/all/themes`

    - `/sites/all/themes/contrib`

    This will list each module followed by the version of that module that is installed:

    ```bash{promptUser:user}
    drush pm:list --no-core --fields=name,project,version  --format=table
    ```
  
1. Review the list and note the versions of modules and themes you depend on.

1. Add these modules to your new codebase by running the following command for each module in the `$DESTINATION` directory:

  ```bash{promptUser:user}
  composer require drupal/PROJECT_NAME:^VERSION
  ```

  Where `PROJECT_NAME` is the project name from the **Project** field, and `VERSION` is the version of that module the site is currently using. Composer may pull in a newer version than what you specify, depending on what versions are available. You can read more about the caret (`^`) in the [Composer documentation](https://getcomposer.org/doc/articles/versions.md#caret-version-range-).

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

    <Partial file="module-name.md" />

### Other Composer Packages

You must migrate non-composer packages to your site if have added any via Composer.

1. Run the `composer require` command to migrate each package. 

1. Run the command below to display the differences between the master and your current `composer.json`:

```bash{promptUser:user}
diff -Nup --ignore-all-space $SOURCE/composer.json $DESTINATION/composer.json
```

### Libraries

Libraries can be handled similarly to modules, but the specifics depend on how your library code was included in the source site. If you're using a library's API, you may have to do additional work to ensure that it functions correctly.

Do not forget to commit your changes during these steps.

## Custom Code

Next, manually copy custom code from the existing site repository to the Composer-managed directory.

### Modules and Themes

<Partial file="drupal-latest/custom-modules-themes.md" />

### settings.php

<Partial file="drupal-latest/custom-settings.md" />

## Additional Composer Configuration

<Partial file="drupal-latest/composer-config.md" />
