---
title: Multidev
subtitle: Compare Multidev Environments
description: Learn how to compare environments in Multidev.
categories: [develop]
tags: [cms, logs]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/multidev/compare-environments
anchorid: compare-environments
---

This section provides steps on how you can compare Multidev environments on your local.

## Compare Multidev Environments Locally

You can compare your Multidev environments using the following methods:

- Through the Multidev tab in the Site Dashboard

- In the site's root directory using your CLI 


### Local Comparison Through the Site Dashboard

1. Navigate to the **Site Dashboard** > click **Multidev**.

The Multidev Environments page provides a list of all existing environments for a site, along with a quick comparison between environments and the master branch of your Dev environment. 

- **Ahead Count:** Represents the number of commits existing on the Multidev environment that have not been merged into master (Dev).

- **Behind Count:** Represents commits in the master branch that do not exist on the Multidev branch.

- Counts displayed on the Multidev Environments page are ordered by time of the commit, which can cause discrepancies in certain scenarios (for example, if an existing commit was cherry-picked from one environment branch into another).

### Local Comparison from the Site Root Directory

1. Navigate to the site's root directory on your local.

1. Run the following command: 

    ```bash
    git show-branch <multidev-name> origin/master
    ```

The [`show-branch`](https://git-scm.com/docs/git-show-branch) output is formatted into two columns and color coded to illustrate which commits exist on the Multidev branch as compared to which exist on the master (Dev) branch.

## More Resources

- [Git on Pantheon](/guides/git)