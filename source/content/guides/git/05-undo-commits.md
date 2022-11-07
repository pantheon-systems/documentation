---
title: Undo Git Commits
subtitle: Undo Git Commits
description: Learn how to revert a Git commit before and after pushing to Pantheon.
tags: [cli, code, git, local, workflow]
layout: guide
showtoc: true
permalink: docs/guides/git/undo-commits
anchorid: undo-commits
contenttype: guide
categories: []
newcms: []
audience: [development]
product: []
integration: []
---

Git makes it easy to reverse commits pushed to the Pantheon Dev environment.
For example, a common problem is overwriting Drupal or WordPress core on a local environment and pushing to your Pantheon Dev environment when core update [warnings](/core-updates) are missed. This scenario is reversible, but will require a little work.

<Alert title="Warning" type="danger">

The dashboard cannot pull in upstream updates if you run the `git revert` command to revert an upstream update. You should use the `git reset --hard COMMIT_BEFORE_MERGE` command if an upstream update introduces a regression or bug. This allows the dashboard to accurately judge the state of your site repository and determine if it is behind the upstream.

</Alert>

## Before You Begin

You must have the items listed below completed before you begin the steps in this doc.

- Set up a [local development environment](/local-development) with [Git version control](/guides/git/git-config).

- Have a working [clone](/guides/git/git-config#clone-your-site-codebase) as a backup

    - If you accidentally overwrite the core and re-write the Git log, the changes will be permanent. 

Review the sections below carefully as instructions for reverting commits are different depending on the environment (Dev, Test, Live).

## Restore Core to Upstream

In this example, the `/includes/bootstrap.inc` file on a Drupal 7 site has references to when core was overwritten.

```bash{outputLines:2-7}
git log bootstrap.inc
commit 9a11sd8f67af9679a6fsafasdf802834207489328
Author: Russell Wilson
Date: Fri Dec 6 15:37:24 2014 -0700


    Making a single change to a CSS file in a theme. But bootstrap has a commit?
```

1. Run a Git log on a core file to get back to a previous version of core.

1. Revert your code back to the commit before core was overwritten. 

    - In this example, before commit `9a11sd8f67af9679a6fsafasdf802834207489328`, where changes were made on `Date: Fri Dec 6 15:37:24 2014 -0700`.

1. Apply any changes you have made since the date core was overwritten. Updating each file with a copy from a backup is the best option.

## Delete the Last Commit That Hasn't Been Sent to Pantheon

You can delete changes made in your local environment that have not been pushed to Pantheon. 

### Hard Reset

A hard reset will completely destroy all changes and remove them from the local directory.

Run the command below to locally delete that last commit. 

```bash{promptUser: user}
git reset --hard HEAD~1
```

### Soft Reset

A soft reset will keep your files and stage all changes back automatically. 

Run the command below to locally delete that last commit:

```bash{promptUser: user}
git reset --soft HEAD ~1
git commit -C HEAD ~1
```

## Go Back in Time

Resetting to a point in time when you know your local was working correctly can be a simple way to get back on track.

Run the command below, replacing the amount of time you want to go back to as needed:

```bash{promptUser: user}
git reset --hard HEAD@{5.minutes.ago}
```

## Interactive Rebase

You can enter interactive mode by passing a `-i` or `--interactive` to the `git rebase` command. This is a good option if you have a number of commits that you would like to modify during the rebase.

1. Run the command below to enter interactive mode:

    ```bash{promptUser: user}
    git rebase -i origin/master
    ```

    - A selection screen displays with a list of options.

1. Select the appropriate command depending on your needs.

Review the [Git documentation](http://shafiul.github.io/gitbook/4_interactive_rebasing.html) for more information.

## Delete the Last Commit on Dev

You can delete changes made in your local environment that have been pushed to Pantheon. This will completely destroy all changes and remove them from the local directory.

Run the command below to delete that last commit:

```bash{promptUser: user}
git reset --hard HEAD~1
git push --force origin master
```

## Revert the Last Commit on Pantheon That Has Been Deployed to Test or Live

It is important to test changes before deploying them to Test or Live. However, you can reverse commits pushed to your Test or Live environment on Pantheon.

Run the command below to reverse the last commit and retain your history.

```bash{promptUser: user}
git revert HEAD --no-edit
git push origin master
```

## Revert a Prior Commit on Pantheon That Has Been Deployed to Test or Live

You can revert a past commit that has been pushed to your Test or Live environment on Pantheon. This method will selectively undo a particular commit and leave the history.

1. Determine which commit you want to undo.

    ```bash{promptUser: user}
    git log --pretty=oneline -10 # List last 10 git commits
    ```

    This will give you a list of commit IDs and the commit message. For example:

    ```git
    c24030f49d9e330324228f47c2b6c8b06f00eeb1 ctools
    a44306655691d281e852d84fe45a80f7026984cd Views
    ee24ab75e44239102bd0e72da8fb3b423168b4c5 Devel
    b02d4de85147a98d155e6ece9b044ab5ec529881 Generate Errors
    55eae780dd2bcfdce9a39c077b8b294b174c1556 Solr
    79d21b2837cbfc78cbe32f35c058818c796a9187 Initial Commit
    ...
    ```

1. Run the command below to reverse a specific change:

    ```bash{promptUser: user}
    git revert COMMITID --no-edit
    ```

    For example: to get rid of the commit that included Devel, grab the commit ID of the Devel commit and use it in the revert command.

        ```bash{promptUser: user}
        git revert ee24ab75e44239102bd0e72da8fb3b423168b4c5 --no-edit
        ```

1. Push the change to Pantheon.

    ```bash{promptUser: user}
    git push origin master
    ```

## Reset Dev Environment to Live

You can reset your Dev environment history to match the current state of your Live environment using [Terminus](/terminus). The method in this section is destructive and should be used with caution. It does not clone the Live environment's database or files down to Dev. However, it does reset the Dev environment's codebase. 

1. Identify the most recent commit deployed to Live.

1. Run the command below to overwrite the history on Dev's codebase to reflect Live (replace `<site>` with your site's name):

    ```bash{promptUser: user}
    git reset --hard `terminus env:code-log <site>.live --format=string | grep -m1 'live' | cut -f 4`
    git push origin master -f
    ```

## What if Dev Is Behind Test and Live?

This happens if you **reset** Dev to an earlier commit, rather than using **revert**. You must make a commit on Dev to re-sync the environments. This will also get the commit history between the environments to match. The commit you use can be trivial, such as a space or extra line added to a comment within a file. You'll see the commit available for deployment on Test, and then on Live after you commit the change.


## More Resources

- [Pantheon WebOps Workflow](/pantheon-workflow)

- [Your Site Code on Pantheon](/code)

- [Git FAQs](/guides/git/faq-git)

- [Resolve Merge Conflicts](/guides/git/resolve-merge-conflicts)
