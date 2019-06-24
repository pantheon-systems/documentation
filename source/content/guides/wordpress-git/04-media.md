---
title: Using Git with SFTP & WordPress
subtitle: Upload Media
description: Beginners guide on how to use the WordPress Dashboard, an SFTP client, and your text editor of choice to work quickly, safely and easily on Pantheon's Git-based platform.
gitwordpress: true
anchorid: media
generator: pagination
layout: guide
type: guide
pagination:
    provider: data.gitwordpresspages
use:
    - gitwordpresspages
permalink: docs/guides/wordpress-git/media/
nexturl: guides/wordpress-git/remove-editor/
previousurl: guides/wordpress-git/themes/
editpath: wordpress-git/04-media.md
image: git-sftp-wp-docs-guide
---
In this lesson, we'll demonstrate how media files are handled on Pantheon. Media refers to anything in the `wp-content/uploads/` directory, which is intentionally excluded from version control. Git isn't needed to manage content like this, so we won't use version control in this lesson.

1. Let's upload a custom logo in the WordPress Dashboard. Feel free to use this example:

  ![New Logo](../../docs/assets/images/guides/git-wordpress/logo-wp-git-demo.png)

2. Within the **<span class="glyphicons glyphicons-wrench" aria-hidden="true"></span> Dev** environment's WordPress Dashboard, navigate to **Appearance** > **Customize** > **Site Identity** then upload a new logo.
3. Click **Save and Publish**:

  ![Uploaded Logo](../../docs/assets/images/guides/git-wordpress/logo-upload.png)

4. Refresh the **<span class="glyphicons glyphicons-wrench" aria-hidden="true"></span> Dev** environment's site URL and you should see your changes reflected.

  If you expected this change to show up as a pending change, ready to be committed - that's not how this kind of content works. It's not code; there won't be any changes in the Pantheon Site Dashboard to submit to version control since media is ignored by Git.

  Use your SFTP client to upload media to the file directory (`wp-content/uploads/`) outside the WordPress Dashboard:

  ![WP-Uploads file directory](../../docs/assets/images/guides/git-wordpress/uploads.png)

  For more information on managing files across environments, see [Use the Pantheon Workflow](/docs/pantheon-workflow/).
