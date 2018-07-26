---
title: Best Practices for Maintaining Custom Upstreams
description: Detailed information on how to maintain Custom Upstreams and distribute updates downstream.
tags: [tools, workflow]
categories: []
---
Maintainers of [Custom Upstreams](/docs/custom-upstream/) bear the responsibility of pulling in core updates from Pantheon. Regardless of update type, always test changes before you distribute them to your sites. We recommend the following workflow to maintain Custom Upstreams on Pantheon. In this example, we will be updating core.

<div class="alert alert-info">
<h4 class="info">Note</h4>
<p markdown="1">Failure to run the most up-to-date version of core based on upstreams maintained by Pantheon ([WordPress](https://github.com/pantheon-systems/wordpress){.external}, [Drupal 7](https://github.com/pantheon-systems/drops-7){.external}, and [Drupal 8](https://github.com/pantheon-systems/drops-8){.external}) may cause incompatibilities with the platform (e.g. clear cache button, launch checks, cron, etc.).</p>
</div>

## Before You Begin
Follow the procedure to [create a custom upstream](/docs/create-custom-upstream/) so that you have:

- A repository for your Custom Upstream hosted with your preferred provider (GitLab, Bitbucket, etc)
- A local clone of that repository, which tracks Pantheon's upstream as a remote
- Pantheon's core code merged into your Custom Upstream repository
- Your Custom Upstream repository connected to Pantheon
- [Terminus](/docs/terminus/)

## Create a Test Site on Pantheon
This test site will be used later for evaluating the Custom Upstream changes we will make in the next section.

1. From your User Dashboard, click **Create New Site**.
2. Name your site.
3. Select your organization from the dropdown menu.
4. Click **Create Site**.
5. Select the desired repository from the Custom Upstream options.
6. Click **Visit your Pantheon Dashboard**.
7. Click **Visit Development Site** and complete the installation process for the selected framework.

## Test and Release Pantheon Core Updates

1. From your local clone of your Custom Upstream repository, add Pantheon's Upstream as a [remote](https://git-scm.com/docs/git-remote){.external} if you haven't done so already:

    <!-- Nav tabs -->
    <ul class="nav nav-tabs" role="tablist">
      <li id="wptab1" role="presentation" class="active"><a href="#wp1" aria-controls="wp1" role="tab" data-toggle="tab">WordPress</a></li>
      <li id="d8tab1" role="presentation"><a href="#d81" aria-controls="d81" role="tab" data-toggle="tab">Drupal 8</a></li>
      <li id="d7tab1" role="presentation"><a href="#d71" aria-controls="d71" role="tab" data-toggle="tab">Drupal 7</a></li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content">
    <div role="tabpanel" class="tab-pane active" id="wp1" markdown="1">
    ```git
    git remote add pantheon-wordpress git://github.com/pantheon-systems/WordPress.git
    ```
    </div>
    <div role="tabpanel" class="tab-pane" id="d81" markdown="1">
    ```git
    git remote add pantheon-drops-8 git://github.com/pantheon-systems/drops-8.git
    ```
    </div>
    <div role="tabpanel" class="tab-pane" id="d71" markdown="1">
    ```git
    git remote add pantheon-drops-7 git://github.com/pantheon-systems/drops-7.git
    ```
    </div>
    </div><br>

2. We will also add the test site you created above as a remote to your Custom Upstream. To do that, we first need to grab the test site's repository URL on Pantheon using [Terminus](/docs/terminus/). Replace `<site>` with your site name:

    ```bash
    terminus connection:info <site>.dev --field=git_url
    ```

3. Replace `<git_url>` in the following command to add your new test site as a [remote](https://git-scm.com/docs/git-remote){.external}:

    ```git
    git remote add pantheon-test <git_url>
    ```


4. Checkout a new branch:

    ```git
    git checkout -b core-update
    ```

    It's important to use feature branches when applying and testing updates. Updates applied on the master branch and pushed to the remote repository on GitHub or Bitbucket become available to individual sites downstream. Using a feature branch gives us a chance to reveal issues before distributing updates.

5. Pull down Pantheon's core updates from the appropriate upstream:

     <!-- Nav tabs -->
     <ul class="nav nav-tabs" role="tablist">
     <li role="presentation" class="active"><a href="#wp" aria-controls="wp" role="tab" data-toggle="tab">WordPress</a></li>
     <li role="presentation"><a href="#d8" aria-controls="d8" role="tab" data-toggle="tab">Drupal 8</a></li>
     <li role="presentation"><a href="#d7" aria-controls="d7" role="tab" data-toggle="tab">Drupal 7</a></li>
     </ul>

     <!-- Tab panes -->
     <div class="tab-content">
     <div role="tabpanel" class="tab-pane active" id="wp" markdown="1">
     ```git
     git fetch pantheon-wordpress
     git merge pantheon-wordpress/master
     ```
     </div>
     <div role="tabpanel" class="tab-pane" id="d8" markdown="1">
     ```git
     git fetch pantheon-drops-8
     git merge pantheon-drops-8/master
     ```
     </div>
     <div role="tabpanel" class="tab-pane" id="d7" markdown="1">
     ```git
     git fetch pantheon-drops-7
     git merge pantheon-drops-7/master
     ```
     </div>
     </div><br>

6. Push to your new test site on Pantheon:

  ```git
  git push pantheon-test core-update
  ```

7. Back on the Site Dashboard for your test site, navigate to the Multidev overview tab and click **Git Branches**.

8. Click the **Create Environment** button next to the `core-update` branch.

9. Use this new Multidev environment to evaluate your `core-update` branch. When you're ready to release, merge the branch into master and push to your remote repository on GitHub or Bitbucket:

    ```git
    git checkout master
    git merge --no-ff core-update
    git push origin master
    ```

    This assumes you are using the default remote destination (`origin`) for your Custom Upstream repository that's hosted with your preferred provider.

Updates will become available to sites downstream as one-click updates within an hour of being pushed to the remote repository on sites running the Custom Upstream within your Organization. You can apply the updates on each site individually within the Site Dashboard, or you can apply updates in bulk using [Terminus](/docs/terminus/) and the [Mass Update](/docs/terminus/examples/#mass-update) plugin. For more details, see [WordPress and Drupal Core Updates](/docs/core-updates/).

<div class="alert alert-danger">
<h4 class="info">Warning</h4>
<p markdown="1">Custom Upstreams must not contain the tags `pantheon_test_n` or `pantheon_live_n`. Pantheon site level repositories use these tags to deploy code to Test and Live environments.</p>
</div>


## Tips and Tricks
### Use the Pantheon Workflow
To fully test core updates, create content on your test site and use the standard [Pantheon workflow](/docs/pantheon-workflow/) to push up to your Test and Live environments. Checkout <a href="/docs/guides/drupal8-commandline/#managing-content-configuration-and-code-across-environments" data-proofer-ignore>our guide</a> for an example of generating content from the command line.

### Sample a Few Sites
For agencies that manage large portfolios, we suggest picking a few sample sites with varying functionality and design to test updates on a [Multidev](/docs/multidev/) environment. Once things look good, release the update to all.

### Upstream Configuration File
Use the `pantheon.upstream.yml` file when working with Custom Upstreams to set default values for advanced site configurations to be used downstream. For details, see [Pantheon YAML Configuration Files](/docs/pantheon-yml/).


## Troubleshoot
### Resolve Conflicts
#### Automatically Resolve from the Command Line
If you receive the error that you have conflicts while updating core, the fastest resolution is often the `-Xtheirs` flag. This will attempt to automatically resolve the conflicts with a preference for upstream changes and is safe to run if you don't have your own changes in any of the conflicting files (e.g. problems with `.gitignore`).

1. Navigate to the Custom Upstream's root directory using the command line and add Pantheon's Upstream as a [remote](https://git-scm.com/docs/git-remote){.external}, if you haven't done so already:

    <!-- Nav tabs -->
    <ul class="nav nav-tabs" role="tablist">
      <li id="wptab-1xtheirs" role="presentation" class="active"><a href="#wp-1xtheirs" aria-controls="wp-1xtheirs" role="tab" data-toggle="tab">WordPress</a></li>
      <li id="d8tab-1xtheirs" role="presentation"><a href="#d8-1xtheirs" aria-controls="d8-1xtheirs" role="tab" data-toggle="tab">Drupal 8</a></li>
      <li id="d7tab-1xtheirs" role="presentation"><a href="#d7-1xtheirs" aria-controls="d7-1xtheirs" role="tab" data-toggle="tab">Drupal 7</a></li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content">
    <div role="tabpanel" class="tab-pane active" id="wp-1xtheirs" markdown="1">
    ```git
    git remote add pantheon-wordpress git://github.com/pantheon-systems/WordPress.git
    ```
    </div>
    <div role="tabpanel" class="tab-pane" id="d8-1xtheirs" markdown="1">
    ```git
    git remote add pantheon-drops-8 git://github.com/pantheon-systems/drops-8.git
    ```
    </div>
    <div role="tabpanel" class="tab-pane" id="d7-1xtheirs" markdown="1">
    ```git
    git remote add pantheon-drops-7 git://github.com/pantheon-systems/drops-7.git
    ```
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
      <div role="tabpanel" class="tab-pane active" id="wp-xtheirs" markdown="1">
      ```git
      git fetch pantheon-wordpress
      git merge pantheon-wordpress/master -Xtheirs
      ```
      </div>
      <div role="tabpanel" class="tab-pane" id="d8-xtheirs" markdown="1">
      ```git
      git fetch pantheon-drops-8
      git merge pantheon-drops-8/master -Xtheirs
      ```
      </div>
      <div role="tabpanel" class="tab-pane" id="d7-xtheirs" markdown="1">
      ```git
      git fetch pantheon-drops-7
      git merge pantheon-drops-7/master -Xtheirs
      ```
      </div>
    </div><br>

Double-check the conflicted files before going forward to make sure no bugs were introduced.


#### Manually Resolve from the Command Line
If attempts to automatically resolve conflicts fail or if you want your changes to persist instead of the upstreams, you'll need to manually resolve the conflict using the command line and a text editor.


1. Navigate to the Custom Upstream's root directory using the command line and add Pantheon's Upstream as a [remote](https://git-scm.com/docs/git-remote){.external}, if you haven't done so already:

    <!-- Nav tabs -->
    <ul class="nav nav-tabs" role="tablist">
      <li id="wptab-1conflict" role="presentation" class="active"><a href="#wp-1conflict" aria-controls="wp-1conflict" role="tab" data-toggle="tab">WordPress</a></li>
      <li id="d8tab-1conflict" role="presentation"><a href="#d8-1conflict" aria-controls="d81" role="tab" data-toggle="tab">Drupal 8</a></li>
      <li id="d7tab-1conflict" role="presentation"><a href="#d7-1conflict" aria-controls="d7-1conflict" role="tab" data-toggle="tab">Drupal 7</a></li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content">
    <div role="tabpanel" class="tab-pane active" id="wp-1conflict" markdown="1">
    ```git
    git remote add pantheon-wordpress git://github.com/pantheon-systems/WordPress.git
    ```
    </div>
    <div role="tabpanel" class="tab-pane" id="d8-1conflict" markdown="1">
    ```git
    git remote add pantheon-drops-8 git://github.com/pantheon-systems/drops-8.git
    ```
    </div>
    <div role="tabpanel" class="tab-pane" id="d7-1conflict" markdown="1">
    ```git
    git remote add pantheon-drops-7 git://github.com/pantheon-systems/drops-7.git
    ```
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
     <div role="tabpanel" class="tab-pane active" id="wp-2conflict" markdown="1">
     ```git
     git fetch pantheon-wordpress
     git merge pantheon-wordpress/master
     ```
     </div>
     <div role="tabpanel" class="tab-pane" id="d8-2conflict" markdown="1">
     ```git
     git fetch pantheon-drops-8
     git merge pantheon-drops-8/master
     ```
     </div>
     <div role="tabpanel" class="tab-pane" id="d7-2conflict" markdown="1">
     ```git
     git fetch pantheon-drops-7
     git merge pantheon-drops-7/master
     ```
     </div>
     </div><br>

3. If a conflict is introduced, the output provides all the details we need in order to resolve. For example:

  ```bash
  $ git merge pantheon-wordpress/master
  First, rewinding head to replay your work on top of it...
  Applying: Adjust rendering of version release notes
  Using index info to reconstruct a base tree...
  M	wp-admin/about.php
  Falling back to patching base and 3-way merge...
  Auto-merging wp-admin/about.php
  CONFLICT (content): Merge conflict in wp-admin/about.php
  error: Failed to merge in the changes.
  Patch failed at 0001 Adjust rendering of version release notes
  The copy of the patch that failed is found in: .git/merge-apply/patch

  When you have resolved this problem, run "git merge --continue".
  If you prefer to skip this patch, run "git merge --skip" instead.
  To check out the original branch and stop rebasing, run "git merge --abort".
  ```

  In this example, you would open `wp-admin/about.php` in your preferred text editor.

  Then look for the conflict markers starting with `<<<<<<< HEAD` and manually edit the file to merge changes between Pantheon's upstream (shown first between `<<<<<<< HEAD` and `=======`) and changes made downstream in the Custom Upstream repository (shown second between `=======` and `>>>>>>> Adjust rendering of version release notes`).

  Finally, delete the conflict markers and double-check the changes.

4. Run `git status` to see conflicting files in the current index again. Once all conflicts have been addressed, you can add them to your index and continue pulling in updates:

  ```git
  git add .
  git merge --continue
  ```
