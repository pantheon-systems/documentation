---
title: Create a Drupal 9 Site Using a Community Distribution
description: Learn how to create a site using a Drupal 9 community distribution.
cms: "Drupal"
categories: [get-started]
tags: [site]
type: guide
permalink: docs/guides/drupal-9-from-community
contributors: [wordsmither]
date: 07/06/2022
---

Distributions are pre-made packages that you can use to simplify creating and setting up a Drupal website. Using Drupal distributions is exceptionally helpful if you want to create a website but don't want to build it from scratch. 

In short, you should start by following the documentation provided with the community distribution; then continuing with the following process.

## Requirements

- You are managing site dependencies using Composer.  If not, and you can [convert a standard Drupal site to a Composer managed site](/docs/guides/composer-convert).

## Create an Empty Upstream

There are two ways to create an empty Upstream site: via the [Pantheon Dashboard](/create-sites) and via [Terminus](/terminus).

- Via the Pantheon Dashboard:

  - Use the [Empty Site Upstream](https://dashboard.pantheon.io/sites/create?upstream_id=4c7176de-e079-eed1-154d-44d5a9945b65)

- Via Terminus:

  ```bash{promptUser: user}
  terminus site:create my-new-site "My New Site" empty
  ```

## Create the Community Distribution Project 

Use the documentation provided with the community distribution to run the recommended Composer `create-project` command.  Here are some examples

  ```bash{promptUser: user}
  composer create-project apigee/devportal-kickstart-project:9.x-dev MY_PROJECT --no-interaction
  ```

  ```bash{promptUser: user}
  composer create-project thunder/thunder-project thunder --no-interaction --no-install
  ```

  ```bash{promptUser: user}
  composer create-project getdkan/recommended-project my-project
  ```

<Alert title="Warning" type="info" >

Do not rely on the sample code above.  Be sure to use the instructions provided with the community distribution.

</Alert>

## Copy/Create Files and Folders

Now, you're going to copy files and folders from the Pantheon GitHub repository for use in your project.  To simplify this, first clone https://github.com/pantheon-systems/drupal-composer-managed into another folder.

In the code samples included below, [`drupal-composer-managed-path`] should be replaced with the location of the the cloned repository.

1. Copy the `upstream-configuration` folder to your site:

  ```bash{promptUser: user}
  cp -r /drupal-composer-managed-path/upstream-configuration 
  ```

1. Copy the `pantheon.upstream.yml` file to your site:

  ```bash{promptUser: user}
  cp  /drupal-composer-managed-path/pantheon-upstream.yml
  ```

1. Create an empty `config` folder:

  ```bash{promptUser: user}
  mkdir -p config
  ```

## Composer Management

Add/modify the settings in `blob/main/composer.json` as follows:

1. Add upstream-configuration path repository:

   ```
   "autoload": {
       "classmap": [
           "upstream-configuration/scripts/ComposerScripts.php"
       ]
   },
   ```

1. Include the following in the `require` section:

   ```
   "require": {
       "pantheon-upstreams/upstream-configuration": "dev-main",
       "pantheon-systems/drupal-integrations": "^9",
       "drush/drush": "^11 || ^12"
   },
   ```

1. Add pantheon-systems/drupal-integrations and quicksilver scripts (optional) to `extra`:
   
   ```
   "extra": {
       "drupal-scaffold": {
           "locations": {
               "web-root": "./web"
           },
//highlight-start
           "allowed-packages": [
               "pantheon-systems/drupal-integrations"
           ],
//highlight-end
           "file-mapping": {
               "[project-root]/.editorconfig": false,
               "[project-root]/pantheon.upstream.yml": false,
               "[project-root]/.gitattributes": false
           }
       },
       "installer-paths": {
           "web/core": ["type:drupal-core"],
           "web/libraries/{$name}": ["type:drupal-library"],
           "web/modules/contrib/{$name}": ["type:drupal-module"],
           "web/profiles/contrib/{$name}": ["type:drupal-profile"],
           "web/themes/contrib/{$name}": ["type:drupal-theme"],
           "drush/Commands/contrib/{$name}": ["type:drupal-drush"],
           "web/modules/custom/{$name}": ["type:drupal-custom-module"],
           "web/profiles/custom/{$name}": ["type:drupal-custom-profile"],
           "web/themes/custom/{$name}": ["type:drupal-custom-theme"],
//highlight-start
           "web/private/scripts/quicksilver/{$name}/": ["type:quicksilver-script"]
//highlight-end
       },
       "composer-exit-on-patch-failure": true,
       "patchLevel": {
           "drupal/core": "-p2"
       }
   },
   ```
1. Add `autoload.classmap`:

   ```
   "autoload": {
       "classmap": [
           "upstream-configuration/scripts/ComposerScripts.php"
       ]
   },
   ``` 

1. Add scripts and scripts-description sections: 

   ```
   "scripts": {
       "pre-update-cmd": [
           "DrupalComposerManagedComposerScripts::preUpdate"
       ],
       "upstream-require": [
           "DrupalComposerManagedComposerScripts::upstreamRequire"
       ]
   },
   "scripts-descriptions": {
       "upstream-require": "Add a dependency to an upstream. See https://pantheon.io/docs/create-custom-upstream or information on creating custom upstreams."
   },
   ```

## settings.php

Add the following to your `/web/sites/default/settings.php` file.

```
include __DIR__ . "/settings.pantheon.php";
```

## See Also

- [Get Started](/docs/get-started)
- [Drupal 9 Migration Guides](/docs/drupal-9-migration)
