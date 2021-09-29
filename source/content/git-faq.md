---
title: Git FAQs
description: Answers to common questions about Git, Drupal, WordPress and Pantheon.
categories: [develop]
tags: [git, iterate, local, workflow]
contributors: [mrfelton, alexfornuto]
reviewed: "2020-03-16"
---
[Git](https://git-scm.com/) is the version control tool at the heart of the Pantheon workflow. If you're a developer who likes to use [local development](/local-development), it's a good way to work with the Pantheon platform: develop locally, commit, and push to master to deploy code into your Pantheon Development environment.

<Enablement title="Get WebOps Training" link="https://pantheon.io/learn-pantheon?docs">

Optimize your dev team and streamline internal workflows. Pantheon delivers on-demand training to help development teams master our platform and improve their internal WebOps.

</Enablement>

This doc answers many common Git questions. If you're encountering merge conflicts, see [Resolve Git Merge Conflicts](/git-resolve-merge-conflicts)

## Does Pantheon support Git submodules?

No, Git submodules are not supported at this time. We recommend maintaining custom modules, themes, and/or plugins within separate repositories.

You can remove submodules with `git rm`:

```bash{promptUser: user}
git rm ./submodule_directory/
```

Then commit and push your changes.

## What are the Git tags?

```bash{outputLines:2-9}
git tag
jenkins-ellis_update_drops_7-3
jenkins-ellis_update_drops_7-4
jenkins-ellis_update_drops_7-5
pantheon.initialize
pantheon_live_1
pantheon_live_2
pantheon_test_1
pantheon_test_2
```

The "update\_drops" tags are from our upstream updates in the past (we don't tag them anymore, but used to).

The tag `pantheon.initialize` is your initial start state. `pantheon_test_N` and `pantheon_live_N` are created when you use workflow actions, so you can potentially revert to that state, produce diffs, etc.

Savvy Git users may wonder, "If I create my own `pantheon_test_N` tag with a higher value N, can I push changes directly to test?" The answer is "yes, yes you can."

## How do I revert or undo changes?

See [Undo Git commits like overwriting Drupal core](/undo-commits).

## How do I apply a patch from Drupal.org on Pantheon?

If you want to patch core or a module, you should use Git. You will need to switch from On Server Development if it's enabled.

Drupal.org has very good instructions about [applying patches with Git](https://www.drupal.org/node/1399218).

From your local clone, run the `git apply` command as per Drupal.org, commit your change, and push back to Pantheon. A best practice is to include a link to the issue/comment where the patch came from in your commit message.

Drupal.org also has instructions if you're looking to give back by [creating patches for Drupal](https://www.drupal.org/node/707484).

## How do I import a site with existing Git history?

For detailed instructions, see [Manually Migrate Sites to Pantheon](/migrate-manual).

## Can I use Git with SFTP mode?

Not simultaneously, but it's easy to switch back and forth.

When you switch to On Server Development (SFTP), you cannot interact with your code via Git. If you try pushing it will be blocked. When Git mode is enabled, you can interact with your code via Git.

## What version of Git does Pantheon run?

We are currently running Git 2.4.x.

## Why were pushes denied because of changes in sites/default/files?

If you find that you're running into issues with commits that reference `sites/default/files`, use the filter-branch command to rewrite those references out of your repository. The engineers at GitHub have [documented this technique](https://help.github.com/articles/removing-sensitive-data-from-a-repository/).

From within the Drupal root of your site:

```bash{promptUser: user}
git filter-branch -f --index-filter 'git rm -rf --cached --ignore-unmatch sites/default/files' --prune-empty -- f4160148..HEAD
```

The commit `f4160148` is one from pretty far back in the Drupal 7 history, guaranteed to pre-date the start of the specific site project. Using the range between that and HEAD prevents filtering the entire Drupal project history, which can take a while. You might also pick a more recent starting point for Drupal 7 if you're in a hurry.

If you're on Drupal 8 or WordPress, you'll need to find your starting point by looking at the Git log.

## Why can't I connect to Git?

If you're having problems cloning your Git repository, verify your SSH key in your User Dashboard is enabled. For more information, see [Generating SSH Keys](/ssh-keys).

## Why am I being prompted for my password after adding the public key?

This occurs when you have multiple SSH keys. For more information, see [Permission Denied](https://help.github.com/articles/error-permission-denied-publickey/).

1. Use [Terminus](/terminus) to identify the Git host:

  ```bash{promptUser: user}
  terminus connection:info <site>.dev --fields=git_host
  ```

  Which will return:

  ```none
    Git Host   codeserver.dev.1887c5fa-...-8fe90727d85b.drush.in
  ```

1. Copy the URL.

1. Find out which SSH keys your Git client is using with the following command, replacing `codeserver.dev.<SITE_UUID>.drush.in` with the URL copied in step 2:

  ```bash{promptUser: user}
  ssh -vT codeserver.dev.<SITE_UUID>.drush.in
  ```

  The output should be similar to this:

  ```none{numberLines: true}
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

## How do I fix fast forward errors?

If you're getting errors after committing your reverted changes, make sure you have included the `-f` option, as you will be forcing a fast-forward update. Without this, you will receive an error similar to the one below:

```bash{outputLines:2-7}
git push
To git@code.getpantheon.com:3ef6264e-51d9-43b9-a60b-6cc22c3081c9
 ! [rejected] master -> master (non-fast-forward)
error: failed to push some refs to 'git@code.getpantheon.com:3ef6264e-51d9-43b9-a60b-6cc22c3081c9'
To prevent you from losing history, non-fast-forward updates were rejected
Merge the remote changes (e.g. 'git pull') before pushing again. See the
'Note about fast-forwards' section of 'git push --help' for details.
```

## I have a Git conflict; can you fix it for me?

No. Git is a powerful and useful tool, but it does take some practice to effectively use it. We provide a number of resources and documentation to address various issues such as, [importing a site and keeping the Git history](#how-do-i-import-a-site-with-existing-git-history), [Git issues performing core updates](#can-i-use-.gitignore-on-pantheon), and [resetting your code to a specific commit](#how-do-i-revert-or-undo-changes).

There are a number of patterns and strategies of Git code management for single users to large teams, and each has its own merits, drawbacks, and nuances.

As a result of the varying techniques and to prevent code from being accidentally overwritten, it is up to the developer to address these when they occur as Git conflict resolution is a critical and important part of your workflow. See [Resolve Git Merge Conflicts](/git-resolve-merge-conflicts) for more information.

## How do I delete a remote branch?

Use the `--delete` option:

```bash{promptUser: user}
git push origin --delete branchname
```

Alternatively, you can prefix the branch with a colon.

## How do I keep multiple remote repositories in sync?

A simple option is to configure Git with a multi-remote origin within `.git/config`, such as:

```none:title=.git/config
[remote "origin"]
  url = ssh://codeserver.dev.<SITE_UUID>@codeserver.dev.<SITE_UUID>.drush.in:2222/~/repository.git
  url = git@github.com:systemseed/example.git
```

Commits will be pushed to both remote destinations automatically on `git push origin`. Enforce this configuration with all team members when working collaboratively. Props to [Tom Kirkpatrick](/contributors/mrfelton) for contributing this tip in the [Pantheon Community](/pantheon-community).

## Why are some merged commits hidden?

Pantheon uses the following command to display commits in the Dashboard:

```bash{promptUser: user}
git log --first-parent
```

According to the Git Manual:

> This option can give a better overview when viewing the evolution of a particular topic branch, because merges into a topic branch tend to be only about adjusting to updated upstream from time to time, and this option allows you to ignore the individual commits brought in to your history by such a merge.

Pantheon does this so upstream updates or merges from Multidev environments show up as a cohesive whole, rather than individual commits. For granular details about your Git history, use a Git UI client like [SourceTree](https://www.sourcetreeapp.com/), or visualize the full history with:

```bash{promptUser: user}
git log --graph
```

## Can I use .gitignore on Pantheon?

Pantheon provides default `.gitignore` files in the base of each site's code repository. It includes the path `sites/default/files` for Drupal sites, and `wp-contents/uploads` for WordPress sites. The `.gitignore` files can be modified locally and committed, but changes to them that will allow additional files will not be respected on Pantheon's servers. For example, if you modify your local `.gitignore` to allow caches and push the changed `.gitignore` to Pantheon, you will not be able to commit generated caches using the Pantheon Dashboard.

## Troubleshoot Commit Issues

If you encounter an error when trying to commit, check the following:

- Commit Size: If the commit is too large, it will be rejected.
  - Check the commit for non-codebase files that have been added to the site.
  - Does the commit contain a full overwrite of the entire site? Rather than overwrite the site in place, we suggest migrating to a new site to avoid downtime and potential conflicts. See [Relaunch Existing Pantheon Site](/relaunch) for more information.
- Confirm that the file isn't listed in `.gitignore`
