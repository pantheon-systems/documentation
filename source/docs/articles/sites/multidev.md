---
title: Multidev
description: Detailed information on Pantheon's Multidev.
category:
- developing
keywords: multidev, organization, multidev environment, team management, developing with teams, what is multidev
---
Multidev is development environments for teams and allows a developer to fork the entire stack (code and content), work independently, then merge the code changes back into the master. Each forked branch will have its own separate development environment, including database and files.
<img src="/source/docs/assets/images/multidev-flow.png" alt="Dev Test and Live icon" style="border:0;margin-left:auto;margin-right:auto;display:block;">

## Benefits of Multidev

**Easy workflow.** Developers on your team can use a standardized best-practice development workflow in the cloud through their Dashboard.

**No more surprises.** Each developer on your team gets their own Multidev environment with the same configuration and stack as the Live environment. Multidev makes it easy to keep in sync with code from every team member and content updates from any environment. As a result, deployments become surprisingly predictable.

**A fork for every developer on your team.** Multidev gets new developers started quickly; you can’t have too many cooks in a Multidev kitchen.
![Pantheon standard workflow vs multidev](/source/docs/assets/images/desk_images/170383.png)​

## Branching and Multidev Terminology

Branching is a standard mechanism for duplicating source code under revision control for parallel development. In that context, Multidev is Pantheon’s support of a branching workflow using the Pantheon platform and dashboard.

There are a number of terms used throughout the Multidev workflow:

<dl>
<dt>commit</dt>
<dd>Record snapshot to history.</dd>
<dt>push</dt>
<dd>Send changes to a remote repository.</dd>
<dt>branch</dt>
<dd>Movable pointer to a set of commits, allowing independent development and history.</dd>
<dt>environment</dt>
<dd>Independent infrastructure for a site, including code, database, and files.</dd>
<dt>fork</dt>
<dd>To divide in branches, copying source code&nbsp;to start independent development. At Pantheon, we are also copying content (files and database) when forking.</dd>
<dt>merge</dt>
<dd>Combine contents of a&nbsp;branch into another, like a bug fix branch into master.</dd>
<dt>master</dt>
<dd>Name of default branch; deployed to Pantheon Dev, Test and Live environments.</dd></dl>

## Getting Started

1. From your Site Dashboard, click the **Multidev** tab.
2. Click **Create Multidev Environment**. This will create a new fork of the environment that you choose in the select box on the pop-up modal, including code, database and files.
3. Specify the name for the environment; the URL will incorporate the environment name.
4. Click **Create Environment**.

It will take a few minutes to create the environment and clone the content from the source environment. You can continue working on the Dashboard while it's being created.

You can create cloned Multidev environments from Dev, Test or Live; existing branch environments can also be forked. Any branch not associated with an environment will be listed on Multidev > Git Branches.

<div class="alert alert-info">
<h4>Note</h4>
The cache tables can contain entries which exceed the transaction redo limit set by <code>@innodb_log_file_size@</code>. If you receive an error message that the clone was aborted, clear caches on the source environment and retry the procedure.
</div>
You can also create an environment for an existing Git branch. Content can be cloned from any existing environment during the environment creation.

## Create a New Multidev Environment

First, create a branch locally and push it to Pantheon. Then create a Multidev environment for the branch:

<div class="alert alert-danger" role="alert">
<h4>Warning</h4>
Multidev branch names must be all lowercase and less than 11 characters.</div>

1. From your Site Dashboard, select **Multidev**.  
2. Click **Git Branches**, and select **Create Environment** next to the branch name.

## Access a Branch Environment

From the Dashboard, click **Multidev**, then select the name of the environment.

Git instructions are shown in the Connection Mode of the code page. Each environment will have its own independent connection info and URL.

## Clone Content

1. Select the environment you want to clone content (files and database) into.
2. Click **Workflow**.
3. Select the source environment from the  **Clone from the <name> Environment** drop-down.
4. Select Database, Files, or both.
5. Choose whether to execute update.php after cloning, and click **Clone**.

## Edit Code

1. Edit your content locally via [Git](/docs/articles/local/starting-with-git/) or utilize on-server development via [SFTP](/docs/articles/sites/code/developing-directly-with-sftp-mode/) mode.
2. Within the Pantheon Dashboard, click **Code**.
3. Type in a commit message for edits made via SFTP and click the **Commit** button. Commits pushed via Git are shown in the Commit Log.

## Merge Code

1. Select the environment that you want to merge into. For example, if you want to merge your work into master on Dev, click the Dev tab. Otherwise, select the branch environment.
2. Click **Merge**.
3. Select the environment with commits that can be merged into the target.  
Instructions for using the command-line to merge the changes into the target are shown and can be pasted directly into the terminal without modification.

## Delete a Branch Environment

Go to **Multidev** > **Multidev Environments**, and click **Delete Environment**.

When an environment is deleted, the branch will remain and needs to be removed manually.

## Delete a Branch

A branch with no environment associated with it can be deleted by going to Multidev > Git Branches and clicking **Delete Git Branch**.

Branches can be deleted locally and the commit can be pushed to Pantheon, but this may have unintended consequences if an environment is associated with it; use the interface instead.​

## Rename a Branch
There is an 11-character limit for branch names. If you push a branch to Pantheon that exceeds the character limit, it cannot become a Multidev environment. The solution is to rename the branch. This is only recommended if you don't have any other users working on this branch, or if you have already coordinated with them.

From the command line, rename the branch:

```bash
git branch -m old-branch-name new-name
```

Next, push the renamed branch:

```bash
git push origin new-name
```

This will create a new branch with the commit history intact. From the Multidev overview, click on Git Branches and delete the original branch. You will now be able to create an environment associated with the renamed Git branch.


## Frequently Asked Questions (FAQs)

#### How can I get Multidev and how much is does it cost?

If you have a Business or Elite plan for your site, you already have access to Multidev. Multidev is included at no additional charge for these plans. It is not available as an add-on to other plans. If your project requires Multidev and you have questions, please use the contact form from the Multidev tab in your Dashboard.

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

The limit on forked environments is 5 for Business and 10 for Elite.

#### Can I associate a domain with a branch environment?

At this time, custom domains cannot be associated with branch environments.

#### What Git clients are supported?

You can use any Git client with Multidev. Use of the command-line Git client is recommended for compatibility with Dashboard instructions.

#### Does Multidev support remote repositories, such as Github?

At this time, Multidev on Pantheon will only work with the Pantheon hosted code repository. You can use remote repositories with your workflow, but Multidev on Pantheon will only recognize changes pushed to Pantheon.

#### Is there a public API available for post-commit hooks or other integrations with external project management systems?

Not at this time, but it is on the development roadmap.

#### Can I backup and restore a branch environment?

Yes, you can backup and restore a branch environment. However, if you restore an old version of code in Dev, you may damage forked environments.
