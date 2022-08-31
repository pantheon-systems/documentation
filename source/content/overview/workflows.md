---
title: Developer Workflow
description: 
categories: [overview]
tags: [infrastructure]
contributors: [wordsmither]
permalink: docs/overview/workflows
---

The goal of the Developer workflow is to protect your live site as much as possible. The main process of the Pantheon Developer workflow is to move code up from Dev to Test to Live and content down from Live to Test to Dev. 

One of the core concepts at the heart of the Pantheon WebOps workflow is the distinction between **code** and **content**.

- **Code** refers to anything version controlled by Git which includes core, custom and contributed modules or plugins, themes, and libraries.

- **Content** refers to your site's files and the database. In this context, files are static images and assets stored in the standard upload path `wp-content/uploads` for WordPress and `sites/default/files` for Drupal.


## The Workflow

In brief, the process is as follows:

1. Commit your code in the Dev environment

1. In the Test environment, combine the code from Dev with the content from Live

1. Deploy your code to the Live environment

Refer to [Use the Pantheon WebOps Workflow](/pantheon-workflow) for more information.

## Workflow Options

Within this workflow, there are several ways you can manage and develop your sites.

- Manage multiple sites with [Custom Upstreams](/guides/custom-upstream).
- Create sites by using Pantheon Upstreams, importing existing sites, [plus other methods](/start-state).
- Support large teams using [Multidev](/guides/multidev).
- Migrate your site [from a competitor](/get-started).
- [Use the command line](/terminus) to manage and create sites.
- Develop using either [Git](/guides/git) or [SFTP](/sftp).

There are even more tools and options available to you.  Refer to [Develop](/develop) for more information.