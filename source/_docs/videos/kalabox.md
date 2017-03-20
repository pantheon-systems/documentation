---
title: Local Development with Kalabox
description: Pantheon sites and local tools at your fingertips.
contributors:  [dwayne]
videoid: vz8psmw3lv
permalink:  docs/videos/:basename/
tags: [local]
type: video
categories: []
layout: video
---
We recommend [Kalabox](/docs/kalabox) as an easy-to-use local development solution. Let’s explore why, install Kalabox, and configure a basic workflow.

Kalabox is free and open-source. It can be installed on any major operating
System and was purpose built for WordPress and Drupal development.

Most importantly, Kalabox makes it easy to sync your code, database, and files with Pantheon.

It’s container based and very similar to the Pantheon stack. It integrates containerized components such as Solr, Varnish, and Redis. Using Kalabox is the closest thing to actually running Pantheon locally.

Common tools come pre-integrated, including [Terminus](/docs/terminus), Drush, WP-CLI, Git, xdebug, and many more.

Configuring Kalabox is straightforward. Start by downloading it from [Kalabox.io](http://www.kalabox.io/). We’re doing this on a Mac, but the same steps can be followed in Windows or Linux. Next, simply open the image and double-click the installer. This will also install [Docker](https://www.docker.com/), the container technology that Kalabox is built on. To connect to Pantheon, select Add an account.

Kalabox asks for a [machine token](/docs/machine-tokens), which is generated from the Account tab in your Pantheon User Dashboard. Once added, you’re all set to create a new website or pull down an existing website from your Pantheon account.

Pull down an existing site from Pantheon by selecting it from the site list. Then follow the instructions. You can pull down the Dev environment or select a specific Multidev environment for your work.

Kalabox lets you use tools on your site—like Terminus, Drush or WP-CLI—without any further configuration. Note that it also includes the `.env` file automatically, so Terminus doesn’t require `--site` or `env`.

Pushing code, database, and files up to Pantheon is automated through their user interface. Or you can type `kbox push` or use standard Git commands on the command line

Kalabox is officially supported by Tandem and a growing group of open source contributors. Free assistance is available in the [Slack channel](https://slackpass.io/kalabox) and [GitHub pages](https://github.com/kalabox/kalabox/issues) linked from kalabox.io

Kalabox is the easiest way to start working locally with Pantheon, while still using your favorite development tools.

It only takes a few minutes to get started, and it’s free. Check it out!
