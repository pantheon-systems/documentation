---
title: Troubleshooting Custom Upstreams
subtitle: Troubleshoot Your Custom Upstream
description: Learn more about troubleshooting your Custom Upstream.
categories: [develop]
tags: [git, upstreams, workflow]
layout: guide
showtoc: true
permalink: docs/guides/custom-upstream/troubleshooting
anchorid: troubleshooting
---

This section provides solutions for troubleshooting conflicts.

## Resolve Conflicts

### Automatically Resolve from the Command Line

If you receive the error that you have conflicts while updating core, the fastest resolution is often the `-Xtheirs` flag. This will attempt to automatically resolve the conflicts with a preference for upstream changes and is safe to run if you don't have your own changes in any of the conflicting files (e.g. problems with `.gitignore`).

1. Navigate to the Custom Upstream's root directory using the command line and add Pantheon's Upstream as a [remote](https://git-scm.com/docs/git-remote), if you haven't done so already:


  <TabList>

  <Tab title="WordPress" id="wp2" active={true}>

  ```bash
  git remote add pantheon-wordpress https://github.com/pantheon-systems/WordPress.git
  ```

  </Tab>

  <Tab title=" Drupal 7" id="d72">

  ```bash
  git remote add pantheon-drops-7 https://github.com/pantheon-systems/drops-7.git
  ```

  </Tab>

  </TabList>

2. Pull down changes from the appropriate upstream and attempt to resolve automatically:

  <TabList>

  <Tab title="WordPress" id="wp-xtheirs" active={true}>

  ```git
  git fetch pantheon-wordpress
  git merge pantheon-wordpress/master -Xtheirs
  ```

  </Tab>

  <Tab title="Drupal 7" id="d7-xtheirs">

  ```git
  git fetch pantheon-drops-7
  git merge pantheon-drops-7/master -Xtheirs
  ```

  </Tab>

  </TabList>

1. Double-check the conflicted files before going forward to make sure no bugs were introduced.


### Manually Resolve from the Command Line
If attempts to automatically resolve conflicts fail or if you want your changes to persist instead of the upstreams, you'll need to manually resolve the conflict using the command line and a text editor.


1. Navigate to the Custom Upstream's root directory using the command line and add Pantheon's Upstream as a [remote](https://git-scm.com/docs/git-remote), if you haven't done so already:

  <TabList>

  <Tab title="WordPress" id="wp2" active={true}>

  ```bash
  git remote add pantheon-wordpress https://github.com/pantheon-systems/WordPress.git
  ```

  </Tab>

  <Tab title=" Drupal 7" id="d72">

  ```bash
  git remote add pantheon-drops-7 https://github.com/pantheon-systems/drops-7.git
  ```

  </Tab>

  </TabList>

2. Pull down changes from the appropriate upstream:

  <TabList>

  <Tab title="WordPress" id="wp-2conflict" active={true}>

  ```git
  git fetch pantheon-wordpress
  git merge pantheon-wordpress/master
  ```

  </Tab>

   <Tab title="Drupal 7" id="d7-2conflict">

   ```git
   git fetch pantheon-drops-7
   git merge pantheon-drops-7/master
   ```

  </Tab>

  </TabList>


3. Resolve any conflicts introduced using the output details. For example:

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

  Then look for the conflict markers starting with `< HEAD` and manually edit the file to merge changes between Pantheon's upstream (shown first between `< HEAD` and `=======`) and changes made downstream in the Custom Upstream repository (shown second between `=======` and `> Adjust rendering of version release notes`).

  Finally, delete the conflict markers and double-check the changes.

4. Run `git status` to see conflicting files in the current index again. Once all conflicts have been addressed, you can add them to your index and continue pulling in updates:

  ```git
  git add .
  git merge --continue
  ```
