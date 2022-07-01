---
title: Git on Pantheon Guide
subtitle: Introduction
description: Understand and use Git with Pantheon.
contributors:  [scottmassey]
categories: [develop]
tags: [git, cli, workflow]
layout: guide
showtoc: true
permalink: docs/guides/git
anchorid: git
---

<Youtube src="LG7_wWQHtS4" title="Git" />

Pantheon provides the industry standard version control with [Git](https://git-scm.com/). Any changes are tracked and stored. We also give you the power of feature branching through [Multidev](/multidev. Pantheon uses Git to make sure all code is stored, versioned, and deployed both safely and predictably.

Git is an open source version control system. It’s fast, secure, and reliable, and supports both simple versioning or complex, distributed, non-linear workflows for hundreds of contributors.

Every Pantheon website comes with a preconfigured container that stores your Git repository—a fancy word for the code and its history.

You can use the connection info from the dashboard and copy into your terminal if you have Git installed on your computer.  This clones the repository to your local environment and syncs your local with the remote version of the code. All changes you make are periodically committed locally and pushed to the remote.

Git allows you to create a parallel version or branch of your current codebase and maintain the current version while you build the new one. This is useful if you're working on more than one version of the code,for example both the current and future version of your website.

You can push this new version of your website to the Pantheon platform, and then build an environment around it with [Multidev](/multidev).

Your changes are sent up the pipeline to your Live environment when you commit.  [Git allows you to quickly revert](/guides/git/undo-commits)changes without the risk of restoring the entire environment from a backup iff a bug makes it past your automated testing.

## More Resources

- [Using Git with SFTP & WordPress](/guides/wordpress-git/)

