---
title: Drupal Commerce on Drupal 8
description: Use Composer to Install Drupal Commerce on Pantheon, using Drupal 8
contributors: [alexfornuto, stevector]
tags: [drupal, siteintegrations, moreguides]
type: guide
permalink: docs/guides/:basename/
---

This guide covers installing Drupal 8 Commerce, a Drupal implementation designed specifically for e-commerce. At the end of this guide you will have a Drupal Commerce site, GitHub repository, and Circle CI configuration for testing.


## Before You Begin

This process uses Composer to manage modules and dependencies. Before proceeding, you may wish to consult the following docs:

 - [Composer Fundamentals and Workflows](/docs/composer)
 - [Build Tools](/docs/guides/build-tools)


In addition to Pantheon, you will need accounts at:

 - [GitHub](https://github.com)
 - [CircleCI](https://cicleci.com)


1.  Follow the [Before You Begin](/docs/guides/build-tools/#before-you-begin) section of the Build Tools guide to install Composer, Terminus, and the Terminus Build Tools plugin on your local computer, and create machine tokens for [GitHub](https://help.github.com/articles/creating-an-access-token-for-command-line-use/){.external} and [CircleCI](https://circleci.com/account/api){.external}. Export the tokens to your current terminal session, as described below.

2.  This guide uses several variables in example [Terminus](/docs/terminus) commands. This lets you copy and paste without needing to change the variable. For this to work, you must first export the variables in your local terminal session:

    ```bash
    export SITENAME=yoursitenamehere
    export GITHUB_TOKEN=yourgithubtokenhere
    export CIRCLE_TOKEN=yourcirclecitokenhere
    ```

## Create A New Drupal 8 Site

1.  Using the Terminus Build Tools plugin, create a new Drupal 8 site from the Pantheon [Example Drops 8 Composer](https://github.com/pantheon-systems/example-drops-8-composer) repository on GitHub:

    ```bash
    terminus build:project:create pantheon-systems/example-drops-8-composer $SITENAME
    ```
    At this point *do not* go to the web interface to continue installation.

2.  Use Terminus to retrieve the Git URL for your new site and pass it to an environment variable:

    ```
    export GITURL=`terminus connection:info $SITENAME.dev --field=git_url`
    ```

2.  You now have a repository on GitHub containing your new site. Clone a local copy to your `projects` folder:

    ```bash
    cd ~/projects
    git clone git@github.com:username/$SITENAME.git
    ```

    Remember to replace `username` with your GitHub username.

## Install Drupal Commerce in a New Branch

1.  Move into the local repository for your site, and create a new branch:

        cd $SITENAME
        git checkout -b commerce

    By installing Drupal Commerce in a new branch, we allow CircleCI tests to validate the changes before committing them to master.

2.  Use Composer to install the Commerce base:

    ```bash
    composer config repositories.commerce_base vcs https://github.com/drupalcommerce/commerce_base
    composer require drupalcommerce/commerce_base dev-8.x-1.x
    ```

3.  Running `git status` should show that the `composer.json` and `composer.lock` files have changed:

    ![Git Status showing updated Composer files](/source/docs/assets/images/guides/drupal-8-commerce/git-status.png)

4.  Commit the new files and push them to GitHub:

    ```bash
    git commit -am "add commerce_base to project"
    git push origin commerce
    ```

5.  If you visit your new repository on GitHub, you can easily create a new Pull Request:

    ![Click the button to create a new Pull Request](/source/docs/assets/images/guides/drupal-8-commerce/pr-button.png)

6.  Once you create your Pull Request, you may notice that GitHub is already displaying the current status of the tests CircleCI began when you pushed the new branch up:

    ![GitHub displaying CircleCI test status in the Pull Request](/source/docs/assets/images/guides/drupal-8-commerce/circle-tests.png)

CircleCI will create a multidev environment for us, where we will continue.

## Wipe The Database

1.  From the Site Dashboard, go to the multidev environment:

    ![The Multidev tab of the Site Dashbaord](/source/docs/assets/images/guides/drupal-8-commerce/multidev.png)

2.  Under **Database / Files**, click **Wipe**. Follow the instructions to wipe the database for this environment:

    <div class="alert alert-danger" role="alert">
      <h4 class="info">Warning</h4>
      <p markdown="1">Be *sure* you are on the corrent environment before you wipe the database, to avoid potential loss of data.</p>
    </div>

    ![Wipe the Multidev environments database](/source/docs/assets/images/guides/drupal-8-commerce/wipe-db.png)

3. Click on the **Visit Site** link and configure your site options through the Drupal installer:

    ![Drupal Configuration](/source/docs/assets/images/guides/drupal-8-commerce/drupal-config.png)

## Merge and Import to Live

## Conclusion

What you do next is up to you and your needs. Remember that you're now using composer to manage modules and dependencies for your site. Consider reading our [Composer Fundamentals and Workflows](/docs/composer) doc for more information.

##See Also

 - [Drupal Commerce](https://drupalcommerce.org/)
