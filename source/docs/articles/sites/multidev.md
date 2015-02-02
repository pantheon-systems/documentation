---
title: Multidev
description: Learn how to create branches and cloud development environments, to merge code into the development environment, and to manage data between environments.
category:
  - developing
---

**Multidev** is cloud development environments for teams. Multidev allows a developer to fork the entire stack (code and content), work independently, then merge the code changes back into the master. Each forked branch will have its own separate development environment, including database and files.

## What are the benefits of Multidev?

**Easy workflow.** Developers on your team can use a standardized best-practice development workflow in the cloud through their dashboard.

**No more surprises.** Each developer on your team gets their own cloud development environment with the same configuration and stack as the live environment. Multidev makes it easy to keep in sync with both code from every team member and content updates from any environment. As a result, deployments become surprisingly predictable.

**A fork for every developer on your team.** Multidev gets new developers started quickly; you can’t have too many cooks in a Multidev kitchen.

&nbsp;

![](https://www.getpantheon.com/sites/default/files/docs/desk_images/170383)​

## Branching and Multidev terminology

**Branching** is a standard mechanism for duplicating source code under revision control for parallel development. In that context, **Multidev** is Pantheon’s support of a branching workflow using the Pantheon platform and dashboard.

There are a number of terms that are used throughout the Multidev workflow:

*   **commit** - record snapshot to history. [Read more »](http://gitref.org/basic/#commit)
*   **push** - send changes to a remote repository. [Read more »](http://gitref.org/remotes/#push)
*   **branch** - movable pointer to a set of commits, allowing independent development and history. [Read more »](http://git-scm.com/book/ch3-1.html)
*   **environment** - independent infrastructure for a site, including code, database, files. [Read more »](http://helpdesk.getpantheon.com/customer/portal/docs/articles/383609)
*   **fork** - to divide in branches, copying source code&nbsp;to start independent development. At Pantheon, we are also copying content (files and database) when forking. [Read more »](http://en.wikipedia.org/wiki/Fork_(software_development))
*   **merge** - combine contents of a&nbsp;branch into another, like a bugfix branch into master. [Read more »](http://gitref.org/branching/#merge)
*   **master** - name of default branch; deployed to Pantheon dev, test and live environments.

## How to get started

*   From the Dashboard for the site in question, click the Multidev tab. The overview for Cloud Development Environments will be displayed.
*   Click “Fork new Cloud Environment”. This will create a new fork of the dev environment, including code, database and files.
*   Specify the name for the environment; the URL will incorporate the environment name.
*   Click “Fork”
*   Environment creation will occur in the background; other Dashboard operations can be performed during the brief wait.
*   An environment with the name specified will be created.
*   Content from the source environment will be cloned to the new environment.

You can only fork from the dev environment; forks from test and live are not supported. Existing branch environments can also be forked. Any branch not associated with an environment will be listed on Multidev > Git Branches.

If you create an environment for an existing git branch, as part of the environment creation content can be cloned from any existing environment.

## How to access a branch environment

From the dashboard, click Multidev, then click the name of the environment in question.

Git instructions will be shown in the Connection Mode of the code page. Each environment will have its own independent Connection Info and URL.

## How to clone content in Multidev

*   Select the environment that you wish to clone content (files and database) into.
*   Click Workflow.
*   Using the “Clone from the (name) Environment” drop-down, select the source environment to clone content.
*   Choose either Database, Files, or both.
*   Choose whether to execute update.php after cloning.
*   Click Clone.

## How to merge code in Multidev

*   Select the environment that you wish to merge into. For example, if you wanted to merge your work into master on dev, click the dev tab. Otherwise, select the branch environment.
*   Click the Merge subtab.
*   Select the environment with commits that can be merged into the target.
*   Command-line instructions will be shown for merging the changes into the target. These instructions can be pasted directly into the terminal without modification.

## How to delete a branch environment

Multidev > Cloud Development Environments > Delete

When an environment is deleted, the branch will remain and will need to be removed manually.

## How to delete a branch

A branch with no environment associated with it can be deleted from:

Multidev > Git Branches > Delete Git Branch

Branches can be deleted locally and the commit can be pushed to Pantheon, but this may have unintended consequences if an environment is associated with it; use the interface instead.​

## Multidev Frequently Asked Questions (FAQ)

### How can I get access to Multidev? How much is Multidev?

If you have a Business or Enterprise plan for your site, you already have access to Multidev. Multidev is included at no additional charge for these plans. Multidev is not available as an add-on to other plans.&nbsp;If your project requires Multidev and you have questions, please use the contact form from the Multidev tab in your Dashboard.

### Can I create a branch locally?

Yes; if you create a branch locally and push it to Pantheon, it will be available on Pantheon to be associated with an environment. Environment creation is a manual process; you must click on Multidev > Git Branches and click “Create Environment” next to the branch name in question.

### If I use SFTP mode on a branch environment, do all environments have to be in SFTP mode?

No; each branch environment can be independently set to use either SFTP or git mode for code changes.

### What access controls or permissions are available?

At this time, there are no permissions or access controls for managing the deployment and development workflow beyond the existing Team functionality. This is a known feature request and is scheduled for a future release.

### What are the naming conventions for branches?

Branch names can contain any ASCII letter and number (a through z, 0 through 9) and hyphen (dash). The branch name must start with a letter or number. Currently, the maximum length is 11 characters.

### Can I fork&nbsp;my code&nbsp;without using Multidev?

Yes, you can; your git repository is not restricted. If you do not use Multidev, then the interface will not show the branches, allow creation of an environment for a branch, and so forth.

### Is there a limit on the number of branches or environments?

There is no limit on the number of branches you can have in your git repository.

The limit on forked environments&nbsp;is 5 for Business, 10 for Enterprise.

### Can I associate a domain with a branch environment?

At this time, custom domains cannot be associated with branch environments.

### What git clients are supported?

Any git client can be used with Multidev. Use of the command-line git client is recommended for compatibility with dashboard instructions.

### Does Multidev support remote repositories, such as github?

At this time, Multidev on Pantheon will only work with the Pantheon hosted code repository. You can use remote repositories with your workflow, but Multidev on Pantheon will only recognize changes pushed to Pantheon.

### Is there a public API available for post-commit hooks or other integrations with external project management systems?

Not at this time, but it is on the development roadmap.

### Can you backup and restore a branch environment?

Yes, you can backup and restore a branch environment. However, if you restore an old version of code in Dev, you may damage forked environments.
