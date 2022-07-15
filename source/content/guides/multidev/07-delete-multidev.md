---
title: Multidev
subtitle: Delete Multidev Environments and Branches
description: Learn how to delete environments and branches in Multidev.
categories: [develop]
tags: [cms, logs]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/multidev/delete-multidev
anchorid: delete-multidev
---

## Delete a Branch Environment

Go to **Multidev** > **Multidev Environments**, and click **Delete Environment**.

When an environment is deleted, the branch will remain and needs to be removed manually.

## Delete a Branch

A branch with no environment associated with it can be deleted by going to Multidev > Git Branches and clicking **Delete Git Branch**.

Branches can be deleted locally and the commit can be pushed to Pantheon, but this may have unintended consequences if an environment is associated with it; use the interface instead.

## Rename a Branch

Branch names must be lowercase and no more than 11 characters. If you push a branch to Pantheon that exceeds the character limit or has uppercase letters, it cannot become a Multidev environment. The solution is to rename the branch. This is only recommended if you don't have any other users working on this branch, or if you have already coordinated with them.

From the command line, rename the branch:

```bash{promptUser: user}
git branch -m old-branch-name new-name
```

Next, push the renamed branch:

```bash{promptUser: user}
git push origin new-name
```

This will create a new branch with the commit history intact. From the Multidev Environments page, click **Git Branches** and delete the original branch. You will now be able to create an environment associated with the renamed Git branch.

## Troubleshooting and FAQs

For answers to the most frequently asked questions about Multidev, see our [Frequently Asked Questions](/guides/multidev/multidev-faq).
