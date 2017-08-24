---
title: Build Tools
subtitle: Add a New Module
buildtools: true
anchorid: extend
generator: pagination
layout: guide
pagination:
    provider: data.buildtoolspages
use:
    - buildtoolspages
permalink: docs/guides/build-tools/extend/
nexturl: guides/build-tools/custom-theme/
previousurl: guides/build-tools/update/
editpath: build-tools/06-extend.md
---
In this workflow, Composer should also always be used to install new modules and themes on your site. Never use the Drupal **Extend** -> **Install new module** feature or `drush pm-download`, as neither of these techniques modify the `composer.json` file. Modules added using these methods will disappear the next time the build artifacts are pushed to your Pantheon multidev environment.

1.  In this example, we'll install [Pathauto](https://www.drupal.org/project/pathauto) on a Pantheon multidev environment using the Terminus Composer Plugin.

    ```bash
    terminus composer $SITE.$ENV -- require drupal/pathauto
    ```

    Note that the dependencies of pathauto, token and ctools, are also installed:

    ![Composer require pathauto](/source/docs/assets/images/pr-workflow/composer-require-pathauto.png)

2.  You can now visit the **Extend** page in the Drupal admin interface to enable pathauto. This operation may also be done on the command line using Drush:

    ```bash
    terminus drush $SITE.$ENV -- pm-enable pathauto --yes
    ```

3.  In Drupal 8, the set of enabled modules is also part of the exportable configuration set. That means we can track enabled modules in Composer with the  **Update** tab in the **Configuration Synchronization** section of the Drupal admin interface, as we did in step 2 of the [Configure Your Site Through Drupal's Admin Interface](#configure-site-via-the-admin-interface) section. Alternately, this same operation may be done from the command line using Terminus and Drush:

    ```bash
    terminus drush $SITE.$ENV -- config-export --yes
    ```

4.  You can also commit your changes from the command line with Terminus:

    ```bash
    terminus env:commit $SITE.$ENV --message="Install and enable pathauto"
    ```

    The information needed to install and enable pathauto and its dependencies is now committed to your GitHub repository. The modules sources themselves, however, will not be part of this commit.
