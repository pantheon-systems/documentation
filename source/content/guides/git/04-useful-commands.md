---
title: Useful Git Commands
subtitle: Useful Git Commands
description: Review a list of useful commands to help you get started with Git on Pantheon.
contributors:  [whitneymeredith]
tags: [code, git, local, webops, workflow]
layout: guide
showtoc: true
permalink: docs/guides/git/useful-commands
anchorid: useful-commands
categories: [git]
newcms: [drupal, wordpress]
audience: [development]
product: [--]
integration: [git]
---

This section contains useful commands to help you get started with Git on Pantheon.

## Work with Remote Changes

### Fetch

The `fetch` command retrieves changes from your remote and adds them to your local. Replace `$branch-name` with the name of your branch in the example below.

```bash{promptUser: user}
git fetch origin $branch-name
```

### Pull

The `pull` command retrieves changes from your remote and adds them to a local branch that contains changes that have not been committed to the remote yet. Replace `$branch-name` with the name of your branch in the example below.

```bash{promptUser: user}
 git pull --rebase origin $branch-name
 ```

## Common Commands

### Set Upstream to Origin

Try setting your upstream to origin if `git pull` doesn't bring you origin/main the way you expect:

```bash{promptUser: user}
git branch --set-upstream-to=origin/main main
```

### Push from a Local Branch to a Remote Branch with a Different Name

Replace `$branch-name` with the name of your branch in the example below.

```bash{promptUser: user}
git push origin $local-branch-name:$remote-branch-name
```

### Main Branch Has Diverged from Origin

The commands below will overwrite all files in the local branch with the most recent files in the main branch.  Any local changes will be overwritten. This can be useful when your local files don’t match the files in the main branch.

```bash{promptUser: user}
git fetch origin
git reset --hard origin/main
```

### Checkout a Specific File From Another Branch

You can check out a specific file from a local or remote branch. This is useful if you get stuck during a rebase or just want the file as it appears in another branch.

Run the command below, changing `origin/$BRANCH` and ``file-name.md` in the example as needed:

```bash{promptUser: user}
git checkout origin/$BRANCH -- source/content/file-name.md
```

## More Resources

- [Git Documentation](https://git-scm.com/doc)

- [Git Cheat Sheet](https://github.com/AlexZeitler/gitcheatsheet/blob/master/gitcheatsheet.pdf)

- [Using Git with SFTP & WordPress](/guides/wordpress-git/)

- [Git FAQs](/guides/git/faq-git)

- [Undo Git Commits](/guides/git/undo-commits)
