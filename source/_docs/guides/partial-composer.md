---
title: Manage Some Dependencies with Composer
description: Get your feet wet with Composer on WordPress or Drupal 7 before going all in.
contributors: [rachelwhitton, dustinleblanc]
tags: [automation, workflow, moreguides]
type: guide
permalink: docs/guides/:basename/
---
In this guide, you'll learn how to use Composer in small doses with WordPress and Drupal 7 so you can work towards best practices achieved by more advanced implementations. This allows you to continue using Pantheon's one-click core updates in the Site Dashboard while managing non-core dependencies with Composer.

## Before You Begin
- Read [Composer Fundamentals and Workflows](/docs/composer/)
- Install [Composer](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-osx){.external} and [Git](https://git-scm.com/downloads){.external} locally
- Create a WordPress or Drupal 7 site on Pantheon

  {% include("content/notes/partial-composer-adoption-warning.html") %}

- Set the site's connection mode to Git within the Site Dashboard or via [Terminus](/docs/terminus):

  ```bash
  terminus connection:set <site>.<env> git
  ```

- Create a local clone of your site code, and navigate to it in your terminal


## Initialize and Configure Composer
Use the `init` command to create a `composer.json` file that includes the appropriate package repository, then configure installation paths for dependencies like plugins and modules:

  <!-- Nav tabs -->
  <ul class="nav nav-tabs" role="tablist">
    <!-- Active tab -->
    <li id="wp-init-id" role="presentation" class="active"><a href="#wp-init" aria-controls="wp-init" role="tab" data-toggle="tab">WordPress</a></li>

    <!-- 2nd Tab Nav -->
    <li id="d7-init-id" role="presentation"><a href="#d7-init" aria-controls="d7-init" role="tab" data-toggle="tab">Drupal 7</a></li>
  </ul>

  <!-- Tab panes -->
  <div class="tab-content">
    <!-- Active pane content -->
    <div role="tabpanel" class="tab-pane active" id="wp-init" markdown="1">
    1. Initialize composer to create a `composer.json` file with the WordPress package repository:

      ```command
      composer init --repository=https://wpackagist.org --no-interaction
      ```

    2. Edit the `composer.json` to add extra configuration that specifies installation paths for WordPress plugins and themes:

      ```json
      {
          "repositories": [
              {
                  "type": "composer",
                  "url": "https://wpackagist.org"
              }
          ],
          "require": {},
          "extra": {
            "installer-paths": {
              "wp-content/plugins/{$name}/": ["type:wordpress-plugin"],
              "wp-content/themes/{$name}/": ["type:wordpress-theme"]
            }
          }
      }
      ```

    3. Commit the `composer.json` file to version control with Git:

      ```command
      git add composer.json
      ```

      ```command
      git commit -m "Create composer.json with WP repo and install paths"
      ```

    4. Push your new file to Pantheon:

      ```command
      git push origin master
      ```
    </div>

    <!-- 2nd pane content -->
    <div role="tabpanel" class="tab-pane" id="d7-init" markdown="1">
    1. Initialize composer to create a `composer.json` file with the Drupal 7 package repository:

      ```command
      composer init --repository=https://packages.drupal.org/7 --no-interaction
      ```

    2. Edit the `composer.json` to add extra configuration that specifies installation paths for Drupal modules, libraries, and themes:

      ```json
      {
          "repositories": [
              {
                  "type": "composer",
                  "url": "https://packages.drupal.org/7"
              }
          ],
          "require": {},
          "extra": {
            "installer-paths": {
              "sites/all/modules/{$name}/": ["type:drupal-module"],
              "sites/all/themes/{$name}/": ["type:drupal-theme"],
              "sites/all/libraries/{$name}/": ["type:drupal-library"]
            }
          }
      }
      ```

    3. Commit the `composer.json` file to version control with Git:

      ```command
      git add composer.json
      ```

      ```command
      git commit -m "Create composer.json with D7 repo and install paths"
      ```

    4. Push your new file to Pantheon:

      ```command
      git push origin master
      ```
    </div>
  </div>

Anything you aren't managing with Composer is installed and maintained using the standard techniques such as using the WordPress or Drupal admin interfaces. Continue applying one-click core updates from Pantheon in the Site Dashboard.

## Require Dependencies  
Use the `require` command to add new dependencies to your project, such as libraries or themes. This command modifies your `composer.json` file by including the specified dependency and it's compatible version.

<!-- Nav tabs -->
<ul class="nav nav-tabs" role="tablist">
  <!-- Active tab -->
  <li id="wp-require-papc-id" role="presentation" class="active"><a href="#wp-require-papc" aria-controls="wp-require-papc" role="tab" data-toggle="tab">WordPress</a></li>

  <!-- 2nd Tab Nav -->
  <li id="d7-require-papc-id" role="presentation"><a href="#d7-require-papc" aria-controls="d7-require-papc" role="tab" data-toggle="tab">Drupal 7</a></li>
</ul>

<!-- Tab panes -->
<div class="tab-content">
  <!-- Active pane content -->
  <div role="tabpanel" class="tab-pane active" id="wp-require-papc" markdown="1">
  #### Install a Plugin
  1. Require the plugin, [Pantheon Advanced Page Cache](https://wordpress.org/plugins/pantheon-advanced-page-cache/){.external} for example, with Composer:

    ```command
    composer require wpackagist-plugin/pantheon-advanced-page-cache
    ```
  2. Review modified files using `git status`, you should see the module has been installed in the `wp-content/plugins` directory like so:

    ![Require wpackagist-plugin/pantheon-advanced-page-cache output](/source/docs/assets/images/guides/partial-composer/require-papc-plugin.png)

    Notice a missing dependency was also installed, `composer/installers`. This is package is needed to support the installation paths configured in the previous section.

    If you don't want to track the `vendor` directory with Git, add it to your site's `.gitignore` file before continuing.
  3. Commit your work to version control with Git:

    ```command
    git add .
    ```

    ```command
    git commit -m "Require pantheon-advanced-page-cache ^0.3.0 "
    ```
  4. Push your changes to Pantheon:

    ```command
    git push origin master
    ```  
  5. Navigate to the **<span class="glyphicons glyphicons-wrench"></span> Dev** environment of the Site Dashboard.
  6. Click the **Site Admin <span class="glyphicons glyphicons-new-window-alt"></span>** button and login.
  7. Navigate to **Plugins** and activate Pantheon Advanced Page Cache.
  </div>

  <!-- 2nd pane content -->
  <div role="tabpanel" class="tab-pane" id="d7-require-papc" markdown="1">
  #### Install Site Local Drush
  The following example shows you how to install a site local Drush. You can use this method to require contrb modules, themes, and libraries.

  1. First, require the `composer/installers` package to support the installation paths configured in the previous section:

    ```command
    composer require composer/installers
    ```
  2. Require Drush with Composer:

    ```command
    composer require drush/drush
    ```
  3. Review modified files using `git status`:

    ![Require drupal/pantheon_advanced_page_cache output](/source/docs/assets/images/guides/partial-composer/require-drush.png)

    If you don't want to track the `vendor` directory with Git, add it to your site's `.gitignore` file before continuing.
  4. Commit your work to version control with Git:

    ```command
    git add .
    ```

    ```command
    git commit -m "Require drush and composer/installers"
    ```
  5. Push your changes to Pantheon:

    ```command
    git push origin master
    ```  
  </div>
</div>

## Next Steps
If your use case doesn't require the more advanced Build Tools method, continue using Composer to manage any number of your non-core dependencies while preserving Pantheon's one-click core updates. This is only supported for Drupal 7 and WordPress. This is not supported on Drupal 8 as it will break one-click updates due to excessive conflicts.

If you're ready to learn best practices for Composer on Pantheon, follow the [Build Tools](/docs/guides/build-tools/) guide.
