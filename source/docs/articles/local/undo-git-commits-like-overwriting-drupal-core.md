---
title: Undo Git Commits
description: Instructions on how to undo a Git commit for Drupal 7, Drupal 6, and Pantheon.
category:
  - drupal
keywords: git, git commits, undo git commit, revert
---
We all make mistakes, and Git does a fantastic job of keeping track of them for us. For example, a common problem for Drupal users is overwriting Drupal core. We try our [best to warn you ](/docs/articles/sites/code/applying-upstream-updates) but it is still possible to execute a Drush update on a local environment and push to Pantheon. This example is Drupal specific but the following steps can be applied to undo a commit on any framework, including WordPress.

<div class="alert alert-danger" role="alert">
<h4>Warning</h4>
Do NOT update core via <code>drush up</code>.  But presumably you are here because that has already happened.</div>

To facilitate our high-performance, high-availability environment, Pantheon uses a 100% API compatible variant of Drupal known as Pressflow, along with some additional changes specific to our platform. If you overwrite this version with regular, unmodified Drupal, your site will not work on Pantheon. Fortunately, this is reversible, but will require a little work.

## Getting Started

Before you start making any changes to the Git repository. Be sure to have a working clone as a backup, if you overwrite the core and re-write the Git log the changes will be permanent.

In order to get back to a version of Pressflow, you can run a Git log on a core file. In this case we choose the `/includes/bootstrap.inc`. file as this has some references to Pressflow when everything is working correctly.

```nohighlight
$ git log bootstrap.inc
commit 9a11sd8f67af9679a6fsafasdf802834207489328
Author: Russell Wilson
Date: Fri Dec 6 15:37:24 2014 -0700


    Making a single change to a CSS file in a theme. But bootstrap has a commit?
```
At this point you will have to revert your code back to the commit before core was overwritten. In this case before commit _9a11sd8f67af9679a6fsafasdf802834207489328_ when changes were made on _Date: Fri Dec 6 15:37:24 2014 -0700_.

Once you have that commit, you can begin to apply any changes you have made since the date core was overwritten. Updating each file with a copy from a backup is the best option.

### Undo the Last Commit That Hasn't Been Sent to Pantheon

If you made the change locally but have not sent it to Pantheon, you locally delete that last commit. This is destructive and will undo all the changes.
```nohighlight
git reset --hard HEAD~1
```
### Undo the Last Commit on Dev

If you just made the erroneous change and pushed it to Pantheon and realized that there's a problem, you can overwrite history and pretend it never happened. Again, this is destructive. If you're not comfortable with this technique, use one of the revert techniques below.

```nohighlight
git reset --hard HEAD~1
git push --force origin master
```
### Undo the Last Commit on Pantheon That Has Been Deployed

It is important to test changes before deploying them to Test or Live. This technique will reverse the last commit and leave the history.
```nohighlight
git revert HEAD --no-edit
git push origin master
```
### Undo a Prior Commit on Pantheon That Has Been Deployed

This one is a bit trickier, but you can do it. This will selectively undo a particular commit and leave the history.

First, determine what commit you want to undo.

```nohighlight
# List last 10 git commits
git log --pretty=oneline -10
```
This will give you a list of commit IDs and the commit message. For example:

```nohighlight
c24030f49d9e330324228f47c2b6c8b06f00eeb1 ctools
a44306655691d281e852d84fe45a80f7026984cd Views
ee24ab75e44239102bd0e72da8fb3b423168b4c5 Devel
b02d4de85147a98d155e6ece9b044ab5ec529881 Generate Errors
55eae780dd2bcfdce9a39c077b8b294b174c1556 Solr
79d21b2837cbfc78cbe32f35c058818c796a9187 Initial Commit
...
```
The format of the command to reverse a specific change is:

```bash
git revert COMMITID --no-edit
```
As an example, to get rid of the commit that included Devel, just grab the commit ID of the Devel commit and use it in the revert command.
```bash
git revert ee24ab75e44239102bd0e72da8fb3b423168b4c5 --no-edit
```
Then push the change to Pantheon.

```bash
git push origin master
```
