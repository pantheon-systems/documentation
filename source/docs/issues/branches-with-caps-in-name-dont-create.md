---
title: Multidev Environment Creation Fails when Git Branch Names Contain Capital Letters
description: Users who create branches locally to push to their Pantheon site repository have reported that the Multidev overview's Git Branches without Associated Environment allows for an environment creation to be attempted. This process will stall and fail silently.
status:
---

## Workaround
1. Rename the current branch locally with `git branch -m <newname>` or if the branch is not checked out, `git branch -m <oldname> <newname>`.
2. Push to Pantheon `git push origin master`
3. Create the Multidev environment from the dashboard or with Terminus

## Why This Happens

## Prognosis

## More Information
 - 
