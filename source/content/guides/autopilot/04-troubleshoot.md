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
reviewed: "2021-06-10"
---

## Troubleshoot Common Autopilot Error Messages




## Exclusions reports “We didn’t detect any plugins, modules or themes that were eligible for exclusion.”
 

### Issue

The extensions list used for Exclusions should be refreshed when the Autopilot plan is set for the first time and on slow-converge after, but since the plan is only set after Autopilot is initialized, the list is unavailable the first time Autopilot is setup.

### Resolution

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

Once that workflow is complete (it should be fairly quick, and can be monitored in the debug tab of the Hermes dashboard), refresh the Autopilot Settings (or restart the initialization step wizard) and extension options should be present.


## Drush version 8 required 

 
### Issue

(Drush 5/7/9/10 is  not supported) Autopilot only works on Drupal site running Drush 8. If/when we complete the bug card, we might be able to silently/automatically handle the majority of sites running Drush 5/7 without impacting the application

### Workaround

Switch to Drush 8 in `pantheon.yml`. 

“The site has reached its limit for Multidev Environments.” is reported, but site is below limit


 
### Issue

Autopilot reports this “Out of Multidevs” for any issue with creating or converging the autopilot Environment.


#### Diagnosis

Investigate the “Workflows” debug tab to see the reason for the converge failure:

https://admin.dashboard.pantheon.io/sites/{SITE_UUID}#debug/workflows

These logs will likely have more useful information re: the failure than anything Autopilot has in AWS State Machines or Lambda logs.

### Workaround

Deleting and creating the environment from scratch can often reset the environment back to a healthier state. Delete the autopilot multidev and associated branch from the site, and enqueue Autopilot again. The Autopilot workflow will re-create the multidev when it is time, assuming the site is below its multidev limit.

“We ran into an issue with a WordPress update and did not proceed with deployment. This is likely caused by a modified plugin name.”


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

