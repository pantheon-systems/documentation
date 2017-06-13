---
title: Choosing Your Start State
description: See available options for starting new Drupal or WordPress sites and site import considerations.
tags: [create]
categories: []
---
The site's framework is selected during the creation process. Pantheon Upstreams provide default installations of WordPress, Drupal 8 and Drupal 7. [Custom Upstreams](/docs/custom-upstream/) are available to team members when the organization is associated during site creation.

## Pantheon Upstreams
We base our Drupal 7 repository on the canonical source from drupal.org, and then extend it with [Pressflow](http://pressflow.org/) modifications and additional features to take advantage of the Pantheon runtime environment. The WordPress repository includes platform integration plugins and a pre-configured `wp-config.php`.

- [WordPress](https://github.com/pantheon-systems/WordPress)
- [Drupal 8](https://github.com/pantheon-systems/drops-8) <a rel="popover" data-proofer-ignore data-toggle="tooltip" data-html="true" data-content="Install Requires SFTP Mode"><em class="fa fa-info-circle"></em></a>
- [Drupal 7](https://github.com/pantheon-systems/drops-7)

## Product UUID
There is a UUID for all the different systems you can install on Pantheon. WordPress on Pantheon is `e8fe8550-1ab9-4964-8838-2b9abdccf4bf`. To see all available products, run the following [Terminus](/docs/terminus/) command:
```
$ terminus upstream:list
```

## Importing an Existing Site

Your site migration has four phases. You’ll package your site, import it, test it out, and then change DNS and go live. With a good plan and understanding of the platform, the process will run smoothly. For detailed information, see [Migrate Sites to Pantheon](/docs/migrate).
