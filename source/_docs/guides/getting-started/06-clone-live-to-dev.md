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

In this lesson, we’ll explore your <span class="glyphicons glyphicons-cardio" aria-hidden="true"></span> Live site and add a page to simulate work on a real production site. Then we’ll clone your <span class="glyphicons glyphicons-cardio" aria-hidden="true"></span> Live site “down” to your <span class="glyphicons glyphicons-wrench" aria-hidden="true"></span> Dev site.

1. Click the **Site Admin** button to open your <span class="glyphicons glyphicons-cardio" aria-hidden="true"></span> Live site in a new tab. You’ll need to log in before being directed to the site administration dashboard.

    <div class="alert alert-info">
    <h4 class="info">Note</h4>
    <p>Your WordPress or Drupal username and password are the same set you created when you configured your Dev site for the first time.
    </p></div>

2. Now let’s create a new page! If you need help with this step, please reference the [WordPress Codex](https://codex.wordpress.org/Posts/) or [Drupal Documentation](https://www.drupal.org/docs/8/administering-drupal-8-site/managing-content/) on how to add a page to your site.

3. When you’re done, navigate back to your Site Dashboard. Click the <span class="glyphicons glyphicons-wrench" aria-hidden="true"></span> Dev tab, and open your **<span class="glyphicons glyphicons-wrench" aria-hidden="true"></span> Dev** site by clicking **Visit Development Site**.

  Notice that the page you just created on your <span class="glyphicons glyphicons-cardio" aria-hidden="true"></span> Live site doesn’t appear here on your <span class="glyphicons glyphicons-wrench" aria-hidden="true"></span> Dev site. This is because each environment is a stand-alone copy of your site, with its own codebase, database, and files.

  It’s important to develop on a recent copy of your site, so let’s clone your <span class="glyphicons glyphicons-cardio" aria-hidden="true"></span> Live site—with your new page—to your <span class="glyphicons glyphicons-wrench" aria-hidden="true"></span> Dev environment.

4. Consider creating a backup before proceeding. Open the task below to learn how.

    <div class="panel panel-video" id="accordion">
      <div class="panel-heading panel-video-heading">
        <a class="accordion-toggle panel-video-title collapsed" data-toggle="collapse" data-parent="#accordion" data-proofer-ignore data-target="#ssh-task"><h3 class="panel-title panel-video-title" style="cursor:pointer;">Task: Create a backup</h3></a>
      </div>
      <div id="ssh-task" class="collapse" style="padding:10px;">
        <hr>
        <div markdown="1">
     <p>  
        The Backups tab is where you manage all the details for your site's backup. A backup is made up of three separate archives: a database backup, a files backup, and a code backup.  Let’s create a backup now: </p>

<p>       1. Click **<span class="glyphicons glyphicons-cloud-upload" aria-hidden="true"></span> Backups** on the <span class="glyphicons glyphicons-wrench" aria-hidden="true"></span> Dev tab of your Site Dashboard.</p>
<p>       2. Click **Create New Backup**. </p>
<p>
Paid plans can enable automatic backups. If enabled, your nightly backup is stored for a week and your weekly backup is stored for a month. You can select the day for your weekly backup.</p>
        </div>
      </div>
    </div>

5. Click **<span class="glyphicons glyphicons-server" aria-hidden="true"></span> Database / Files** on the <span class="glyphicons glyphicons-wrench" aria-hidden="true"></span> Dev tab of your Site Dashboard.

6. We’re going to clone the database and files from our <span class="glyphicons glyphicons-cardio" aria-hidden="true"></span> Live site, so select Live from the dropdown menu.

    <div class="alert alert-danger" role="alert">
      <h4 class="info">Warning</h4>
      <p>As intended, this action will overwrite your <span class="glyphicons glyphicons-wrench" aria-hidden="true"></span> Dev database and files. If you skipped the backup task you will be unable to recover this data hereafter.</p>
    </div>

7. Click **Clone the Database & files from Live into the Development Environment**.

8. When this is complete, click **Visit Development Site** to confirm that the content you created on your Live site now appears on your Dev site.
