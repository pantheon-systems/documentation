---
title: Drupal Backend Starter for Front-End Sites
subtitle: Configure Build Hooks
description: Learn how to configure Build Hooks.
tags: [webops, workflow, decoupled]
contributors: [backlineint, cobypear, hckia]
layout: guide
showtoc: true
permalink: docs/guides/decoupled/drupal-backend-starters/build-hooks
anchorid: build-hooks
contenttype: [guide]
innav: [false]
categories: [create]
cms: [decoupled]
audience: [development]
product: [decoupled]
integration: [--]
---

This section provides information on how to configure build hooks on your backend.

## What Are Build Hooks?

The [Build Hooks](https://www.drupal.org/project/build_hooks) module triggers builds in one or more Front-End Sites when content changes occur, such as creating, updating, or deleting.

Refer to the Front-End Sites Overview guide for instructions on how to [create and manage Build Hooks in the Pantheon dashboard](/guides/decoupled/overview/build-hooks).

## Install the Build Hooks Module

The Build Hooks module is already included as a Composer dependency if you are using the [Decoupled Drupal Composer Managed](https://github.com/pantheon-upstreams/drupal-composer-managed) starter template. For other projects:

1. Run the following command to add the module as a dependency:

      ```bash{promptUser: user}
      composer require 'drupal/build_hooks:^3.3'
      ```

1. Install the dependency. This can be done either through the Drupal admin dashboard or using [drush pm-enable](https://drushcommands.com/drush-9x/pm/pm:enable/).

## Set Up a Build Hook

### Trigger a Deployment Automatically When Content Changes

1. Generate a Build Hook on your build platform.

1. Select **Configuration**, select, **Build hooks**, and then select **Frontend environment**.

1. Click the **Add Frontend environment** button.

1. Fill out the form with the required information including **Label**, **URL**, **Deployment strategy** (for this use-case, select **When content is updated**), **Weight**, and **Build hook URL**.

1. Save the form.

This will automatically trigger your build hook when content changes.

<Alert title="Note"  type="info" >

By default the module will only log changes for content entities. If you would like to trigger build hooks based on other entity updates, go to
**Administration**, select **Configuration**, select **Build hooks**, and then select **Build Hooks Settings** to configure other entities.

</Alert>

### Trigger a Deployment Manually

You can create a build hook that can only be triggered manually. This can be useful if you want more control over the deployment or if you prefer to batch multiple content changes into a single deployment.

1. Generate a Build Hook on your build platform.

1. Select **Configuration**, select, **Build hooks**, and then select **Frontend environment**.

1. Click the **Add Frontend environment** button.

1. Fill out the form with the required information, including **Label**, **URL**, **Deployment strategy** (for this use-case, select **Manually only**), **Weight**, and **Build hook URL**.

1. Save the form.

1. Create or update content and then go to
   `admin/build_hooks/deployments/<BUILD_HOOK_MACHINE_NAME>`

1. Click **Start a new deployment to the <BUILD_HOOK_NAME> environment**. This triggers the build hook on the Front-End Site.

<Alert title="Note"  type="info" >

The deployment strategy can also be set to Cron Job. This triggers the
build hook automatically at a specified interval if Cron is configured on your site.

</Alert>
