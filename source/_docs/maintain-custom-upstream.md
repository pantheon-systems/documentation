---
title: Best Practices for Maintaining Custom Upstreams
description: Detailed information on how to maintain Custom Upstreams and distribute updates downstream.
tags: [tools, workflow]
categories: []
---
Maintainer(s) of [Custom Upstreams](/docs/custom-upstream) bear the responsibility of pulling in core updates from Pantheon. We recommend the following workflow to maintain Custom Upstreams on Pantheon.

<div class="alert alert-info">
<h4 class="info">Note</h4>
<p markdown="1">Failure to run the most up-to-date version of core based on upstreams maintained by Pantheon ([WordPress](https://github.com/pantheon-systems/wordpress), [Drupal 7](https://github.com/pantheon-systems/drops-7), and [Drupal 8](https://github.com/pantheon-systems/drops-8)) may cause incompatibilities with the platform (e.g. clear cache button, launch checks, cron, etc.).</p>
</div>

Regardless of what type of update you're preparing for release, you'll want to test things out before you distribute them out to other sites. You should have a remote repository for your Custom Upstream already in place and connected to Pantheon. If you do not, please [do so now](/docs/create-custom-upstream).

## Create a Test Site on Pantheon

1. From your User Dashboard, click **Create New Site**.
2. Name your site.
3. Select your organization from the dropdown menu.
4. Click **Create Site**.
5. Select your Custom Upstream from the Organization Distribution framework options.
6. Click **Visit your Pantheon Dashboard**.
7. Click **Visit Development Site** and complete the installation process for the selected framework.

## Test and Release Pantheon Core Updates

1. Add Pantheon's Upstream as a [remote](https://git-scm.com/docs/git-remote) within a local clone of your Custom Upstream repository if you haven't done so already:

    <!-- Nav tabs -->
    <ul class="nav nav-tabs" role="tablist">
      <li id="wptab1" role="presentation" class="active"><a href="#wp1" aria-controls="wp1" role="tab" data-toggle="tab">WordPress</a></li>
      <li id="d8tab1" role="presentation"><a href="#d81" aria-controls="d81" role="tab" data-toggle="tab">Drupal 8</a></li>
      <li id="d7tab1" role="presentation"><a href="#d71" aria-controls="d71" role="tab" data-toggle="tab">Drupal 7</a></li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content">
    <div role="tabpanel" class="tab-pane active" id="wp1">
    <pre id="git-pull-wp"><code class="command hljs" data-lang="">git remote add pantheon-wordpress git://github.com/pantheon-systems/WordPress.git</code></pre>
    </div>
    <div role="tabpanel" class="tab-pane" id="d81">
    <pre id="git-pull-drops-8"><code class="command hljs" data-lang="">git remote add pantheon-drops-8 git://github.com/pantheon-systems/drops-8.git</code></pre>
    </div>
    <div role="tabpanel" class="tab-pane" id="d71">
    <pre id="git-pull-drops-7"><code class="command hljs" data-lang="">git remote add pantheon-drops-7 git://github.com/pantheon-systems/drops-7.git</code></pre>
    </div>
    </div><br>

2. We'll need to do the same for your new test site on Pantheon. Let's grab the site's repository URL on Pantheon using [Terminus](/docs/terminus):

    ```command
    terminus connection:info <site>.<dev> --field=git_url
    ```


  Replace `<git_url>` in the following command to add your new test site as a [remote](https://git-scm.com/docs/git-remote):

    ```command
    git remote add pantheon-test <git_url>
    ```


3. Checkout a new branch:

    ```command
    git checkout -b core-update
    ```

    It's important to use feature branches when applying and testing updates. Updates applied on the master branch and pushed to the remote repository on GitHub or Bitbucket become available to individual sites downstream. Using a feature branch gives us a chance to reveal issues before distributing updates.

4. Pull down Pantheon's core updates from the appropriate upstream:

     <!-- Nav tabs -->
     <ul class="nav nav-tabs" role="tablist">
     <li role="presentation" class="active"><a href="#wp" aria-controls="wp" role="tab" data-toggle="tab">WordPress</a></li>
     <li role="presentation"><a href="#d8" aria-controls="d8" role="tab" data-toggle="tab">Drupal 8</a></li>
     <li role="presentation"><a href="#d7" aria-controls="d7" role="tab" data-toggle="tab">Drupal 7</a></li>
     </ul>

     <!-- Tab panes -->
     <div class="tab-content">
     <div role="tabpanel" class="tab-pane active" id="wp">
     <pre><code class="command hljs">git fetch pantheon-wordpress
    git rebase pantheon-wordpress/master</code></pre>
     </div>
     <div role="tabpanel" class="tab-pane" id="d8">
     <pre><code class="command hljs">git fetch pantheon-drops-8
    git rebase pantheon-drops-8/master</code></pre>
     </div>
     <div role="tabpanel" class="tab-pane" id="d7">
     <pre><code class="command hljs">git fetch pantheon-drops-7
    git rebase pantheon-drops-7/master</code></pre>
     </div>
     </div><br>

5. Push to your new test site on Pantheon:

  ```command
  git push pantheon-test core-update
  ```

6. Back on the Site Dashboard for your test site, navigate to the Multidev overview tab and click **Git Branches**.

7. Click the **Create Environment** button next to the `core-update` branch.

8. Use this new Multidev environment to evaluate your `core-update` branch. When you're ready to release, merge the branch into master and push to your remote repository on GitHub or Gitbucket.  

Updates will become available to sites downstream as one-click updates within an hour of being pushed to the remote repository on sites running the Custom Upstream within your Organization. You can apply the updates on each site individually within the Site Dashboard or you can apply updates in bulk using [Terminus](/docs/terminus) and the [Mass Update](/docs/terminus/examples/#mass-update) plugin. For more details, see [Apply Upstream Updates](/docs/upstream-updates).

<div class="alert alert-danger">
<h4 class="info">Warning</h4>
<p markdown="1">Custom Upstreams must not contain the tags `pantheon_test_n` or `pantheon_live_n`. Pantheon site level repositories use these tags to deploy code to Test and Live environments.</p>
</div>


### Tips and Tricks
#### Use the Pantheon Workflow
To fully test core updates, create content on your test site and use the standard [Pantheon workflow](/docs/pantheon-workflow) to push up to Test and Live environments. Checkout <a href="/docs/guides/drupal8-commandline#managing-content-configuration-and-code-across-environments" data-proofer-ignore>our guide</a> for an example of generating content from the command line.

#### Sample a Few Sites
For agencies that manage large portfolios, we suggest picking a few sample sites with varying functionality and design to test updates on a [Multidev](/docs/multidev) environment. Once things look good, release the update to all.

## Troubleshoot
### Resolve Conflicts
#### Automatically Resolve from the Command Line
If you receive the error that you have conflicts while updating core, the fastest resolution is often the `-Xtheirs` flag. This will attempt to automatically resolve the conflicts with a preference for upstream changes and is safe to run if you don't have your own changes in any of the conflicting files (e.g. problems with `.gitignore`).

1. Navigate to the Custom Upstream's root directory using the command line and add Pantheon's Upstream as a [remote](https://git-scm.com/docs/git-remote), if you haven't done so already:

    <!-- Nav tabs -->
    <ul class="nav nav-tabs" role="tablist">
      <li id="wptab-1xtheirs" role="presentation" class="active"><a href="#wp-1xtheirs" aria-controls="wp-1xtheirs" role="tab" data-toggle="tab">WordPress</a></li>
      <li id="d8tab-1xtheirs" role="presentation"><a href="#d8-1xtheirs" aria-controls="d8-1xtheirs" role="tab" data-toggle="tab">Drupal 8</a></li>
      <li id="d7tab-1xtheirs" role="presentation"><a href="#d7-1xtheirs" aria-controls="d7-1xtheirs" role="tab" data-toggle="tab">Drupal 7</a></li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content">
    <div role="tabpanel" class="tab-pane active" id="wp-1xtheirs">
    <pre id="git-pull-wp"><code class="command hljs" data-lang="">git remote add pantheon-wordpress git://github.com/pantheon-systems/WordPress.git</code></pre>
    </div>
    <div role="tabpanel" class="tab-pane" id="d8-1xtheirs">
    <pre id="git-pull-drops-8"><code class="command hljs" data-lang="">git remote add pantheon-drops-8 git://github.com/pantheon-systems/drops-8.git</code></pre>
    </div>
    <div role="tabpanel" class="tab-pane" id="d7-1xtheirs">
    <pre id="git-pull-drops-7"><code class="command hljs" data-lang="">git remote add pantheon-drops-7 git://github.com/pantheon-systems/drops-7.git</code></pre>
    </div>
    </div><br>

2. Pull down changes from the appropriate upstream and attempt to resolve automatically:

    <!-- Nav tabs -->
    <ul class="nav nav-tabs" role="tablist">
      <li role="presentation" class="active"><a href="#wp-xtheirs" aria-controls="wp-xtheirs" role="tab" data-toggle="tab">WordPress</a></li>
      <li role="presentation"><a href="#d8-xtheirs" aria-controls="d8-xtheirs" role="tab" data-toggle="tab">Drupal 8</a></li>
      <li role="presentation"><a href="#d7-xtheirs" aria-controls="d7-xtheirs" role="tab" data-toggle="tab">Drupal 7</a></li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content">
      <div role="tabpanel" class="tab-pane active" id="wp-xtheirs">
      <pre><code class="command hljs" data-lang="">git fetch pantheon-wordpress
    git rebase pantheon-wordpress/master -Xtheirs</code></pre>
      </div>
      <div role="tabpanel" class="tab-pane" id="d8-xtheirs">
      <pre><code class="command hljs" data-lang="">git fetch pantheon-drops-8
    git rebase pantheon-drops-8/master -Xtheirs</code></pre>
      </div>
      <div role="tabpanel" class="tab-pane" id="d7-xtheirs">
      <pre><code class="command hljs" data-lang="">git fetch pantheon-drops-7
    git rebase pantheon-drops-7/master -Xtheirs</code></pre>
      </div>
    </div><br>

Double-check the conflicted files before going forward to make sure no bugs were introduced.


#### Manually Resolve from the Command Line
If attempts to automatically resolve conflicts fail or if you want your changes to persist instead of the upstreams, you'll need to manually resolve the conflict using the command line and a text editor.


1. Navigate to the Custom Upstream's root directory using the command line and add Pantheon's Upstream as a [remote](https://git-scm.com/docs/git-remote), if you haven't done so already:

    <!-- Nav tabs -->
    <ul class="nav nav-tabs" role="tablist">
      <li id="wptab-1conflict" role="presentation" class="active"><a href="#wp-1conflict" aria-controls="wp-1conflict" role="tab" data-toggle="tab">WordPress</a></li>
      <li id="d8tab-1conflict" role="presentation"><a href="#d8-1conflict" aria-controls="d81" role="tab" data-toggle="tab">Drupal 8</a></li>
      <li id="d7tab-1conflict" role="presentation"><a href="#d7-1conflict" aria-controls="d7-1conflict" role="tab" data-toggle="tab">Drupal 7</a></li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content">
    <div role="tabpanel" class="tab-pane active" id="wp-1conflict">
    <pre id="git-pull-wp"><code class="command hljs" data-lang="">git remote add pantheon-wordpress git://github.com/pantheon-systems/WordPress.git</code></pre>
    </div>
    <div role="tabpanel" class="tab-pane" id="d8-1conflict">
    <pre id="git-pull-drops-8"><code class="command hljs" data-lang="">git remote add pantheon-drops-8 git://github.com/pantheon-systems/drops-8.git</code></pre>
    </div>
    <div role="tabpanel" class="tab-pane" id="d7-1conflict">
    <pre id="git-pull-drops-7"><code class="command hljs" data-lang="">git remote add pantheon-drops-7 git://github.com/pantheon-systems/drops-7.git</code></pre>
    </div>
    </div><br>

2. Pull down changes from the appropriate upstream:

     <!-- Nav tabs -->
     <ul class="nav nav-tabs" role="tablist">
     <li role="presentation" class="active"><a href="#wp-2conflict" aria-controls="wp-2conflict" role="tab" data-toggle="tab">WordPress</a></li>
     <li role="presentation"><a href="#d8-2conflict" aria-controls="d8-2conflict" role="tab" data-toggle="tab">Drupal 8</a></li>
     <li role="presentation"><a href="#d7-2conflict" aria-controls="d7-2conflict" role="tab" data-toggle="tab">Drupal 7</a></li>
     </ul>

     <!-- Tab panes -->
     <div class="tab-content">
     <div role="tabpanel" class="tab-pane active" id="wp-2conflict">
     <pre><code class="command hljs">git fetch pantheon-wordpress
    git rebase pantheon-wordpress/master</code></pre>
     </div>
     <div role="tabpanel" class="tab-pane" id="d8-2conflict">
     <pre><code class="command hljs">git fetch pantheon-drops-8
    git rebase pantheon-drops-8/master</code></pre>
     </div>
     <div role="tabpanel" class="tab-pane" id="d7-2conflict">
     <pre><code class="command hljs">git fetch pantheon-drops-7
    git rebase pantheon-drops-7/master</code></pre>
     </div>
     </div><br>

3. If a conflict is introduced, the output provides all the details we need in order to resolve. For example:

  ```bash
  $ git rebase pantheon-wordpress/master
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

  Finally, delete the conflict markers and double-check the changes.

4. Run `git status` to see conflicting files in the current index again. Once all conflicts have been addressed, you can add them to your index and continue pulling in updates:

  ```command
  git add .
  git rebase --continue
  ```
