---
title: Drush
description: Interact with Drupal from the command line.
contributors:  [scottmassey]
videoid: w0iyypcydc
permalink:  docs/videos/:basename/
tags: [devdrush]
type: video
categories: [drupal]
layout: video
---
[Drush](http://www.drush.org/en/master/) is a command line shell for running and scripting Drupal tasks. Let’s install it and explore some commands.

Drush can be installed locally in various ways. You can find [instructions](http://www.drush.org/en/master/install/) at drush.org. Just be sure to use the version that corresponds to your Drupal installation and operating system.

If you install Pantheon’s command line tool, [Terminus](https://pantheon.io/docs/terminus/install/), you can run Drush commands from your local environment, as well as Pantheon-specific commands. I’ll be using Terminus in this video.

If you don’t already have a local environment configured, try installing [Kalabox](http://www.kalabox.io/). It comes pre-installed with Terminus and Drush.

Let’s view all the enabled modules on my Drupal 8 site by running `terminus drush` followed
by the site name and the environment—in this case the Dev environment of the drushme site—then 2 dashes to let Terminus know the following are all Drush parameters, not Terminus parameters.

I just want to see the modules that are enabled and not part of core, so I use the appropriate flags.

Now let’s add the libraries API module. Running `terminus drush`, with the site and environment again. Then `en`, which is short for drush enable, with the `-y` flag will attempt to enable the libraries module. But it doesn’t exist, so Drush installs the module. Note that code is being downloaded to our Dev environment here, so we’re in SFTP mode.

Next, let’s check for updates by running `terminus site` and environment, then `pm-updatestatus`. We see here there are some updates available. So we put the site into maintenance mode by running the `sset` command and changing the `system.maintenance_mode` value to 1

Now we run `pm-update`. This will download and apply all the updates, as well as update the database, if necessary. Done. We are up to date.

We can turn off maintenance mode by setting the previous system value to 0. If we need to, we can run `drush cr` to clear cache.

This was a quick introduction to Drush, the command line shell for running and scripting Drupal tasks.
