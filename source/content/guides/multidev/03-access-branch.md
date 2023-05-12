---
title: Multidev
subtitle: Access a Multidev Branch Environment
description: Learn how to access a Multidev branch environment.
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
permalink: docs/guides/multidev/access-branch
---

This section provides steps on how to access a Multidev branch environment.


1. [Go to the Site Dashboard](/guides/account-mgmt/workspace-sites-teams/sites#site-dashboard), then click **Multidev**.

1. Select the name of the environment.

    Git instructions are shown under the Connection Mode section of the code page for all Dev and Multidev environments.

1. Use **git checkout `branch-name`** on the command line after you have cloned your site's codebase to your local machine. You can check out the necessary branch using your preferred Git client, for example, SourceTree, GitKraken, GitHub Desktop, etc.

Any changes you make to a branch you have checked out locally are committed and pushed to the Multidev of the same name.

## More Resources

- [Git on Pantheon](/guides/git)