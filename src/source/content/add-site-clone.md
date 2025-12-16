---
title: Clone an Existing Pantheon Site
description: Copy a Pantheon site
contributors: [wordsmither]
contenttype: [doc]
innav: [true]
categories: [create]
cms: [wordpress, drupal]
audience: [agency, development]
product: [--]
integration: [--]
tags: [--]
reviewed: 2023-04-06
showtoc: false
---

If you have a site on Pantheon that you wish to create a copy of (clone), you can do so using Terminus.

To do so:

1. [Install and authenticate Terminus](/terminus/install)

1. Install the [Terminus Site Clone](https://github.com/pantheon-systems/terminus-site-clone-plugin) plugin.

1. Replace `<source>` and `<destination>` with target [site UUIDs](/guides/account-mgmt/workspace-sites-teams/sites#retrieve-the-site-uuis) or site names, and specify target development environment in place of `<env>` (dev or multidev):

   ```bash
   terminus site:clone <source>.<env> <destination>.<env>
   ```
