---
title: Multidev
subtitle: Make Edits and Merge Code in Your Multidev
description: Learn how to make edits and merge code in your Multidev.
contenttype: [guide]
innav: [false]
categories: [multidev]
cms: [--]
audience: [development]
product: [multidev]
integration: [--]
tags: [cms, logs]
contributors: [whitneymeredith]
showtoc: true
permalink: docs/guides/multidev/edit-multidev
---

This section provides steps on how to make edits, merge code in your Multidev environments, and rename a branch.

<Wistia src="2lyxgxgkfw" />

## Edit Code

You can edit your code locally in one of two ways:

- On-server development with [SFTP](/guides/sftp) mode

- [Git](/guides/git/git-config)


### SFTP Mode

1. Navigate to the **Code** tab of the target Multidev environment within the **Site Dashboard**.

1. Set the connection mode to **SFTP** if it is not already set.

1. Use the WordPress or Drupal admin interfaces to develop, or connect via SFTP using your preferred client.

1. Type in a commit message for edits made via SFTP and click the **Commit** button.

### Git Mode

1. Navigate to the **Code** tab of the target Multidev environment within the **Site Dashboard**.

1. Set the connection mode to **Git** if it is not already set.

1. Select **Clone with Git** and copy the provided command.

1. Paste the command in a terminal window to clone a copy of your site's code repository to your local.

1. Navigate to the project's root directory to view existing branches using `git branch -a`.

  If the target environment's branch is _not_ listed, update the list by running `git fetch origin`. When your local clone of the repository shows to be tracking the expected remote branch on Pantheon (for example, `example-br`), switch to that branch:

  ```bash{promptUser: user}
  git checkout example-br
  ```

1. Make desired code changes, then stage, commit, and push to the Multidev environment. For example:

  ```bash{promptUser: user}
  git add .
  git commit -m "My code changes"
  git push origin example-br
  ```


## Merge Code

The steps below show you how to merge code from a Multidev into the master branch of your Dev environment.

1. Click the **Dev** tab.

1. Click **Merge**.

1. Select the environment with commits that can be merged into the Dev master branch.

Instructions for using the command-line to merge the changes into the target are shown below and can be pasted directly into the terminal without modification.

![Location of Multidev merge button](../../../images/dashboard/multidev-merge.png)


## Rename a Branch

Branch names must be lowercase and no more than 11 characters. If you push a branch to Pantheon that exceeds the character limit or has uppercase letters, it cannot become a Multidev environment. The solution is to rename the branch. This is only recommended if you don't have other users working on this branch, or if you have already coordinated with them.

1. Run the command below to rename the branch:

  ```bash{promptUser: user}
  git branch -m old-branch-name new-name
  ```

1. Push the renamed branch:

  ```bash{promptUser: user}
  git push origin new-name
  ```

  This creates a new branch with the commit history intact.

1. Navigate to the **Multidev Environments** page then click **Git Branches** then delete the original branch. You will now be able to create an environment associated with the renamed Git branch.

## More Resources

- [Your Site Code on Pantheon](/pantheon-workflow#your-site-code-on-pantheon)

- [Developing on Pantheon Directly with SFTP Mode](/guides/sftp)
