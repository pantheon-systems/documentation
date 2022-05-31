---
title: Migrate a Composer Managed Drupal 9 Site from Another Platform
subtitle: Prepare
description: 
cms: "Drupal 9"
categories: [develop]
tags: [code, launch, migrate, site, updates, composer]
contributors: [wordsmither]
layout: guide
showtoc: true
permalink: docs/guides/drupal-9-unhosted-composer/prepare
anchorid: prepare
editpath: drupal-9/drupal-9-unhosted-composer/03-prepare.md
reviewed: "2021-05-09"
---

Complete all steps in this section to ensure that your site is ready to be migrated to Pantheon.

## Create a New Drupal 9 Site

1. Log in to your Pantheon account. If you don't have an account, [create one](https://pantheon.io/register?docs) and familiarize yourself with the [User Dashboard](/guides/quickstart/user-dashboard) before you create a new site.

1. Set up [SSH Keys](/ssh-keys) on your local computer and Pantheon account.

1. Navigate to your User Dashboard, then click <Icon icon={"more-windows"} text={"Sites:"}/> **Create New Site**.

1. Click **Visit your Pantheon Site Dashboard**.

## Prepare the Local Environment

<Partial file="drupal-9/prepare-local-environment-no-clone.md" />

1. Create a new folder to use while working on the migration. This folder will contain two subdirectories that you'll create in the next sections, one for the site on the former platform, and one for the Pantheon site.

### Create a Local Copy of the Old Site's Code

1. Obtain a local copy of your old site's code.

  Your code includes all custom and contributed modules or plugins, themes, and libraries. The codebase should not include the `sites/default/files` directory, or any other static assets you do not want tracked by version control.

1. Export the database and media files (`sites/default/files`) from the old platform, but do not add them or upload any files to Pantheon.

### Retrieve a Local Copy of the Pantheon Site's Code

1. Navigate to the Site Dashboard and click the **<span class="fa fa-wrench"></span> Dev** environment.

1. Set the site's **Development Mode** to Git:

  ![Git connection mode](../../../../images/dashboard/connection-mode-git.png)

1. Copy the `git clone` command for the site repository.

  The command should look similar to the following:

  ```shell{promptUser:user}
  git clone ssh://codeserver.dev.{site-id}@codeserver.dev.{site-id}.drush.in:2222/~/repository.git
  ```

1. Run the `git clone` command in the working folder.
