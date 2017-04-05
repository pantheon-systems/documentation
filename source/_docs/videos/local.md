---
title: Local Development
description: Sync your code, database, and files for local development.
videoid: 3albxwjv3k
contributors:  [dwayne]
permalink:  docs/videos/:basename/
tags: [local]
type: video
layout: video
---

Pantheon encourages on-server development. However, many developers prefer the speed and convenience of [local development](/docs/local-development) where sites run in virtual machines and don’t require Internet access.


Sync from Pantheon to local

Let’s explore how to sync your code, database, and files back-and-forth between Pantheon and a local environment.

To sync code from Pantheon to your local, we suggest Git for speed and simplicity. Just clone the codebase using the command provided in your site dashboard. By default, this sets Pantheon as the origin remote destination, which makes it easier to push changes.

Now we still need the files and database. On your site dashboard, select Database/Files, then Export. Alternatively, you can download a recent backup. Or you can use Terminus, our command line interface, to automate both this download and the subsequent import to your local environment. Just follow the directions of your preferred method. That’s it. Now you’re ready to start developing locally.


Sync from local to Pantheon

Use Git to add, commit, and push code changes up to Pantheon from your local development environment. Remember, you also need to sync the changes made to your database and media files. Since this can be tricky, we recommend using a configuration management solution, such as WP-CFM for WordPress or the Features module for Drupal 7. These tools help you push configuration separately, as part of your code base, without disturbing database content.

Kalabox

One application we highly recommend for local development is [Kalabox](/docs/kalabox) from Tandem. It’s pre-configured for Pantheon, and it automates many of the tasks we just covered.

This was a quick introduction to local development and Pantheon. Check out Kalabox, and try it yourself.
