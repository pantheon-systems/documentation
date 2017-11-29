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

 - [GitHub](https://github.com){.external}
 - [CircleCI](https://circleci.com){.external}


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

1. Move into the local repository for your site, and create a new branch:

        cd $SITENAME
        git checkout -b commerce

   By installing Drupal Commerce in a new branch, we allow CircleCI tests to validate the changes before committing them to master.

2. Use Composer to install the Commerce base:

   ```bash
   composer config repositories.commerce_base vcs https://github.com/drupalcommerce/commerce_base
   composer require "drupalcommerce/commerce_base dev-8.x-1.x" "drupal/commerce:~2.0"  "drupal/admin_toolbar:~1.0"  "drupal/swiftmailer:~1.0"
   ```

    <div class="alert alert-info" role="alert">
    <h4 class="info">Note</h4>
    <p markdown="1">The commands above include dependencies required but not listed for `commerce_base`. You can follow the [open GitHub issue](https://github.com/drupalcommerce/commerce_base/pull/7){.external} for more information.</p>
    </div>

3. Running `git status` should show that the `composer.json` and `composer.lock` files have changed:

   ![Git Status showing updated Composer files](/source/docs/assets/images/guides/drupal-8-commerce/git-status.png)

4. Commit the new files and push them to GitHub:

   ```bash
   git commit -am "add commerce_base to project"
   git push origin commerce
   ```

5. If you visit your new repository on GitHub, you can easily create a new Pull Request:

   ![Click the button to create a new Pull Request](/source/docs/assets/images/guides/drupal-8-commerce/pr-button.png)

6. Once you create your Pull Request, you may notice that GitHub is already displaying the current status of the tests CircleCI began when you pushed the new branch up:

   ![GitHub displaying CircleCI test status in the Pull Request](/source/docs/assets/images/guides/drupal-8-commerce/circle-tests.png)

7. CircleCI will create several multidev environments while it conducts the tests included in the upstream repository. Wait for them to complete, to identify the environment on which we'll continue working:


   ![Completed CI Tests](/source/docs/assets/images/guides/drupal-8-commerce/completed-tests.png)

   In this example, the environment is `ci-5`.

## Wipe The Database and Reinstall Drupal

1. The build tools plugin we used at the start of this guide automatically installed Drupal for us. Now that we've installed the Commerce Base, we need to wipe the database and reinstall, without removing files from our file system. Use the following terminus command, replacing `ci-5` with the correct multidev name, identified in the previous section:

   ```bash
   terminus drush $SITENAME.ci-5 -- site-install commerce
   ```

   Review the last two lines of output to identify the username and password created 

2. From the Site Dashboard, go to the multidev environment:

   ![The Multidev tab of the Site Dashbaord](/source/docs/assets/images/guides/drupal-8-commerce/multidev.png)

## Install Drupal & Export The Config

1. Click on the **Visit Site** link and configure your site options through the Drupal installer:

   ![Drupal Configuration](/source/docs/assets/images/guides/drupal-8-commerce/drupal-config.png)

2. After you've completed the installer, you can verify the presence of Drupal Commerce by the icon in the admin panel:

   ![Drupal Commerce Icon](/source/docs/assets/images/guides/drupal-8-commerce/commerce-module-icon.png)

3. Go back to your local terminal, and use Terminus to run the Drush command `config-export`:

   ```bash
   terminus drush $SITENAME.<multidev> -- config-export -y
   ```
   Replace `<multidev>` with the name of your multidev environment. By default, it will start with `ci-`.

4. On the Site Dashboard, you'll see that this command has created lots of new files:

   ![New Files to Commit](/source/docs/assets/images/guides/drupal-8-commerce/config-export-changes.png)

   Enter a relevant commit message and click **Commit**.

## Merge and Import to Live

1. Back at GitHub, you're ready to merge your Pull Request.

## Conclusion

What you do next is up to you and your needs. Remember that you're now using composer to manage modules and dependencies for your site. Consider reading our [Composer Fundamentals and Workflows](/docs/composer) doc for more information.

##See Also

 - [Drupal Commerce](https://drupalcommerce.org/)
