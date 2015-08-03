---
title: Choosing Your Start State
description: See available options for starting new Drupal or WordPress sites and site import considerations.
category:
  - getting-started
keyword: start state, new site, site, pantheon, wordpress, drupal, distribution
---
When you create a new site with Pantheon, you're asked to choose a start state. You can choose a base Drupal or WordPress version, a Pantheon optimized distribution, or import an existing site.

## Start with Core
![Core Startup Options](/docs/assets/images/core-startup.png)

Starting with core gives you a blank site with the code pulled from the [Pantheon repository on GitHub](https://github.com/pantheon-systems). It's up to you to build from there.

This is useful if you are starting a new project, or if you have sophisticated Git use case such as a site-build that uses drush_make or the desire to import an existing Git project to preserve its history. See the advanced import instructions for more in those use cases.

We base our repository on the canonical source from drupal.org, and then extend it with [Pressflow](http://pressflow.org/) modifications and additional features to take advantage of the Pantheon runtime environment. The WordPress repository includes platform integration plugins and a pre-configured wp-config.php.

## Start with a Drupal Distribution

![Core distribution startup options.](/source/docs/assets/images/desk_images/214003.png)

We include a growing number of "Drupal products" as available start-states on Pantheon. These are also known as "installation profiles" or "distributions" and contain much more functionality than a Drupal core installation. Starting with a product will base your code off a maintained upstream maintained jointly by Pantheon and the product owner.

Drupal products offer a much richer out of the box experience, but are more complex under the hood. You still have access to 100% of the code with a Drupal product, but the increased complexity means it can be more challenging to customize and extend.

<div class="alert alert-info" role="alert">
<h4>Note</h4>
It is not possible to change the upstream of the site. To change the upstream, spinup a site with your desired upstream distribution.</div>
### Product UUID
There is a UUID for all the different systems you can install on Pantheon. WordPress on Pantheon is `e8fe8550-1ab9-4964-8838-2b9abdccf4bf`. To see all product UUID's available to you, run the following [Terminus](https://github.com/pantheon-systems/cli) command:
```
$ terminus products list
```

## Importing an Existing Site

For detailed information, see [Migrate Sites to Pantheon](/docs/articles/sites/migrate).

## Sit Back and Relax

Once you've selected your start state, Pantheon will build your site environments and prepare your site. When complete, just click the button to visit your Pantheon Dashboard.
![Site installation progress bar](/source/docs/assets/images/desk_images/214006.png)

## Enjoy your Pantheon Site!

Congratulations! Your Pantheon site environments have been configured. From the Dashboard, you can control your site's settings, manage team members, perform workflow operations, and a lot more.

![Pantheon dashboard after installation](/source/docs/assets/images/desk_images/214008.png)
