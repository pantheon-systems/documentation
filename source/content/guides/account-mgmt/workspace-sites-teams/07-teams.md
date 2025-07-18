---
title: Workspaces, Sites, and Teams
subtitle: Teams
description: Learn how to use teams for change management.
tags: [workspaces, sites, teams]
contributors: [wordsmither, michellecolon-pantheon]
showtoc: true
permalink: docs/guides/account-mgmt/workspace-sites-teams/teams
editpath: docs/guides/account-mgmt/workspace-sites-teams/07-teams.md
reviewed: "2025-07-14"
contenttype: [guide]
innav: [false]
categories: [organizations]
cms: [--]
audience: [sysadmin]
product: [--]
integration: [--]
---

Teams allow you to define the users who will have access to a workspace or site.

## Workspace Teams vs Site Dashboard Teams

There are two places a team can be defined: on a Professional Workspace, or in the Site Dashboard.

- Professional Workspace team members have access to all sites in that Workspace, and any sites that have that Workspace assigned as a Supporting Workspace.

- Site Team members only have access to that site.

## Roles and Permissions

These tables detail the actions each role can execute on each Dashboard.

### Workspace Level Permissions


| Permissions                                             | Administrator                       | Team Member                         | Developer                          | Unprivileged <Popover title="Unprivileged" content="Enterprise and EDU+ workspaces only" /> |
|:------------------------------------------------------- |:----------------------------------- |:----------------------------------- |:-----------------------------------|:-----------------------------------|
| Create sites within an org                              | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span>| <span  style="color:green">✔</span>|
| Work in Dev environments                                | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span>| <span  style="color:green">✔</span>|
| Access to Multidev environments                         | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span>| <span  style="color:green">✔</span>|
| Create or delete Multidev environments                         | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span>| <span  style="color:green">✔</span>|
| Create or view support tickets                                    | <span  style="color:green">✔</span> | <span  style="color:green">✔</span>  | <span  style="color:green">✔</span> | <span  style="color:red">❌</span> |
| Access and manage [Autopilot](/guides/autopilot)        | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span>| <span  style="color:red">❌</span> |
| Access the [workspace](/guides/account-mgmt/workspace-sites-teams/workspaces)| <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span>| <span  style="color:red">❌</span> <Popover title="Workspace Unprivileged" content="Users with an Unprivileged role will see the workspace's name, but will not be able to access it." />|
| Change site upstream <Popover title="Permissions Note" content="The site and the upstream must both belong to the same workspace." /> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:red">❌</span> |
| Deploy to Test and Live                                 | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:red">❌</span> | <span  style="color:red">❌</span> |
| Invite new team members                                 | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:red">❌</span> | <span  style="color:red">❌</span> |
| Manage user roles                                       | <span  style="color:green">✔</span> | <span  style="color:red">❌</span>  | <span  style="color:red">❌</span> | <span  style="color:red">❌</span> |
| Delete sites or remove users from an org                | <span  style="color:green">✔</span> | <span  style="color:red">❌</span>  | <span  style="color:red">❌</span> | <span  style="color:red">❌</span> |
| Manage a site's plan                                    | <span  style="color:green">✔</span> | <span  style="color:red">❌</span>  | <span  style="color:red">❌</span> | <span  style="color:red">❌</span> |
| Create or manage Custom Upstreams                          | <span  style="color:green">✔</span> | <span  style="color:red">❌</span>  | <span  style="color:red">❌</span> | <span  style="color:red">❌</span> |

### Site Level Permissions

| Permissions                                       | Org Admin / Owner <Popover title="Owner" content="Partner workspaces only" /> | Team Member | Developer <Popover content="Enterprise workspace only" /> |
|:------------------------------------------------- |:----------------------------------- |:----------------------------------- |:----------------------------------- |
| Access the site Dashboard                         | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> |
| Work in Dev environments                          | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> |
| Change site upstream                | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> |
| Deploy from Custom Upstreams <Popover title="Custom Upstream availability" content="Applies only when a workspace has Custom Upstreams enabled, and has already created one." /> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span>  | <span  style="color:green">✔</span>  | <span style="color:green">✔</span>  |
| Add/Manage Custom Domains           | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:red">❌</span>  |
| Deploy to Test and Live                           | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:red">❌</span>  |
| Upload files to Test and Live                                 | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:red">❌</span> |
| Access SFTP download logs on Test and Live           | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:red">❌</span>  |
| Clear cache on Test and Live                      | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:red">❌</span>  |
| Manage user roles                                 | <span  style="color:green">✔</span> | <span  style="color:red">❌</span>  | <span  style="color:red">❌</span>  |
| Delete sites or remove users from a site          | <span  style="color:green">✔</span> | <span  style="color:red">❌</span>  | <span  style="color:red">❌</span>  |
| Add a [Supporting Workspace](/guides/account-mgmt/workspace-sites-teams/sites#associate-a-site-to-a-workspace)                     | <span  style="color:green">✔</span> | <span  style="color:red">❌</span>  | <span  style="color:red">❌</span>  |
| Manage a site's plan                              | <span  style="color:green">✔</span> Org admin or Owner <Popover title="Owner" content="When a workspace is the owner of a site, users in charge cannot change the site plan." /> | <span  style="color:red">❌</span>  | <span  style="color:red">❌</span>  |
| Enable Pantheon Search                | <span  style="color:green">✔</span> | <span  style="color:green">✔</span>  | <span  style="color:red">❌</span>  |

#### User in Charge vs Site Owner
<p><dfn id="site-owner">Site Owner</dfn> is a site level role tied to billing and ownership. <ul><li>For self-serve customers, the site owner is set to an individual user account. The site owner role grants permissions for billing, managing the site plan, updating payment methods, and transferring site ownership. See also <a href="/guides/account-mgmt/billing">Billing for Self-Serve Accounts</a></li><li> For Enterprise and EDU customers, the site owner is set to the Workspace responsible for billing. Users with the Administrator role within this Workspace will have billing permissions. See also <a href="/guides/enterprise-billing-center">Enterprise Billing Center</a></li></ul></p>

<p><dfn id="user-in-charge">User in Charge</dfn> is a site level role for Enterprise and EDU customers. This role is used by Workspaces to determine who created the site. This role does not grant permissions for billing, changing site ownershipship, nor managing the site plan, unless the user is also an Administrator of the owning Workspace. If you are an Administrator for a Workspace and want to change the User in Charge on a site, please <a href="/guides/support/contact-support">contact support</a>.</p>

Pantheon uses the email address associated with the User in Charge (Enterprise and EDU customers) or Site Owner (self-serve customers) for the following two situations:
- Activating New Relic will send a validation request to this email address, which much be completed in order to finish account setup. 
- Pantheon Support will use this email address as the default point of contact for any proactive support tickets about the site.


## Manage Teams

### Add a User

<TabList>

<Tab title="To a Workspace" id="addwsp" active={true}>

When a team member is added to a Workspace:
- That Workspace will be accessible from the [Workspace Switcher](/guides/account-mgmt/workspace-sites-teams/workspaces#switch-between-workspaces)
- The role they are given applies to all sites in that Workspace

1. [Go to the workspace](/guides/account-mgmt/workspace-sites-teams/workspaces#switch-between-workspaces), select the **Team** tab, and click **Add User**.

1. Click **Invite Team Member**.

1. Enter the email address of the new user, select a role, then click **Send Invite**.

</Tab>

<Tab title="To a Site" id="addsite">

When a team member is added to a site:
- That site will be available in their Personal Workspace
- That Workspace containing that site will be accessible from the [Workspace Switcher](/guides/account-mgmt/workspace-sites-teams/workspaces#switch-between-workspaces)
- The role they are given applies only to that site - not to any of the others in the same Workspace

1. [Go to the Site Dashboard](/guides/account-mgmt/workspace-sites-teams/sites#site-dashboard) for the site.

1. Click **Team**.

1. Under **Team Members**, enter the user's email address, select a role (EDU+ and Enterprise sites only), then click **Add to Team**.

</Tab>

</TabList>

An email confirmation is sent to the user. Users with an existing Pantheon account are immediately added to the workspace. Users without existing accounts must first click the confirmation link in the email to create their account.


### Change a User's Role

<TabList>

<Tab title="In a Workspace" id="chws" active={true}>

1. [Go to the workspace](/guides/account-mgmt/workspace-sites-teams/workspaces#switch-between-workspaces) and select the **Team** tab.

1. Find and select the team member(s) whose role you want to change.

1. Click **Actions**, and choose **Change Role**.

1. Select the new role, then click **Save Changes**.

</Tab>


<Tab title="In a Site" id="chs">

1. [Go to the Site Dashboard](/guides/account-mgmt/workspace-sites-teams/sites#site-dashboard) for the site.

1. Click **Team**.

1. Under **Team Members**, find the Team Member, and select a new role from the list.

</Tab>

</TabList>

### Export Users

While you can view a workspace's users using the Dashboard, there may be times when you need to generate a list of users, or view a list of all users associated with the Workspace **and** all of its sites.

To export a list of users:

1. [Go to the workspace](/guides/account-mgmt/workspace-sites-teams/workspaces#switch-between-workspaces) and select the **Team** tab.

1. In the upper right corner of the page, click **Export Members**.

1. Select one of the following options:

   - **All workspace and site members**: exports all workspace members, site-only collaborators, and supporting workspaces.
   - **Only workspace members**: exports only the members defined in this workspace.

1. Click **Export CSV** to generate your report. You will receive an email when the report is complete and ready for download.

    <Alert title="Warning" type="danger" >

    The link in the email is only good for 24 hours.  If you don't download the file within 24 hours, you must request another export.

    </Alert>

    - You can only download the file using the link in the email.
    - Only the user who requested the file can download it. If you share this link with other users, they will not be able to download the report.
    - To share the report, download the file and share the file.

The exported CSV file will contain the following information:

- **isWorkspaceMember**: Indicates if the user is part of the workspace team.

- **IsSiteMember**: Indicates if the user is part of a site's team.

- **SiteUID**: If **IsSiteMember** is set to true, the entry contains the UID of the site the user is a team member of.

- **Site Type**: Indicates if this is a CMS or Front-end site.

- **Site Name**: Name of the site.

- **First Name**: User's first name.

- **Last Name**: User's last name.

- **Email Address**: User's email address.

- **UserUID**: User's UID.

- **Role**: If **SiteUID** is empty, the entry contains the user's role in the workspace. If **SiteUID** is not empty, the entry contains the user's role in the site.

The following fields only appear if you select **All Workspace and site members** when creating the export:

- **Supporting Workspace name**: The name of the supporting workspace (if applicable).

- **Supporting Workspace UID**: The UID of the supporting workspace (if applicable).


### Remove a User
For how to revoke access, see our [Offboarding](/guides/account-mgmt/workspace-sites-teams/offboard#revoke-pantheon-access) guide.

## Add a Supporting Workspace to Site

Supporting Workspaces are Professional Workspaces that contain team members only. These workspaces can then be added to individual sites to allow those team members access to work on that site.

Workspace Administrators, Users in Charge, or Site Owners can add a [Supporting Workspace](/guides/account-mgmt/workspace-sites-teams/workspaces#supporting-workspaces).

1. [Go to the Site Dashboard](/guides/account-mgmt/workspace-sites-teams/sites#site-dashboard) for the site, then click **Team**.

1. Under **Supporting Workspace**, enter the workspace's name in the search box, and click **Search**.  The workspace name must match exactly.

1. Select a role, then click **Add**. All members of the Supporting Workspace receive the role assigned on the site, regardless of their role in the Supporting Workspace.

   ![Site with two Supporting Workspaces](../../../../images/dashboard/new-dashboard/2024/_manage-site-team.png)

## Remove a Supporting Workspace from a Site

1. [Go to the Site Dashboard](/guides/account-mgmt/workspace-sites-teams/sites#site-dashboard) with the Supporting Workspace you wish to remove.

1. Click **<Icon icon="users" />Team**.

1. Click the **x** to the right of the Supporting Workspace you wish to remove.

1. [Enterprise customers](/guides/account-mgmt/workspace-sites-teams#enterprise-customers-aka-contract-customers) with the Administrator role will instead be provided additional options to remove the user's access from associated sites and will need to select one of the following:

   - **This site**: removes the workspace from this site only.

   - **All sites workspace has access to**: removes the workspace from all sites it's currently associated with.

     ![Alt text](../../../../images/dashboard/new-dashboard/2024/_workspace-offboarding-supporting.png)

1. Click **Yes, remove access**. The Supporting Workspace is removed based on the selection you made.

## FAQ

### Can I restrict access to a specific site with the Developer role?

Only sites owned by Enterprise and EDU+ can assign the developer role to specific users. Partner workspaces cannot specify which members have access to specific sites.

### Which role should I assign a user to give them the lowest level of access?

At the site level, the Developer role has the least amount of permissions and can create sites, view the Workspace, and deploy to the Development and Multidev environments. At the Professional Workspace level, the Unprivileged role has the least amount of permissions and can only create sites.

### Which environments can a user with the Developer role deploy to?

The Developer role can only deploy to Development and Multidev environments. If a user needs to deploy to Live, you can promote a Developer to Team Member for a single site by adding the user to the site's team.

### Who can add users to workspaces?

Enterprise Administrators can add site Team Members or Supporting Workspaces to sites owned by the workspace, with the Developer or workspace Team Member roles. Partner workspaces can assign users the role of an Administrator, Team Member, or Developer at the workspace level.

### How do I recover an account after a site owner leaves?

Refer to the steps in our [Site Access](/guides/account-mgmt/account/recover) doc for recovery instructions.
