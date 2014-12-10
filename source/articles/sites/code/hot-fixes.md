---
title: Hot Fixes
description: Learn how to deploy a hotfix on Pantheon.
filename: source/_common-tasks/hot-fixes.md
tools:
  -
---

Sometimes it's necessary to push a quick fix without pushing everything that's been going on in dev. This is called a "hotfix", and here's how you do it on Pantheon:

## Requirements

- A working knowledge of Git tools.
- An up-to-date clone of your Pantheon Git repository.

## Get Into the Right Tag

From within your Git clone, get a quick list of the existing Git tags:

    #> git tag
    pantheon.initialize
    pantheon_live_1
    pantheon_test_1
    pantheon_test_2
    pantheon_test_3
    pantheon_test_4

Select the highest `live` tag and check it out:

    #> git checkout pantheon_live_1
    Note: checking out 'pantheon_live_1'.


    You are in 'detached HEAD' state. You can make experimental
    changes and commit them, and you can discard any commits you make without impacting any branches by performing another checkout.


    If you want to create a new branch to retain commits you create, you can
    do so by using -b with the checkout command again. Example:


      git checkout -b new_branch_name


    HEAD is now at ....

You are now ready to start work based on the state of the live site.

## Generate a New Hotfix Test Tag

Make your hotfixes and commit them locally. Then tag and push them to test by creating a _new_ test tag with a higher number value:

    #> git tag -a pantheon_test_5 -m "Preparing a hotfix"
    #> git push origin pantheon_test_5

**Note**: Your tag numbers will vary. We are showing 5 since in the list of tags above the highest number was 4. Be sure you have the right number before pushing.

## Test and Deploy

**Note:** Because we use caching on our Git logs, you may not see your hotfix commit listed in the test commit log. However, if you've pushed it up, you should be able to test your changes. Once you've verified that your code hotfix is there, you should pull the database back from Live to Test to be sure you're looking at a good test case before finally pulling it into the Live environment.

If your tests are good, you can use the "Pull Code" option on the dashboard to deploy your hotfix. This will automatically create a new live tag for you and deploy it.

## Orphan Commits

On Pantheon an orphan commit is any commit that exists on the Test or Live environment but not in the master branch.

We alert you of these commits because they are vulnerable to being overwritten with the default code workflow. Even when making hotfixs your workflow should push those changes into the master branch. Since we have no way of knowing which future commit will contain those changes we want you to be aware of potential code loss.

The alert message on the Live environment is only indicating that orphan commits exist. The tags/labels on the right side of the commit message lets you know which environments the commits exist in.

If you do want to preserve the orphan commits, follow these Git commands to make a clean merge:

    #> git checkout master
    #> git checkout -b hotfix
    #> git cherry-pick 0f230b0ef9fdce5d794cb1a4b6cf26a8052ba92a
    #> git checkout master
    #> git merge hotfix

Make sure to cherry-pick the commits in chronological order to avoid issues with your integration and replace the hash code in the example above with the actual hash of the commit you are trying to preserve.
