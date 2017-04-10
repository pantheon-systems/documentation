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
nexturl: getting-started/connection-modes
nextpage: Connection Modes
previousurl: getting-started/create-test-live
previouspage: Create Test & Live
---

In this lesson, we’ll explore your Live site and add a page to simulate work on a real production site. Then we’ll clone your Live site “down” to your Dev site.

1. Click the **Site Admin** button to open your Live site in a new tab. You’ll need to log in before being directed to the site administration dashboard.

<div class="alert alert-info">
<h4 class="info">Note</h4>
<p>Your WordPress or Drupal username and password are the same set you created when you configured your Dev site for the first time.
</p></div>

2. Now let’s create a new page! If you need help with this step, please reference the <a href="https://codex.wordpress.org/Posts/" target="_blank">WordPress Codex</a> or <a href="https://www.drupal.org/docs/8/administering-drupal-8-site/managing-content/" target="_blank">Drupal Documentation</a> on how to add a page to your site.

3. When you’re done, navigate back to your Site Dashboard. Click the Dev tab, and open your **Dev** site by clicking **Visit Development Site**.

  Notice that the page you just created on your Live site doesn’t appear here on your Dev site. This is because each environment is a stand-alone copy of your site, with its own codebase, database, and files.

4. Consider creating a backup before proceeding. Open the task below to learn how.

5. Click **Database / Files** on the Dev tab of your Site Dashboard.

6. We’re going to clone the database and files from our Live site, so select Live from the dropdown menu.

<div class="alert alert-danger" role="alert">
  <h4 class="info">Warning</h4>
  <p>As intended, this action will overwrite your Dev database and files. If you skipped the backup task you will be unable to recover this data hereafter.</p>
</div>

7. Click **Clone the Database & files from Live into the Development Environment**.

8. When this is complete, click **Visit Development Site** to confirm that the content you created on your Live site now appears on your Dev site.
