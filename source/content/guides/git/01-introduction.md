---
title: Git on Pantheon Guide
subtitle: Introduction
description: Understand and use Git with Pantheon.
contributors:  [scottmassey]
tags: [git, cli, workflow]
layout: guide
showtoc: true
permalink: docs/guides/git
anchorid: git
contenttype: guide
categories: [git]
newcms: [drupal, wordpress]
audience: [development]
product: [--]
integration: [git]
---

<Youtube src="LG7_wWQHtS4" title="Git" />

Pantheon provides industry standard version control with [Git](https://git-scm.com/). Pantheon uses Git to make sure all code is stored, versioned, and deployed both safely and predictably. We also give you the power of feature branching through [Multidev](/guides/multidev).

<dfn id="git">Git</dfn> is an open source version control system. It’s fast, secure, and reliable, and supports both simple versioning or complex, distributed, non-linear workflows for hundreds of contributors.

Every Pantheon website comes with a preconfigured container that stores your Git repository so your code and history are always available.

## Git Workflow

Git is the version control tool at the heart of the Pantheon WebOps<Popover title="WebOps" content="WebOps is a set of practices that facilitates collaboration and automates processes to improve web team productivity." /> workflow. It's a good way to streamline your website operations if you like to [develop locally](/local-development). You can develop locally, commit, and push to master to deploy code into your Pantheon Development environment.

You can use the connection information in your dashboard and copy it into your terminal to clone the repository to your local environment. This also syncs your local with the remote version of the code. All changes you make are periodically committed locally and pushed to the remote.

Git allows you to create a parallel version or branch of your current codebase and maintain the current version while you build the new one. This is useful if you're working on more than one version of the code, for example both the current and future version of your website.

You can push this new version of your website to the Pantheon platform, and then build an environment around it with [Multidev](/guides/multidev).

Your changes are sent up the pipeline to your Live environment when you commit. [Git allows you to quickly revert](/guides/git/undo-commits) changes without the risk of restoring the entire environment from a backup if a bug makes it past your automated testing.

## More Resources

- [Using Git with SFTP & WordPress](/guides/wordpress-git/)

- [Git Documentation](https://git-scm.com/doc)

- [Git FAQs](/guides/git/faq-git)

- [Multidev](/guides/multidev)
