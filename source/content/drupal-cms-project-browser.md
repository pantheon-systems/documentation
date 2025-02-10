---
title: Project Browser in Pantheon
description: Learn how to use Project Browser in Pantheon.
tags: [site, D8, D9, D10]
permalink: docs/drupal-cms-project-browser
contributors: [alexmoreno]
contenttype: [doc]
innav: [true]
categories: [create]
cms: [drupal]
audience: [development]
product: [dashboard, terminus]
integration: [--]
reviewed: "2024-02-10"
---

# Project Browser in Pantheon

Project Browser in Drupal is a tool designed to simplify the process of discovering, evaluating, and installing modules directly from within the Drupal administrative interface. It provides a user-friendly interface that allows site administrators and developers to search for modules, view detailed information about them, and install them without needing to leave the Drupal site or manually download and upload module files.

Find more information about [Drupal Project Browser here](https://www.drupal.org/about/starshot/initiatives/project-browser).


## Preparing your project

We assume that you have a compatible Drupal site already in Pantheon, based on DrupalCMS. If not, feel free to install a new one [following this guide](https://docs.pantheon.io/supported-drupal#drupal-cms-on-pantheon), or update your existing one.

Requirements:

- Your Pantheon site is in SFTP mode (Development Mode: sftp), instead of Git. This is so Drupal can modify the file system. This will only work on your dev environment, as non-production environments are locked for security purposes. Following the recommended flow, you'll deploy your changes from dev to stage, then test your changes in stage, and finally deploy to production.
- In your `composer.json`, remove the references to the files:

  ```        "upstream-configuration": {
            "type": "path",
            "url": "upstream-configuration"
        },
  ```

Remove the autoload of ComposerScripts.php:

```    
  "autoload": {
        "classmap": ["upstream-configuration/scripts/ComposerScripts.php"]
    },
```

and finally

  ```
        "pantheon-systems/drupal-integrations": "^11.1",
        "pantheon-upstreams/upstream-configuration": "dev-main"
  ```

## Searching and installing new modules

If both previous steps are done, you should be able to browse to Extensions->Browse modules (/admin/modules/browse/drupalorg_jsonapi/), and you should not see any errors.

