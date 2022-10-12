---
title: Migrate a Site That Was Created Using a Deprecated Upstream to Drupal 9
subtitle: Troubleshooting
description: Troubleshoot common issues when migrating.
cms: "Drupal 9"
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
reviewed: "2021-03-31"
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-hosted-deprecated-upstream/troubleshooting
anchorid: troubleshooting
editpath: drupal-9/drupal-9-hosted-deprecated-upstream/11-troubleshooting.md
---

This page covers common troubleshooting scenarios when migrating a Drupal site to [Drupal with Composer Upstream](/guides/integrated-composer#get-started-with-integrated-composer).

## Merge Conflicts When Applying Upstream Updates

Conflicts can occur when a modified file in your site's codebase does not align with changes made to the same file in the site's upstream.

> When a merge isn’t resolved automatically, Git leaves the index and the working tree in a state that provides the information you need to resolve the merge.
>
> \- [Git Manual](https://www.kernel.org/pub/software/scm/git/docs/)

If you receive an error that you have conflicts while updating, resolve using the `-Xtheirs` flag. This will automatically resolve the conflict with a preference for upstream changes.

This is safe to run if you don't have your own changes in any of the conflicting files, such as problems with `.gitignore`.

```bash{promptUser: user}
git pull -Xtheirs https://github.com/pantheon-upstreams/drupal-composer-managed.git master
# resolve conflicts
git push origin master
```

Check that the files are correct before going forward to ensure no bugs are introduced.

If you modified upstream files, the `-Xtheirs` flag will drop your changes. You can [manually resolve conflicts](/guides/git/resolve-merge-conflicts#manually-resolve-conflicts) to fix this issue.

You will be in the Drupal with Composer upstream after you apply the upstream updates.

## More Resources

- [Resolve Git Merge Conflicts](/guides/git/resolve-merge-conflicts)
