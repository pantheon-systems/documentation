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

## Install Drupal Commerce

1. Move into the local repository for your site:

        cd $SITENAME

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
   git push origin master
   ```

5. Go to your newly created Site Dashboard. Under the <span class="glyphicons glyphicons-wrench"></span>**Dev** tab, click on <span class="glyphicons glyphicons-embed-close"></span>**Code**, then **install later**. You should now see your commit history. Once CircleCI completes the automated tests built into our upstream repository, it will commit the build assets and push them to Dev:

    ![Build Assets on Dev](/source/docs/assets/images/guides/drupal-8-commerce/build-assets.png)

## Wipe The Database and Reinstall Drupal

1. The build tools plugin we used at the start of this guide automatically installed Drupal for us. Now that we've installed the Commerce Base, we need to wipe the database and reinstall, without removing files from our file system. Use Terminus to switch the connection mode to SFTP, then use Drush to reinstall:

   ```bash
   terminus connection:set $SITENAME.dev sftp
   terminus drush $SITENAME.dev -- site-install commerce
   ```

   Review the last two lines of output to identify the username and password created:

   ```bash
   Installation complete.  User name: admin  User password: jTHD8hd85U         [ok]
   Congratulations, you installed Drupal!                                  [status]
   ```


2. Log in to your site admin dashboad. The presence of the **Commerce** button on the toolbar indicates a succefull install.

## Conclusion

What you do next is up to you and your needs. Remember that you're now using composer to manage modules and dependencies for your site. Consider reading our [Composer Fundamentals and Workflows](/docs/composer) doc for more information.

##See Also

 - [Drupal Commerce](https://drupalcommerce.org/)
