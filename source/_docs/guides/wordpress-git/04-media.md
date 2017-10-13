---
title: WordPress Development
subtitle: Upload Media
description: Beginners guide on how to use the WordPress Dashboard, an FTP client, and your text editor of choice to work quickly, safely and easily on Pantheon's Git-based platform.
gitwordpress: true
anchorid: media
generator: pagination
layout: guide
pagination:
    provider: data.gitwordpresspages
use:
    - gitwordpresspages
permalink: docs/guides/wordpress-git/media/
nexturl: guides/wordpress-git/next-steps/
previousurl: guides/wordpress-git/themes/
editpath: wordpress-git/04-media.md
image: git-commit-thumb
---
In our theme settings, let’s upload a custom logo. I spent a few days in Photoshop making this one, feel free to save it to your desktop and use it for this guide:

![New Logo](/source/docs/assets/images/guides/git-wordpress/logo-wp-git-demo.png)

Go to the WordPress Dashboard and select Appearance, Customize and Site Identity, and upload the file. Click “Save and Publish.”

![Uploaded Logo](/source/docs/assets/images/guides/git-wordpress/logo-upload.png)

Now if we look at our dashboard, we would expect to see that new file waiting to be committed. But you will notice it is not. This is because the theme places that file in wp-content/uploads directory.

![WP-Uploads file directory](/source/docs/assets/images/guides/git-wordpress/uploads.png)

Files in wp-content/uploads  are not tracked by Git for a few reasons. The most important reason is that content creators will need the ability to upload files here in the live environment, and references to these files are often stored in the database either as wp_options or in the content of posts. Uploads are really content not code, so Pantheon ignores this directory when it comes to git.

This can lead to some tricky situations around deploying changes to a live running site. The only safe way to do this is to always treat the live site as the “source of truth” for content (since anyone could put up a new post at any time). Deployment workflows that include content changes are another topic we cover elsewhere. There are lots of options, but no one-size-fits all solutions.
