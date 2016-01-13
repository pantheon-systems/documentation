---
title: Applying Upstream Updates
description: Detailed information on applying and debugging upstream updates, such as Drupal and WordPress releases.
category:
  - developing
  - drupal
keywords: upstream, update upstream, apply updates, apply update, update core, update plugin, update module, update theme, update distribution, distribution, deploy update, deploy updates, update, updates, security update, apply security update, patch
---

Only use the one-click updates on the Dashboard to update your site's core. Do not update core using Drush or WP-CLI; you will overwrite your core.

## Apply Upstream Updates via the Dashboard

1. Check the options you want to run after pulling the update.
2. Click **Apply Updates**.
![A Pantheon site dashboard with upstream updates available.](/source/docs/assets/images/desk_images/357403.png)
3. Click **Visit Development Site** in the Development Environment to test it, or run your automatic user acceptance tests.
4. If you find errors, you can [<u>revert to the last stable commit</u>](/docs/articles/local/undo-git-commits-like-overwriting-drupal-core) using Git.
5. Deploy the upstream updates to your Test Environment by clicking **Pull (Content from Live and) Code from Development** in the Code workspace in the Test Environment.
6. Click **Visit Testing Environment** to test the update against your Live site’s content base.
7. Deploy the upstream updates to your Live Environment by clicking **Pull Code from Testing** in the Code workspace in the Live environment.
8. Click **Visit Live Environment** to verify the update is live.
![The Code tab in the Pantheon site's dashboard's Live Environment, showing the upstream commits in the log as deployed.](/source/docs/assets/images/desk_images/357435.png)

## Apply Upstream Updates via Terminus

If you prefer using the command line, you can apply updates with [Terminus](/docs/articles/local/cli/).

### Update a Specific Site

```
terminus site upstream-updates apply --site=site --env=env --updatedb
```

Learn more about this command by running `terminus help site upstream-updates`.

### Update Multiple Sites

```
terminus sites mass-update
```
Learn more about this command by running `terminus help site mass-updates`.

### Further Considerations
- ​If you have updates on Dev or Test that are not ready to be deployed to Live with your upstream updates, see [Undo Git Commits](/docs/articles/local/undo-git-commits-like-overwriting-drupal-core).
- If the Development environment is in SFTP mode with pending changes that you are ready to deploy to Live, commit code changes.
- If you are not ready to deploy to Live, use an SFTP connection to copy the files locally.
- Core updates appear in your code workspace beneath the Connection Mode bar when they are available. Due to platform-wide codeserver caching settings, update notifications may appear on different Site Dashboards running the same upstream up to two hours apart.
- Core updates for alternate distributions (Open Atrium, Commerce Kickstart, etc.) are initiated by the maintainer, not Pantheon. Please contact them directly regarding expected updates.
- Sometimes we will add new features to the Pantheon API module and deploy bug fixes ahead of a core release. If you are observing good development practices and not modifying core, merging an available update is your best course of action.

## Debug Failed Merges

If the automated core update doesn't appear to be working, it's possible there are conflicts with your codebase in the update. Usually these are easy to resolve.

### Auto-Resolve Conflicts

In the event that the update fails, you may see an error indicating a conflict with some files in core. Try the "Auto-Resolve" option when applying updates. Pantheon will try to automatically resolve conflicts in favor of the upstream Git repository. This does not solve all problems that may arise, but it should take care of most situations.

If the "Auto-Resolve Conflicts" option fails, the next step is to manually pull your changes in using Git, resolve the conflicts, and then push the update up to your Pantheon site.

<div class="alert alert-warning" role="alert">
<h4>Note</h4>
This does not solve all problems that may arise, but it should take care of most situations.</div>

### Resolve Conflicts Locally
Select the appropriate framework below for your web application, then execute the commands from within an up-to-date Git clone on your local machine. The `Xtheirs` flag will attempt to automatically resolve conflicts with a preference for upstream changes and is safe to run if you don't have your own changes in any of the conflicting files (e.g. problems with .gitignore).
<!-- Nav tabs -->
<ul class="nav nav-tabs" role="tablist">
  <li role="presentation" class="active"><a href="#d8" aria-controls="d8" role="tab" data-toggle="tab">Drupal 8</a></li>
  <li role="presentation"><a href="#d7" aria-controls="d7" role="tab" data-toggle="tab">Drupal 7</a></li>
  <li role="presentation"><a href="#d6" aria-controls="d6" role="tab" data-toggle="tab">Drupal 6</a></li>
  <li role="presentation"><a href="#wp" aria-controls="wp" role="tab" data-toggle="tab">WordPress</a></li>
</ul>

<!-- Tab panes -->
<div class="tab-content">
  <div role="tabpanel" class="tab-pane active" id="d8">
  <pre><code class="bash hljs">
  git pull -Xtheirs git://github.com/pantheon-systems/drops-8.git master
  # resolve conflicts
  git push origin master
  </code></pre>
  </div>
  <div role="tabpanel" class="tab-pane" id="d7">
  <pre><code class="bash hljs">
  git pull -Xtheirs git://github.com/pantheon-systems/drops-7.git master
  # resolve conflicts
  git push origin master
  </code></pre>
  </div>
  <div role="tabpanel" class="tab-pane" id="d6">
  <pre><code class="bash hljs">
  git pull -Xtheirs git://github.com/pantheon-systems/drops-6.git master
  # resolve conflicts
  git push origin master
  </code></pre>
  </div>
  <div role="tabpanel" class="tab-pane" id="wp">
  <pre><code class="bash hljs">
  git pull -Xtheirs git://github.com/pantheon-systems/WordPress.git master
  # resolve conflicts
  git push origin master  
  </code></pre>
  </div>
</div>

## Troubleshooting

### Manually Resolving Conflicts

Conflicts can occur when the upstream you are trying to merge your code with has made alterations to files.

_"When a merge isn’t resolved automatically, git leaves the index and the working tree in a special state that gives you all the information you need to help resolve the merge."_ - Git Manual

For more information on resolving conflicts, see [Git FAQs](/docs/articles/local/git-faq#how-can-i-manually-resolve-conflicts%3F).


### Delete Merge Conflicts

If you have overwritten core, see [Undo Git Commits](/docs/articles/local/undo-git-commits-like-overwriting-drupal-core).

To manually delete merge conflicts from the terminal, use the following commands in sequence:

1. Identify the file that is generating a delete error. For example, the Git log may contain an entry similar to the following:

 ```nohighlight
 CONFLICT (delete/modify): scripts/run-tests.sh deleted in HEAD and modified in 72faeeff1c9356221694d1351cdb2000ab3c5d1c. Version 72faeeff1c9356221694d1351cdb2000ab3c5d1c of scripts/run-tests.sh left in tree.
 ```
2. From your local repository, run the following Git command to get a copy of the file in conflict:

 ```bash
 git checkout <commitid> -- <file>
 ```
For example:
 ```nohighlight
 git checkout 72faeeff1c9356221694d1351cdb2000ab3c5d1c -- run-tests.sh
 ```
3. When looking for a commit ID, find the last instance where the missing file was in the repository. Run “git status” and verify there is a new file to add to the repository:

 ```bash
 git status
 On branch master
 Changes to be committed:
 (use "git reset HEAD ..." to unstage)
 new file: README.txt
 ```

4. Next, run:
 ```bash
 git add .
 ```
5. After performing the add, commit the file with a commit message.

 ```bash
 git commit -am "verifying missing README.txt"
 ```
6. After you receive confirmation from Git that the file was committed, run:

 ```bash
 git push origin master
 ```

### 503 Errors When Running Update.php and Installing Modules

There are multiple reasons that 503s might occur when updating:

- PHP segfault: these are tricky to troubleshoot because very little debugging information is present, though Pantheon engineering is currently working on a fix. A temporary fix is available. Contact Pantheon Support if you think you have been affected.

- Timeouts are another cause of 503s, though they are much less likely to occur if you are using the Pantheon domains. If the operation takes more than sixty seconds, you might see a timeout occur.
