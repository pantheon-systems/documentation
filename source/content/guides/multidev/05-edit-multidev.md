---
title: Multidev
subtitle: Make Edits and Merge Code in Your Multidev
description: Learn how to make edits and merge code in your Multidev.
categories: [develop]
tags: [cms, logs]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/multidev/edit-multidev
anchorid: edit-multidev
---

This section provides steps on how to edit and merge code in your Multidev environments.

## Edit Code

You can edit your code locally in one of two ways:

- [Git](/guides/git/git-config)

- On-server development with [SFTP](/sftp) mode


### SFTP Mode

1. Navigate to the **Code** tab of the target Multidev environment within the Site Dashboard.

1. Set the connection mode to **SFTP** if it is not already set.

1. Use the WordPress or Drupal admin interfaces to develop, or connect via SFTP using your preferred client.

1. Type in a commit message for edits made via SFTP and click the **Commit** button.

### Git Mode

1. Navigate to the **Code** tab of the target Multidev environment within the Site Dashboard.

1. Set the connection mode to **Git** if it is not already set.

1. Select **Clone with Git** and copy the provided command. 

1. Paste the command in a terminal window to clone a copy of your site's code repository to your local.

1. Navigate to the project's root directory to view existing branches using `git branch -a`.

  If the target environment's branch is _not_ listed, update the list by running `git fetch origin`. When your local clone of the repository shows to be tracking the expected remote branch on Pantheon (e.g., `example-br`), switch to that branch:

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

## More Resources

- [Your Site Code on Pantheon](/code)

- [Developing on Pantheon Directly with SFTP Mode](/sftp)