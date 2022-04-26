---
title: Migrate a Drupal 9 Site from Another Platform
subtitle: Prepare
description:
cms: "Drupal 9"
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
reviewed: "2021-03-31"
layout: guide
permalink: docs/guides/drupal-9-unhosted/prepare
anchorid: 
editpath: drupal-9/drupal-9-unhosted/03-prepare.md
---

<Partial file="drupal-9/prepare-local-environment-no-clone-no-alias.md" />

2. Get a local copy of both your new Pantheon site and your existing codebase.

3. This doc uses several commands that depend on the locations of both your existing and new site codebases. To simplify this, set the temporary variables `$SOURCE` and `$DESTINATION` in your terminal session to match your folders location.

   ```bash
   export SOURCE=/absolute/path/to/source/site/codebase
   export DESTINATION=/absolute/path/to/codebase/cloned/from/pantheon
   ```
4. Ensure the trusted host setting is up-to-date. Refer to the [Trusted Host Setting](/settings-php#trusted-host-setting) documentation for more information.

5. Set the dev environment site mode to Git to be able to perform Git operations on this environment.

6. Clone your site to your local environment using the `git clone` command from the dashboard.

