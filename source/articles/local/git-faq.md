---
title: Git FAQs
description: Answers to commonly asked questions about Git.
filename: source/_common-tasks/git-faq.md
tools:
  -
---

## Conflicts When Updating Core

If you receive the error that you have conflicts while updating core, the fastest resolution is often the `-Xtheirs` flag. This will attempt to automatically resolve the conflicts with a preference for upstream changes, and is safe to run if you don't have your own changes in any of the conflicting files (e.g. problems with `.gitignore`):

    git pull -Xtheirs [upstream url] master

It's a good idea to double-check the conflicted files before going forward, and make sure no bugs were introduced.

### Drupal 7

Run the following commands within your local environment:

    git pull -Xtheirs git://github.com/pantheon-systems/drops-7.git master
    # resolve conflicts here if needed...
    git push origin master

### Drupal 6

Run the following commands from inside your local Git repository:

    git pull -Xtheirs git://github.com/pantheon-systems/drops-6.git master
    # resolve conflicts here if needed...
    git push origin master

### WordPress

Run the following commands from inside your local Git repository:

    git pull -Xtheirs  git://github.com/pantheon-systems/WordPress.git master
    # resolve conflicts here if needed...
    git push origin master

## Upstreams for Drupal Products

For users who need any of the upstreams for Drupal distributions on Pantheon in order to resolve a conflict, we have added these URLs. If any of the upstream URLs are not working, please let us know.

- **Open Academy: ** https://github.com/systemseed/openacademy-drops-7
- **Open Atrium: ** https://github.com/phase2/openatrium-drops-6.git
- **Open Enterprise: ** https://github.com/levelten/openenterprise-drops-7.git
- **Open Outreach: ** https://github.com/nedjo/openoutreach-drops-7
- **Open Publish: ** https://github.com/phase2/openpublish-drops-7.git
- **Open Public: ** https://github.com/phase2/openpublic-drops-7.git
- **Panopoly: ** https://github.com/populist/panopoly-drops-7.git

##Frequently Asked Questions

#### Does Pantheon support Git submodules?

We don't currently support Git submodules, but we're evaluating if it's the best approach to deliver to our users for managing upstream modules and themes.

Right now, the best approach is to add and commit the code to Git as normal files.

#### What are the Git tags?

    $: git tag
    jenkins-ellis_update_drops_7-3
    jenkins-ellis_update_drops_7-4
    jenkins-ellis_update_drops_7-5
    pantheon.import
    pantheon_live_1
    pantheon_live_2
    pantheon_test_1
    pantheon_test_2

The "update\_drops" tags are from our upstream updates in the past (we don't tag them anymore, but used to).

The tag `pantheon.import` is your initial start state. `pantheon_test_N` and `pantheon_live_N` are created when you use workflow actions, so you can potentially revert to that state, produce diffs, etc.

Savvy Git users may wonder, "if I create my own `pantheon_test_N` tag with a higher value N, can I push changes directly to test?" The answer is "yes, yes you can.".

#### How do I revert or undo changes?

See [Undo Git commits like overwriting Drupal core](/documentation/howto/undo-git-commits-like-overwriting-drupal-core/).

#### How do I apply a patch from Drupal.org on Pantheon?

If you want to patch core or a module, you should use Git. You will need to switch from “on server development” if it's enabled.

Drupal.org has very good instructions about [applying patches with Git](http://drupal.org/node/1399218).

From your local clone, you should be able to run the `git apply` command as per Drupal.org, commit your change, and push back to Pantheon. A good best practice is to include a link to the issue/comment where the patch came from in your commit message.

Drupal.org also has instructions if you're looking to give back by [creating patches for Drupal](http://drupal.org/node/707484).

## Import with Existing History

If you're importing a site that has an existing Git history, you may be able to retain the history if you can successfully merge from the Pantheon upstream.

1. Start a new Pantheon site with a vanilla version of Drupal. Choose the version that's appropriate for your project.
2. Clone your vanilla Pantheon repository using the copy/paste string from the dashboard.
3. From within that clone, run something like:

    'git pull -Xours [your existing repo] [existing site branch]'

4. If there are any conflicts, you'll need to resolve them.
  **Note**: You will get conflicts on all the binary files (e.g. favicion.ico), but you can just Git add them again.

5. Once this is done, push back to Patheon:

    'git push origin master'

6. On the Pantheon dashboard's Git log, we only show the first-parents. This means we will only show the commit you directly push to your Pantheon site, otherwise users would have their changes swamped by Drupal commits after every upgrade. You can run _git log_ from within your repository to view your full history.

#### Can I use Git with On Server Development?

Not simultaneously. It's an either/or decision, but it's easy to switch back and forth.

When you switch to On Server Development, you will not be able to interact with your code via Git. If you try pushing it will be blocked.

If you have On Server Development disabled, you can interact with your code vit Git.

#### What version of Git does Pantheon run?

We are currently running Git 1.7.

#### Why were pushes denied because of changes in sites/default/files?

If you find that you're running into issues with commits that reference sites/default/files, use the filter-branch command to rewrite those references out of your repository. The engineers at Github have [documented this technique](http://help.github.com/remove-sensitive-data/).

From within the Drupal root of your site:

    'git filter-branch -f --index-filter 'git rm -rf --cached --ignore-unmatch \
    sites/default/files' --prune-empty -- f4160148..HEAD'

The commit `f4160148` is one from pretty far back in the Drupal 7 history, guaranteed to pre-date the start of the specific site project. Using the range between that and HEAD prevents filtering the entire Drupal project history, which can take a while. If you're on Drupal 6, you'll need to find your starting point by looking at the Git log. You might also pick a more recent starting point for Drupal 7 if you're in a hurry.

#### Why are pushes denied because the remote upstream URL changed?

We are updating our infrastructure so that code repositories do not have a single point of failure. To do this, we are moving to a more distributed code server binding model.

**How and why we are making this change:**

As a result, the Git connection string format will change. This will start as a feature flag that you can optionally enable on a per-site basis, so you can opt-in to evaluate the settings.

If you have created a local clone of your site, you will need to update the default remote origin with the new format for connection strings. Before you can push updates, you must update your remote URL. To do so run:

    'git remote set-url origin ssh://codeserver.dev.{site}@codeserver.dev.{site}.drush.in:2222/~/repository.git'

By default your remote will be named origin. If you have renamed your Pantheon site's upstream to something else you will have to change origin in the command above.

#### Why can't I connect to Git?

If you're having problems cloning your Git repository, verify that you have enabled your SSH key in your user dashboard. For more information, see [adding the SSH key to your Pantheon account](/documentation/howto/generating-ssh-keys/-generating-ssh-keys).

#### Why am I being prompted for my password after adding the public key?

This occurs when you have multiple SSH keys. For more information, see [Permission denied](https://help.github.com/articles/error-permission-denied-publickey/).

The easiest way to find out which SSH keys your Git client is using when trying to connect is running the following command:

    'ssh -vT git@code.getpantheon.com'

The output should be similar to this:

    debug1: Reading configuration data /etc/ssh/ssh_config
    debug1: Applying options for *
    debug1: Connecting to code.getpantheon.com [50.57.148.117] port 22.
    debug1: Connection established.
    debug1: identity file /home/username/.ssh/id_rsa type 1

You should now be able to configure Git with the matching SSH key and clone your repository.

## Manually Resolving Conflicts

Conflicts can occur when the upstream you are trying to merge your code with has made alterations to files.

_"When a merge isn’t resolved automatically, Git leaves the index and the working tree in a special state that gives you all the information you need to help resolve the merge." - [Git Manual](http://www.kernel.org/pub/software/scm/git/docs/v1.7.3/user-manual.html#resolving-a-merge)_

To manually delete merge conflicts from the terminal, use the following commands in sequence. Start by identifying the file that is generating a delete error.
For example, the Git log may contain an entry similar to the following:  
CONFLICT (delete/modify): scripts/run-tests.sh deleted in HEAD and modified in 72faeeff1c9356221694d1351cdb2000ab3c5d1c. Version 72faeeff1c9356221694d1351cdb2000ab3c5d1c of scripts/run-tests.sh left in tree.
2. From your local repository, run the following Git command to get a copy of the file in conflict:
   'git checkout <commit ID> -- <file>'
When looking for a commit ID, you can find the last instance where the missing file was in the repository.  
3. Run git status and verify that there is a new file to add to the repository:  
    'git status
    On branch master
    Changes to be committed:
    (use "git reset HEAD ..." to unstage)

   new file: README.txt
    '  
4. Run the Git add command:  
 'git add .'  
5. After performing the add, commit the file with an accompanying commit message.  
  'git commit -am "verifying missing README.txt"'
  You will receive confirmation from Git that the file has been committed.  
6. Run the Git push command:  
  'git push origin master'

#### How do I fix fast forward errors?

If you're getting errors after committing your reverted changes, make sure you have included the `-f` option, as you will be forcing a fast-forward update. Without this, you will receive an error similar to the one below:

    '$: git push
    To git@code.getpantheon.com:3ef6264e-51d9-43b9-a60b-6cc22c3081c9
     ! [rejected] master -> master (non-fast-forward)
    error: failed to push some refs to 'git@code.getpantheon.com:3ef6264e-51d9-43b9-a60b-6cc22c3081c9'
    To prevent you from losing history, non-fast-forward updates were rejected
    Merge the remote changes (e.g. 'git pull') before pushing again. See the
    'Note about fast-forwards' section of 'git push --help' for details.'

#### I have a Git conflict; can you fix it for me?

No. Git is a powerful and useful tool, but it does take some time working with it to effectively use it. We do provide a number of resources and documentation to address various issues such as, [importing a site and keeping the Git history](/documentation/advanced-topics/git-faq/-git-faq#importing-existing-git-history), [Git issues performing core updates](/documentation/advanced-topics/git-faq/-git-faq#problems-with-gitignore-conflicts), and [resetting your code to a specific commit](/documentation/advanced-topics/git-faq/-git-faq#how-to-revert-or-undo-changes).

There are a number of patterns and strategies of Git code management for single users to large teams, and each has its own merits, drawbacks, and nuances.

As a result of the varying techniques and to prevent code from being accidentally over-written, it is up to the developer to address these when they occur as Git conflict resolution is a critical and important part of your workflow.

#### How do I delete a remote branch?

    'git push origin :branchname'

#### Why isn't every commit shown in the Pantheon dashboard?

Pantheon uses the following command to display commits in the dashboard:

    'git log --first-parent'

_"This option can give a better overview when viewing the evolution of a particular topic branch, because merges into a topic branch tend to be only about adjusting to updated upstream from time to time, and this option allows you to ignore the individual commits brought in to your history by such a merge._" Git Manual

Pantheon does this so upstream updates or merges from multi-dev environments show up as a cohesive whole, rather than individual commits. For granular details about your Git history, use a Git UI client like [SourceTree](http://www.sourcetreeapp.com/), or visualize the full history with:

    'git log --graph'

## .gitignore on Pantheon

Pantheon provides a default .gitignore file in the base of each site's code repository and in sites/default/files. The .gitignore files can be modified locally and committed, but changes to them that will allow additional files will not be respected on Pantheon's servers. For example, if you modify your local .gitignore to allow caches and push the changed .gitignore to Pantheon, you will not be able to commit generated caches using the Pantheon dashboard.
