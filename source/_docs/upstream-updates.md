---
title: Apply Upstream Updates
description: Detailed information on applying and debugging upstream updates from Pantheon or a Custom Upstream.
tags: [dashboard, devterminus, git]
categories: []
---
Pantheon maintains core upstream repositories for [WordPress](https://github.com/pantheon-systems/wordpress), [Drupal 8](https://github.com/pantheon-systems/drops-8), and [Drupal 7](https://github.com/pantheon-systems/drops-7) which act as a parent repository to site repositories. Updates made by Pantheon in the core upstream repository, in addition to [updates made by maintainers of Custom Upstreams](/docs/maintain-custom-upstream/), become available downstream as a one-click update.

Apply one-click updates to individual sites repositories using the Site Dashboard on Pantheon, via [Terminus](/docs/terminus), or manually from the command line. Do not update core using the WordPress Dashboard, Drush, or WP-CLI; you will overwrite your core. For additional details, see [Scope of Support](/docs/getting-support/#scope-of-support).

## Apply Upstream Updates via the Site Dashboard
1. Navigate to the Code tab in the Site Dashboard on the Dev environment to check available updates:

  ![upstream updates](/source/docs/assets/images/dashboard/updates-available-2.png)

2. If you have SFTP changes you want to commit and deploy, do so now. Then set the site's connection mode to **Git**.
3. Select whether you want to automatically resolve conflicts. Drupal users can opt to run `update.php` after updates are applied.
4. Click **Apply Updates**.
5. Click **Visit Development Site** in the Development Environment to test and QA the site.
5. Follow the standard [Pantheon Workflow](/docs/pantheon-workflow/#combine-code-from-dev-and-content-from-live-in-test) to deploy changes up to Test and on to Live.

### Auto-Resolve Conflicts

In the event that the update fails, you may see an error indicating a conflict with some files in core. Try the "Auto-Resolve" option when applying updates. Pantheon will try to automatically resolve conflicts in favor of the upstream Git repository. This does not solve all problems that may arise, but it should take care of most situations.

If the "Auto-Resolve Conflicts" option fails, the next step is to manually pull your changes in using Git, resolve the conflicts, and then push the update up to your Pantheon site. This does not solve all problems that may arise, but it should take care of most situations.


## Apply Upstream Updates via Terminus

If you prefer using the command line, you can apply updates with [Terminus](/docs/terminus/).

### Update a Specific Site

```
terminus upstream:updates:apply <site>.<env> --updatedb
```

Learn more about this command by running `terminus help upstream:updates:apply`.

### Update Multiple Sites

```
terminus sites:mass-update:apply
```

For details, see [Terminus Mass Update Plugin](https://github.com/pantheon-systems/terminus-mass-update).

## Apply Upstream Updates Manually from the Command Line and Resolve Merge Conflicts
If the automated core update doesn't appear to be working, it's possible there are conflicts with your codebase in the update. You'll need to manually resolve the conflict using the command line and a text editor.

1. Navigate to a [local clone of your site repository](/docs/git/#clone-your-site-codebase) using the command line, then add the applicable upstream as a [remote](https://git-scm.com/docs/git-remote) if you haven't done so already:

    <!-- Nav tabs -->
    <ul class="nav nav-tabs" role="tablist">
      <li id="wptab-1conflict" role="presentation" class="active"><a href="#wp-1conflict" aria-controls="wp-1conflict" role="tab" data-toggle="tab">WordPress</a></li>
      <li id="d8tab-1conflict" role="presentation"><a href="#d8-1conflict" aria-controls="d81" role="tab" data-toggle="tab">Drupal 8</a></li>
      <li id="d7tab-1conflict" role="presentation"><a href="#d7-1conflict" aria-controls="d7-1conflict" role="tab" data-toggle="tab">Drupal 7</a></li>
      <li id="d7tab-1conflict" role="presentation"><a href="#custom1-conflict" aria-controls="custom1-conflict" role="tab" data-toggle="tab">Custom Upstream</a></li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content no-border">
    <div role="tabpanel" class="tab-pane active" id="wp-1conflict">
    <pre id="git-pull-wp"><code>git remote add pantheon-wordpress git://github.com/pantheon-systems/WordPress.git</code></pre>
    </div>
    <div role="tabpanel" class="tab-pane" id="d8-1conflict">
    <pre id="git-pull-drops-8"><code data-lang="">git remote add pantheon-drops-8 git://github.com/pantheon-systems/drops-8.git</code></pre>
    </div>
    <div role="tabpanel" class="tab-pane" id="d7-1conflict">
    <pre id="git-pull-drops-7"><code data-lang="">git remote add pantheon-drops-7 git://github.com/pantheon-systems/drops-7.git</code></pre>
    </div>
    <div role="tabpanel" class="tab-pane" id="custom1-conflict">
    <p markdown="1" class="instruction">Replace the remote name (`custom-upstream-example`) and repository URL (`git://github.com/example-org/custom-upsream-example.git`) with values specific to your existing Custom Upstream:</p>
    <pre id="git-pull-custom"><code data-lang="">git remote add  custom-upstream-example git://github.com/example-org/custom-upsream-example.git</code></pre>
    </div>
    </div>

2. Pull down changes from the appropriate upstream:

     <!-- Nav tabs -->
     <ul class="nav nav-tabs" role="tablist">
     <li role="presentation" class="active"><a href="#wp-2conflict" aria-controls="wp-2conflict" role="tab" data-toggle="tab">WordPress</a></li>
     <li role="presentation"><a href="#d8-2conflict" aria-controls="d8-2conflict" role="tab" data-toggle="tab">Drupal 8</a></li>
     <li role="presentation"><a href="#d7-2conflict" aria-controls="d7-2conflict" role="tab" data-toggle="tab">Drupal 7</a></li>
     <li role="presentation"><a href="#custom-2conflict" aria-controls="custom-2conflict" role="tab" data-toggle="tab">Custom Upstream</a></li>
     </ul>

     <!-- Tab panes -->
     <div class="tab-content no-border">
     <div role="tabpanel" class="tab-pane active" id="wp-2conflict">
     <pre><code>git fetch pantheon-wordpress
    git rebase pantheon-wordpress/master</code></pre>
     </div>
     <div role="tabpanel" class="tab-pane" id="d8-2conflict">
     <pre><code>git fetch pantheon-drops-8
    git rebase pantheon-drops-8/master</code></pre>
     </div>
     <div role="tabpanel" class="tab-pane" id="d7-2conflict">
     <pre><code>git fetch pantheon-drops-7
    git rebase pantheon-drops-7/master</code></pre>
     </div>
     <div role="tabpanel" class="tab-pane" id="custom-2conflict">
     <p markdown="1" class="instruction">Replace the remote name (`custom-upstream-example`):</p>
     <pre><code>git fetch custom-upstream-example
    git rebase custom-upstream-example/master</code></pre>
     </div>
     </div>

3. If a conflict is introduced, use the output provided to resolve. For example:

  ```
  git rebase pantheon-wordpress/master
  First, rewinding head to replay your work on top of it...
  Applying: Adjust rendering of version release notes
  Using index info to reconstruct a base tree...
  M	wp-admin/about.php
  Falling back to patching base and 3-way merge...
  Auto-merging wp-admin/about.php
  CONFLICT (content): Merge conflict in wp-admin/about.php
  error: Failed to merge in the changes.
  Patch failed at 0001 Adjust rendering of version release notes
  The copy of the patch that failed is found in: .git/rebase-apply/patch

  When you have resolved this problem, run "git rebase --continue".
  If you prefer to skip this patch, run "git rebase --skip" instead.
  To check out the original branch and stop rebasing, run "git rebase --abort".
  ```

  In this example, you would open `wp-admin/about.php` in your preferred text editor.

  Then look for the conflict markers starting with `<<<<<<< HEAD` and manually edit the file to merge changes between Pantheon's upstream (shown first between `<<<<<<< HEAD` and `=======`) and changes made downstream in the Custom Upstream repository (shown second between `=======` and `>>>>>>> Adjust rendering of version release notes`).

  Delete the conflict markers and double-check the changes.

  Run `git status` to see conflicting files in the current index again. Once all conflicts have been addressed, you can add them to your index and continue pulling in updates:

  ```
  git add .
  git rebase --continue
  ```

4. Push updates to the Site Dashboard on Pantheon:

  ```
  git push origin master
  ```

## Troubleshooting

### One-Click Updates Do Not Appear After Rewriting Git History
Squashing and rewriting history may cause one-click updates to break, meaning updates will no longer appear on your Site Dashboard once available. Instead of using squash and rebase to clean up commits from merges occurring upstream, we recommend reviewing history locally with `git log --first-parent`. This provides the same history shown on the Site Dashboard and prevents conflicts with our one-click updates.

### One-Click Update Not Available for Sites Using a Custom Upstream
Core updates for Custom Upstreams are initiated by the repository maintainer, not Pantheon. Please report issues directly to the project maintainer for expected updates.

It's important to relay the need for updating core to maintainers, even if you plan on manually pulling in core version updates. First, file an issue in the queue of your repository and reach out to a maintainer. Even better - submit a pull request for the update.

Once you have communicated the issue, you can [manually apply updates from the command line](#apply-upstream-updates-manually-from-the-command-line-and-resolve-merge-conflicts).

### 503 Errors When Running Update.php and Installing Modules

There are multiple reasons that 503 errors might occur when updating:

- PHP segfault: These are tricky to troubleshoot because very little debugging information is present. A temporary fix is available. Contact Pantheon Customer Support if you think you have been affected.

- Timeouts are another cause of 503 errors, though they are much less likely to occur if you are using the Pantheon domains. If the operation takes more than 60 seconds, you might see a timeout occur.


### Attempts to Resolve Conflicts Respond with 'Already-up-to-date'
If you know your site's core codebase does not match Pantheon's upstream, and attempts to resolve it locally do not work because your site repository is seen as up-to-date, you may need to manually overwrite core files.

We only recommend this method as an *absolute last* resort. A common reason to end up in this state is that core updates have been merged, but a revert commit has been applied on top of the core updates, causing Git to believe all updates have been applied when the code does not actually match. This happens because the Dashboard is only checking for the inclusions of commits in the history that match the upstream.

<div class="alert alert-danger" role="alert">
<h4 class="info">Warning</h4>
<p markdown="1">This process is destructive. Any custom code will be removed when overwriting core with our upstreams. This is normally not an issue, but if the site includes core patches, they will need to be re-applied.</p>
</div>

1. Download an archive of the Pantheon upstream:

    * <a href="https://github.com/pantheon-systems/WordPress/archive/master.zip">WordPress <span class="glyphicons glyphicons-download-alt"></span></a>
    * <a href="https://github.com/pantheon-systems/drops-8/archive/master.zip">Drupal 8 <span class="glyphicons glyphicons-download-alt"></span></a>
    * <a href="https://github.com/pantheon-systems/drops-7/archive/master.zip">Drupal 7 <span class="glyphicons glyphicons-download-alt"></span></a>

2. If you haven't done so already, [clone your Pantheon site repository](/docs/git/#clone-your-site-codebase) using [Terminus](/docs/terminus) (replace `<site>`):

        `terminus connection:info <site>.dev --fields='Git Command' --format=string`

3. Checkout a new branch (optional):

        git checkout -b updates

4. Use a file manager, such as [Finder for MacOS](https://support.apple.com/en-us/HT201732) or [File Explorer for Windows](https://support.microsoft.com/en-us/help/17217/windows-10-whats-changed-in-file-explorer), to copy the contents of the downloaded archive to your site repository excluding paths where custom code is set.

  Exclude at least the following directories when copying, in addition to any other paths your site uses to store custom code:

    * Wordpress: `/wp-content` and `wp-config.php`
    * Drupal 8: `/sites` and `/modules`
    * Drupal 7: `/sites`

5. Review changes using `git diff`. Core patches may need to be re-applied. This will also reveal what changes were previously missing.

6. Stage, commit, and push your changes to Pantheon:

        git commit -am "Replace core files with Pantheon upstream"
        git push origin updates

7. If multidev is available, test changes on a Multidev environment and [merge the update](/docs/multidev/#merge-code) branch into the Dev environment, then deploy up to Test and Live.
