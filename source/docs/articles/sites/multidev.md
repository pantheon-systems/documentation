---
title: Multidev
description: Learn how to create branches and cloud development environments, to merge code into the development environment, and to manage data between environments.
category:
- developing
keywords: multidev, organization, cloud development environment, cloud development environments, cde, team management, developing with teams, what is multidev, multidev workflow, what is a branch, what is branching, branch, what is a commit, what is a fork, clone content, clone to a cde, clone to development environment, delete cde, remove cde, delete multidev branch
---
Multidev is cloud development environments for teams and allows a developer to fork the entire stack (code and content), work independently, then merge the code changes back into the master. Each forked branch will have its own separate development environment, including database and files.

## Benefits of Multidev

**Easy workflow.** Developers on your team can use a standardized best-practice development workflow in the cloud through their dashboard.

**No more surprises.** Each developer on your team gets their own cloud development environment with the same configuration and stack as the Live environment. Multidev makes it easy to keep in sync with code from every team member and content updates from any environment. As a result, deployments become surprisingly predictable.

**A fork for every developer on your team.** Multidev gets new developers started quickly; you can’t have too many cooks in a Multidev kitchen.
![](/source/docs/assets/images/desk_images/170383.png)​

## Branching and Multidev Terminology

Branching is a standard mechanism for duplicating source code under revision control for parallel development. In that context, Multidev is Pantheon’s support of a branching workflow using the Pantheon platform and dashboard.

There are a number of terms used throughout the Multidev workflow:

*   **commit**:  record snapshot to history.
*   **push**: send changes to a remote repository.
*   **branch**: movable pointer to a set of commits, allowing independent development and history.
*   **environment**: independent infrastructure for a site, including code, database, and files.
*   **fork**: to divide in branches, copying source code&nbsp;to start independent development. At Pantheon, we are also copying content (files and database) when forking.
*   **merge**: combine contents of a&nbsp;branch into another, like a bug fix branch into master.
*   **master**: name of default branch; deployed to Pantheon Dev, Test and Live environments.

## Getting Started

1. From your site's Dashboard, click the **Multidev** tab.
2. Click **Fork New Cloud Environment**. This will create a new fork of the Dev environment, including code, database and files.
3. Specify the name for the environment; the URL will incorporate the environment name.
4. Click **Fork**.  

It will take a few minutes to create the environment and clone the content from the source environment. You can continue working on the Dashboard while it's being created.


You can only fork from the Dev environment; forks from Test and Live are not supported. Existing branch environments can also be forked. Any branch not associated with an environment will be listed on Multidev > Git Branches.

If you create an environment for an existing Git branch, content can be cloned from any existing environment during the environment creation.

## Access a Branch Environment

From the dashboard, click **Multidev**, then select the name of the environment.

Git instructions are shown in the Connection Mode of the code page. Each environment will have its own independent Connection Info and URL.

## Clone Content

1. Select the environment you want to clone content (files and database) into.
2. Click **Workflow**.
3. Select the source environment from the  **Clone from the <name> Environment** drop-down.
4. Select Database, Files, or both.
5. Choose whether to execute update.php after cloning, and click **Clone**.

## Merge Code

1. Select the environment that you want to merge into. For example, if you want to merge your work into master on Dev, click the Dev tab. Otherwise, select the branch environment.
2. Click **Merge**.
3. Select the environment with commits that can be merged into the target.  
Instructions for using the command-line to merge the changes into the target are shown and can be pasted directly into the terminal without modification.

## Delete a Branch Environment

Go to Multidev > Cloud Development Environments, and click **Delete Environment**.

When an environment is deleted, the branch will remain and needs to be removed manually.

## Delete a Branch

A branch with no environment associated with it can be deleted by going to Multidev > Git Branches and clicking **Delete Git Branch**.

Branches can be deleted locally and the commit can be pushed to Pantheon, but this may have unintended consequences if an environment is associated with it; use the interface instead.​

## Frequently Asked Questions (FAQs)

#### How can I get Multidev and how much is does it cost?

If you have a Business or Enterprise plan for your site, you already have access to Multidev. Multidev is included at no additional charge for these plans. It is not available as an add-on to other plans. If your project requires Multidev and you have questions, please use the contact form from the Multidev tab in your Dashboard.

#### Can I create a branch locally?

Yes; if you create a branch locally and push it to Pantheon, it will be available  to be associated with an environment. Environment creation is a manual process; go to Multidev > Git Branches and click **Create Environment** next to the branch name.

#### If I use SFTP mode on a branch environment, do all environments have to be in SFTP mode?

No; each branch environment can be independently set to use either SFTP or Git mode for code changes.

#### What access controls or permissions are available?

At this time, there are no permissions or access controls for managing the deployment and development workflow beyond the existing Team functionality. This is a known feature request and is scheduled for a future release.

#### What are the naming conventions for branches?

Branch names can contain any ASCII letter and number (a through z, 0 through 9) and hyphen (dash). The branch name must start with a letter or number. Currently, the maximum length is 11 characters.

#### Can I fork my code without using Multidev?

Yes, you can; your Git repository is not restricted. If you do not use Multidev, then the interface will not show the branches, allow creation of an environment for a branch, and so forth.

#### Is there a limit on the number of branches or environments?

There is no limit on the number of branches you can have in your Git repository.

The limit on forked environments is 5 for Business, 10 for Enterprise.

#### Can I associate a domain with a branch environment?

At this time, custom domains cannot be associated with branch environments.

#### What Git clients are supported?

Any Git client can be used with Multidev. Use of the command-line Git client is recommended for compatibility with dashboard instructions.

#### Does Multidev support remote repositories, such as Github?

At this time, Multidev on Pantheon will only work with the Pantheon hosted code repository. You can use remote repositories with your workflow, but Multidev on Pantheon will only recognize changes pushed to Pantheon.

#### Is there a public API available for post-commit hooks or other integrations with external project management systems?

Not at this time, but it is on the development roadmap.

#### Can you backup and restore a branch environment?

Yes, you can backup and restore a branch environment. However, if you restore an old version of code in Dev, you may damage forked environments.ß
