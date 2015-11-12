---
title: Choosing Your Start State
description: See available options for starting new Drupal or WordPress sites and site import considerations.
category:
  - getting-started
keyword: start state, new site, site, pantheon, wordpress, drupal, distribution
---
When you create a new site with Pantheon, you can choose a base Drupal or WordPress version, a Pantheon optimized distribution, or import archives for an existing site.

## Start with Core

Starting with core gives you a blank site with the code pulled from the [Pantheon repository on GitHub](https://github.com/pantheon-systems). It's up to you to build from there.

This is useful if you are starting a new project, or if you have sophisticated Git use case such as a site-build that uses drush_make or the desire to import an existing Git project to preserve its history. See the [import instructions](/docs/articles/sites/create/choosing-start-state#importing-an-existing-site) for more information.

We base our repository on the canonical source from drupal.org, and then extend it with [Pressflow](http://pressflow.org/) modifications and additional features to take advantage of the Pantheon runtime environment. The WordPress repository includes platform integration plugins and a pre-configured wp-config.php.

## Start with a Drupal Distribution

We include a growing number of "Drupal products" as available start-states on Pantheon. These are also known as "installation profiles" or "distributions" and contain much more functionality than a Drupal core installation. Starting with a product will base your code off a maintained upstream maintained jointly by Pantheon and the product owner.

Drupal products offer a much richer out of the box experience, but are more complex under the hood. You still have access to 100% of the code with a Drupal product, but the increased complexity means it can be more challenging to customize and extend.

<div class="alert alert-info" role="alert">
<h4>Note</h4>
It is not possible to change the upstream of the site. To change the upstream, create a site with your desired upstream distribution.</div>

### Product UUID
There is a UUID for all the different systems you can install on Pantheon. WordPress on Pantheon is `e8fe8550-1ab9-4964-8838-2b9abdccf4bf`. To see all product UUID's available to you, run the following [Terminus](/docs/articles/local/cli/) command:
```
$ terminus upstreams list
```

## Importing an Existing Site

Your site migration has four phases. You’ll package your site, import it, test it out, and then change DNS and go live. With a good plan and understanding of the platform, the process will run smoothly. For detailed information, see [Migrate Sites to Pantheon](/docs/articles/sites/migrate).

## Enjoy your Pantheon Site!

Congratulations! Your Pantheon site environments are now configured; just click the button to visit your Pantheon Dashboard. From the Dashboard, you can control your site's settings, manage team members, perform workflow operations, and a lot more.
