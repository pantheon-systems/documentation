---
title: Drupal 8 and Composer on Pantheon Without Continuous Integration
description: Learn how to use Views Cache Tags module along with custom code to control Pantheon Advanced Page Cache.
tags: [moreguides]
categories: [drupal]
type: guide
permalink: docs/guides/:basename/
contributors:
  - andrew
  - dwayne
  - davidneedham
---

Drupal 8 and Composer on Pantheon (Without Continuous Integration)
In an ideal situation, you might ignore the vendor directory and use [an automated build step with continuous integration](https://pantheon.io/docs/guides/build-tools/) to install your site with composer on the fly. But sometimes your project doesn’t have the budget or time needed to justify this workflow. 

In this guide, we’re going to simplify things and run through the bare necessities to use composer to install your Drupal 8 site on your local machine and push that to Pantheon. We’ll then demonstrate how to add a module using the same process.

#Installing Drupal

To begin, we’ll want to start a brand new Drupal 8 site on Pantheon from our drops-8-composer upstream. This upstream is different from vanilla Drupal in that you must use Composer to install the site. 

Create a new site using Drops 8 Composer

```
terminus site:create andrew-drops-8-composer 'Andrew Drops 8 Composer' drops-8-composer
```

##Composer install

Normally the next step would be going through the standard Drupal installation. But since we’re using Composer, none of the core files exist yet. Let’s clone the site locally and build Drupal core with Composer.

```
terminus connection:info andrew-drops-8-composer.dev --field=git_command
```

Copy everything it returns starting with `git clone`, paste, and hit enter.

```
cd andrew-drops-8-composer

ls
```

We should see composer.json and composer.install. Let’s use Composer to install Drupal core.

`composer install`

![image of terminal running a composer install](source/docs/assets/images/guides/drupal-8-composer-no-ci/drops-8-composer-install.png)

`git status`

The drops-8-composer .gitignore file assumes that you’re using a build step with CI. To make it compatible with this method we need to remove everything above the CUT section. As-is critical components, such as Drupal core and contrib modules, will be ignored and not pushed to Pantheon. Now let’s run git status again to make sure everything is included.

`git status`

![image of git status showing the changed files in red](source/docs/assets/images/guides/drops-8-composer-git-status-after-installing-d8.png)


`git add .`

(Note: The vendor directory is being committed. This is because Pantheon needs the full site artifact. If you prefer to ignore the vendor directory then take a look at our documentation on the more advanced automated workflow with a build step.)

```
git commit -m 'Drupal 8 install

git push
```

##Installing Drupal

Now that the code for Drupal core exists on our Pantheon site, we need to actually install Drupal.

Change to SFTP mode.

`terminus connection:set andrew-drops-8-composer.dev sftp`

Use Terminus Drush to install Drupal.

`terminus drush andrew-drops-8-composer.dev -- site-install -y`

Log in to your new Drupal 8 site.

`terminus drush andrew-drops-8-composer.dev -- uli`

#Adding a module

Next, let’s add a new module to our site. For this example, we’ll add the address module. We advocate working in feature branches on Pantheon, so let's create a git branch and spin up a Multidev environment.

```
git checkout -b addr-module

composer require "drupal/address ~1.0"

composer update

git add .

git commit -m 'Adding the address module with Composer'

git push -u origin addr-module
```

Spin up a Multidev environment from the git branch we just pushed up to Pantheon.

![image of terminal running a composer install](source/docs/assets/images/guides/drupal-8-composer-no-ci/drops-8-composer-multidev-creation.png)


`terminus multidev:create andrew-drops-8-composer.dev addr-module`

Log in to your new environment and verify that the address module exists.

`terminus drush andrew-drops-8-composer.addr-module -- uli`

(image here) ![image of terminal running a composer install](source/docs/assets/images/guides/drops-8-composer-drupal-8-address-module-install.png)


#More resources

...

[comment]: <Alex is there an algorithmic way to link these assetts rather than us manualy suggesting them?>
