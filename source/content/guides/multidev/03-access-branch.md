---
title: Multidev
subtitle: Access a Multidev Branch Environment
description: Learn how to access a Multidev branch environment.
categories: [develop]
tags: [cms, logs]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/multidev/access-branch
anchorid: access-branch
---

From the Dashboard, click **Multidev**, then select the name of the environment.

Git instructions are shown under the Connection Mode section of the code page for all Dev and Multidev environments.

Once you have cloned your site's codebase to your local machine, you can work on a specific branch by using **git checkout `branch-name`** on the command line, or by checking out the necessary branch using your preferred Git client e.g. SourceTree, GitKraken, GitHub Desktop, etc.

Any changes you make to a branch you have checked out locally will be committed and pushed to the Multidev of the same name.