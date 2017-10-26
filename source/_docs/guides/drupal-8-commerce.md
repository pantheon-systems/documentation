---
title: Drupal Commerce on Drupal 8
description: Use Composer to Install Drupal Commerce on Pantheon, using Drupal 8
contributors: [alexfornuto, rachelwhitton, albertcausing]
tags: [drupal, siteintegrations, moreguides]
---

This guide covers installing Drupal 8 Commerce, a Drupal implementation designed specifically for e-commerce.


## Before You Begin

 - This process uses Composer to manage modules and dependencies. Before proceding, you may wish to consult the following docs:
     - [Composer Fundamentals and Workflows](/docs/composer)
     - [Build Tools](/docs/guides/build-tools)
<br>
<br>
 - This guide uses several variables in example [Terminus](/docs/terminus) commands. This lets you copy and paste without neeting to change the variable. For this to work, you must first export the variables in your local terminal session:

    ```bash
    export SITENAME=yoursitenamehere
    export GITURL=`terminus connection:info $SITENAME.dev --field=git_url`
    ```

## Create A New Drupal 8 Site

1.  Create a new site on Pantheon, note site name, deploy Drupal 8:

        terminus site:create $SITENAME "My Awesome Drupal Commerce Site" drupal8

    At this point *do not* go to the web interface to continue installation.

2.  Put the site in git mode from the Site Dashboard, or use Terminus:

        terminus connection:set $SITENAME.dev git

## Replace The Upstream

1.  In your local terminal, navigate to your projects, or repositories directory:

        cd ~/projects/

2.  Execute the following commands to build the new local environment, and push it to Pantheon:

    ```bash
    composer create-project pantheon-systems/example-drops-8-composer $SITENAME
    cd $SITENAME
    composer prepare-for-pantheon
    git init
    git add -A .
    git commit -m "web and vendor directory from composer install"
    git remote add origin $GITURL
    git push --force origin master
    ```

    See our [Example Drops 8 Composer](https://github.com/pantheon-systems/example-drops-8-composer) repository on GitHub for a more detailed look at what we've just installed.

3.  Return to the Site Dashboard and switch to SFTP mode, or use terminus:

        terminus connection:set $SITENAME.dev sftp

4.  From your Site Dashboard, click on **Visit Development Site** and continue installing Drupal, selecting the **Standard** profile.

    ![Visit Development Site Button](/source/docs/assets/images/guides/drupal-8-commerce/visit-dev-site.png)

## Install The Drupal Commerce Module

1.  Switch site back to git mode:

        terminus connection:set $SITENAME.dev git

2.  Execute these composer commands to install Drupal Commerce:

        composer config repositories.drupal composer https://packages.drupal.org/8
        composer update
        composer require "drupal/commerce 2.x-dev"

    Refer to the [Drupal Commerce Docs](http://docs.drupalcommerce.org/v2/getting-started/install.html) for more information.

3.  Use the composer prepare-for-pantheon command again to get rid of submodule repositories:


        composer prepare-for-pantheon

4.  Commit and push changes to Pantheon:

    ```bash
    git status
    git add -A .
    git commit -m "Install Drupal Commerce"
    git push origin master
    ```

5.  Switch your site back to SFTP mode:

        terminus connection.set $SITENAME.dev sftp

    <div class="alert alert-danger" role="alert">
    <h4 class="info">Warning</h4>
    <p markdown="1">If you don't switch back to SFTP mode before continuing you can create database errors that can break your site's functionality.</p>
    </div>

6.  Return to your site's admin panel and install the modules Commerce Product, Commerce Checkout, and Commerce Cart:

    ![Install Commerce Modules](/source/docs/assets/images/guides/drupal-8-commerce/install-modules.png)

## Conclusion

What you do next is up to you and your needs. Remember that you're now using composer to manage modules and dependencies for your site. Consider reading our [Composer Fundamentals and Workflows](/docs/composer) doc for more information.

##See Also

 - [Drupal Commerce](https://drupalcommerce.org/)
