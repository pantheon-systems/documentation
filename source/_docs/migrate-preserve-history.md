---
title: Migrating Sites to Pantheon: Preserve Existing Git History
description: Learn how to preserve your Drupal or WordPress site's existing Git history when migrating to Pantheon.
tags: [migratemanual]
categories: []
---
Preserving your site's Git history requires migrating manually and importing the codebase via Git.

## Migrate Your Existing Site

From your Pantheon Dashboard:

1. Choose **Migrate Existing Site**.
2. Enter your existing website URL.
3. Choose your site type: Drupal 7, Drupal 8, WordPress, or a [Custom Upstream](/docs/custom-upstream/).
4. Click **Continue**.
3. Name your new Pantheon site and optionally select an organization.
5. Click **Create Site**.
6. Click **Migrate Manually** and select **Yes** in the confirmation box.

## Import Code using Git
As long as you've chosen the same codebase (Drupal 7, Commerce Kickstart, etc.) as the starting point of your Pantheon site, you can use Git to import your existing code and commit history. If you don’t have a Git version controlled codebase, the following will still work.

1. Navigate to your existing site's code directory in a local terminal. If your existing code is not version controlled with Git, create a repository and add an initial commit:

 ```bash
 git init
 git add .
 git commit -m "initial commit"
 ```
2. From the Dev environment of the Site Dashboard, set the site's connection mode to [git](/docs/git).
3. Copy the SSH URL for the site repository, found in the <a href="/docs/git/#step-2-copy-the-git-clone-command" data-proofer-ignore>clone command</a>. **Do not copy `git clone` or the site name.** The URL should look similar to the following:

 ```bash
 ssh://codeserver.dev.{site-id}@codeserver.dev.{site-id}.drush.in:2222/~/repository.git
 ```

4. Add Pantheon as a remote destination, replacing `<ssh_url>` with the SSH URL copied in step 3:

 ```bash
 git remote add pantheon <ssh_url>
 ```

5. **Drupal only**: To preserve the database connection credentials for a site built on a local development environment, and to exclude them from version control, move your `settings.php` file to `settings.local.php` and add it to `.gitignore` so that it will be ignored by Git and included from Pantheon's `settings.php` when working on your site locally. Make sure that you can modify it, and restore the protections after the move:

 ```bash
 chmod u+w sites/default/{.,settings.php}
 mv sites/default/{settings.php,settings.local.php}
 chmod u-w sites/default/{settings.local.php,.}
 ```
 Drupal 8 sites running on Pantheon come with a bundled `settings.php` that includes the `settings.local.php` file, so no additional steps are required. However, sites running Drupal 6 or 7 must add a `settings.php` file that includes `settings.local.php`, as this file is not bundled on Pantheon.

<ol start="6"><li> Select the appropriate version of Git running on your local machine, then pull in the upstream's code (which may have Pantheon-specific optimizations) to your existing site's codebase:
 <!-- Nav tabs -->
 <ul class="nav nav-tabs" role="tablist">
  <li role="presentation" class="active"><a href="#28-step6" aria-controls="28-step6" role="tab" data-toggle="tab">Git 2.8 and Below</a></li>
  <li role="presentation"><a href="#29-step6" aria-controls="29-step6" role="tab" data-toggle="tab">Git 2.9 and Above</a></li>
 </ul>
 <!-- Tab panes -->
 <div class="tab-content">
  <div role="tabpanel" class="tab-pane active" id="28-step6">
  <pre><code class="bash hljs">git pull --no-rebase --squash -Xtheirs pantheon master</code></pre>
 </div>
  <div role="tabpanel" class="tab-pane" id="29-step6">
   <pre><code class="bash hljs">git pull --no-rebase --squash -Xtheirs pantheon master --allow-unrelated-histories</code></pre>
  </div>
 </div>

 <p>Will yield:</p>
 <pre><code class="bash hljs">Squash commit -- not updating HEAD
Automatic merge went well; stopped before committing as requested</code></pre>
 <p>Authenticate using your Pantheon Dashboard credentials when prompted for a password. We recommend enabling passwordless access to the site's codebase for Git by <a href="/docs/ssh-keys/">loading an SSH key</a> into the User Dashboard.</p>
 </li></ol>

7. Run git commit to prepare the Pantheon core merge for pushing to the repository:

 ```bash
 git commit -m "Adding Pantheon core files"
 ```
<ol start="8"><li> Align your local branch with its remote counterpart on Pantheon:
  <!-- Nav tabs -->
  <ul class="nav nav-tabs" role="tablist">
   <li role="presentation" class="active"><a href="#28-step8" aria-controls="28-step8" role="tab" data-toggle="tab">Git 2.8 and Below</a></li>
   <li role="presentation"><a href="#29-step8" aria-controls="29-step8" role="tab" data-toggle="tab">Git 2.9 and Above</a></li>
  </ul>
  <!-- Tab panes -->
  <div class="tab-content">
   <div role="tabpanel" class="tab-pane active" id="28-step8">
   <pre><code class="bash hljs">git pull pantheon master --no-rebase</code></pre>
  </div>
   <div role="tabpanel" class="tab-pane" id="29-step8">
    <pre><code class="bash hljs">git pull pantheon master --no-rebase --allow-unrelated-histories</code></pre>
   </div>
  </div>
  </li></ol>

9. Push your newly merged codebase up to your Pantheon site repository:

 ```bash
 git push pantheon master
 ```

10. Go to the Code tab of your Dev environment on the Site Dashboard. You will see your site's pre-existing code commit history and the most recent commit adding Pantheon's core files.

## Complete Migration
Follow any remaining steps within [Migrate Sites to Pantheon: Manual Method](/docs/migrate-manual) such as adding your MySQL database or uploading files.

## See Also
* [Starting with Git](/docs/git/)
* [Accessing MySQL Databases](/docs/mysql-access/)
* [rsync and SFTP](/docs/rsync-and-sftp/)
* [Using the Pantheon Workflow](/docs/pantheon-workflow)
* [Migrate Sites to Pantheon: Manual Method](/docs/migrate-manual)
