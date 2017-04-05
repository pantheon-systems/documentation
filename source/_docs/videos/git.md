---
title: Git
description: Understand and use Git with Pantheon.
contributors:  [scottmassey]
videoid: b7okmpc05p
permalink:  docs/videos/:basename/
tags: [git]
type: video
categories: [develop, cli]
layout: video
---
Pantheon uses Git to make sure all code is stored, versioned, and deployed both safely and predictably.

Git is an open source version control system. It’s fast, secure, and reliable, and supports both simple versioning or complex, distributed, non-linear workflows for hundreds of contributors.

On every Pantheon website, you’re provided a preconfigured container which houses your Git repository—a fancy word for the code and its history.

As long as Git is installed on your computer, all you need to do is grab the connection info from the dashboard and copy into your terminal. This clones the repository to your local environment. You’re now in sync with your remote version of the code. All changes you make are periodically committed locally and just those changes are sent to the mothership.

Often you’re working on more than one version of the code, say for example both the current and future version of a website. With Git you can create a parallel version or branch of your current codebase and maintain the current version while you build the new one. On Pantheon, you can push that new version of the website to the platform, and then build an environment around it with [Multidev](/docs/multidev).

As you commit, you send those changes up the pipeline to your Live environment.  If a bug makes it past your automated testing, no problem. [Git allows you to quickly revert](/docs/undo-commits/) just those changes without the risk of restoring the entire environment from a backup.

With Git, Pantheon provides the industry standard for version control. Any changes are tracked and stored. We also give you the power of feature branching through multidev.
