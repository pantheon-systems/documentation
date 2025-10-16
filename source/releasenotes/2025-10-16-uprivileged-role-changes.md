---
title: "Unprivileged user role to be replaced by a new Contributor user role starting October 22, 2025"
published_date: "2025-10-16"
categories: [user-interface, account-management]
---
Effective October 22, 2025, the "Unprivileged" user role will be transitioned to a new "Contributor" role. Permissions will remain exactly the same, except that Contributors will have limited access to Workspaces in the Pantheon Dashboard. This update is to ensure that all Pantheon users have access to the modern dashboard experience. 

No action is needed by Site Owners or Workspace Administrators. 

## Key changes
* The name will change from Unprivileged to Contributor 
* Contributors will have limited access to Workspaces:

| Workspace Context             | Contributor Permission     | 
|:----------------------------- |:-------------------------- |
| Home                          |⚠️ Limited access: Total number of sites and team members are not shown.|
| Sites > Site list             |⚠️ Limited access: Only sites they create and sites they have been added to will be shown.|
| Sites > Create new site       |<span style="color:green">✔</span>|
| Sites > Migrate existing site |<span style="color:green">✔</span>|
| Team                          |<span style="color:red">❌</span>|
| Autopilot                     |<span style="color:red">❌</span>|
| Edge                          |<span style="color:red">❌</span>|
| Support                       |⚠️ Limited access: They can start a Live chat, but they cannot open tickets or see Workspace ticket history|
| Upstreams                     |<span style="color:red">❌</span>|
| Settings > Billing            |<span style="color:red">❌</span>|
| Settings > Profile            |<span style="color:red">❌</span>|

Users assigned this role will retain access solely to the sites for which they have been explicitly granted permission. They will not be authorized to modify Workspace configurations, access billing information, create custom upstreams, or perform other administrative functions. If these users are in multiple Workspaces, they will continue to have access to the Workspace Selector to change which Workspace they are currently working in.

Here's what you can expect a Contributor to see when accessing the Workspace: 

![Contributor view of a workspace in the Pantheon Dashboard](../images/release-notes/contributor-workspace-home.png)

