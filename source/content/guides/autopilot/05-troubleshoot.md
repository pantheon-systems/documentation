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

This page helps troubleshoot common issues that you may encounter when using Autopilot.

## Re-run Autopilot

If you have already attempted to troubleshoot an error, or if you want to confirm that the error is consistent, try running Autopilot on the site again:

1. Autopilot will not allow updates to be queued until all errors have been reviewed and acknowledged.

  If there are errors that require attention, in the **Needs Review** section of the Autopilot screen, click **Review Test Results** next to the site you want to review, and **Approve** or **Discard** a test, or **Accept All Changes** before you run Autopilot again.

1. From the **Sites** list on the Autopilot screen, click **Actions** on the line that corresponds with the site, then **Manage Autopilot Settings**.

1. If there are new components that Autopilot should check for (like plugins, modules, or themes), on the **Autopilot Configuration** screen, click <em class="fa fa-refresh"></em> **Refresh Updates** to force Autopilot to check for new components.

1. To manually run Autopilot, click **Status** in Autopilot's side bar, then **Queue Updates** under <em class="fa fa-wrench"></em> **Available Updates**.

### Re-run Autopilot If Tests Have Already Passed

Manually start an update, or Autopilot will automatically schedule one in accordance with your site's update cadence.

To manually start an update, click **Actions** in the site's row on the Autopilot screen, and click **Start Applying Updates**.

### Re-run Autopilot If Tests Were Approved After Dev Changes

If a test that was waiting was approved after changing the Dev environment, Autopilot will periodically check to see if Dev has changed since Autopilot last ran.

## Autopilot is blocked

<Accordion title="Autopilot is blocked due to uncommitted SFTP code changes." id="uncommitted-sftp" icon="info-sign">

### Issue

Autopilot will fail if there are uncommitted SFTP code changes in the Dev environment.

### Diagnosis

If commits are pushed to Dev after the Autopilot Multidev is created, you run the risk of having a merge conflict when Autopilot is pushed back to Dev.

If Autopilot attempted to deploy, then either: tests have already passed; or the less likely event that a test that was waiting, was approved after changing the Dev environment.

### Solution

If you experience this error, it will likely be at the end of the flow, at which point you should [re-run Autopilot](#re-run-autopilot) with the latest changes to ensure all is covered in testing. Autopilot will also log an error, which can be found in the activity feed.

</Accordion>

## Autopilot Ran Into an Unexpected Error

<Accordion title="Autopilot ran into an unexpected error. Contact Support for assistance." id="unexpected-error" icon="info-sign">

Pantheon's Autopilot engineers investigate each of these errors as they occur. Please [contact Support](/support) via chat or ticket.

</Accordion>

## Drush Version

<Accordion title="Drush version 8 required." id="drush-8-required" icon="info-sign">

### Issue

Autopilot only works on Drupal sites that are running Drush 8. Drush 5, 7, and 9 are not supported.

Composer-managed sites should use Drush 10 and will not display the Drush version error. Currently, Autopilot only supports Integrated Composer; Build Tools sites cannot be updated.

### Solution

Switch to Drush 8 in the `pantheon.yml` file.

</Accordion>

## Element Exclusions

<Accordion title="We didn’t detect any plugins, modules or themes that were eligible for exclusion." id="no-eligible-available" icon="info-sign">

### Issue

The list of elements is unavailable when Autopilot is started for the first time; it is only set after Autopilot is initialized.

Refresh the extensions list used for exclusions when Autopilot is started for the first time.

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

After the workflow completes, refresh the Autopilot settings or restart the initialization wizard. The extension options should be present.

</Accordion>

## Modified Plugin or Theme Name

<Accordion title="Ran into an issue with a WordPress update and did not proceed with deployment." id="wp-update-issue" icon="info-sign">

### Issue

This error message is displayed when a plugin is renamed or WordPress updates a plugin or theme and the URL for the corresponding plugin or theme cannot be found. The discrepancy between the plugin name and the URL disables the plugin, and the Autopilot deployment cannot continue.

### Diagnosis

To determine which plugin is causing the issue:

1. Check the uncommitted changes for Autopilot Multidev. It is likely a plugin has been deleted and another plugin has been added.

1. Compare the list of plugins for Autopilot and Dev to the WordPress plugin list and determine if there are any discrepancies. Ensure no entries are missing. If there is variance between the lists, such as a plugin that has been omitted or not updated on one of the lists, the plugin will be disabled on the Autopilot branch.

If you need assistance, [contact Support](/support).

### Solution

Remove the plugin or theme from the site if it is not being used. Revert the plugin or theme to the original name and correct the URL.

Alternatively, you can add the plugin or theme to the **Excluded Updates** list in Autopilot settings.

</Accordion>

## Unexpected Error Preventing Autopilot From Taking Screenshots of Your Website

<Accordion title="There was an unexpected error preventing Autopilot from taking screenshots of your website." id="unexpected-screenshot-error" icon="info-sign">

Pantheon's Autopilot engineers investigate each of these errors as they occur. Please [contact Support](/support) via chat or ticket.

</Accordion>
