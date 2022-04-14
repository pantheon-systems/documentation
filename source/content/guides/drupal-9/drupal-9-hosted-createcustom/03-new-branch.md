---
title: Migrate a Site That Was Created with a Custom Upstream to Drupal 9
subtitle: Create a New Branch with Integrated Composer Code
description: 
categories: [develop]
tags: [code, launch, migrate, site, updates]
contributors: [wordsmither]
reviewed: "2021-03-31"
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-hosted-createcustom/new-branch
anchorid: new-branch
editpath: drupal-9/drupal-9-hosted-createcustom/03-new-branch.md
---
1. Create a local clone of the Custom Upstream repository using the SSH URL, and `cd` into the cloned repository:

  ```bash{promptUser:user}
  git clone $SSH_URL
  cd $REPOSITORY_NAME
  ```

1. Add the Integrated Composer upstream as a second remote and fetch:

  ```bash{promptUser:user}
  git remote add ic https://github.com/pantheon-upstreams/drupal-project.git && git fetch ic
  ```

1. Create a new `composerify` branch to work in:

   ```bash{promptUser:user}
   git checkout -b composerify
   ```

1. On the `composerify` branch, use Git to remove all the files in the directory and commit the change. We do this because you're going to completely replace the file structure and re-add customizations:

   ```bash{promptUser:user}
    git rm -rf * && git commit -m "Removing all files"
    ```

1. Add and commit files from the Integrated Composer upstream:

   ```bash{promptUser:user}
   git checkout ic/master .
   git add $FILE_NAME
   git commit -m "Add and commit Integrated Composer files"
   ```

1. Navigate to `upstream-configuration/composer.json` in your text editor and change the `drupal/core-recommended` version to only Drupal 8:

  ```json:title=upstream-configuration/composer.json
  "drupal/core-recommended": "^8.8"
  ```

1. Commit the change:

  ```bash{promptUser:user}
  git commit -am "Setting Drupal core version to ^8.8"
  ```