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

### Compare Multidev Environments Locally

The Multidev Environments page provides a list of all existing environments for a site, along with a quick comparison between environments and master (Dev). The "ahead" count represents the number of commits existing on the Multidev environment that have not been merged into master (Dev), while the "behind" count represents commits in master that do not exist on the Multidev branch.

Counts displayed on the Multidev Environments page are ordered by time of the commit, which can cause discrepancies in certain scenarios (e.g. if an existing commit was cherry-picked from one environment branch into another).

You can view a similar comparison locally by navigating to the site's root directory and running:
`git show-branch <multidev-name> origin/master`

The [`show-branch`](https://git-scm.com/docs/git-show-branch) output is formatted into two columns and color coded to illustrate which commits exist on the Multidev branch as compared to master (Dev).
