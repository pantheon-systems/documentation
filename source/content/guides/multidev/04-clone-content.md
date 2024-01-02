---
title: Multidev
subtitle: Clone Content in Your Multidev
description: Learn how to clone content in your Multidev.
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
permalink: docs/guides/multidev/clone-content
---

This section provides steps on how to clone content in your Multidev.
<Wistia src="d3vw8r3ooi" />

1. Select the environment that will contain the cloned content (files and database).

1. Click **Database / Files**.

1. Select the source environment containing the content to be cloned in the **From this Environment** drop-down menu.

1. Select Database, Files, or both.

1. Select whether you want to execute `update.php` after cloning then click **Clone the Database & the Files from `source` into `target` Environment**.

Your content will be cloned into the environment you selected in step 1.

## More Resources

- [Terminus Commands: terminus env:clone-content](/terminus/commands/env-clone-content)
