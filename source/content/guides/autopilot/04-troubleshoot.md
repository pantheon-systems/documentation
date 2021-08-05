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

This page is a list of common issues and solutions that you may encounter when using Autopilot.

## Error: Element Exclusions

> We didn’t detect any plugins, modules or themes that were eligible for exclusion.

### Issue

The list of elements is unavailable when Autopilot is started for the first time; it is only set after Autopilot is initialized.

Refresh the extensions list used for exclusions, when Autopilot is started for the first time.

### Solution

Trigger a workflow to refresh extensions with the following code change:

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

## Error: Drush Version

> Drush version 8 required

### Issue

Autopilot only works on Drupal sites that are running Drush 8. Drush 5, 7, and 9 are not supported.

Composer-managed sites should use Drush 10 and will not display the Drush version error. Currently, Autopilot only supports Integrated Composer; Build Tools sites cannot be updated.

### Solution

Switch to Drush 8 in the `pantheon.yml` file.

## Error: Modified Plugin or Theme Name

> Ran into an issue with a WordPress update and did not proceed with deployment.

### Issue

The error message is displayed when a plugin is renamed or WordPress updates a plugin or theme and the URL for the corresponding plugin or theme cannot be found. The discrepency between the plugin name and the URL disables the plugin, and the Autopilot deployment can not continue.

### Diagnosis

To determine which plugin is causing the issue:

1. Check the uncommitted changes for Autopilot Multidev. It is likely a plugin has been deleted and another plugin has been added.

1. Compare the list of plugins for Autopilot and Dev to the WordPress plugin list and determine if there are any discrepancies. Ensure no entries are missing. If there is variance among the lists, such as a plugin that has been omitted or not updated on one of the lists, the plugin will be disabled on the Autopilot branch.

Contact support for help. 

### Solution

Remove the plugin or theme from the site if it is not being used. Revert the plugin or theme to the original name and correct the URL.

Alternatively, you can add the plugin or theme to the **Excluded Updates** list in Autopilot settings.
