---
title: Migrate a Drupal 9 Site from Another Platform
subtitle: Prepare
description:
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

1. Get a local copy of both your new Pantheon site and your existing codebase.

2. This doc uses several commands that depend on the locations of both your existing and new site codebases. To simplify this, set the temporary variables `$SOURCE` and `$DESTINATION` in your terminal session to match your folders location.

   ```bash
   export SOURCE=/absolute/path/to/source/site/codebase
   export DESTINATION=/absolute/path/to/codebase/cloned/from/pantheon
   ```