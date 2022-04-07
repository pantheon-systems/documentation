---
title: Migrate a Drupal 9 Site from Another Platform to Drupal 9
subtitle: Prepare
description: Learn how to migrate a Drupal 8 Site to Drupal 9
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
reviewed: "2021-03-31"
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-v9-not-hosted/prepare
anchorid: 
editpath: drupal-9-v9-not-hosted/03-prepare.md
---

<Partial file="drupal-9/prepare-local-environment-no-clone-no-alias.md" />

2. Get a local copy of both your new Pantheon site and your existing codebase.

1. This doc uses several commands that depend on the locations of both your existing and new site codebases. To simplify this, set the temporary variables `$SOURCE` and `$DESTINATION` in your terminal session to match your folders location.

   ```bash
   export SOURCE=/absolute/path/to/source/site/codebase
   export DESTINATION=/absolute/path/to/codebase/cloned/from/pantheon
   ```