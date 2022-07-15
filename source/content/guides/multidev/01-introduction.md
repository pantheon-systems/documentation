---
title: Multidev
subtitle: Introduction
description: Detailed information on using Pantheon's Multidev environment for your Drupal or WordPress site.
categories: [develop]
tags: [multidev, git, cli, workflow, collaborate]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/multidev
anchorid: multidev
---

Multidevs are development environments for teams. They allow a developer to fork the entire stack (code and content), work independently, then merge the code changes back into the main `master` site. Each forked branch will have its own separate development environment, including database and files.

![Dev Test and Live icon](../../../images/multidev-flow.png)

<Enablement title="Get WebOps Training" link="https://pantheon.io/learn-pantheon?docs">

Optimize your dev team and streamline internal workflows. Pantheon delivers on-demand training to help development teams make the most of our platform and improve their internal WebOps.

</Enablement>

## Benefits of Multidev

**Easy workflow.** Developers on your team can use a standardized best-practice development workflow in the cloud through their Dashboard.

**No more surprises.** Multidev makes it easy to keep in sync with code from every team member and content updates from any environment. As a result, deployments become surprisingly predictable.

**A fork for every developer on your team.** Multidev gets new developers started quickly; you can’t have too many cooks in a Multidev kitchen.
![Pantheon standard workflow vs multidev](../../../images/multidev-workflow.png)​

## Branching and Multidev Terminology

Branching is a standard mechanism for duplicating source code under revision control for parallel development. In that context, Multidev is Pantheon’s support of a branching workflow using the Pantheon platform and Dashboard.

There are a number of terms used throughout the Multidev workflow:

<dl>

<dt>commit</dt>

<dd>

Record snapshot to history.

</dd>

<dt>push</dt>

<dd>

Send changes to a remote repository.

</dd>

<dt>branch</dt>

<dd>

Movable pointer to a set of commits, allowing independent development and history.

</dd>

<dt>environment</dt>

<dd>

Independent infrastructure for a site, including code, database, and files.

</dd>

<dt>fork</dt>

<dd>

To divide in branches, copying source code to start independent development. At Pantheon, we are also copying content (files and database) when forking.

</dd>

<dt>merge</dt>

<dd>

Combine contents of a&nbsp;branch into another, like a bug fix branch into master.

</dd>

<dt ignored>master</dt>

<dd>

Name of default branch; deployed to Pantheon Dev, Test, and Live environments.

</dd>

</dl>
