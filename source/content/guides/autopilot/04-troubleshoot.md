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

You may encounter errors when using Autopilot. This page has a consolidated list of common issues and solutions you may encounter with Autopilot.


## “We didn’t detect any plugins, modules or themes that were eligible for exclusion.”
 

### Issue

The extensions list used for Exclusions should be refreshed when the Autopilot plan is set for the first time and on slow-converge after, but since the plan is only set after Autopilot is initialized, the list is unavailable the first time Autopilot is setup.

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

After that workflow is completes, refresh the Autopilot settings or restart the initialization wizard. The extension options should be present.


## "Drush version 8 required" 

 
### Issue

Autopilot only works on Drupal sites that are running Drush 8. Drush 5/7/9/10 are not supported.

### Solution

Switch to Drush 8 in the `pantheon.yml` file. 



## “The site has reached its limit for Multidev Environments” is reported, but the site is the below limit.


### Issue

Autopilot reports this “limit of Out of Multidevs” error message for instance of creating or converging the Autopilot environment.


### Solution
Investigate the **Workflows** tab to see the reason for the converge failure:

https://admin.dashboard.pantheon.io/sites/{SITE_UUID}#debug/workflows

The workflow logs will have useful information on what is causing the erros.


Often, deleting and creating the environment from scratch can reset the environment to a healthier state. Delete the Autopilot Multidev and associated branch from the site, and enqueue Autopilot. The Autopilot workflow will recreate the Multidev environment, providing the site is below its multidev limit.


## “We ran into an issue with a WordPress update and did not proceed with deployment. This is likely caused by a modified plugin name.”


### Issue

When WordPress updates a plugin or theme, and then a plugin/theme by that slug cannot be found— usually caused by a plugin being renamed. Because this disables the plugin, we cannot continue to deployment.

#### Diagnosis

To determine which plugin is causing the issue:

Check the uncommitted diff on autopilot multidev. There is likely a plugin deleted and another added (i.e. akismet-disable version 2.2 no longer exists, but akismet 2.3 now does).

Compare the list of plugins between autopilot and dev with wp plugin list and see if there is one that is missing/has changed (it will be disabled on the autopilot branch).

Ping an autopilot engineer to check the state machine logs (requires AWS access).

### Resolution

Remove the plugin/theme from the site if it is not being used

rename the plugin/theme back to the original, correct slug if it is in use

OR add it to the Excluded Updates in Autopilot settings.

