---
title: Using Git with SFTP & WordPress
subtitle: Install Plugins
description: Beginners guide on how to use the WordPress Dashboard, an SFTP client, and your text editor of choice to work quickly, safely and easily on Pantheon's Git-based platform.
anchorid: plugins
layout: guide
cms: "WordPress"
categories: [develop]
tags: [git, plugins, sftp]
type: guide
permalink: docs/guides/wordpress-git/plugins/
editpath: wordpress-git/02-plugins.md
image: git-sftp-wp-docs-guide
reviewed: "2020-02-26"
---

This lesson demonstrates how to develop using the WordPress Dashboard in SFTP mode. We'll install a few plugins and submit each one to version control as individual commits.

1. Navigate to **<span class="glyphicons glyphicons-embed-close" aria-hidden="true"></span> Code** in the **<span class="glyphicons glyphicons-wrench" aria-hidden="true"></span> Dev** tab of your Site Dashboard. Confirm your Connection Mode is set to **SFTP**.

1. Now log in to your Dev site by clicking the **<span class="glyphicons glyphicons-new-window-alt" aria-hidden="true"></span> Site Admin** button.

  ![Add new plugin](../../../images/guides/git-wordpress/sftp-mode.png)

1. On the left admin menu, select **Plugins**, then **Add New**.

1. Search for the **Yoast** plugin, then click **Install Now**:

  ![Install Pantheon Advanced Page Cache plugin](../../../images/guides/git-wordpress/install-yoast.png)

  If you encounter a prompt for FTP credentials, you're either working on the wrong environment or you're using the wrong connection mode. Don't try to authenticate FTP prompts within the WordPress Dashboard, it won't work (by design). Using the WordPress Dashboard to add or modify code is only allowed using the **SFTP** connection mode on the **<span class="glyphicons glyphicons-wrench" aria-hidden="true"></span> Dev** environment.

1. Return to the Pantheon Site Dashboard and click the yellow notification to review file changes as a result of our actions in the WordPress Dashboard:

  ![View file changes prompt](../../../images/guides/git-wordpress/file-changes.png)

  You should see the following files for our recently installed plugin:

  ![View advanced page cache plugin files](../../../images/guides/git-wordpress/view-yoast.png)

1. Rather than piling a bunch of changes on top of this plugin, get into the habit of saving code in small incremental amounts with meaningful commit messages.

  Write a message that summarizes your work to let your team (and your future self) know what these changes do and which feature(s) they pertain to. For example, _Add Yoast plugin Version: 5.7_ is much better than _New plugin_ or _asdfasdf_.

 Click **Commit** to submit work from the WordPress Dashboard to Git in the Site Dashboard:

  ![Commit advanced page cache plugin files](../../../images/guides/git-wordpress/commit-yoast.png)

1. For practice, add these plugins next, each with their own commit message. These plugins allow your site to take advantage of some of Pantheon's performance optimizations:

   - Pantheon Advanced Page Cache
   - WordPress Native PHP Sessions
   - Pantheon HUD

  The commit log within the Pantheon Site Dashboard should look something like this:

  ![Several Plugins Added](../../../images/guides/git-wordpress/several-plugins-added.png)

 <Accordion title="Learn more about these plugins" id="unique-anchor2" icon="lightbulb">

  #### [Pantheon Advanced Page Cache](https://wordpress.org/plugins/pantheon-advanced-page-cache/)

  Automatically clear related pages from [Pantheon's Global CDN](/global-cdn) when you update content. Without this plugin, pages expire from cache after 10 minutes (600 seconds) by default. This plugin allows fresh content to be immediately served to anonymous visitors.

  #### [WordPress Native PHP Sessions](https://wordpress.org/plugins/pantheon-advanced-page-cache/)

  This plugin provides a more scalable way to handle sessions than PHP's default session manager. Some plugins will require this to run on Pantheon's distributed infrastructure. For more details, see [WordPress and PHP Sessions](/wordpress-sessions/#troubleshooting-session-errors).

  #### [Pantheon HUD](https://wordpress.org/plugins/pantheon-hud/)

  Provides situational awareness within the WordPress Dashboard when working on the Pantheon platform. It's helpful to have a reminder of which environment you're in, as well as quick access to links to get back to Pantheon's Dashboard, or to interface with your WordPress installation via the command line:

  ![Pantheon HUD](../../../images/pantheon-hud.png)

 </Accordion>

Bam! You just nailed our first demonstration of using version control with WordPress on Pantheon sites. Follow this same approach to update plugins and for any other development tasks you normally handle in the WordPress Dashboard.
