---
title: Switch from Drupal 9 to Drupal with Composer Upstream
description: Switch to the new Pantheon upstream to take advantage of the new structure and future updates.
type: guide
permalink: docs/guides/:basename
cms: "Drupal"
categories: [develop]
tags: [composer, site, workflow]
contributors: [kporras07]
reviewed: "2022-04-03"
---

In this guide, we will convert an existing site from the Drupal 9 (`drupal9`) upstream to the new Drupal with Composer (`drupal-recommended`) upstream.

## Overview

Drupal 9 sites created in the platform prior to November 30, 2021 use the [Drupal 9](https://github.com/pantheon-upstreams/drupal-project) upstream. Based on some needs we detected from the community, we released a new upstream with a slightly different structure. The [Drupal with Composer](https://github.com/pantheon-upstreams/drupal-recommended) is now the default Drupal 9 upstream in the platform and users are encouraged to switch to it to take advantage of the improved structure and future updates.

The goals of this conversion are:

1. Set the site to use the new upstream
1. Apply the upstream changes
1. Resolve any merge conflicts that may appear during this process.

## Will This Guide Work for Your Site?

You must confirm that your site meets the following requirements before you continue:

- Ensure your site uses the [Drupal 9](https://github.com/pantheon-upstreams/drupal-project) upstream.

### Use Terminus to Confirm the drupal9 Upstream

Run the command `terminus site:info $SITE` to display the site's basic information and properties.

 The following values indicate that a site is using a `drupal9` upstream:
  * The `Framework` is `drupal8`
  * The `Upstream` includes `https://github.com/pantheon-upstreams/drupal-project`

  The following is an abridged example of the output for the `terminus site:info $SITE` command, if the site upstream is set to `drupal9`:

  ```bash{outputLines:2-18}
  terminus site:info $SITE
  ------------------ -------------------------------------------------------------------------------------
  ID                 abdc3ea1-fe0b-1234-9c9f-3cxeAA123f88
  Name               anita-drupal
  Label              AnitaDrupal
  Created            2019-12-02 18:28:14
  Framework          drupal8
  ...
  Upstream           e96c6794-77fe-4931-9a20-48a2fe1a3789: https://github.com/pantheon-upstreams/drupal-project
  ...
  ------------------ -------------------------------------------------------------------------------------
  ```

## Before You Begin

- This guide requires [User in Charge](/change-management#site-level-roles-and-permissions) permissions to set the upstream.

## Prepare the Local Environment

<Partial file="drupal-9/prepare-local-environment-no-clone.md" />

## Apply All Available Upstream Updates

<Partial file="drupal-apply-upstream-updates.md" />

## Switch to Drupal with Composer Upstream

Change the upstream your site is tracking with the following command:

```bash{promptUser:user}
terminus site:upstream:set $SITE drupal-recommended
```

Following the `drupal-recommended` upstream will help keep your site current with any general configuration changes recommended by Pantheon.

Note that only the [User in Charge](/change-management#site-level-roles-and-permissions) can set the upstream.

## Apply New Upstream Updates

After you complete the upstream change, you need to apply the available upstream updates. Try to do this from the Pantheon Dashboard in the Dev environment. If this is not successful, continue to the next section about merge conflicts.

### Solving Merge Conflicts When Applying Upstream Updates

Conflicts can occur when a modified file within your site's codebase does not align with changes made to the same file in the site's upstream.

> When a merge isn’t resolved automatically, Git leaves the index and the working tree in a special state that gives you all the information you need to resolve the merge.
>
> \- [Git Manual](https://www.kernel.org/pub/software/scm/git/docs/)

If you receive the error that you have conflicts while updating core, the fastest resolution is often the `-Xtheirs` flag. This will attempt to automatically resolve the conflict with a preference for upstream changes.

This is safe to run if you don't have your own changes in any of the conflicting files (e.g. problems with `.gitignore`).

```bash{promptUser: user}
git pull -Xtheirs https://github.compantheon-upstreams/drupal-recommended.git master
# resolve conflicts
git push origin master
```

Double-check the files before going forward to make sure no bugs were introduced.

If you modified upstream files, the `-Xtheirs` flag will drop your changes. You should [manually resolve conflicts](/git-resolve-merge-conflicts#manually-resolve-conflicts) to fix this issue.


After you apply the upstream updates, either using the Dashboard or after solving merge conflicts, you are will be in the Drupal with Composer upstream.

## See Also

- [Composer Fundamentals and Workflows](/composer)
- [Resolve Git Merge Conflicts](/git-resolve-merge-conflicts)
