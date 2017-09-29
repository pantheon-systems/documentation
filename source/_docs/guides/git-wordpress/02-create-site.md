---
title: Git and WordPress on Pantheon
subtitle: Adding plugins and themes though the WP UI
anchorid: git-wordpress
layout: guide
gitwordpresspage: true
generator: pagination
pagination:
    provider: data.gitwordpresspages
use:
    - gitwordpresspages
permalink: docs/guides/git-wordpress/create-site/
nexturl: guides/git-wordpress/parent-child-theme/
previousurl: guides/git-wordpress/
editpath: git-wordpress/02-create-site.md
---
## Adding plugins and themes though the WP UI

Now let’s add some plugins. Since we are using SFTP (the extra “S” means “secure;” information is encrypted going back and forth), be sure the Site Dashboard’s Connection Mode is set to “SFTP.” This SFTP connection mode is an important bit of magic -- Pantheon keeps an eye out for changes you make, and allows you to save them so they can’t go away.

![Enable SFTP Mode](/source/docs/assets/images/guides/git-wordpress/sftp-mode.png)

On the left admin menu, select “Plugins” and “Add New.” 

![Add new plugin](source/docs/assets/images/guides/git-wordpress/add-new-plugin.png)

Then enter “WPFormes Lite” into the search bar. When the plugin appears, click “Install.” 

![Install WP-Forms plugin](/source/docs/assets/images/guides/git-wordpress/install-wp-forms.png)

Once the plugin is downloaded, return to your Pantheon Site Dashboard. You should see the plugin details indicating you have made changes to your codebase.

![View WP-Forms files](/source/docs/assets/images/guides/git-wordpress/view-wp-forms.png)

Rather than piling a bunch of changes on top of this plugin, try to develop a habit of saving code in small incremental amounts. Enter a message which lets your team (or future you) about the code you are adding and what feature it pertains to. “Adding WPForms Plugin for landing page form” is much better than “Changing stuff” or “asdfasdf.”

Click Commit to save the code. For practice, add these plugins next, each with their own commit message:
Envira Gallery Lite
Slider by Soliloquy
FakerPress

Your Pantheon Dashboard should look something like this:

![Several Plugins Added](/source/docs/assets/images/guides/git-wordpress/several-plugins-added.png)

The first three plugins were added for practice. FakerPress, however, allows us to add dummy content to give us a better idea of what a site will really look like. Activate the plugin and add some posts.

![Added FakerPress Plugin](/source/docs/assets/images/guides/git-wordpress/fakerpress.png)