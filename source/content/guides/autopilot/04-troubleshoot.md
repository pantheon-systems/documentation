---
title: Pantheon Autopilot
subtitle: Troubleshoot Autopilot Error Messages
description: "Diagnose and remedy some common Autopilot errors."
categories: [automate]
tags: [autopilot, troubleshoot, webops]
type: guide
layout: guide
showtoc: true
anchorid: troubleshoot-autopilot
permalink: docs/guides/autopilot/troubleshoot-autopilot/
editpath: autopilot/04-troubleshoot.md
reviewed: "2021-07-30"
---

This page is a consolidated list of common issues and solutions you may encounter when using Autopilot.

## Element Exclusions

> **Error Message:** We didn’t detect any plugins, modules or themes that were eligible for exclusion.

### Issue

If the Autopilot plan is started for the first time or the slow converge feature is used, the extensions list used for exclusions should be refreshed. Since the plan is only set after Autopilot is initialized, the list is unavailable when Autopilot is started for the first time.

### Solution

The workflow to refresh extensions can then be triggered from the GraphQL Playground with the following code change:

```graphql
mutation {
  refreshAvailableExtensions(
    args: { id: "SITE_UUID"}
  ) {
    id
    description
  }
}
```

After that workflow completes, refresh the Autopilot settings or restart the initialization wizard. The extension options should be present.

## Drush Version

> **Error Message:** Drush version 8 required

### Issue

Autopilot only works on Drupal sites that are running Drush 8. Drush 5/7/9/10 are not supported. This limitation does not apply to sites that are Composer-managed. Composer-managed sites should use Drush 10 and will not display the Drush version error. Currently, Autopilot only supports Integrated Composer; build tools sites cannot be updated.

### Solution

Switch to Drush 8 in the `pantheon.yml` file.

## Modified Plugin or Theme Name

> **Error Message:** Ran into an issue with a WordPress update and did not proceed with deployment.

### Issue

The error message is displayed when a plugin is renamed or WordPress updates a plugin or theme, and the URL for the corresponding plugin or theme cannot be found. The discrepency between the plugin name and the URL disables the plugin, and deployment can not continue.

#### Diagnosis

To determine which plugin is causing the issue:

Check the uncommitted changes for Autopilot Multidev. It is likely a plugin has been deleted and another plugin has been added. 

Compare the list of plugins for Autopilot and Dev to the Wordpress plugin list and determine if there are any discrepancies. Ensure no entries are missing. If there is variance among the lists - a plugin is omitted or not updated on one of the lists, the plugin will be disabled on the Autopilot branch.

You should contact an Autopilot engineer to check the state machine logs, which requires AWS access.

### Solution

Remove the plugin or theme from the site if it is not being used. Revert the plugin or theme to the original name and correct the URL.

Alternatively, you can add the plugin or theme to the **Excluded Updates** list in Autopilot settings.
