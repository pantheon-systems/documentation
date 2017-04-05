---
title: Introduction to Terminus
description: The Pantheon CLI.
contributors:  [scottmassey]
videoid: muv7vxu6vi
permalink:  docs/videos/:basename/
tags: [devterminus]
type: video
layout: video
---

You can interact with Pantheon using our command line interface—[Terminus](/docs/terminus). In doing so, you can work faster and more efficiently, automate repetitive tasks, and access additional functionality.

Use Terminus to interact with the Pantheon dashboard. For example, clear caches by running `terminus env:clear-cache`, which is the clear cache command, followed by the site name and environment, which in this case is robots.dev.

List pending core updates by running `terminus upstream:updates:list`, followed by the site name and environment. Then apply them by running `terminus upstream:updates:apply`.

And deploy changes between Dev, Test, and Live environments. I’ll do this by running `terminus env:deploy`, syncing the content from Live down to Test, then clearing the cache. Then when I’m ready to deploy to Live, I run `env:deploy` again, clearing the cache and choosing the Live environment.

If it can be accomplished in the Pantheon dashboard, it can probably be accomplished with Terminus.


You can also execute Drupal or WordPress-specific commands using Drush or WP-CLI. For example, the command  `terminus drush` followed by the site name and environment, then `user-create -- newuser1` with the email address of the user, can be used to create a new Drupal user.


Update WordPress plugins by running `terminus wp` the site name and environment, `-- plugin update --all`, to update all.

Terminus also makes it easy to automate tasks. In this example, we’ve scripted a set of Terminus commands to identify, install, and test WordPress updates. If the tests pass, as they do here, our script pushes the WordPress updates to our Live environment.

You can write scripts in Terminus to automate numerous other tasks for both WordPress and Drupal. You can find this script by going to pantheon.io and searching for automating security updates.

Terminus can help you access extra data and functionality that isn’t available in the Pantheon dashboard. For example, we can run the command `terminus workflow:watch` to stream workflow data on the `drushme` site.

In this example, I am switching the connection mode from SFTP to Git. And now I’m running a backup from the dashboard.


You can also add commands to Terminus by installing plugins. Official Pantheon plugins can be downloaded from our website or you can write your own.

That was a quick introduction to our command line tool, Terminus. Use it to script repetitive tasks or just use it to develop faster without touching your mouse.
