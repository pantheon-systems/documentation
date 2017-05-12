---
title: Getting Started
subtitle: Clone Live to Dev
guidepage: true
anchorid: clone-live-to-dev
generator: pagination
layout: guide
pagination:
    provider: data.gettingstartedpages
use:
    - gettingstartedpages
permalink: docs/guides/getting-started/clone-live-to-dev/
nexturl: getting-started/connection-modes/
nextpage: Connection Modes
previousurl: getting-started/create-test-live/
previouspage: Create Test & Live
editpath: 06-clone-live-to-dev.md
---

In this lesson, we’ll explore your Live site and add an article or post to simulate working on a real production site. Then we’ll clone your Live site “down” to your Dev site.

1. Click the **<span class="glyphicons glyphicons-new-window-alt" aria-hidden="true"></span> Site Admin** button to open your Live site in a new tab. You’ll need to log in before being directed to the site administration dashboard.

    <div class="alert alert-info">
    <h4 class="info">Note</h4>
    <p>Your WordPress or Drupal username and password are the same set you created when you installed your Dev site for the first time.
    </p></div>

2. Now let’s create a new Drupal article or WordPress post! If you need help with this step, please reference the [WordPress Codex](https://codex.wordpress.org/Posts) or [Drupal Documentation](https://www.drupal.org/docs/8/administering-drupal-8-site/managing-content/) on how to add a post or article.  When finished, visit the front page of your site and confirm that you can see the new content.

3. When you’re done, navigate back to your Site Dashboard. Click the **<span class="glyphicons glyphicons-wrench" aria-hidden="true"></span> Dev** tab, and open your Dev site by clicking **<span class="glyphicons glyphicons-new-window-alt" aria-hidden="true"></span> Visit Development Site**.

    Notice that the content you just created on your Live site doesn’t appear here on your Dev site. This is because each environment is a stand-alone copy of your site, with its own codebase, database, and files.

    It’s important to develop on a recent copy of your site with the newest content, so let’s clone your Live site—with its new content—to your Dev environment.

4. Consider creating a backup before proceeding:

  The Backups tab is where you manage all the details for your site's backup. A backup is composed of 3 separate archives for database, files, and code. Let’s create a backup now:

    1. Click **<span class="glyphicons glyphicons-cloud-upload" aria-hidden="true"></span> Backups** on the <span class="glyphicons glyphicons-wrench" aria-hidden="true"></span> **Dev** tab of your Site Dashboard.
    2. Click **Create New Backup**.
    <br><br>

5. On the **<span class="glyphicons glyphicons-wrench" aria-hidden="true"></span> Dev** tab of your Site Dashboard click **<span class="glyphicons glyphicons-server" aria-hidden="true"></span> Database / Files**.

6. We’re going to clone the database and files from our Live site, so select **Live** from the dropdown menu.

    <div class="alert alert-danger" role="alert">
      <h4 class="info">Warning</h4>
      <p>As intended, this action will overwrite your Dev database and files. If you skipped the backup task you will be unable to recover this data hereafter.</p>
    </div>

7. Click **Clone the Database & files from Live into the Development Environment**.

8. When this is complete, click **<span class="glyphicons glyphicons-new-window-alt" aria-hidden="true"></span> Visit Development Site** to confirm that the content you created on your Live site now appears on your Dev site.

Nice work! You added a page to your Live site, then cloned this environment "down" to Dev. Your Dev environment is a safe place for editing code, and now it's up-to-date with your latest content.
