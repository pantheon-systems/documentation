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

Pantheon's Autopilot engineers investigate each of these errors as they occur. Please [contact Support](/guides/support/contact-support) via chat or ticket.

</Accordion>

## Drush Version

<Accordion title="Could not run Autopilot because the site is running an unsupported Drush version." id="invalid-drush-version" icon="info-sign">

### Issue

An error occurred becuase your site is currently running an unsupported version of Drush.
  
### Diagnosis

Autopilot only works on Drupal sites that are running Drush 8. Drush 5, 7, and 9 are not supported. Composer-managed sites should use Drush 10 and will not display the Drush version error. 
  
Currently, Autopilot only supports Integrated Composer; Build Tools sites cannot be updated.
  
### Solution

To resolve the issue, switch to Drush 8 in the `pantheon.yml` file or use Integrated Composer.

</Accordion>

## Modified Plugin or Theme Name

<Accordion title="Ran into an issue with a WordPress update and did not proceed with deployment." id="wp-update-issue" icon="info-sign">

### Issue

This error message is displayed when a plugin is renamed or WordPress updates a plugin or theme and the URL for the corresponding plugin or theme cannot be found. The discrepancy between the plugin name and the URL disables the plugin, and Autopilot deployment cannot continue.

### Diagnosis

To determine which plugin is causing the issue:

1. Check the uncommitted changes for Autopilot Multidev. It is likely a plugin has been deleted and another plugin has been added.

1. Compare the list of plugins for Autopilot and Dev to the WordPress plugin list and determine if there are any discrepancies. Ensure no entries are missing. If there is variance between the lists, such as a plugin that has been omitted or not updated on one of the lists, the plugin will be disabled on the Autopilot branch.

If you need assistance, [contact Support](/guides/support/contact-support).

### Solution

Remove the plugin or theme from the site if it is not being used. Revert the plugin or theme to the original name and correct the URL.

Alternatively, you can add the plugin or theme to the **Excluded Updates** list in Autopilot settings.

</Accordion>

## Extension Updates are Missing

<Accordion title="Could not apply the updates because a plugin or theme was not found while attempting the update." id="extension-updates-are-missing" icon="info-sign">

### Issue

This error message is displayed when a WordPress plugin or theme is not found when updates were attempted.
  
### Diagnosis

To determine which plugin is causing the issue:

1. Check the uncommitted changes for Autopilot Multidev. It is likely a plugin has been deleted and another plugin has been added.

1. Compare the list of plugins between the Autopilot and Dev environments and determine if there are any discrepancies. Ensure no entries are missing. If there is variance between the lists, such as a plugin that has been omitted or not updated on one of the lists, the plugin will be disabled on the Autopilot branch.

If you need assistance, [contact Support](/guides/support/contact-support).

### Solution

Remove the plugin or theme from the site if it is not being used, or revert the plugin or theme to the original name.

Alternatively, you can add the plugin or theme to the **Excluded Updates** list in Autopilot settings.
 
</Accordion>

## Preventing Autopilot From Taking Screenshots of Your Website

<Accordion title="There was an unexpected error preventing Autopilot from taking screenshots of your website." id="unexpected-screenshot-error" icon="info-sign">

Pantheon's Autopilot engineers investigate each of these errors as they occur. Please [contact Support](/guides/support/contact-support) via chat or ticket.

</Accordion>

## Failed Extension Updates

<Accordion title="Could not apply the upstream updates." id="failed-extension-updates" icon="info-sign">

### Issue

Applying upstream updates failed. 

### Diagnosis
  
This is most likely due to a merge conflict when applying upstream updates to the sites. For Composer sites, this could be caused by a failed Composer build or dependency conflicts.

### Solution
  
Resolve conflicts to apply updates. If a merge conflict is preventing you from merging a Multidev environment, follow the steps in the documentation for [Resolving Conflicts from Multidevs](/git-resolve-merge-conflicts#resolve-content-conflicts) and learn how to [Compare Multidev Environments Locally](/multidev#compare-multidev-environments-locally).

## Failed Upstream Updates 

<Accordion title="We could not apply the upstream updates." id="failed-upstream-updates" icon="info-sign">

### Issue
 
Applying upstream updates failed and changes cannot be automatically merged by Git. 

### Diagnosis

This error message most likely results from a merge conflict when applying upstream updates to the site. For sites that use Composer, this could be caused by a failed Composer build.
  
### Solution

Resolve conflicts to apply updates. Use the auto-resolve option in the Dashboard to resolve conflicts in favor of the upstream Git repository. Alternatively, you can manually pull changes using Git, resolve the conflicts, and then push the updates to your Pantheon site. For more information, refer to the [Applying Upstream Updates](/core-updates#apply-upstream-updates-via-the-site-dashboard) documentation. 
  
If a merge conflict is preventing you from merging a Multidev environment, follow the steps in the documentation for [Resolving Conflicts from Multidevs](/git-resolve-merge-conflicts#resolve-content-conflicts) and learn how to [Compare Multidev Environments Locally](/multidev#compare-multidev-environments-locally).

If the error is diplayed due to a failed Composer build, use `git diff` to view changes, and examine the error in the log. Composer build logs are only available after the action completes or fails. For more information, refer to the documentation on [Troubleshooting Code Syncs and Upstream Updates
](/guides/integrated-composer#troubleshooting-code-syncs-and-upstream-updates) and [Adding Dependencies to Your Upstream](/guides/integrated-composer#how-to-add-dependencies-to-your-upstream). 

</Accordion>

## Redirects

<Accordion title="We could not complete the visual regression test due to a redirect error on one or more pages." id="too-many-redirects" icon="info-sign">

### Issue

The visual regression test (VRT) could not be completed due to a redirect error on one or more pages.
  
### Diagnosis 

Autopilot fails when a VRT page redirects more than 8 times or is stuck in an infinite loop.

### Solution

Real-time email notifications are sent for failed VRTs for a site. If an error is detected during an update attempt, the Autopilot Status displays **Needs Attention**  with two options to **Review Test Results** or to **View Update Details**. When a failed test requires review, new tests cannot be run on the site until the results have been approved or discarded through Autopilot.

To resolve this issue remove the page from VRT settings or fix the redirect in the Dev environment for that page.
  
</Accordion>

## Failed Deployment 

<Accordion title="Could not deploy the updates to the Test or Live environment due to an unexpected error." id="deploy-failed" icon="info-sign">

### Issue

Autopilot failed to deploy to Test or Live, however deploying to Dev from Multidev was successful. The most common reason for this is running clear cache or update db using Drush or the WP-CLI failed after the code was deployed. Ensure that clearing the cache using Drush or the WP-CLI works on the target environment.
 
### Solution

If the Drush or WP-CLI steps failed during diagnosis, resolve any errors thrown by the CMS.

Run the deploy to Test or Live manually. Autopilot will also attempt to deploy again when the updates are tested, but immediately running updates again will likely result in a current response, as the Dev environment already has the changes.

If these steps fail, contact [Support](/guides/support/contact-support).
  
</Accordion>

## Unreachable Site 

<Accordion title="We ran into an unexpected issue with Autopilot because the site could not be loaded in the Dev environment." id="unreachable-site" icon="info-sign">

### Issue

Failed to get a `200 OK` reponse from the homepage of the Dev environment.
 
### Solution

Ensure the Dev environment is live and reachable with no fatal errors and returns a `200 OK` with curl or another check, for example `curl -I https://dev-{SITE}.pantheonsite.io/`.
  
</Accordion>

## Autopilot Multidev

<Accordion title="Could not create or reset the Autopilot Multidev due to an unexpected error." id="cannot-converge-multidev" icon="info-sign">

### Diagnosis

This can result from Drush or WP-CLI failing after `db pull` is run. This might be Autopilot specific, due to a site-level CMS issue, or could also be due to a platform-wide event. 
 
### Solution

Check that CLI cache clear steps work in the Dev environment. See if creating other Multidevs works correctly, delete the Autopilot environment and branch. Deleting the branch is important because the branch remains in Git if only the Multidev is deleted. If these actions works correctly, try running Autopilot again.

</Accordion>

## Merge to Dev

<Accordion title="We could not merge the updates to the Dev environment due to an unexpected issue." id="merge-to-dev" icon="info-sign">

### Issue
  
Updates could not be merged to the Dev environment. 

### Diagnosis

The most common reason for failure is due to a merge conflict. Changes were deployed in the Dev environment after Autopilot ran that resulted in a merge conflict. This error could also be because of a site-level PHP issue with `clear-cache` or `update.php` failing following a merge.
  
### Solution

If failure is because of a merge conflict, run Autopilot again with latest changes.

If the issue is because of a PHP or CMS issue, resolve any issues causing `clear-cache` or `update.php` steps to fail, and manually merge again, or re-run Autopilot.

</Accordion>

## Cloned Content Failed

<Accordion title="We could not clone the environments due to an unexpected error." id="cloned-content-failed" icon="info-sign">

### Diagnosis

The most common reason for clone content to fail is that drush/wr-cli clear cache failed at the end of a workflow.

### Solution

Ensure the commands work. You will not be able to see if the workflow failed, but CSEs will be able to confirm if there was an issue with Drush or WP-CLI by replicating the step with Terminus.

Use the following steps: 
* For WordPress:

`wp cache flush`

* Drupal:

`drush cache-rebuild`

</Accordion>
  
## Uncommitted Changes 

<Accordion title="We could not run Autopilot because there is unsaved work in the development environment. Commit or discard the change, and retry Autopilot." id="uncommitted-changes" icon="info-sign">
  
### Issue

Unsaved work in th development environment has preveneted Autopilot from running. 

### Solution
  
Commit or discard the change, and run Autopilot again. 

</Accordion>

## CMS Missing

<Accordion title="We could not run Autopilot because a CMS was not detected. Install Drupal or WordPress on this site, and retry Autopilot." id="cms-missing" icon="info-sign">
  
### Issue
  
A CMS was not detected. 

### Solution 

Install Drupal or WordPress on this site, and run Autopilot again. For more information on creating a new Drupal or WordPress site on Pantheon, refer to 
the [documentation](https://pantheon.io/docs/create-sites).

</Accordion>

## Frozen Site

<Accordion title="We could not run Autopilot because the site is frozen due to inactivity." id="frozen-site" icon="info-sign">

### Issue

A Sandbox site is frozen due to inactivity.
  
### Solution

Unfreeze the site in the old dashboard before re-queueing updates. Note, unfreezing may take some time.

</Accordion>

## Framework is Not Supported

<Accordion title="We could not run Autopilot because the site is running an unsupported framework." id="framework-is-not-supported" icon="info-sign">

### Diagnosis

Site is running a framework that is not Drupal, Drupal 8, or Wordpress.
  
### Solution

Contact support for assistance if running a framework that is not Drupal, Drupal 8, or Wordpress. Any other framework is likely not supported. 

</Accordion>

## VRT Scenarios

<Accordion title="We could not run Autopilot because no pages are defined for visual regression testing." id="no-vrt-scenarios" icon="info-sign">

### Issue

There are no visual regression testing pages in the Autopilot settings.

### Solution

Add at least one site to the Autopilot VRT settings.
</Accordion>
