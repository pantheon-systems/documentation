---
title: Undo Git Commits
description: Learn how to revert a Git commit before and after pushing to Pantheon.
categories: [develop]
tags: [cli, code, git, local, workflow]
---

We all make mistakes, and Git does a fantastic job of keeping track of them for us. For example, a common problem is overwriting Drupal or WordPress core. We try our [best to warn you](/core-updates) but it is still possible to overwrite core on a local environment and push to Pantheon. Fortunately, this is reversible, but will require a little work.

<Alert title="Warning" type="danger">

Using `git revert` to revert an upstream update will result in the dashboard being unable to pull upstream updates. If an upstream update introduces a regression or bug, you should use `git reset --hard COMMIT_BEFORE_MERGE` so that the dashboard can accurately judge the state of your site repository and whether it is behind the upstream.

</Alert>

## Before You Begin

The following assumes you have set up a [local development environment](/local-development) with [Git version control](/git).

Before you start making any changes to the Git repository. Be sure to have a working clone as a backup, if you overwrite the core and re-write the Git log the changes will be permanent.

## Restore Core to Upstream

In order to get back to a version of core, you can run a Git log on a core file. In this example, we take a look at `/includes/bootstrap.inc` on a Drupal 7 site - as this file has some references to when core was overwritten.

```bash{outputLines:2-7}
git log bootstrap.inc
commit 9a11sd8f67af9679a6fsafasdf802834207489328
Author: Russell Wilson
Date: Fri Dec 6 15:37:24 2014 -0700


    Making a single change to a CSS file in a theme. But bootstrap has a commit?
```

At this point you will have to revert your code back to the commit before core was overwritten. In this case before commit `9a11sd8f67af9679a6fsafasdf802834207489328` when changes were made on `Date: Fri Dec 6 15:37:24 2014 -0700`.

Once you have that commit, you can begin to apply any changes you have made since the date core was overwritten. Updating each file with a copy from a backup is the best option.

## Delete the Last Commit That Hasn't Been Sent to Pantheon

If you made the change locally but have not sent it to Pantheon, you locally delete that last commit. This is destructive and will undo all the changes.

```bash{promptUser: user}
git reset --hard HEAD~1
```

## Delete the Last Commit on Dev

If you just made the erroneous change and pushed it to Pantheon and realized that there's a problem, you can overwrite history and pretend it never happened. Again, this is destructive. If you're not comfortable with this technique, use one of the revert techniques below.

```bash{promptUser: user}
git reset --hard HEAD~1
git push --force origin master
```

## Revert the Last Commit on Pantheon That Has Been Deployed

It is important to test changes before deploying them to Test or Live, but just in case, this technique will reverse the last commit and leave the history.

```bash{promptUser: user}
git revert HEAD --no-edit
git push origin master
```

## Revert a Prior Commit on Pantheon That Has Been Deployed

This one is a bit trickier, but you can do it. This will selectively undo a particular commit and leave the history.

First, determine what commit you want to undo.

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

The format of the command to reverse a specific change is:

```bash{promptUser: user}
git revert COMMITID --no-edit
```

As an example, to get rid of the commit that included Devel, just grab the commit ID of the Devel commit and use it in the revert command.

```bash{promptUser: user}
git revert ee24ab75e44239102bd0e72da8fb3b423168b4c5 --no-edit
```

Then push the change to Pantheon.

```bash{promptUser: user}
git push origin master
```

## Reset Dev Environment to Live

If the Dev environment gets tangled up with changes you wish to abandon, you can reset history to match the current state of Live using [Terminus](/terminus). Again, this is destructive. If you're not comfortable with this technique, use one of the revert techniques. Also note, this resets the Dev environment's codebase only, it does not clone Live's database or files down to Dev.

Identify the most recent commit deployed to Live and overwrite history on Dev's codebase to reflect Live (replace `<site>` with your site's name):

```bash{promptUser: user}
git reset --hard `terminus env:code-log <site>.live --format=string | grep -m1 'live' | cut -f 4`
git push origin master -f
```

## What if Dev is behind Test and Live?

This happens if you **reset** Dev to an earlier commit, rather than using **revert**.
To bring everything back in sync and to the same commit, you will need to make a commit on Dev. This can be a trivial commit - just a space or extra line added to a comment within a file will work.
Once you commit that change, you'll see the commit available for deployment on Test, and then on Live.
