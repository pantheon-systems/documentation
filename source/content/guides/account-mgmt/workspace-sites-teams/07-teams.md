---
title: Workspaces, Sites and Teams
subtitle: Teams
description: Learn how Workspaces, Sites and Teams work together to help you manage your sites.
categories: [account-mgmt]
tags: [workspaces, sites, teams]
contributors: [wordsmither]
layout: guide
showtoc: true
permalink: docs/guides/account-mgmt/workspace-sites-teams/teams
anchorid: teams
editpath: docs/guides/account-mgmt/workspace-sites-teams/07-teams.md
reviewed: "2022-09-19"
---

Teams allow you to define the users who will have access to a workspace or site. Team members added to a workspace will have access to all sites in that workspace, whereas team members added to a site can only access that site.

## Roles and Permissions

These tables detail the actions each role can execute on each Dashboard.

In some Workspaces, you may notice the "User in Charge" label applied to a user. This helps distinguish who created a site for Enterprise and EDU Organizations where members are allowed to spin up new Sandbox sites at will. However, in these organizations the "User in Charge"  cannot adjust the site service level — e.g. to take a site live. Because this may affect the overall bill for the organization, only organization admins are allowed to change service levels.

If you are an administrator for a Pantheon organization, [contact support](/guides/support/contact-support/) to have the User in Charge changed.

### Workspace Level Permissions


| Permissions                                             | Administrator                       | Team Member                         | Developer                          | Unprivileged <Popover title="Unprivileged" content="Enterprise and EDU+ organizations only" /> |
|:------------------------------------------------------- |:----------------------------------- |:----------------------------------- |:-----------------------------------|:-----------------------------------|
| Create sites within an org                              | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span>| <span  style="color:green">✔</span>|
| Work in Dev environments                                | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span>| <span  style="color:green">✔</span>|
| Access to Multidev environments                         | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span>| <span  style="color:green">✔</span>|
| Create new Multidev environments                         | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span>| <span  style="color:green">✔</span>|
| Create or view support tickets                                    | <span  style="color:green">✔</span> | <span  style="color:green">✔</span>  | <span  style="color:green">✔</span> | <span  style="color:red">❌</span> |
| Access and manage [Autopilot](/guides/autopilot)        | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span>| <span  style="color:red">❌</span> |
| Access the [Workspace](/guides/new-dashboard/workspaces)| <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span>| <span  style="color:red">❌</span> <Popover title="Workspace Unprivileged" content="Users with an Unprivileged role will see the Workspace's name, but will not be able to access it." />|
| Access the org Dashboard                                | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span>| <span  style="color:red">❌</span> |
| Change site upstream <Popover title="Permissions Note" content="The site and the upstream must both belong to the same organization." /> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:red">❌</span> |
| Deploy to Test and Live                                 | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:red">❌</span> | <span  style="color:red">❌</span> |
| Invite new team members                                 | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:red">❌</span> | <span  style="color:red">❌</span> |
| Manage user roles                                       | <span  style="color:green">✔</span> | <span  style="color:red">❌</span>  | <span  style="color:red">❌</span> | <span  style="color:red">❌</span> |
| Delete sites or remove users from an org                | <span  style="color:green">✔</span> | <span  style="color:red">❌</span>  | <span  style="color:red">❌</span> | <span  style="color:red">❌</span> |
| Manage a site's plan                                    | <span  style="color:green">✔</span> | <span  style="color:red">❌</span>  | <span  style="color:red">❌</span> | <span  style="color:red">❌</span> |
| Create or manage Custom Upstreams                          | <span  style="color:green">✔</span> | <span  style="color:red">❌</span>  | <span  style="color:red">❌</span> | <span  style="color:red">❌</span> |

### Site Level Permissions

| Permissions                                       | Org Admin / Owner <Popover title="Owner" content="Partner organizations only" /> | Team Member | Developer <Popover content="Enterprise organizations only" /> |
|:------------------------------------------------- |:----------------------------------- |:----------------------------------- |:----------------------------------- |
| Access the site Dashboard                         | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> |
| Work in Dev environments                          | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> |
| Change site upstream                | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> |
| Deploy from Custom Upstreams <Popover title="Custom Upstream availability" content="Applies only when an organization has Custom Upstreams enabled, and has already created one." /> | <span  style="color:green">✔</span> | <span  style="color:green">✔</span>  | <span  style="color:green">✔</span>  | <span style="color:green">✔</span>  |
| Add/Manage Custom Domains           | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:red">❌</span>  |
| Deploy to Test and Live                           | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:red">❌</span>  |
| Upload files to Test and Live                                 | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:red">❌</span> | <span  style="color:red">❌</span> |
| Clear cache on Test and Live                      | <span  style="color:green">✔</span> | <span  style="color:green">✔</span> | <span  style="color:red">❌</span>  |
| Manage user roles                                 | <span  style="color:green">✔</span> | <span  style="color:red">❌</span>  | <span  style="color:red">❌</span>  |
| Delete sites or remove users from a site          | <span  style="color:green">✔</span> | <span  style="color:red">❌</span>  | <span  style="color:red">❌</span>  |
| Add a [Supporting Organization](/organizations#organization-site-association)                     | <span  style="color:green">✔</span> | <span  style="color:red">❌</span>  | <span  style="color:red">❌</span>  |
| Manage a site's plan                              | <span  style="color:green">✔</span> Org admin or Owner <Popover title="Owner" content="When an organization is the owner of a site, users in charge cannot change the site plan." /> | <span  style="color:red">❌</span>  | <span  style="color:red">❌</span>  |
| Enable Pantheon Search                | <span  style="color:green">✔</span> | <span  style="color:red">❌</span>  | <span  style="color:red">❌</span>  |

### FAQ

### Can I Restrict Access to a Specific Site with the Developer Role?

Only sites owned by Enterprise and EDU+ can assign the developer role to specific users. Partner Organizations cannot specify which members have access to specific sites.

#### Which role should I assign a user to give them the lowest level of access?

At the site level, the Developer role has the least amount of permissions and can create sites, view the Organization Dashboard, and deploy to the Development and Multidev environments. At the organization level, the Unprivileged role has the least amount of permissions and can only create sites.

#### Which environments can a user with the Developer role deploy to?

The Developer role can only deploy to Development and Multidev environments. If a user needs to deploy to Live, you can promote a Developer to Team Member for a single site by adding the user to the site's team.

#### Who can add users to Organizations?

Enterprise Administrators can add site Team Members or Supporting Organizations to **sites** owned by the organization, with the Developer or organizational Team Member roles. Partner Organizations can assign users the role of an Administrator, Team Member, or Developer at the organization level.

#### How do I recover an account after a site owner leaves?

See the steps in our [Site Access](/site-access) doc for recovery instructions.

### Where can I learn more about these roles?

See [Role-Based Permissions & Change Management](/change-management) for details.
Workspace Teams
By default, all users are assigned the Administrator role after the Workspace is created.

Manage team members and assign [roles and permissions](/change-management#roles-and-permissions) in the dashboard. If you're working with a [Partner Agency](https://pantheon.io/plans/partner-program?docs), add them as a Supporting Organization.

## Manage Workspace Teams

### Add a User

1. Go to the Workspace, select the **Team** tab, and click **Add User**.

1. Click **Invite Team Member**.

1. Enter the email address of the new user, select a role, then click **Send Invite**.

An email confirmation is sent to the user. Users with an existing Pantheon account are immediately added to the Organization. Users without existing accounts must first click the confirmation link in the email to create their account.

To create a new user with an unprivileged role, create the user first, then change the role as detailed below.


### Change a User's Role

1. Go to the Workspace and select the **Team** tab.

1. Find a select the team member(s) whose role you wish to change.

1. Click **Actions**, and choose **Change Role**.

1. Select the new role, then click **Save Changes**.

### Remove a User from a Workspace

1. Go to the Workspace and select the **Team** tab.

1. Find and select the team member(s) you wish to remove.

1. Select **Actions**, then **Remove**.

1. Select **Yes, I am sure I want to remove this person**, then click **Yes, Remove**.



## Manage Site Teams

### Add a Team Member to Site

1. Open the Site Dashboard for the site.
   
1. Click **Team**.

1. Under **Team Members**, enter the user's email address, select a role (EDU+ and Enterprise sites only, then click **Add to Team**

### Add a Supporting Organization to Site

Organization Administrators, Users in Charge, or Site Owners can add a [Supporting Organization](/organizations#organization-site-association).

1. Open the Site Dashboard for the site.

1. Click **Team** in the Site Dashboard.

1. Click **Add a Supporting Organization**, enter the Workspace's name in the search box, and click **Search**.  The Workspace name must match exactly.

1. Select a role > click **Add**.

All members of the Supporting Organization receive the role assigned on the site, regardless of their role in the Supporting Organization.

### Remove a Team Member from Site

<Alert title="Note" type="info">

All users can be removed except the site owner. Also, when you delete a user from a site, they lose the ability to perform any operations on that site.

</Alert>

To remove a team member from a site:

1. Open the Site Dashboard for the site.

1. Click **Team**.
   
1. Select the '**x**' for each team member you wish to remove.

