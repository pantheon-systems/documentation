---
title: Clone an Existing Pantheon Site.
description: Copy a Pantheon Site
contributors: [alexfornuto]
contenttype: [doc]
innav: [true]
categories: [create]
cms: [wordpress, drupal]
audience: [--]
product: [--]
integration: [--]
tags: [--]
reviewed: 2023-01-01
---

If you have a site on Pantheon that you wish to create a copy of (clone), you can do so using Terminus.


Drupal and WordPress sites can use Terminus to clone one Pantheon site to another from the command line. This method requires you to [install and authenticate Terminus](/terminus/install), then install the [Terminus Site Clone](https://github.com/pantheon-systems/terminus-site-clone-plugin) plugin.

Replace `<source>` and `<destination>` with target [site UUIDs](/guides/account-mgmt/workspace-sites-teams/sites#retrieve-the-site-uuis) or site names, and specify target development environment in place of `<env>` (dev or multidev):

```bash
terminus site:clone <source>.<env> <destination>.<env>
```
