---
title: Switch from Drupal 9 to Drupal Composer Managed Upstream
description: Switch to the new Pantheon upstream to take advantage of the new structure and future updates.
type: guide
permalink: docs/guides/:basename
cms: "Drupal"
contenttype: [doc]
categories: [migrate]
newcms: [drupal9]
audience: [development]
product: [--]
integration: [--]
tags: [composer, site, workflow]
contributors: [kporras07, jspellman814]
reviewed: "2022-04-22"
---

In this guide, we will convert an existing site from the Drupal 9 (`drupal9`) upstream to the new Drupal Composer Managed (`drupal-composer-managed`) upstream.

## Overview

Drupal 9 sites created on the platform prior to November 30, 2021 use the [Drupal 9](https://github.com/pantheon-upstreams/drupal-project) upstream. Drupal 9 sites created on the platform prior to May 4, 2021 use the [Drupal Recommended](https://github.com/pantheon-upstreams/drupal-recommended) upstream.

Based on community needs, we have released a new upstream. [Drupal Composer Managed](https://github.com/pantheon-upstreams/drupal-composer-managed) is now the default Drupal 9 upstream on the platform and users are encouraged to switch to it to take advantage of the improved structure and updates.

The goals of this conversion doc include the following:

* Configure the site to use the new upstream.
* Apply the upstream changes.
* Resolve any merge conflicts that might arise during the conversion process.

## Will This Guide Work for Your Site?

You must confirm that your site meets the following requirement before you continue:

- Ensure your site uses the [Drupal 9](https://github.com/pantheon-upstreams/drupal-project) or [Drupal Recommended](https://github.com/pantheon-upstreams/drupal-recommended) upstream.

### Use Terminus to Confirm the Drupal 9 Upstream

Run the command `terminus site:info $SITE` to display the site's basic information and properties.

 The following values indicate that a site is using a `drupal9` upstream:
  * The `Framework` is `drupal8`
  * The `Upstream` includes `https://github.com/pantheon-upstreams/drupal-project` or `https://github.com/pantheon-upstreams/drupal-recommended`

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

## Prepare the Local Environment

<Partial file="drupal-9/prepare-local-environment-no-clone.md" />

## Apply All Available Upstream Updates

<Partial file="drupal-apply-upstream-updates.md" />

## Switch to Drupal with Composer Upstream

Change the upstream that your site is tracking with the following command:

```bash{promptUser:user}
terminus site:upstream:set $SITE drupal-composer-managed
```

Follow the `drupal-composer-managed` upstream to keep your site current with any general configuration changes recommended by Pantheon.

## Apply New Upstream Updates

After you complete the upstream change, you need to apply the available upstream updates. Use the Pantheon Dashboard in the Dev environment to apply updates. If this is not successful, continue to the next section for help resolving with merge conflicts.

### Solving Merge Conflicts When Applying Upstream Updates

Conflicts can occur when a modified file in your site's codebase does not align with changes made to the same file in the site's upstream.

If you receive an error that you have conflicts while updating upstream files, resolve using the `-Xtheirs` flag. This will automatically resolve the conflict with a preference for upstream changes. Alternatively, you can choose to [manually resolve conflicts](/guides/git/resolve-merge-conflicts#manually-resolve-conflicts) to fix this issue.

This is safe to run if you don't have your own changes in any of the conflicting files, such as problems with `.gitignore`.

```bash{promptUser: user}
git pull -Xtheirs https://github.com/pantheon-upstreams/drupal-composer-managed.git main
# resolve conflicts
git push origin master
```

Check that the files are correct before going forward to ensure no bugs are introduced.

You will be in the Drupal with Composer upstream after you apply the upstream updates.

## More Resources

- [Composer Fundamentals and Workflows](/guides/composer)
- [Resolve Git Merge Conflicts](/guides/git/resolve-merge-conflicts)
