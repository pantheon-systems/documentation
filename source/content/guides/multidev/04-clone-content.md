---
title: Multidev
subtitle: Clone Content in Your Multidev
description: Learn how to clone content in your Multidev.
categories: [develop]
tags: [cms, logs]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/multidev/clone-content
anchorid: clone-content
---

This section provides steps on how to clone content in your Multidev.

1. Select the environment that will contain the cloned content (files and database).

1. Click **Database / Files**.

1. Select the source environment containing the content to be cloned in the **From this Environment** drop-down menu.

1. Select Database, Files, or both.

1. Select whether you want to execute `update.php` after cloning then click **Clone the Database & the Files from `source` into `target` Environment**.

Your content will be cloned into the environment you selected in step 1.

## More Resources

- [Terminus Commands: terminus env:clone-content](/terminus/commands/env-clone-content)
