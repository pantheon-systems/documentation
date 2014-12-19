---
title: Applying Upstream Updates
description: Apply and debug upstream updates, like Drupal and WordPress releases.
category:
  - developing
  - debugging

---

<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type">
</head>

## Overview

**Note: Only use the one-click updates on the dashboard to update your Drupal core. Do not update core using Drush; you will overwrite your core.**

**You cannot unpack a tarball from Drupal.org; this will overwrite the Pressflow core's auto-configuration feature and your site will lose its database connection.**

If you have overwritten core, see [Undo git commits like overwriting Drupal core](/docs/articles/local/undo-git-commits-like-overwriting-drupal-core).

Drupal Core updates will appear on your dashboard after review and testing by our team, usually within a week of release. These updates appear in your code workspace above beneath the Connection Mode bar when they are available. Sometimes we we will add new features to the Pantheon API module, and deploy bug fixes ahead of a Drupal Core release. Typically, if there’s an update available, you're better off merging it. 

Core updates for alternate distributions (Open Atrium, Commerce Kickstart, etc.) are initiated by the maintainer, not Pantheon. Please contact them directly regarding expected updates.

## Preparation

- ​If you have updates on Dev or Test that are not ready to be deployed to Live with your upstream Updates, see  [Undo git commits like overwriting Drupal core](/docs/articles/local/undo-git-commits-like-overwriting-drupal-core).
- If the development environment is in SFTP mode with pending changes that you are ready to deploy to Live, commit code changes.
- If you are not ready to deploy to Live, use an SFTP connection to copy the files locally.
- Change the development environment connection to Git. (NOTE: Changing the connection mode to Git without committing code will delete those changes.)

## Apply a Core Update

1. Check the options you want to run after pulling the update.
2. Click “Apply Updates”.
![A Pantheon site dashboard with upstream updates available.](https://pantheon-systems.desk.com/customer/portal/attachments/357403)
![Pantheon dashboard showing upstream update in progress.](https://pantheon-systems.desk.com/customer/portal/attachments/357428)
3. Test the update. Click “Visit Development Site” in the Development Environment to test it, or run your automatic user acceptance tests.
4. If you find errors, you can [<u>revert to the last stable commit</u>](/docs/articles/local/git-faq#HowdoIrevertorundochanges?) using Git.
5. Deploy the upstream updates to your Test Environment by clicking “Pull (Content from Live and) Code from Development” in the Code Workspace in the Test Environment.
6. Click “Visit Testing Environment” to test the update against your Live site’s content base.
![Pantheon site dashboard, Test environment's Code tab, with commits ready to pull from Development.](https://pantheon-systems.desk.com/customer/portal/attachments/357430)
7. Deploy the upstream updates to your Live Environment by clicking “Pull Code from Testing” in the Code Workspace in the Live environment.
![The Code tab in a Pantheon site's dashboard's Live environment](https://pantheon-systems.desk.com/customer/portal/attachments/357432)
8. Click “Visit Live Environment” to verify the update is live.

![The Code tab in the Pantheon site's dashboard's Live Environment, showing the upstream commits in the log as deployed.](https://pantheon-systems.desk.com/customer/portal/attachments/357435)

## Debug Failed Merges

If the automated Drupal core update doesn't appear to be working, it's possible there are conflicts with your codebase in the update. Usually these are easy to resolve. Here are debugging steps to find and correct the conflicts.

## Auto-Resolve Conflicts

In the event that the update fails you may see an error indicating a conflict with some files in core.

Try the "Auto-Resolve" option when applying updates. Pantheon will try to automatically resolve conflicts in favor of the upstream Git repository.

**Note: This does not solve all problems that may arise, but it should take care of most situations.**

In the event the "Auto-Resolve Conflicts" option fails, the next step is to manually pull your changes in using Git, resolve the conflicts, and then push the update up to your Pantheon site.

## Resolve Conflicts Locally With Drupal 7

From within an up-to date Git clone on your local machine:

    git pull git://github.com/pantheon-systems/drops-7.git master
    # resolve conflicts
    git push origin master

You can add the `-Xtheirs` flag if you want to accept all changes.

## Resolve Conflicts Locally With Drupal 6

From within an up-to-date Git clone in your local environment:

    git pull git://github.com/pantheon-systems/drops-6.git master
    # resolve other conflicts
    git push origin master


For more information on resolving conflicts, see the [Git FAQ page](/docs/articles/local/git-faq#FrequentlyAskedQuestions).

## Troubleshooting

### Manually Resolving Conflicts

Conflicts can occur when the upstream you are trying to merge your code with has made alterations to files.

_"When a merge isn’t resolved automatically, git leaves the index and the working tree in a special state that gives you all the information you need to help resolve the merge." - __<u>Git Manual</u>_

### Delete Merge Conflicts

To manually delete merge conflicts from the terminal, use the following commands in sequence:

1. Identify the file that is generating a delete error.
2. For example, the Git log may contain an entry similar to the following:

    CONFLICT (delete/modify): scripts/run-tests.sh deleted in HEAD and modified in 72faeeff1c9356221694d1351cdb2000ab3c5d1c. Version 72faeeff1c9356221694d1351cdb2000ab3c5d1c of scripts/run-tests.sh left in tree.

- From your local repository, run the following Git command to get a copy of the file in conflict:

    git checkout <commitid> -- <file>

For example:

    git checkout 72faeeff1c9356221694d1351cdb2000ab3c5d1c -- run-tests.sh

- When looking for a commit ID, you can find the last instance where the missing file was in the repository. Run “git status” and verify there is a new file to add to the repository:

    git status
    On branch master
    Changes to be committed:
    (use "git reset HEAD ..." to unstage)
    new file: README.txt


- Next, you will need to run:

    git add.

- After performing the add, commit the file with a commit message.

    git commit -am "verifying missing README.txt"

- You will receive confirmation from Git that the file has been committed.
- Lastly, you will need to run:

    git push origin master

### 503 Errors When Running Update.php & Installing Modules

There are multiple reasons that 503s might occur when updating:

- PHP segfault: these are tricky to troubleshoot because very little debugging information is present, though Pantheon engineering is currently working on a fix. A temporary fix is available. Contact Pantheon Support if you think you have been affected.

- Timeouts are another cause of 503s, though they are much less likely to occur if you are using the Pantheon domains. If the operation takes more than sixty seconds, you might see a timeout occur.
