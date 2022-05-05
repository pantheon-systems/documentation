---
title: Drupal Commerce on Drupal 8
description: Use Composer to Install Drupal Commerce with Drupal 8, on Pantheon
contributors: [alexfornuto, stevector]
cms: "Drupal 8"
categories: [integrate]
tags: [upstreams, site]
type: guide
permalink: docs/guides/:basename
multidev: true
---

This guide covers installing [Drupal Commerce](https://drupalcommerce.org/), an e-commerce implementation designed specifically for Drupal. At the end of this guide you will have a Drupal Commerce site, GitHub repository, and Circle CI configuration for testing.

## Before You Begin

Although this process uses Composer to manage modules and dependencies, Composer is not required by default. Before proceeding, you may wish to consult the following docs:

- [Composer Fundamentals and Workflows](/guides/composer)
- [Build Tools](/guides/build-tools)

<Alert title="Note" type="info">

As packages pulled by Composer are updated (along with their dependencies), version compatibility issues can pop up. Sometimes you may need to manually alter the version constraints on a given package within the `require` or `require-dev` section of `composer.json` in order to update packages. See the [updating dependencies](https://getcomposer.org/doc/01-basic-usage.md#updating-dependencies-to-their-latest-versions) section of Composer's documentation for more information.

As a first troubleshooting step, try running `composer update` to bring `composer.lock` up to date with the latest available packages (as constrained by the version requirements in `composer.json`).

</Alert>

In addition to Pantheon, you will need accounts at:

- [GitHub](https://github.com)
- [CircleCI](https://circleci.com)

1. Follow the [Before You Begin](/guides/build-tools/create-project/#prerequisites) section of the Build Tools guide to install Composer, Terminus, and the Terminus Build Tools plugin on your local computer, and create machine tokens for [GitHub](https://help.github.com/articles/creating-an-access-token-for-command-line-use) and [CircleCI](https://circleci.com/account/api). Export the tokens to your current terminal session, as described below.

1. Export the variables below in your local terminal session to use [Terminus](/terminus) variable commands without having to copy and paste the variable: 

  ```bash{promptUser: user}
  export SITENAME=yoursitenamehere
  export GITHUB_TOKEN=yourgithubtokenhere
  export CIRCLE_TOKEN=yourcirclecitokenhere
  ```

    - `SITENAME` will be used as the machine names of the Pantheon site and the GitHub repo created in this process
    - `GITHUB_TOKEN` lets Terminus interact with your GitHub account to create the repository
    - `CIRCLE_TOKEN` is used to configure CircleCI to push to Pantheon any time a push is made to the GitHub repo

## Create a New Drupal 8 Site

1. Create a new Drupal 8 site from the Pantheon [Example Drops 8 Composer](https://github.com/pantheon-systems/example-drops-8-composer) repository on GitHub using the Terminus Build Tools plugin:

 ```bash{promptUser: user}
 terminus build:project:create pantheon-systems/example-drops-8-composer $SITENAME
 ```

 At this point *do not* go to the web interface to continue installation. You now have a repository on GitHub containing your new site.

1. Clone a local copy to your `projects` folder:

 ```bash{promptUser: user}
 cd ~/projects
 git clone git@github.com:username/$SITENAME.git
 ```

 Remember to replace `username` with your GitHub username.

## Install Drupal Commerce

1. Move into the local repository for your site:

  ```bash{promptUser: user}
  cd $SITENAME
  ```

1. Use Composer to install the [Commerce Installation Profile](https://github.com/drupalcommerce/commerce_base):

  ```bash{promptUser: user}
  composer config repositories.commerce_base vcs https://github.com/drupalcommerce/commerce_base
  composer require "drupalcommerce/commerce_base dev-8.x-1.x"
  ```

1. Run `git status` and confirm that the `composer.json` and `composer.lock` files have changed:

  ```bash{promptUser: user}
  git status
  On branch master
  Your branch is up to date with ‘origin/master’

  Changes not staged for commit:
  (use “git add <filename>...” to update what will be committed)
  (use “git checkout <filename>...” to discard changes in working directory

      modified:    composer.json
      modified:    composer.lock

    no changes added to commit (use “git add” and/or “git commit -a”)
  ```

1. Commit the new files and push them to GitHub:

  ```bash{promptUser: user}
  git commit -am "add commerce_base to project"
  git push origin master
  ```

1. Open your [CircleCI Dashboard](https://circleci.com/dashboard) to see tests running on your new commit. CircleCI will push the changes to your Site Dashboard after the tests pass.

1. Go to your newly created Site Dashboard > click <span class="glyphicons glyphicons-wrench"></span> **Dev** tab, click <span class="glyphicons glyphicons-embed-close"></span> **Code** > click **install later**. 

 You should now see your commit history. CircleCI will commit the build assets and push them to Dev after the automated tests built into our repository complete:

  ![Build Assets on Dev](../../images/guides/drupal-9-commerce/build-assets.png)

## Reinstall Drupal

The Build Tools Plugin command you used earlier automatically installed Drupal's standard profile in the Dev environment. Now that you have the Commerce profile, you need to install that instead.

1. Run the Drush command `site-install` to clear the database of the Standard profile before installing Commerce. This Drush command requires that the system be in writable (SFTP) mode:

  ```bash{promptUser: user}
  terminus connection:set $SITENAME.dev sftp
  terminus drush $SITENAME.dev -- site-install commerce
  ```

1. Review the last two lines of output to identify the username and password created:

  ```bash
  Installation complete.  User name: admin  User password: jTHD8hd85U         [ok]
  Congratulations, you installed Drupal!                                  [status]
  ```

1. Log in to your Drupal site in the Dev environment. The presence of the **Commerce** button on the toolbar indicates a successful install:

    ![Drupal Commerce in the Toolbar](../../images/guides/drupal-9-commerce/commerce-button.png)

## Next Steps

What you do next is up to you and your needs. Remember that you're now using Composer to manage core, modules, and dependencies for your site. Consider reading our [Composer Fundamentals and Workflows](/guides/composer) doc for more information.

## See Also

- [Drupal Commerce](https://drupalcommerce.org/)
