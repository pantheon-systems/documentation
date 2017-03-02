---
title: Git FAQs
description: Answers to commonly asked questions about Git, Drupal 8, Drupal 7, Drupal 6 and Pantheon.
tags: [git]
categories: []
contributors: mrfelton
---
[Git](https://git-scm.com/) is the version control tool at the heart of the Pantheon workflow. If you're a developer who likes to use [local development](/docs), it's a good way to work with the Pantheon platform: develop locally, commit, and push to master to deploy code into your Pantheon Development environment.

## Resolve Conflicts

Conflicts can occur when modified file(s) within your site's codebase do not align with changes made to the same file(s) in the site's upstream.

<p style="margin-top:0px;margin-bottom:40px;"><img src="/source/docs/assets/images/icon-version-control.svg
" data-proofer-ignore alt="Worfklow Icon" style="margin-right:30px;max-height:80px;margin-top:10px;float:left;border:0;"><br /><em>When a merge isn’t resolved automatically, Git leaves the index and the working tree in a special state that gives you all the information you need to help resolve the merge. - <a href="http://www.kernel.org/pub/software/scm/git/docs/v1.9.5/user-manual.html#resolving-a-merge">Git Manual</a></em><br />
</p>

### How do I resolve conflicts when updating Core?
If you receive the error that you have conflicts while updating core, the fastest resolution is often the <code>-Xtheirs</code> flag. This will attempt to automatically resolve the conflicts with a preference for upstream changes and is safe to run if you don't have your own changes in any of the conflicting files (e.g. problems with <code>.gitignore</code>).</p>

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
  <pre><code>
  git pull -Xtheirs git://github.com/pantheon-systems/drops-8.git master
  # resolve conflicts
  git push origin master
  </code></pre>
  </div>
  <div role="tabpanel" class="tab-pane" id="d7">
  <pre><code>
  git pull -Xtheirs git://github.com/pantheon-systems/drops-7.git master
  # resolve conflicts
  git push origin master
  </code></pre>
  </div>
  <div role="tabpanel" class="tab-pane" id="d6">
  <pre><code>
  git pull -Xtheirs git://github.com/pantheon-systems/drops-6.git master
  # resolve conflicts
  git push origin master
  </code></pre>
  </div>
  <div role="tabpanel" class="tab-pane" id="wp">
  <pre><code>
  git pull -Xtheirs git://github.com/pantheon-systems/WordPress.git master
  # resolve conflicts
  git push origin master
  </code></pre>
  </div>
</div>

Double-check the files before going forward to make sure no bugs were introduced.

### Where can I find a site's upstream URL?
The upstream URL is provided within the Site Dashboard on **Settings** > **About site**. Upstream URLs can also be identified via [Terminus](/docs/terminus):
```nohighlight
terminus site:info <site> --field=upstream
```

### How can I manually resolve conflicts?

To manually delete merge conflicts from the terminal, use the following commands in sequence. Start by identifying the file that is generating a delete error.
For example, the Git log may contain an entry similar to the following:
```bash
CONFLICT (delete/modify): scripts/run-tests.sh deleted in HEAD and modified in 72faeeff1c9356221694d1351cdb2000ab3c5d1c. Version 72faeeff1c9356221694d1351cdb2000ab3c5d1c of scripts/run-tests.sh left in tree.
```
1. From your local repository, run this Git command to get a copy of the file in conflict:

 ```
 git checkout <commit ID> -- <file>
 ```
  <div class="alert alert-info" role="alert">
  <h4 class="info">Note</h4>
  <p>When looking for a commit ID, you can find the last instance where the missing file was in the repository. </p></div>

2. Run `git status` and verify that there is a new file to add to the repository:

 ```bash
  git status
  On branch master
  Changes to be committed:
  (use "git reset HEAD ..." to unstage)
  new file: README.txt
  ```

4. Stage and commit:   
 ```
 git commit -am "verifying missing README.txt"
 ```
 You will receive confirmation from Git that the file has been committed.

5. Run the Git push command:  
 ```
 git push origin master
 ```

For more details, see [Applying Upstream Updates](/docs/upstream-updates).
## General Git Questions
### Does Pantheon support Git submodules?
No, Git submodules are not supported at this time. We recommend maintaining custom modules, themes, and/or plugins within separate repositories.

### What are the Git tags?
```nohighlight
$: git tag
jenkins-ellis_update_drops_7-3
jenkins-ellis_update_drops_7-4
jenkins-ellis_update_drops_7-5
pantheon.import
pantheon_live_1
pantheon_live_2
pantheon_test_1
pantheon_test_2
```
The "update\_drops" tags are from our upstream updates in the past (we don't tag them anymore, but used to).

The tag `pantheon.import` is your initial start state. `pantheon_test_N` and `pantheon_live_N` are created when you use workflow actions, so you can potentially revert to that state, produce diffs, etc.

Savvy Git users may wonder, "If I create my own `pantheon_test_N` tag with a higher value N, can I push changes directly to test?" The answer is "yes, yes you can."

### How do I revert or undo changes?

See [Undo Git commits like overwriting Drupal core](/docs/undo-commits).

### How do I apply a patch from Drupal.org on Pantheon?

If you want to patch core or a module, you should use Git. You will need to switch from On Server Development if it's enabled.

Drupal.org has very good instructions about [applying patches with Git](http://drupal.org/node/1399218).

From your local clone, run the `git apply` command as per Drupal.org, commit your change, and push back to Pantheon. A best practice is to include a link to the issue/comment where the patch came from in your commit message.

Drupal.org also has instructions if you're looking to give back by [creating patches for Drupal](http://drupal.org/node/707484).

### How do I import a site with existing Git history?
For detailed instructions, see [Migrate Sites to Pantheon: Manual Method](/docs/migrate-manual).

### Can I use Git with SFTP mode?

Not simultaneously, but it's easy to switch back and forth.

When you switch to On Server Development (SFTP), you cannot interact with your code via Git. If you try pushing it will be blocked. When Git mode is enabled, you can interact with your code via Git.

### What version of Git does Pantheon run?

We are currently running Git 1.9.x.

### Why were pushes denied because of changes in sites/default/files?

If you find that you're running into issues with commits that reference `sites/default/files`, use the filter-branch command to rewrite those references out of your repository. The engineers at GitHub have [documented this technique](http://help.github.com/remove-sensitive-data/).

From within the Drupal root of your site:

    git filter-branch -f --index-filter 'git rm -rf --cached --ignore-unmatch \
    sites/default/files' --prune-empty -- f4160148..HEAD

The commit `f4160148` is one from pretty far back in the Drupal 7 history, guaranteed to pre-date the start of the specific site project. Using the range between that and HEAD prevents filtering the entire Drupal project history, which can take a while. If you're on Drupal 6, you'll need to find your starting point by looking at the Git log. You might also pick a more recent starting point for Drupal 7 if you're in a hurry.

### Why are pushes denied because the remote upstream URL changed?

We are updating our infrastructure so that code repositories do not have a single point of failure. To do this, we are moving to a more distributed code server binding model.

As a result, the Git connection string format will change. This will start as a feature flag that you can optionally enable on a per-site basis, so you can opt in to evaluate the settings.

If you have created a local clone of your site, you will need to update the default remote origin with the new format for connection strings, replacing `SITE_UUID` with your [site's UUID](/docs/sites/#site-uuid):  
```
git remote set-url origin ssh://codeserver.dev.SITE_UUID@codeserver.dev.SITE_UUID.drush.in:2222/~/repository.git
```  

By default your remote will be named origin. If you have renamed your Pantheon site's upstream, you will have to change origin in the command above.

### Why can't I connect to Git?

If you're having problems cloning your Git repository, verify your SSH key in your User Dashboard is enabled. For more information, see [Generating SSH Keys](/docs/ssh-keys).

### Why am I being prompted for my password after adding the public key?

This occurs when you have multiple SSH keys. For more information, see [Permission Denied](https://help.github.com/articles/error-permission-denied-publickey/).

1.  Use [Terminus](/docs/terminus) to identify the Git host:
    ```
    terminus connection:info <site>.dev --fields=git_host
    ```

    Which will return:
    ```bash
     Git Host   codeserver.dev.1887c5fa-...-8fe90727d85b.drush.in
    ```

    Copy the URL.

2.  Find out which SSH keys your Git client is using with the following command, replacing `codeserver.dev.<SITE_UUID>.drush.in` with the URL copied in step 2:
    ```
    ssh -vT codeserver.dev.<SITE_UUID>.drush.in
    ```

    The output should be similar to this:
    ```bash
    OpenSSH_7.3p1, LibreSSL 2.4.1
    debug1: Reading configuration data /etc/ssh/ssh_config
    debug1: /etc/ssh/ssh_config line 20: Applying options for *
    debug1: Connecting to codeserver.dev.<SITE_ID>.drush.in port 2222.
    debug1: Connection established.
    debug1: Offering RSA public key: /Users/username/.ssh/id_rsa
    debug1: Server accepts key: pkalg ssh-rsa blen 279
    debug1: Authentication succeeded (publickey).
    Authenticated to appserver.dev.<SITE_ID>.drush.in:2222.
    ```

    Line six in our example output (`Offering RSA public key...`) is the information we're looking for. This is the RSA key being used to initiate the connection. You should now be able to configure Git with the matching SSH public key, and clone your repository.

### How do I fix fast forward errors?

If you're getting errors after committing your reverted changes, make sure you have included the `-f` option, as you will be forcing a fast-forward update. Without this, you will receive an error similar to the one below:
```bash
$: git push
To git@code.getpantheon.com:3ef6264e-51d9-43b9-a60b-6cc22c3081c9
 ! [rejected] master -> master (non-fast-forward)
error: failed to push some refs to 'git@code.getpantheon.com:3ef6264e-51d9-43b9-a60b-6cc22c3081c9'
To prevent you from losing history, non-fast-forward updates were rejected
Merge the remote changes (e.g. 'git pull') before pushing again. See the
'Note about fast-forwards' section of 'git push --help' for details.
```
### I have a Git conflict; can you fix it for me?

No. Git is a powerful and useful tool, but it does take some time working with it to effectively use it. We do provide a number of resources and documentation to address various issues such as, [importing a site and keeping the Git history](/docs/git-faq/#how-do-i-import-a-site-with-existing-git-history%3F), [Git issues performing core updates](/docs/git-faq/#can-i-use-.gitignore-on-pantheon%3F), and [resetting your code to a specific commit](/docs/git-faq/#how-do-i-revert-or-undo-changes%3F).

There are a number of patterns and strategies of Git code management for single users to large teams, and each has its own merits, drawbacks, and nuances.

As a result of the varying techniques and to prevent code from being accidentally overwritten, it is up to the developer to address these when they occur as Git conflict resolution is a critical and important part of your workflow.

### How do I delete a remote branch?
Use the `--delete` option:
```
git push origin --delete branchname
```
Alternatively, you can prefix the branch with a colon.

### How do I keep multiple remote repositories in sync?
A simple option is to configure Git with a multi-remote origin within `.git/config`, such as:

```
[remote "origin"]
	url = ssh://codeserver.dev.<SITE_UUID>@codeserver.dev.<SITE_UUID>.drush.in:2222/~/repository.git
	url = git@github.com:systemseed/example.git
```

Commits will be pushed to both remote destinations automatically on `git push origin`. Enforce this configuration with all team members when working collaboratively. Props to [Tom Kirkpatrick](/docs/contributors/mrfelton) for contributing this tip in the [Power Users](/docs/power-users) group.

### Why are some merged commits hidden?

Pantheon uses the following command to display commits in the Dashboard:  
```
git log --first-parent
```  

According to the Git Manual, "this option can give a better overview when viewing the evolution of a particular topic branch, because merges into a topic branch tend to be only about adjusting to updated upstream from time to time, and this option allows you to ignore the individual commits brought in to your history by such a merge."

Pantheon does this so upstream updates or merges from Multidev environments show up as a cohesive whole, rather than individual commits. For granular details about your Git history, use a Git UI client like [SourceTree](http://www.sourcetreeapp.com/), or visualize the full history with:

```
git log --graph
```

### Can I use .gitignore on Pantheon?

Pantheon provides a default .gitignore file in the base of each site's code repository and in `sites/default/files`. The .gitignore files can be modified locally and committed, but changes to them that will allow additional files will not be respected on Pantheon's servers. For example, if you modify your local .gitignore to allow caches and push the changed .gitignore to Pantheon, you will not be able to commit generated caches using the Pantheon Dashboard.
