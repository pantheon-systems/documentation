---
title: "Personal Workspace renamed to My Dashboard"
published_date: "2026-03-31"
categories: [user-interface, tools-apis]
description: "We have renamed Personal Workspaces to My Dashboard and have removed the ability to create new sites directly within it. Going forward, all new sites must be created within a Professional Workspace."
---
We have renamed Personal Workspaces to My Dashboard and have removed the ability to create new sites directly within it. Going forward, all new sites must be created within a Professional Workspace.

For details on workspaces, including how to create a free Professional Workspace, see [related documentation](/guides/account-mgmt/workspace-sites-teams/workspaces). 

## What's changing? 

* The **Personal Workspace** has been renamed to **My Dashboard** throughout the Pantheon dashboard.
* Site creation: 
  * In the dashboard, the option to select a Personal Workspace during site creation has been removed. Users must now select a **Professional Workspace** when creating a new site.
  * From the commandline, running `terminus site:create` without the `--org` flag returns this wanring: 
    > An org must be defined to create a site.

    Sites created via Terminus without an org are added to your **My Dashboard** workspace.


## What's not changing? 
Existing sites associated with My Dashboard are not affected. This update to the dashboard site creation process only prevents new sites from being added.

Site creation via Terminus without an org will still complete successfully at this stage. No changes to your existing Terminus scripts are required yet.

## Looking ahead
Starting **June 1, 2026**, specifying an org will be **required** when creating sites via Terminus. We recommend updating your scripts now to avoid disruption:

```
terminus site:create <site> <label> <upstream> --org=<org>
```
