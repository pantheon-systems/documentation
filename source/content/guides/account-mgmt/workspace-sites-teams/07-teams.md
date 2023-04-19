---
title: Workspaces, Sites, and Teams
subtitle: Teams
description: Learn how to use teams for change management.
tags: [workspaces, sites, teams]
contributors: [wordsmither, michellecolon-pantheon]
showtoc: true
permalink: docs/guides/account-mgmt/workspace-sites-teams/teams
editpath: docs/guides/account-mgmt/workspace-sites-teams/07-teams.md
reviewed: "2023-02-16"
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

- Professional Workspace team members have access to both all sites in that Workspace, and any sites that have that Workspace assigned as a Supporting Workspace.

- Site Team members only have access to that site.

## Roles and Permissions

These tables detail the actions each role can execute on each Dashboard.

In some Workspaces, you may notice the "User in Charge" label applied to a user. This helps distinguish who created a site for Enterprise and EDU workspaces where members are allowed to spin up new Sandbox sites at will. However, in these workspaces, the "User in Charge"  cannot adjust the site service level — e.g. to take a site live. Because this may affect the overall bill for the workspace, only workspace admins are allowed to change service levels.

If you are an administrator for a Pantheon workspace, [contact support](/guides/support/contact-support/) to have the User in Charge changed.

### Workspace Level Permissions


| Permissions                                             | Administrator                       | Team Member                         | Developer                          | Unprivileged <Popover title="Unprivileged" content="Enterprise and EDU+ workspaces only" /> |
|:------------------------------------------------------- |:----------------------------------- |:----------------------------------- |:-----------------------------------|:-----------------------------------|
| Create sites within an org                              | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span>| <span  style="color:green">✔</span>|
| Work in Dev environments                                | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span>| <span  style="color:green">✔</span>|
| Access to Multidev environments                         | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span>| <span  style="color:green">✔</span>|
| Create new Multidev environments                         | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span>| <span  style="color:green">✔</span>|
| Create or view support tickets                                    | <span  style="color:green">✔</span> | <span  style="color:green">✔</span>  | <span  style="color:green">✔</span> | <span  style="color:red">❌</span> |
| Access and manage [Autopilot](/guides/autopilot)        | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span>| <span  style="color:red">❌</span> |
| Access the [workspace](/guides/new-dashboard/workspaces)| <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span>| <span  style="color:red">❌</span> <Popover title="Workspace Unprivileged" content="Users with an Unprivileged role will see the workspace's name, but will not be able to access it." />|
| Access the org Dashboard                                | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span>| <span  style="color:red">❌</span> |
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


## Manage Teams

### Add a User

<TabList>

<Tab title="To a Workspace" id="addwsp" active={true}>

When a team member is added to a Workspace:
- That Workspace will be accessible from the Workspace selector (gravatar in upper left)
- The role they are given applies to all sites in that Workspace

1. Go to the workspace, select the **Team** tab, and click **Add User**.

1. Click **Invite Team Member**.

1. Enter the email address of the new user, select a role, then click **Send Invite**.

</Tab>

<Tab title="To a Site" id="addsite">

When a team member is added to a site:
- That site will be available in their Personal Workspace
- That Workspace containing that site will be accessible from the Workspace selector (gravatar in upper left)
- The role they are given applies only to that site - not to any of the other in the same Workspace

1. Open the Site Dashboard for the site.
   
1. Click **Team**.

1. Under **Team Members**, enter the user's email address, select a role (EDU+ and Enterprise sites only), then click **Add to Team**.

</Tab>

</TabList>

An email confirmation is sent to the user. Users with an existing Pantheon account are immediately added to the workspace. Users without existing accounts must first click the confirmation link in the email to create their account.


### Change a User's Role

<TabList>

<Tab title="In a Workspace" id="chws" active={true}>

1. Go to the workspace and select the **Team** tab.

1. Find and select the team member(s) whose role you want to change.

1. Click **Actions**, and choose **Change Role**.

1. Select the new role, then click **Save Changes**.

</Tab>


<Tab title="In a Site" id="chs">

1. Open the Site Dashboard for the site.
   
1. Click **Team**.

1. Under **Team Members**, find the Team Member, and select a new role from the list.

</Tab>

</TabList>

### Export Users

While you can view a workspace's users using the Dashboard, there may be times when you need to generate a list of users, or view a list of all users associated with the Workspace **and** all of its sites.

To export a list of users:

1. Go to the workspace and select the **Team** tab.

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

<Alert title="Note" type="info">

All users can be removed except the site owner. 

</Alert>

To remove a user: 

<TabList>

<Tab title="From a Workspace" id="remws" active={true}>

1. Go to the workspace and select the **Team** tab.

1. Find and select the team member(s) you wish to remove.

1. Select **Actions**, then **Remove**.

1. Select **Yes, I am sure I want to remove this person**, then click **Yes, Remove**.

</Tab>

<Tab title="From a Site" id="remsite">

To remove a team member from a site:

1. Open the Site Dashboard for the site.

1. Click **Team**.
   
1. Select the '**x**' for each team member you wish to remove.

</Tab>

</TabList>

When a person with access to your site(s) on the platform leaves the company or project, it is important to immediately remove them from the team so that they no longer have access to make changes to your site.

After a user leaves, in addition to the steps above, we recommend you:

- Delete or block the user's account in [Drupal](https://www.drupal.org/node/627158) or [WordPress](https://codex.wordpress.org/Users_Users_SubPanel).
- Change any shared account passwords the user may have had access to.
- Review the Git history in the commit log to see if the site team member made code changes after leaving. Refer to recommendations from [Drupal](https://www.drupal.org/node/2365547) and [WordPress](https://wordpress.org/support/article/faq-my-site-was-hacked/).


## Add a Supporting Workspace to Site

Workspace Administrators, Users in Charge, or Site Owners can add a [Supporting Workspace](/guides/account-mgmt/workspace-sites-teams/workspaces#supporting-workspaces).

1. Click **Sites** tab on the left hand panel > Click on the site you want to make changes to.

1. Click **Team** in the Site Dashboard.

1. Under **Supporting Workspace**, enter the workspace's name in the search box, and click **Search**.  The workspace name must match exactly.

1. Select a role, then click **Add**. All members of the Supporting Workspace receive the role assigned on the site, regardless of their role in the Supporting Workspace.
   
   ![Site with two Supporting Workspaces](../../../../images/dashboard/manage-site-team.png)

## FAQ

### Can I restrict access to a specific site with the Developer role?

Only sites owned by Enterprise and EDU+ can assign the developer role to specific users. Partner workspaces cannot specify which members have access to specific sites.

### Which role should I assign a user to give them the lowest level of access?

At the site level, the Developer role has the least amount of permissions and can create sites, view the Workspace Dashboard, and deploy to the Development and Multidev environments. At the Professional Workspace level, the Unprivileged role has the least amount of permissions and can only create sites.

### Which environments can a user with the Developer role deploy to?

The Developer role can only deploy to Development and Multidev environments. If a user needs to deploy to Live, you can promote a Developer to Team Member for a single site by adding the user to the site's team.

### Who can add users to workspaces?

Enterprise Administrators can add site Team Members or Supporting Workspaces to sites owned by the workspace, with the Developer or workspace Team Member roles. Partner workspaces can assign users the role of an Administrator, Team Member, or Developer at the workspace level.

### How do I recover an account after a site owner leaves?

Refer to the steps in our [Site Access](/guides/account-mgmt/account/recover) doc for recovery instructions.
