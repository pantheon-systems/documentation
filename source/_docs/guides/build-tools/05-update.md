---
title: Build Tools
subtitle: Update Your Project
buildtools: true
anchorid: update
generator: pagination
layout: guide
pagination:
    provider: data.buildtoolspages
use:
    - buildtoolspages
permalink: docs/guides/build-tools/update/
nexturl: guides/build-tools/extend/
previousurl: guides/build-tools/configure/
editpath: build-tools/05-update.md
---

When using the Composer workflow, you should *never* use the Pantheon dashboard to update changes from your upstream, nor should you ever merge code from one environment to another. All code updates will be done using Composer.

If you would like to copy the commands used in the examples below directly into your terminal, export environment variables to define your site name and multidev environment:
```
export SITE=my-pantheon-project
export ENV=pr-slogan
```

### Terminus Composer Update
Composer commands (e.g. `composer update`) may be run directly against your Pantheon multidev environments using the Terminus Composer plugin. If your site is very simple, you can update it directly on the platform.

1.  Using Terminus, update your site with Composer:

    ```bash
    terminus composer $SITE.$ENV -- update
    ```

    The example below shows a site that was installed with Drupal 8.3.0, and updated to Drupal 8.3.1 after that version was released using Composer.

    ![Update configuration](/source/docs/assets/images/pr-workflow/composer-update.png)

2.  Visit your Pantheon dashboard and commit your changes:

    ![Commit updated files](/source/docs/assets/images/pr-workflow/commit-composer-update.png)

### Local Composer Update
If you have added a few contrib modules, though, it is likely that Composer will run out of memory while updating your site directly on the platform with Terminus. In this instance, you should update your site locally.

1. Clone your GitHub project locally:

    ```bash
    git clone git@github.com:my-username/my-pantheon-project.git
    cd my-pantheon-project
    ```

2. Update your site with composer:

    ```bash
    composer update
    ```

3. Commit the updated `composer.json` and `composer.lock` files and push a new branch up to GitHub:

    ```bash
    git checkout -b drupal-8.3.7
    git add .
    git commit -m "Update to Drupal 8.3.7."
    git push -u origin drupal-8.3.7
    ```

4. Create a pull request on GitHub, and merge it once you are done testing.
