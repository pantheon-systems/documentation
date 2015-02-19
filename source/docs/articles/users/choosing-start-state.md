---
title: Choosing Your Start State
description: Available options for starting new sites and site import considerations
category:
  - getting-started
---

When you create a new site with Pantheon, you're asked to choose a start state. You can choose a base Drupal or Wordpress version, a Pantheon optimized distribution, or import an existing site.

## Start with Core

![Core Startup Options](/docs/assets/images/core-startup.png)

Starting with core gives you a blank site with the code pulled from the [Pantheon repository on github](https://github.com/pantheon-systems). It's up to you to build from there.

This is useful if you are starting a new project, or if you have sophisticated git-use case such as a site-build that uses drush_make or the desire to import an existing git project to preserve its history. see the advanced import instructions for more in those use-cases.

We base our repository on the canonical source from drupal.org, and then extend it with [Pressflow](http://pressflow.org/) modifications and additional features to take advantage of the Pantheon runtime environment. The WordPress repository includes platform integration plugins and a pre-configured wp-config.php.

## Start with a Drupal Distribution

![Core distribution startup options.](https://www.getpantheon.com/sites/default/files/docs/desk_images/214003)

We include a growing number of "Drupal products" as available start-states on Pantheon. These are also known as "installation profiles" or "distributions" and contain much more functionality than a Drupal core installation. Starting with a product will base your code off a maintained upstream maintained jointly by Pantheon and the product owner.

Drupal products offer a much richer out of the box experience, but are more complex under the hood. You still have access to 100% of the code with a Drupal product, but the increased complexity means it can be more challenging to customize and extend.

**Note**: It is not possible to change the upstream of the site. To change the upstream, spin up a site with your desired upstream distribution.

## Importing an Existing Site

For details, see our dedicated article [Importing an existing site into Pantheon](/docs/articles/users/importing-an-existing-site).

## Sit Back and Relax

Once you've selected your start state, Pantheon will build your site environments and prepare your site. When complete, just click the button to visit your Pantheon Dashboard.

![Site creation progress bar](https://www.getpantheon.com/sites/default/files/docs/desk_images/214006)

## Enjoy your Pantheon Site!

Congratulations! Your Pantheon site environments have been configured. From the dashboard, you can control your site's settings, manage team members, perform workflow operations, and a lot more.

![Pantheon dashboard after spin up](https://www.getpantheon.com/sites/default/files/docs/desk_images/214008)
