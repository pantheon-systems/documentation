---
title: Roll Back the Live Environment
description: Use Git to revert changes you've deployed to the Live environment.
categories: [developing]
tags: [code, local, dashboard]
keywords: git, git commands, revert, roll back
---
If you've committed code to your Live environment, and now need to roll back the changes, you can use Git commands to revert your changes.

### Revert the Last Commit on Pantheon That Has Been Deployed

It is important to test changes before deploying them to Test or Live. This technique will reverse the last commit and leave the history.
```nohighlight
git revert HEAD --no-edit
git push origin master
```
### Revert a Commit That Has Been Deployed to Pantheon

This one is a bit trickier, but you can do it. This will selectively undo a particular commit and leave the history.

First, determine what commit you want to undo.

```nohighlight
# List last 10 git commits
git log --pretty=oneline -10
```
This will give you a list of commit IDs and the commit message. For example:

```nohighlight
c24030f49d9e330324228f47c2b6c8b06f00eeb1 ctools
a44306655691d281e852d84fe45a80f7026984cd Views
ee24ab75e44239102bd0e72da8fb3b423168b4c5 Devel
b02d4de85147a98d155e6ece9b044ab5ec529881 Generate Errors
55eae780dd2bcfdce9a39c077b8b294b174c1556 Solr
79d21b2837cbfc78cbe32f35c058818c796a9187 Initial Commit
...
```
The format of the command to reverse a specific change is:

```bash
git revert COMMITID --no-edit
```
As an example, to get rid of the commit that included Devel, just grab the commit ID of the Devel commit and use it in the revert command.
```bash
git revert ee24ab75e44239102bd0e72da8fb3b423168b4c5 --no-edit
```
Then push the change to Pantheon.

```bash
git push origin master
```

## See Also
[Undo Git Commits](/docs/undo-commits)  
[Git FAQs](/docs/git-faq)
