---
title: Build Tools
subtitle: Add a New Module
description: In step five of the Build Tools guide, learn how to add new modules to your site.
buildtools: true
anchorid: extend
generator: pagination
layout: guide
type: guide
pagination:
    provider: data.buildtoolspages
use:
    - buildtoolspages
permalink: docs/guides/build-tools/extend/
nexturl: guides/build-tools/tests/
previousurl: guides/build-tools/configure/
editpath: build-tools/05-extend.md
image: buildToolsGuide-thumb
---
Next, we'll add a module to our existing `slogan` branch using Composer. You should already have a Pull Request open for this branch in GitHub, [created in a previous lesson](/guides/build-tools/pr-workflow/).

## Local Setup
This section will be performed from the command line, to prepare your local system.

1. Navigate to the **Code** tab of the GitHub repository, then click **Clone or download** and copy the repository URL:

  ![Clone repository](../../../images/pr-workflow/clone.png)

2. Open a terminal application and clone the GitHub repository (replace `<github-url>`):

    ```bash
    git clone <github-url>
    ```

3. Navigate to the repository's root (replace `pantheon-d8-composer-project`):

    ```bash
    cd pantheon-d8-composer-project
    ```

4. Install dependencies with Composer:

    ```bash
    composer install
    ```

5. Export local environment variables to define your site name and Multidev environment to easily copy and paste example commands in the next sections (replace `pantheon-d8-composer-project`):

    ```bash
    export SITE=pantheon-d8-composer-project
      export ENV=ci-4
    ```

## Install a Contrib Module
1. Use Composer locally to add the [Pathauto](https://www.drupal.org/project/pathauto) module as a dependency on the existing `slogan` branch:

    ```bash
    git checkout slogan
      composer require drupal/pathauto
    ```

    Note that the dependencies of pathauto, token and ctools, are also installed:

    ![Composer require pathauto](../../../images/pr-workflow/composer-require-pathauto.png)

2. Commit the updated `composer.json` and `composer.lock` files and push your work to the `slogan` branch on GitHub:

    ```bash
    git add composer.*
      git commit -m "Install drupal/pathauto ^1.0"
      git push origin slogan
    ```

    ![Commit composer.json and composer.lock](../../../images/pr-workflow/commit-pathauto.png)

3. Enable the Pathauto module on the Pantheon Multidev environment from the command line using Terminus and Drush:

    ```bash
    terminus drush $SITE.$ENV -- pm-enable pathauto --yes
    ```

4. You can use the [method described in an earlier lesson](/guides/build-tools/configure/) to export configuration changes made in the last step or you can do it from the command line using Terminus and Drush:

    ```bash
    terminus drush $SITE.$ENV -- config-export --yes
    ```


5. Commit your changes in Pantheon from the command line with Terminus:

    ```bash
    terminus env:commit $SITE.$ENV --message="Install and enable pathauto"
    ```

    ![enable export config and commit](../../../images/pr-workflow/export-module-enable-config.png)

Use this process to install any new dependency required by your project. The site should *never* use Drupal's **Extend** -> **Install new module** feature or `drush pm-download`, as neither of these techniques modify the `composer.json` file. Modules added using these methods will disappear the next time the build artifacts are pushed to your Pantheon Multidev environment. You must use Composer to install new modules exclusively.
