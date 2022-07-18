---
title: Multidev
subtitle: Create a Multidev Environment
description: Learn how to create a Multidev environment on Pantheon.
categories: [develop]
tags: [cms, logs]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/multidev/create-multidev
anchorid: create-multidev
---

This section provides steps on how to create a new fork in a Pantheon environment by using the code from the Dev environment.


1. Navigate to the **Site Dashboard** > click the **Multidev** tab.

1. Click **Create Multidev Environment**.

1. Specify the name for the Multidev in the **Create Multidev Environment** modal:

   - Multidev branch names must be all lowercase, less than 11 characters, and can contain a dash (`-`).

   - Environments cannot be created with the following reserved names: 
   
      - `master`
      - `settings`
      - `team`
      - `support`
      - `multidev`
      - `debug`
      - `files`
      - `tags`
      - `billing`

1. Choose an environment to clone the database and files from. Note that the code will still come from the Dev environment. See [Components of a site](/pantheon-workflow#components-of-a-site) for a refresher on the distinction between code and content.

1. Click **Create Environment**.

   It will take a few minutes to create the environment and clone the content from the source environment. You can continue working on the Dashboard while it's being created.

   You can create cloned Multidev environments from Dev, Test, or Live; existing branch environments can also be forked. Any branch not associated with an environment will be listed on Multidev > Git Branches.

<Alert title="Note" type="info">

The cache tables can contain entries that exceed the transaction redo limit set by `@innodb_log_file_size@`. If you receive an error message that the clone was aborted, clear caches on the source environment and retry the procedure.

</Alert>

You can also create an environment for an existing Git branch. Content can be cloned from any existing environment during the environment creation.

## More Resources

- [Components of a site](/pantheon-workflow#components-of-a-site)

- [Clearing Caches for Drupal and WordPress](/clear-caches)