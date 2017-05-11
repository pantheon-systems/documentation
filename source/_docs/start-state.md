---
title: Choosing Your Start State
description: See available options for starting new Drupal or WordPress sites and site import considerations.
tags: [create]
categories: []
---
The site's framework is designated during the creation process on Pantheon. Available installations include WordPress and Drupal core, in addition to several publicly maintained distributions. [Custom Upstreams](/docs/custom-upstream/) that have been added to the platform will be available to members when an organization affiliation has been set.

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p>It is not possible to change the upstream of an existing site. Instead, you must create a new site with the desired upstream.</p>
</div>

## Start with Core
Starting with core gives you a blank site with the code pulled from the [Pantheon repository on GitHub](https://github.com/pantheon-systems). It's up to you to build from there.

This is useful if you are starting a new project, or if you have sophisticated Git use case such as a site-build that uses drush_make or the desire to import an existing Git project to preserve its history. See the [import instructions](/docs/start-state#importing-an-existing-site) for more information.

We base our repository on the canonical source from drupal.org, and then extend it with [Pressflow](http://pressflow.org/) modifications and additional features to take advantage of the Pantheon runtime environment. The WordPress repository includes platform integration plugins and a pre-configured wp-config.php.

- [WordPress](https://github.com/pantheon-systems/WordPress)
- [Drupal 8](https://github.com/pantheon-systems/drops-8) <a rel="popover" data-proofer-ignore data-toggle="tooltip" data-html="true" data-content="Install Requires SFTP Mode"><em class="fa fa-info-circle"></em></a>
- [Drupal 7](https://github.com/pantheon-systems/drops-7)

## Start with a Public Distribution
We include a growing number of "Drupal products" as available start-states on Pantheon. These are also known as installation profiles or distributions and contain much more functionality than a Drupal core installation.

Drupal distributions offer a much richer out of the box experience, but are more complex under the hood. You still have access to 100% of the code with a Drupal product, but the increased complexity means it can be more challenging to customize and extend.

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p>Public distributions are not maintained by Pantheon. If the upstream is out of date, contact the maintainer through <a href="https://www.drupal.org">Drupal.org</a> or the distribution's GitHub issue queue.
</p></div>


- [CiviCRM Starter Kit](https://github.com/kreynen/civicrm-starterkit-drops-7) <a rel="popover" data-toggle="tooltip" data-proofer-ignore data-html="true" data-content="Install Requires SFTP Mode"><em class="fa fa-info-circle"></em></a>
- [DKAN](https://github.com/NuCivic/dkan-drops-7)
- [Commerce Kickstart](https://github.com/commerceguys/kickstart-drops-7)
- [OpenAid](https://bitbucket.org/joelsteidl/openaid-drops-7)
- [Atrium](https://github.com/phase2/openatrium-drops-6)
- [OpenIdeaL](https://github.com/linnovate/openideal-on-drops-7)
- [Open Outreach](https://github.com/nedjo/openoutreach-drops-7)
- [OpenPublic](https://github.com/phase2/openpublic-drops-7)
- [Panopoly](https://github.com/populist/panopoly-drops-7)
- [Plato Típico](https://github.com/enzolutions/plato_tipico)
- [Pushtape](https://github.com/zirafa/pushtape-drops-7)
- [RedHen Raiser](https://github.com/thinkshout/redhenraiser-drops-7)


## Product UUID
There is a UUID for all the different systems you can install on Pantheon. WordPress on Pantheon is `e8fe8550-1ab9-4964-8838-2b9abdccf4bf`. To see all available products, run the following [Terminus](/docs/terminus/) command:
```
$ terminus upstream:list
```

## Importing an Existing Site

Your site migration has four phases. You’ll package your site, import it, test it out, and then change DNS and go live. With a good plan and understanding of the platform, the process will run smoothly. For detailed information, see [Migrate Sites to Pantheon](/docs/migrate).
