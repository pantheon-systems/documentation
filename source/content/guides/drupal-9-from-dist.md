---
title: Create a Drupal 9 Site Using a Drupal Distribution
description: Learn how to create a site using a Drupal 9 distribution.
cms: "Drupal"
categories: [get-started]
tags: [site]
type: guide
permalink: docs/guides/drupal-9-from-dist
contributors: [wordsmither]
date: 07/06/2022
---

Distributions are pre-made packages that you can use to simplify creating and setting up a Drupal website. Drupal distributions are exceptionally helpful if you want to create a website, but don't want to build it from scratch. 

Review the [documentation provided with the community distribution](https://www.drupal.org/project/project_distribution) before following the steps below.

## Prepare

<Partial file="drupal-9/prepare-local-environment-no-clone-no-alias.md" />

## Create a Site Based on an Empty Upstream

There are two ways to create an empty Upstream site: via the [Pantheon Dashboard](/guides/legacy-dashboard/create-sites) and via [Terminus](/terminus).

- Via the Pantheon Dashboard:

  - Use the [Empty Site Upstream](https://dashboard.pantheon.io/sites/create?upstream_id=4c7176de-e079-eed1-154d-44d5a9945b65)

- Via Terminus:

  ```bash{promptUser: user}
  terminus site:create my-new-site "My New Site" empty
  ```

## Create the Project 

Use the documentation provided with the Drupal distribution to run the recommended Composer `create-project` command. 

You can review a list of commonly used distributions on the [Drupal Distributions](https://www.drupal.org/project/project_distribution) page.

## Add Files and Folders

Now you're going to copy files and folders from the Pantheon GitHub repository for use in your project. 

1. Clone https://github.com/pantheon-systems/drupal-composer-managed into another folder.

    In the code samples included below, [`drupal-composer-managed-path`] should be replaced with the location of the the cloned repository.  In addition, they assume the commands are being run from the folder created from the `create-project` command.

1. Copy the `upstream-configuration` folder to your site:

  ```bash{promptUser: user}
  cp -r /drupal-composer-managed-path/upstream-configuration .
  ```

1. Copy the `pantheon.upstream.yml` file to your site:

  ```bash{promptUser: user}
  cp  /drupal-composer-managed-path/pantheon-upstream.yml .
  ```

1. Create an empty `config` folder:

  ```bash{promptUser: user}
  mkdir -p config .
  ```

## Update Composer Settings

Add/modify the settings in `composer.json` as follows:

1. Add the `upstream-configuration` path repository:

   ```
   "repositories": [
       {
           "type": "composer",
           "url": "https://packages.drupal.org/8"
       },
    //highlight-start
       {
           "type": "path",
           "url": "upstream-configuration"
       }
   ],
    //highlight-end
   ```

1. Include the following in the `require` section:

   ```
   "require": {
       "pantheon-upstreams/upstream-configuration": "dev-main",
       "pantheon-systems/drupal-integrations": "^9",
       "drush/drush": "^11 || ^12"
   },
   ```

1. Add `pantheon-systems/drupal-integrations` and quicksilver scripts (optional) to `extra`:
   
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

1. Add these `scripts` and `scripts-description` sections: 

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

## Update settings.php

Add the following to your `/web/sites/default/settings.php` file.

```
include __DIR__ . "/settings.pantheon.php";
```

## Initialize, Push, and Test

1. Initialize the git repo and commit everything:
   
   ```
   git init -b master
   git commit -am "Initial commit"
   ```

1. Add the Pantheon repository as a remote:
   
   ```
   git remote add origin [pantheon_remote]
   ```

   If you need to get `pantheon_remote`, use Terminus:

   ```
   terminus connection:info --field=git_url [site].dev
   ```

1. Force push to Pantheon master branch:
   ```
   git push origin master -f
   ```

1. Install your site in the dev environment and test that everything works.


## More Resources

- [Get Started](/get-started)

- [Drupal 9 Migration Guides](/drupal-9-migration)

- [Go Live](/go-live)
