---
title: Undo Git Commits Like Overwriting Drupal Core
description: Instructions on how to undo a Git commit.

---

## Overview
We all make mistakes, and Git does a fantastic job of keeping track of them for us. A common problem is overwriting Drupal core. We [try](/articles/getting-started/required-reading-essential-pantheon-documentation/-required-reading-essential-pantheon-documentation) [our](/articles/advanced-topics/git-faq/-git-faq) [best](/articles/running-drupal/drupal-core-updates/-core-updates) to warn you, but it is still possible to execute a Drush update on a local environment and push to Pantheon. For the record: DO NOT UPDATE CORE VIA 'DRUSH UP.'  But presumably you are here because that has already happened.

A bit of context: To facilitate our high-performance, high-availability environment, Pantheon uses a 100% API compatible variant of Drupal known as Pressflow, along with some additional changes specific to our platform.

If you overwrite this version with regular, unmodified Drupal, your site will not work on Pantheon. Fortunately, this is reversible, but will require a little work.

## Getting Started

Before you start making any changes to the Git repository. Be sure to have a working clone as a backup, if you overwrite core re-write the Git log the changes are permanent.

In order to get back to a version of Pressflow you can run a Git log on a core file. In this case we choose the `/includes/bootstrap.inc`. file as this has some references to "PRESSFLOW" when everything is working correctly

    $ git log bootstrap.inc
    commit 9a11sd8f67af9679a6fsafasdf802834207489328
    Author: Russell Wilson
    Date: Fri Dec 6 15:37:24 2014 -0700


        Making a single change to a CSS file in a theme. But bootstrap has a commit?

At this point you will have to revert your code back to the commit before core was overwritten. In this case before commit _9a11sd8f67af9679a6fsafasdf802834207489328_ when changes were made on _Date: Fri Dec 6 15:37:24 2014 -0700_

Once you have that commit, you can begin to apply any changes you have made since the date core was overwritten. Updating each file with a copy from a backup is the best option.

### Undo the Last Commit that Hasn't Been Sent to Pantheon

If you made the change locally but have not sent it to Pantheon, you locally delete that last commit. This is destructive and will undo all the changes.

    git reset --hard HEAD~1

### Undo the Last Commit That is On Pantheon, but Not on Test or Live

If you just made the erroneous change and pushed it to Pantheon and realized that there's a problem, you can overwrite history and pretend it never happened. Again, this is destructive. If you're not comfortable with this technique, use one of the revert techniques below.

    git reset --hard HEAD~1
    git push --force origin master

### Undo the Last Commit on Pantheon That Has Been Deployed

It is important to test changes before deploying them to test or live. This technique will reverse the last commit and leave the history.

    git revert HEAD --no-edit
    git push origin master

### Undo a Prior Commit on Pantheon That Has Been Deployed

This one is a bit trickier, but you can do it. This will selectively undo a particular commit and leave the history.

First, determine what commit you want to undo.

    # List last 10 git commits
    git log --pretty=oneline -10

This will give you a list of commit IDs and the commit message. For example:

    c24030f49d9e330324228f47c2b6c8b06f00eeb1 ctools
    a44306655691d281e852d84fe45a80f7026984cd Views
    ee24ab75e44239102bd0e72da8fb3b423168b4c5 Devel
    b02d4de85147a98d155e6ece9b044ab5ec529881 Generate Errors
    55eae780dd2bcfdce9a39c077b8b294b174c1556 Solr
    79d21b2837cbfc78cbe32f35c058818c796a9187 Initial Commit
    ...

The format of the command to reverse a specific change is:

    git revert COMMITID --no-edit

As an example, let's say I want to get rid of the commit that included Devel. I'll just grab the commit ID of the Devel commit and use it in the revert command.

    git revert ee24ab75e44239102bd0e72da8fb3b423168b4c5 --no-edit

Then, push the change to Pantheon.

    git push origin master
