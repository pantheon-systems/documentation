---
title: Pantheon Autopilot
subtitle: Autopilot Errors
description: Troubleshoot Common Autopilot Errors
categories: [automate]
tags: [iterate, autopilot, troubleshoot, webops]
type: guide
layout: guide
showtoc: true
anchorid: troubleshoot-autopilot
permalink: docs/guides/autopilot/troubleshoot-autopilot/
editpath: autopilot/04-troubleshoot.md
reviewed: "2021-07-21"
---

# Troubleshoot Autopilot Error Messages

This page has a consolidated list of common issues and solutions you may encounter when using Autopilot.



## Element Exclusions 

Error Message: "We didn’t detect any plugins, modules or themes that were eligible for exclusion."
 

### Issue

The extensions list used for exclusions should be refreshed when the Autopilot plan is initialized for the first time or when using the slow converge feature. Since the plan is only set after Autopilot is initialized, the list is unavailable when Autopilot is started for the first time. 

### Solution

The workflow to refresh extensions can then be triggered from the GraphQL Playground with the following mutation:

```
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



##  Drush Version

Error Message: "Drush version 8 required" 

 
### Issue

Autopilot only works on Drupal sites that are running Drush 8. Drush 5/7/9/10 are not supported.

### Solution

Switch to Drush 8 in the `pantheon.yml` file. 




## Modified Plugin Name 

Error Message: “Ran into an issue with a WordPress update and did not proceed with deployment."


### Issue

When WordPress updates a plugin or theme, and then a plugin/theme by that slug cannot be found— usually caused by a plugin being renamed. Because this disables the plugin, we cannot continue to deployment.

#### Diagnosis

To determine which plugin is causing the issue:

Check the uncommitted changes for Autopilot Multidev. It is likely a plugin has been deleted and another plugin has been added. For example, `akismet-disable 2.2` no longer exists, but `akismet 2.3` is available.

Compare the list of plugins for Autopilot and Dev with the Wordpress plugin list and determine if anything varies. Ensure no entries are missing missing. If there is a discrepency among the lists, or a plugin is omitted or not updated on one of the lists, the plugin will be disabled on the Autopilot branch.

You should contact an Autopilot engineer to check the state machine logs, which requires AWS access.

### Solution

Remove the plugin/theme from the site if it is not being used. Revert the plugin/theme to it's original name and correct metedata if it is being used. 

Alternively, you can add the plugin/theme to the **Excluded Updates** list in Autopilot settings.

