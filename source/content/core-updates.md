---
title: WordPress and Drupal Core Updates
description: Detailed information on applying and debugging upstream updates from Pantheon or a Custom Upstream.
categories: [manage]
tags: [dashboard, git, terminus, updates]
reviewed: "2021-04-15"
---
This doc includes instructions to make core updates to WordPress and Drupal sites hosted on the Pantheon WebOps platform.

## Drupal 9

Drupal 9 sites on Pantheon use Integrated Composer to allow one-click core updates through the Dashboard.

To check for available updates, navigate to **Code** in the Dev tab of the site's Dashboard. Click **Check Now**. If updates are available, click **Apply Updates**.

## Drupal 8 Composer-Managed Sites

Drupal 8 sites managing core with Composer are not compatible with Pantheon's One-click updates and must update core using Composer exclusively. For instructions, see [Build Tools](/guides/build-tools/update) or [Drupal 8 and Composer on Pantheon Without Continuous Integration](/guides/drupal-8-composer-no-ci/#update-only-drupal-core).

## Non-Composer Managed WordPress and Drupal 7 / 8 Sites

Pantheon maintains core upstream repositories for [WordPress](https://github.com/pantheon-systems/wordpress), [Drupal 8](https://github.com/pantheon-systems/drops-8), and [Drupal 7](https://github.com/pantheon-systems/drops-7) which act as a parent repository to site repositories. Updates made by Pantheon in the core upstream repository, in addition to [updates made by maintainers of Custom Upstreams](/maintain-custom-upstream), become available downstream as a one-click update.

Apply one-click updates to individual sites repositories using the Site Dashboard on Pantheon, via [Terminus](/terminus), or manually from the command line. Do not update core using the WordPress Dashboard, Drush, or WP-CLI; you will overwrite your core. For additional details, see [Scope of Support](/support/#scope-of-support).


## Apply Upstream Updates via the Site Dashboard

1. Navigate to the Code tab in the Site Dashboard on the Dev environment to check available updates:

  ![Sreenshot of the Pantheon Site Dashboard, showing the "Apply Updates" button and the "Update Options" dropdown.](../images/dashboard/updates-available.png)

1. If you have SFTP changes you want to commit and deploy, do so now. Then set the site's connection mode to **Git**.

1. From the **Update Options** menu, you can select whether or not you want to automatically resolve conflicts. Drupal users can opt to run `update.php` after updates are applied:

  ![Screenshot of the "Update Options" button selected to show the options "Run update.php after pulling the update", and "Auto-resolve conflicts".](../images/dashboard/update-options.png)

1. Click **Apply Updates**.

1. Click **Visit Development Site** in the Development Environment to test and QA the site.

1. Follow the standard [Pantheon Workflow](/pantheon-workflow/#combine-code-from-dev-and-content-from-live-in-test) to deploy changes up to Test and on to Live.

### Auto-Resolve Conflicts

In the event that the update fails, you may see an error indicating a conflict with some files in core. Try the "Auto-Resolve" option when applying updates. Pantheon will try to automatically resolve conflicts in favor of the upstream Git repository. This does not solve all problems that may arise, but it should take care of most situations.

If the "Auto-Resolve Conflicts" option fails, the next step is to manually pull your changes in using Git, resolve the conflicts, and then push the update up to your Pantheon site. This does not solve all problems that may arise, but it should take care of most situations.

## Apply Upstream Updates via Terminus

If you prefer using the command line, you can apply updates with [Terminus](/terminus).

### Update a Specific Site

```bash{promptUser: user}
terminus upstream:updates:apply site.env --updatedb
```

Replace `site` and `env` with your site name and the correct environment. Learn more about this command by running `terminus help upstream:updates:apply`.

### Update Multiple Sites

The Terminus Mass Update Plugin can apply core updates to multiple sites at once:

```bash{promptUser: user}
terminus sites:mass-update:apply
```

For details, see [Terminus Mass Update Plugin](https://github.com/pantheon-systems/terminus-mass-update).

## Apply Upstream Updates Manually from the Command Line to Resolve Merge Conflicts

If the automated core update doesn't appear to be working, it's possible there are conflicts with your codebase in the update. You can resolve by overwriting your CMS core with the upstream, or attempt a manual merge conflict resolution.

### Overwrite Core

If you receive the error that you have conflicts while updating core, the fastest resolution is often the `-Xtheirs` flag. This will attempt to automatically resolve the conflicts with a preference for upstream changes and is safe to run if you don't have your own changes in any of the conflicting files (e.g. problems with `.gitignore` or `.htaccess`).

<Alert title="Warning" type="danger">

This process can potentially cause loss of data. Be sure you have no custom code in your CMS core before proceeding.

</Alert>

<TabList>

<Tab title="Drupal 8" id="d8" active={true}>

```bash{promptUser: user}
git pull -Xtheirs git://github.com/pantheon-systems/drops-8.git master
# resolve conflicts
git push origin master
```

</Tab>

<Tab title="Drupal 7" id="d7">

```bash{promptUser: user}
git pull -Xtheirs git://github.com/pantheon-systems/drops-7.git master
# resolve conflicts
git push origin master
```

</Tab>

<Tab title="Drupal 6" id="d6">

```bash{promptUser: user}
git pull -Xtheirs git://github.com/pantheon-systems/drops-6.git master
# resolve conflicts
git push origin master
```

</Tab>

<Tab title="WordPress" id="wp">

```bash{promptUser: user}
git pull -Xtheirs git://github.com/pantheon-systems/WordPress.git master
# resolve conflicts
git push origin master
```

</Tab>

</TabList>

Double-check the files before going forward to make sure no bugs were introduced.

If this procedure fails with the message `Already up to date.` refer to [this troubleshooting section](#one-click-updates-do-not-appear-after-rewriting-git-history) to reset your git repository.

#### Overwrite WordPress Core Via SFTP

In the case where you're unable to use Git, you can use [SFTP](/sftp) to overwrite core files.

1. Confirm that the Site Connection Mode is set to SFTP. Then, via SFTP, delete these files and folders:

  ```none
  ├── README.md
  ├── index.php
  ├── license.txt
  ├── readme.html
  ├── wp-activate.php
  ├── wp-blog-header.php
  ├── wp-comments-post.php
  ├── wp-config-sample.php
  ├── wp-cron.php
  ├── wp-links-opml.php
  ├── wp-load.php
  ├── wp-login.php
  ├── wp-mail.php
  ├── wp-settings.php
  ├── wp-signup.php
  ├── wp-trackback.php
  ├── xmlrpc.php
  ├── wp-admin
  ├── wp-includes
  ├── wp-content
      └── index.php
      └── mu-plugins
          └── pantheon.php
  ```

  <Alert title="Warning" type="danger">

  Do not remove `wp-config.php`.

  </Alert>

1. Re-upload the corresponding files from [GitHub](https://github.com/pantheon-systems/WordPress).
1. Commit and switch back to Git mode.
1. Apply 1-click core updates via the dashboard and the auto-resolve should be checked. The update warning should disappear after a successful update.

### Merge Conflict Resolution

This process lets you manually resolve the conflict using the command line and a text editor.

1. Navigate to a [local clone of your site repository](/git/#clone-your-site-codebase) using the command line, then add the applicable upstream as a [remote](https://git-scm.com/docs/git-remote) if you haven't done so already:

  <TabList>

  <Tab title="WordPress" id="wp-1conflict" active={true}>

  ```bash{promptUser: user}
  git remote add pantheon-wordpress git://github.com/pantheon-systems/WordPress.git
  ```

  </Tab>

  <Tab title="Drupal 8" id="d8-1conflict">

  ```bash{promptUser: user}
  git remote add pantheon-drops-8 git://github.com/pantheon-systems/drops-8.git
  ```

  </Tab>

  <Tab title="Drupal 7" id="d7-1conflict">

  ```bash{promptUser: user}
  git remote add pantheon-drops-7 git://github.com/pantheon-systems/drops-7.git
  ```

  </Tab>

  <Tab title="Custom Upstream" id="custom-1conflict">

  Replace the remote name (`custom-upstream-example`) and repository URL (`git://github.com/example-org/custom-upsream-example.git`) with values specific to your existing Custom Upstream:

  ```bash{promptUser: user}
  git remote add  custom-upstream-example git://github.com/example-org/custom-upsream-example.git
  ```

  </Tab>

  </TabList>

1. Pull down changes from the appropriate upstream:

  <TabList>

  <Tab title="WordPress" id="wp-2conflict" active={true}>

  ```bash{promptUser: user}
  git fetch pantheon-wordpress
  git rebase pantheon-wordpress/master
  ```

  </Tab>

  <Tab title="Drupal 8" id="d8-2conflict">

  ```bash{promptUser: user}
  git fetch pantheon-drops-8
  git rebase pantheon-drops-8/master
  ```

  </Tab>

  <Tab title="Drupal 7" id="d7-2conflict">

  ```bash{promptUser: user}
  git fetch pantheon-drops-7
  git rebase pantheon-drops-7/master
  ```

  </Tab>

  <Tab title="Custom Upstream" id="custom-2conflict">

  Replace the remote name (`custom-upstream-example`):

  ```bash{promptUser: user}
  git fetch custom-upstream-example
  git rebase custom-upstream-example/master
  ```

  </Tab>

  </TabList>

1. If a conflict is introduced, use the output provided to resolve. For example:

  ```bash{outputLines: 2-15}
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

  ```bash{promptUser: user}
  git add .
  git rebase --continue
  ```

1. Push updates to the Site Dashboard on Pantheon:

  ```bash{promptUser: user}
  git push origin master
  ```

## Core Release Updates

Whenever there's a new release of WordPress or Drupal core, updates will be available within 72 hours of upstream availability. Security related updates will be made available within 24 hours.

<Alert title="Warning" type="danger">

<Partial file="drupal-8-8-warning.md" />

</Alert>

## Suppress WordPress Admin Notice

By default WordPress admin will check for new upstream updates instead of the default WordPress update nag. You can disable this by setting the `DISABLE_PANTHEON_UPDATE_NOTICES` constant to `true` in your `wp-config.php` file. This only disables the text and notice in the WordPress admin, you will still see upstream updates in the Pantheon dashboard.

```php:title=wp-config.php
define( 'DISABLE_PANTHEON_UPDATE_NOTICES', true );
```

## Troubleshooting

### One-Click Updates Do Not Appear After Rewriting Git History

Squashing and rewriting history may cause one-click updates to break, meaning updates will no longer appear on your Site Dashboard once available. Instead of using squash and rebase to clean up commits from merges occurring upstream, we recommend reviewing history locally with `git log --first-parent`. This provides the same history shown on the Site Dashboard and prevents conflicts with our one-click updates.

If you are in a situation where you've altered the commit history in such a way that the dashboard is no longer able to determine if your site is up to date with the upstream, the simplest course of corrective action is to use `git reset --hard` to reset the site repository to the last known good commit before the squash/rebase/revert was applied. This *will* result in losing *all* changes that have happened since this commit. You will need to re-apply all custom/contributed code updates that occurred in the interim, so make sure to take stock of these changes first and develop a plan to reapply them with the fixed Git history.

### One-Click Update Not Appearing for Sites Using a Custom Upstream

Core updates for Custom Upstreams are initiated by the repository maintainer, not Pantheon. Please report issues directly to the project maintainer for expected updates.

It's important to relay the need for updating core to maintainers, even if you plan on manually pulling in core version updates. First, file an issue in the queue of your repository and reach out to a maintainer. Even better - submit a pull request for the update.

Once you have communicated the issue, you can [manually apply updates from the command line](#apply-upstream-updates-manually-from-the-command-line-to-resolve-merge-conflicts).

### Custom Upstream Updates Not Available

If you know your site's Custom Upstream has updated code, but it's not visible on your Site Dashboard, click on **Check now**:

![Check Now](../images/dashboard/check-for-updates.png)

This will trigger a "Code Cache Clear" to verify that the Site Dashboard has fetched the most recent commit. Please note that even after the workflow completes, it may take up to a minute before updates appear on the dashboard.

If updates are still not showing on the site, it may be necessary to re-set the site's upstream via [Terminus](/terminus/examples/#switch-upstreams). Please note that only the Site Owner or owning Organization Administrators can change a site's upstream.

### 503 Errors When Running Update.php and Installing Modules

There are multiple reasons that 503 errors might occur when updating:

- PHP segfault: These are tricky to troubleshoot because very little debugging information is present. A temporary fix is available. Contact Pantheon Customer Support if you think you have been affected.

- Timeouts are another cause of 503 errors, though they are much less likely to occur if you are using the Pantheon domains. If the operation takes more than 60 seconds, you might see a timeout occur.

### Error updating: CONFLICT (modify/delete): pantheon.upstream.yml deleted in HEAD and modified in upstream/master. Version upstream/master of pantheon.upstream.yml left in tree

This issue happens when you attempt to update very outdated core files from the Dashboard. Perform the following to resolve:

1. Modify `.gitignore` and add a `#` at the beginning of the `pantheon.upstream.yml` line to comment it out

1. Set the Site Connection Mode to SFTP

1. Reupload the `pantheon.upstream.yml` file if missing:

 <TabList>

 <Tab title="WordPress" id="wp-2conflict-merge" active={true}>

 GITHUB-EMBED https://github.com/pantheon-systems/WordPress/blob/default/pantheon.upstream.yml yaml:title=pantheon.upstream.yml GITHUB-EMBED

  [View on GitHub](https://github.com/pantheon-systems/WordPress/blob/default/pantheon.upstream.yml)

 </Tab>

 <Tab title="Drupal 8" id="d8-2conflict-merge">

  GITHUB-EMBED https://github.com/pantheon-systems/drops-8/blob/master/pantheon.upstream.yml yaml:title=pantheon.upstream.yml GITHUB-EMBED

 [View on GitHub](https://github.com/pantheon-systems/drops-8/blob/default/pantheon.upstream.yml)

 </Tab>

 <Tab title="Drupal 7" id="d7-2conflict-merge">

 GITHUB-EMBED https://github.com/pantheon-systems/drops-7/blob/master/pantheon.upstream.yml yaml:title=pantheon.upstream.yml GITHUB-EMBED

  [View on GitHub](https://github.com/pantheon-systems/drops-7/blob/default/pantheon.upstream.yml)

 </Tab>

 </TabList>

1. Return to the Commit in dashboard, and note that `pantheon.upstream.yml` can now be committed

1. Set the Site Connection Mode to Git and reapply updates

1. Modify `.gitignore` and remove the `#` before the `pantheon.upstream.yml` line to instruct Git to ignore the file again
